/**
 * Problem: Longest Common Substring Problem
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
    int longestCommonSubstring(string X, string Y) {
        int m = X.length();
        int n = Y.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        int maxLength = 0;

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (X[i - 1] == Y[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                    maxLength = max(maxLength, dp[i][j]);
                } else {
                    dp[i][j] = 0;
                }
            }
        }
        return maxLength;
    }
};

int main() {
    Solution solver;
    string X = "ABABC", Y = "BABCA";
    cout << "Longest Common Substring length: " << solver.longestCommonSubstring(X, Y) << " (Expected: 4)" << endl;
    return 0;
}
