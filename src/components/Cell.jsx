import React from 'react';
import { useGameStore } from '../store/game';
import { shipSize } from '../utils/shipSize';

import { toast } from 'sonner';

import useSound from 'use-sound';
const Cell = ({ col, row, coordonates }) => {
  const [playHit] = useSound('/sounds/hit.mp3', {
    interrupt: true,
    volume: 1,
  });
  const [shipPlaced2] = useSound('/sounds/audiomass-output.mp3');

  const [playMiss] = useSound('/sounds/miss.mp3');
  const {
    pickedShip,
    placeShip,
    getShipIndex,
    setCoordonates,
    currentPlayer,
    battleStarted,
    hit,
    attacked,
    wasHit,
    checkGameOver,
  } = useGameStore();

  const handleShipDropped = (e) => {
    const x = Number(e.target.dataset.row),
      y = Number(e.target.dataset.col);
    console.log(pickedShip);
    const coords = [];
    if (pickedShip.orientation === 0) {
      if (y + shipSize(pickedShip) > 10) return;
      for (let i = y; i < y + shipSize(pickedShip); i++)
        if (coordonates[10 * x + i].occupied === true) {
          toast.error('Position is occupied');
          return;
        }
    }
    if (pickedShip.orientation === 1) {
      if (x + shipSize(pickedShip) > 10) return;
      for (let i = x; i < x + shipSize(pickedShip); i++) {
        if (coordonates[10 * i + y].occupied === true) {
          toast.error('Position is occupied');
          return;
        }
      }
    }
    if (pickedShip.orientation === 0 && y + shipSize(pickedShip) < 11) {
      console.log('INSIDE');
      for (let i = y; i < y + shipSize(pickedShip); i++)
        coords.push({
          x: x,
          y: i,
          ship: pickedShip,
          player: currentPlayer,
        });
      console.log(coords);
    } else if (pickedShip.orientation === 1 && x + shipSize(pickedShip) < 11) {
      for (let i = x; i < x + shipSize(pickedShip); i++)
        coords.push({
          x: i,
          y: y,
          ship: pickedShip,
          player: currentPlayer,
        });
    }
    console.log(coords);
    setCoordonates(coords, currentPlayer);
    placeShip(currentPlayer, getShipIndex(pickedShip.type));

    console.log('UPDATE COORDS');

    shipPlaced2();
  };
  console.log(wasHit);
  const handleHit = (row, col) => {
    console.log('HOPE');
    if (battleStarted === false) return;
    console.log('EMA');
    hit(row, col);
    console.log('AICII');
    setTimeout(() => 1000);
    playHit();

    const wasHit = useGameStore.getState().wasHit;
    console.log(wasHit);
    if (wasHit === false) playMiss();
    checkGameOver();
  };

  const coordType = (row, col) => {
    return (
      !battleStarted &&
      coordonates[row * 10 + col].occupied &&
      coordonates[row * 10 + col].player === currentPlayer
    );
  };

  const cellHit = (row, col) => {
    return (
      coordonates[row * 10 + col].occupied &&
      coordonates[row * 10 + col].hit == true
    );
  };

  const cellMiss = (row, col) => {
    return (
      coordonates[row * 10 + col].occupied == false &&
      coordonates[row * 10 + col].hit == true
    );
  };
  return (
    <div
      className={`${coordType(row, col) ? 'cell-full' : cellMiss(row, col) ? 'cell-miss' : 'cell'} flex justify-center items-center ${attacked && 'blocked'}`}
      data-row={row}
      data-col={col}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleShipDropped(e)}
      onClick={() => handleHit(row, col)}
      // onClick={}
    >
      {cellHit(row, col) && <h1 className="text text-xl">X</h1>}
      <div className="ch-h" />
      <div className="ch-v" />
      <div className="corner-bl" />
      <div className="corner-br" />
      <div className="dot" />
    </div>
  );
};

export default Cell;
