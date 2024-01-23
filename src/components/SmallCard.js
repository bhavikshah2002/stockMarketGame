import { Image, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { BoldText, SemiBoldText } from "../common/Text";
import { CompanyInObj } from "../data/cards";
import { Colors } from "../common/styles";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScaleDecorator } from "react-native-draggable-flatlist";
import { useGameState } from "../contexts/GameStateContext";

export function GetCrstalIcon({ type }) {
  switch (type) {
    case "FRAUD": {
      return (
        <>
          <MaterialCommunityIcons
            name="guy-fawkes-mask"
            size={24}
            color="#0c5419"
          />
        </>
      );
    }
    case "DIVIDEND": {
      return (
        <>
          <FontAwesome5 name="divide" size={24} color="#aa42f5" />
        </>
      );
    }
    case "BONUS": {
      return (
        <>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="plus" size={24} color="#1bcfab" />
            <FontAwesome name="plus" size={15} color="#14967c" />
            <FontAwesome name="plus" size={8} color="#074034" />
          </View>
        </>
      );
    }
    case "RIGHT": {
      return (
        <>
          <View style={{ flexDirection: "row", gap: -10 }}>
            <MaterialIcons name="attach-money" size={23} color="pink" />
            <MaterialIcons name="attach-money" size={23} color="orange" />
            <MaterialIcons name="attach-money" size={23} color="#e0ae84" />
          </View>
        </>
      );
    }
    case "LOAN": {
      return (
        <>
          <Fontisto name="money-symbol" size={24} color="#cf1bc0" />
        </>
      );
    }
    default: {
      return <FontAwesome name="diamond" size={24} color="blue" />;
    }
  }
}

export default function SmallCard({ card, drag, isActive }) {
  const { setSelectedCard } = useGameState();

  const onPress = () => setSelectedCard(card);

  switch (card.type) {
    case "NORMAL": {
      const isProfit = card.netChange > 0;
      return (
        <>
          <ScaleDecorator>
            <TouchableOpacity
              onPress={onPress}
              onLongPress={drag}
              disabled={isActive}
            >
              <View style={styles.Card}>
                <Image
                  source={CompanyInObj[card.companyId].photoUrl}
                  style={{
                    width: 50,
                    height: 20,
                  }}
                />
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <AntDesign
                    name={isProfit ? "caretup" : "caretdown"}
                    size={24}
                    color={isProfit ? Colors.green : Colors.red}
                  />
                </View>
                <View>
                  <BoldText>₹{Math.abs(card.netChange)}</BoldText>
                </View>
              </View>
            </TouchableOpacity>
          </ScaleDecorator>
        </>
      );
    }
    case "CIRCUIT": {
      let isUp = false;
      if (card.circuitType == "UP") isUp = true;
      return (
        <>
          <ScaleDecorator>
            <TouchableOpacity
              onPress={onPress}
              onLongPress={drag}
              disabled={isActive}
            >
              <View style={styles.Card}>
                <View
                  style={{
                    height: 20,
                    width: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: -5,
                  }}
                >
                  <BoldText size={9} style={{ marginTop: 5 }}>
                    Circuit{" "}
                  </BoldText>
                  <BoldText size={9}>{card.circuitType}</BoldText>
                </View>
                <Entypo
                  name="bar-graph"
                  style={isUp ? {} : { transform: [{ rotateY: "180deg" }] }}
                  size={24}
                  color={isUp ? Colors.green : Colors.red}
                />
                <View>
                  <BoldText>₹{card.denomination}</BoldText>
                </View>
              </View>
            </TouchableOpacity>
          </ScaleDecorator>
        </>
      );
    }
    case "CRYSTAL": {
      let current_card = card.crystalType.split("_")[0];
      return (
        <>
          <ScaleDecorator>
            <TouchableOpacity
              onPress={onPress}
              onLongPress={drag}
              disabled={isActive}
            >
              <View style={{ ...styles.Card, ...{ gap: 2 } }}>
                <View
                  style={{
                    height: 20,
                    width: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: -5,
                  }}
                >
                  <BoldText size={9} style={{ marginTop: 2 }}>
                    STOCK
                  </BoldText>
                  <BoldText size={9}>BAZAR</BoldText>
                </View>

                <GetCrstalIcon type={current_card} />
                <SemiBoldText size={10}>{current_card}</SemiBoldText>
              </View>
            </TouchableOpacity>
          </ScaleDecorator>
        </>
      );
    }
  }
}

const styles = StyleSheet.create({
  Card: {
    flex: 1,
    width: 50,
    marginTop: 1,
    marginBottom: 3,
    marginHorizontal: 8,
    backgroundColor: "#262525",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
    borderRadius: 5,
    overflow: "hidden",
  },
});
