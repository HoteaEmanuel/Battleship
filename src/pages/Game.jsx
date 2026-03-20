import React from 'react';
import Side from '../components/Side';
import GameGrid from '../components/GameGrid';
import { useGameStore } from '../store/game';

const Game = () => {
  const { player1, player2 } = useGameStore();
 
  console.log(player1, player2);
  return (
    <div className="w-screen h-screen flex">
      <Side />
      <GameGrid />
    </div>
  );
};

export default Game;
