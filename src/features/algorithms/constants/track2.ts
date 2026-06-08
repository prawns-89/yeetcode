import type { AlgorithmTrack } from "@/features/algorithms/types";

export const track2Intermediate: AlgorithmTrack = {
  id: "intermediate-stl",
  name: "Intermediate STL",
  description: "Maps, sets, heaps, deques, and algorithm header utilities.",
  order: 2,
  chapters: [
    {
      id: "2-1",
      title: "std::map & std::set",
      topic: "Ordered containers, bounds, erase",
      estimatedMinutes: 22,
      snippets: [
        {
          id: "map-insert",
          title: "map insert and access",
          difficulty: 1,
          code: `map<string, int> freq;
freq["apple"] = 3;
freq["banana"]++;
cout << freq["apple"] << "\\n";`,
        },
        {
          id: "set-unique",
          title: "set for uniqueness",
          difficulty: 2,
          code: `set<int> seen;
for (int x : nums) seen.insert(x);
cout << seen.size() << "\\n";`,
        },
        {
          id: "lower-bound",
          title: "lower_bound pattern",
          difficulty: 3,
          code: `set<int> s = {1, 3, 5, 7};
auto it = s.lower_bound(4);
if (it != s.end()) cout << *it << "\\n";`,
        },
      ],
    },
    {
      id: "2-2",
      title: "std::unordered_map & unordered_set",
      topic: "Hash tables, custom hash",
      estimatedMinutes: 20,
      snippets: [
        {
          id: "unordered-map",
          title: "unordered_map frequency",
          difficulty: 1,
          code: `unordered_map<int, int> cnt;
for (int x : arr) cnt[x]++;
for (auto& [k, v] : cnt) cout << k << ":" << v << " ";`,
        },
        {
          id: "unordered-set",
          title: "unordered_set lookup",
          difficulty: 2,
          code: `unordered_set<string> words;
words.insert("hello");
if (words.count("hello")) cout << "found\\n";`,
        },
      ],
    },
    {
      id: "2-3",
      title: "std::stack & std::queue",
      topic: "LIFO/FIFO patterns, BFS template",
      estimatedMinutes: 18,
      snippets: [
        {
          id: "stack-basic",
          title: "stack push/pop",
          difficulty: 1,
          code: `stack<int> st;
st.push(1); st.push(2);
cout << st.top() << "\\n";
st.pop();`,
        },
        {
          id: "bfs-template",
          title: "BFS with queue",
          difficulty: 3,
          code: `queue<pair<int,int>> q;
q.push({0, 0});
while (!q.empty()) {
    auto [r, c] = q.front(); q.pop();
    // process cell (r, c)
}`,
        },
      ],
    },
    {
      id: "2-6",
      title: "std::priority_queue",
      topic: "Max-heap, min-heap with greater<>",
      estimatedMinutes: 20,
      snippets: [
        {
          id: "max-heap",
          title: "default max-heap",
          difficulty: 1,
          code: `priority_queue<int> pq;
pq.push(3); pq.push(1); pq.push(4);
cout << pq.top() << "\\n";`,
        },
        {
          id: "min-heap",
          title: "min-heap with greater",
          difficulty: 2,
          code: `priority_queue<int, vector<int>, greater<int>> pq;
pq.push(3); pq.push(1);
cout << pq.top() << "\\n";`,
        },
        {
          id: "dijkstra-pq",
          title: "Dijkstra priority_queue",
          difficulty: 3,
          code: `priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
pq.push({0, src});
while (!pq.empty()) {
    auto [d, u] = pq.top(); pq.pop();
    if (d > dist[u]) continue;
}`,
        },
      ],
    },
  ],
};
