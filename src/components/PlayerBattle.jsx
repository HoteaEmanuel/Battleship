import React from 'react';
import { useGameStore } from '../store/game';

const PlayersBattle = () => {
  const {
    currentPlayer,
    setNextPlayer,
    resetAttacked,
    attacked,
    resetHit,
    resetShipDestroyed,
    player1,
    gameOver
  } = useGameStore();
  const handleNext = () => {
    setNextPlayer();
    resetAttacked();
    resetHit();
    resetShipDestroyed();
  };

  console.log(player1);

  return (
    <section className="container gap-10">
      <div>
        <h1 className="text">
          Player {`${currentPlayer === 1 ? 1 : 2} is attacking`}
        </h1>
        <p className="text-sm text-white">
          Click on a block to hit that coordonate
        </p>
      </div>
      {attacked && (
        <button className="btn" onClick={handleNext} disabled={gameOver}>
          {' '}
          Continue
        </button>
      )}
    </section>
  );
};

export default PlayersBattle;
