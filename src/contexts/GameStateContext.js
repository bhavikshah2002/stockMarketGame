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
  players: null,
  setPlayers: (s) => {},
  myUserName:"username",
  setMyUserName:(s)=>{}
});

export default function GameStateContextProvider({ children }) {
  const [gameState, setGameState] = useState(initializeGameState(6));
  const [selectedCard, _setSelectedCard] = useState(getCardStack().at(-12));
  const [selectedPlayerId, setSelectedPlayerId] = useState(1);
  const [selectedEntity, setSelectedEntity] = useState(selectedCard);
  const [selectedEntityType, setSelectedEntityType] = useState("card");
  const [myUserName, setMyUserName] = useState("username");
  const [isRoundStart, setIsRoundStart] = useState(true);
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
    if (
      (card.type == "CRYSTAL" && gameState.currentSubRound != 4) ||
      (card.type == "CIRCUIT" && gameState.currentSubRound == 4) //Change this to 4
    ) {
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
        myUserName,
        setMyUserName
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
