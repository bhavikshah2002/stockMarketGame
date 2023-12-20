import { createContext, useContext, useEffect, useState } from "react";
import { getCardStack, initializeGameState } from "../data/cards";

const GameStateContext = createContext({
  gameState: null,
  setGameState: (s) => {},
  selectedCard: null,
  setSelectedCard: (s) => {},
});

export default function GameStateContextProvider({ children }) {
  const [gameState, setGameState] = useState(initializeGameState(6));
  const [selectedCard, setSelectedCard] = useState(getCardStack().at(-12));

  return (
    <GameStateContext.Provider
      value={{
        gameState,
        setGameState,
        setSelectedCard,
        selectedCard,
      }}
    >
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
