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

- queues
  - insertrs are at read and removals are at front
  - circular wrapped array when fixed size is f is front of index, and r is index immedaelty past the read
  - size implemented by (r + size * f) % mod(N)
  - is empty is if front = rear
  - to enqueue then you need to array[r] = object, and then r = (r + 1) mod N
  - for dequeue need object = Q[front], front = (f + 1 )mode N

- Linkedlist
  - access for arrays is get, set at 0(1)
  - structural operations like add and remove take O(n) time
  - advantages of using queue with single linked list is no fullstack exception
  - adding at head and removing at head become O(1) operations
  - insert and deletion of double linked list only takes o(1) time

- a tree is a connected, acyclic, undirected graph. forest is set of trees
-root and subtress
- internal node has at least one child. external node is a leaf
- ancestors of a node is. desceindnants. siblings. depth of a node is number of ancestors excluding the node itself
- heigh of tree is maxiumum depth of any node
- position ADT modeuls notion of place within datastrucutre whre insgle object is stored. just one method p.element()
- each node inclues the eleemnt but also the links connecting the node to its parent and its children. follow links to parent and children
- preorder visisits nodes of tree in systematic manner. each time not visited, preorder visited before its descendants
- could be linked structure where element, parent node is head, and tail is list of  children nodes
- binary tree has at most two children. children are ordered pair with left and right child. used for arthmetic expressions, decision processes, searching
-properties of binary trees
  - number of extenral nodes = internal + 1
  - number of nodes = 2*external - 1
  - height <= numinternal
  - h <= (n-1)/2
  - external <= 2^h
  - height >= log xternal
  - can be linked list structure if left child, right child, and parent node all refrences and element
  - for array based representation: nodes are stored in array using a lebeling number scheme. root is 1, left of childn  is 2 * ranke(parent(node))
  - right child for array is 2 * rank(parent(node) + 1)

  - linked structure requries 3 links (parent, elft, right), and data strucutre has no wasted space
  - for array, lower memory requirements per positon. but if tree is sparce, highly inefficieny to index

  = euler tour: generic travesal of binardy tree. on left is preoder, from below is inorder, on right is postorder

- priorityqueue
  - based on either natural order ora comparator passed to constructor. provides an iterator
  -stabdy flyers, processs scheduling
  - collection of entires, each entry is key value pair
  - keys in priority queue can be arbitrary objects. 
  - entry simple adt,
  - the compartaro adt ecnapsulates action of comparing according to given total order relation
  - generic priorty queue usues auxiliary comparator.
  - sequenceBased pq: 
    - when unordered
      - insert takes o(1) time cause inserting anywhere
      - removeMin o(n) time since have to traverse everything
    -when ordered
      - insert takes o(n) time
      - remove Min and min take O(1) because easy

- heaps:
  -O(logn) insertion, O(logn) removal
  - a min heap is binary tree storying keys at its node that satifies heap order (key(v) >= key(parent(v))) and almost somplete binary tree
  - the internal nodes are to the left of extenal nodes
  - only rightmost internal node may have a single child
  - height of heap is n >= 2^h, h <= log(n)
  - heap with PQ. store key, element pair at each internal node.
  - method insert puts k entry
    - store new entry at next avalailt location, restore the heap order
  - upheap:
    - after insertion of new key, heap order may be violates. so need to swap k along an upawrd path from insertion node. uphaep terminates when the key reaches root or a node whose parent has a smaller key than or equal to key. since heap has height of o(logn) then uprun runs in o(logn)
  - removal is three steps
    - replace the root key with the key of last node that was removed, remove the node, restore heap order
    - known as downheap:
      - we select downward path thorugh minimum key nodes. terminates when key reaches a leage or node whose children have geys great than or equal to key. so swtichesm and runs o log(n) time
  - array based, index is not heap order.
  - root is rank 1, 
  - left child is rank 2*i, parent is floor(i/2), right child is 2*i + 1
  - constuct heap iteratively, but nlogn runtime
  - can construct heap storing n keys using bottom up with logn phases
  - in phase i, each pair of heaps with 2*i -1 keys are merged with an additonal node into heap with 2^(i+1) - 1 keys
  -merging two heaps
    - given a new key
    - create new heap with rot node of new key and two heaps as subtrees.
    - perform downheap to restore heap order
  - bottomup heap construction
    - in worst case each node gets downheaped into bottom of heap
    - we analyze runtime by considering total length
    - each node originates fro single rightgoing path
    - in adition, there is a unique path from root to each nodein tree. thus each node can be travserd by at most one left-going path. since each node is travaersde by at most two paths, total length of paths is o(n). thus bottom up consctuction runs in o(n time)
    - bottom up heap construction is fater than n successive insertions o(nlogn)
    - rescurive makekeap is depth first. iterative is breadth first
    - finding entry by key is at worst O(n) because whole tree
    - if we use location aware entities (like AdaptablePriorityQueues) can take O(1) time.
    - locatin aware entry has key, value, and position in rank, the rank is updated during swapping of tree

- maps:
  - serachable key value entries but unique keys
  - implemnet using unsorted list and entired in a doubly linked list. get(k) would have to gothrough next for each key
  -put needs to go through entire list if not there, add at end
  -takes O(n) time
- hashtable:
  - much faster, with worst case still o(n) but average case is o(1)
  - hash function maps keys of given type to integers
  - a hash table for a given key consisits of hash function and array 
  -hash function is composition of hash code (keys-> integers), and compression function(integers [0..N-1])
  -component sum:
    - parition bits of the key into componenets of fixed length and sum the components
    -it ignores the order of components
  - poynomial hash codes:
  - compression functions:
    -h1 = y mode N
    - size usually chosen t be prime as mutliples less likely with primes
    - 
  - collision handinlg when mapped to same cell
    - separate chaining:
      - let each cell point to a link list of entires that map there, requires additional memory
    - get A[h(k)].get(k)
  - open addressing: linear propbing
    - open address: colliding item is placed in different cell of table. linear probing handles collsiton by placing colliding item next (circularly) in avaible table cell. colliding items lumptogther
  - problem with removal of linear probining, need to have AVAILBLE object which replaces delelted elements which have null key
  - doublie hasing uses secondary has function in addition to primary hashing function.  secondary hash function cannot have zero values. usually q - k mod q wher eq is prime number
  - in worst cases hash table take o(n) time
  - worst case occurs when all keys collide
  - load factor n/N affects performane of hash table. for separate chaning, needs to be less than 0.9, 0.5 for open addressing
  - open adressing more memory efficinet, but separate chaning is faster
  -rehashing when load factor exceeds threshold, larger table allocated with new hash function
  - 
- dictionaries:
  - subtitlies of remove is that if contains more tha one entry with idential key, will only remoe one
  - could e list based:
    - insert take o(1) becaue insert new item at beginning or end of sequence
    - find and remove take o(n) time since in worst case
    -log file or unsorted only good for small dictionaries
  -could be hash table:
    - if use separte chaining to handle collisions, each operatin can be deleated to ist based dictonary stored in each hash table cell
  - ordered dictonaires:
    - find takes olog(n)
    - insert is o(n)
    - remove is o(n)

- java collections framework:
  - container : object grouping mutliple elements into single unit
  - collection frameowkr inclues: interfaces, implmenetations, and algorthims: which are poylmorphic, same method can be used on any different implementations
  -reduces programming effort, increases program speed and quality, allows interoperability among unrelated APIs, reduces effort to learna dn use
  -it is in package.util
  - two ways to traverse: using iterators or for each construct
  -iterator is object that enables you to traverse through collection and to remove items selectively.. call their iterator method
  -.next() calls current element and next element step
  -use collection itself so O(1)
  - for (object o: collection) -> for each
  -listierator treats it as a list. forward and backward travaerasl
  - java supports trhee levels of abstraction: interface, abstract class (no instatnaiton), or concreate classes
  - iterable interface allows an iterator to assocaited with object
  -abstract collection class: 
  - 

- loop invariants /bs
  - binary search implemented as iterative algorthhim,
  - by induction computation will always be in a safe location
  - define exit contidiotn
  - needs to follow pre and post conditions
  -run time for bs is o(logn)
  - bs intearct porly wth meomry heiracy because random acces nature. common to abdon biary search for linear searching as soon as size falls below value of 8
  -boundary conditions yo
  -