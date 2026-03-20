import { CompletionInfoFlags } from 'typescript';
import { create } from 'zustand';

const initialState = {
  player1: {
    playerNo: 1,
    ships: [
      {
        type: 'carrier',
        // coordonates: [],
        set: false,
        alive: true,
        orientation: 0,
        blocks: 5,
      },
      {
        type: 'battleship',
        // coordonates: [],
        set: false,
        alive: true,
        orientation: 0,
        blocks: 4,
      },
      {
        type: 'cruiser',
        // coordonates: [],
        set: false,
        alive: true,
        orientation: 0,
        blocks: 3,
      },
      {
        type: 'submarine',
        // coordonates: [],
        set: false,
        alive: true,
        orientation: 0,
        blocks: 3,
      },
      {
        type: 'destroyer',
        // coordonates: [],
        set: false,
        alive: true,
        orientation: 0,
        blocks: 2,
      },
    ],
  },
  player2: {
    playerNo: 2,
    ships: [
      {
        type: 'carrier',
        // coordonates: [],
        set: false,
        alive: true,
        orientation: 0,
        blocks: 5,
      },
      {
        type: 'battleship',
        // coordonates: [],
        set: false,
        alive: true,
        orientation: 0,
        blocks: 4,
      },
      {
        type: 'cruiser',
        // coordonates: [],
        set: false,
        alive: true,
        orientation: 0,
        blocks: 3,
      },
      {
        type: 'submarine',
        // coordonates: [],
        set: false,
        alive: true,
        orientation: 0,
        blocks: 3,
      },
      {
        type: 'destroyer',
        // coordonates: [],
        set: false,
        alive: true,
        orientation: 0,
        blocks: 2,
      },
    ],
  },
  currentPlayer: 1,
  attacked: false,
  shipDestroyed: false,
  coordonatesPlayerOne: Array.from({ length: 100 }, (_, i) => ({
    x: Math.floor(i / 10),
    y: i % 10,
    occupied: false,
    ship: undefined,
    player: 1,
    hit: false,
  })),

  coordonatesPlayerTwo: Array.from({ length: 100 }, (_, i) => ({
    x: Math.floor(i / 10),
    y: i % 10,
    occupied: false,
    ship: undefined,
    player: 2,
    hit: false,
  })),

  battleStarted: false,
  pickedShip: undefined,
  gameOver: false,
  wasHit: false,
};

export const useGameStore = create((set) => ({
  ...initialState,
  setShipDestroyed: () => {
    set(() => ({
      shipDestroyed: true,
    }));
  },
  resetShipDestroyed: () => {
    set(() => ({
      shipDestroyed: false,
    }));
  },

  setBattleStarted: () => {
    set(() => ({
      battleStarted: true,
    }));
  },
  attack: () => {
    set(() => ({
      attacked: true,
    }));
  },
  resetAttacked: () => {
    set(() => ({
      attacked: false,
    }));
  },
  getPlayer: (player) => {
    console.log('PL : ', player);
    if (player === 1) return useGameStore.getState().player1;
    return useGameStore.getState().player2;
  },
  pickShip: (ship) => {
    console.log(ship);
    set(() => ({
      pickedShip: ship,
    }));
  },
  getShipIndex: (ship) => {
    if (ship === 'carrier') return 0;
    else if (ship === 'battleship') return 1;
    else if (ship === 'cruiser') return 2;
    else if (ship === 'submarine') return 3;
    return 4;
  },
  setCurrentPlayer: (player) => {
    set(() => ({
      currentPlayer: player,
    }));
  },

  setNextPlayer: () => {
    const currentPlayer = useGameStore.getState().currentPlayer;
    if (currentPlayer === 1)
      set(() => ({
        currentPlayer: 2,
      }));
    else
      set(() => ({
        currentPlayer: 1,
      }));
  },

  shipsPlaced: (player) => {
    if (player === 1) {
      const player1 = useGameStore.getState().player1;
      for (let ship of player1.ships) if (ship.set === false) return false;
      return true;
    }
    const player2 = useGameStore.getState().player2;
    for (let ship of player2.ships) if (ship.set === false) return false;
    return true;
  },
  placeShip: (playerNo, shipIndex) => {
    set((state) => {
      console.log(playerNo, shipIndex);
      if (playerNo === 1) {
        const ships = [...state.player1.ships];
        ships[shipIndex] = {
          ...ships[shipIndex],
          set: true,
        };

        console.log('SHIPS: ', ships);
        return {
          player1: {
            ...state.player1,
            ships: ships,
          },
        };
      } else {
        const ships = [...state.player2.ships];
        ships[shipIndex] = {
          ...ships[shipIndex],
          set: true,
        };

        return {
          player2: {
            ...state.player2,
            ships: ships,
          },
        };
      }
    });
  },

  setCoordonates: (coordonates, player) => {
    console.log('COORDSSS HE: ', coordonates);
    console.log('PLAYER IN COORDONATES: ', player);
    set((state) => {
      const coords =
        player == 1
          ? [...state.coordonatesPlayerOne]
          : [...state.coordonatesPlayerTwo];

      let index = 0;
      const newCoords = [];

      for (let coord of coords) {
        if (
          index < coordonates.length &&
          coord.x == coordonates[index].x &&
          coord.y == coordonates[index].y
        ) {
          console.log('MATCH');
          newCoords.push({
            x: coordonates[index].x,
            y: coordonates[index].y,
            occupied: true,
            ship: {
              ...coordonates[index].ship,
              set: true,
            },
            player: player,
          });
          index++;
        } else newCoords.push(coord);
      }
      if (player == 1)
        return {
          coordonatesPlayerOne: newCoords,
        };
      return {
        coordonatesPlayerTwo: newCoords,
      };
    });
  },
  setHit: () => {
    set(() => ({
      wasHit: true,
    }));
  },
  resetHit: () => {
    set(() => ({
      wasHit: false,
    }));
  },

  hit: (row, col) => {
    const currentPlayer = useGameStore.getState().currentPlayer;
    let ships;
    let coords;
    if (currentPlayer === 1)
      ((coords = useGameStore.getState().coordonatesPlayerTwo),
        (ships = useGameStore.getState().player1.ships));
    else
      ((coords = useGameStore.getState().coordonatesPlayerOne),
        (ships = useGameStore.getState().player2.ships));

    let index = 10 * row + col;
    if (coords[index].hit === true) throw new Error('Already hit');
    coords[index].hit = true;

    if (coords[index].occupied) {
      let shipIndex = useGameStore
        .getState()
        .getShipIndex(coords[index].ship.type);
      ships[shipIndex].blocks--;

      if (ships[shipIndex].blocks === 0) {
        ships[shipIndex].alive = false;
        useGameStore.getState().setShipDestroyed();
      }
    }
    set(() => {
      if (currentPlayer === 1) {
        return {
          player2: {
            ships: ships,
          },
        };
      }
      return {
        player1: {
          ships: ships,
        },
      };
    });

    set(() => {
      if (currentPlayer === 1)
        return {
          coordonatesPlayerTwo: coords,
        };
      return {
        coordonatesPlayerOne: coords,
      };
    });
    useGameStore.getState().attack();
    if (coords[index].occupied === true) {
      console.log("CALLED");
      useGameStore.getState().setHit();

      console.log(useGameStore.getState().wasHit);
    }
  },

  checkGameOver: () => {
    const currentPlayer = useGameStore.getState().currentPlayer;
    let ships;
    if (currentPlayer === 1) {
      ships = useGameStore.getState().player2.ships;
    } else ships = useGameStore.getState().player1.ships;
    console.log(currentPlayer);
    for (let ship of ships) {
      console.log('SHIP BLOCKS REMAINING: ', ship.blocks);
      if (ship.blocks > 0) return;
    }
    console.log('GAME OVER: ', currentPlayer);
    set(() => ({
      gameOver: true,
    }));
  },

  resetGame: () => {
    set(() => initialState);
  },
}));

export const useGameStore1 = create((set) => ({
  player1: {
    playerNo: 1,
    ships: [
      {
        type: 'carrier',
        // coordonates: [],
        set: false,
        alive: true,
        orientation: 0,
        blocks: 5,
      },
      {
        type: 'battleship',
        // coordonates: [],
        set: false,
        alive: true,
        orientation: 0,
        blocks: 4,
      },
      {
        type: 'cruiser',
        // coordonates: [],
        set: false,
        alive: true,
        orientation: 0,
        blocks: 3,
      },
      {
        type: 'submarine',
        // coordonates: [],
        set: false,
        alive: true,
        orientation: 0,
        blocks: 3,
      },
      {
        type: 'destroyer',
        // coordonates: [],
        set: false,
        alive: true,
        orientation: 0,
        blocks: 2,
      },
    ],
  },
  player2: {
    playerNo: 2,
    ships: [
      {
        type: 'carrier',
        // coordonates: [],
        set: false,
        alive: true,
        orientation: 0,
        blocks: 5,
      },
      {
        type: 'battleship',
        // coordonates: [],
        set: false,
        alive: true,
        orientation: 0,
        blocks: 4,
      },
      {
        type: 'cruiser',
        // coordonates: [],
        set: false,
        alive: true,
        orientation: 0,
        blocks: 3,
      },
      {
        type: 'submarine',
        // coordonates: [],
        set: false,
        alive: true,
        orientation: 0,
        blocks: 3,
      },
      {
        type: 'destroyer',
        // coordonates: [],
        set: false,
        alive: true,
        orientation: 0,
        blocks: 2,
      },
    ],
  },

  currentPlayer: 1,
  attacked: false,
  shipDestroyed: false,
  setShipDestroyed: () => {
    set(() => ({
      shipDestroyed: true,
    }));
  },
  resetShipDestroyed: () => {
    set(() => ({
      shipDestroyed: false,
    }));
  },
  coordonatesPlayerOne: Array.from({ length: 100 }, (_, i) => ({
    x: Math.floor(i / 10),
    y: i % 10,
    occupied: false,
    ship: undefined,
    player: 1,
    hit: false,
  })),

  coordonatesPlayerTwo: Array.from({ length: 100 }, (_, i) => ({
    x: Math.floor(i / 10),
    y: i % 10,
    occupied: false,
    ship: undefined,
    player: 2,
    hit: false,
  })),

  battleStarted: false,
  setBattleStarted: () => {
    set(() => ({
      battleStarted: true,
    }));
  },
  attack: () => {
    set(() => ({
      attacked: true,
    }));
  },
  resetAttacked: () => {
    set(() => ({
      attacked: false,
    }));
  },
  pickedShip: undefined,
  gameOver: false,
  getPlayer: (player) => {
    console.log('PL : ', player);
    if (player === 1) return useGameStore.getState().player1;
    return useGameStore.getState().player2;
  },
  pickShip: (ship) => {
    console.log(ship);
    set(() => ({
      pickedShip: ship,
    }));
  },
  getShipIndex: (ship) => {
    if (ship === 'carrier') return 0;
    else if (ship === 'battleship') return 1;
    else if (ship === 'cruiser') return 2;
    else if (ship === 'submarine') return 3;
    return 4;
  },
  setCurrentPlayer: (player) => {
    set(() => ({
      currentPlayer: player,
    }));
  },

  setNextPlayer: () => {
    const currentPlayer = useGameStore.getState().currentPlayer;
    if (currentPlayer === 1)
      set(() => ({
        currentPlayer: 2,
      }));
    else
      set(() => ({
        currentPlayer: 1,
      }));
  },

  shipsPlaced: (player) => {
    if (player === 1) {
      const player1 = useGameStore.getState().player1;
      for (let ship of player1.ships) if (ship.set === false) return false;
      return true;
    }
    const player2 = useGameStore.getState().player2;
    for (let ship of player2.ships) if (ship.set === false) return false;
    return true;
  },
  placeShip: (playerNo, shipIndex) => {
    set((state) => {
      console.log(playerNo, shipIndex);
      if (playerNo === 1) {
        const ships = [...state.player1.ships];
        ships[shipIndex] = {
          ...ships[shipIndex],
          set: true,
        };

        console.log('SHIPS: ', ships);
        return {
          player1: {
            ...state.player1,
            ships: ships,
          },
        };
      } else {
        const ships = [...state.player2.ships];
        ships[shipIndex] = {
          ...ships[shipIndex],
          set: true,
        };

        return {
          player2: {
            ...state.player2,
            ships: ships,
          },
        };
      }
    });
  },

  setCoordonates: (coordonates, player) => {
    console.log('COORDSSS HE: ', coordonates);
    console.log('PLAYER IN COORDONATES: ', player);
    set((state) => {
      const coords =
        player == 1
          ? [...state.coordonatesPlayerOne]
          : [...state.coordonatesPlayerTwo];

      let index = 0;
      const newCoords = [];

      for (let coord of coords) {
        if (
          index < coordonates.length &&
          coord.x == coordonates[index].x &&
          coord.y == coordonates[index].y
        ) {
          console.log('MATCH');
          newCoords.push({
            x: coordonates[index].x,
            y: coordonates[index].y,
            occupied: true,
            ship: {
              ...coordonates[index].ship,
              set: true,
            },
            player: player,
          });
          index++;
        } else newCoords.push(coord);
      }
      if (player == 1)
        return {
          coordonatesPlayerOne: newCoords,
        };
      return {
        coordonatesPlayerTwo: newCoords,
      };
    });
  },

  setHit: () => {
    set(() => ({
      wasHit: true,
    }));
  },
  resetHit: () => {
    set(() => ({
      wasHit: false,
    }));
  },

  hit: (row, col) => {
    const currentPlayer = useGameStore.getState().currentPlayer;
    let ships;
    let coords;
    if (currentPlayer === 1)
      ((coords = useGameStore.getState().coordonatesPlayerTwo),
        (ships = useGameStore.getState().player1.ships));
    else
      ((coords = useGameStore.getState().coordonatesPlayerOne),
        (ships = useGameStore.getState().player2.ships));

    let index = 10 * row + col;
    if (coords[index].hit === true) throw new Error('Already hit');
    coords[index].hit = true;

    if (coords[index].occupied) {
      let shipIndex = useGameStore
        .getState()
        .getShipIndex(coords[index].ship.type);
      ships[shipIndex].blocks--;

      if (ships[shipIndex].blocks === 0) {
        ships[shipIndex].alive = false;
        useGameStore.getState().setShipDestroyed();
      }
    }
    set(() => {
      if (currentPlayer === 1) {
        return {
          player1: {
            ships: ships,
          },
        };
      }
      return {
        player2: {
          ships: ships,
        },
      };
    });

    set(() => {
      if (currentPlayer === 1)
        return {
          coordonatesPlayerTwo: coords,
        };
      return {
        coordonatesPlayerOne: coords,
      };
    });
    useGameStore.getState().attack();
    if (coords[index].occupied === true) useGameStore.getState().setHit();
  },

  checkGameOver: () => {
    const currentPlayer = useGameStore.getState().currentPlayer;
    let ships;
    if (currentPlayer === 1) {
      ships = useGameStore.getState().player2.ships;
    } else ships = useGameStore.getState().player1.ships;

    for (let ship of ships) {
      console.log('SHIP BLOCKS REMAINING: ', ship.blocks);
      if (ship.blocks > 0) return;
    }

    set(() => ({
      gameOver: true,
    }));
  },
  resetGame: () => {
    set(() => initialState);
  },
}));
