import { View, Text, Image, StyleSheet } from "react-native";
import { CustomText, RegularText } from "../common/Text";
import { CompanyInObj } from "../data/cards";
import { Entypo } from "@expo/vector-icons";
import { Colors } from "../common/styles";
import GetCrstalIcon from "./GetCrystalIcon";

export default function TransactionSplash({ transaction, userName = "" }) {
  const numberOfStocks = (transaction.numberOfStocks / 1000).toFixed(0);
  const companyName = CompanyInObj[transaction.companyId]?.name || "";

  switch (transaction.type) {
    case "PASS": {
      return (
        <View style={styles.container}>
          <Image
            source={require("../../assets/gif/pass.gif")}
            style={{ width: 180, height: 180 }}
          />
          <CustomText family="SemiBoldItalic" size={16}>
            {userName} passed the turn
          </CustomText>
        </View>
      );
    }
    case "BUY": {
      return (
        <View style={styles.container}>
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
        <View style={styles.container}>
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
        <View style={styles.container}>
          <Entypo name="bar-graph" size={44} color={Colors.green} />
          <CustomText family="SemiBoldItalic" size={16}>
            {userName} used Upper circuit on {companyName}
          </CustomText>
        </View>
      );
    }
    case "CIRCUIT:LOW": {
      return (
        <View style={styles.container}>
          <Entypo
            name="bar-graph"
            style={{ transform: [{ rotateY: "180deg" }] }}
            size={44}
            color={Colors.red}
          />
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
          <View style={styles.container}>
            <View style={{ transform: [{ scale: 2 }] }}>
              <GetCrstalIcon type={crystalType.split("_")[0]} />
            </View>
            <CustomText family="SemiBoldItalic" size={16}>
              {userName} used{" "}
              <Text style={{ textTransform: "capitalize" }}>
                {crystalType.split("_").join(" ")}{" "}
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

const styles = StyleSheet.create({
  container: {
    gap: 30,
    alignItems: "center",
  },
});
