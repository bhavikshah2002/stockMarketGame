import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BoldText,
  CustomText,
  ItalicText,
  LightText,
  RegularText,
} from "../common/Text";
import { Colors } from "../common/styles";
import { useGameState } from "../contexts/GameStateContext";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSharedValue } from "react-native-reanimated";
import MySlider from "./Slider";
import { useEffect, useState } from "react";

export default function CompanyEntity() {
  const { selectedEntity: company, gameState, conn, myUserId } = useGameState();
  if (!company) {
    return (
      <View
        style={[
          styles.container,
          { flexDirection: "column", justifyContent: "center", gap: 15 },
        ]}
      >
        <Image
          style={styles.logoMain}
          source={require("../../assets/images/withoutBgLogo1.png")}
          contentFit="contain"
        />
        <RegularText size={13} color={Colors.dim} align="center">
          Please select a company to proceed a transaction!
        </RegularText>
      </View>
    );
  }
  const [maxStocksPossibleToBuy, setMaxStocksPossibleToBuy] = useState(
    gameState.companyValues[company.id].companyShareValue
      ? Math.min(
          Math.floor(
            gameState.userState[myUserId].cashInHand /
              gameState.companyValues[company.id].companyShareValue /
              1000
          ),
          gameState.companyValues[company.id].stocksAvailable
        )
      : 0
  );
  const [maxStocksPossibleToSell, setMaxStocksPossibleToSell] = useState(
    gameState.companyValues[company.id].companyShareValue
      ? Math.floor(gameState.userState[myUserId].holdings[company.id] / 1000)
      : 0
  );
  const isProfit = true;

  useEffect(() => {
    setMaxStocksPossibleToBuy(
      gameState.companyValues[company.id].companyShareValue
        ? Math.min(
            Math.floor(
              gameState.userState[myUserId].cashInHand /
                gameState.companyValues[company.id].companyShareValue /
                1000
            ),
            gameState.companyValues[company.id].stocksAvailable
          )
        : 0
    );
    setMaxStocksPossibleToSell(
      gameState.companyValues[company.id].companyShareValue
        ? Math.floor(gameState.userState[myUserId].holdings[company.id] / 1000)
        : 0
    );
  }, [company]);

  const buyNoOfStocks = useSharedValue(0);
  const sellNoOfStocks = useSharedValue(0);

  const onBuy = () => {
    conn.current?.emit("buy", {
      userId: myUserId,
      companyId: company.id,
      numberOfStocks: Math.floor(buyNoOfStocks.value) * 1000,
    });
  };

  const onSell = () => {
    conn.current?.emit("sell", {
      userId: myUserId,
      companyId: company.id,
      numberOfStocks: Math.floor(sellNoOfStocks.value) * 1000,
    });
  };
  if (gameState.companyValues[company.id].companyShareValue == 0) {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Image source={company.photoUrl} style={styles.logo} />
          <View style={{ width: "45%" }}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <BoldText size={21} style={{ letterSpacing: 1 }}>
                {company.name}
              </BoldText>
            </View>
            <ItalicText color={Colors.dim}>
              Current Value{" "}
              <CustomText color={Colors.dim} family="BoldItalic">
                ₹{gameState.companyValues[company.id].companyShareValue}
              </CustomText>
            </ItalicText>
          </View>
        </View>
        <View style={styles.bottom2}>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="close-box"
              size={40}
              color={Colors.red}
            />
            <BoldText size={22} style={{paddingTop:3}}>Company Bankrupt!</BoldText>
          </View>
          <View>
            <RegularText color={Colors.dim} style={{paddingHorizontal:20}}>
              Since company share value is zero, No transaction can be made! Wait for the Company share value to rise again.
            </RegularText>
          </View>
        </View>
      </View>
    );
  }
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
              ₹{gameState.companyValues[company.id].companyShareValue}
            </CustomText>
          </ItalicText>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.sliderBox}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: Colors.green }]}
            onPress={onBuy}
          >
            <LightText size={18}>BUY</LightText>
          </TouchableOpacity>
          <MySlider
            key={
              company.name +
              `${maxStocksPossibleToBuy}` +
              `${maxStocksPossibleToSell}`
            }
            value={buyNoOfStocks}
            max={maxStocksPossibleToBuy}
            min={0}
          />
        </View>
        <View style={styles.sliderBox}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: Colors.red }]}
            onPress={onSell}
          >
            <LightText size={18}>SELL</LightText>
          </TouchableOpacity>
          <MySlider
            key={
              company.name +
              `${maxStocksPossibleToBuy}` +
              `${maxStocksPossibleToSell}`
            }
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
    width: "30%",
    height: 60,
    objectFit: "cover",
  },

  top: {
    width: "100%",
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
  },

  bottom: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    flex: 1,
  },
  bottom2: {
    width: "100%",
    alignItems: "center",
    paddingTop:10,
    gap:5,
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
    backgroundColor: Colors.green + "88",
    marginRight: 6,
    alignSelf: "flex-end",
    borderTopLeftRadius: 1.5,
    borderTopRightRadius: 1.5,
  },
  logoMain: {
    width: 100,
    height: 80,
  },
});
