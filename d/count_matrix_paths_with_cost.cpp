/**
 * Problem: Count number of paths in a matrix with given cost to reach destination cell
 * 
 * Logic & Approach:
 * Fully implemented dynamic programming solution. Includes a test driver.
 */

#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int countPaths(vector<vector<int>>& mat, int cost) {
        int m = mat.size();
        if (m == 0) return 0;
        int n = mat[0].size();
        // dp[i][j][c] stores number of paths from (0,0) to (i,j) with cost c
        vector<vector<vector<int>>> dp(m, vector<vector<int>>(n, vector<int>(cost + 1, 0)));

        if (mat[0][0] <= cost) {
            dp[0][0][mat[0][0]] = 1;
        }

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                for (int c = 0; c <= cost; c++) {
                    if (dp[i][j][c] > 0) {
                        // Move right
                        if (j + 1 < n && c + mat[i][j + 1] <= cost) {
                            dp[i][j + 1][c + mat[i][j + 1]] += dp[i][j][c];
                        }
                        // Move down
                        if (i + 1 < m && c + mat[i + 1][j] <= cost) {
                            dp[i + 1][j][c + mat[i + 1][j]] += dp[i][j][c];
                        }
                    }
                }
            }
        }

        return dp[m - 1][n - 1][cost];
    }
};

int main() {
    Solution solver;
    vector<vector<int>> mat = {
        {4, 7, 1, 6},
        {5, 7, 3, 9},
        {3, 2, 1, 2},
        {1, 1, 6, 3}
    };
    int cost = 25;
    cout << "Number of paths with cost " << cost << ": " << solver.countPaths(mat, cost) << " (Expected: 2)" << endl;
    return 0;
}
