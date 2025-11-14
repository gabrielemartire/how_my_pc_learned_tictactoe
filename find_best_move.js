import grid_to_value from './grid_to_value.js';

function getByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (key === searchValue)
      return value;
  }
}

function match_simulation(tris_grid, best_answer) {
  // Crea copie degli array per non modificare gli originali
  console.log('tris_grid', tris_grid)
  let tris_grid_array = [...tris_grid]
  tris_grid_array[best_answer] = 'x'

  let valid_move = -1
  let find_usefull_position = false
  
  // while(!find_usefull_position){
  //   if (false) {
  //     break
  //   }
    
  //   const try_this_index = best_answer_array[Math.floor(Math.random() * best_answer_array.length)]
  //   tris_grid_array[try_this_index] = 'x'

  //   const asd = simulate_match()
    
  //   if (check_winner(tris_grid_array) == 'o'){
  //     // Reset della cella prima di rimuovere dalla lista
  //     console.log('check_winner', check_winner(tris_grid_array))
  //     console.log('se metti qua la X perderai')
  //     tris_grid_array[try_this_index] = null // o quello che era prima
      
  //     let index = best_answer_array.indexOf(try_this_index);
  //     if (index !== -1) {
  //       best_answer_array.splice(index, 1);
  //     }
  //   } else {
  //     console.log('se metti qua la X non perdi')
  //     console.log('try_this_index', try_this_index)

  //     find_usefull_position = true
  //     valid_move = try_this_index
  //   }
  // }
  
  return valid_move
}

export default function find_best_move(tris_grid, deep_mind, matches){
    //console.log('matches num:', matches)
    //console.log('tris_grid', tris_grid)
    
    const x_value = grid_to_value(tris_grid, 'x')
    const o_value = grid_to_value(tris_grid, 'o')
    const key = `${x_value}_${o_value}`
    
   /*  const player_watchdog = player_watchdog(tris_grid)
    if (player_watchdog) {
      
      here we check if the player are going to win
      the AI should think that o are going to win 
       ex:
          x . .    |    0 1 2
          . . .    |    3 4 5
          o o .    |    6 7 8    
            evem if best move to win cuold be x on 1 or 2
            X should prevent to lose and pick the number 8
            but how? 
            we can chuck the near-o-winner cases and train the ai to say "ok with this move I don't win but at least I don't lose"
    } */
    if (deep_mind.has(key)) {
        const learned_moveset = getByValue(deep_mind, key)
        // FIND VALID MOVESET
        const valid_moveset = learned_moveset.filter(position =>
          tris_grid[position] === undefined || tris_grid[position] === null || tris_grid[position] === ''
        );
        
        if (valid_moveset.length > 0) {
            // V1 
            const best_answer = valid_moveset[Math.floor(Math.random() * valid_moveset.length)]
            const safe_best_answer = match_simulation(tris_grid, best_answer)
            //console.log('AI Best Answer:', best_answer);
            return best_answer
            // V2
            /*const safe_best_answer = check_near_loosing(tris_grid, valid_moveset)
            if (safe_best_answer == -1) {
              console.log('random answer');
              const empty_positions = []
              for (let i = 0; i < 9; i++) {
                if (tris_grid[i] === undefined || tris_grid[i] === null || tris_grid[i] === '') {
                  empty_positions.push(i)
                }
              }
              return empty_positions[Math.floor(Math.random() * empty_positions.length)]
            }
            console.log('AI Best Answer:', safe_best_answer);
            return safe_best_answer*/
        } else {
            // fallback
            //console.log('random answer');
            const empty_positions = []
            for (let i = 0; i < 9; i++) {
              if (tris_grid[i] === undefined || tris_grid[i] === null || tris_grid[i] === '') {
                  empty_positions.push(i)
              }
            }
            return empty_positions[Math.floor(Math.random() * empty_positions.length)]
        }
    } else {
        //console.log('random answer');
        const empty_positions = []
        for (let i = 0; i < 9; i++) {
            if (tris_grid[i] === undefined || tris_grid[i] === null || tris_grid[i] === '') {
                empty_positions.push(i)
            }
        }
        return empty_positions[Math.floor(Math.random() * empty_positions.length)]
    }
}