import React from 'react';
import { Router, useNavigate } from 'react-router-dom';
const GameRules = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen max-h-screen flex flex-col justify-center items-center p-10">
      <h1 className="heading-text">How to play</h1>
      <section className="flex w-4/5 h-full list-disc justify-center items-center gap-10">
        <ul className="w-full h-full flex flex-col justify-center list-disc gap-5">
          <li className="text">
            Battleship is a two-player 2D strategy game where each player
            secretly places a fleet of ships on a grid by choosing valid
            coordinates.
          </li>
          <li className="text">
            Once both fleets are positioned, players take turns calling out
            coordinates — such as A3 or F7 — to attack the opponent's grid
          </li>

          <li className="text">A hit is marked with an X</li>

          <li className="text">
            The goal is simple: sink the entire enemy fleet before yours is
            destroyed. Plan your shots wisely — track your hits, eliminate
            possibilities, and close in for the kill.
          </li>
          <li className="text">Each players has 5 ships:</li>
          <ul className="list-disc flex gap-5 mt-5">
            <li className="text text-xs flex items-center gap-5">
              Carrier
              <img src="carrier.png" className="small-image" />
            </li>

            <li className="text text-xs  flex items-center gap-5">
              Battleship
              <img src="battleship.png" className="small-image" />
            </li>

            <li className="text text-xs flex items-center gap-5">
              Cruiser
              <img src="cruiser.png" className="small-image" />
            </li>

            <li className="text text-xs  flex items-center gap-5">
              Submarine
              <img src="submarine.png" className="small-image" />
            </li>

            <li className="text text-xs   flex items-center gap-5">
              Destroyer
              <img src="destroyer.png" className="small-image" />
            </li>
          </ul>
        </ul>
        <figure>
          <img src="/Battleship_game_board.svg.png" className="image bg-white" />
          <figcaption className="text-white text-xs italic font-mono mt-1 text-center">
            Battleship grid
          </figcaption>
        </figure>
      </section>
      <button className="btn" onClick={() => navigate('/')}>
        Got it
      </button>
    </div>
  );
};

export default GameRules;
