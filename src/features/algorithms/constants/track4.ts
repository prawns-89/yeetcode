import type { AlgorithmTrack } from "@/features/algorithms/types";

export const track4Graphs: AlgorithmTrack = {
  id: "graphs-advanced",
  name: "Graphs & Advanced",
  description: "BFS, DFS, shortest paths, DSU, DP, segment trees.",
  order: 4,
  chapters: [
    {
      id: "4-1",
      title: "Graph representation",
      topic: "Adjacency list, matrix, edge list",
      estimatedMinutes: 18,
      snippets: [
        {
          id: "adj-list",
          title: "adjacency list",
          difficulty: 1,
          code: `int n = 5;
vector<vector<int>> adj(n);
adj[0].push_back(1);
adj[1].push_back(0);
adj[1].push_back(2);`,
        },
        {
          id: "edge-list",
          title: "edge list with pairs",
          difficulty: 2,
          code: `vector<pair<int,int>> edges;
edges.push_back({0, 1});
edges.push_back({1, 2});
for (auto [u, v] : edges) adj[u].push_back(v);`,
        },
      ],
    },
    {
      id: "4-2",
      title: "BFS & DFS templates",
      topic: "Iterative BFS, recursive DFS",
      estimatedMinutes: 22,
      snippets: [
        {
          id: "bfs",
          title: "BFS from source",
          difficulty: 2,
          code: `vector<int> dist(n, -1);
queue<int> q;
q.push(src); dist[src] = 0;
while (!q.empty()) {
    int u = q.front(); q.pop();
    for (int v : adj[u])
        if (dist[v] == -1) {
            dist[v] = dist[u] + 1;
            q.push(v);
        }
}`,
        },
        {
          id: "dfs",
          title: "recursive DFS",
          difficulty: 2,
          code: `vector<bool> vis(n);
function<void(int)> dfs = [&](int u) {
    vis[u] = true;
    for (int v : adj[u])
        if (!vis[v]) dfs(v);
};
dfs(0);`,
        },
      ],
    },
    {
      id: "4-4",
      title: "Dijkstra's algorithm",
      topic: "priority_queue with pairs",
      estimatedMinutes: 25,
      snippets: [
        {
          id: "dijkstra",
          title: "Dijkstra shortest path",
          difficulty: 3,
          code: `vector<int> dist(n, INT_MAX);
priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
dist[src] = 0; pq.push({0, src});
while (!pq.empty()) {
    auto [d, u] = pq.top(); pq.pop();
    if (d > dist[u]) continue;
    for (auto [v, w] : adj[u])
        if (dist[u] + w < dist[v]) {
            dist[v] = dist[u] + w;
            pq.push({dist[v], v});
        }
}`,
        },
      ],
    },
    {
      id: "4-7",
      title: "DSU / Union-Find",
      topic: "Path compression, union by rank",
      estimatedMinutes: 20,
      snippets: [
        {
          id: "dsu",
          title: "Union-Find template",
          difficulty: 3,
          code: `vector<int> parent(n), rnk(n, 0);
iota(parent.begin(), parent.end(), 0);
function<int(int)> find = [&](int x) {
    return parent[x] == x ? x : parent[x] = find(parent[x]);
};
auto unite = [&](int a, int b) {
    a = find(a); b = find(b);
    if (a == b) return false;
    if (rnk[a] < rnk[b]) swap(a, b);
    parent[b] = a;
    if (rnk[a] == rnk[b]) rnk[a]++;
    return true;
};`,
        },
      ],
    },
    {
      id: "4-9",
      title: "Dynamic programming",
      topic: "1D DP, knapsack patterns",
      estimatedMinutes: 25,
      snippets: [
        {
          id: "dp-1d",
          title: "1D DP recurrence",
          difficulty: 2,
          code: `vector<int> dp(n + 1);
dp[0] = 1; dp[1] = 1;
for (int i = 2; i <= n; i++)
    dp[i] = dp[i-1] + dp[i-2];
cout << dp[n] << "\\n";`,
        },
        {
          id: "knapsack-01",
          title: "0/1 knapsack",
          difficulty: 3,
          code: `vector<int> dp(W + 1);
for (int i = 0; i < n; i++)
    for (int w = W; w >= wt[i]; w--)
        dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);`,
        },
      ],
    },
  ],
};
