import { Feather, AntDesign } from "@expo/vector-icons";
import { Image, StyleSheet, View } from "react-native";
import { BoldText, CustomText, SemiBoldText } from "../common/Text";
import { Colors } from "../common/styles";
import { CardMessages, CompanyInObj } from "../data/cards";
import { useGameState } from "../contexts/GameStateContext";
import CrystalContent from "./CrystalContent";

export default function BigCard() {
  const { selectedCard: card } = useGameState();

  if (!card)
    return (
      <View
        style={[
          styles.container,
          {
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 3,
            gap: 15,
          },
        ]}
      >
        <Image
          style={styles.logo}
          source={require("../../assets/images/withoutBgLogo1.png")}
          contentFit="contain"
        />
        <SemiBoldText size={15} align="center" color={Colors.dim}>
          Please select a card!
        </SemiBoldText>
      </View>
    );

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
          <CustomText
            style={{ maxWidth: "94%" }}
            size={11}
            align="center"
            family="BoldItalic"
          >
            {CardMessages[isProfit ? "up" : "low"][card.id % 30]}
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
    marginVertical: 8,
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
  logo: {
    width: 100,
    height: 80,
  },
});
