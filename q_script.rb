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
