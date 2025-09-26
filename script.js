import grid_to_value from './grid_to_value.js';
import value_to_grid from './value_to_grid.js';
import print_grid from './print_grid.js';
import promptSync from 'prompt-sync';
import check_winner from './check_winner.js';
import manage_deep_mind from './manage_deep_mind.js'

function recursive(x) {
    if (x > 0) {
        console.log(x)
        recursive(x - 1)
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// X is AI

let deep_mind = []
/* [
{ <Xkey_Okey>, [power] },
{ <Xkey_Okey>, [power] },
{ <Xkey_Okey>, [power] },
{ <Xkey_Okey>, [power] },
    ]*/

let matches = 0
let x_winner = 0
let o_winner = 0
let t_winner = 0

while (matches < 15) {
    let match_mind = []
    let tris_grid = []
    let zone_filled = []

    let x_phase = Math.random() < 0.5 // true = x phase, false = o phase
    let winner_found



    // 511 means 9 zone filled

    let grid_value = 0
    while (grid_value < 511) {
        // console.clear()
        //console.log('-------------------------------------------------')
        //console.log('tris_grid', tris_grid)
        //console.log('grid_value', grid_value)

        // pippo(10)

        console.log(`${tris_grid[0] || '0'} | ${tris_grid[1] || '1'} | ${tris_grid[2] || '2'}
            \n${tris_grid[3] || '3'} | ${tris_grid[4] || '4'} | ${tris_grid[5] || '5'}
            \n${tris_grid[6] || '6'} | ${tris_grid[7] || '7'} | ${tris_grid[8] || '8'}
        `)  // here i cant use ?? cause i considered false also '' or "" or 0 
        if (x_phase) {
            const matchInput = getRandomInt(9) // promptSync()('Tocca a x, scegli la posizione: '); // NODE GIOCA IN AUTOMATICO
            console.log("il giocatore x, sceglie la zona:", matchInput)
            if (matchInput === 'e') { break }
            if (zone_filled.includes(matchInput)) { continue } // CHECK SE LA ZONA E' GIA STATA OCCUPATA
            tris_grid[matchInput] = 'x'; // SCRIVI SIMBOLO NELLA ZONA
            zone_filled.push(matchInput) // AGGIUNGI LA ZONA ALLE ZONE NON DISPONIBILI
        } else {
            const matchInput = getRandomInt(9) // promptSync()('Tocca a o, scegli la posizione: '); // NODE GIOCA IN AUTOMATICO
            console.log("il giocatore o, sceglie la zona:", matchInput)
            if (matchInput === 'e') { break }
            if (zone_filled.includes(matchInput)) { continue } // CHECK SE LA ZONA E' GIA STATA OCCUPATA
            tris_grid[matchInput] = 'o'; // SCRIVI SIMBOLO NELLA ZONA
            zone_filled.push(matchInput) // AGGIUNGI LA ZONA ALLE ZONE NON DISPONIBILI
        }
        grid_value = grid_to_value(tris_grid, 'b')
        const winner_checked = check_winner(tris_grid)
        // manage_deep_mind(tris_grid, deep_mind, match_mind)
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

    // manage_deep_learning(deep_mind, match_mind, winner_found)

    console.clear()

    print_grid(tris_grid, 'partita finale')

    const x_value = grid_to_value(tris_grid, 'x')
    const o_value = grid_to_value(tris_grid, 'o')

    const x_grid = value_to_grid(x_value, 'x')
    const o_grid = value_to_grid(o_value, 'o')

    // print_grid(x_grid, 'x_grid')
    // print_grid(o_grid, 'o_grid')

    console.log(winner_found, 'win')
    if (winner_found == 'x') {
        x_winner++
    } else if (winner_found == 'o') {
        o_winner++
    } else {
        t_winner++
    }
    matches++
}

console.log('x_winner', x_winner)
console.log('o_winner', o_winner)
console.log('t_winner', t_winner)
console.log('deep_mind', deep_mind)
