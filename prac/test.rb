cat = {"1" => ["2", "3"], "2" => ["4"], "3" => ["1"], "4" => ["1"]}

def circle(keys = nil) 
  keys.each do |k, v|
    k
  end
end