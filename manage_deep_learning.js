
import grid_to_value from './grid_to_value.js';

// Mantieni una Map separata per ricerche rapide
const deep_mind_index = new Map();

export default function manage_deep_learning(deep_mind, match_mind, winner_found) {
    const grid_values = [1, 2, 4, 8, 16, 32, 64, 128, 256]

    for (let m = 0; m < match_mind.lenght; m++) {
        // per ogni mossa giocata
        const key = `${match_mind[m][0]}_${match_mind[m][1]}`;
        if (!deep_mind_index.has(key)) {
            let val = [match_mind[m][0], match_mind[m][1], grid_values];
            deep_mind.push(val);
            match_mind.push(val);
            deep_mind_index.set(key, val);
        }
    }
}


//     GRIGLIA
//    1     2     4
//    8    16    32
//   64   128   256
