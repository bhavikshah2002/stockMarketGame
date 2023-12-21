import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CustomText, RegularText } from "../../src/common/Text";
import { Colors } from "../common/styles";

const colorsArray = [
  Colors.green,
  Colors.red,
  Colors.info,
  "#1bcfab",
  "orange",
];

export default function UserBadge({ player }) {
  const color = colorsArray[player.id % 5];
  return (
    <TouchableOpacity>
      <View style={[styles.container]}>
        <View
          style={{
            backgroundColor: color,
            paddingLeft: 35,
            paddingHorizontal: 10,
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <CustomText family="SemiBoldItalic" size={10}>
            {player.playerName}
          </CustomText>
          <RegularText>₹{player.playerInHandCash}L</RegularText>
        </View>
        <View
          style={{
            position: "absolute",
            left: 0,
            width: 100,
            height: 100,
            backgroundColor: Colors.black,
            transform: [{ rotateZ: "15deg" }, { translateX: -80 }],
          }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: 110,
    height: 40,
    flexDirection: "row",
    overflow: "hidden",
    position: "relative",
  },
});
