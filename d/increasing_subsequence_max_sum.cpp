/**
 * Problem: Increasing Subsequence with Maximum Sum
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
    int maxSumIS(vector<int> nums) {
        int n = nums.size();
        if (n == 0) return 0;
        vector<int> msis = nums;

        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j] && msis[i] < msis[j] + nums[i]) {
                    msis[i] = msis[j] + nums[i];
                }
            }
        }

        return *max_element(msis.begin(), msis.end());
    }
};

int main() {
    Solution solver;
    vector<int> nums = {1, 101, 2, 3, 100, 4, 5};
    cout << "Max Sum Increasing Subsequence: " << solver.maxSumIS(nums) << " (Expected: 106)" << endl;
    return 0;
}
