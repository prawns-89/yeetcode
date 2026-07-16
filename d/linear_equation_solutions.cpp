/**
 * Problem: Total possible solutions to linear equation of k variables
 * 
 * Logic & Approach:
 * Fully implemented dynamic programming solution. Includes a test driver.
 */

#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int countSolutions(const vector<int>& coeff, int rhs) {
        vector<int> dp(rhs + 1, 0);
        dp[0] = 1;

        for (int c : coeff) {
            for (int i = c; i <= rhs; i++) {
                dp[i] += dp[i - c];
            }
        }
        return dp[rhs];
    }
};

int main() {
    Solution solver;
    vector<int> coeff = {1, 2, 3};
    int rhs = 4;
    cout << "Total solutions to x + 2y + 3z = 4: " << solver.countSolutions(coeff, rhs) << " (Expected: 4)" << endl;
    return 0;
}
