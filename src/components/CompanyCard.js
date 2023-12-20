import { Image, StyleSheet, View } from "react-native";
import { BoldText, RegularText, SemiBoldText } from "../common/Text";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../common/styles";

export default function CompanyCard({ company, currentWorth, yourHoldings }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://picsum.photos/200/200?random=" + company.id }}
        style={styles.logo}
      />
      <LinearGradient
        style={{ width: 60, height: 40 }}
        colors={["transparent", "#141414"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.9, y: 0.7 }}
      />
      <View style={{ flex: 1 }}>
        <SemiBoldText size={13}>{company.name}</SemiBoldText>
        <RegularText size={9} color={Colors.dim}>
          current value {currentWorth}
        </RegularText>
      </View>
      <View style={{ marginRight: 6 }}>
        <BoldText size={18}>{(yourHoldings / 1000).toFixed(0)}K</BoldText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 9,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    backgroundColor: "#141414",
    position: "relative",
    borderRadius: 6,
    overflow: "hidden",
  },

  logo: {
    width: 60,
    height: 40,
    position: "absolute",
    left: 0,
    top: 0,
  },
});
