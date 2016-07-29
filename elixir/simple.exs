IO.puts "Hello world from Elixir"

f = fn
  x, y when x > 0 -> x + y
  x, y -> x * y
end