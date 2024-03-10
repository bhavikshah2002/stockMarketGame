import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
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
                    <View>
                      <Image
                        style={{ width: 125, height: 100 }}
                        source={require("../../assets/images/withoutBgLogo1.png")}
                        contentFit="contain"
                      />
                    </View>
                    <View style={{width:"75%"}}>
                      <RegularText>
                        This game is a multiplayer game, you can buy and sell
                        shares in top 7 companies. At the start of the game 10
                        share price information cards dealt to each player, the
                        card indicates up and down prices of the company. The
                        player can buy and sell shares and raise money by
                        watching the fluctuating values of his currency and ups
                        and down movement in share prices. He also has
                        opportunities like Bonus issue, Dividends. Buyer and
                        Seller, Circuit filter, Right issue, Loans and Frauds.
                        Chairman cards what exactly happens in a real sock
                        market. So, what are you waiting for, throw caution to
                        the wind and trade in the only stock market that runs
                        24x7.
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
            <AntDesign name="infocirlceo" size={19} color={Colors.black} />
            <SemiBoldText
              color={Colors.black}
              style={{ paddingTop: 2 }}
              size={16}
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
    gap: 10,
    backgroundColor: Colors.white + "77",
    borderRadius: 50,
    paddingHorizontal: 10,
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
