/**
 * Problem: Find all N-digit binary strings without any consecutive 1’s
 * 
 * Logic & Approach:
 * Fully implemented dynamic programming solution. Includes a test driver.
 */

#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int countStrings(int n) {
        if (n == 0) return 0;
        vector<int> endWithZero(n + 1, 0);
        vector<int> endWithOne(n + 1, 0);

        endWithZero[1] = 1;
        endWithOne[1] = 1;

        for (int i = 2; i <= n; i++) {
            endWithZero[i] = endWithZero[i - 1] + endWithOne[i - 1];
            endWithOne[i] = endWithZero[i - 1];
        }

        return endWithZero[n] + endWithOne[n];
    }
};

int main() {
    Solution solver;
    int n = 3;
    cout << "Number of " << n << "-digit binary strings without consecutive 1s: " << solver.countStrings(n) << " (Expected: 5 - 000, 001, 010, 100, 101)" << endl;
    return 0;
}
