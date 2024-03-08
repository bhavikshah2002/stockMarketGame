import { StyleSheet, TouchableOpacity, View } from "react-native";
import { RegularText } from "../common/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../common/styles";
import { useState } from "react";
import { FadeInView } from "../common/animations";
import { useGameState } from "../contexts/GameStateContext";

export default function EmoticonsButton() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { conn } = useGameState();

  const handleSend = (emoji) => {
    conn.current?.emit("emoticon", emoji);
    setMenuOpen(false);
  };

  return (
    <View style={styles.container}>
      {menuOpen && (
        <>
          <FadeInView style={styles.menu}>
            <View style={styles.menuRow}>
              {["😎", "😭", "😂", "👍🏻"].map((emoji) => (
                <TouchableOpacity onPress={() =>{ handleSend(emoji)}} key={emoji}>
                  <RegularText size={20}>{emoji}</RegularText>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.menuRow}>
              {["😮", "🤐", "😡", "😘"].map((emoji) => (
                <TouchableOpacity onPress={() => handleSend(emoji)} key={emoji}>
                  <RegularText size={20}>{emoji}</RegularText>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.notch} />
          </FadeInView>
        </>
      )}

      <TouchableOpacity
        onPress={() => setMenuOpen((p) => !p)}
        style={styles.emoticonBtn}
      >
        <RegularText>
          <MaterialCommunityIcons
            name="sticker-emoji"
            size={24}
            color={Colors.white}
          />
        </RegularText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginVertical: 15,
    padding: 8,
    backgroundColor: Colors.dim + "33",
    width: 60,
    borderRadius: 4,
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.darkGreen + "55",
    marginRight:15
  },

  emoticonBtn: {},

  menu: {
    position: "absolute",
    bottom: "100%",
    right: 0,

    paddingHorizontal: 5,
    paddingVertical: 3,
    marginBottom: 25,
    borderRadius: 5,
    backgroundColor: "#222",
  },

  menuRow: {
    flexDirection: "row",
    gap: 8,
  },

  notch: {
    position: "absolute",
    width: 10,
    height: 10,
    bottom: -5,
    right: 10,

    backgroundColor: "#222",
    transform: [{ rotateZ: "45deg" }],
  },
});
