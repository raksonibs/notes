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

- ?a gets byte's represented for charater
- <<0,1,2,3>> is binary just sqeuence of bytes
- common to concataer null byte to string to see inner binary rep: "hełło" <> <<0>> # <<104, 101, 197, 130, 197, 130, 111, 0>>
-  <<256 :: size(16)>> # use 16 bits (2 bytes) to store the number <<1, 0>>
<<256 :: utf8>> # the number is a code point
"he" <> rest = "hello"
 rest # "llo"
 list = [{:a, 1}, {:b, 2}]
 list ++ [c: 3]
 [a: 0] ++ list
 [a: 0, a: 1, b: 2]
 - keyword lists: keys must be atms, keys are ordered, keys can be given more than once.

 if false, do: :this, else: :that == if(false, [do: :this, else: :that])
 -

 map = %{:a => 1, 2 => :b}
%{2 => :b, :a => 1}
iex> map[:a]
1
iex> map[2]
:b
iex> map[:c]
nil

%{} = %{:a => 1, 2 => :b}
%{2 => :b, :a => 1}
iex> %{:a => a} = %{:a => 1, 2 => :b}
%{2 => :b, :a => 1}
iex> a
1
iex> %{:c => c} = %{:a => 1, 2 => :b}
** (MatchError) no match of right hand side value: %{2 => :b, :a => 1}

Map.get(%{:a => 1, 2 => :b}, :a)
1
iex> Map.to_list(%{:a => 1, 2 => :b})
[{2, :b}, {:a, 1}]

users = update_in users[:mary].languages, &List.delete(&1, "Clojure")
[john: %{age: 31, languages: ["Erlang", "Ruby", "Elixir"], name: "John"},
 mary: %{age: 29, languages: ["Elixir", "F#"], name: "Mary"}]

 iex> Math.zero?(0)
true
iex> fun = &Math.zero?/1
&Math.zero?/1
iex> is_function(fun)
true
iex> fun.(0)
true

 &is_function/1
&:erlang.is_function/1
iex> (&is_function/1).(fun)
true

& is the capture syntax and can create functions via it
fun = &(&1 + 1)
#Function<6.71889879/1 in :erl_eval.expr/5>
iex> fun.(1)
2


 fun = &List.flatten(&1, &2)
&List.flatten/2
iex> fun.([1, [[2], 3]], [4, 5])
[1, 2, 3, 4, 5]

 secodn argument is number of parameters in /X
- If a function with default values has multiple clauses, it is required to create a function head (without an actual body) for declaring defaults:
defmodule Concat do
  def join(a, b \\ nil, sep \\ " ")

  def join(a, b, _sep) when is_nil(b) do
    a
  end

  def join(a, b, sep) do
    a <> sep <> b
  end
end

IO.puts Concat.join("Hello", "world")      #=> Hello world
IO.puts Concat.join("Hello", "world", "_") #=> Hello_world
IO.puts Concat.join("Hello")               #=> Hello

defmodule Recursion do
  def print_multiple_times(msg, n) when n <= 1 do
    IO.puts msg
  end

  def print_multiple_times(msg, n) do
    IO.puts msg
    print_multiple_times(msg, n - 1)
  end
end

Recursion.print_multiple_times("Hello!", 3)
# Hello!
# Hello!
# Hello!


iex> Enum.map([1, 2, 3], fn x -> x * 2 end)
[2, 4, 6]
iex> Enum.map(%{1 => 2, 3 => 4}, fn {k, v} -> k * v end)
[2, 12]

Enum.reduce(1..3, 0, &+/2)

 odd? = &(rem(&1, 2) != 0)
#Function<6.80484245/1 in :erl_eval.expr/5>
iex> Enum.filter(1..3, odd?)
[1, 3]

- Streams are lazy, composable enumerables.

stream = File.stream!("path/to/file")
#Function<18.16982430/2 in Stream.resource/3>
iex> Enum.take(stream, 10)
- The example above will fetch the first 10 lines of the file you have selected. This means streams can be very useful for handling large files or even slow resources like network resources.
- In Elixir, all code runs inside processes. Processes are isolated from each other, run concurrent to one another and communicate via message passing. Processes are not only the basis for concurrency in Elixir, but they also provide the means for building distributed and fault-tolerant programs.
- Elixir’s processes should not be confused with operating system processes. Processes in Elixir are extremely lightweight in terms of memory and CPU (unlike threads in many other programming languages). Because of this, it is not uncommon to have tens or even hundreds of thousands of processes running simultaneously.
- spawn to span new process: spawn fn -> 1 + 2 end
- 

send self(), {:hello, "world"}
{:hello, "world"}
iex> receive do
...>   {:hello, msg} -> msg
...>   {:world, msg} -> "won't match"
...> end
"world"

iex> parent = self()
#PID<0.41.0>
iex> spawn fn -> send(parent, {:hello, self()}) end
#PID<0.48.0>
iex> receive do
...>   {:hello, pid} -> "Got hello from #{inspect pid}"
...> end
"Got hello from #PID<0.48.0>"
- While other languages would require us to catch/handle exceptions, in Elixir we are actually fine with letting processes fail because we expect supervisors to properly restart our systems. “Failing fast” is a common philosophy when writing Elixir software!

- {:ok, pid} = Agent.start_link(fn -> %{} end)
{:ok, #PID<0.72.0>}
iex> Agent.update(pid, fn map -> Map.put(map, :hello, :world) end)
:ok
iex> Agent.get(pid, fn map -> Map.get(map, :hello) end)
:world
-> agents to update processes state
- {:ok, body} = File.read(file) avoid for error as s, in case of an error, File.read/1 will return {:error, reason} and the pattern matching will fail. You will still get the desired result (a raised error), but the message will be about the pattern which doesn’t match (thus being cryptic in respect to what the error actually is about).

pid = spawn fn ->
...>  receive do: (msg -> IO.inspect msg)
...> end
-  IO.write(pid, "hello")
{:io_request, #PID<0.41.0>, #Reference<0.0.8.91>, {:put_chars, :unicode, "hello"}}
** (ErlangError) erlang error: :terminated

- By modelling IO devices with processes, the Erlang VM allows different nodes in the same network to exchange file processes in order to read/write files in between nodes. Of all IO devices, there is one that is special to each process: the group leader.
- The group leader can be configured per process and is used in different situations. For example, when executing code in a remote terminal, it guarantees messages in a remote node are redirected and printed in the terminal that triggered the request
- A list may represent either a bunch of bytes or a bunch of characters and which one to use depends on the encoding of the IO device. If the file is opened without encoding, the file is expected to be in raw mode, and the functions in the IO module starting with bin* must be used. Those functions expect an iodata as argument; i.e., they expect a list of integers representing bytes and binaries to be given
- On the other hand, :stdio and files opened with :utf8 encoding work with the remaining functions in the IO module. Those functions expect a char_data as an argument, that is, a list of characters or strings.
- 

# Alias the module so it can be called as Bar instead of Foo.Bar
alias Foo.Bar, as: Bar

# Ensure the module is compiled and available (usually for macros)
require Foo

# Import functions from Foo so they can be called without the `Foo.` prefix
import Foo

# Invokes the custom code defined in Foo as an extension point
use Foo

- Note that alias is lexically scoped, which allows you to set aliases inside specific functions:
- In general a module does not need to be required before usage, except if we want to use the macros available in that module. An attempt to call a macro that was not loaded will raise an error. Note that like the alias directive, require is also lexically scoped. We will talk more about macros in a later chapter
- import List, only: [duplicate: 2]
- Although not a directive, use is a macro tightly related to require that allows you to use a module in the current context. The use macro is frequently used by developers to bring external functionality into the current lexical scope, often modules.
- Aliases expand to atoms because in the Erlang VM (and consequently Elixir) modules are always represented by atoms.
- module attributes:
  - They serve to annotate the module, often with information to be used by the user or the VM.
  - They work as constants.
  - They work as a temporary module storage to be used during compilation
- 

- functional languages populer because computers are getting wider, not bigger
- node allows for asynch programming but single thread and external process called event loop, no same as concurrent programming
- allow for distrubuted programming because no mutations
- “Greenspun’s Tenth Rule:

Any sufficiently complicated [distributed architectural pattern in an object-oriented language] contains an ad hoc, informally-specified, bug-ridden, slow implementation of half of [Erlang].”

- impure functional programming
- rebinding variables on fly
- refactoring code into small functions sequence together: currying
- “In math, = means something else entirely. It means the two terms on either side of the sign are equivalent. That’s the way it is with Elixir.”
- “import Physics.Laws, only: [newtons_gravitational_constant: 0]” -> arity
- new_planet = %{name: "Pluto", type: :rocky, ev: 1.1}
List.insert_at(planets, -1, new_planet)
planets ++ new_planet
[new_planet] ++ planets
new_list = [old_list | new_item ]

-“venus = %{venus | ev: 8.4}” - updating venus ev
-“planet_names = for planet <- planets, planet.type == :rocky, do: planet.name”
“planet_names = for %{name: name, type: type} <- planets, type == :rocky, do: name”
“An Application is simply a formalized “parent” process that owns other processes or applications. ”
- “an application is a component implementing some functionality”
- “It’s an .exs file, which means it’s an Elixir script, compiled at runtime.”
- “ Rather than write defensive code to handle errors, Erlang/Elixir developers create supervised processes and handle their exit case.”

