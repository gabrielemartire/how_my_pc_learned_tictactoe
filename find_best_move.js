import grid_to_value from './grid_to_value.js';

function getByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (key === searchValue)
      return value;
  }
}

export default function find_best_move(tris_grid, deep_mind, matches){
    console.log('matches num:', matches)
    console.log('tris_grid', tris_grid)
    
    const x_value = grid_to_value(tris_grid, 'x')
    const o_value = grid_to_value(tris_grid, 'o')
    const key = `${x_value}_${o_value}`;
    
    if (deep_mind.has(key)) {
        console.log('deep_mind.has(key)')
        console.log('key', key)

        const learned_info = getByValue(deep_mind, key)
        console.log('learned_info', learned_info)

        // OTTIENI LE MOSSE VALIDE 
        const valid_moves = learned_info.filter(position => 
            tris_grid[position] === undefined || tris_grid[position] === null || tris_grid[position] === ''
        );
        console.log('valid_moves', valid_moves)
        
        if (valid_moves.length > 0) {
            const best_answer = valid_moves[Math.floor(Math.random() * valid_moves.length)]
            console.log('------USING AI-best_answer---', best_answer, '---------')
            return best_answer
        } else {
            // fallback
            console.log('-------USING RANDOM-------------')
            const empty_positions = []
            for (let i = 0; i < 9; i++) {
              if (tris_grid[i] === undefined || tris_grid[i] === null || tris_grid[i] === '') {
                  empty_positions.push(i)
              }
            }
            return empty_positions[Math.floor(Math.random() * empty_positions.length)]
        }
    } else {
        console.log('-------USING RANDOM-------------')
        // anche qui, scegli solo tra posizioni libere
        const empty_positions = []
        for (let i = 0; i < 9; i++) {
            if (tris_grid[i] === undefined || tris_grid[i] === null || tris_grid[i] === '') {
                empty_positions.push(i)
            }
        }
        return empty_positions[Math.floor(Math.random() * empty_positions.length)]
    }
}