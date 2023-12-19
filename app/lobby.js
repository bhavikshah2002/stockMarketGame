import { FlatList, Image, StyleSheet, View } from "react-native";
import {
  BoldText,
  ItalicText,
  RegularText,
  SemiBoldText,
} from "../src/common/Text";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Colors } from "../src/common/styles";

export default function LobbyPage() {
  const [noOfRounds, setNoOfRounds] = useState(10);
  const [playersWaiting, setPlayersWaiting] = useState(
    new Array(6).fill(0).map((_, id) => ({
      id,
      name: "Player " + id,
      photoURI: "https://picsum.photos/200/200?random=" + id,
    }))
  );

  const handleStartGame = () => {
    console.log("Not implemented yet");
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          source={{
            uri: "https://t3.ftcdn.net/jpg/03/12/92/74/360_F_312927435_NVvwOxvswQgNu97Y1m8VvtEPTVL9AnEN.jpg",
          }}
          style={{ width: 600, height: 400, position: "absolute" }}
        />
        <LinearGradient
          style={{ flex: 1, width: "100%", alignItems: "center" }}
          colors={["transparent", "#000"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <View style={{ height: 160 }} />
          <ItalicText>No of rounds</ItalicText>

          <View style={styles.inputBox}>
            <TouchableOpacity
              onPress={() => setNoOfRounds((p) => p - 1)}
              disabled={noOfRounds == 2}
            >
              <AntDesign name="minus" size={16} color="white" />
            </TouchableOpacity>
            <BoldText size={20}>{noOfRounds}</BoldText>
            <TouchableOpacity
              onPress={() => setNoOfRounds((p) => p + 1)}
              disabled={noOfRounds == 10}
            >
              <AntDesign name="plus" size={16} color="white" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleStartGame} style={styles.startBtn}>
            <BoldText size={20} transform="uppercase">
              Start game
            </BoldText>
          </TouchableOpacity>

          <Link href={"/"} asChild>
            <TouchableOpacity style={styles.LeaveBtn}>
              <BoldText size={20} transform="uppercase">
                Leave Lobby
              </BoldText>
            </TouchableOpacity>
          </Link>
        </LinearGradient>
      </View>

      <View style={styles.right}>
        <RegularText color={Colors.dim} size={12}>
          {playersWaiting.length} players waiting in lobby...
        </RegularText>

        <FlatList
          data={playersWaiting}
          renderItem={({ item }) => (
            <View style={styles.playerBox}>
              <Image
                source={{ uri: item.photoURI }}
                style={{ width: 30, height: 30, borderRadius: 100 }}
              />
              <SemiBoldText size={18}>{item.name}</SemiBoldText>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.black,
  },

  left: {
    flex: 1,
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  startBtn: {
    marginTop: 10,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: Colors.green,
  },
  LeaveBtn: {
    marginTop: 10,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: Colors.red,
  },

  right: {
    flex: 1,
    alignItems: "center",
    gap: 5,
    paddingTop: 30,
  },
  playerBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 3,
    backgroundColor: "#222",
    width: 180,
    padding: 6,
    borderRadius: 5,
  },
});
