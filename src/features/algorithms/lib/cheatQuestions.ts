// CTF-style exploit challenges — one per track ID.
// Each has a visible code block shown in the terminal.
//
// mode "debug" → code has a deliberate bug, user types the FIXED line/expression
// mode "run"   → user runs the snippet themselves, pastes the exact stdout output as the flag
//
// `answer` is always a short string — the correct submission. Case-sensitive, trimmed.

export type CheatMode = "debug" | "run";

export interface CheatQuestion {
  trackId: string;
  label: string;       // CVE-style identifier
  mode: CheatMode;
  code: string;        // code shown in terminal
  prompt: string;      // instruction shown beneath the code
  answer: string;      // exact string they must submit
}

export const CHEAT_QUESTIONS: Record<string, CheatQuestion> = {
  "algorithms-intermediate": {
    trackId: "algorithms-intermediate",
    label: "CVE-2024-HEAP-001 :: heap invariant violation",
    mode: "debug",
    code: `void heapify(vector<int>& h, int n, int i) {
  int largest = i, l = 2*i+1, r = 2*i+2;
  if (l < n && h[l] > h[largest]) largest = l;
  if (r < n && h[r] > h[largest]) largest = r;
  if (largest != i) { swap(h[i], h[largest]); heapify(h, n, i); }
}`,
    prompt: "There is a logical bug in the recursive call. Submit the corrected final argument.",
    answer: "largest",
  },

  "algorithms-searching": {
    trackId: "algorithms-searching",
    label: "CVE-2024-BSRCH-002 :: off-by-one boundary escape",
    mode: "debug",
    code: `int binarySearch(vector<int>& nums, int target) {
  int lo = 0, hi = nums.size();
  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (nums[mid] == target) return mid;
    else if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
    prompt: "This binary search implementation has a boundary bug. Submit the corrected initialiser for `hi`.",
    answer: "nums.size() - 1",
  },

  "algorithms-graphs": {
    trackId: "algorithms-graphs",
    label: "CVE-2024-DIJKSTRA-003 :: stale-entry check bypass",
    mode: "debug",
    code: `while (!pq.empty()) {
  auto [d, u] = pq.top(); pq.pop();
  if (d < dist[u]) continue;
  for (auto [w, v] : adj[u])
    if (dist[u] + w < dist[v]) {
      dist[v] = dist[u] + w;
      pq.push({dist[v], v});
    }
}`,
    prompt: "There's a logical bug in how stale entries are skipped. Submit the corrected condition expression.",
    answer: "d > dist[u]",
  },

  "algorithms-cpp": {
    trackId: "algorithms-cpp",
    label: "CVE-2024-RAII-004 :: move constructor memory leak",
    mode: "debug",
    code: `UniquePtr(UniquePtr&& o) noexcept : ptr(o.ptr) {
}`,
    prompt: "The move constructor has a severe resource management bug. Submit the single statement missing from its body.",
    answer: "o.ptr = nullptr;",
  },

  "algorithms-python-ml": {
    trackId: "algorithms-python-ml",
    label: "CVE-2024-GRAD-005 :: numerical instability exploit",
    mode: "run",
    code: `import numpy as np

x = np.array([1.0, 2.0, 3.0])
e = np.exp(x - x.max())
out = e / e.sum()
# round each element to 4 decimal places
print([round(float(v), 4) for v in out])`,
    prompt: "Run this snippet locally (python3). Paste the exact stdout output as the flag.",
    answer: "[0.0900, 0.2447, 0.6652]",
  },

  "algorithms-pytorch": {
    trackId: "algorithms-pytorch",
    label: "CVE-2024-AUTOGRAD-006 :: output shape assertion bypass",
    mode: "run",
    code: `import torch, torch.nn as nn

class SwiGLU(nn.Module):
    def __init__(self, dim):
        super().__init__()
        self.w = nn.Linear(dim, dim * 2, bias=False)
    def forward(self, x):
        x1, x2 = self.w(x).chunk(2, dim=-1)
        return x1 * nn.functional.silu(x2)

torch.manual_seed(0)
m = SwiGLU(4)
x = torch.ones(1, 4)
print(tuple(m(x).shape))`,
    prompt: "Run this snippet locally (python3 with torch). Paste the exact stdout output as the flag.",
    answer: "(1, 4)",
  },

  "missing-semester": {
    trackId: "missing-semester",
    label: "CVE-2024-SHELL-007 :: pipeline output injection",
    mode: "run",
    code: `echo "alfa bravo charlie delta echo" \\
  | tr ' ' '\\n' \\
  | awk 'NR%2==0' \\
  | sort -r \\
  | paste -sd','`,
    prompt: "Run this in your shell. Paste the exact stdout line as the flag.",
    answer: "echo,bravo",
  },
};
