import { Image } from "expo-image";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";
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
} from "react-native";
import { useState } from "react";
const { width, height } = Dimensions.get("window");
export default function HomePage() {
  const [userName, setUserName] = useState("UserName");
  const handleInputChange = (text) => setUserName(text);
  const openTextInput = () => {
    // Show the TextInput only when clicked
    setUserName(userName); // Reset the input text when opened
  };
  return (
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
            value={userName}
            onChangeText={handleInputChange}
          />

          <TouchableOpacity onPress={openTextInput}>
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
        <Link href={"/lobby"} asChild>
          <TouchableOpacity
            style={{ ...styles.center, ...styles.Btn }}
            onPress={() => {
              /* Create button action */
            }}
          >
            <BoldText size={25} transform="uppercase">
              Create
            </BoldText>
          </TouchableOpacity>
        </Link>
        <Link href={"/lobby"} asChild>
          <TouchableOpacity
            style={{ ...styles.center, ...styles.Btn }}
            onPress={() => {
              /* Create button action */
            }}
          >
            <BoldText size={25} transform="uppercase">
              Join
            </BoldText>
          </TouchableOpacity>
        </Link>
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
    height: 250,
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
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#1E5128",
    height: 90,
    width: 190,
    borderRadius: 100,
  },

  right: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
  },
});
