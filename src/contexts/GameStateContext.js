import { createContext, useContext, useState } from "react";
import { getCardStack, initializeGameState } from "../data/cards";

const GameStateContext = createContext({
  gameState: null,
  setGameState: (s) => {},
  selectedCard: null,
  setSelectedCard: (s) => {},
  selectedPlayerId: 1,
  setSelectedPlayerId: (s) => {},
  selectCompany: (c) => {},
  selectedEntity: null,
  selectedEntityType: "card",
});

export default function GameStateContextProvider({ children }) {
  const [gameState, setGameState] = useState(initializeGameState(6));
  const [selectedCard, _setSelectedCard] = useState(getCardStack().at(-12));
  const [selectedPlayerId, setSelectedPlayerId] = useState(1);
  const [selectedEntity, setSelectedEntity] = useState(selectedCard);
  const [selectedEntityType, setSelectedEntityType] = useState("card");

  const selectEntity = (entity, type) => {
    setSelectedEntityType(type);
    setSelectedEntity(entity);
  };

  const setSelectedCard = (card) => {
    _setSelectedCard(card);
    if (card.type == "CRYSTAL") {
      selectEntity(card, "card");
    }
  };

  const selectCompany = (company) => {
    selectEntity(company, "company");
  };

  return (
    <GameStateContext.Provider
      value={{
        gameState,
        setGameState,
        setSelectedCard,
        selectedCard,
        selectedPlayerId,
        setSelectedPlayerId,
        selectCompany,
        selectedEntity,
        selectedEntityType,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
}

export const useGameState = () => {
  const gameContext = useContext(GameStateContext);

  if (!gameContext) {
    throw new Error(
      "`useGameState` must be used only inside <GameStateContextProvider></GameStateContextProvider"
    );
  }

  return gameContext;
};
