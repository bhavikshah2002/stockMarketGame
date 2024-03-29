import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { BoldText, RegularText, SemiBoldText } from "../common/Text";
import { Colors } from "../common/styles";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";

function LobbyModal({
  modalVisible,
  setModalVisible,
  handleLeave,
  setModalRulesVisible,
  setConfig,
}) {
  let shuffledStartingCash = [600000,650000,700000,750000,800000,850000,900000,950000,1000000]
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

  let shuffledStocksLimit = [150000,175000,200000,225000,250000]
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
  return (
    <>
      <View>
        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          statusBarTranslucent={true}
        >
          <View style={styles.container}>
            <View style={styles.leaveButton}>
              <TouchableOpacity onPress={handleLeave}>
                <Ionicons
                  name="arrow-back-circle-sharp"
                  size={50}
                  color={Colors.dim}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.mainBox}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false),
                    setConfig((p) => ({
                      ...p,
                      excludeCrystalCards: false,
                      limitTransactionValue: false,
                      initialCashInHand: 800000,
                      totalStock: 200000,
                      allowChairman: true,
                      allowDirector: true,
                    }));
                }}
              >
                <View style={styles.customDiv}>
                  <View style={styles.InsideBox}>
                    <View style={styles.iconsBox}>
                      {/* <Foundation name="graph-trend" size={60} color="black" /> */}
                      <FontAwesome name="handshake-o" size={45} color="black" />
                    </View>
                    <View style={styles.textBox}>
                      <BoldText size={30} color={Colors.black}>
                        Default
                      </BoldText>
                      <RegularText
                        size={14}
                        color={Colors.black}
                        style={{ justifyContent: "center" }}
                      >
                        Play the Classic Stock Bazar game with default rules!
                      </RegularText>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setModalRulesVisible(true);
                  setModalVisible(false);
                }}
              >
                <View style={styles.customDiv}>
                  <View style={styles.InsideBox}>
                    <View style={styles.iconsBox}>
                      <Ionicons name="options" size={50} color="black" />
                    </View>
                    <View style={styles.textBox}>
                      <BoldText size={30} color={Colors.black}>
                        Custom
                      </BoldText>
                      <RegularText
                        size={14}
                        color={Colors.black}
                        style={{ justifyContent: "center" }}
                      >
                        Select the rules you like and enjoy the customized game!
                      </RegularText>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false),
                    setConfig((p) => ({
                      ...p,
                      excludeCrystalCards: Math.random() < 0.5,
                      limitTransactionValue: Math.random() < 0.5,
                      initialCashInHand: shuffledStartingCash[0],
                      totalStock: shuffledStocksLimit[0],
                      allowChairman: Math.random() < 0.5,
                      allowDirector: Math.random() < 0.5,
                    }));
                }}
              >
                <View style={styles.customDiv}>
                  <View style={styles.InsideBox}>
                    <View style={styles.iconsBox}>
                      <FontAwesome name="magic" size={40} color="black" />
                    </View>
                    <View style={styles.textBox}>
                      <BoldText size={30} color={Colors.black}>
                        Random
                      </BoldText>
                      <RegularText
                        size={14}
                        color={Colors.black}
                        style={{ justifyContent: "center" }}
                      >
                        Explore the different combinations of game play!
                      </RegularText>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  leaveButton: {
    marginTop: 20,
    paddingLeft: 10,
  },
  mainBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    gap: 50,
  },
  customDiv: {
    height: 250,
    width: 175,
    backgroundColor: Colors.darkGreen,
    borderTopStartRadius: 40,
    borderBottomEndRadius: 40,
  },
  InsideBox: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  iconsBox: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  textBox: {
    flex: 1,
    marginTop: -20,
    alignItems: "center",
  },
});

export default LobbyModal;
