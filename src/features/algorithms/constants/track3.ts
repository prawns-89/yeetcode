import type { AlgorithmTrack } from "@/features/algorithms/types";

export const track3Searching: AlgorithmTrack = {
  id: "searching-sorting",
  name: "Searching & Sorting",
  description: "Binary search, two pointers, sliding window, prefix sums.",
  order: 3,
  chapters: [
    {
      id: "3-1",
      title: "Binary search — iterative",
      topic: "Classic lo/hi/mid pattern",
      estimatedMinutes: 18,
      snippets: [
        {
          id: "binary-search",
          title: "iterative binary search",
          difficulty: 1,
          code: `int lo = 0, hi = n - 1;
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (a[mid] == target) return mid;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
}
return -1;`,
        },
        {
          id: "first-true",
          title: "binary search on answer",
          difficulty: 3,
          code: `auto ok = [&](int x) { return predicate(x); };
int lo = 0, hi = 1e9, ans = hi;
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (ok(mid)) { ans = mid; hi = mid - 1; }
    else lo = mid + 1;
}`,
        },
      ],
    },
    {
      id: "3-6",
      title: "Two pointers",
      topic: "Opposite ends, same direction",
      estimatedMinutes: 18,
      snippets: [
        {
          id: "two-sum-sorted",
          title: "two pointers on sorted array",
          difficulty: 2,
          code: `int l = 0, r = n - 1;
while (l < r) {
    int sum = a[l] + a[r];
    if (sum == target) return {l, r};
    if (sum < target) l++;
    else r--;
}`,
        },
        {
          id: "remove-duplicates",
          title: "in-place duplicate removal",
          difficulty: 2,
          code: `int w = 1;
for (int r = 1; r < n; r++) {
    if (a[r] != a[r-1]) a[w++] = a[r];
}`,
        },
      ],
    },
    {
      id: "3-7",
      title: "Sliding window",
      topic: "Fixed and variable window",
      estimatedMinutes: 20,
      snippets: [
        {
          id: "fixed-window",
          title: "fixed size window sum",
          difficulty: 2,
          code: `int sum = 0;
for (int i = 0; i < k; i++) sum += a[i];
int best = sum;
for (int i = k; i < n; i++) {
    sum += a[i] - a[i - k];
    best = max(best, sum);
}`,
        },
        {
          id: "variable-window",
          title: "longest window with at most k distinct",
          difficulty: 3,
          code: `unordered_map<int,int> cnt;
int l = 0, best = 0;
for (int r = 0; r < n; r++) {
    cnt[a[r]]++;
    while ((int)cnt.size() > k) {
        if (--cnt[a[l]] == 0) cnt.erase(a[l]);
        l++;
    }
    best = max(best, r - l + 1);
}`,
        },
      ],
    },
    {
      id: "3-8",
      title: "Prefix sums",
      topic: "1D prefix, range queries",
      estimatedMinutes: 15,
      snippets: [
        {
          id: "prefix-sum",
          title: "build prefix array",
          difficulty: 1,
          code: `vector<long long> pref(n + 1);
for (int i = 0; i < n; i++)
    pref[i+1] = pref[i] + a[i];
long long rangeSum = pref[r+1] - pref[l];`,
        },
      ],
    },
  ],
};
