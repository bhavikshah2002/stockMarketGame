import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native";

export default function LobbyPage() {
  return (
    <SafeAreaView>
      <Text>Lobby page</Text>
      <Link href="/">Go Back</Link>
    </SafeAreaView>
  );
}
