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

GAMMA = 0.6
@@global_state = {}

def q_value(current_state, current_action, threshold)
  while(1)
    action_states = lookup()
    for state in action_states
      current_state = update_q(state, action, threshold)

      if current_state == action_states[-1]
        break
      else
        place(current_state, current_action)
      end
    end
  end
end
