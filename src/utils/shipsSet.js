export const shipsSet = (player) => {
  console.log('PLAYER: ');
  console.log(player);
  for (let x of player.ships) {
    if (x.set === false) return false;
  }
  return true;
};
