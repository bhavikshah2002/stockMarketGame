import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { BoldText, RegularText, SemiBoldText } from "../common/Text";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../common/styles";
import { useState } from "react";

function CustomRulesModal({
  modalRulesVisible,
  setModalRulesVisible,
  setModalVisible,
}) {
  const [config, setConfig] = useState({
    includeCrystalCards: true,
    limitTransactionValue: false,
    initialCashInHand: 800000,
    totalStock: 200000,
    allowChairman: true,
    allowDirector: true,
  });
  const [isChairman, setIsChairman] = useState(false);
  const [isDirector, setIsDirector] = useState(false);
  const [isLimit, setIsLimit] = useState(false);
  const [isCrystalCard, setIsCrystalCard] = useState(false);

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
              <SemiBoldText>
                <Ionicons
                  name="arrow-back-circle-sharp"
                  size={50}
                  color={Colors.black}
                />
              </SemiBoldText>
            </View>
            <View style={styles.mainBox}>
              <View style={styles.TileBox}>
                <TouchableOpacity onPress={()=>setIsChairman(!isChairman)}>
                  <View style={[styles.Tile, isChairman && styles.border]}>
                    
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setIsCrystalCard(!isCrystalCard)}>
                  <View style={[styles.Tile, isCrystalCard && styles.border]}></View>
                </TouchableOpacity>

                <View style={styles.Tile}></View>
              </View>

              <View style={styles.TileBox}>
                <TouchableOpacity onPress={()=>{setIsDirector(!isDirector)}}>
                  <View style={[styles.Tile, isDirector && styles.border]}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setIsLimit(!isLimit)}>
                  <View style={[styles.Tile, isLimit && styles.border]}></View>
                </TouchableOpacity>

                <View style={styles.Tile}></View>
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
  },
  border:{
    borderWidth: 3,
    borderColor: Colors.white+"66",
  }
});

export default CustomRulesModal;
