import type { Track } from "@/types";
import { TWO_SUM_SOLUTION } from "@/features/typing/constants/snippets";

export const algorithmTracks: Track[] = [
  {
    id: "foundations",
    name: "Foundations",
    description: "Basic STL & syntax — vectors, strings, sorting, lambdas.",
    chapters: [
      {
        id: "1-1",
        title: "Primitive types & I/O",
        topic: "cin/cout, printf/scanf patterns",
        snippetCount: 8,
        estimatedMinutes: 15,
      },
      {
        id: "1-2",
        title: "std::string",
        topic: "substr, find, replace, iterators",
        snippetCount: 10,
        estimatedMinutes: 20,
      },
      {
        id: "1-3",
        title: "std::vector",
        topic: "push_back, resize, reserve, iteration",
        snippetCount: 10,
        estimatedMinutes: 20,
      },
      {
        id: "1-4",
        title: "std::array & C-arrays",
        topic: "Fixed-size arrays, memset, std::fill",
        snippetCount: 8,
        estimatedMinutes: 15,
      },
      {
        id: "1-5",
        title: "std::pair & std::tuple",
        topic: "make_pair, tie, structured bindings",
        snippetCount: 8,
        estimatedMinutes: 15,
      },
      {
        id: "1-6",
        title: "Range-based loops & auto",
        topic: "Modern C++ iteration, auto deduction",
        snippetCount: 8,
        estimatedMinutes: 15,
      },
      {
        id: "1-7",
        title: "Functions & lambdas",
        topic: "Signatures, default args, captures",
        snippetCount: 9,
        estimatedMinutes: 18,
      },
      {
        id: "1-8",
        title: "Sorting with comparators",
        topic: "std::sort, custom & lambda comparators",
        snippetCount: 9,
        estimatedMinutes: 18,
      },
    ],
  },
  {
    id: "intermediate-stl",
    name: "Intermediate STL",
    description: "Maps, sets, heaps, deques, and algorithm header utilities.",
    chapters: [
      {
        id: "2-1",
        title: "std::map & std::set",
        topic: "Ordered containers, bounds, erase",
        snippetCount: 10,
        estimatedMinutes: 22,
      },
      {
        id: "2-2",
        title: "std::unordered_map & unordered_set",
        topic: "Hash tables, custom hash",
        snippetCount: 9,
        estimatedMinutes: 20,
      },
    ],
  },
  {
    id: "searching-sorting",
    name: "Searching & Sorting",
    description: "Binary search, two pointers, sliding window, prefix sums.",
    chapters: [
      {
        id: "3-1",
        title: "Binary search — iterative",
        topic: "Classic lo/hi/mid pattern",
        snippetCount: 8,
        estimatedMinutes: 18,
      },
    ],
  },
  {
    id: "graphs-advanced",
    name: "Graphs & Advanced",
    description: "BFS, DFS, shortest paths, DSU, DP, segment trees.",
    chapters: [
      {
        id: "4-1",
        title: "Graph representation",
        topic: "Adjacency list, matrix, edge list",
        snippetCount: 8,
        estimatedMinutes: 18,
      },
    ],
  },
];

export const placeholderProblems = [
  {
    slug: "two-sum",
    number: 1,
    title: "Two Sum",
    difficulty: "easy" as const,
    source: "leetcode" as const,
    topics: ["Arrays & Hashing"],
    solutionCode: TWO_SUM_SOLUTION,
  },
  {
    slug: "valid-parentheses",
    number: 20,
    title: "Valid Parentheses",
    difficulty: "easy" as const,
    source: "leetcode" as const,
    topics: ["Stack"],
    solutionCode:
      'class Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        for (char c : s) {\n            if (c == \'(\' || c == \'[\' || c == \'{\') st.push(c);\n            else if (st.empty()) return false;\n            else if (c == \')\' && st.top() != \'(\') return false;\n            else if (c == \']\' && st.top() != \'[\') return false;\n            else if (c == \'}\' && st.top() != \'{\') return false;\n            else st.pop();\n        }\n        return st.empty();\n    }\n};',
  },
  {
    slug: "longest-substring",
    number: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium" as const,
    source: "leetcode" as const,
    topics: ["Sliding Window"],
    solutionCode:
      "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        unordered_map<char, int> last;\n        int best = 0, start = 0;\n        for (int i = 0; i < s.size(); i++) {\n            if (last.count(s[i]) && last[s[i]] >= start) {\n                start = last[s[i]] + 1;\n            }\n            last[s[i]] = i;\n            best = max(best, i - start + 1);\n        }\n        return best;\n    }\n};",
  },
];

export const VECTOR_BASICS_SNIPPET = `#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> nums = {1, 2, 3, 4, 5};
    nums.push_back(6);
    nums.emplace_back(7);

    for (int x : nums) {
        cout << x << " ";
    }
    cout << "\\n";
    return 0;
}`;
