import { AntDesign } from "@expo/vector-icons";
import { Image, StyleSheet, View } from "react-native";
import {
  BoldText,
  CustomText,
  RegularText,
  SemiBoldText,
} from "../common/Text";
import { Colors } from "../common/styles";
import { CompanyInObj } from "../data/cards";

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
            style={{
              width: 100,
              height: 50,
              borderRadius: 5,
              objectFit: "contain",
            }}
          />
        </View>
      );
    }
    case "CIRCUIT": {
      return (
        <View>
          <RegularText>Circuit Not designed yet</RegularText>
        </View>
      );
    }
    case "CRYSTAL": {
      return (
        <View>
          <RegularText>Crystal Not designed yet</RegularText>
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
    gap: 8,
    marginVertical: 10,
    borderRadius: 6,
    overflow: "hidden",
  },
});
