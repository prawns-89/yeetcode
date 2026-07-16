/**
 * Problem: Rod Cutting Problem
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
    int rodCutting(const vector<int>& price, int n) {
        vector<int> dp(n + 1, 0);

        for (int i = 1; i <= n; i++) {
            int max_val = -1;
            for (int j = 0; j < i; j++) {
                max_val = max(max_val, price[j] + dp[i - j - 1]);
            }
            dp[i] = max_val;
        }

        return dp[n];
    }
};

int main() {
    Solution solver;
    vector<int> price = {1, 5, 8, 9, 10, 17, 17, 20};
    int n = 8;
    cout << "Max Rod Cutting value: " << solver.rodCutting(price, n) << " (Expected: 22)" << endl;
    return 0;
}
