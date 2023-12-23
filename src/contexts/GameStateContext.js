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
  isRoundStart: true,
  setIsRoundStart: (s) => {},
  isCircuit: false,
  setIsCircuit: (s) => {},
});

export default function GameStateContextProvider({ children }) {
  const [gameState, setGameState] = useState(initializeGameState(6));
  const [selectedCard, _setSelectedCard] = useState(getCardStack().at(-12));
  const [selectedPlayerId, setSelectedPlayerId] = useState(1);
  const [selectedEntity, setSelectedEntity] = useState(selectedCard);
  const [selectedEntityType, setSelectedEntityType] = useState("card");
  const [isRoundStart, setIsRoundStart] = useState(false);
  const [isCircuit, setIsCircuit] = useState(false);
  const [players, setPlayers] = useState(
    new Array(6).fill(0).map((_, id) => ({
      id,
      playerNumber: id,
      playerName: "UserName" + (id + 1),
      playerInHandCash: 10 * (id + 1),
      active: false,
    }))
  );

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
        isRoundStart,
        setIsRoundStart,
        isCircuit,
        setIsCircuit,
        players,
        setPlayers,
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
