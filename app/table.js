import { useGameState } from "../src/contexts/GameStateContext";
import RoundStartScreen from "../src/components/RoundStartScreen";
import RoundEndCircuit from "../src/components/RoundEndCircuit";
import RoundEndNormal from "../src/components/RoundEndNormal";
import RoundEnd from "../src/components/RoundEndScreen";

export default function TableScreen() {
  const { isRoundStart, isCircuit } = useGameState();
  return <RoundEnd/>;
  if (isRoundStart) return <RoundStartScreen />;

  if (isCircuit) return <RoundEndCircuit />;

  return <RoundEndNormal />;
}
