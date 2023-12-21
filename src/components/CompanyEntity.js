import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { BoldText, CustomText, ItalicText, LightText } from "../common/Text";
import { Colors } from "../common/styles";
import { useGameState } from "../contexts/GameStateContext";
import { AntDesign } from "@expo/vector-icons";
import { useSharedValue } from "react-native-reanimated";
import MySlider from "./Slider";

export default function CompanyEntity() {
  const { selectedEntity: company, gameState } = useGameState();
  const thisUserId = 0;
  const isProfit = true;
  const maxStocksPossibleToSell = Math.floor(
    gameState.userState[thisUserId].holdings[company.id] / 1000
  );
  const maxStocksPossibleToBuy = Math.floor(
    gameState.userState[thisUserId].cashInHand /
      gameState.companyValues[company.id] /
      1000
  );
  const buyNoOfStocks = useSharedValue(Math.floor(maxStocksPossibleToBuy / 2));
  const sellNoOfStocks = useSharedValue(
    Math.floor(maxStocksPossibleToSell / 2)
  );

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image source={company.photoUrl} style={styles.logo} />
        <View style={{ width: "45%" }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <BoldText size={21} style={{ letterSpacing: 1 }}>
              {company.name}
            </BoldText>
            <AntDesign
              name={isProfit ? "caretup" : "caretdown"}
              size={34}
              color={isProfit ? Colors.green : Colors.red}
            />
          </View>
          <ItalicText color={Colors.dim}>
            Current Value{" "}
            <CustomText color={Colors.dim} family="BoldItalic">
              ₹{gameState.companyValues[company.id]}
            </CustomText>
          </ItalicText>
        </View>

        <FlatList
          horizontal
          style={{
            // backgroundColor: "#23d99721",
            marginRight: 10,
            padding: 5,
            paddingRight: 10,
          }}
          renderItem={({ item }) => (
            <View style={[styles.graphBar, { height: item / 2 }]} />
          )}
          data={gameState.history[company.id]}
          keyExtractor={(_, i) => i}
        />
      </View>
      <View style={styles.bottom}>
        <View style={styles.sliderBox}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: Colors.green }]}
          >
            <LightText size={18}>BUY</LightText>
          </TouchableOpacity>
          <MySlider
            value={buyNoOfStocks}
            max={maxStocksPossibleToBuy}
            min={0}
          />
        </View>
        <View style={styles.sliderBox}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: Colors.red }]}
          >
            <LightText size={18}>SELL</LightText>
          </TouchableOpacity>
          <MySlider
            value={sellNoOfStocks}
            max={maxStocksPossibleToSell}
            min={0}
          />
        </View>
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
    width: "25%",
    height: 60,
    objectFit: "cover",
  },

  top: {
    width: "100%",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },

  bottom: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    flex: 1,
  },

  sliderBox: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  btn: {
    paddingHorizontal: 15,
    paddingTop: 2,
    borderRadius: 2,
    marginRight: 10,
  },

  heading: {
    backgroundColor: Colors.info,
    paddingTop: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },

  graphBar: {
    width: 3,
    backgroundColor: Colors.green+'88',
    marginRight: 6,
    alignSelf: "flex-end",
    borderTopLeftRadius: 1.5,
    borderTopRightRadius: 1.5,
  },
});
