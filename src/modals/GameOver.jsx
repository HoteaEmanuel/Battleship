import React from 'react'
import { useGameStore } from '../store/game';

const GameOver = () => {
    const {currentPlayer,resetGame} = useGameStore();
  return (
    <div className='absolute flex w-1/2 h-screen bg-black/80 rounded-2xl  justify-center'>
        <div className='modal'>
            <h1 className='text-important'>Game over</h1>
            <h1 className='text-important'>Player { currentPlayer } won!</h1>
            <button className='btn' onClick={resetGame}>Play again</button>
        </div>
    </div>
  )
}

export default GameOver;