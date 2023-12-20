import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, StyleSheet, View } from "react-native";
import {
  BoldText,
  CustomText,
  ItalicText,
  RegularText,
  SemiBoldText,
} from "../common/Text";
import { Colors } from "../common/styles";
import { CompanyInObj } from "../data/cards";

function CrystalContent({ type }) {
  switch (type) {
    case "FRAUD": {
      return (
        <>
          <MaterialCommunityIcons
            name="guy-fawkes-mask"
            size={44}
            color="#0c5419"
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
          <FontAwesome5 name="divide" size={44} color="#aa42f5" />
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
            <FontAwesome name="plus" size={44} color="#1bcfab" />
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
          <Fontisto name="money-symbol" size={44} color="#cf1bc0" />
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

export default function BigCard({ card }) {
  switch (card.type) {
    case "NORMAL": {
      const isProfit = card.netChange > 0;

      return (
        <View style={styles.container}>
          <AntDesign
            name={isProfit ? "caretup" : "caretdown"}
            size={44}
            color={isProfit ? Colors.green : Colors.red}
          />
          <BoldText size={20}>
            {isProfit ? "+" : "-"} ₹{Math.abs(card.netChange)}
          </BoldText>
          <CustomText size={12} align="center" family="BoldItalic">
            Something very {isProfit ? "good" : "bad"} {"\n"} happened
          </CustomText>
          <Image
            source={CompanyInObj[card.companyId].photoUrl}
            style={styles.companyLogo}
          />
        </View>
      );
    }

    case "CIRCUIT": {
      const isUpperCircuit = card.circuitType == "UP";

      return (
        <View style={[styles.container, { gap: 10 }]}>
          <Feather
            name={isUpperCircuit ? "trending-up" : "trending-down"}
            size={44}
            color={isUpperCircuit ? Colors.green : Colors.red}
          />
          <BoldText size={20}>
            {isUpperCircuit ? "+" : "-"} ₹{card.denomination}
          </BoldText>
          <View
            style={{
              backgroundColor: isUpperCircuit ? Colors.green : Colors.red,
              paddingTop: 2,
              paddingHorizontal: 6,
              borderRadius: 4,
            }}
          >
            <SemiBoldText size={18}>
              {isUpperCircuit ? "UPPER" : "LOWER"} CIRCUIT
            </SemiBoldText>
          </View>
        </View>
      );
    }

    case "CRYSTAL": {
      return (
        <View style={[styles.container, { gap: 14 }]}>
          <View
            style={{
              backgroundColor: Colors.info,
              paddingTop: 2,
              paddingHorizontal: 6,
              borderRadius: 4,
            }}
          >
            <BoldText>{card.crystalType.split("_").join("  ")}</BoldText>
          </View>
          <CrystalContent type={card.crystalType} />
        </View>
      );
    }

    default: {
      return (
        <View style={styles.container}>
          <AntDesign name="exclamationcircle" size={24} color={Colors.red} />
          <SemiBoldText size={15} align="center">
            Something went {"\n"} wrong
          </SemiBoldText>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#141414",
    gap: 6,
    marginVertical: 10,
    borderRadius: 6,
    overflow: "hidden",
    borderColor: Colors.green + "22",
    borderWidth: 2,
  },
  companyLogo: {
    width: 100,
    height: 40,
    borderRadius: 5,
    objectFit: "contain",
  },
});
