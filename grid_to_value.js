export default function grid_to_value(array_grid, symbol) {
  let count = 0

  array_grid.forEach((num, idx, arr) => {
    if (num == symbol) {
      count += Math.pow(2, idx)
    }
  });
  return count
}


//     GRIGLIA
//    1     2     4
//    8    16    32
//   64   128   256
