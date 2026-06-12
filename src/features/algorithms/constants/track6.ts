import type { AlgorithmTrack } from "@/features/algorithms/types";

export const track6PythonML: AlgorithmTrack = {
  id: "python-numpy",
  name: "Python & NumPy for ML",
  description: "Python syntax, list comprehensions, slicing, vectorization, and broadcasting.",
  order: 6,
  language: "Python",
  chapters: [
    {
      id: "6-1",
      title: "Python ML Essentials",
      topic: "List comprehensions, dictionary creation, tuple unpacking, and zip operations",
      estimatedMinutes: 15,
      snippets: [
        {
          id: "list-comps",
          title: "List & Dict comprehensions",
          difficulty: 1,
          code: `nums = [1, 2, 3, 4, 5]
squares = [x**2 for x in nums if x % 2 != 0]
lookup = {f"k_{x}": x for x in nums}`,
          explanation: `### Python Comprehensions
- \`squares = [x**2 for x in nums if x % 2 != 0]\` creates a new list by squaring odd numbers. This is cleaner and faster than a standard for-loop.
- \`lookup = {f"k_{x}": x for x in nums}\` is a dictionary comprehension that constructs key-value pairs dynamically.`
        },
        {
          id: "zip-unpacking",
          title: "ZIP & structural unpacking",
          difficulty: 2,
          code: `labels = ["dog", "cat"]
scores = [0.95, 0.82]
for idx, (label, score) in enumerate(zip(labels, scores)):
    print(f"{idx}: {label} ({score})")`,
          explanation: `### Zip & Enumeration
- \`zip(labels, scores)\` iterates over both lists in parallel, returning tuples of elements.
- \`(label, score)\` destructures/unpacks the tuples in-place during the loop.
- \`enumerate(...)\` adds a counter to the iteration, returning pairs of \`(index, item)\`.`
        }
      ]
    },
    {
      id: "6-2",
      title: "NumPy Arrays & Slicing",
      topic: "Array initialization, shapes, multidimensional slicing, and boolean indexing",
      estimatedMinutes: 20,
      snippets: [
        {
          id: "numpy-create-reshape",
          title: "Creation & reshaping",
          difficulty: 1,
          code: `import numpy as np
arr = np.arange(6)
grid = arr.reshape(2, 3)
print(grid.shape, grid.dtype)`,
          explanation: `### NumPy Array Creation & Shapes
- \`np.arange(6)\` returns a 1D array of values from 0 to 5.
- \`arr.reshape(2, 3)\` changes the dimensions of the array to a 2D matrix (2 rows, 3 columns) without copying the underlying memory.
- \`grid.shape\` returns the dimensions \`(2, 3)\`, and \`grid.dtype\` represents the data type (e.g. \`int64\`).`
        },
        {
          id: "numpy-slicing",
          title: "Multi-dimensional slicing",
          difficulty: 2,
          code: `import numpy as np
matrix = np.array([[1, 2, 3], [4, 5, 6]])
col_1 = matrix[:, 0]
sub_grid = matrix[0:2, 1:3]`,
          explanation: `### Multi-dimensional Slicing
- In \`matrix[row, col]\`, the colon \`:\` denotes a slice.
- \`matrix[:, 0]\` selects all rows (\`:\`) and only column 0, returning \`[1, 4]\`.
- \`matrix[0:2, 1:3]\` selects rows 0 and 1, and columns 1 and 2, returning the sub-matrix \`[[2, 3], [5, 6]]\`.`
        },
        {
          id: "numpy-masking",
          title: "Boolean masking",
          difficulty: 2,
          code: `import numpy as np
arr = np.array([1, 12, 3, 14, 5])
mask = arr > 10
filtered = arr[mask]
arr[arr < 5] = 0`,
          explanation: `### Boolean Masking & Indexing
- \`arr > 10\` performs an element-wise comparison and returns a boolean array: \`[False, True, False, True, False]\`.
- \`arr[mask]\` filters \`arr\`, keeping only elements where \`mask\` is \`True\`.
- \`arr[arr < 5] = 0\` performs in-place assignment to update all values less than 5 to 0.`
        }
      ]
    },
    {
      id: "6-3",
      title: "Vectorization & Aggregations",
      topic: "Element-wise math, dot products, broadcasting, and axes operations",
      estimatedMinutes: 20,
      snippets: [
        {
          id: "numpy-matmul",
          title: "Vectorization & dot product",
          difficulty: 2,
          code: `import numpy as np
a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])
element_wise = a * b
matrix_product = a @ b`,
          explanation: `### NumPy Vectorization & Matrix Math
- Vectorization refers to performing operations on entire arrays without writing explicit loops in Python, leveraging optimized C/Fortran backends.
- \`a * b\` computes the **element-wise product** (Hadamard product).
- \`a @ b\` computes the **matrix multiplication** (equivalent to \`np.dot(a, b)\`).`
        },
        {
          id: "numpy-broadcasting",
          title: "Broadcasting operations",
          difficulty: 2,
          code: `import numpy as np
matrix = np.array([[1, 2, 3], [4, 5, 6]])
row_vec = np.array([1, 0, -1])
scaled = matrix + row_vec`,
          explanation: `### Array Broadcasting
- Broadcasting allows arithmetic operations on arrays of different shapes.
- The smaller array \`row_vec\` (shape \`(3,)\`) is "broadcast" (replicated virtually) across each row of the larger \`matrix\` (shape \`(2, 3)\`).
- This performs element-wise addition across each row without explicit duplication, saving memory.`
        },
        {
          id: "numpy-axes",
          title: "Aggregations along axes",
          difficulty: 3,
          code: `import numpy as np
x = np.array([[1, 2], [3, 4]])
col_sums = x.sum(axis=0)
row_means = x.mean(axis=1)`,
          explanation: `### Aggregations & Axes
- Aggregations collapse dimensions of an array.
- \`axis=0\` represents columns. \`x.sum(axis=0)\` sums values vertically down columns, returning \`[4, 6]\`.
- \`axis=1\` represents rows. \`x.mean(axis=1)\` averages values horizontally across rows, returning \`[1.5, 3.5]\`.`
        }
      ]
    }
  ]
};
