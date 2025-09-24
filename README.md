# how_my_pc_learned_tictactoe

> This project trains a simple RL agent to play Tic-Tac-Toe using a basic Q-learning approach in JavaScript (Node.js).

Game: 3×3 Tic-Tac-Toe (X vs O).

``` bash
npm install
node script.js
```

Per identificare ogni possibile combinazione ho deciso di associare ogni stato della partire ad una somma di potenze a base 2:

Ogni cella ha un valore che è una potenza di 2:

2⁰=1, 2¹=2, 2²=4, 2³=8, 2⁴=16, etc.

in questo modo è possibile, partendo dal valore piu alto, capire quali celle sono occupate


```javascript
grid_value // valore in input che si ottiene convertendo la griglia in un intero usando le potenze a base 2
... count += Math.pow(2, idx)
```
```javascript
// in questo caso si va a ritrovo dalla cella in basso a DX salendo fino alla cella in alto a SX
[256, 128, 64, 32, 16, 8, 4, 2, 1].forEach((elm, idx) => {
    if (grid_value >= array_values[idx]){ 
      grid_array.unshift('X') // la cella presa in considerazione ha la X (o O) perche quel valore è contenuto in grid_value
      grid_value -= array_values[idx] // e tolgo dalla sommatoria totale il valore della cella già "considerata"
    } else {
      grid_array.unshift('-')
    }
  })
  return grid_array;
}
```

 1  |   2  |   4
 8  |  16  |  32
64  | 128  | 256

Ogni combinazione delle celle ha una somma unica:
Prima riga: 1+2+4 = 7
Prima colonna: 1+8+64 = 73
Diagonale: 1+16+256 = 273
Centro riga: 8+16+32 = 56

Le somme vincenti sono sempre queste 8: [7, 56, 448, 73, 146, 292, 273, 84]
