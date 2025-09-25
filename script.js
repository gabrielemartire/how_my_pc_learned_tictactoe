import grid_to_value from './grid_to_value.js';
import value_to_grid from './value_to_grid.js';
import print_grid from './print_grid.js';
import promptSync from 'prompt-sync';
import check_winner from './check_winner.js';

function pippo(x) {
    if (x > 0) {
        console.log(x)
        pippo(x - 1)
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let tris_grid = []
let zone_filled = []

let x_phase = true // true = x phase, false = o phase
let grid_value = 0
let winner_found

// 511 means 9 zone filled

while (grid_value < 511) {
    // console.clear()
    console.log('-------------------------------------------------')
    console.log('tris_grid', tris_grid)
    console.log('grid_value', grid_value)

    pippo(10)

    console.log(`${tris_grid[0] || '0'} | ${tris_grid[1] || '1'} | ${tris_grid[2] || '2'}
        \n${tris_grid[3] || '3'} | ${tris_grid[4] || '4'} | ${tris_grid[5] || '5'}
        \n${tris_grid[6] || '6'} | ${tris_grid[7] || '7'} | ${tris_grid[8] || '8'}
    `)  // here i cant use ?? cause i considered false also '' or "" or 0 
    if (x_phase) {
        const matchInput = getRandomInt(9); //promptSync()('Tocca a x, scegli la posizione: ');
        if (matchInput === 'e') { break }
        if (zone_filled.includes(matchInput)) { continue }
        tris_grid[matchInput] = 'x';
        zone_filled.push(matchInput)
    } else {
        const matchInput = getRandomInt(9); //promptSync()('Tocca a o, scegli la posizione: ');
        if (matchInput === 'e') { break }
        if (zone_filled.includes(matchInput)) { continue }
        tris_grid[matchInput] = 'o';
        zone_filled.push(matchInput)
    }
    grid_value = grid_to_value(tris_grid, 'b')
    const winner_checked = check_winner(tris_grid)
    console.log('winner_checked', winner_checked)
    if (winner_checked == 'x') {
        winner_found = 'x'
        break
    }
    if (winner_checked == 'o') {
        winner_found = 'o'
        break
    }
    x_phase = !x_phase
}
console.clear()

print_grid(tris_grid, 'partita finale')

const x_value = grid_to_value(tris_grid, 'x')
const o_value = grid_to_value(tris_grid, 'o')

const x_grid = value_to_grid(x_value, 'x')
const o_grid = value_to_grid(o_value, 'o')

print_grid(x_grid, 'x_grid')

print_grid(o_grid, 'o_grid')

console.log(winner_found, 'win')