import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AntDesign,
  FontAwesome5,
  FontAwesome,
  Octicons,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";
import { Colors } from "../../common/styles";
import {
  BoldText,
  CustomText,
  ItalicText,
  RegularText,
  SemiBoldText,
} from "../../common/Text";
import * as data from "./data";
import CardsList from "./CardsList";

const textSize = 11.5;

export default function RulesModal() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
        transparent
        statusBarTranslucent={true}
      >
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.header}>
              <View style={{ paddingLeft: 20 }}></View>
              <SemiBoldText
                size={25}
                style={{ textDecorationLine: "underline" }}
              >
                GAME RULES
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
                <View style={styles.titles}>
                  <BoldText size={20}>Introduction</BoldText>
                </View>
                <View style={styles.content}>
                  <View style={{ paddingLeft: 10, marginTop: -15 }}>
                    <Image
                      style={{ width: 125, height: 100 }}
                      source={require("../../../assets/images/withoutBgLogo1.png")}
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
                      player can buy and sell shares and raise money by watching
                      the fluctuating values of his currency and ups and down
                      movement in share prices.
                    </RegularText>
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <View style={styles.titles}>
                  <BoldText size={20}>How To Win</BoldText>
                </View>
                <View style={styles.content}>
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
                      At the end of the game, the top 3 players with the highest
                      net worth win.
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
                <View style={styles.content}>
                  <View style={{ paddingLeft: 10, gap: 1 }}>
                    <Image
                      style={{ width: 90, height: 25 }}
                      source={require("../../../assets/images/companies/tata.png")}
                      contentFit="contain"
                    />
                    <Image
                      style={{ width: 90, height: 25 }}
                      source={require("../../../assets/images/companies/ongc.png")}
                      contentFit="contain"
                    />
                    <View style={{ backgroundColor: "white", paddingLeft: 10 }}>
                      <Image
                        style={{ width: 80, height: 25 }}
                        source={require("../../../assets/images/companies/nifty.png")}
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
                      companies have a fixed quantity of available stocks which
                      is decided before the game starts. The transaction is
                      performed in multiples of 1000 stocks.
                    </RegularText>
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <View style={styles.titles}>
                  <BoldText size={20}>Cards</BoldText>
                </View>
                <View style={styles.content}>
                  <View style={{ flex: 1, paddingHorizontal: 20 }}>
                    <RegularText
                      style={{ textAlign: "justify", marginBottom: 6 }}
                      size={textSize}
                    >
                      The card stack contains three types of cards:
                    </RegularText>
                    <SemiBoldText
                      size={textSize}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      1. Company cards (110 cards)
                    </SemiBoldText>
                    <SemiBoldText
                      size={textSize}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      2. Crystal cards (10 cards)
                    </SemiBoldText>
                    <SemiBoldText
                      size={textSize}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      3. Circuit cards (12 cards)
                    </SemiBoldText>
                    <RegularText
                      size={textSize}
                      style={{ textAlign: "justify", marginTop: 2 }}
                    >
                      These cards are well shuffled before distributing it. Each
                      player gets 10 cards from this stack in each round.
                    </RegularText>
                  </View>
                  <View
                    style={{
                      width: "33%",
                      marginRight: 15,
                    }}
                  >
                    <CardsList cards={data.SampleCards} />
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <View style={styles.titles}>
                  <BoldText size={20}>Company Cards</BoldText>
                </View>
                <View style={styles.content}>
                  <View
                    style={{
                      width: "30%",
                      marginLeft: 15,
                    }}
                  >
                    <CardsList cards={data.SampleCompanyCards} />
                  </View>
                  <View style={{ flex: 1, paddingHorizontal: 20 }}>
                    <RegularText
                      size={textSize}
                      style={{
                        textAlign: "justify",
                        marginTop: -2,
                        marginBottom: 6,
                      }}
                    >
                      The card contains the company name and the change in stock
                      prices of that company.
                    </RegularText>
                    <RegularText
                      size={textSize}
                      color={Colors.dim}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      <BoldText color={Colors.green} size={textSize}>
                        1. POSITIVE
                      </BoldText>{" "}
                      - It increases the stock price of the company by that
                      denomination.
                    </RegularText>
                    <RegularText
                      size={textSize}
                      color={Colors.dim}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      <BoldText color={Colors.red} size={textSize}>
                        2. NEGATIVE
                      </BoldText>
                      - It reduces the stock price of the company by that
                      denomination.
                    </RegularText>
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <View style={styles.titles}>
                  <BoldText size={20}>Circuit Cards</BoldText>
                </View>
                <View style={styles.content}>
                  <View style={{ flex: 1, paddingHorizontal: 20 }}>
                    <RegularText
                      size={textSize}
                      style={{
                        textAlign: "justify",
                        marginTop: -2,
                        marginBottom: 6,
                      }}
                    >
                      The players can apply these cards during the circuit round
                      on any company they wish.
                    </RegularText>
                    <RegularText
                      size={textSize}
                      color={Colors.dim}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      <BoldText color={Colors.green} size={textSize}>
                        1. UPPER CIRCUIT
                      </BoldText>{" "}
                      It supresses the stock price depending on the denomination
                      of the circuit card.
                    </RegularText>
                    <RegularText
                      size={textSize}
                      color={Colors.dim}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      <BoldText color={Colors.red} size={textSize}>
                        2. LOWER CIRCUIT
                      </BoldText>{" "}
                      It prevents the stock price from falling depending on the
                      denomination of the circuit card.
                    </RegularText>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      marginRight: 15,
                    }}
                  >
                    <CardsList cards={data.SampleCircuitCards} />
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <View style={styles.titles}>
                  <BoldText size={20}>Crystal Cards</BoldText>
                </View>
                <View
                  style={[
                    styles.content,
                    {
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    },
                  ]}
                >
                  <View
                    style={{
                      width: "100%",
                      marginHorizontal: 15,
                    }}
                  >
                    <CardsList
                      cards={data.SampleCrystalCards}
                      style={{
                        justifyContent: "center",
                        flexDirection: "row",
                        alignItems: "center",
                        marginRight: 20,
                        gap: 1,
                      }}
                    />
                  </View>
                  <View style={{ flex: 1, paddingHorizontal: 20 }}>
                    <RegularText
                      size={textSize}
                      style={{ textAlign: "justify", marginVertical: 4 }}
                    >
                      The card stack contains 5 types of crystal cards mentioned
                      below:
                    </RegularText>
                    {data.CrystalTypes.map((elm, i) => (
                      <View
                        key={elm.type}
                        style={{
                          flexDirection: "row",
                          borderColor: Colors.dim,
                          borderWidth: 0.5,
                        }}
                      >
                        <ItalicText
                          size={textSize - 1}
                          align="center"
                          style={{ ...styles.cell, width: 25 }}
                        >
                          {i + 1}
                        </ItalicText>
                        <ItalicText
                          transform="uppercase"
                          size={textSize - 1}
                          style={{ ...styles.cell, width: 100 }}
                        >
                          {elm.type}
                        </ItalicText>
                        <RegularText
                          align="justify"
                          size={textSize - 1}
                          style={{ ...styles.cell, width: 250 }}
                        >
                          {elm.desc}
                        </RegularText>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <View style={styles.titles}>
                  <BoldText size={20}>Rounds</BoldText>
                </View>
                <View style={styles.content}>
                  <View style={{ flex: 1, paddingHorizontal: 20 }}>
                    <SemiBoldText
                      size={textSize + 2}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      1. MEGA ROUND
                    </SemiBoldText>
                    <RegularText
                      size={textSize}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      Each mega round starts with a new set of 10 cards.
                    </RegularText>
                    <RegularText
                      size={textSize}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      After each mega round the new stock prices are calculated
                      by adding together the company cards of all the players.
                    </RegularText>
                    <RegularText
                      size={textSize}
                      style={{ textAlign: "justify" }}
                    >
                      Changes in stock prices depends on following factors:
                    </RegularText>
                    <RegularText
                      size={textSize}
                      style={{
                        textAlign: "justify",
                        marginTop: -2,
                        paddingLeft: 25,
                      }}
                    >
                      1. Adding up the denominations of company cards of all
                      players for all companies.
                    </RegularText>
                    <RegularText
                      size={textSize}
                      style={{
                        textAlign: "justify",
                        marginTop: -2,
                        paddingLeft: 25,
                      }}
                    >
                      2. Circuit card applied by players during circuit round.
                    </RegularText>
                    <RegularText
                      size={textSize}
                      style={{
                        textAlign: "justify",
                        marginTop: -2,
                        paddingLeft: 25,
                      }}
                    >
                      3. Presence of a chairman or director for a particular
                      company.
                    </RegularText>
                    <SemiBoldText
                      size={textSize + 2}
                      style={{
                        textAlign: "justify",
                        marginTop: 5,
                      }}
                    >
                      2. SUB ROUND
                    </SemiBoldText>
                    <RegularText
                      size={textSize}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      Each mega round contains 3 sub rounds where players can
                      perform transactions like buying,selling of stocks,
                      applying any crystal card or passing the turn
                    </RegularText>

                    <SemiBoldText
                      size={textSize + 2}
                      style={{
                        textAlign: "justify",
                        marginTop: 5,
                      }}
                    >
                      3. CIRCUIT ROUND
                    </SemiBoldText>
                    <RegularText
                      size={textSize}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      Each mega round contains one circuit round after 3
                      subround ends.
                    </RegularText>
                    <RegularText
                      size={textSize}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      During the circuit round players will be allowed to apply
                      only circuit cards.
                    </RegularText>
                    <RegularText
                      size={textSize}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      If a player does not have a circuit card then they can
                      pass their turn
                    </RegularText>
                  </View>
                  <View
                    style={{
                      width: "15%",
                      marginRight: 15,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 50,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="order-numeric-ascending"
                        size={75}
                        color={Colors.darkPink}
                      />
                      <Octicons name="number" size={75} color={Colors.info} />
                      <Image
                        style={{ width: 60, height: 75 }}
                        source={require("../../../assets/images/circuit.png")}
                        contentFit="contain"
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <View style={styles.titles}>
                  <BoldText size={20}>Chairman</BoldText>
                </View>
                <View style={styles.content}>
                  <View
                    style={{
                      width: "25%",
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
                      <MaterialCommunityIcons
                        name="chair-rolling"
                        size={75}
                        // color="#d67400"
                        color="orange"
                      />
                    </View>
                  </View>
                  <View style={{ flex: 1, paddingHorizontal: 20 }}>
                    <RegularText
                      size={textSize}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      A player can be chairman of a company if he buys 100K
                      stocks or more of that company.
                    </RegularText>
                    <RegularText
                      size={textSize}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      There can only be one chairman per company.
                    </RegularText>
                    <RegularText
                      size={textSize}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      The chairman gets the right to remove the card with the
                      highest negative change of his company from the gathered
                      cards of all the players.
                    </RegularText>
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <View style={styles.titles}>
                  <BoldText size={20}>Director</BoldText>
                </View>
                <View style={styles.content}>
                  <View style={{ flex: 1, paddingHorizontal: 20 }}>
                    <RegularText
                      size={textSize}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      A player can be director of a company if he buys 50K
                      stocks or more of that company.
                    </RegularText>
                    <RegularText
                      size={textSize}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      There can be a maximum of two directors per company.
                    </RegularText>
                    <RegularText
                      size={textSize}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      The director gets the right to remove the card with the
                      highest negative change of his company from his own cards.
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
                      <Fontisto
                        name="person"
                        size={75}
                        color={Colors.logoGreen}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <View style={styles.titles}>
                  <BoldText size={20}>Bankruptcy</BoldText>
                </View>
                <View style={styles.content}>
                  <View
                    style={{
                      width: "15%",
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
                      <MaterialCommunityIcons
                        name="close-box"
                        size={60}
                        color={Colors.red}
                      />
                    </View>
                  </View>
                  <View style={{ flex: 1, paddingHorizontal: 20 }}>
                    <RegularText
                      size={textSize}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      A company is said to be bankrupt if the stock price of
                      that company becomes zero.
                    </RegularText>
                    <RegularText
                      size={textSize}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      The buying and selling of stocks of that company freezes.
                    </RegularText>
                    <RegularText
                      size={textSize}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      No crystal card can be used for bankrupt companies!
                    </RegularText>
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <View style={styles.titles}>
                  <BoldText size={20}>
                    Price Book and Transaction History
                  </BoldText>
                </View>
                <View style={styles.content}>
                  <View style={{ flex: 1, paddingHorizontal: 20 }}>
                    <RegularText
                      size={textSize}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      Price Book contains the price history and available stock
                      of all the companies!
                    </RegularText>
                    <RegularText
                      size={textSize}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      Transaction History shows the trasactions performed by all
                      players in the game. It only shows recent 40 tracsactions
                      in the game!
                    </RegularText>
                  </View>
                  <View
                    style={{
                      width: "20%",
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
                      <FontAwesome name="book" size={65} color={Colors.info} />
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <View style={styles.titles}>
                  <BoldText size={20}>Kick Player</BoldText>
                </View>
                <View style={styles.content}>
                  <View
                    style={{
                      width: "25%",
                      marginLeft: 5,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "center",

                        alignItems: "center",
                        gap: 10,
                        marginTop: 10,
                      }}
                    >
                      <View style={{ width: 110, height: 40 }}>
                        <View
                          style={[
                            styles.innerBox,
                            { backgroundColor: Colors.teal },
                          ]}
                        >
                          <View>
                            <CustomText family="SemiBoldItalic" size={10}>
                              Player Name
                            </CustomText>
                            <BoldText size={12}>₹{8}L</BoldText>
                          </View>
                        </View>
                        <View
                          style={[
                            styles.diagonal,
                            {
                              top: 0,
                              transform: [
                                { rotateZ: "35deg" },
                                { translateX: -35 },
                              ],
                            },
                          ]}
                        />
                        <View
                          style={[
                            styles.diagonal,
                            {
                              bottom: 0,
                              transform: [
                                { rotateZ: "-35deg" },
                                { translateX: -35 },
                              ],
                            },
                          ]}
                        />
                      </View>
                      <View style={{ width: 110, height: 40 }}>
                        <View style={styles.kickPanel}>
                          <SemiBoldText size={16} transform="uppercase">
                            Kick
                          </SemiBoldText>
                          <AntDesign
                            name="close"
                            size={20}
                            color={Colors.white}
                          />
                        </View>
                        <View
                          style={[
                            styles.diagonal,
                            {
                              top: 0,
                              transform: [
                                { rotateZ: "35deg" },
                                { translateX: -35 },
                              ],
                            },
                          ]}
                        />
                        <View
                          style={[
                            styles.diagonal,
                            {
                              bottom: 0,
                              transform: [
                                { rotateZ: "-35deg" },
                                { translateX: -35 },
                              ],
                            },
                          ]}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={{ flex: 1, paddingHorizontal: 20 }}>
                    <RegularText
                      size={textSize}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      Admin has the power to kick any player in between a game!
                    </RegularText>
                    <RegularText
                      size={textSize}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      By long pressing the User Badge, an option to kick that
                      player appears. On kicking a player all his stocks would
                      be made available and all his cash and powers would be
                      nullifed.
                    </RegularText>
                    <RegularText
                      size={textSize}
                      style={{ textAlign: "justify", marginTop: -2 }}
                    >
                      All players will be notified if any player is kicked from
                      game.
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
    gap: 6,
    backgroundColor: Colors.white + "bb",
    borderRadius: 50,
    paddingHorizontal: 10,
    padding: 3,
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
    marginBottom: 10,
  },
  section: {
    width: "100%",
  },
  titles: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.darkGreen,
    marginVertical: 5,
  },
  content: {
    marginVertical: 15,
    marginHorizontal: 5,
    gap: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  diagonal: {
    position: "absolute",
    left: 0,
    width: 50,
    height: 50,
    backgroundColor: Colors.black,
  },
  innerBox: {
    paddingHorizontal: 5,
    paddingLeft: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    width: 120,
    gap: -5,
    position: "relative",

    // zIndex:9999,
  },
  kickPanel: {
    backgroundColor: Colors.red,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 16,
    paddingRight: 8,
    width: 120,
  },
  cell: {
    borderColor: Colors.dim,
    borderWidth: 0.5,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
});
