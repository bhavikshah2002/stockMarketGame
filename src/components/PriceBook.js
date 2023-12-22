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
    [40, 55, 30, 45, 55, 80, 120],
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
              style={{ textDecorationLine: "underline",textDecorationStyle:"dashed"}}
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
              <BoldText size={15} transform="uppercase" color={Colors.white}>
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
    height: "95%",
    width: "70%",
    backgroundColor: "black",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    gap:8,
    borderWidth:1,
    borderColor:Colors.dim,
  },
  TableConatiner: {
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
    textAlign: "center",
    fontWeight: "800",
    color:Colors.white
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
    borderColor:Colors.white,
    borderRadius:7
  },
});
