export default function check_winner(grid_value) {
  let winner_symbol
  ['x', 'o'].forEach(smb => {
    console.log('check_winner - inside the foreach, for:', smb)
    console.log('grid_value[0]', grid_value[0])
    console.log('grid_value[1]', grid_value[1])
    console.log('grid_value[2]', grid_value[2])
    console.log('smb', smb)
    console.log(grid_value[0] == smb)
    console.log(grid_value[1] == smb)
    console.log(grid_value[2] == smb)

    if (grid_value[0] == smb && grid_value[1] == smb && grid_value[2] == smb) { // UP HOR
      console.log('UP HOR')
      winner_symbol = smb;
    }
    if (grid_value[3] == smb && grid_value[4] == smb && grid_value[5] == smb) { // MID HOR
      console.log('MID HOR')
      winner_symbol = smb;
    }
    if (grid_value[6] == smb && grid_value[7] == smb && grid_value[8] == smb) { // DOWN HOR
      console.log('DOWN HOR')
      winner_symbol = smb;
    }
    if (grid_value[0] == smb && grid_value[3] == smb && grid_value[6] == smb) { // SX VER
      console.log('SX VER')
      winner_symbol = smb;
    }
    if (grid_value[1] == smb && grid_value[4] == smb && grid_value[7] == smb) { // MID VER
      console.log('MID VER')
      winner_symbol = smb;
    }
    if (grid_value[2] == smb && grid_value[5] == smb && grid_value[8] == smb) { // DX vERT
      console.log('DX vERT')
      winner_symbol = smb;
    }
    if (grid_value[0] == smb && grid_value[4] == smb && grid_value[8] == smb) { // UP DD \ 
      console.log('UP DD')
      winner_symbol = smb;
    }
    if (grid_value[2] == smb && grid_value[4] == smb && grid_value[6] == smb) { // DW DD /
      console.log('DW DD')
      winner_symbol = smb;
    }
  })
  return winner_symbol //no winner yet
}

//      GRIGLIA
//     0   1   2  UH
//     3   4   5  MH
//     6   7   8  DH
//   / SV MV  DV \
