import type { AlgorithmTrack } from "@/features/algorithms/types";

export const track1Foundations: AlgorithmTrack = {
  id: "foundations",
  name: "Foundations",
  description: "Basic STL & syntax — vectors, strings, sorting, lambdas.",
  order: 1,
  chapters: [
    {
      id: "1-1",
      title: "Primitive types & I/O",
      topic: "int, long long, cin/cout, printf/scanf patterns",
      estimatedMinutes: 15,
      snippets: [
        {
          id: "hello-world",
          title: "Hello world",
          difficulty: 1,
          code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "Hello, CodeType!" << endl;
    return 0;
}`,
        },
        {
          id: "fast-io",
          title: "Fast I/O template",
          difficulty: 2,
          code: `ios::sync_with_stdio(false);
cin.tie(nullptr);

int n;
cin >> n;
cout << n << "\\n";`,
        },
        {
          id: "long-long-sum",
          title: "long long sum loop",
          difficulty: 2,
          code: `long long sum = 0;
int n;
cin >> n;
while (n--) {
    long long x;
    cin >> x;
    sum += x;
}
cout << sum << "\\n";`,
        },
      ],
    },
    {
      id: "1-2",
      title: "std::string",
      topic: "Constructors, substr, find, replace, compare",
      estimatedMinutes: 20,
      snippets: [
        {
          id: "string-basics",
          title: "String construction",
          difficulty: 1,
          code: `string s = "abc";
string t(s.begin(), s.end());
cout << s.size() << " " << t << "\\n";`,
        },
        {
          id: "string-find",
          title: "find and substr",
          difficulty: 2,
          code: `string s = "abracadabra";
size_t pos = s.find("cad");
if (pos != string::npos) {
    cout << s.substr(pos, 3) << "\\n";
}`,
        },
        {
          id: "string-compare",
          title: "lexicographic compare",
          difficulty: 2,
          code: `string a, b;
cin >> a >> b;
if (a < b) cout << "first\\n";
else if (a > b) cout << "second\\n";
else cout << "equal\\n";`,
        },
      ],
    },
    {
      id: "1-3",
      title: "std::vector",
      topic: "push_back, emplace_back, resize, reserve, iteration",
      estimatedMinutes: 20,
      snippets: [
        {
          id: "vector-build",
          title: "Build a vector",
          difficulty: 1,
          code: `vector<int> v;
v.push_back(1);
v.emplace_back(2);
v.push_back(3);
for (int x : v) cout << x << " ";
cout << "\\n";`,
        },
        {
          id: "vector-reserve",
          title: "reserve and resize",
          difficulty: 2,
          code: `vector<int> v;
v.reserve(100);
v.resize(5, 0);
v[0] = 7;
cout << v.size() << " " << v[0] << "\\n";`,
        },
        {
          id: "vector-sort",
          title: "sort a vector",
          difficulty: 2,
          code: `vector<int> v = {5, 1, 4, 2};
sort(v.begin(), v.end());
for (int x : v) cout << x << " ";
cout << "\\n";`,
        },
      ],
    },
    {
      id: "1-4",
      title: "std::array & C-arrays",
      topic: "Fixed-size arrays, memset, std::fill",
      estimatedMinutes: 15,
      snippets: [
        {
          id: "c-array",
          title: "C-style array",
          difficulty: 1,
          code: `int arr[5] = {1, 2, 3, 4, 5};
for (int i = 0; i < 5; i++) {
    cout << arr[i] << " ";
}
cout << "\\n";`,
        },
        {
          id: "std-array",
          title: "std::array",
          difficulty: 2,
          code: `array<int, 4> a = {1, 2, 3, 4};
for (int x : a) cout << x << " ";
cout << "\\n";`,
        },
        {
          id: "memset-fill",
          title: "memset and fill",
          difficulty: 2,
          code: `int dp[10];
memset(dp, -1, sizeof dp);
fill(dp, dp + 10, 0);
cout << dp[0] << " " << dp[9] << "\\n";`,
        },
      ],
    },
    {
      id: "1-5",
      title: "std::pair & std::tuple",
      topic: "make_pair, tie, structured bindings",
      estimatedMinutes: 15,
      snippets: [
        {
          id: "pair-basic",
          title: "pair basics",
          difficulty: 1,
          code: `pair<int, string> p = {1, "one"};
cout << p.first << " " << p.second << "\\n";`,
        },
        {
          id: "make-pair",
          title: "make_pair in vector",
          difficulty: 2,
          code: `vector<pair<int,int>> edges;
edges.push_back(make_pair(1, 2));
edges.emplace_back(2, 3);
cout << edges[0].second << "\\n";`,
        },
        {
          id: "structured-binding",
          title: "structured bindings",
          difficulty: 2,
          code: `pair<int,int> p = {3, 4};
auto [x, y] = p;
cout << x + y << "\\n";`,
        },
      ],
    },
    {
      id: "1-6",
      title: "Range-based loops & auto",
      topic: "Modern C++ iteration, auto type deduction",
      estimatedMinutes: 15,
      snippets: [
        {
          id: "range-for",
          title: "range-based for",
          difficulty: 1,
          code: `vector<int> v = {1, 2, 3};
for (auto x : v) {
    cout << x << " ";
}
cout << "\\n";`,
        },
        {
          id: "auto-deduction",
          title: "auto deduction",
          difficulty: 2,
          code: `auto n = 42;
auto s = string("code");
auto v = vector<int>{1, 2, 3};
cout << n << " " << s << " " << v.size() << "\\n";`,
        },
        {
          id: "const-ref-loop",
          title: "const reference loop",
          difficulty: 2,
          code: `vector<string> words = {"a", "bb", "ccc"};
for (const auto& w : words) {
    cout << w.size() << " ";
}
cout << "\\n";`,
        },
      ],
    },
    {
      id: "1-7",
      title: "Functions & lambdas",
      topic: "Signatures, default args, lambda captures",
      estimatedMinutes: 18,
      snippets: [
        {
          id: "function-default",
          title: "default arguments",
          difficulty: 1,
          code: `int add(int a, int b = 0) {
    return a + b;
}

cout << add(5) << " " << add(5, 3) << "\\n";`,
        },
        {
          id: "lambda-basic",
          title: "basic lambda",
          difficulty: 2,
          code: `auto square = [](int x) { return x * x; };
cout << square(6) << "\\n";`,
        },
        {
          id: "lambda-capture",
          title: "lambda capture",
          difficulty: 3,
          code: `int offset = 10;
auto bump = [offset](int x) mutable {
    offset++;
    return x + offset;
};
cout << bump(5) << "\\n";`,
        },
      ],
    },
    {
      id: "1-8",
      title: "Sorting with comparators",
      topic: "std::sort, custom & lambda comparators",
      estimatedMinutes: 18,
      snippets: [
        {
          id: "sort-asc",
          title: "ascending sort",
          difficulty: 1,
          code: `vector<int> v = {3, 1, 4, 1, 5};
sort(v.begin(), v.end());
for (int x : v) cout << x << " ";
cout << "\\n";`,
        },
        {
          id: "sort-desc",
          title: "descending sort",
          difficulty: 2,
          code: `vector<int> v = {3, 1, 4, 1, 5};
sort(v.begin(), v.end(), greater<int>());
for (int x : v) cout << x << " ";
cout << "\\n";`,
        },
        {
          id: "sort-pairs",
          title: "sort pairs by second",
          difficulty: 3,
          code: `vector<pair<int,int>> v = {{1,5},{2,1},{3,3}};
sort(v.begin(), v.end(), [](auto& a, auto& b) {
    return a.second < b.second;
});
cout << v[0].first << "\\n";`,
        },
      ],
    },
  ],
};
