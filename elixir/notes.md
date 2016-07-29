- division always returns float. to get interger div(10,2)
- round(), trunc(), is_boolean(), 
- atmos are constats where name is their own value and are symboles. ooles are actually atoms
- allows string interlopattions "hello #{:world}"
- strings repsresnted by binary
- byte_size and String.length different

add = fn a, b -> a + b end

- invoked via add.(1,2)
-. needed to invoke anyonomus function
- they are first calss citizines meaning pased argumetns to other functions juast as integers or strings are
- double = fn a -> add.(a, a) end = are clusres and can acess variables when function is defined
- ++ or -- to add or subtract lists
- hd, and tl get head and tail of list
- when Elixir sees a list of printable ASCII numbers, Elixir will print that as a char list (literally a list of characters). Char lists are quite common when interfacing with existing Erlang code. Whenever you see a value in IEx and you are not quite sure what it is, you can use the i/1 to retrieve information about it:
- single char are char lists and double quotes are strings
- tuple_size {:ok, "hello"}
-otice that put_elem/3 returned a new tuple. The original tuple stored in the tuple variable was not modified because Elixir data types are immutable. By being immutable, Elixir code is easier to reason about as you never need to worry if a particular code is mutating your data structure in place.
- Lists are stored in memory as linked lists, meaning that each element in a list holds its value and points to the following element until the end of the list is reached. We call each pair of value and pointer a cons cell:
- Tuples, on the other hand, are stored contiguously in memory. This means getting the tuple size or accessing an element by index is fast. However, updating or adding elements to tuples is expensive because it requires copying the whole tuple in memory
- Those performance characteristics dictate the usage of those data structures. One very common use case for tuples is to use them to return extra information from a function. For example, File.read/1 is a function that can be used to read file contents and it returns tuples:
- When “counting” the number of elements in a data structure, Elixir also abides by a simple rule: the function is named size if the operation is in constant time (i.e. the value is pre-calculated) or length if the operation is linear (i.e. calculating the length gets slower as the input grows).
- or and not
- sorting order: number < atom < reference < functions < port < pid < tuple < maps < list < bitstring
- = is the match operator. 
- {a, b, c} = {:hello, "world", 42}
- [ head | tail] = [1,2,3] # head is 1, tail is [2, 3]
- pin operator used to pattern match again existing value rather than rebind
-  [h | _] = [1, 2, 3] underscore is never read from

iex> case {1, 2, 3} do
...>   {4, 5, 6} ->
...>     "This clause won't match"
...>   {1, x, 3} ->
...>     "This clause will match and bind x to 2 in this clause"
...>   _ ->
...>     "This clause would match any value"
...> end
"This clause will match and bind x to 2 in this clause"

iex> x = 1
1
iex> case 10 do
...>   ^x -> "Won't match"
...>   _  -> "Will match"
...> end
"Will match"

case {1, 2, 3} do
...>   {1, x, 3} when x > 0 ->
...>     "Will match"
...>   _ ->
...>     "Would match, if guard condition were not satisfied"
...> end
"Will match"

 f = fn
...>   x, y when x > 0 -> x + y
...>   x, y -> x * y
...> end


iex> cond do
...>   2 + 2 == 5 ->
...>     "This will not be true"
...>   2 * 2 == 3 ->
...>     "Nor this"
...>   1 + 1 == 2 ->
...>     "But this will"
...> end
"But this will"

 if true, do: 1 + 2
 if false, do: :this, else: :that

 is_number(if true do
...>  1 + 2
...> end)
true