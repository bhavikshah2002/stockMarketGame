import { useGameState } from "../src/contexts/GameStateContext";
import RoundStartScreen from "../src/components/RoundStartScreen";
import RoundEndCircuit from "../src/components/RoundEndCircuit";
import RoundEndNormal from "../src/components/RoundEndNormal";

export default function TableScreen() {
  const { isRoundStart, isCircuit } = useGameState();

  if (isRoundStart) return <RoundStartScreen />;

  if (isCircuit) return <RoundEndCircuit />;

  return <RoundEndNormal />;
}
