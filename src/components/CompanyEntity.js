import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { BoldText, ItalicText } from "../common/Text";
import { Colors } from "../common/styles";
import { useGameState } from "../contexts/GameStateContext";

export default function CompanyEntity() {
  const { selectedEntity: company, gameState } = useGameState();

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image source={company.photoUrl} style={styles.logo} />
        <View>
          <BoldText size={22} style={{ letterSpacing: 1 }}>
            {company.name}
          </BoldText>
          <ItalicText color={Colors.dim}>
            Current Value ₹{gameState.companyValues[company.id]}
          </ItalicText>
        </View>
      </View>
      <View style={styles.left}>
        <TouchableOpacity>
          <BoldText>USE</BoldText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#141414",
    gap: 6,
    marginVertical: 10,
    borderRadius: 6,
    overflow: "hidden",
    borderColor: Colors.green + "22",
    borderWidth: 2,
  },

  logo: {
    width: 100,
    height: 60,
    objectFit: "cover",
  },

  top: {
    width: "100%",
    flexDirection: "row",
    gap: 8,
  },

  heading: {
    backgroundColor: Colors.info,
    paddingTop: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
});
