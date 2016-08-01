# The reason is that Elixir’s lightweight concurrency removes the need for stop-the-world garbage collectors. 
# Erlang has a great model for concurrency. Facebook bought WhatsApp for $21 billion. That application achieved two million concurrently running connections on a single node.
#   The router compiles down to the cat-quick pattern matching. You won’t have to spend days on performance tuning before you even leave the routing layer.
#  Templates are precompiled. Phoenix doesn’t need to copy strings for each rendered template. At the hardware level, you’ll see caching come into play for these strings where it never did before.
# Functional languages do better on the web. Throughout this book, you’ll learn why.

# If you’re using an object-oriented web framework, chances are that you’re watching the evolution of multicore architectures anxiously. You probably already know that the existing imperative models won’t scale to handle the types of concurrency we’ll need to run on hardware with thousands of cores. The problem is that languages like Java and C# place the burden of managing concurrency squarely on the shoulders of the programmer. Languages like PHP and Ruby make threading difficult to the point where many developers try to support only one web connection per operating-system process, or some structure that is marginally better. In fact, many people that come to Phoenix find us precisely because concurrency is so easy.
#  When you have two database fetches, you won’t have to artificially batch them together with a stored procedure or a complex query. You can let them work at the same time
# This code is more reliable. Elixir is based on the libraries that form the backbone of the most reliable systems in the world. You can start concurrent tasks and services that are fully supervised. When one crashes, Elixir can restart it in the last known good state, along with any tainted related service.
# Reliability and performance don’t need to be mutually exclusive.

# Elixir is perhaps the first functional language to support Lisp-style macros with a more natural syntax. This feature, like a template for code, is not always the right tool for everyday users, but macros are invaluable for extending the Elixir language to add the common features all web servers need to support.
# In Phoenix, you won’t have to read through dozens of skip_before_filter commands to know how your code works. You’ll just build a pipeline for each group of routes that work the same way.
 # Inheritance works best when a single feature extends a framework across a single dimension. Unfortunately, many ambitious features span several different dimensions.
 # Scaling by Forgetting with trandtional web applications as fore web programming was popular, client-server applications were simple. A client process or two communicated to its own process on the server. Programmers had a difficult time making applications scale. Each application connection required its own resources: an operating-system pro- cess, a network connection, a database connection, and its own memory. Hardware didn’t have enough resources to do that work efficiently, and lan- guages couldn’t support many processes, so scalability was limited.
 #  But there’s a cost. The developer must keep track of the state for each request, and that burden can be particularly arduous for newer, more interactive applications with intimate, long-running rich interactions. As a developer, until now, you’ve been forced to make a choice between applications that intentionally forget important details to scale and applications that try to remember too much and break under load.
 # because it supports a feature called lightweight processes.
# lightweight connections, and that matters because connections can be conver- sations. 
# 
def handle_in("new_annotation", params, socket) do broadcast! socket, "new_annotation", %{
user: %{username: "anon"}, body: params["body"],
at: params["at"]
}
{:reply, :ok, socket}
end

def inc(x), do: x+1
def dec(x), do: x-1

2 |> inc |> inc |> dec
# |> is pipe operator
# connection |> phoenix where the connection is a struct, a map with known fields like http etc.
# api layer of phoeni is aach function cals other fucntion, and first argument is the connection of functions

connection
|> endpoint
|> router
|> pipelines
|> controller

connection
|> controller
|> common_services
|> action

# we try to limit side effects—functions that touch and possibly change the outside world—to the controller. We’ll try to keep the functions in our models and views pure, so that calling the same function with the same arguments will always yield the same results.
# In Phoenix, you’ll want to separate the code that calls another web server, or fetches code from a database, from the code that processes that data. We process data in the model; we read or write that data through the controller. Ecto allows us to organize our code in this way. It separates the code with side effects, which changes the world around us, from the code that’s only transforming data.

defmodule Place do
...> def city(%{city: city}), do: city
...> def texas?(%{state: "Tx"}), do: true
...> def texas?(_), do: false ...> end

# Match all maps with a given key, as in has_state?(%{state: _}), where the underscore _ will match anything
# Think of the Plug library as a specification for building applications that connect to the web. Each plug consumes and produces a common data structure called Plug.Conn. Remember, that struct represents the whole universe for a given request, because it has things that web applications need: the inbound request, the protocol, the parsed parameters, and so on.
# 
# Think of each individual plug as a function that takes a conn, does something small, and returns a slightly changed conn. The web server provides the initial data for our request, and then Phoenix calls one plug after another. Each plug can transform the conn in some small way until you eventually send a response back to the user.
# Even responses are just transformations on the connection. When you hear words like request and response, you might be tempted to think that a request is a plug function call, and a response is the return value. That’s not what happens. A response is just one more action on the connection,

# Plugs are functions.
# Your web applications are pipelines of plugs.

# When you think about it, a pipeline is just a bigger plug that takes a conn struct and returns one too.
# After compilation, templates are functions. Since Phoenix builds templates using linked lists rather than string concatenation the way many imperative languages do, one of the traditional bottlenecks of many web frameworks goes away. Phoenix doesn’t have to make huge copies of giant strings.
# Since Elixir has only a single copy of the largest and most frequently used strings in your application, the hardware caching features of most CPUs can come into play. The book’s introduction talked about the performance of the routing layer. The per- formance of the view layer is just as important.

# Ecto also has a feature called changesets that holds all changes you want to perform on the database. It encapsulates the whole process of receiving external data, casting and validating it before writing it to the database.
# Ecto is likely going to be a little different from many of the persistence layers you’ve used before. If you want Ecto to get something, you have to explicitly ask for it. This feature will probably seem a little tedious to you at first, but it’s the only way to guarantee that your application has predictable perfor- mance when the amount of data grows.
# Now, our database is configured, and the schema exists. Phoenix is built on top of OTP, a layer for reliably managing services. We can use OTP to start key services like Ecto repositories in a supervised process so that Ecto andPhoenix can do the right thing in case our repository crashes. The process that manages all this is called Rumbl.Repo, and we start it in our application’s supervision tree in lib/rumbl.ex,

# Changesets let Ecto manage record changes, cast parameters, and perform validations. We use a changeset to build a customized strategy for dealing with each specific kind of change, such as creating a user or updating sensitive information.
# One size does not fit all when it comes to update strategies.
# To solve the form_for coupling problem, we defined a protocol named Phoenix.HTML.Form- Data, which separates the interface from the implementation. Ecto.Changeset implements this protocol to convert its internal data to the structure required by Phoenix forms, all properly documented in the Phoenix.HTML.FormData contract.

#  There are two kinds of plugs: module plugs and function plugs. A function plug is a single function. A module plug is a module that provides two functions with some configuration details. Either way, they work the same.
# You specify a function plug with the name of the function as an atom. Because a module is just a collection of functions, it strengthens the idea that plugs are just functions.
defmodule NothingPlug do 
  def init(opts) do
    opts
  end

  def call(conn, _opts) do 
    conn
  end 
end

# Remember, a typical plug transforms a connection. The main work of a module plug happens in call. In our NothingPlug, we simply pass the connection through without changes. The call will happen at runtime.
# Sometimes, you might need Phoenix to do some heavy lifting to transform options. That’s the job of the init function. init will happen at compile time. Plug uses the result of init as the second argument to call. Because init is called at compilation time, it’s the perfect place to validate options and prepare some of the work. That way, call can be as fast as possible. Since call is the workhorse, we want it to do as little work as possible.
# 
# At this point, you may also be wondering what happened with halt. When we changed the index action, we had to explicitly check if the connection halted or not, before acting on it. Plug pipelines explicitly check for halted: true between every plug invocation, so the halting concern is neatly solved by Plug.

plug :one
plug Two
plug :three, some: :option
# compiles to

case one(conn, []) do
%{halted: true} = conn -> conn conn ->
case Two.call(conn, Two.init([])) do %{halted: true} = conn -> conn conn ->
case three(conn, some: :option) do %{halted: true} = conn -> conn conn -> conn
end end
end

# Ecto associations are explicit! When you want Ecto to fetch some records, you need to ask. When you don’t ask, you can be sure that you won’t get them. This decision may seem tedious at first, but it’s useful. One of the most time-consuming things about dealing with persistence frameworks is that they can often fetch rows you don’t need or fetch in inefficient ways. When these kinds of changes cascade, you can quickly run up a tab that you’re unable to pay.
# user = Repo.preload(user, :videos)
# iex> user = Repo.get_by!(User, username: "josevalim") %Rumbl.User{...}
# iex> attrs = %{title: "hi", description: "says hi", url: "example.com"} iex> video = Ecto.build_assoc(user, :videos, attrs)
# %Rumbl.Video{...}
# iex> video = Repo.insert!(video) %Rumbl.Video{...}
# Ecto.build_assoc allows us to build a struct, with the proper relationship fields already set. 

# query = Ecto.assoc(user, :videos)
# Repo.all(query)

# This time, instead of building the whole query at once, we write it in small steps, adding a little more information along the way. This strategy works because Ecto defines something called the queryable protocol. from receives a queryable, and you can use any queryable as a base for a new query. A queryable is an Elixir protocol.

# iex> query = Category
# Category
# iex> query = from c in query, order_by: c.name #Ecto.Query<>
# iex> query = from c in query, select: {c.name, c.id} #Ecto.Query<>
# iex> Repo.all query
# [{"Action", 1}, {"Comedy", 4}, {"Drama", 2},
#  {"Romance", 3}, {"Sci-fi", 5}]

username = "josevalim" "josevalim"
iex> Repo.one(from u in User, where: u.username == ^username)

# The ^ operator interpolates values into our queries where Ecto can scrub them and safely put them to use, without the risk of SQL injection. Armed with our schema definition, Ecto is able to cast the values properly for us and match up Elixir types with the expected database types.
# In other words, we define the repository and schemas and let Ecto changesets and queries tie them up together. This strategy gives developers the proper level of isolation because we mostly work with data, which is straightforward, and leave all complex operations to the repository.
# More explicitly, we’d like to keep functions with side effects—the ones that change the world around us—in the controller while the model and view layers remain side effect free. Since Ecto splits the responsibilities between the repository and its data API, it fits our world view perfectly

Repo.one from u in User,
select: count(u.id),
where: ilike(u.username, ^"j%") or
ilike(u.username, ^"c%")

 users_count = from u in User, select: count(u.id)

# User |>
# select([u], count(u.id)) |>
# where([u], ilike(u.username, ^"j%") or ilike(u.username, ^"c%")) |> Repo.one()

# A programming truism is that the best abstractions offer an escape hatch, one that exposes the user to one deeper level of abstraction on demand. Ecto has such a feature, called the query fragment. A query fragment sends part of a query directly to the database but allows you to construct the query string in a safe way.

from(u in User,
where: fragment("lower(username) = ?",
                     ^String.downcase(uname)))

# Ecto.Adapters.SQL.query(Rumbl.Repo, "SELECT power($1, $2)", [2, 10])

Repo.all from u in User,
  join: v in assoc(u, :videos),
  join: c in assoc(v, :category),
  where: c.name == "Comedy",
  select: {u, v}

# The third approach is a hybrid approach whereby the application layer (and web server) use database services like referential integrity and transactions to strike a balance between the needs of the application layer and the needs of the database

iex> import Ecto.Changeset
iex> changeset = Ecto.Changeset.change(category)
iex> changeset = foreign_key_constraint(changeset, :videos,
name: :videos_category_id_fkey, message: "still exist") iex> Repo.delete changeset
{:error, changeset}