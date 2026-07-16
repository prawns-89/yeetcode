/**
 * Problem: Subset Sum Problem
 * 
 * Logic & Approach:
 * Fully implemented dynamic programming solution. Includes a test driver.
 */

#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    bool isSubsetSum(const vector<int>& set, int sum) {
        int n = set.size();
        vector<bool> dp(sum + 1, false);
        dp[0] = true;

        for (int i = 0; i < n; i++) {
            for (int j = sum; j >= set[i]; j--) {
                if (dp[j - set[i]]) {
                    dp[j] = true;
                }
            }
        }
        return dp[sum];
    }
};

int main() {
    Solution solver;
    vector<int> set = {3, 34, 4, 12, 5, 2};
    int sum = 9;
    cout << "Is subset sum " << sum << " possible? " << (solver.isSubsetSum(set, sum) ? "Yes" : "No") << " (Expected: Yes)" << endl;
    return 0;
}
