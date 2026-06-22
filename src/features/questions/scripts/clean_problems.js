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

  // 5. Generate graph_data.json
  console.log('Generating knowledge graph data structure...');
  const nodes = [];
  const links = [];
  const linkPairs = new Set();
  const tagFrequencies = new Map();

  // Helper to add link uniquely
  function addLink(source, target, value) {
    const key = [source, target].sort().join('::');
    if (!linkPairs.has(key)) {
      linkPairs.add(key);
      links.push({ source, target, value });
    }
  }

  // Find tag frequencies
  for (const [slug, data] of problemMetaMap.entries()) {
    for (const tag of data.tags) {
      tagFrequencies.set(tag, (tagFrequencies.get(tag) || 0) + 1);
    }
  }

  // Add tag nodes
  for (const [tag, freq] of tagFrequencies.entries()) {
    nodes.push({
      id: `tag:${tag}`,
      label: tag,
      isTag: true,
      val: Math.max(10, Math.min(60, freq * 1.5)) // Size scale based on tag popularity
    });
  }

  // Add problem nodes & Tag Hub Links
  const problemsList = [];
  for (const p of allProblems) {
    const cleaned = problemMetaMap.get(p.slug);
    if (!cleaned) continue;

    problemsList.push({
      slug: p.slug,
      title: p.title,
      difficulty: cleaned.difficulty
    });

    nodes.push({
      id: `problem:${p.slug}`,
      label: p.title,
      slug: p.slug,
      difficulty: cleaned.difficulty,
      val: 5
    });

    // Connect problem to its tag hubs
    for (const tag of cleaned.tags) {
      addLink(`problem:${p.slug}`, `tag:${tag}`, 1);
    }
  }

  // Add Difficulty Progression & Similarity Links
  console.log('Computing similarity & progression paths...');
  const diffScale = { easy: 1, medium: 2, hard: 3 };

  for (let i = 0; i < problemsList.length; i++) {
    const p1 = problemsList[i];
    const cleaned1 = problemMetaMap.get(p1.slug);
    if (!cleaned1 || cleaned1.tags.size === 0) continue;

    const candidates = [];
    for (let j = 0; j < problemsList.length; j++) {
      if (i === j) continue;
      const p2 = problemsList[j];
      const cleaned2 = problemMetaMap.get(p2.slug);
      if (!cleaned2 || cleaned2.tags.size === 0) continue;

      // Calculate shared tags
      let sharedCount = 0;
      for (const t of cleaned1.tags) {
        if (cleaned2.tags.has(t)) sharedCount++;
      }

      if (sharedCount > 0) {
        const d1 = diffScale[p1.difficulty] || 2;
        const d2 = diffScale[p2.difficulty] || 2;
        const diffPenalty = Math.abs(d1 - d2) * 0.15;
        const score = sharedCount - diffPenalty;

        candidates.push({ slug: p2.slug, score });
      }
    }

    // Sort by score descending and link to the top 2
    candidates.sort((a, b) => b.score - a.score);
    const top2 = candidates.slice(0, 2);
    for (const cand of top2) {
      addLink(`problem:${p1.slug}`, `problem:${cand.slug}`, 2); // value 2 indicates progression link
    }
  }

  const graphData = { nodes, links };
  fs.writeFileSync(GRAPH_DATA_PATH, JSON.stringify(graphData, null, 2), 'utf8');
  console.log(`Successfully generated graph_data.json with ${nodes.length} nodes and ${links.length} links.`);
}

main();
