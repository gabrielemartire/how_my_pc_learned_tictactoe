import grid_to_value from './grid_to_value.js';

/*
invece di creare un array di default, popolo l'array delle possibile combinazioni solo quando quella combinazione esce
questo mi permette di evitare di popolare l'array con combinazioni impossibili
es: troppe 'x' rispetto alle 'o' o viceversa

THIS FUNCTION DOES NOT LEARN THE BEST MOVESET 
IT'S USED TO CREATE THE GENERALL KNOWLEDGE
[
    { <Xkey_Okey>, [1 .. 256] },
    { <Xkey_Okey>, [1 .. 256] },
    { <Xkey_Okey>, [1 .. 256] },
    { <Xkey_Okey>, [1 .. 256] },
]
*/

export default function manage_deep_mind(tris_grid, deep_mind, match_mind, the_next_move) {
    const x_value = grid_to_value(tris_grid, 'x')
    const o_value = grid_to_value(tris_grid, 'o')
    const grid_values = [0, 1, 2, 3, 4, 5, 6, 7, 8] // note:
    /*
        questa andrebbe popolata solo con le possibili posizioni in base a valore di x e o - es: 
            0   o   2
            3   o   5
            x   7   8
        La situazione attuale è: 64_18
        l'array di possibile mosse base sarà quindi [0, 2, 3, 5, 7, 8] e non [0 ... 8]
        va pensato uno script per poter calcolare i numeri possibili in base a x_value (64) e o_value (18)
    */
    const key = `${x_value}_${o_value}`;

    if (!deep_mind.has(key)) {
        deep_mind.set(key, grid_values); // add the key/array in general knowlodge
    }
    match_mind.set(key, the_next_move); // single match knowledge
}

//     grid_values:
//    1     2     4
//    8    16    32
//   64   128   256
