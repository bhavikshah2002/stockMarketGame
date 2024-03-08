import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { BoldText, RegularText, SemiBoldText } from "../common/Text";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../common/styles";
import { useEffect, useState } from "react";
import {
  MaterialCommunityIcons,
  Fontisto,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";

function CustomRulesModal({
  modalRulesVisible,
  setModalRulesVisible,
  setModalVisible,
  config,setConfig
}) {
  
  const [isChairman, setIsChairman] = useState(false);
  const [isDirector, setIsDirector] = useState(false);
  const [isLimit, setIsLimit] = useState(false);
  const [isCrystalCard, setIsCrystalCard] = useState(false);

  useEffect(()=>{
    modalRulesVisible &&
    setConfig((p) => ({
      ...p,
      excludeCrystalCards: !isCrystalCard,
      limitTransactionValue:isLimit,
      allowChairman:isChairman,
      allowDirector:isDirector
    }))
  },[isChairman,isDirector,isLimit,isCrystalCard,modalRulesVisible])

  const contentColor = Colors.dim;
  return (
    <>
      <View>
        <Modal
          animationType="slide"
          visible={modalRulesVisible}
          onRequestClose={() => {
            setModalRulesVisible(!modalRulesVisible);
          }}
          statusBarTranslucent={true}
        >
          <View style={styles.container}>
            <View style={styles.leaveButton}>
              <TouchableOpacity
                onPress={() => {
                  setModalRulesVisible(false);
                  setModalVisible(true);
                }}
              >
                <Ionicons
                  name="arrow-back-circle-sharp"
                  size={50}
                  color={Colors.dim}
                />
              </TouchableOpacity>
              <SemiBoldText align="center" size={30} color={Colors.dim}>
                CUSTOM RULES
              </SemiBoldText>
              <TouchableOpacity
                onPress={() => {
                  setModalRulesVisible(false);
                }}
              >
                {/* <AntDesign name="checkcircle" size={39} color={Colors.dim} /> */}
                <Ionicons
                  name="arrow-forward-circle-sharp"
                  size={50}
                  color={Colors.dim}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.mainBox}>
              <View style={styles.TileBox}>
                <TouchableOpacity onPress={() => setIsChairman(!isChairman)}>
                  <View style={[styles.Tile, isChairman && styles.border]}>
                    <View style={styles.iconBox}>
                      <MaterialCommunityIcons
                        name="chair-rolling"
                        size={40}
                        color={contentColor}
                      />
                    </View>
                    <View style={styles.headingBox}>
                      <BoldText color={contentColor}>CHAIRMAN</BoldText>
                    </View>
                    <View style={styles.contentBox}>
                      <RegularText
                        color={contentColor}
                        style={{ textAlign: "center" }}
                        size={10}
                      >
                        Removes 1 card from any player's card stack
                      </RegularText>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setIsCrystalCard(!isCrystalCard)}
                >
                  <View style={[styles.Tile, isCrystalCard && styles.border]}>
                    <View style={styles.iconBox}>
                      <MaterialCommunityIcons
                        name="diamond-stone"
                        size={30}
                        color={contentColor}
                      />
                    </View>
                    <View style={styles.headingBox}>
                      <BoldText color={contentColor}>CRYSTAL CARDS</BoldText>
                    </View>
                    <View style={styles.contentBox}>
                      <RegularText
                        color={contentColor}
                        style={{ textAlign: "center" }}
                        size={10}
                      >
                        Special power cards which make game interesting!
                      </RegularText>
                    </View>
                  </View>
                </TouchableOpacity>

                <View style={styles.Tile}>
                  <View style={styles.iconBox}>
                    <FontAwesome name="rupee" size={30} color={contentColor} />
                  </View>
                  <View style={styles.headingBox}>
                    <BoldText color={contentColor}>STARTING CASH</BoldText>
                  </View>
                  <View style={styles.contentBox}>
                    <TouchableOpacity
                      onPress={() =>
                        setConfig((p) => ({
                          ...p,
                          initialCashInHand: p.initialCashInHand - 50000,
                        }))
                      }
                      disabled={config.initialCashInHand == 600000}
                    >
                      <AntDesign
                        name="minuscircle"
                        size={17}
                        color={contentColor}
                      />
                    </TouchableOpacity>
                    <SemiBoldText
                      align="center"
                      style={{ width: 40 }}
                      size={17}
                      color={contentColor}
                    >
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
                      <AntDesign
                        name="pluscircle"
                        size={17}
                        color={contentColor}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.TileBox}>
                <TouchableOpacity
                  onPress={() => {
                    setIsDirector(!isDirector);
                  }}
                >
                  <View style={[styles.Tile, isDirector && styles.border]}>
                    <View style={styles.iconBox}>
                      <Fontisto name="person" size={35} color={contentColor} />
                    </View>
                    <View style={styles.headingBox}>
                      <BoldText color={contentColor}>DIRECTOR</BoldText>
                    </View>
                    <View style={styles.contentBox}>
                      <RegularText
                        color={contentColor}
                        style={{ textAlign: "center" }}
                        size={10}
                      >
                        Removes 1 card from his own card stack
                      </RegularText>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsLimit(!isLimit)}>
                  <View style={[styles.Tile, isLimit && styles.border]}>
                    <View style={styles.iconBox}>
                      <MaterialCommunityIcons
                        name="bank-transfer"
                        size={47}
                        color={contentColor}
                      />
                    </View>
                    <View style={styles.headingBox}>
                      <BoldText color={contentColor}>
                        LIMIT TRANSACTION
                      </BoldText>
                    </View>
                    <View style={styles.contentBox}>
                      <RegularText
                        color={contentColor}
                        style={{ textAlign: "center" }}
                        size={10}
                      >
                        Maximum 1L stocks can be purchased in a round
                      </RegularText>
                    </View>
                  </View>
                </TouchableOpacity>

                <View style={styles.Tile}>
                  <View style={styles.iconBox}>
                    <AntDesign
                      name="shoppingcart"
                      size={34}
                      color={contentColor}
                    />
                  </View>
                  <View style={styles.headingBox}>
                    <BoldText color={contentColor}>MAXIMUM STOCKS</BoldText>
                  </View>
                  <View style={styles.contentBox}>
                    <TouchableOpacity
                      onPress={() =>
                        setConfig((p) => ({
                          ...p,
                          totalStock: p.totalStock - 25000,
                        }))
                      }
                      disabled={config.totalStock == 150000}
                    >
                      <AntDesign
                        name="minuscircle"
                        size={17}
                        color={contentColor}
                      />
                    </TouchableOpacity>
                    <SemiBoldText
                      align="center"
                      style={{ width: 40 }}
                      size={15}
                      color={contentColor}
                    >
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
                      <AntDesign
                        name="pluscircle"
                        size={17}
                        color={contentColor}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
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
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainBox: {
    flex: 1,
    marginBottom: 40,
    gap: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  TileBox: {
    flexDirection: "row",
    gap: 50,
  },
  Tile: {
    position: "relative",
    height: 110,
    width: 180,
    backgroundColor: "#262525",
    borderRadius: 10,
    shadowColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.21,
    shadowRadius: 6.65,
    elevation: 9,
    gap: 5,
  },
  border: {
    borderWidth: 3,
    borderColor: Colors.white + "66",
  },

  iconBox: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  headingBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  contentBox: {
    paddingHorizontal: 10,
    marginTop: -5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "row",
    gap: 10,
  },
});

export default CustomRulesModal;
