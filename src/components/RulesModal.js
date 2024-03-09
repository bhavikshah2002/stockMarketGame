import React, { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Colors } from "../common/styles";

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
          statusBarTranslucent={true}
        >

        </Modal>
        <TouchableOpacity
          style={styles.SettingButton}
          onPress={() => setModalVisible(true)}
        >
          {/* <Ionicons name="settings" size={28} color="#e1e3e2" /> */}
          <AntDesign name="questioncircle" size={24} color={Colors.dim} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
    modalButton:{
        justifyContent:"flex-end",
        alignItems:"center"
    }
});

export default RulesModal;
