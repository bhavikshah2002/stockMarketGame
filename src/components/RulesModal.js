import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "../common/styles";
import { BoldText, RegularText, SemiBoldText } from "../common/Text";

function RulesModal() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
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
                <View style={{ paddingLeft: 20 }}></View>
                <SemiBoldText
                  size={25}
                  style={{
                    textDecorationLine: "underline",
                  }}
                >
                  GAME RULES
                </SemiBoldText>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={{ paddingBottom: 10, marginRight: -5 }}
                >
                  <AntDesign
                    name="closecircle"
                    size={28}
                    color={Colors.white}
                  />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.mainContent}>
                <View style={styles.section}>
                  <View style={styles.titles}>
                    <BoldText size={20}>Introduction</BoldText>
                  </View>
                  <View
                    style={{
                      ...styles.content,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ paddingLeft: 10 }}>
                      <Image
                        style={{ width: 125, height: 100 }}
                        source={require("../../assets/images/withoutBgLogo1.png")}
                        contentFit="contain"
                      />
                    </View>
                    <View style={{ width: "75%", paddingHorizontal: 10 }}>
                      <RegularText
                        style={{ textAlign: "justify", paddingHorizontal: 10 }}
                      >
                        Stock Bazar is a multiplayer game, you can buy and sell
                        shares in top 7 companies. At the start of the game 10
                        share price information cards dealt to each player, the
                        card indicates up and down prices of the company. The
                        player can buy and sell shares and raise money by
                        watching the fluctuating values of his currency and ups
                        and down movement in share prices.
                      </RegularText>
                    </View>
                  </View>
                </View>

                <View style={styles.section}>
                  <View style={styles.titles}>
                    <BoldText size={20}>How to Win?</BoldText>
                  </View>
                  <View
                    style={{
                      ...styles.content,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ flex: 1, paddingHorizontal: 20 }}>
                      <RegularText style={{ textAlign: "justify" }}>
                        All the players will try to maximize their net worth by
                        right investments and making the right decisions at the
                        right time.
                      </RegularText>
                      <RegularText
                        style={{ textAlign: "justify", marginTop: -2 }}
                      >
                        At the end of the game, the top 3 players with the
                        highest net worth win.
                      </RegularText>
                    </View>
                    <View
                      style={{
                        width: "25%",
                        marginRight: 10,
                        justifyContent: "center",
                        flexDirection: "row",
                        alignItems: "flex-end",
                        gap: -10,
                      }}
                    >
                      <FontAwesome5 name="trophy" size={40} color="#c0c0c0" />
                      <FontAwesome5
                        name="trophy"
                        style={{ zIndex: 1 }}
                        size={50}
                        color="#d67400"
                      />

                      <FontAwesome5 name="trophy" size={40} color="#964B00" />
                    </View>
                  </View>
                </View>

                <View style={styles.section}>
                  <View style={styles.titles}>
                    <BoldText size={20}>Companies</BoldText>
                  </View>
                  <View
                    style={{
                      ...styles.content,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ paddingLeft: 10,gap:1 }}>
                      <Image
                        style={{ width: 90, height: 30 }}
                        source={require("../../assets/images/companies/tata.png")}
                        contentFit="contain"
                      />
                      <Image
                        style={{ width: 90, height: 30 }}
                        source={require("../../assets/images/companies/ongc.png")}
                        contentFit="contain"
                      />
                      <View style={{backgroundColor:"white",paddingLeft:10}}>

                      <Image
                        style={{ width: 80, height: 30 }}
                        source={require("../../assets/images/companies/nifty.png")}
                        contentFit="contain"
                        />
                        </View>
                    </View>
                    <View style={{ width: "70%" }}>
                      <RegularText
                        style={{ textAlign: "justify", paddingHorizontal: 10 }}
                      >
                        There are a total of 7 companies listed in this game -
                        Tata, ONGC, Reliance, Infosys, SBI, Adani, Nifty. 
                        These companies have a fixed quantity of available stocks
                        which is decided before the game starts.
                        The transaction is performed in multiples of 1000 stocks.

                      </RegularText>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
        <TouchableOpacity style={{}} onPress={() => setModalVisible(true)}>
          <View style={styles.buttonView}>
            <AntDesign name="infocirlceo" size={14} color={Colors.black} />
            <SemiBoldText
              color={Colors.black}
              style={{ paddingTop: 2 }}
              size={12}
            >
              GAME RULES
            </SemiBoldText>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  innerContainer: {
    height: "80%",
    width: "60%",
    backgroundColor: "#262525",
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
  modalButton: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  header: {
    top: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  mainContent: {
    width: "100%",
    marginTop: 5,
  },
  section: {
    width: "100%",
  },
  titles: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.darkGreen,
  },
  content: {
    marginVertical: 5,
  },
});

export default RulesModal;
