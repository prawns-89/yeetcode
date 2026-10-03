export type IslandColorFamily = "blue" | "amber" | "green" | "violet" | "slate";

export interface CppRef {
  label: string;
  url: string;
}

export interface Island {
  id: string;
  category: string; // matches neetcode_150.json category exactly
  label: string; // short display label
  colorFamily: IslandColorFamily;
  relatedTrackId?: string; // links to algorithmTracks if applicable
  neetcodeUrl: string;
  cppRefs: CppRef[];
  // Sub-patterns used for grouping the daily 5 problems
  subPatterns: string[];
  // Fixed position on the map canvas (percent of container)
  x: number;
  y: number;
}

export const ISLANDS: Island[] = [
  {
    id: "arrays-hashing",
    category: "Arrays & Hashing",
    label: "ARRAYS & HASHING",
    colorFamily: "blue",
    neetcodeUrl: "https://neetcode.io/roadmap",
    cppRefs: [
      { label: "std::vector", url: "https://en.cppreference.com/w/cpp/container/vector" },
      { label: "std::unordered_map", url: "https://en.cppreference.com/w/cpp/container/unordered_map" },
      { label: "std::unordered_set", url: "https://en.cppreference.com/w/cpp/container/unordered_set" },
    ],
    subPatterns: ["frequency count", "index mapping", "duplicate detection", "prefix sum"],
    x: 15, y: 20,
  },
  {
    id: "two-pointers",
    category: "Two Pointers",
    label: "TWO POINTERS",
    colorFamily: "blue",
    neetcodeUrl: "https://neetcode.io/roadmap",
    cppRefs: [
      { label: "std::sort", url: "https://en.cppreference.com/w/cpp/algorithm/sort" },
      { label: "iterators", url: "https://en.cppreference.com/w/cpp/iterator" },
    ],
    subPatterns: ["opposite ends", "fast-slow pointer", "palindrome check", "sorted merge"],
    x: 30, y: 12,
  },
  {
    id: "sliding-window",
    category: "Sliding Window",
    label: "SLIDING WINDOW",
    colorFamily: "blue",
    neetcodeUrl: "https://neetcode.io/roadmap",
    cppRefs: [
      { label: "std::deque", url: "https://en.cppreference.com/w/cpp/container/deque" },
      { label: "std::unordered_map", url: "https://en.cppreference.com/w/cpp/container/unordered_map" },
    ],
    subPatterns: ["fixed window", "variable window", "character frequency", "monotonic window"],
    x: 45, y: 8,
  },
  {
    id: "stack",
    category: "Stack",
    label: "STACK",
    colorFamily: "blue",
    neetcodeUrl: "https://neetcode.io/roadmap",
    cppRefs: [
      { label: "std::stack", url: "https://en.cppreference.com/w/cpp/container/stack" },
      { label: "std::vector (as stack)", url: "https://en.cppreference.com/w/cpp/container/vector" },
    ],
    subPatterns: ["valid parentheses", "monotonic stack", "next greater element", "expression eval"],
    x: 62, y: 14,
  },
  {
    id: "binary-search",
    category: "Binary Search",
    label: "BINARY SEARCH",
    colorFamily: "amber",
    neetcodeUrl: "https://neetcode.io/roadmap",
    cppRefs: [
      { label: "std::binary_search", url: "https://en.cppreference.com/w/cpp/algorithm/binary_search" },
      { label: "std::lower_bound", url: "https://en.cppreference.com/w/cpp/algorithm/lower_bound" },
      { label: "std::upper_bound", url: "https://en.cppreference.com/w/cpp/algorithm/upper_bound" },
    ],
    subPatterns: ["search in sorted array", "rotated array", "binary search on answer", "matrix search"],
    x: 78, y: 20,
  },
  {
    id: "linked-list",
    category: "Linked List",
    label: "LINKED LIST",
    colorFamily: "blue",
    neetcodeUrl: "https://neetcode.io/roadmap",
    cppRefs: [
      { label: "std::list", url: "https://en.cppreference.com/w/cpp/container/list" },
      { label: "pointer arithmetic", url: "https://en.cppreference.com/w/cpp/language/pointer" },
    ],
    subPatterns: ["reversal", "cycle detection", "merge", "reorder", "dummy node"],
    x: 88, y: 32,
  },
  {
    id: "trees",
    category: "Trees",
    label: "TREES",
    colorFamily: "green",
    relatedTrackId: "graphs",
    neetcodeUrl: "https://neetcode.io/roadmap",
    cppRefs: [
      { label: "std::set", url: "https://en.cppreference.com/w/cpp/container/set" },
      { label: "std::map", url: "https://en.cppreference.com/w/cpp/container/map" },
    ],
    subPatterns: ["DFS traversal", "BFS level-order", "path sum", "LCA", "BST operations"],
    x: 82, y: 46,
  },
  {
    id: "heap-priority-queue",
    category: "Heap / Priority Queue",
    label: "HEAP / PQ",
    colorFamily: "amber",
    neetcodeUrl: "https://neetcode.io/roadmap",
    cppRefs: [
      { label: "std::priority_queue", url: "https://en.cppreference.com/w/cpp/container/priority_queue" },
      { label: "std::make_heap", url: "https://en.cppreference.com/w/cpp/algorithm/make_heap" },
    ],
    subPatterns: ["k-th largest", "top-k elements", "merge k sorted", "median stream"],
    x: 70, y: 56,
  },
  {
    id: "backtracking",
    category: "Backtracking",
    label: "BACKTRACKING",
    colorFamily: "violet",
    neetcodeUrl: "https://neetcode.io/roadmap",
    cppRefs: [
      { label: "recursion", url: "https://en.cppreference.com/w/cpp/language/recursive" },
      { label: "std::vector", url: "https://en.cppreference.com/w/cpp/container/vector" },
    ],
    subPatterns: ["subsets", "permutations", "combinations", "N-Queens", "word search"],
    x: 55, y: 64,
  },
  {
    id: "tries",
    category: "Tries",
    label: "TRIES",
    colorFamily: "blue",
    neetcodeUrl: "https://neetcode.io/roadmap",
    cppRefs: [
      { label: "std::unordered_map (node children)", url: "https://en.cppreference.com/w/cpp/container/unordered_map" },
      { label: "struct/class (trie node)", url: "https://en.cppreference.com/w/cpp/language/class" },
    ],
    subPatterns: ["insert/search", "prefix match", "word dictionary", "autocomplete"],
    x: 40, y: 70,
  },
  {
    id: "graphs",
    category: "Graphs",
    label: "GRAPHS",
    colorFamily: "green",
    relatedTrackId: "graphs",
    neetcodeUrl: "https://neetcode.io/roadmap",
    cppRefs: [
      { label: "adjacency list", url: "https://en.cppreference.com/w/cpp/container/vector" },
      { label: "std::queue (BFS)", url: "https://en.cppreference.com/w/cpp/container/queue" },
    ],
    subPatterns: ["DFS connected components", "BFS shortest path", "cycle detection", "topological sort", "island count"],
    x: 25, y: 62,
  },
  {
    id: "advanced-graphs",
    category: "Advanced Graphs",
    label: "ADVANCED GRAPHS",
    colorFamily: "green",
    relatedTrackId: "graphs",
    neetcodeUrl: "https://neetcode.io/roadmap",
    cppRefs: [
      { label: "std::priority_queue (Dijkstra)", url: "https://en.cppreference.com/w/cpp/container/priority_queue" },
      { label: "Union-Find pattern", url: "https://en.cppreference.com/w/cpp/container/vector" },
    ],
    subPatterns: ["Dijkstra", "Bellman-Ford", "Prim / Kruskal", "Floyd-Warshall", "network flow"],
    x: 12, y: 50,
  },
  {
    id: "1d-dp",
    category: "1-D Dynamic Programming",
    label: "1-D DP",
    colorFamily: "violet",
    neetcodeUrl: "https://neetcode.io/roadmap",
    cppRefs: [
      { label: "std::vector (dp table)", url: "https://en.cppreference.com/w/cpp/container/vector" },
      { label: "std::max / std::min", url: "https://en.cppreference.com/w/cpp/algorithm/max" },
    ],
    subPatterns: ["climbing stairs / fibonacci", "house robber", "coin change", "longest increasing subsequence"],
    x: 8, y: 35,
  },
  {
    id: "2d-dp",
    category: "2-D Dynamic Programming",
    label: "2-D DP",
    colorFamily: "violet",
    neetcodeUrl: "https://neetcode.io/roadmap",
    cppRefs: [
      { label: "2D std::vector", url: "https://en.cppreference.com/w/cpp/container/vector" },
      { label: "std::string", url: "https://en.cppreference.com/w/cpp/string/basic_string" },
    ],
    subPatterns: ["grid paths", "edit distance / LCS", "knapsack", "palindrome subsequence"],
    x: 20, y: 38,
  },
  {
    id: "greedy",
    category: "Greedy",
    label: "GREEDY",
    colorFamily: "amber",
    neetcodeUrl: "https://neetcode.io/roadmap",
    cppRefs: [
      { label: "std::sort", url: "https://en.cppreference.com/w/cpp/algorithm/sort" },
      { label: "std::priority_queue", url: "https://en.cppreference.com/w/cpp/container/priority_queue" },
    ],
    subPatterns: ["interval scheduling", "jump game", "gas station", "task scheduler"],
    x: 35, y: 44,
  },
  {
    id: "intervals",
    category: "Intervals",
    label: "INTERVALS",
    colorFamily: "amber",
    neetcodeUrl: "https://neetcode.io/roadmap",
    cppRefs: [
      { label: "std::sort (custom comparator)", url: "https://en.cppreference.com/w/cpp/algorithm/sort" },
      { label: "std::pair", url: "https://en.cppreference.com/w/cpp/utility/pair" },
    ],
    subPatterns: ["merge intervals", "insert interval", "meeting rooms", "min intervals to remove"],
    x: 50, y: 40,
  },
  {
    id: "math-geometry",
    category: "Math & Geometry",
    label: "MATH & GEOMETRY",
    colorFamily: "slate",
    neetcodeUrl: "https://neetcode.io/roadmap",
    cppRefs: [
      { label: "<cmath>", url: "https://en.cppreference.com/w/cpp/header/cmath" },
      { label: "<numeric>", url: "https://en.cppreference.com/w/cpp/header/numeric" },
      { label: "std::gcd", url: "https://en.cppreference.com/w/cpp/numeric/gcd" },
    ],
    subPatterns: ["modular arithmetic", "prime sieve", "matrix rotation", "spiral traversal"],
    x: 65, y: 36,
  },
  {
    id: "bit-manipulation",
    category: "Bit Manipulation",
    label: "BIT MANIPULATION",
    colorFamily: "slate",
    neetcodeUrl: "https://neetcode.io/roadmap",
    cppRefs: [
      { label: "bitwise operators", url: "https://en.cppreference.com/w/cpp/language/operator_arithmetic" },
      { label: "std::bitset", url: "https://en.cppreference.com/w/cpp/utility/bitset" },
      { label: "__builtin_popcount", url: "https://gcc.gnu.org/onlinedocs/gcc/Other-Builtins.html" },
    ],
    subPatterns: ["XOR tricks", "bit masking", "count set bits", "missing number", "power of two"],
    x: 78, y: 68,
  },
];

export const ISLAND_MAP = new Map<string, Island>(
  ISLANDS.map((i) => [i.category, i]),
);

export const COLOR_VARS: Record<IslandColorFamily, { border: string; text: string; bg: string }> = {
  blue:   { border: "var(--island-blue-border)",   text: "var(--island-blue-text)",   bg: "var(--island-blue-bg)" },
  amber:  { border: "var(--island-amber-border)",  text: "var(--island-amber-text)",  bg: "var(--island-amber-bg)" },
  green:  { border: "var(--island-green-border)",  text: "var(--island-green-text)",  bg: "var(--island-green-bg)" },
  violet: { border: "var(--island-violet-border)", text: "var(--island-violet-text)", bg: "var(--island-violet-bg)" },
  slate:  { border: "var(--island-slate-border)",  text: "var(--island-slate-text)",  bg: "var(--island-slate-bg)" },
};
