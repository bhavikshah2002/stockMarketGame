import { AntDesign } from "@expo/vector-icons";
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { BoldText, ItalicText, SemiBoldText } from "../common/Text";
import { Colors } from "../common/styles";
import { useState } from "react";
import CheckBox from "../common/CheckBox";

export default function GameSettingsModal({ modalVisible, setModalVisible }) {
  const [noOfRounds, setNoOfRounds] = useState(10);
  const [config, setConfig] = useState({
    includeCrystalCards: true,
    initialCashInHand: 800000,
    totalStock: 200000,
  });

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
      statusBarTranslucent={true}
    >
      <View style={styles.container}>
        <ScrollView style={styles.innerBox}>
          <SemiBoldText align="center" size={25} style={{ marginBottom: 10 }}>
            Game Settings
          </SemiBoldText>

          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeBtn}
          >
            <AntDesign name="closecircle" size={28} color={Colors.dim} />
          </TouchableOpacity>

          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <CheckBox
              value={config.includeCrystalCards}
              onChange={(val) =>
                setConfig((p) => ({ ...p, includeCrystalCards: val }))
              }
            />
            <ItalicText>Include Crystal Cards</ItalicText>
          </View>

          <View style={styles.hr} />

          <View style={styles.inputBox}>
            <ItalicText style={{ width: 150 }}>No of rounds</ItalicText>
            <TouchableOpacity
              onPress={() => setNoOfRounds((p) => p - 1)}
              disabled={noOfRounds == 2}
            >
              <AntDesign name="minuscircle" size={15} color="white" />
            </TouchableOpacity>
            <BoldText align="center" width={40} size={15}>
              {noOfRounds}
            </BoldText>
            <TouchableOpacity
              onPress={() => setNoOfRounds((p) => p + 1)}
              disabled={noOfRounds == 10}
            >
              <AntDesign name="pluscircle" size={15} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.hr} />

          <View style={styles.inputBox}>
            <ItalicText style={{ width: 150 }}>Initial Cash</ItalicText>
            <TouchableOpacity
              onPress={() =>
                setConfig((p) => ({
                  ...p,
                  initialCashInHand: p.initialCashInHand - 50000,
                }))
              }
              disabled={config.initialCashInHand == 700000}
            >
              <AntDesign name="minuscircle" size={15} color="white" />
            </TouchableOpacity>
            <BoldText align="center" style={{ width: 40 }} size={15}>
              {config.initialCashInHand / 100000}L
            </BoldText>
            <TouchableOpacity
              onPress={() =>
                setConfig((p) => ({
                  ...p,
                  initialCashInHand: p.initialCashInHand + 50000,
                }))
              }
              disabled={config.initialCashInHand == 900000}
            >
              <AntDesign name="pluscircle" size={15} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.hr} />

          <View style={styles.inputBox}>
            <ItalicText style={{ width: 150 }}>Stocks per Company</ItalicText>
            <TouchableOpacity
              onPress={() =>
                setConfig((p) => ({
                  ...p,
                  totalStock: p.totalStock - 25000,
                }))
              }
              disabled={config.totalStock == 150000}
            >
              <AntDesign name="minuscircle" size={15} color="white" />
            </TouchableOpacity>
            <BoldText align="center" style={{ width: 40 }} size={15}>
              {config.totalStock / 1000}K
            </BoldText>
            <TouchableOpacity
              onPress={() =>
                setConfig((p) => ({
                  ...p,
                  totalStock: p.totalStock + 25000,
                }))
              }
              disabled={config.totalStock == 250000}
            >
              <AntDesign name="pluscircle" size={15} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.hr} />
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#00000044",
  },

  innerBox: {
    position: "relative",
    backgroundColor: Colors.black,
    marginVertical: 20,
    padding: 15,
    paddingHorizontal: 20,
    width: "60%",
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

  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  hr: {
    height: 1.5,
    backgroundColor: Colors.dim + "44",
    width: "100%",
    borderRadius: 100,
    marginVertical: 10,
  },
});
