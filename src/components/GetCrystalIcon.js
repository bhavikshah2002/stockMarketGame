import { View } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function GetCrstalIcon({ type }) {
  switch (type) {
    case "FRAUD": {
      return (
        <>
          <MaterialCommunityIcons
            name="guy-fawkes-mask"
            size={22}
            color="#0c5419"
          />
        </>
      );
    }
    case "DIVIDEND": {
      return (
        <>
          <FontAwesome5 name="divide" size={22} color="#aa42f5" />
        </>
      );
    }
    case "BONUS": {
      return (
        <>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="plus" size={22} color="#1bcfab" />
            <FontAwesome name="plus" size={14} color="#14967c" />
            <FontAwesome name="plus" size={8} color="#074034" />
          </View>
        </>
      );
    }
    case "RIGHT": {
      return (
        <>
          <View style={{ flexDirection: "row", gap: -10 }}>
            <MaterialIcons name="attach-money" size={22} color="pink" />
            <MaterialIcons name="attach-money" size={22} color="orange" />
            <MaterialIcons name="attach-money" size={22} color="#e0ae84" />
          </View>
        </>
      );
    }
    case "LOAN": {
      return (
        <>
          <Fontisto name="money-symbol" size={22} color="#cf1bc0" />
        </>
      );
    }
    default: {
      return <FontAwesome name="diamond" size={22} color="blue" />;
    }
  }
}
