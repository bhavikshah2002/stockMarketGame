import { Image, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { BoldText, SemiBoldText } from "../common/Text";
import { CompanyInObj } from "../data/cards";
import { Colors } from "../common/styles";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { ScaleDecorator } from "react-native-draggable-flatlist";
import { useGameState } from "../contexts/GameStateContext";
import GetCrstalIcon from "./GetCrystalIcon";

export default function SmallCard({ card, drag, isActive, isHide = false }) {
  const { setSelectedCard } = useGameState();

  const onPress = () => setSelectedCard(card);

  if (isHide) {
    return (
      <>
        <ScaleDecorator>
          <TouchableOpacity
            onPress={onPress}
            onLongPress={drag}
            disabled={isActive}
          >
            <View style={styles.Card}>
              <SemiBoldText
                size={9}
                style={{ marginTop: 2 }}
                color={Colors.logoGreen}
              >
                STOCK
              </SemiBoldText>
              <Image
                source={require("../../assets/images/withoutBgLogo2.png")}
                style={{
                  width: 50,
                  height: 30,
                  objectFit: "scale-down",
                }}
              />
              <SemiBoldText size={9} color={Colors.logoGreen}>
                BAZAR
              </SemiBoldText>
            </View>
          </TouchableOpacity>
        </ScaleDecorator>
      </>
    );
  }

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
                    size={22}
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
                    CIRCUIT{" "}
                  </BoldText>
                  {/* <SemiBoldText size={9}>CARD</SemiBoldText> */}
                </View>
                <Entypo
                  name="bar-graph"
                  style={isUp ? {} : { transform: [{ rotateY: "180deg" }] }}
                  size={22}
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
                  <SemiBoldText size={9} style={{ marginTop: 2 }}>
                    CRYSTAL
                  </SemiBoldText>
                  <SemiBoldText size={9}>CARD</SemiBoldText>
                </View>

                <GetCrstalIcon type={current_card} />
                <SemiBoldText size={9}>{current_card}</SemiBoldText>
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
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    borderRadius: 5,
    overflow: "hidden",
  },
});
