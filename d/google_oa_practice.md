# Google OA - Dynamic Programming Practice Guide

Google Online Assessments (OA) are notorious for asking challenging, non-standard Dynamic Programming questions. While Google rarely asks standard textbook DP problems directly, they frequently construct problems that build upon core DP patterns.

This guide groups and ranks the 50 problems in this directory by their relevance to Google OA preparation.

---

## 🎯 Tier 1: High Relevance (Must-Solve for Google OA)
These problems feature patterns that Google frequently uses in OAs: simultaneous paths, game theory/interval DP, state-machine/keypad DP, and coordinate grid DP with constraints.

### 1. Simultaneous Paths / Coordinate Grid DP
*   **Problem:** *Collect maximum points in a matrix by satisfying given constraints (Cherry Pickup)*
    *   **Google Relevance:** Google loves multi-agent or bidirectional path problems on grids. Standard 2D DP fails because decisions made for the first path affect the second. You must track states of both paths simultaneously, e.g., $dp[r_1][c_1][r_2]$ where $c_2 = r_1 + c_1 - r_2$.
    *   **Equivalent File:** `collect_max_points_matrix.cpp`

### 2. Game Theory & Interval DP (Minimax)
*   **Problem:** *Pots of Gold Game using Dynamic Programming (Predict the Winner / Stone Game)*
    *   **Google Relevance:** Competitive games where two players choose elements from the ends of an array. The interval DP state is $dp[i][j]$, representing the max score the current player can get from subarray $A[i \dots j]$.
    *   **Equivalent File:** `pots_of_gold.cpp`

### 3. State-Machine / Keypad Transition DP
*   **Problem:** *Count total possible combinations of N-digit numbers in a mobile keypad (Knight Dialer)*
    *   **Google Relevance:** Finding counts of paths/numbers with transitions defined by graph edges (like knight moves or custom state rules). Solved using $O(N)$ space where $dp[digit][step]$ depends on the neighbors from the previous step.
    *   **Equivalent File:** `mobile_keypad_combinations.cpp`

### 4. Probabilistic / Out-of-Bounds Grid DP
*   **Problem:** *Find Probability that a Person is Alive after Taking N steps on an Island (Out of Boundary Paths)*
    *   **Google Relevance:** Probability states or count states where steps are limited, and moving out of bounds is terminal. Requires careful transition logic for the 4 cardinal directions.
    *   **Equivalent File:** `alive_probability_island.cpp`

### 5. LIS with Binary Search Optimization
*   **Problem:** *Longest Increasing Subsequence (LIS)*
    *   **Google Relevance:** While $O(N^2)$ DP is standard, Google OA expects the $O(N \log N)$ patience sorting / binary search approach, often modified (e.g. finding LIS in 2D like Envelope Nesting, or LIS on strings).
    *   **Equivalent File:** `longest_increasing_subsequence.cpp`

---

## ⚖️ Tier 2: Medium Relevance (Highly Instructive)
These problems represent classic DP paradigms. Google OA questions will often reuse their transitions but add extra constraints (e.g., maximum budget, limited skips, or coordinate restrictions).

*   **Edit Distance / Levenshtein Distance (`levenshtein_distance.cpp`):** Foundational for string alignment and matching.
*   **Word Break DP / Trie (`word_break_dp.cpp` / `word_break_trie.cpp`):** Substring segmentation. Google often asks to segment strings with dictionary checks where letters can be mutated or skipped for a cost.
*   **Matrix Chain Multiplication / Optimal BST (`matrix_chain_multiplication.cpp` / `optimal_bst.cpp`):** Classic interval DP. Solved by partition splitting ($O(N^3)$ complexity).
*   **Maximal Square / Largest Plus (`largest_square_submatrix_of_1s.cpp` / `largest_plus_of_1s.cpp`):** Grid geometry DP. Helps in understanding how to precompute prefix lengths in multiple directions (left, right, up, down).
*   **Interleaving String (`interleaving_strings.cpp`):** String interleaving and matching using 2D grid transitions.

---

## 🪵 Tier 3: Foundational (Warmup & Core Concepts)
These are standard, basic DP problems. You should be able to write the space-optimized versions of these instantly.

*   **0-1 Knapsack & Subset Sum (`zero_one_knapsack.cpp` / `subset_sum.cpp`):** Understand 1D array space-optimization (iterating backwards to avoid reuse).
*   **Maximum Subarray / Kadane's (`maximum_subarray_kadane.cpp`):** Essential linear DP.
*   **LCS / Shortest Common Supersequence (`longest_common_subsequence.cpp` / `shortest_common_supersequence.cpp`):** Core string DP.
*   **Rod Cutting / Coin Change (`rod_cutting.cpp` / `coin_change_unlimited.cpp` / `coin_change_ways.cpp`):** Unbounded Knapsack pattern (iterating forwards to allow reuse).

---

## 💡 Google OA Specific Tips & Strategies

1.  **Space Optimization is Mandatory:**
    If your DP transitions only look back at the previous row (e.g., $dp[i][j]$ only uses values from $dp[i-1]$), Google OA test cases will often run out of memory (MLE) unless you optimize it to $O(W)$ space (using rolling arrays or two rows).
2.  **Combine DP with Graph / Trees:**
    Google frequently combines DP with trees (e.g., finding the maximum path sum or independent set on a tree using recursive post-order traversal) or graphs (using Bellman-Ford/Dijkstra relaxation states).
3.  **Prefix Sum / Segment Tree Optimizations:**
    If your transition is $dp[i] = \max_{j < i} (dp[j]) + C$ and $O(N^2)$ is too slow, Google expects you to optimize the query using a Segment Tree, Fenwick Tree, or Monotonic Queue to solve it in $O(N \log N)$ or $O(N)$ time.
