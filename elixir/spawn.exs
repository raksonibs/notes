spawn_link fn -> raise "oops" end

receive do
  {:hello} -> "lets wait until process fails"
end


Task.start fn -> raise "oops" end