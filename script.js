import grid_to_value from './grid_to_value.js';
import value_to_grid from './value_to_grid.js';
import promptSync from 'prompt-sync';

let tris_grid=[]

for(let g=0;g<=8;g++){
    console.log(g)
    const matchInput = promptSync()('Inserisci numero partite: ');
    tris_grid[g] = matchInput;
}

console.log(`${tris_grid[0] || ' '} ${tris_grid[1] || ' '} ${tris_grid[2] || ' '}`)
console.log(`${tris_grid[3] || ' '} ${tris_grid[4] || ' '} ${tris_grid[5] || ' '}`)
console.log(`${tris_grid[6] || ' '} ${tris_grid[7] || ' '} ${tris_grid[8] || ' '}`)

const x_value = grid_to_value(tris_grid, 'x')
const o_value = grid_to_value(tris_grid, 'o')

console.log(`Partita X:`, x_value);
console.log(`Partita O:`, o_value);

const x_grid = value_to_grid(x_value)

console.log(`${x_grid[0] || ''} ${x_grid[1] || ''} ${x_grid[2] || ''}`)
console.log(`${x_grid[3] || ''} ${x_grid[4] || ''} ${x_grid[5] || ''}`)
console.log(`${x_grid[6] || ''} ${x_grid[7] || ''} ${x_grid[8] || ''}`)

