import { AntDesign } from "@expo/vector-icons";
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ItalicText, SemiBoldText } from "../common/Text";
import { Colors } from "../common/styles";
import { useState } from "react";
import CheckBox from "../common/CheckBox";

export default function GameSettingsModal({ modalVisible, setModalVisible }) {
  const [noOfRounds, setNoOfRounds] = useState(10);
  const [config, setConfig] = useState({
    includeCrystalCards: true,
    limitTransactionValue: false,
    initialCashInHand: 800000,
    totalStock: 200000,
    allowChairman: true,
    allowDirector: true,
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
            <TouchableOpacity
              onPress={() =>
                setConfig((p) => ({
                  ...p,
                  includeCrystalCards: !p.includeCrystalCards,
                }))
              }
            >
              <ItalicText>Include Crystal Cards</ItalicText>
            </TouchableOpacity>
          </View>

          <View style={styles.hr} />

          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <CheckBox
              value={config.limitTransactionValue}
              onChange={(val) =>
                setConfig((p) => ({ ...p, limitTransactionValue: val }))
              }
            />
            <TouchableOpacity
              onPress={() =>
                setConfig((p) => ({
                  ...p,
                  limitTransactionValue: !p.limitTransactionValue,
                }))
              }
            >
              <ItalicText>Limit Transaction Value</ItalicText>
            </TouchableOpacity>
          </View>

          <View style={styles.hr} />

          <View style={styles.inputBox}>
            <ItalicText style={{ width: 150 }}>No of rounds</ItalicText>
            <TouchableOpacity
              onPress={() => setNoOfRounds((p) => p - 1)}
              disabled={noOfRounds == 2}
            >
              <AntDesign name="minuscircle" size={15} color={Colors.dim} />
            </TouchableOpacity>
            <SemiBoldText align="center" width={40} size={15}>
              {noOfRounds}
            </SemiBoldText>
            <TouchableOpacity
              onPress={() => setNoOfRounds((p) => p + 1)}
              disabled={noOfRounds == 10}
            >
              <AntDesign name="pluscircle" size={15} color={Colors.dim} />
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
              disabled={config.initialCashInHand == 600000}
            >
              <AntDesign name="minuscircle" size={15} color={Colors.dim} />
            </TouchableOpacity>
            <SemiBoldText align="center" style={{ width: 40 }} size={15}>
              {config.initialCashInHand / 100000}L
            </SemiBoldText>
            <TouchableOpacity
              onPress={() =>
                setConfig((p) => ({
                  ...p,
                  initialCashInHand: p.initialCashInHand + 50000,
                }))
              }
              disabled={config.initialCashInHand == 1000000}
            >
              <AntDesign name="pluscircle" size={15} color={Colors.dim} />
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
              <AntDesign name="minuscircle" size={15} color={Colors.dim} />
            </TouchableOpacity>
            <SemiBoldText align="center" style={{ width: 40 }} size={15}>
              {config.totalStock / 1000}K
            </SemiBoldText>
            <TouchableOpacity
              onPress={() =>
                setConfig((p) => ({
                  ...p,
                  totalStock: p.totalStock + 25000,
                }))
              }
              disabled={config.totalStock == 250000}
            >
              <AntDesign name="pluscircle" size={15} color={Colors.dim} />
            </TouchableOpacity>
          </View>

          <View style={styles.hr} />

          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <CheckBox
              value={config.allowChairman}
              onChange={(val) =>
                setConfig((p) => ({ ...p, allowChairman: val }))
              }
            />
            <TouchableOpacity
              onPress={() =>
                setConfig((p) => ({
                  ...p,
                  allowChairman: !p.allowChairman,
                }))
              }
            >
              <ItalicText>Allow Chairman</ItalicText>
            </TouchableOpacity>
          </View>

          <View style={styles.hr} />

          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <CheckBox
              value={config.allowDirector}
              onChange={(val) =>
                setConfig((p) => ({ ...p, allowDirector: val }))
              }
            />
            <TouchableOpacity
              onPress={() =>
                setConfig((p) => ({
                  ...p,
                  allowDirector: !p.allowDirector,
                }))
              }
            >
              <ItalicText>Allow Director</ItalicText>
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
    backgroundColor: Colors.black,
    marginVertical: 20,
    padding: 15,
    paddingHorizontal: 20,
    width: "60%",
    borderRadius: 4,
    shadowColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 24,
  },

  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  hr: {
    height: 1.5,
    backgroundColor: Colors.dim + "33",
    width: "100%",
    borderRadius: 100,
    marginVertical: 10,
  },
});
