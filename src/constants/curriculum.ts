import { TWO_SUM_SOLUTION } from "@/features/typing/constants/snippets";

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
