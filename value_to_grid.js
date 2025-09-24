export default function value_to_grid(grid_value) {
  const array_values = [256, 128, 64, 32, 16, 8, 4, 2, 1]
  let grid_array = []

  array_values.forEach((elm, idx) => {
    if (grid_value>=array_values[idx]){
      grid_array.unshift('X')
      grid_value -= array_values[idx]
    } else {
      grid_array.unshift('-')
    }
  })
  return grid_array;
}

//     GRIGLIA
//    1     2     4
//    8    16    32
//   64   128   256
