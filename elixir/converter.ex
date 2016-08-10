defmodule Converter do 
  def light_to_seconds({:miles, niles} = val, precision: precision), do: (miles* 5.3) |> round

  def round(val) when is_float(val), do: trunc(val)
end