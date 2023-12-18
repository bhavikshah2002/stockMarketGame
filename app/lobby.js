import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView,View } from "react-native";

export default function LobbyPage() {
  return (
    <View>
      <Text>Lobby page</Text>
      <Link href="/">Go Back</Link>
    </View>
  );
}
