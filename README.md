# how_my_pc_learned_tictactoe

> A simple project in **JavaScript (Node.js)** that demonstrates how a PC can learn to play Tic-Tac-Toe using a **Reinforcement Learning (Q-Learning)** approach, fully implemented **from scratch without external machine learning libraries**.

### Installation & Run

```bash
npm install
node script.js
````

### Project Logic

1. **Tabular Q-Learning**

   * The agent plays around **50,000 games of Tic-Tac-Toe** against itself.
   * After each game, it updates a **Q-table** that maps each grid state to a score.
   * Updates:

     * Win → `+3`
     * Loss → `-1`
     * Draw → `0`
   * No neural networks or experience replay are used: this is a pure **tabular approach**, making the process transparent and easy to inspect.

2. **Exploration vs Exploitation**

   * The agent mostly chooses the move with the highest score (**exploitation**).
   * Exploration (random moves) is minimal, which may prevent discovering defensive or alternative strategies. This can be improved by introducing an **epsilon-greedy strategy**.

3. **Learning Rate & Stability**

   * Reward values (`+3`, `-1`, `0`) strongly affect learning stability.
   * Overly large rewards/penalties can destabilize the process (e.g., giving `+12` for a win may bias the system too much).

4. **Experiments & Observations**

   * Tic-Tac-Toe, being a finite game, allows clear observation of how rule changes impact strategies.
   * The tabular model makes it possible to **open the box** and directly see how the agent learns.

### Grid Representation

Each cell is associated with a **power of 2**, enabling unique encoding of every board state:

```
 1  |   2  |   4
 8  |  16  |  32
64  | 128  | 256
```

* Each occupied cell contributes to a unique sum → this sum encodes the board configuration.

Examples:

* First row → `1 + 2 + 4 = 7`
* First column → `1 + 8 + 64 = 73`
* Diagonal → `1 + 16 + 256 = 273`
* Middle row → `8 + 16 + 32 = 56`

Winning combinations are always the same 8 sums:

```
[7, 56, 448, 73, 146, 292, 273, 84]
```

**Grid reconstruction snippet:**

```javascript
[256, 128, 64, 32, 16, 8, 4, 2, 1].forEach((elm, idx) => {
  if (grid_value >= array_values[idx]) { 
    grid_array.unshift('X')
    grid_value -= array_values[idx]
  } else {
    grid_array.unshift('-')
  }
})
return grid_array
```

### Output
Here some output after RL:
```
=== GAME ANALYSIS RESULTS ===
Matches: 50000 (0 training matches excluded)

Victory Distribution:
  X wins: 40669 (81.3%)
  0 wins: 7308 (14.6%)
  Draws: 2022 (4.0%)

Performance: 92431.21ms
```

```bash
=== GAME ANALYSIS RESULTS ===
Matches: 50000 (1000 training matches excluded)

Victory Distribution:
  X wins: 37672 (75.3%)
  O wins: 5919 (11.8%)
  Draws:  5408 (10.8%)

Performance: 107031.80ms
```

### Future Improvements

- [ ] Add **epsilon-greedy exploration** to improve learning robustness.
- [ ] Transition to a **DQN (Deep Q-Network)** with experience replay.
- [ ] Implement basic **anti-overfitting strategies** (e.g., early stopping, validation on simulated matches).
- [ ] Porting to **TensorFlow.js** and browser-based parallelization.
- [ ] Extend to more complex games (e.g., **Connect Four**).
- [ ] Build a **dashboard/visualizer** for training progress.

## Summary

This project demonstrates how to:

* Implement **Q-Learning from scratch** in JavaScript.
* Understand the balance of **exploration vs exploitation**.
* Explore the effects of **learning rate** on training stability.
* Encode board states efficiently with **binary sums**.
* Learn RL principles **without external ML tools**.
