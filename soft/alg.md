- there exists c n0 > 0 : all n >= n0, f(n) <= cg(n)
- 7n - 2 need c > 0 and n >-1 7n-2 <= c*n, n0 - 1 c = 1
- g(n) is O(f(n)) means fn grows more, gn grows less
- big omega is fn(n) is big-omega is there is a constanct c > 0 and an integer constant n0 >= 1 such that f(n) >= c
- bigtheta fn is O(g(n)) if there are constants c1 > 0 and c2 > 0 and an integer constant n0>=1 such that c1
- Big-Oh
 f(n) is O(g(n)) if f(n) is asymptotically less than or
equal to g(n)
big-Omega
 f(n) is Ω(g(n)) if f(n) is asymptotically greater than or
equal to g(n)
big-Theta
 f(n) is Θ(g(n)) if f(n) is asymptotically equal to g(n)
-  O(n
2): For any input size n ≥ n
0, the algorithm takes
no more than cn
2 time on every input.
• Ω(n2): For any input size n ≥ n
0, the algorithm takes at
least cn
2 time on at least one input.
• θ (n2): Do both.
- golden ratio: two quantites are in godlen ratio if ratio of sum of the quantities to larger quantity is equal to the ratio of the larger quantitity to the smaller one.
- binary recursion spawns exponential number of calls. will be exponential running time if inputs decline arithmetically. input needs to decline geometrically for effiicnet
- recursive calls entail a cost time and memory. requires current process state be pushed onto system stack
- java arrays are homogenous
- array f object, name is actually reference pointer to place in memory
- static array, insertion deletion is time consuming beccause neeed to shift
-

- array list
  - worst case takes 0(n) time for shifting
  -remove takes 0(n) time
  - space used is 0(n)
  - everthing else is o(1)

  - could use be extendable array when array is full, if full, replace with larger array
  - add normal takes O(n/c) times
  - doubling is log(n)

  - amortimzed of add operation is O(1)

- stack
  - jvm keeps stack n stack. when method ends, its frame is popped from stack and control passed to top of stack. allows for recursion
  - use index to keep track of top
  - space used is O(n), each operatin run time is O(1)