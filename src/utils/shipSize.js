export const shipSize = (ship) => {
  if (ship.type === 'carrier') return 5;
  else if (ship.type === 'battleship') return 4;
  else if (ship.type === 'cruiser') return 3;
  else if (ship.type === 'submarine') return 3;
  return 2;
};
