import grid_to_value from './grid_to_value.js';

function getByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (key === searchValue)
      return value;
  }
}

export default function manage_deep_learning(deep_mind, match_mind, winner_found) {
    // console.log('match_mind', match_mind)
    match_mind.forEach((val, id) => {
        // console.log('pre deep_mind', deep_mind.get(id)); // PRE
        // console.log('id:', id, 'val:', val)
        let currentArray = deep_mind.get(id);

        // cercare la key e aggiungere o togliere elementi all'array
        switch (winner_found) {
            case 'x':
                currentArray.push(val);
                currentArray.push(val);
                currentArray.push(val);
                break;
            // METODO B - scoraggiare le giocate che hanno portato al pareggio come se fosse una perdita 
            default: 
                let index = currentArray.indexOf(val);
                if (index !== -1) {
                    currentArray.splice(index, 1); // Rimuovi 1 occorrenza
                }
                break;
            // METODO A - premiare con +1 le partite pari 
            /*case 'o':
                let index = currentArray.indexOf(val);
                if (index !== -1) {
                    currentArray.splice(index, 1); // Rimuovi 1 occorrenza
                }
                break;
            default:
                // qua siamo in caso di pareggio
                // proviamo a non dare ricompense in caso di pareggio
                currentArray.push(val); // Aggiunge 8 all'array [5, 6, 7] HO COMMENTATO QUESTA
                break;
           
            // METODO C - il pareggio non è ne premiato ne sfavorito
            case 'o':
                let index = currentArray.indexOf(val);
                if (index !== -1) {
                    currentArray.splice(index, 1); // Rimuovi 1 occorrenza
                }
                break;
            default:
                break;
             */
        }
        // console.log('pst deep_mind id:', id, '=', deep_mind.get(id)); // POST
    });
}

//     GRIGLIA
//    1     2     4
//    8    16    32
//   64   128   256


/*
WAY-B
Victory Distribution:
  X wins: 10833 (72.2%)
  O wins: 2782 (18.5%)
  Draws:  634 (4.2%)

WAY-A
  X wins: 9410 (62.7%)
  O wins: 2807 (18.7%)
  Draws:  2032 (13.5%)

WAY-C 


  */


