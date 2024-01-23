import { View, Text, Image } from "react-native";
import { CustomText, RegularText } from "../common/Text";
import { useGameState } from "../contexts/GameStateContext";
import { CompanyInObj } from "../data/cards";
import { GetCrstalIcon } from "./SmallCard";

export default function TransactionSplash({ transaction }) {
  const { gameState } = useGameState();
  const userName = gameState.userState[transaction.userId].username;
  const numberOfStocks = (transaction.numberOfStocks / 1000).toFixed(0);
  const companyName = CompanyInObj[transaction.companyId]?.name || "";

  switch (transaction.type) {
    case "PASS": {
      return (
        <View>
          <CustomText family="SemiBoldItalic" size={16}>
            {userName} passed the turn
          </CustomText>
        </View>
      );
    }
    case "BUY": {
      return (
        <View style={{ gap: 30, alignItems: "center" }}>
          <Image
            source={require("../../assets/gif/buy.gif")}
            style={{ width: 150, height: 150 }}
          />
          <CustomText family="SemiBoldItalic" size={16}>
            {userName} bought {numberOfStocks}K stocks of {companyName}
          </CustomText>
        </View>
      );
    }
    case "SELL": {
      return (
        <View style={{ gap: 30, alignItems: "center" }}>
          <Image
            source={require("../../assets/gif/sell.gif")}
            style={{ width: 150, height: 150 }}
          />
          <CustomText family="SemiBoldItalic" size={16}>
            {userName} sold {numberOfStocks}K stocks of {companyName}
          </CustomText>
        </View>
      );
    }
    case "CIRCUIT:UP": {
      return (
        <View>
          <CustomText family="SemiBoldItalic" size={16}>
            {userName} used Upper circuit on {companyName}
          </CustomText>
        </View>
      );
    }
    case "CIRCUIT:LOW": {
      return (
        <View>
          <CustomText family="SemiBoldItalic" size={16}>
            {userName} used Lower circuit on {companyName}
          </CustomText>
        </View>
      );
    }
    default:
      if (transaction.type.startsWith("CRYSTAL:")) {
        const crystalType = transaction.type.split(":")[1];

        return (
          <View style={{ gap: 30, alignItems: "center" }}>
            <View style={{ transform: [{ scale: 2 }] }}>
              <GetCrstalIcon type={crystalType.split("_")[0]} />
            </View>
            <CustomText family="SemiBoldItalic" size={16}>
              {userName} used{" "}
              <Text style={{ textTransform: "capitalize" }}>
                {crystalType.split("_").join(" ")}
              </Text>
              card
            </CustomText>
          </View>
        );
      } else {
        return (
          <View>
            <RegularText>TransactionSplash</RegularText>
          </View>
        );
      }
  }
}
