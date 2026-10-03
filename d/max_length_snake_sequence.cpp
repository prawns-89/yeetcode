/**
 * Problem: Maximum Length Snake Sequence
 * 
 * Logic & Approach:
 * Fully implemented dynamic programming solution. Includes a test driver.
 */

#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>

using namespace std;

class Solution {
public:
    int findSnakeSequence(const vector<vector<int>>& grid) {
        int m = grid.size();
        if (m == 0) return 0;
        int n = grid[0].size();
        vector<vector<int>> dp(m, vector<int>(n, 0));
        int maxLen = 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i > 0 && abs(grid[i][j] - grid[i - 1][j]) == 1) {
                    dp[i][j] = max(dp[i][j], dp[i - 1][j] + 1);
                }
                if (j > 0 && abs(grid[i][j] - grid[i][j - 1]) == 1) {
                    dp[i][j] = max(dp[i][j], dp[i][j - 1] + 1);
                }
                maxLen = max(maxLen, dp[i][j]);
            }
        }
        return maxLen; // returns number of steps, number of elements is maxLen + 1
    }
};

int main() {
    Solution solver;
    vector<vector<int>> grid = {
        {9, 6, 5, 2},
        {8, 7, 6, 5},
        {7, 3, 1, 6},
        {1, 1, 1, 7}
    };
    cout << "Snake sequence length (steps): " << solver.findSnakeSequence(grid) << " (Expected: 4)" << endl;
    return 0;
}
