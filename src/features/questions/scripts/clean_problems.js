const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const ALL_PROBLEMS_PATH = path.join(DATA_DIR, 'all_problems.json');
const PROBLEMS_META_PATH = path.join(DATA_DIR, 'problems_meta.json');
const PROBLEMS_DETAILS_PATH = path.join(DATA_DIR, 'problems_details.json');
const NEETCODE_150_PATH = path.join(DATA_DIR, 'neetcode_150.json');
const GRAPH_DATA_PATH = path.join(DATA_DIR, 'graph_data.json');

// Helper to parse frontmatter from markdown description
function parseFrontmatter(description) {
  const result = { difficulty: null, tags: [] };
  if (!description) return result;

  const match = description.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return result;

  const block = match[1];
  const lines = block.split(/\r?\n/);
  let inTags = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('difficulty:')) {
      const diffVal = trimmed.split(':')[1].trim().toLowerCase();
      if (['easy', 'medium', 'hard'].includes(diffVal)) {
        result.difficulty = diffVal;
      }
      inTags = false;
    } else if (trimmed.startsWith('tags:')) {
      inTags = true;
    } else if (inTags && trimmed.startsWith('-')) {
      const tag = trimmed.substring(1).trim();
      if (tag) result.tags.push(tag);
    } else if (trimmed.includes(':')) {
      inTags = false;
    }
  }
  return result;
}

function main() {
  console.log('Starting Algorithm Knowledge Graph Data Cleaning Pipeline...');

  // 1. Load datasets
  if (!fs.existsSync(ALL_PROBLEMS_PATH)) {
    console.error(`Error: File not found at ${ALL_PROBLEMS_PATH}`);
    process.exit(1);
  }
  const allProblems = JSON.parse(fs.readFileSync(ALL_PROBLEMS_PATH, 'utf8'));
  const neetcode150 = fs.existsSync(NEETCODE_150_PATH) 
    ? JSON.parse(fs.readFileSync(NEETCODE_150_PATH, 'utf8'))
    : [];

  const neetcodeMap = new Map();
  for (const p of neetcode150) {
    neetcodeMap.set(p.slug, p);
  }

  console.log(`Loaded ${allProblems.length} source problems from all_problems.json`);
  console.log(`Loaded ${neetcodeMap.size} NeetCode 150 problems mapping`);

  // 2. Extract tags & correct difficulties from allProblems
  const problemMetaMap = new Map(); // slug -> { tags: Set, difficulty: string }
  let extractedCount = 0;
  let difficultyCorrectedCount = 0;

  for (const p of allProblems) {
    const fm = parseFrontmatter(p.description);
    const tags = new Set(fm.tags || []);
    
    // Add raw topics if no tags in frontmatter
    if (tags.size === 0 && p.topics && p.topics.length > 0) {
      for (const t of p.topics) {
        if (t !== 'All' && t !== 'Algorithms') {
          tags.add(t);
        }
      }
    }
    if (tags.size === 0) {
      tags.add('General');
    }

    // Determine difficulty:
    // 1. Neetcode 150 overrides
    // 2. Frontmatter difficulty
    // 3. Fallback to existing difficulty in allProblems (or 'medium' if not set/valid)
    let difficulty = 'medium';
    if (neetcodeMap.has(p.slug)) {
      difficulty = neetcodeMap.get(p.slug).difficulty.toLowerCase();
    } else if (fm.difficulty) {
      difficulty = fm.difficulty;
    } else if (p.difficulty && ['easy', 'medium', 'hard'].includes(p.difficulty.toLowerCase())) {
      difficulty = p.difficulty.toLowerCase();
    }

    // Add NeetCode tag if it's part of NeetCode 150
    if (neetcodeMap.has(p.slug)) {
      const nc = neetcodeMap.get(p.slug);
      tags.add('NeetCode 150');
      if (nc.category) {
        tags.add(nc.category);
      }
    }

    problemMetaMap.set(p.slug, {
      tags,
      difficulty
    });

    if (fm.tags && fm.tags.length > 0) extractedCount++;
    if (fm.difficulty && fm.difficulty !== p.difficulty) difficultyCorrectedCount++;
  }

  console.log(`Parsed frontmatter tags for ${extractedCount} problems.`);
  console.log(`Corrected difficulty for ${difficultyCorrectedCount} problems.`);

  // 3. Update problems_meta.json
  let updatedMetaCount = 0;
  if (fs.existsSync(PROBLEMS_META_PATH)) {
    const metaList = JSON.parse(fs.readFileSync(PROBLEMS_META_PATH, 'utf8'));
    for (const p of metaList) {
      const cleaned = problemMetaMap.get(p.slug);
      if (cleaned) {
        p.topics = Array.from(cleaned.tags);
        p.difficulty = cleaned.difficulty;
        updatedMetaCount++;
      }
    }
    fs.writeFileSync(PROBLEMS_META_PATH, JSON.stringify(metaList, null, 2), 'utf8');
    console.log(`Updated ${updatedMetaCount} entries in problems_meta.json`);
  }

  // 4. Update problems_details.json
  let updatedDetailsCount = 0;
  if (fs.existsSync(PROBLEMS_DETAILS_PATH)) {
    const detailsDict = JSON.parse(fs.readFileSync(PROBLEMS_DETAILS_PATH, 'utf8'));
    for (const slug of Object.keys(detailsDict)) {
      const cleaned = problemMetaMap.get(slug);
      if (cleaned) {
        detailsDict[slug].topics = Array.from(cleaned.tags);
        detailsDict[slug].difficulty = cleaned.difficulty;
        updatedDetailsCount++;
      }
    }
    fs.writeFileSync(PROBLEMS_DETAILS_PATH, JSON.stringify(detailsDict, null, 2), 'utf8');
    console.log(`Updated ${updatedDetailsCount} entries in problems_details.json`);
  }

  // 5. Generate graph_data.json (Full) & graph_data_neetcode.json (NeetCode 150)
  console.log('Generating knowledge graph data structures...');
  
  const tagFrequencies = new Map();
  for (const [slug, data] of problemMetaMap.entries()) {
    for (const tag of data.tags) {
      tagFrequencies.set(tag, (tagFrequencies.get(tag) || 0) + 1);
    }
  }

  // --- Helper to build a graph from a subset of problems ---
  function buildGraphForSubset(problemsSubset, filename) {
    const subsetSlugs = new Set(problemsSubset.map(p => p.slug));
    const nodes = [];
    const links = [];
    const linkPairs = new Set();

    function addLink(source, target, value) {
      const key = [source, target].sort().join('::');
      if (!linkPairs.has(key)) {
        linkPairs.add(key);
        links.push({ source, target, value });
      }
    }

    // Identify which tags are relevant to this subset
    const subsetTags = new Set();
    for (const p of problemsSubset) {
      const cleaned = problemMetaMap.get(p.slug);
      if (cleaned) {
        for (const tag of cleaned.tags) {
          subsetTags.add(tag);
        }
      }
    }

    // Add tag nodes (Pruning highly frequent tags to prevent clutter, unless it's NeetCode 150 where they act as clean hubs)
    const isNeetcodeOnly = filename.includes('neetcode');
    for (const tag of subsetTags) {
      const freq = tagFrequencies.get(tag) || 0;
      // In full graph, prune tags with > 100 problems to avoid rendering giant central stars
      if (!isNeetcodeOnly && freq > 100) continue;

      nodes.push({
        id: `tag:${tag}`,
        label: tag,
        isTag: true,
        val: isNeetcodeOnly ? 30 : Math.max(12, Math.min(50, freq * 1.2))
      });
    }

    // Add problem nodes & Tag Hub links
    const problemsList = [];
    for (const p of problemsSubset) {
      const cleaned = problemMetaMap.get(p.slug);
      if (!cleaned) continue;

      problemsList.push({
        slug: p.slug,
        title: p.title,
        difficulty: cleaned.difficulty,
        tags: cleaned.tags
      });

      nodes.push({
        id: `problem:${p.slug}`,
        label: p.title,
        slug: p.slug,
        difficulty: cleaned.difficulty,
        val: 6
      });

      // Connect problem to its tag hubs (if tag node was created)
      const createdTags = new Set(nodes.filter(n => n.isTag).map(n => n.label));
      for (const tag of cleaned.tags) {
        if (createdTags.has(tag)) {
          addLink(`problem:${p.slug}`, `tag:${tag}`, 1);
        }
      }
    }

    // Add progression & similarity links between problems
    const diffScale = { easy: 1, medium: 2, hard: 3 };
    for (let i = 0; i < problemsList.length; i++) {
      const p1 = problemsList[i];
      const candidates = [];

      for (let j = 0; j < problemsList.length; j++) {
        if (i === j) continue;
        const p2 = problemsList[j];

        // Shared tags count
        let sharedCount = 0;
        for (const t of p1.tags) {
          if (p2.tags.has(t)) sharedCount++;
        }

        if (sharedCount > 0) {
          const d1 = diffScale[p1.difficulty] || 2;
          const d2 = diffScale[p2.difficulty] || 2;
          const diffPenalty = Math.abs(d1 - d2) * 0.15;
          const score = sharedCount - diffPenalty;
          candidates.push({ slug: p2.slug, score });
        }
      }

      // Sort and take top 2 candidates to link
      candidates.sort((a, b) => b.score - a.score);
      const top2 = candidates.slice(0, 2);
      for (const cand of top2) {
        addLink(`problem:${p1.slug}`, `problem:${cand.slug}`, 2);
      }
    }

    const graphData = { nodes, links };
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(graphData, null, 2), 'utf8');
    console.log(`Successfully generated ${filename} with ${nodes.length} nodes and ${links.length} links.`);
  }

  // 5a. Build full graph (with pruned links/hubs)
  buildGraphForSubset(allProblems, 'graph_data.json');

  // 5b. Build NeetCode 150 graph
  const neetcodeProblemsSubset = allProblems.filter(p => neetcodeMap.has(p.slug));
  buildGraphForSubset(neetcodeProblemsSubset, 'graph_data_neetcode.json');
}

main();
