import { createContext, useContext, useState } from "react";
import { initializeGameState } from "../data/cards";

const GameStateContext = createContext({
  gameState: initializeGameState(6),
  setGameState: (s) => {},
});

export default function GameStateContextProvider({ children }) {
  const [gameState, setGameState] = useState(initializeGameState(6));

  return (
    <GameStateContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameStateContext.Provider>
  );
}

export const useGameState = (func = (s) => s) => {
  const gameContext = useContext(GameStateContext);

  if (!gameContext) {
    throw new Error(
      "`useGameState` must be used only inside <GameStateContextProvider></GameStateContextProvider"
    );
  }

  return func(gameContext);
};
