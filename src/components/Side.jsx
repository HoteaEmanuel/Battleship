import React, { useState } from 'react';
import { useGameStore } from '../store/game';
import { shipsSet } from '../utils/shipsSet';
import { PlayerSetShip } from './PlayerSetShip';
import PlayerBattle from './PlayerBattle';
const Side = () => {
  const { getPlayer, currentPlayer, battleStarted } = useGameStore();
  const player = getPlayer(currentPlayer);

  return (
    <div className="w-1/4 h-full border-l-1 flex flex-col justify-center items-center p-10 border-r-2 shadow-2xl">
      <h1 className="text-3xl font-orbitron font-bold italic uppercase text-white mb-10">
        Battleships
      </h1>

      {!battleStarted ? <PlayerSetShip player={player} /> : <PlayerBattle />}
    </div>
  );
};

export default Side;
