import { TouchableOpacity, View } from "react-native";
import { Modal } from "react-native";
import { StyleSheet } from "react-native";
import { SemiBoldText } from "../common/Text";
import { Colors } from "../common/styles";
import { Row, Rows, Table } from "react-native-table-component";
import { AntDesign } from "@expo/vector-icons";
import { useMemo } from "react";
import { useGameState } from "../contexts/GameStateContext";
import { Companies } from "../data/cards";

export default function PriceBook({ priceBookVisible, setPriceBookVisible }) {
  const { gameState } = useGameState();
  const header = [
    "Tata",
    "ONGC",
    "Reliance",
    "Infosys",
    "SBI",
    "Adani",
    "Nifty",
  ];
  const priceBook = [
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
  ];

  const data = useMemo(() => {
    if (gameState["currentMegaRound"] > 10) return priceBook;
    for (let j = 0; j < gameState.currentMegaRound; j++) {
      for (let i = 0; i < 7; i++) {
        priceBook[j][i] = gameState.priceBook[i + 1].at(j);
      }
    }
    return priceBook;
  }, [gameState]);

  const stockAvailableRow = Companies.map(
    (com) =>
      Math.floor(gameState.companyValues[com.id].stocksAvailable / 1000) + "K"
  );

  return (
    <Modal
      animationType="slide"
      visible={priceBookVisible}
      transparent
      onRequestClose={() => {
        setPriceBookVisible(!priceBookVisible);
      }}
      statusBarTranslucent={true}
    >
      <View style={styles.Container}>
        <View style={styles.InnerConatiner}>
          <View style={styles.TopContainer}>
            <View></View>
            <SemiBoldText
              size={25}
              style={{
                textDecorationLine: "underline",
              }}
            >
              Price Book
            </SemiBoldText>
            <TouchableOpacity
              onPress={() => setPriceBookVisible(false)}
              style={styles.Btn}
            >
              <AntDesign name="closecircle" size={28} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.TableConatiner}>
            <Table borderStyle={{ borderWidth: 0.2, borderColor: "white" }}>
              <Row
                data={header}
                style={styles.head}
                textStyle={styles.textHeading}
              />
              <Row
                data={stockAvailableRow}
                style={styles.row}
                textStyle={styles.stockAvailableText}
              />
              <Rows
                data={data}
                style={styles.row}
                textStyle={styles.textContent}
              />
            </Table>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  InnerConatiner: {
    height: "95%",
    width: "70%",
    backgroundColor: "black",
    position: "absolute",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.dim,
    borderRadius: 4,
    shadowColor: Colors.dim,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 21,
  },
  TopContainer: {
    top: 15,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  TableConatiner: {
    marginTop: 12,
    width: 450,
  },
  head: {
    height: 30,
    backgroundColor: "#262525",
  },
  row: {
    height: 20,
  },
  textHeading: {
    marginTop: 2,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    color: Colors.white,
  },
  textContent: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    color: Colors.white,
  },
  stockAvailableText: {
    fontFamily: "Poppins-Italic",
    textAlign: "center",
    color: Colors.dim,
    fontSize: 10,
  },
});
