import grid_to_value from './grid_to_value.js';
import value_to_grid from './value_to_grid.js';
import print_grid from './print_grid.js';
import promptSync from 'prompt-sync';
import check_winner from './check_winner.js';
import manage_deep_mind from './manage_deep_mind.js'
import manage_deep_learning from './manage_deep_learning.js'
import find_best_move from './find_best_move.js'

const start_time = performance.now()

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

let deep_mind = new Map(); // this is the global_knowledge

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

const match_iteration = 5000
const training_match = (match_iteration/100)*5

while (matches < match_iteration) {
    let match_mind = new Map();
    let tris_grid = []
    let zone_filled = []

    let x_phase = Math.random() < 0.5 // true = x phase, false = o phase
    let winner_found

    // 511 means 9 zone filled

    let grid_value = 0
    while (grid_value < 511) {
        // console.clear()
        //console.log('tris_grid', tris_grid)
        //console.log('grid_value', grid_value)

        // recursive(10)

        if (x_phase) {
            // THE AI
            const aiInput = find_best_move(tris_grid, deep_mind, matches) // using global_knowledge
            console.log('zone_filled', zone_filled)
            console.log('aiInput', aiInput)
            if (zone_filled.includes(aiInput)) { continue } // Se la zona è già occupata, prova un'altra zona - QUESTO VA FIXATO PIU AVANTI
            console.log(`${tris_grid[0] || '0'} | ${tris_grid[1] || '1'} | ${tris_grid[2] || '2'}\n${tris_grid[3] || '3'} | ${tris_grid[4] || '4'} | ${tris_grid[5] || '5'}\n${tris_grid[6] || '6'} | ${tris_grid[7] || '7'} | ${tris_grid[8] || '8'}
            `)  // here i cant use ?? cause i considered false also '' or "" or 0 
            console.log("l'AI (x), sceglie la zona", aiInput)
            manage_deep_mind(tris_grid, deep_mind, match_mind, aiInput) // mi salvo la zona e popolo il global_knowledge base
            tris_grid[aiInput] = 'x'; // scrivo il simbolo nella zona 
            zone_filled.push(aiInput) // aggiungo la zona alla memoria della griglia occupata - QUESTO VA FIXATO PIU AVANTI
        } else {
            // THE PLAYER
            const matchInput = getRandomInt(9) // il training sarà sempre fatto con numeri random
            if (matchInput === 'e') { break }
            if (zone_filled.includes(matchInput)) { continue } // Se la zona è già occupata, prova un'altra zona - QUESTO VA FIXATO PIU AVANTI
            console.log(`${tris_grid[0] || '0'} | ${tris_grid[1] || '1'} | ${tris_grid[2] || '2'}\n${tris_grid[3] || '3'} | ${tris_grid[4] || '4'} | ${tris_grid[5] || '5'}\n${tris_grid[6] || '6'} | ${tris_grid[7] || '7'} | ${tris_grid[8] || '8'}
            `)  // here i cant use ?? cause i considered false also '' or "" or 0 
            console.log("(o) in zona:", matchInput)
            tris_grid[matchInput] = 'o'; // scrivo il simbolo nella zona 
            zone_filled.push(matchInput) // aggiungo la zona alla memoria della griglia occupata - QUESTO VA FIXATO PIU AVANTI
        }
        grid_value = grid_to_value(tris_grid, 'b') // b = both the signs
        const winner_checked = check_winner(tris_grid)
        winner_checked ? console.log('winner_checked', winner_checked) : null
        if (winner_checked == 'x') {
            winner_found = 'x'
            break
        }
        if (winner_checked == 'o') {
            winner_found = 'o'
            break
        }
        x_phase = !x_phase
        console.log('match_mind', match_mind)    
    }
    console.log('-------------------------------------------------')

    const x_value = grid_to_value(tris_grid, 'x')
    const o_value = grid_to_value(tris_grid, 'o')

    const x_grid = value_to_grid(x_value, 'x')
    const o_grid = value_to_grid(o_value, 'o')

    // SE c'è un winner gestire il RL
    // deep_mind - its used to upload
    // match_mind - cio che ha affrontato in questa partita
    // winner_found - se vince fa +3 se pareggia +1 altrimento +0
    console.log('deep_mind',deep_mind)
    manage_deep_learning(deep_mind, match_mind, winner_found)

    // print_grid(x_grid, 'x_grid')
    // print_grid(o_grid, 'o_grid')

    console.log(winner_found, 'win')
    if (matches > training_match) {
        if (winner_found == 'x') {
            x_winner++
        } else if (winner_found == 'o') {
            o_winner++
        } else {
            t_winner++
        }
    }
    matches++
}

console.log('=== GAME ANALYSIS RESULTS ===');
console.log(`Matches: ${matches} (${training_match} training matches excluded)`);
console.log('');
console.log('Victory Distribution:');
console.log(`  X wins: ${x_winner} (${((x_winner / matches) * 100).toFixed(1)}%)`);
console.log(`  O wins: ${o_winner} (${((o_winner / matches) * 100).toFixed(1)}%)`);
console.log(`  Draws:  ${t_winner} (${((t_winner / matches) * 100).toFixed(1)}%)`);
console.log('\n');
console.log(`Performance: ${(performance.now() - start_time).toFixed(2)}ms`);

//const matchInput = promptSync()('presto toccherà a te, premi invio per continuare..'); // NODE GIOCA IN AUTOMATICO
console.log('qui ci sarà una partita tra umano e AI con global_knowledge post-training')