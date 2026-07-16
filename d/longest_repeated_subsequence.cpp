/**
 * Problem: Longest Repeated Subsequence Problem
 * 
 * Logic & Approach:
 * Fully implemented dynamic programming solution. Includes a test driver.
 */

#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int longestRepeatedSubsequence(string s) {
        int n = s.length();
        vector<vector<int>> dp(n + 1, vector<int>(n + 1, 0));

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (s[i - 1] == s[j - 1] && i != j) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[n][n];
    }
};

int main() {
    Solution solver;
    string s = "AABEBCDD";
    cout << "Longest Repeated Subsequence length: " << solver.longestRepeatedSubsequence(s) << " (Expected: 3 - ABD)" << endl;
    return 0;
}
