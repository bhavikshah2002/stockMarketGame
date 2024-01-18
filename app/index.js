import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import {
  BoldText,
  ItalicText,
  RegularText,
  SemiBoldText,
} from "../src/common/Text";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { useRef } from "react";
import { Colors } from "../src/common/styles";
import { useGameState } from "../src/contexts/GameStateContext";

export default function HomePage() {
  const inputRef = useRef();
  const { myUserName, setMyUserName, create, join } = useGameState();
  const handleInputChange = (text) => setMyUserName(text);

  const onJoin = () => {
    if (myUserName == "username" || myUserName == "") {
      Alert.alert("Invalid username", "Please enter a valid username", [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
      ]);
    } else {
      router.push("/lobby");
    }
  };

  const onCreate = () => {
    if (myUserName == "username" || myUserName == "") {
      Alert.alert("Invalid username", "Please enter a valid username", [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
      ]);
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
            <BoldText size={25} transform="uppercase">
              Create
            </BoldText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.center, ...styles.Btn }}
            onPress={onJoin}
          >
            <BoldText size={25} transform="uppercase">
              Join
            </BoldText>
            <Ionicons name="enter" size={30} color="white" />
          </TouchableOpacity>
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
    height: 80,
    width: 190,
    borderRadius: 100,
  },

  right: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
});
