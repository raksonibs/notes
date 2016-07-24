def alphaQ(state)
   return (1.0/state);
end

def update_q(state, action, state_end)
  reward = reward(x, y)
  total = r + (GAMMA * Q.max(state_end))

end

def place(state, action)
  global_state[state] = action
end