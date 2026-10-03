/**
 * Problem: Longest Bitonic Subsequence
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
    int longestBitonicSubsequence(vector<int> nums) {
        int n = nums.size();
        if (n == 0) return 0;

        vector<int> lis(n, 1);
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j]) {
                    lis[i] = max(lis[i], lis[j] + 1);
                }
            }
        }

        vector<int> lds(n, 1);
        for (int i = n - 2; i >= 0; i--) {
            for (int j = n - 1; j > i; j--) {
                if (nums[i] > nums[j]) {
                    lds[i] = max(lds[i], lds[j] + 1);
                }
            }
        }

        int maxLen = 0;
        for (int i = 0; i < n; i++) {
            maxLen = max(maxLen, lis[i] + lds[i] - 1);
        }
        return maxLen;
    }
};

int main() {
    Solution solver;
    vector<int> nums = {4, 2, 5, 9, 7, 6, 10, 3, 1};
    cout << "Longest Bitonic Subsequence length: " << solver.longestBitonicSubsequence(nums) << " (Expected: 7)" << endl;
    return 0;
}
