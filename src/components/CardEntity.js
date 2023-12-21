import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { BoldText, SemiBoldText } from "../common/Text";
import { Colors } from "../common/styles";
import { useGameState } from "../contexts/GameStateContext";
import CrystalContent from "./CrystalContent";
import { TouchableOpacity } from "react-native-gesture-handler";
import FraudCard from "./FraudCard";
import DividendCard from "./DividendCard";
import BonusShareCard from "./BonusShareCard";
import RightIssueCard from "./RightIssueCard";
import LoanCard from "./LoanCard";

// To be designed more
function GetCrystalCard({ card_type, cardDetail }) {
  switch (card_type) {
    case "FRAUD": {
      return <FraudCard card={cardDetail} />;
    }
    case "DIVIDEND": {
      return <DividendCard card={cardDetail} />;
    }
    case "BONUS": {
      return <BonusShareCard card={cardDetail} />;
    }
    case "RIGHT": {
      return <RightIssueCard card={cardDetail} />;
    }
    case "LOAN": {
      return <LoanCard card={cardDetail} />;
    }
    default: {
      return (
        <View style={styles.container}>
          <AntDesign name="exclamationcircle" size={24} color={Colors.red} />
          <SemiBoldText size={15} align="center">
            No card is selected
          </SemiBoldText>
        </View>
      );
    }
  }
}

export default function CardEntity() {
  const { selectedEntity: card } = useGameState();

  if (card?.type != "CRYSTAL") {
    return (
      <View style={styles.container}>
        <AntDesign name="exclamationcircle" size={24} color={Colors.red} />
        <SemiBoldText size={15} align="center">
          No card is selected
        </SemiBoldText>
      </View>
    );
  }

  return (
    <GetCrystalCard
      card_type={card.crystalType.split("_")[0]}
      cardDetail={card}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#141414",
    gap: 6,
    marginVertical: 10,
    borderRadius: 6,
    overflow: "hidden",
    borderColor: Colors.green + "22",
    borderWidth: 2,
  },

  left: {
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },

  heading: {
    backgroundColor: Colors.info,
    paddingTop: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
});
