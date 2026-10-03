/**
 * Problem: Implement Diff Utility
 * 
 * Logic & Approach:
 * Fully implemented dynamic programming solution. Includes a test driver.
 */

#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    void printDiff(string X, string Y) {
        int m = X.length();
        int n = Y.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (X[i - 1] == Y[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        lookupDiff(X, Y, m, n, dp);
        cout << endl;
    }

private:
    void lookupDiff(const string& X, const string& Y, int m, int n, const vector<vector<int>>& dp) {
        if (m > 0 && n > 0 && X[m - 1] == Y[n - 1]) {
            lookupDiff(X, Y, m - 1, n - 1, dp);
            cout << " " << X[m - 1];
        }
        else if (n > 0 && (m == 0 || dp[m][n - 1] >= dp[m - 1][n])) {
            lookupDiff(X, Y, m, n - 1, dp);
            cout << " +" << Y[n - 1];
        }
        else if (m > 0 && (n == 0 || dp[m][n - 1] < dp[m - 1][n])) {
            lookupDiff(X, Y, m - 1, n, dp);
            cout << " -" << X[m - 1];
        }
    }
};

int main() {
    Solution solver;
    string X = "ABGHC", Y = "ABEDC";
    cout << "Diff utility result: " << endl;
    solver.printDiff(X, Y);
    return 0;
}
