import { FlatList, StyleSheet, View } from "react-native";
import { RegularText } from "../common/Text";
import { Colors } from "../common/styles";
import { useGameState } from "../contexts/GameStateContext";
import UserBadge from "./UserBadge";

export default function RoundEndNormal() {
  const { players, setPlayers } = useGameState();
  return (
    <View style={styles.Container}>
      <View style={styles.Left}>
        <RegularText>Left</RegularText>
      </View>
      <View style={styles.Middle}>
        <RegularText>Right</RegularText>
      </View>
      <View style={styles.Right}>

      <FlatList
          style={{ alignSelf: "flex-end" }}
          contentContainerStyle = {{justifyContent:'space-evenly',flexGrow:1}}
          data={players}
          renderItem={({ item }) => <UserBadge player={item} />}
          keyExtractor={(item) => item.id}
          />
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.black,
    flexDirection:"row"
  },
  Left: {
    flex:1,
    height:"100%",
    backgroundColor:Colors.dim
  },
  Middle: {
    height: "100%",
    width: "44%",
    alignItems: "center",
  },
  Right: {
    height: "100%",
    width: "16%",
    alignItems: "center",
    justifyContent:"center",
  },
});
