import type { AlgorithmTrack } from "@/features/algorithms/types";

export const track5CoreCpp: AlgorithmTrack = {
  id: "core-cpp",
  name: "Core C++ Language",
  description: "Pointers, references, class layout, virtual methods, smart pointers, and templates.",
  order: 5,
  language: "C++",
  chapters: [
    {
      id: "5-1",
      title: "Pointers & References",
      topic: "Address-of, dereference, reference alias, pass-by-reference",
      estimatedMinutes: 20,
      snippets: [
        {
          id: "pointers-basics",
          title: "Pointer syntax",
          difficulty: 1,
          code: `int val = 42;
int* ptr = &val;
*ptr = 100;
cout << val << " " << *ptr << "\\n";`,
          explanation: `### Pointers in C++
- \`int*\` defines a pointer variable that stores the memory address of an integer.
- \`&val\` is the address-of operator, retrieving the memory address of \`val\`.
- \`*ptr\` dereferences the pointer, allowing direct read/write access to the memory it points to. Modifying \`*ptr\` changes \`val\`.`
        },
        {
          id: "references-swap",
          title: "Pass by reference swap",
          difficulty: 2,
          code: `void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}`,
          explanation: `### References
- \`int& a\` creates a reference to an integer. It acts as an alias to the original variable passed in.
- Unlike pointers, references do not require dereferencing (\`*\`) or address-of (\`&\`) operators in function calls.
- Modifying \`a\` and \`b\` inside the function directly modifies the argument variables in the caller's scope.`
        }
      ]
    },
    {
      id: "5-2",
      title: "Classes & Object Oriented Programming",
      topic: "Constructors, destructors, inheritance, and virtual functions",
      estimatedMinutes: 25,
      snippets: [
        {
          id: "cpp-class-layout",
          title: "Constructors & member initialization",
          difficulty: 2,
          code: `class Point {
private:
    double x, y;
public:
    Point(double x, double y) : x(x), y(y) {}
    double getX() const { return x; }
};`,
          explanation: `### C++ Class Design
- \`Point(double x, double y) : x(x), y(y) {}\` uses a **member initializer list**. This initializes the member variables directly rather than assigning them inside the constructor body, which is more efficient.
- \`double getX() const\` is a **const member function**. The \`const\` keyword guarantees that this method will not modify any member variables of the object.`
        },
        {
          id: "cpp-polymorphism",
          title: "Virtual functions & inheritance",
          difficulty: 3,
          code: `class Shape {
public:
    virtual double area() const = 0;
    virtual ~Shape() = default;
};`,
          explanation: `### C++ Polymorphism
- \`virtual double area() const = 0;\` declares a **pure virtual function**, making \`Shape\` an abstract base class (interface). Derived classes must implement this method.
- \`virtual ~Shape() = default;\` is critical! A virtual destructor ensures that when a derived class is deleted via a base class pointer, the derived class's destructor is properly executed, avoiding memory leaks.`
        }
      ]
    },
    {
      id: "5-3",
      title: "Memory Management & RAII",
      topic: "std::unique_ptr, std::shared_ptr, and safe resource release",
      estimatedMinutes: 15,
      snippets: [
        {
          id: "smart-pointers",
          title: "Safe unique pointers",
          difficulty: 2,
          code: `unique_ptr<int> ptr = make_unique<int>(10);
unique_ptr<int> other = move(ptr);
if (!ptr) {
    cout << *other << "\\n";
}`,
          explanation: `### Smart Pointers & RAII
- \`unique_ptr\` is a smart pointer that owns and manages another object through a pointer and disposes of that object when the \`unique_ptr\` goes out of scope.
- \`make_unique<int>(10)\` is the preferred and exception-safe way to allocate memory for a unique pointer.
- \`move(ptr)\` transfers ownership of the resource from \`ptr\` to \`other\`. After the move, \`ptr\` becomes null.`
        }
      ]
    },
    {
      id: "5-4",
      title: "Templates & Generics",
      topic: "Template functions and parameter deduction",
      estimatedMinutes: 15,
      snippets: [
        {
          id: "cpp-templates",
          title: "Generic function template",
          difficulty: 2,
          code: `template <typename T>
T getMax(T a, T b) {
    return (a > b) ? a : b;
}
int mx = getMax<int>(5, 10);`,
          explanation: `### C++ Templates
- \`template <typename T>\` tells the compiler that the following block is a generic template, parameterized by type \`T\`.
- The compiler generates the actual function code at compile time when you instantiate the template (e.g. \`getMax<int>(5, 10)\`).
- If omitted, the compiler can often deduce the type argument \`T\` from the parameter types (e.g. \`getMax(5.5, 3.2)\` deduces \`double\`).`
        }
      ]
    }
  ]
};
