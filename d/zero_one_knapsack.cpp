/**
 * Problem: 0-1 Knapsack problem
 * 
 * Logic & Approach:
 * Fully implemented dynamic programming solution. Includes a test driver.
 */

#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int knapsack(int W, const vector<int>& wt, const vector<int>& val) {
        int n = val.size();
        vector<int> dp(W + 1, 0);

        for (int i = 0; i < n; i++) {
            for (int w = W; w >= wt[i]; w--) {
                dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
            }
        }
        return dp[W];
    }
};

int main() {
    Solution solver;
    vector<int> val = {60, 100, 120};
    vector<int> wt = {10, 20, 30};
    int W = 50;
    cout << "Max Knapsack Value: " << solver.knapsack(W, wt, val) << " (Expected: 220)" << endl;
    return 0;
}
