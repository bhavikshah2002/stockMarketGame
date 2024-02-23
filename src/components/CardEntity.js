import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { BoldText, RegularText, SemiBoldText } from "../common/Text";
import { Colors } from "../common/styles";
import { useGameState } from "../contexts/GameStateContext";
import FraudCard from "./CrystalCards/FraudCard";
import DividendCard from "./CrystalCards/DividendCard";
import BonusShareCard from "./CrystalCards/BonusShareCard";
import RightIssueCard from "./CrystalCards/RightIssueCard";
import LoanCard from "./CrystalCards/LoanCard";
import { Companies } from "../data/cards";
import { useState } from "react";
import ModalForCard from "./CrystalCards/ModalForCard";
import { Image } from "expo-image";

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

function GetCircuitCard({ card }) {
  const isUpperCircuit = card.circuitType == "UP";
  const { gameState, myUserId, conn } = useGameState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  if (modalVisible && selectedCompany) {
    return (
      <View style={styles.container}>
        <ModalForCard
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          transactionInfo={
            <RegularText color={Colors.dim} align={"center"}>
              You want to continue with {selectedCompany.name}
            </RegularText>
          }
          operatingFunction={() => {
            conn.current.emit("circuit", {
              companyId: selectedCompany.id,
              circuitType: card.circuitType,
              denomination: card.denomination,
            });
          }}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { gap: 10, paddingLeft: 20 }]}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
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

      <View style={{ flex: 1, alignItems: "center" }}>
        <SemiBoldText color={Colors.dim} style={{ marginVertical: 4 }}>
          Companies
        </SemiBoldText>
        <FlatList
          data={Companies.filter(
            (com) => !gameState?.circuitValues?.[com.id]?.[card.circuitType]
          )}
          style={{ marginBottom: 5 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedCompany(item);
                setModalVisible(true);
              }}
              style={styles.companyBox}
            >
              <SemiBoldText size={13} style={{ width: 90 }}>
                {item.name}
              </SemiBoldText>

              <Entypo name="chevron-right" size={24} color={Colors.dim} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

export default function CardEntity() {
  const { selectedEntity: card } = useGameState();
  if (!card || card?.type == "NORMAL") {
    return (
      <View
        style={[
          styles.container,
          { flexDirection: "column", justifyContent: "center", gap: 15 },
        ]}
      >
        <Image
          style={styles.logo}
          source={require("../../assets/images/withoutBgLogo1.png")}
          contentFit="contain"
        />
        <RegularText size={13} color={Colors.dim} align="center">
          Please select a company to proceed a transaction!
        </RegularText>
      </View>
    );
  }

  if (card.type == "CIRCUIT") return <GetCircuitCard card={card} />;

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

  companyBox: {
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 5,
    backgroundColor: Colors.black,
  },
  logo: {
    width: 100,
    height: 80,
  },
});
