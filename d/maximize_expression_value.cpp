/**
 * Problem: Maximize the Value of an Expression
 * 
 * Logic & Approach:
 * Fully implemented dynamic programming solution. Includes a test driver.
 */

#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
public:
    // Maximize A[l] - A[k] + A[j] - A[i] with l > k > j > i
    int maximizeExpression(const vector<int>& A) {
        int n = A.size();
        if (n < 4) return 0;

        vector<int> L1(n, INT_MIN); // max of -A[i]
        vector<int> L2(n, INT_MIN); // max of A[j] - A[i]
        vector<int> L3(n, INT_MIN); // max of -A[k] + A[j] - A[i]
        vector<int> L4(n, INT_MIN); // max of A[l] - A[k] + A[j] - A[i]

        L1[0] = -A[0];
        for (int i = 1; i < n; i++) L1[i] = max(L1[i - 1], -A[i]);

        L2[1] = L1[0] + A[1];
        for (int i = 2; i < n; i++) L2[i] = max(L2[i - 1], L1[i - 1] + A[i]);

        L3[2] = L2[1] - A[2];
        for (int i = 3; i < n; i++) L3[i] = max(L3[i - 1], L2[i - 1] - A[i]);

        L4[3] = L3[2] + A[3];
        for (int i = 4; i < n; i++) L4[i] = max(L4[i - 1], L3[i - 1] + A[i]);

        return L4[n - 1];
    }
};

int main() {
    Solution solver;
    vector<int> A = {3, 9, 10, 1, 30, 40};
    cout << "Maximized value of A[l] - A[k] + A[j] - A[i]: " << solver.maximizeExpression(A) << " (Expected: 46 - since 40 - 1 + 10 - 3 = 46)" << endl;
    return 0;
}
