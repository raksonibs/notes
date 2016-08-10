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

defmodule MyTest do
use ExUnit.Case, async: true
setup do
# run some tedious setup code :ok
end
test "pass" do assert true
end
test "fail" do assert false
end end

 # cast, assoc_constraint, get_change and put_change are all functions defined in Ecto.Changeset, imported by default in your model in web/web.ex.

 video = %Rumbl.Video{id: 1, slug: "hello"} %Rumbl.Video{id: 1, slug: "hello", ...}
iex> Rumbl.Router.Helpers.watch_path(%URI{}, :show, video) "/watch/1-hello"

# You need to do a couple of things to make a connection. First, you decide whether to allow the connection. Next, you create the initial socket, including any custom application setup your application might need.

# Regardless of the transport, the end result is the same. You operate on a shared socket abstraction, and Phoenix takes care of the rest. The beauty of this is that you no longer have to worry how the user is connected. Whether on older browsers over long-polling, native iOS WebSockets, or a custom transport like CoAP2 for embedded devices, your backend channel code remains precisely the same. This is the new web. You’ll be able to quickly adapt your applications as new transport protocols become important to you.
# In our UserSocket, we have two simple functions: connect and id. The id function lets us identify the socket based on some state stored in the socket itself, like the user ID. The connect function decides whether to make a connection. In our case, id returns nil, and connect simply lets everyone in. We’re effectively allowing all connections as anonymous users by default.
# he broadcast! function sends an event to all users on the current topic. It takes three arguments: the socket, the name of the event, and a payload, which is an arbitrary map. Within the body of our callback, we can send as many messages as we’d like.
# is a long-duration connection. With token authentication, we assign a unique token to each user. Tokens allow for a secure authentication mechanism that doesn’t rely on any specific transport.
# Programmers often ask why they can’t access their session cookies in a channel. The answer is that this would be insecure over WebSockets because of cross-domain attacks. Also, cookies would couple channel code to the WebSocket transport, eliminating future transport layers. Fortunately, Phoenix has a better way: the Phoenix.Token.
# We compose a response by rendering an annota- tion.json view for every annotation in our list. Instead of building the list by hand, we use Phoenix.View.render_many. The render_many function collects the render results for all elements in the enumerable passed to it. We use the view to present our data, so we offload this work to the view layer so the channel layer can focus on messaging.

# We used concurrency and recursion to maintain state.
# • We separated the interface from the implementation.
# • We used different abstractions for asynchronous and synchronous com- munication with our server.

# Our OTP counter server works exactly as before, but we’ve gained much by moving it to a GenServer. On the surface, we no longer need to worry about setting up references for synchronous messages. Those are taken care of for us by GenServer.call. Second, the GenServer module is now in control of the receive loop, allowing it to provide great features like code upgrading and handling of system messages, which will be useful when we introspect our system with Observer later on. A GenServer is one of many OTP behaviors. We’ll continue exploring them as we build our information system.
# Though our counter is a trivial service, we’ll play with supervision strategies. Our supervisor needs to be able to restart each service the right way, according to the policies that are best for the application. For example, if a database dies, you might want to automatically kill and restart the associated connection pool. This policy decision should not impact code that uses the database. If we replace a simple supervisor process with a supervisor tree, we can build much more robust fault-tolerance and recovery software.
# With a supervision tree having a configurable policy, you can build robust self-healing software without building complex self-healing software.
# In opts, you can see the policy that our application will use if something goes wrong. OTP calls this policy the supervision strategy. In this case, we’re using the :one_for_one strategy. This strategy means that if the child dies, only that child will be restarted. If all resources depended on some common service, we could have specified :one_for_all to kill and restart all child process if any child dies. We’ll explore those strategies later on.
# It turns out that a still simpler abstraction has many of the benefits of a GenServer. It’s called an agent. With an agent, you have only five main functions: start_link initializes the agent, stop stops the agent, update changes the state of the agent, get retrieves the agent’s current value, and get_and_update performs the last two operations simultaneously. 
iex> import Agent
nil
iex> {:ok, agent} = start_link fn -> 5 end {:ok, #PID<0.57.0>}
iex> update agent, &(&1 + 1)
:ok
iex> get agent, &(&1)
6
iex> stop agent
:ok


iex> import Agent
nil
iex> {:ok, agent} = start_link fn -> 5 end, name: MyAgent {:ok, #PID<0.57.0>}
iex> update MyAgent, &(&1 + 1)
:ok
iex> get MyAgent, &(&1)
6
iex> stop MyAgent
:ok

# When you coded your channels in the last chapter, you might not have known it, but you were building an OTP application. Each new channel was a process built to serve a single user in the context of a single conversation on a topic. Though Phoenix is new, we’re standing on the shoulders of giants. Erlang’s OTP has been around as long as Erlang has been popular—we know that it works. Much of the world’s text-messaging traffic runs on OTP infrastructure.

# OTP stands for Open Telecom Platform, although it's not that much about telecom anymore (it's more about software that has the property of telecom applications, but yeah.) If half of Erlang's greatness comes from its concurrency and distribution and the other half comes from its error handling capabilities, then the OTP framework is the third half of it.
# We want to fetch the most relevant information for a user in real time, across different backends. Since we’re fetching results in parallel, a failure likely means that the network or one of our third-party services failed. That’s out of our control. It doesn’t make sense for us to retry the computation. because this operation is time sensi- tive—a video is playing. Instead, we want to spawn processes in parallel and let them do their work, and we’ll take as many results as we can get. If one of ten of our information systems crashes, it’s not a problem. We’ll use the results from the other nine, so we’ll use the :temporary restart strategy.
# ou’ve ensured that a single crash in an isolated information system won’t impact the rest of your applica- tion. You’ve also configured a supervisor that will in turn be supervised by the application. The result goes beyond simple monitoring. You’ve made some policy decisions to customize our transient information systems into the overall application.
#  Let’s use a technique called proxying. A proxy function is a lightweight function that stands between the original caller and the original implementation to do some simple task. Our generic start_link will proxy individual start_link functions for each of our backends. More specifically, we’ll build a generic information system interface that knows about available backends and spawns a process to query each available backend service, fetches the result, and picks the best result from all possible candidates.

# guard clause on function call “def convert_to_light_seconds(miles) when is_integer(miles) do”

“def convert_to_light_seconds({:miles, miles}) when is_integer(miles) do
  miles * 5.36819e-6
end

def convert_to_light_seconds({:meters, meters}) when is_integer(meters) do
  meters * 3.335638620368e-9
end”

“# a simple way to call our converter function
convert_to_light_seconds({:miles, 2})

# a more elegant, Elixir-y way of doing it
{:miles, 2} |> convert_to_light_seconds
”

