import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  CustomText,
  ItalicText,
  RegularText,
  SemiBoldText,
} from "../../src/common/Text";
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
        {/* <View
          style={{
            position: "absolute",
            left: 0,
            width: 40,
            height: 40,
            backgroundColor: color,
            transform: [{ rotateZ: "45deg" }],
          }}
        /> */}
        <View
          style={{
            backgroundColor: color,
            marginLeft: 25,
            paddingHorizontal: 10,
            justifyContent: "center",
            alignItems: "flex-end",
            transform: [

            ],
          }}
        >
          <CustomText family="SemiBoldItalic" size={11}>
            {player.playerName}
          </CustomText>
          <RegularText>{player.playerInHandCash}L</RegularText>
        </View>
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
