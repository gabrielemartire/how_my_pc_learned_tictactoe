
import grid_to_value from './grid_to_value.js';

// invece di creare un array di default, popolo l'array delle possibile combinazioni solo quando quella combinazione esce
// questo mi permette di evitare di popolare l'array con combinazioni impossibili
// es: troppe x rispetto alle o o viceversa

export default function manage_deep_mind(tris_grid, deep_mind, match_mind) {
    const x_value = grid_to_value(tris_grid, 'x')
    const o_value = grid_to_value(tris_grid, 'o')
    const grid_values = [1, 2, 4, 8, 16, 32, 64, 128, 256]

    const key = `${x_value}_${o_value}`;

    if (!deep_mind.has(key)) {
        deep_mind.set(key, grid_values);
        match_mind.set(key, grid_values);
    }
}


//     GRIGLIA
//    1     2     4
//    8    16    32
//   64   128   256
