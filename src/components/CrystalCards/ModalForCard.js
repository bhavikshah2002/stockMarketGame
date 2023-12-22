import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { BoldText, RegularText } from "../../common/Text";
import { Colors } from "../../common/styles";

export default function ModalForCard({
  modalVisible,
  setModalVisible,
  transactionInfo = (
    <RegularText
      color={Colors.dim}
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      You want to continue with this tracsaction
    </RegularText>
  ),
  operatingFunction,
}) {
  if (!modalVisible) return null;

  return (
    <View style={styles.Container}>
      <View style={styles.modalView}>
        <BoldText size={30} style={{ marginTop: 10 }}>
          ARE YOU SURE ?
        </BoldText>
        <View style={styles.TransactionInfo}>{transactionInfo}</View>
        <View style={styles.ButtonConatiner}>
          <TouchableOpacity
            onPress={() => {
              operatingFunction();
              setModalVisible(!modalVisible);
            }}
            style={{ ...styles.Btn, backgroundColor: Colors.logoGreen }}
          >
            <BoldText size={15} transform="uppercase">
              Yes
            </BoldText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={{ ...styles.Btn, backgroundColor: Colors.red }}
          >
            <BoldText size={15} transform="uppercase">
              No
            </BoldText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  TransactionInfo: {
    width: 200,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonConatiner: {
    marginBottom: 15,
    flexDirection: "row",
    gap: 20,
  },
  Btn: {
    flexDirection: "row",
    borderRadius: 5,
    height: 40,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
  },
});
