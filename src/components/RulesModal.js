import React, { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../common/styles";
import { SemiBoldText } from "../common/Text";

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
              
            </View>
          </View>
        </Modal>
        <TouchableOpacity style={{}} onPress={() => setModalVisible(true)}>
          <View style={styles.buttonView}>
            <AntDesign name="infocirlceo" size={24} color={Colors.black} />
            <SemiBoldText
              color={Colors.black}
              style={{ paddingTop: 2 }}
              size={20}
            >
              Game Rules
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
    backgroundColor: Colors.dim + "99",
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  modalButton: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default RulesModal;
