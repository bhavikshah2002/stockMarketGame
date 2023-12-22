import { TouchableOpacity, View } from "react-native";
import { Modal } from "react-native";
import { StyleSheet } from "react-native";
import { BoldText, RegularText, SemiBoldText } from "../common/Text";
import { Colors } from "../common/styles";
import {
  Col,
  Row,
  Rows,
  Table,
  TableWrapper,
} from "react-native-table-component";

export default function PriceBook({ priceBookVisible, setPriceBookVisible }) {
  const header = [
    "Tata",
    "ONGC",
    "Reliance",
    "Infosys",
    "SBI",
    "Adani",
    "Nifty",
  ];

  const data = [
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
  return (
    <Modal
      animationType="slide"
      visible={priceBookVisible}
      transparent
      onRequestClose={() => {
        setPriceBookVisible(!priceBookVisible);
      }}
    >
      <View style={styles.Container}>
        <View style={styles.InnerConatiner}>
          <View>
            <RegularText
              size={25}
              style={{ textDecorationLine: "underline"}}
            >
              Price Book
            </RegularText>
          </View>
          <View style={styles.TableConatiner}>
            <Table borderStyle={{ borderWidth: 0.2 ,borderColor:"white"}}>
              <Row
                data={header}
                style={styles.head}
                textStyle={styles.textHeading}
              />
              <Rows
                data={data}
                style={styles.row}
                textStyle={styles.textContent}
              />
            </Table>
          </View>
          <View>
            <TouchableOpacity
              style={styles.Btn}
              onPress={() => setPriceBookVisible(!priceBookVisible)}
            >
              <BoldText size={15} transform="uppercase" color={Colors.dim}>
                Close
              </BoldText>
            </TouchableOpacity>
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
    height: "100%",
    width: "70%",
    backgroundColor: "#262525",
    position: "absolute",
    right: 0,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  TableConatiner: {
    width: 450,
  },
  head: {
    height: 30,
    backgroundColor: Colors.dim,
  },
  row: {
    height: 20,
  },
  textHeading: {
    textAlign: "center",
    fontWeight: "800",
  },
  textContent: {
    textAlign: "center",
    color: Colors.white,
  },
  Btn: {
    height: 40,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth:3,
    borderColor:Colors.dim,
    borderRadius:7
  },
});
