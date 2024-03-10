import { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AntDesign,
  FontAwesome,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Colors } from "../common/styles";
import { LightText, SemiBoldText } from "../common/Text";
import { useGameState } from "../contexts/GameStateContext";

export default function CustomConfigModal() {
  const [modalVisible, setModalVisible] = useState(false);
  const { gameState } = useGameState();
  const config = gameState?.configs;

  if (!config) return null;

  return (
    <View>
      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        transparent
        statusBarTranslucent={true}
      >
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.header}>
              <SemiBoldText size={25} align="center">
                CUSTOM RULES
              </SemiBoldText>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{ paddingBottom: 10, marginRight: -5 }}
              >
                <AntDesign name="closecircle" size={28} color={Colors.white} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.mainContent}>
              <View style={styles.section}>
                <FontAwesome
                  style={styles.icon}
                  name="rupee"
                  size={30}
                  color={"orange"}
                />

                <View>
                  <SemiBoldText>Initial Cash in Hand</SemiBoldText>
                  <LightText color={Colors.dim} size={11}>
                    Every user has an initial amount of ₹
                    {config.initialCashInHand / 100000 || 8} Lakhs when the game
                    begins
                  </LightText>
                </View>
              </View>

              <View style={styles.section}>
                <AntDesign
                  style={styles.icon}
                  name="shoppingcart"
                  size={34}
                  color={Colors.purple}
                />

                <View>
                  <SemiBoldText>Maximum stocks</SemiBoldText>
                  <LightText color={Colors.dim} size={11}>
                    Every company has a total of{" "}
                    {config.totalStock / 1000 || 200}K stocks for users to trade
                    with
                  </LightText>
                </View>
              </View>

              {config.allowChairman && (
                <View style={styles.section}>
                  <MaterialCommunityIcons
                    name="chair-rolling"
                    size={35}
                    color={Colors.info}
                    style={styles.icon}
                  />

                  <View>
                    <SemiBoldText>Allow chairman</SemiBoldText>
                    <LightText color={Colors.dim} size={11}>
                      Chairman can remove 1 card from any player's card stack
                    </LightText>
                  </View>
                </View>
              )}

              {config.allowDirector && (
                <View style={styles.section}>
                  <Fontisto
                    style={styles.icon}
                    name="person"
                    size={30}
                    color={Colors.darkGreen}
                  />

                  <View>
                    <SemiBoldText>Allow Director</SemiBoldText>
                    <LightText color={Colors.dim} size={11}>
                      Director can remove 1 card from his card stack
                    </LightText>
                  </View>
                </View>
              )}

              {config.limitTransactionValue && (
                <View style={styles.section}>
                  <MaterialCommunityIcons
                    style={styles.icon}
                    name="bank-transfer"
                    size={40}
                    color={Colors.red}
                  />

                  <View>
                    <SemiBoldText>Limit Transaction</SemiBoldText>
                    <LightText color={Colors.dim} size={11}>
                      User can only purchase a maximum 1L stocks in a round
                    </LightText>
                  </View>
                </View>
              )}

              {!config.excludeCrystalCards && (
                <View style={styles.section}>
                  <MaterialCommunityIcons
                    style={styles.icon}
                    name="diamond-stone"
                    size={30}
                    color={Colors.green}
                  />

                  <View>
                    <SemiBoldText>Include Crsytal Cards</SemiBoldText>
                    <LightText color={Colors.dim} size={11}>
                      Special power cards which make game interesting!
                    </LightText>
                  </View>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={{}} onPress={() => setModalVisible(true)}>
        <View style={styles.buttonView}>
          <FontAwesome name="magic" size={14} color={Colors.black} />
          <SemiBoldText
            color={Colors.black}
            style={{ paddingTop: 2 }}
            size={12}
          >
            CUSTOM RULES
          </SemiBoldText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.black + "aa",
  },

  innerContainer: {
    height: "80%",
    width: "60%",
    backgroundColor: Colors.black,
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

  buttonView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.white + "bb",
    borderRadius: 50,
    paddingHorizontal: 10,
    padding:3
  },

  header: {
    top: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    marginHorizontal: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 2,
    borderBottomColor: Colors.dim,
  },
  mainContent: {
    width: "100%",
    paddingHorizontal: 15,
  },
  section: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingVertical: 8,
    borderBottomColor: Colors.dim + 44,
    borderBottomWidth: 1,
  },

  icon: {
    width: 50,
    textAlign: "center",
  },
});
