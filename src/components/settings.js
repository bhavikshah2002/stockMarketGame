import { Modal, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { BoldText, LightText, SemiBoldText } from "../common/Text";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../common/styles";
import { Image } from "expo-image";
import { useGameState } from "../contexts/GameStateContext";
import { FontAwesome5 } from "@expo/vector-icons";
import RulesModal from "./RulesModal/RulesModal";
import CustomConfigModal from "./CustomConfigModal";

export default function Settings() {
  const { gameId, gameState, myUserId, conn, leave } = useGameState();
  const [modalVisible, setModalVisible] = useState(false);
  const onPass = () => {
    conn.current?.emit("pass", {
      userId: gameState.playerOrder[gameState.currentTurn],
    });
    setModalVisible(!modalVisible);
  };
  const onResults = () => {
    conn.current?.emit("endGame", {});
  };

  return (
    <>
      <View>
        <Modal
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          statusBarTranslucent={true}
        >
          <View style={styles.Container}>
            <View>
              <BoldText size={40}>Settings</BoldText>
            </View>

            <View style={styles.MiddleContainer}>
              <View style={styles.ButtonsContainer}>
                <TouchableOpacity
                  style={[styles.Btn, { backgroundColor: Colors.green }]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <BoldText size={23} transform="uppercase">
                    Resume
                  </BoldText>
                  <AntDesign name="play" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.Btn, { backgroundColor: Colors.red }]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    leave();
                  }}
                >
                  <BoldText size={23} transform="uppercase">
                    Leave
                  </BoldText>
                  <MaterialIcons name="exit-to-app" size={30} color="white" />
                </TouchableOpacity>
              </View>

              {/* Admin panel */}
              {myUserId == gameState.adminId && (
                <View
                  style={{
                    width: "50%",
                    paddingHorizontal: 10,
                  }}
                >
                  <SemiBoldText
                    style={{
                      alignSelf: "center",
                      textDecorationLine: "underline",
                    }}
                    size={18}
                  >
                    Admin Panel
                  </SemiBoldText>

                  <View style={styles.AdminPanel}>
                    <View style={styles.AdminWork}>
                      <View style={styles.AdminPass}>
                        <SemiBoldText size={15} style={{ marginTop: 3 }}>
                          Pass{" "}
                          {
                            gameState.userState[
                              gameState.playerOrder[gameState.currentTurn]
                            ]?.username
                          }
                          {"'s "}turn
                        </SemiBoldText>
                        <SemiBoldText size={15} style={{ marginTop: 3 }}>
                          Calculate Results
                        </SemiBoldText>
                      </View>
                      <View style={styles.AdminPass}>
                        <TouchableOpacity
                          style={[
                            styles.btnAdmin,
                            { backgroundColor: Colors.info },
                          ]}
                          onPress={onPass}
                        >
                          <LightText size={15}>PASS</LightText>
                          <FontAwesome5
                            name="hand-peace"
                            size={16}
                            color={Colors.white}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.btnAdmin,
                            { backgroundColor: Colors.darkGreen },
                          ]}
                          onPress={onResults}
                        >
                          <LightText size={15}>RESULTS</LightText>
                          <AntDesign
                            name="calculator"
                            size={18}
                            color={Colors.white}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>

            <View style={{ flexDirection: "row", gap: 16, marginTop: 6 }}>
              <RulesModal />
              <CustomConfigModal />
            </View>

            <View style={styles.BottomBar}>
              <View style={styles.logoView}>
                <SemiBoldText size={18} color={Colors.logoGreen}>
                  Stock Bazar
                </SemiBoldText>
                <Image
                  style={styles.logo}
                  source={require("../../assets/images/withoutBgLogo2.png")}
                  contentFit="contain"
                />
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  gap: -5,
                }}
              >
                <SemiBoldText color={Colors.dim} size={13}>
                  Created with ❤️
                </SemiBoldText>
                <SemiBoldText>
                  Bhavik Shah, Arun Mulakkal, Arpit Shah
                </SemiBoldText>
              </View>

              <View style={{ flexDirection: "row", gap: 5 }}>
                <BoldText size={15} color={Colors.info}>
                  ROOM ID :
                </BoldText>
                <BoldText size={15}>{gameId}</BoldText>
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.SettingButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="settings" size={28} color="#e1e3e2" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  Container: {
    top: 0,
    flex: 1,
    backgroundColor: "#262525",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 6,
  },
  SettingButton: {
    marginLeft: 20,
  },

  topBar: {
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
  },

  Btn: {
    height: 65,
    width: 190,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderRadius: 40,
  },
  ButtonsContainer: {
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  MiddleContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  BottomBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  logo: {
    width: 40,
    height: 40,
  },
  AdminPanel: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginRight: 25,
    borderLeftColor: Colors.dim,
    borderLeftWidth: 2,
  },
  AdminWork: {
    marginTop: 10,
    flexDirection: "row",
    gap: 25,
  },
  AdminPass: {
    gap: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  logoView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
  },
  btnAdmin: {
    width: 100,
    paddingTop: 5,
    paddingBottom: 3,
    borderRadius: 5,
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
  },
});
