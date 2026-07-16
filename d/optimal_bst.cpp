/**
 * Problem: Find Optimal Cost to Construct Binary Search Tree
 * 
 * Logic & Approach:
 * Fully implemented dynamic programming solution. Includes a test driver.
 */

#include <iostream>
#include <vector>
#include <numeric>
#include <climits>
#include <algorithm>

using namespace std;

class Solution {
public:
    int optimalSearchTree(const vector<int>& keys, const vector<int>& freq) {
        int n = keys.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));

        for (int i = 0; i < n; i++) {
            dp[i][i] = freq[i];
        }

        for (int L = 2; L <= n; L++) {
            for (int i = 0; i <= n - L; i++) {
                int j = i + L - 1;
                dp[i][j] = INT_MAX;
                int sumFreq = getSum(freq, i, j);

                for (int r = i; r <= j; r++) {
                    int cost = ((r > i) ? dp[i][r - 1] : 0) +
                               ((r < j) ? dp[r + 1][j] : 0) +
                               sumFreq;
                    dp[i][j] = min(dp[i][j], cost);
                }
            }
        }
        return dp[0][n - 1];
    }

private:
    int getSum(const vector<int>& freq, int i, int j) {
        int s = 0;
        for (int k = i; k <= j; k++) {
            s += freq[k];
        }
        return s;
    }
};

int main() {
    Solution solver;
    vector<int> keys = {10, 12, 20};
    vector<int> freq = {34, 8, 50};
    cout << "Optimal BST Cost: " << solver.optimalSearchTree(keys, freq) << " (Expected: 142)" << endl;
    return 0;
}
