import React, { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../common/styles";
import { BoldText, SemiBoldText } from "../common/Text";

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
                <View style={{paddingLeft:20}}></View>
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
                  style={{paddingBottom:10,marginRight:-5}}
                >
                  <AntDesign
                    name="closecircle"
                    size={28}
                    color={Colors.white}
                  />
                </TouchableOpacity>
              </View>
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
    top:5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
});

export default RulesModal;
