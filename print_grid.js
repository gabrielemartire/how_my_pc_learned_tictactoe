export default function print_grid(array_grid, title) {
  console.log(title)
  console.log(`
${array_grid[0] || ' '} | ${array_grid[1] || ' '} | ${array_grid[2] || ' '}
${array_grid[3] || ' '} | ${array_grid[4] || ' '} | ${array_grid[5] || ' '}
${array_grid[6] || ' '} | ${array_grid[7] || ' '} | ${array_grid[8] || ' '}
  `)
  console.log('\n')
}
//     GRIGLIA
//    1     2     4
//    8    16    32
//   64   128   256
