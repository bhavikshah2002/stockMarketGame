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
import SocketConn from "../src/utils/socket";


export default function LobbyPage() {
  const [noOfRounds, setNoOfRounds] = useState(10);
  const emojiArray = ["😎","😍","😉","🤩","🧐","😁","🥳"].sort(() => Math.random() - 0.5)
  const [playersWaiting, setPlayersWaiting] = useState(
    new Array(7).fill(0).map((_, id) => ({
      id,
      name: "MyUserName " + (id+1),
    }))
  );

  const handleStartGame = () => {
    console.log("Not implemented yet");
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          source={require("../assets/images/lobbyBackground.png")}
          style={{ width: 600, height: 400, position: "absolute" }}
        />
        <LinearGradient
          style={{ flex: 1, width: "100%", alignItems: "center" }}
          colors={["transparent", "#000"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <View style={styles.RoomID}>
          <BoldText size={20}>ROOM ID : </BoldText>
          <BoldText size={20} color="white">528957 </BoldText>

          </View>
          <View style={{ height: 150 }} />
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
          <Link href={"/gameroom"}>
            <TouchableOpacity onPress={handleStartGame} style={styles.startBtn}>
              <BoldText size={20} transform="uppercase">
                Start game
              </BoldText>
            </TouchableOpacity>
          </Link>

          <Link href={"/"} asChild>
            <TouchableOpacity style={styles.LeaveBtn}>
              <BoldText size={20} transform="uppercase">
                Leave Lobby
              </BoldText>
            </TouchableOpacity>
          </Link>
          {/* <Link href={"/table"} asChild>
            <TouchableOpacity style={styles.LeaveBtn}>
              <BoldText size={20} transform="uppercase">
                Round End
              </BoldText>
            </TouchableOpacity>
          </Link> */}
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
              <SemiBoldText style={{marginLeft:10}} size={18}>{emojiArray[item.id]}</SemiBoldText>
              <SemiBoldText size={15}>{item.name}</SemiBoldText>
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
    alignItems:"center"
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
    height:350,
    justifyContent:"center",
  },
  playerBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 3,
    backgroundColor: "#222",
    width: 200,
    padding: 6,
    borderRadius: 5,
  },
  RoomID:{
    top:60,
    flexDirection:"row",
    backgroundColor:Colors.info,
    borderRadius:5,
    paddingHorizontal:10,
    paddingTop:2
  }
});
