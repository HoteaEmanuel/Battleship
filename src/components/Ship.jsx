import React from 'react';
import { shipSize } from '../utils/shipSize';
import { useGameStore } from '../store/game';

const Ship = ({ ship, orientation }) => {
  let x = shipSize(ship);
  const { pickShip } = useGameStore();
  console.log(ship)
  return (
    <div
      draggable="true"
      onDragStart={(e) => {
        pickShip(ship);
      }}
    >
      <ul
        className={`w-full h-full gap-1 ${orientation === 0 ? 'flex' : 'flex-col'}`}
      >
        {Array.from({ length: x }, (_, i) => (
          <li key={i} className="block"></li>
        ))}
      </ul>
    </div>
  );
};
export default Ship;
