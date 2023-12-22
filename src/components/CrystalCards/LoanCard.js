import { View } from "@bacons/react-views";
import { BoldText } from "../../common/Text";
import CrystalContent from "../CrystalContent";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { Colors } from "../../common/styles";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import ModalForCard from "./ModalForCard";

export default function LoanCard({ card }) {
  const [modalVisible, setModalVisible] = useState(false);
  function getMoneyInAccount() {}
  if (modalVisible) {
    return (
      <View style={styles.container}>
        <ModalForCard
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          operatingFunction={getMoneyInAccount}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View>
          <View style={styles.heading}>
            <BoldText>{card.crystalType.split("_").join("  ")}</BoldText>
          </View>
        </View>
        <CrystalContent type={card.crystalType} />
      </View>
      <View style={styles.right}>
        <TouchableOpacity
          style={{ ...styles.Btn, backgroundColor: Colors.white }}
          onPress={() => setModalVisible(true)}
        >
          <BoldText size={15} transform="uppercase" color="black">
            Collect
          </BoldText>
          <FontAwesome5 name="piggy-bank" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    backgroundColor: "#141414",
    gap: 6,
    marginVertical: 10,
    borderRadius: 6,
    overflow: "hidden",
    borderColor: Colors.green + "22",
    borderWidth: 2,
    position: "relative",
  },

  left: {
    width: 150,
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
  right: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Btn: {
    flexDirection: "row",
    height: 40,
    width: 150,
    borderRadius: 40,
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});