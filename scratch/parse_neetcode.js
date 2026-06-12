const fs = require('fs');
const path = require('path');

const neetcodeRawPath = '/home/prawns/.gemini/antigravity/brain/b8083a58-686f-4d60-836d-31b3f640a5b2/.system_generated/steps/148/content.md';
const metaPath = '/home/prawns/yeetcode/src/features/questions/data/problems_meta.json';
const detailsPath = '/home/prawns/yeetcode/src/features/questions/data/problems_details.json';

// Read content.md, skip first few lines if they contain markdown headers
let content = fs.readFileSync(neetcodeRawPath, 'utf8');
if (content.startsWith('Source:')) {
    content = content.substring(content.indexOf('{'));
}

const neetcodeData = JSON.parse(content);
const metaProblems = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
const detailsData = JSON.parse(fs.readFileSync(detailsPath, 'utf8'));

const mappedList = [];
const unmatched = [];

// Helper to clean slug from URL
function getSlugFromUrl(url) {
    if (!url) return null;
    const parts = url.replace(/\/$/, '').split('/');
    return parts[parts.length - 1];
}

for (const [category, problems] of Object.entries(neetcodeData)) {
    for (const [name, info] of Object.entries(problems)) {
        const urlSlug = getSlugFromUrl(info.url);
        
        // Find in metaProblems by slug
        let found = metaProblems.find(p => p.slug === urlSlug);
        
        // Fallbacks
        if (!found) {
            // Try title match
            found = metaProblems.find(p => p.title.toLowerCase() === name.toLowerCase());
        }
        if (!found) {
            // Specific overrides
            if (urlSlug === 'powx-n') {
                found = metaProblems.find(p => p.slug === 'pow(x,-n)');
            } else if (urlSlug === 'two-sum-ii-input-array-is-sorted') {
                found = metaProblems.find(p => p.slug === 'two-sum-ii---input-array-is-sorted');
            } else if (urlSlug === 'implement-trie-prefix-tree') {
                found = metaProblems.find(p => p.slug === 'implement-trie-(prefix-tree)');
            } else if (urlSlug === 'reverse-bits') {
                found = metaProblems.find(p => p.number === 190);
            } else if (urlSlug === 'encode-and-decode-strings') {
                found = metaProblems.find(p => p.number === 271 || p.slug === 'encode-and-decode-strings');
            } else if (urlSlug === 'meeting-rooms') {
                found = metaProblems.find(p => p.number === 252);
            } else if (urlSlug === 'meeting-rooms-ii') {
                found = metaProblems.find(p => p.number === 253);
            } else if (urlSlug === 'graph-valid-tree') {
                found = metaProblems.find(p => p.number === 261);
            } else if (urlSlug === 'number-of-connected-components-in-an-undirected-graph') {
                found = metaProblems.find(p => p.number === 323);
            } else if (urlSlug === 'alien-dictionary') {
                found = metaProblems.find(p => p.number === 269);
            }
        }
        
        if (found) {
            // Check if solution exists in detailsData
            const hasSolution = found.slug in detailsData;
            mappedList.push({
                slug: found.slug,
                number: found.number,
                title: found.title,
                difficulty: found.difficulty,
                category: category,
                hasSolution: hasSolution
            });
        } else {
            unmatched.push({ name, urlSlug, category });
        }
    }
}

console.log(`Successfully mapped ${mappedList.length}/150 problems.`);
if (unmatched.length > 0) {
    console.log("Unmatched problems:", unmatched);
}

// Write the result
fs.writeFileSync(
    '/home/prawns/yeetcode/src/features/questions/data/neetcode_150.json',
    JSON.stringify(mappedList, null, 2),
    'utf8'
);
console.log("Saved mapped list to src/features/questions/data/neetcode_150.json");
