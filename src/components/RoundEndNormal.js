import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { RegularText } from "../common/Text";
import { Colors } from "../common/styles";
import { useGameState } from "../contexts/GameStateContext";
import UserBadge from "./UserBadge";
import { Image } from "expo-image";
import { useState } from "react";

const { height } = Dimensions.get("window");
const padding = 10;
const radius = (height - 2 * padding) / 2;

function CircleComponents({ totalDecks, index }) {
  const viewHeight = 55;
  const viewWidth = 50;
  const angle = (2 * Math.PI * index) / totalDecks;

  return (
    <View
      style={{
        height: viewHeight,
        width: viewWidth,
        backgroundColor: "#262525",
        borderRadius: 3,
        position: "absolute",
        bottom: 0.8 * radius * Math.sin(angle) + radius - viewHeight / 2,
        right: 0.8 * radius * Math.cos(angle) + radius - viewWidth / 2,
      }}
    ></View>
  );
}

export default function RoundEndNormal() {
  const { players, setPlayers } = useGameState();
  const [AllInfo, setAllInfo] = useState([
    {
      1: -20,2: -10,3: 50,4: 20,5: -30,6: -10,7: -30
    },
    {
      1: -10,2: 10,3: -30,4: -30,5: 50,6: -20,7: 15
    },
  ]);
  return (
    <View style={styles.Container}>
      <View style={styles.Left}>
        <View style={styles.sqContainer}>
          <View style={styles.circleTable}>
            {new Array(7).fill(0).map((_, i, arr) => (
              <CircleComponents index={i} totalDecks={arr.length} />
            ))}
          </View>
        </View>
      </View>
      <View style={styles.Middle}>
        <Image
          source={require("../../assets/images/companies/adani.png")}
          style={{
            width: 100,
            height: 50,
            borderRadius: 10,
          }}
        />
      </View>
      <View style={styles.Right}>
        <FlatList
          style={{ alignSelf: "flex-end" }}
          contentContainerStyle={{
            justifyContent: "space-evenly",
            flexGrow: 1,
          }}
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
    flexDirection: "row",
  },
  Left: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  sqContainer: {
    position: "relative",
    height: 2 * radius,
    width: 2 * radius,
    marginTop: padding,
  },

  circleTable: {
    aspectRatio: 1,
    position: "absolute",
    // backgroundColor: "#14402a",
    backgroundColor: Colors.dim,
    borderRadius: 500,
    height: 2 * radius,
    width: 2 * radius,
  },
  Middle: {
    height: "100%",
    width: "37%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
  },
  Right: {
    height: "100%",
    width: "14%",
    alignItems: "center",
    justifyContent: "center",
  },
});
