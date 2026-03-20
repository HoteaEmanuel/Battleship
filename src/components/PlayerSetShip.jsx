import React from 'react';
import { useGameStore } from '../store/game';
import Ship from './Ship';
import { useState, useEffect } from 'react';

export const PlayerSetShip = ({ player }) => {
  const { player1, currentPlayer, shipsPlaced, setCurrentPlayer ,setBattleStarted} =
    useGameStore();
  console.log(player1);
  const [orientations, setOrientations] = useState([0, 0, 0, 0, 0]);

  // console.log(player1, player2);

  const handleSavePlayerOne = () => {
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  const handleSavePlayerTwo = () => {
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    setBattleStarted();
  };

  console.log(player);
  return (
    <div className="w-full h-full flex flex-col gap-5 ">
      <h1 className="text">
        Player {currentPlayer === 1 ? '1' : '2'} is placing its ships
      </h1>
      <p className="text text-white text-smf">
        Player {currentPlayer === 1 ? '2' : '1'} don't peek :){' '}
      </p>

      <h1 className="text">Ships</h1>

      <ul className="flex flex-col gap-15">
        {player.ships
          .filter((item) => item.set == false)
          .map((ship, index) => (
            <li
              key={ship.type}
              className="w-full h-10 flex  text-white"
              onClick={() =>
                setOrientations((prev) => {
                  const orientations = [...prev];
                  if (orientations[index] == 1) orientations[index] = 0;
                  else orientations[index] = 1;

                  ship.orientation = orientations[index];
                  return orientations;
                })
              }
            >
              {ship.type}
              <Ship ship={ship} orientation={orientations[index]} />
              {/* <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div> */}
            </li>
          ))}
      </ul>

      {shipsPlaced(1) && currentPlayer == 1 && (
        <button className="btn" onClick={handleSavePlayerOne}>
          Save
        </button>
      )}
      {shipsPlaced(2) && currentPlayer == 2 && (
        <button className="btn" onClick={handleSavePlayerTwo}>
          Save
        </button>
      )}
    </div>
  );
};
