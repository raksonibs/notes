defmodule Math do
  def sum(a, b) do
   do_sum(a, b)
  end
  # private function
  defp do_sum(a, b) do 
    a + b
  end

  def zero?(0) do
    true
  end

  def zero?(x) when is_integer(x) do 
    false
  end
  # this has default argument but can be passed last on invocation
  def join(a, b, sep \\ " ") do
      a <> sep <> b
  end
end

IO.puts Math.sum(1,2)