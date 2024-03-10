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
import SmallCard from "./SmallCard";
import DraggableFlatList from "react-native-draggable-flatlist";

function RulesModal() {
  const [modalVisible, setModalVisible] = useState(false);
  let textSize = 12;
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
                    <View style={{ paddingLeft: 10, marginTop: -15 }}>
                      <Image
                        style={{ width: 125, height: 100 }}
                        source={require("../../assets/images/withoutBgLogo1.png")}
                        contentFit="contain"
                      />
                    </View>
                    <View style={{ width: "75%", paddingHorizontal: 20 }}>
                      <RegularText
                        size={textSize}
                        style={{ textAlign: "justify", marginBottom: -10 }}
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
                    <BoldText size={20}>How To Win</BoldText>
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
                      <RegularText
                        style={{ textAlign: "justify" }}
                        size={textSize}
                      >
                        All the players will try to maximize their net worth by
                        right investments and making the right decisions at the
                        right time.
                      </RegularText>
                      <RegularText
                        size={textSize}
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
                    <View style={{ paddingLeft: 10, gap: 1 }}>
                      <Image
                        style={{ width: 90, height: 25 }}
                        source={require("../../assets/images/companies/tata.png")}
                        contentFit="contain"
                      />
                      <Image
                        style={{ width: 90, height: 25 }}
                        source={require("../../assets/images/companies/ongc.png")}
                        contentFit="contain"
                      />
                      <View
                        style={{ backgroundColor: "white", paddingLeft: 10 }}
                      >
                        <Image
                          style={{ width: 80, height: 25 }}
                          source={require("../../assets/images/companies/nifty.png")}
                          contentFit="contain"
                        />
                      </View>
                    </View>
                    <View style={{ width: "70%" }}>
                      <RegularText
                        size={textSize}
                        style={{ textAlign: "justify", paddingHorizontal: 10 }}
                      >
                        There are a total of 7 companies listed in this game -
                        Tata, ONGC, Reliance, Infosys, SBI, Adani, Nifty. These
                        companies have a fixed quantity of available stocks
                        which is decided before the game starts. The transaction
                        is performed in multiples of 1000 stocks.
                      </RegularText>
                    </View>
                  </View>
                </View>

                <View style={styles.section}>
                  <View style={styles.titles}>
                    <BoldText size={20}>Cards</BoldText>
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
                      <RegularText
                        style={{ textAlign: "justify" }}
                        size={textSize}
                      >
                        The card stack contains three types of cards:
                      </RegularText>
                      <RegularText
                        size={textSize}
                        style={{ textAlign: "justify", marginTop: -2 }}
                      >
                        1. Company cards (110 cards)
                      </RegularText>
                      <RegularText
                        size={textSize}
                        style={{ textAlign: "justify", marginTop: -2 }}
                      >
                        2. Crystal cards (10 cards)
                      </RegularText>
                      <RegularText
                        size={textSize}
                        style={{ textAlign: "justify", marginTop: -2 }}
                      >
                        3. Circuit cards (12 cards)
                      </RegularText>
                      <RegularText
                        size={textSize}
                        style={{ textAlign: "justify", marginTop: -2 }}
                      >
                        These cards are well shuffled before distributing it.
                        Each player gets 10 cards from this stack in each round.
                      </RegularText>
                    </View>
                    <View
                      style={{
                        width: "33%",
                        marginRight: 15,
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: -10,
                        }}
                      >
                        <DraggableFlatList
                          data={[
                            {
                              type: "NORMAL",
                              companyId: 1,
                              netChange: 15,
                              id: 6,
                            },
                          ]}
                          onDragEnd={() => {}}
                          horizontal={true}
                          contentContainerStyle={{ height: 80 }}
                          renderItem={({ item, drag, isActive }) => (
                            <SmallCard
                              key={item.id}
                              card={item}
                              drag={drag}
                              isActive={false}
                            />
                          )}
                          keyExtractor={(item) => item.id}
                        />
                        <DraggableFlatList
                          data={[
                            {
                              type: "CRYSTAL",
                              crystalType: "DIVIDEND",
                              id: 112,
                            },
                          ]}
                          onDragEnd={() => {}}
                          horizontal={true}
                          contentContainerStyle={{ height: 80 }}
                          renderItem={({ item, drag, isActive }) => (
                            <SmallCard
                              key={item.id}
                              card={item}
                              drag={drag}
                              isActive={false}
                            />
                          )}
                          keyExtractor={(item) => item.id}
                        />
                        <DraggableFlatList
                          data={[
                            {
                              type: "CIRCUIT",
                              circuitType: "LOW",
                              denomination: 10,
                              id: 114,
                            },
                          ]}
                          onDragEnd={() => {}}
                          horizontal={true}
                          contentContainerStyle={{ height: 80 }}
                          renderItem={({ item, drag, isActive }) => (
                            <SmallCard
                              key={item.id}
                              card={item}
                              drag={drag}
                              isActive={false}
                            />
                          )}
                          keyExtractor={(item) => item.id}
                        />
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.section}>
                  <View style={styles.titles}>
                    <BoldText size={20}>Company Cards</BoldText>
                  </View>
                  <View
                    style={{
                      ...styles.content,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "30%",
                        marginLeft: 15,
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 0,
                        }}
                      >
                        <DraggableFlatList
                          data={[
                            {
                              type: "NORMAL",
                              companyId: 7,
                              netChange: 30,
                              id: 45,
                            },
                          ]}
                          onDragEnd={() => {}}
                          horizontal={true}
                          contentContainerStyle={{ height: 80 }}
                          renderItem={({ item, drag, isActive }) => (
                            <SmallCard
                              key={item.id}
                              card={item}
                              drag={drag}
                              isActive={false}
                            />
                          )}
                          keyExtractor={(item) => item.id}
                        />
                        <DraggableFlatList
                          data={[
                            {
                              type: "NORMAL",
                              companyId: 7,
                              netChange: -30,
                              id: 45,
                            },
                          ]}
                          onDragEnd={() => {}}
                          horizontal={true}
                          contentContainerStyle={{ height: 80 }}
                          renderItem={({ item, drag, isActive }) => (
                            <SmallCard
                              key={item.id}
                              card={item}
                              drag={drag}
                              isActive={false}
                            />
                          )}
                          keyExtractor={(item) => item.id}
                        />
                      </View>
                    </View>
                    <View style={{ flex: 1, paddingHorizontal: 20 }}>
                      <RegularText
                        size={textSize}
                        style={{ textAlign: "justify", marginTop: -2 }}
                      >
                        The card contains the company name and the change in
                        stock prices of that company.
                      </RegularText>
                      <RegularText
                        size={textSize}
                        style={{ textAlign: "justify", marginTop: -2 }}
                      >
                        1. POSITIVE: It increases the stock price of the company
                        by that denomination.
                      </RegularText>
                      <RegularText
                        size={textSize}
                        style={{ textAlign: "justify", marginTop: -2 }}
                      >
                        2. NEGATIVE: It reduces the stock price of the company
                        by that denomination.
                      </RegularText>
                    </View>
                  </View>
                </View>

                <View style={styles.section}>
                  <View style={styles.titles}>
                    <BoldText size={20}>Circuit Cards</BoldText>
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
                      <RegularText
                        size={textSize}
                        style={{ textAlign: "justify", marginTop: -2 }}
                      >
                        The players can apply these cards during the circuit
                        round on any company they wish.
                      </RegularText>
                      <RegularText
                        size={textSize}
                        style={{ textAlign: "justify", marginTop: -2 }}
                      >
                        1. UPPER CIRCUIT: It supresses the stock price depending
                        on the denomination of the circuit card.
                      </RegularText>
                      <RegularText
                        size={textSize}
                        style={{ textAlign: "justify", marginTop: -2 }}
                      >
                        2. LOWER CIRCUIT: It prevents the stock price from
                        falling depending on the denomination of the circuit
                        card.
                      </RegularText>
                    </View>
                    <View
                      style={{
                        width: "25%",
                        marginRight: 15,
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 0,
                        }}
                      >
                        <DraggableFlatList
                          data={[
                            {
                              type: "CIRCUIT",
                              circuitType: "UP",
                              denomination: 15,
                              id: 114,
                            },
                          ]}
                          onDragEnd={() => {}}
                          horizontal={true}
                          contentContainerStyle={{ height: 80 }}
                          renderItem={({ item, drag, isActive }) => (
                            <SmallCard
                              key={item.id}
                              card={item}
                              drag={drag}
                              isActive={false}
                            />
                          )}
                          keyExtractor={(item) => item.id}
                        />
                        <DraggableFlatList
                          data={[
                            {
                              type: "CIRCUIT",
                              circuitType: "LOW",
                              denomination: 5,
                              id: 114,
                            },
                          ]}
                          onDragEnd={() => {}}
                          horizontal={true}
                          contentContainerStyle={{ height: 80 }}
                          renderItem={({ item, drag, isActive }) => (
                            <SmallCard
                              key={item.id}
                              card={item}
                              drag={drag}
                              isActive={false}
                            />
                          )}
                          keyExtractor={(item) => item.id}
                        />
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.section}>
                  <View style={styles.titles}>
                    <BoldText size={20}>Crystal Cards</BoldText>
                  </View>
                  <View style={styles.content}>
                    <View
                      style={{
                        width: "100%",
                        marginHorizontal: 15,
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          flexDirection: "row",
                          alignItems: "center",
                          marginRight: 20,
                        }}
                      >
                        <DraggableFlatList
                          data={[
                            { type: "CRYSTAL", crystalType: "FRAUD", id: 1 },
                          ]}
                          onDragEnd={() => {}}
                          horizontal={true}
                          contentContainerStyle={{ height: 80 }}
                          renderItem={({ item, drag, isActive }) => (
                            <SmallCard
                              key={item.id}
                              card={item}
                              drag={drag}
                              isActive={false}
                            />
                          )}
                          keyExtractor={(item) => item.id}
                        />
                        <DraggableFlatList
                          data={[
                            { type: "CRYSTAL", crystalType: "DIVIDEND", id: 2 },
                          ]}
                          onDragEnd={() => {}}
                          horizontal={true}
                          contentContainerStyle={{ height: 80 }}
                          renderItem={({ item, drag, isActive }) => (
                            <SmallCard
                              key={item.id}
                              card={item}
                              drag={drag}
                              isActive={false}
                            />
                          )}
                          keyExtractor={(item) => item.id}
                        />
                        <DraggableFlatList
                          data={[
                            {
                              type: "CRYSTAL",
                              crystalType: "BONUS_SHARE",
                              id: 3,
                            },
                          ]}
                          onDragEnd={() => {}}
                          horizontal={true}
                          contentContainerStyle={{ height: 80 }}
                          renderItem={({ item, drag, isActive }) => (
                            <SmallCard
                              key={item.id}
                              card={item}
                              drag={drag}
                              isActive={false}
                            />
                          )}
                          keyExtractor={(item) => item.id}
                        />
                        <DraggableFlatList
                          data={[
                            {
                              type: "CRYSTAL",
                              crystalType: "RIGHT_ISSUE",
                              id: 4,
                            },
                          ]}
                          onDragEnd={() => {}}
                          horizontal={true}
                          contentContainerStyle={{ height: 80 }}
                          renderItem={({ item, drag, isActive }) => (
                            <SmallCard
                              key={item.id}
                              card={item}
                              drag={drag}
                              isActive={false}
                            />
                          )}
                          keyExtractor={(item) => item.id}
                        />
                        <DraggableFlatList
                          data={[
                            {
                              type: "CRYSTAL",
                              crystalType: "LOAN_ON_STOCK",
                              id: 5,
                            },
                          ]}
                          onDragEnd={() => {}}
                          horizontal={true}
                          contentContainerStyle={{ height: 80 }}
                          renderItem={({ item, drag, isActive }) => (
                            <SmallCard
                              key={item.id}
                              card={item}
                              drag={drag}
                              isActive={false}
                            />
                          )}
                          keyExtractor={(item) => item.id}
                        />
                      </View>
                    </View>
                    <View style={{ flex: 1, paddingHorizontal: 20 }}>
                      <RegularText
                        size={textSize}
                        style={{ textAlign: "justify", marginTop: -2 }}
                      >
                        The card stack contains 5 types of crystal cards
                        mentioned below:
                      </RegularText>
                      <View style={{ flexDirection: "row" }}>
                        <RegularText
                          size={textSize}
                          style={{
                            textAlign: "justify",
                            marginTop: -2,
                            width: 115,
                          }}
                        >
                          1. LOAN ON STOCK:
                        </RegularText>
                        <RegularText
                          size={textSize}
                          style={{ textAlign: "justify", marginTop: -2,flex:1 }}
                        >
                          Players receive a cash bonus of ₹1,00,000/-
                        </RegularText>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <RegularText
                          size={textSize}
                          style={{
                            textAlign: "justify",
                            marginTop: -2,
                            width: 115,
                          }}
                        >
                          2. DIVIDEND:
                        </RegularText>
                        <RegularText
                          size={textSize}
                          style={{ textAlign: "justify", marginTop: -2,flex:1 }}
                        >
                          Players receive a dividend of ₹5/- per
                        share for any company.
                        </RegularText>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <RegularText
                          size={textSize}
                          style={{
                            textAlign: "justify",
                            marginTop: -2,
                            width: 115,
                          }}
                        >
                          3. RIGHT ISSUE:
                        </RegularText>
                        <RegularText
                          size={textSize}
                          style={{ textAlign: "justify", marginTop: -2,flex:1 }}
                        >
                          Players can buy one additional share for
                        every two shares held in the company at a price of ₹10/-
                        per share.
                        </RegularText>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <RegularText
                          size={textSize}
                          style={{
                            textAlign: "justify",
                            marginTop: -2,
                            width: 115,
                          }}
                        >
                          4. BONUS SHARE:
                        </RegularText>
                        <RegularText
                          size={textSize}
                          style={{ textAlign: "justify", marginTop: -2,flex:1 }}
                        >
                          Players receive one additional share for
                        every five shares held in the company for free.
                        </RegularText>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <RegularText
                          size={textSize}
                          style={{
                            textAlign: "justify",
                            marginTop: -2,
                            width: 115,
                          }}
                        >
                          5. FRAUD:
                        </RegularText>
                        <RegularText
                          size={textSize}
                          style={{ textAlign: "justify", marginTop: -2,flex:1 }}
                        >
                        Players can buy stocks of any company at a
                        price which is 70% of the market price.
                        </RegularText>
                      </View>
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
