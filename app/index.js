import { Image } from "expo-image";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { BoldText, SemiBoldText } from "../src/common/Text";
import { View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useRef, useState } from "react";
import { Colors } from "../src/common/styles";
import { useGameState } from "../src/contexts/GameStateContext";
import alertFunction from "../src/utils/alertFunction";

export default function HomePage() {
  const inputRef = useRef();
  const { myUserName, setMyUserName, create, join, gameId, setGameId } =
    useGameState();
  const handleInputChange = (text) => setMyUserName(text);
  const [isEntering, setIsEntering] = useState(false);

  const onJoin = () => {
    if (myUserName == "username" || myUserName == "") {
      alertFunction("Invalid username", "Please enter a valid username");
    }
    // else if (gameId.length !=6) {
    //   alertFunction("Invalid Game id", "Please enter a valid 6 digit game id");
    // }
    else {
      const success = join();
      if (success) router.push("/lobby");
    }
  };

  const onCreate = () => {
    if (myUserName == "username" || myUserName == "") {
      alertFunction("Invalid username", "Please enter a valid username");
    } else {
      create();
      router.push("/lobby");
    }
  };

  return (
    <View
      style={{
        ...styles.container,
        flexDirection: "column",
        paddingBottom: 10,
      }}
    >
      <View style={styles.container}>
        <View style={styles.left}>
          <Image
            style={styles.logo}
            source={require("../assets/images/withoutBgLogo1.png")}
            contentFit="contain"
          />
          <View style={{ ...styles.inputTextBox, ...styles.between }}>
            <TextInput
              style={styles.inputTextText}
              value={myUserName}
              ref={inputRef}
              onChangeText={handleInputChange}
            />

            <TouchableOpacity
              onPress={() => {
                inputRef.current.focus();
              }}
            >
              <Feather
                name="edit"
                size={17}
                color="black"
                style={{ backgroundColor: "white" }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.right}>
          <TouchableOpacity
            style={{ ...styles.center, ...styles.Btn }}
            onPress={onCreate}
          >
            <FontAwesome name="user-plus" size={28} color="white" />
            <BoldText size={25} transform="uppercase" style={{ paddingTop: 3 }}>
              Create
            </BoldText>
          </TouchableOpacity>
          {isEntering ? (
            <View style={styles.gameInputContainer}>
              <TextInput
                style={styles.gameIdInput}
                value={gameId || ""}
                onChangeText={setGameId}
                keyboardType="numeric"
                placeholder="Type code here"
              />
              <TouchableOpacity style={styles.joinBtn} onPress={onJoin}>
                <Ionicons name="enter" size={25} color={Colors.white} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={{ ...styles.center, ...styles.Btn }}
              onPress={() => setIsEntering(true)}
            >
              <BoldText
                size={25}
                transform="uppercase"
                style={{ paddingTop: 3 }}
              >
                Join
              </BoldText>
              <Ionicons name="enter" size={30} color={Colors.white} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: -5,
        }}
      >
        <SemiBoldText color={Colors.dim} size={13}>
          Created with ❤️
        </SemiBoldText>
        <SemiBoldText>Bhavik Shah, Arun Mulakkal, Arpit Shah</SemiBoldText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#000",
  },
  logo: {
    width: 250,
    height: 230,
    marginTop: 30,
  },
  inputTextBox: {
    flexDirection: "row",
    backgroundColor: "white",
    width: 200,
    height: 30,
    borderRadius: 50,
    paddingHorizontal: 10,
    alignItems: "center",
    paddingBottom: 2,
  },
  inputText: {},
  inputTextText: {
    flex: 1,
    color: "black",
    fontWeight: "bold",
  },
  left: {
    flex: 1,
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    gap: -5,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  between: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  Btn: {
    flexDirection: "row",
    gap: 5,
    padding: 5,
    borderRadius: 5,
    backgroundColor: Colors.darkGreen,
    height: 70,
    width: 190,
    borderRadius: 100,
  },

  right: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },

  gameInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    width: 190,
    borderRadius: 10000,
    overflow: "hidden",
  },

  gameIdInput: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: Colors.white,
    paddingLeft: 10,
  },

  joinBtn: {
    backgroundColor: Colors.darkGreen,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "25%",
  },
});
