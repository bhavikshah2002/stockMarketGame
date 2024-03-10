import { Modal, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { BoldText, LightText, SemiBoldText } from "../common/Text";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../common/styles";
import { Image } from "expo-image";
import { useGameState } from "../contexts/GameStateContext";
import { FontAwesome5 } from "@expo/vector-icons";
import ConfigPanel from "./ConfigPanel";

export default function Settings() {
  const { gameId, gameState, myUserId, conn, leave } = useGameState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPanel, setSelectedPanel] = useState("admin");
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
            <View style={{ marginTop: 20 }}>
              <BoldText size={40} style={{}}>
                Settings
              </BoldText>
            </View>

            <View style={styles.MiddleContainer}>
              <View style={styles.ButtonsContainer}>
                <TouchableOpacity
                  style={{ ...styles.Btn, backgroundColor: Colors.green }}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <BoldText size={25} transform="uppercase">
                    Resume
                  </BoldText>
                  <AntDesign name="play" size={35} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.Btn, backgroundColor: Colors.red }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    leave();
                  }}
                >
                  <BoldText size={25} transform="uppercase">
                    Leave
                  </BoldText>
                  <MaterialCommunityIcons
                    name="exit-run"
                    size={35}
                    color="white"
                  />
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
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={[
                        styles.tab,
                        selectedPanel == "admin" && styles.tabSelected,
                      ]}
                      onPress={() => setSelectedPanel("admin")}
                    >
                      <LightText>Admin Panel</LightText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.tab,
                        selectedPanel == "config" && styles.tabSelected,
                      ]}
                      onPress={() => setSelectedPanel("config")}
                    >
                      <LightText>Config</LightText>
                    </TouchableOpacity>
                  </View>
                  {selectedPanel == "admin" && (
                    <View style={styles.AdminPanel}>
                      <View style={styles.AdminWork}>
                        <View style={styles.AdminPass}>
                          <SemiBoldText size={15} style={{ marginTop: 3 }}>
                            Pass{" "}
                            {
                              gameState.userState[
                                gameState.playerOrder[gameState.currentTurn]
                              ].username
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
                  )}

                  {selectedPanel == "config" && (
                    <View style={styles.AdminPanel}>
                      <ConfigPanel />
                    </View>
                  )}
                </View>
              )}
            </View>

            <View style={{ paddingTop: 20, flexDirection: "row", gap: 5 }}>
              <BoldText size={15} color={Colors.info}>
                ROOM ID :
              </BoldText>
              <BoldText size={15}>{gameId}</BoldText>
            </View>
            <View style={styles.BottomBar}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 15,
                  width: 150,
                }}
              >
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  marginRight: 15,
                  width: 150,
                }}
              >
                <SemiBoldText color={Colors.info}>Copyright</SemiBoldText>
                <AntDesign name="copyright" size={24} color={Colors.info} />
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
  },
  SettingButton: {
    marginLeft: 20,
  },

  Btn: {
    flexDirection: "row",
    borderRadius: 5,
    height: 70,
    width: 200,
    borderRadius: 40,
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonsContainer: {
    gap: 25,
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
  },
  logo: {
    width: 40,
    height: 40,
  },
  AdminPanel: {
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    height: 130,
    gap: 10,
    marginRight: 25,
    borderRadius: 4,
    borderTopStartRadius: 0,
  },
  AdminWork: {
    flexDirection: "row",
    gap: 20,
  },
  AdminPass: {
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
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

  tab: {
    padding: 4,
    paddingHorizontal: 8,
    borderTopStartRadius: 4,
    borderTopEndRadius: 4,
  },

  tabSelected: {
    backgroundColor: "#111111",
  },
});
