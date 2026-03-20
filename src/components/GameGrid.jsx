import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import { useGameStore } from '../store/game';
import GameOver from '../modals/GameOver';

const GameGrid = () => {
  let firstRow = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'I', 'J', 'K'];

  const {
    coordonatesPlayerOne,
    coordonatesPlayerTwo,
    currentPlayer,
    battleStarted,
    attacked,
    wasHit,
    shipDestroyed,
    gameOver
  } = useGameStore();

  const [coordonates, setCoordonates] = useState(coordonatesPlayerOne);
  useEffect(() => {
    if (!battleStarted) {
      setCoordonates(
        currentPlayer === 1 ? coordonatesPlayerOne : coordonatesPlayerTwo,
      );
    } else
      setCoordonates(
        currentPlayer === 1 ? coordonatesPlayerTwo : coordonatesPlayerOne,
      );
  }, [
    setCoordonates,
    coordonatesPlayerOne,
    coordonatesPlayerTwo,
    currentPlayer,
    battleStarted,
  ]);
  return (
    <div className="container ">
      {shipDestroyed && (
        <h1 className="absolute text-5xl text-white uppercase -rotate-5 top-5">
          YOU DESTROYED A SHIP!!
        </h1>
      )}
      {wasHit && !shipDestroyed && (
        <h1 className="absolute text-5xl text-white uppercase -rotate-5">
          Hit!
        </h1>
      )}
      {!wasHit && attacked &&  <h1 className='absolute top-5 text-red-500 text-2xl'>Missed!</h1>}
      <div className="w-full h-full grid grid-cols-10 p-20 px-30 shadow-2xl">
        {coordonates &&
          coordonates.map((coord, index) => (
            <Cell
              key={index}
              row={coord.x}
              col={coord.y}
              coordonates={coordonates}
            />
          ))
          }
      </div>
      {gameOver && <GameOver/>}
    </div>
  );
};

export default GameGrid;
