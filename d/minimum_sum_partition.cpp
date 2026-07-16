/**
 * Problem: Minimum Sum Partition Problem
 * 
 * Logic & Approach:
 * Fully implemented dynamic programming solution. Includes a test driver.
 */

#include <iostream>
#include <vector>
#include <numeric>
#include <cmath>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minPartition(const vector<int>& S) {
        int n = S.size();
        int sum = accumulate(S.begin(), S.end(), 0);

        vector<bool> dp(sum / 2 + 1, false);
        dp[0] = true;

        for (int i = 0; i < n; i++) {
            for (int j = sum / 2; j >= S[i]; j--) {
                if (dp[j - S[i]]) {
                    dp[j] = true;
                }
            }
        }

        int diff = sum;
        for (int j = sum / 2; j >= 0; j--) {
            if (dp[j]) {
                diff = sum - 2 * j;
                break;
            }
        }
        return diff;
    }
};

int main() {
    Solution solver;
    vector<int> S = {1, 6, 11, 5};
    cout << "Minimum difference between partition sums: " << solver.minPartition(S) << " (Expected: 1 - partition into {1, 5, 6} and {11})" << endl;
    return 0;
}
