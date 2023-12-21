import {
  FontAwesome,
  MaterialIcons,
  AntDesign,
  Fontisto,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { View } from "react-native";
import { ItalicText } from "../common/Text";
import { Colors } from "../common/styles";

export default function CrystalContent({ type }) {
  switch (type) {
    case "FRAUD": {
      return (
        <>
          <MaterialCommunityIcons
            name="guy-fawkes-mask"
            size={44}
            color={Colors.darkGreen}
          />
          <ItalicText color={Colors.dim} align="center" size={13}>
            Stock Value @ 50% {"\n"}Discount from Market {"\n"} Price
          </ItalicText>
        </>
      );
    }
    case "DIVIDEND": {
      return (
        <>
          <FontAwesome5 name="divide" size={44} color={Colors.purple} />
          <ItalicText color={Colors.dim} align="center" size={13}>
            Received Dividend on {"\n"}Shares ₹ 5/- per Share
          </ItalicText>
        </>
      );
    }
    case "BONUS_SHARE": {
      return (
        <>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="plus" size={44} color={Colors.teal} />
            <FontAwesome name="plus" size={24} color="#14967c" />
            <FontAwesome name="plus" size={14} color="#074034" />
          </View>
          <ItalicText color={Colors.dim} align="center" size={13}>
            Get 1 Additional Share{"\n"}for every Five help in any{"\n"}company
          </ItalicText>
        </>
      );
    }
    case "RIGHT_ISSUE": {
      return (
        <>
          <View style={{ flexDirection: "row", gap: -10 }}>
            <MaterialIcons name="attach-money" size={44} color="pink" />
            <MaterialIcons name="attach-money" size={44} color="orange" />
            <MaterialIcons name="attach-money" size={44} color="#e0ae84" />
          </View>
          <ItalicText color={Colors.dim} align="center" size={13}>
            1 Additional share for{"\n"}every two held in any{"\n"}company Price
            ₹ 10/-{"\n"}Per Share
          </ItalicText>
        </>
      );
    }
    case "LOAN_ON_STOCK": {
      return (
        <>
          <Fontisto name="money-symbol" size={44} color={Colors.darkPink} />
          <ItalicText color={Colors.dim} align="center" size={13}>
            Collect ₹ 100000 from{"\n"}the Stockbroker
          </ItalicText>
        </>
      );
    }
    default: {
      return (
        <AntDesign name="exclamationcircle" size={24} color={Colors.red} />
      );
    }
  }
}
