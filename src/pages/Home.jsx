import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Hello = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center p-10 gap-10">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex translate-y-2 w-1/2 justify-between">
          <img
            src="battleship_logo-removebg-preview.png"
            className="w-80 battleship-image-1"
          />
          <img
            src="battleship_logo-removebg-preview-1.png"
            className="w-80 battleship-image-2"
          />
        </div>

        <h1 className="iron-heading text-5xl">Battleship</h1>
      </div>

      <button
        className="btn text-xl"
        style={{
          clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
        }}
        onClick={() => navigate('/new-game')}
      >
        Start a new game
      </button>

      <button className="btn" onClick={() => navigate('/game-rules')}>
        Game rules
      </button>

      {/* <button className="btn" onClick={() => navigate('/settings')}>
        Settings
      </button> */}
    </div>
  );
};

export default Hello;
