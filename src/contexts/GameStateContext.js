import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getCardStack, initializeGameState } from "../data/cards";
import SocketConn from "../utils/socket";
import { Alert } from "react-native";

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
  myUserName: "username",
  setMyUserName: (s) => {},

  gameId: null,
  setGameId(p) {},
  create() {},
  join() {},
  leave() {},
  myUserId: null,
  setMyUserId(p) {},
});

export default function GameStateContextProvider({ children }) {
  const conn = useRef(null);
  const [gameState, setGameState] = useState(null);
  const [myUserId, setMyUserId] = useState(null);
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
  const [gameId, setGameId] = useState(null);

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

  //########### SOCKET STUFF ###########
  const create = () => {
    const id = new Date().getTime() % 1000000;
    setGameId(id);
    conn.current = new SocketConn(
      `http://13.232.187.121/ws/chat/${id}/?create=True&join=False&username=${myUserName}`
    );
  };

  const join = () => {
    if (!gameId) {
      Alert.alert("Game Id Invalid", "Please enter a valid gameId", [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
      ]);
      return false;
    }
    conn.current = new SocketConn(
      `http://13.232.187.121/ws/chat/${gameId}/?create=False&join=True&username=${myUserName}`
    );
    return true;
  };

  const leave = () => {
    setGameId(null);
    setMyUserId(null);
    conn.current?.close();
  };

  useEffect(() => {
    if (!conn.current) return;

    const roundInfo = (data) => {
      console.log(data);
    };

    conn.current.on("roundInfo", roundInfo);

    return () => {
      conn.current.off("roundInfo", roundInfo);
    };
  }, [conn.current]);

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
        setMyUserName,

        conn,
        gameId,
        setGameId,
        create,
        join,
        leave,
        myUserId,
        setMyUserId,
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
