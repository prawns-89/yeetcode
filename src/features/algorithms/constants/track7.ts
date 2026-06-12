import type { AlgorithmTrack } from "@/features/algorithms/types";

export const track7PyTorch: AlgorithmTrack = {
  id: "pandas-pytorch",
  name: "Pandas & PyTorch for ML",
  description: "DataFrames, tensor operations, backpropagation, and deep learning training loops.",
  order: 7,
  language: "Python",
  chapters: [
    {
      id: "7-1",
      title: "Pandas DataFrames",
      topic: "DataFrame manipulation, selection, and group summaries",
      estimatedMinutes: 15,
      snippets: [
        {
          id: "pandas-select",
          title: "DataFrame basics & selection",
          difficulty: 1,
          code: `import pandas as pd
df = pd.DataFrame({"x": [1, 2], "y": [3, 4]})
subset = df[df["x"] > 1]
col_y = df["y"]`,
          explanation: `### Pandas DataFrames
- \`pd.DataFrame(...)\` creates a tabular 2D data structure from a dictionary of lists.
- \`df[df["x"] > 1]\` performs **boolean indexing** to filter rows where column \`x\` is greater than 1.
- \`df["y"]\` selects a single column as a Pandas \`Series\` object.`
        },
        {
          id: "pandas-groupby",
          title: "GroupBy aggregations",
          difficulty: 2,
          code: `import pandas as pd
df = pd.DataFrame({"grp": ["A", "A", "B"], "val": [10, 20, 30]})
summary = df.groupby("grp")["val"].mean()`,
          explanation: `### GroupBy & Summarization
- \`df.groupby("grp")\` groups the rows of the DataFrame by the distinct values in the \`grp\` column (producing groups 'A' and 'B').
- \`["val"].mean()\` selects column \`val\` and computes the average value for each group, returning a grouped series.`
        }
      ]
    },
    {
      id: "7-2",
      title: "PyTorch Tensors",
      topic: "Tensor properties, CUDA transfer, and autograd gradient computations",
      estimatedMinutes: 20,
      snippets: [
        {
          id: "pytorch-tensor-basics",
          title: "Tensor creation & device",
          difficulty: 1,
          code: `import torch
t = torch.tensor([[1.0, 2.0], [3.0, 4.0]])
device = "cuda" if torch.cuda.is_available() else "cpu"
t_gpu = t.to(device)`,
          explanation: `### PyTorch Tensors
- A \`torch.Tensor\` is a multi-dimensional matrix containing elements of a single data type, similar to NumPy arrays but with GPU acceleration support.
- \`torch.cuda.is_available()\` checks if a compatible NVIDIA GPU and CUDA driver are present.
- \`t.to(device)\` moves the tensor memory to the target device (GPU or CPU) for computation.`
        },
        {
          id: "pytorch-autograd",
          title: "Autograd backpropagation",
          difficulty: 2,
          code: `import torch
x = torch.tensor(3.0, requires_grad=True)
y = x ** 2
y.backward()
print(x.grad)`,
          explanation: `### PyTorch Autograd & Gradients
- \`requires_grad=True\` instructs PyTorch to track all operations on this tensor in a computation graph.
- \`y.backward()\` computes the derivative of \`y\` with respect to all leaf tensors tracking gradients (in this case, \`dy/dx = 2*x\`).
- \`x.grad\` stores the calculated derivative value (which evaluates to \`2 * 3.0 = 6.0\`).`
        }
      ]
    },
    {
      id: "7-3",
      title: "PyTorch Neural Networks",
      topic: "Defining neural network architectures using torch.nn modules",
      estimatedMinutes: 20,
      snippets: [
        {
          id: "pytorch-nn-module",
          title: "Custom Neural Network Module",
          difficulty: 3,
          code: `import torch.nn as nn
class SimpleMLP(nn.Module):
    def __init__(self, in_dim, out_dim):
        super().__init__()
        self.fc1 = nn.Linear(in_dim, 64)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(64, out_dim)
    def forward(self, x):
        return self.fc2(self.relu(self.fc1(x)))`,
          explanation: `### PyTorch nn.Module
- A custom neural network class must inherit from \`nn.Module\` and call \`super().__init__()\` to register sub-modules.
- \`nn.Linear(in_dim, 64)\` defines a fully-connected layer that applies a linear transformation: \`y = xW^T + b\`.
- \`forward(self, x)\` defines the computation graph of the model. PyTorch automatically handles backpropagation for this forward path.`
        }
      ]
    },
    {
      id: "7-4",
      title: "Deep Learning Training Loop",
      topic: "Zeroing gradients, loss calculation, backpropagation, and weight updates",
      estimatedMinutes: 25,
      snippets: [
        {
          id: "pytorch-training-loop",
          title: "Training optimization loop",
          difficulty: 3,
          code: `optimizer.zero_grad()
outputs = model(inputs)
loss = criterion(outputs, targets)
loss.backward()
optimizer.step()`,
          explanation: `### PyTorch Training Step
- \`optimizer.zero_grad()\` clears the accumulated gradients of all optimized variables before calculating new gradients (since PyTorch accumulates gradients across calls).
- \`outputs = model(inputs)\` performs the forward pass of the model.
- \`criterion(outputs, targets)\` calculates the loss (discrepancy) between predictions and targets.
- \`loss.backward()\` computes gradients via backpropagation.
- \`optimizer.step()\` updates model weights according to the computed gradients (e.g. via Adam or SGD).`
        }
      ]
    }
  ]
};
