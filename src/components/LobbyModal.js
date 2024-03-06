import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { BoldText, RegularText, SemiBoldText } from "../common/Text";
import { Colors } from "../common/styles";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";

function LobbyModal({ modalVisible, setModalVisible, handleLeave }) {
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
              <TouchableOpacity onPress={()=>{setModalVisible(false)}} >
                <View style={styles.customDiv}>
                  <View style={styles.InsideBox}>
                    <View style={styles.iconsBox}>
                      <Foundation name="graph-trend" size={60} color="black" />
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

              <TouchableOpacity>
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

              <TouchableOpacity>
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
