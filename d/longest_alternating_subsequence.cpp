/**
 * Problem: Longest Alternating Subsequence Problem
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
    int longestAlternatingSubsequence(const vector<int>& nums) {
        int n = nums.size();
        if (n < 2) return n;

        int up = 1;
        int down = 1;

        for (int i = 1; i < n; i++) {
            if (nums[i] > nums[i - 1]) {
                up = down + 1;
            } else if (nums[i] < nums[i - 1]) {
                down = up + 1;
            }
        }

        return max(up, down);
    }
};

int main() {
    Solution solver;
    vector<int> nums = {8, 9, 6, 4, 5, 7, 3, 2, 4};
    cout << "Longest Alternating Subsequence length: " << solver.longestAlternatingSubsequence(nums) << " (Expected: 6)" << endl;
    return 0;
}
