import { Modal, Pressable, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { BoldText, RegularText, SemiBoldText } from "../common/Text";
import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../common/styles";
import { Image } from "expo-image";
import { useGameState } from "../contexts/GameStateContext";
export default function Settings() {
  const { gameId} = useGameState();
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
        >
          <View style={styles.Container}>
            <View style={{ marginTop: 20 }}>
              <BoldText size={40} style={{}}>
                Settings
              </BoldText>
            </View>
            

            <View style={styles.ButtonsContainer}>
              <TouchableOpacity
                style={{ ...styles.Btn, backgroundColor: Colors.green }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <BoldText size={25} transform="uppercase">
                  Resume
                </BoldText>
                <AntDesign name="play" size={35} color="white" />
              </TouchableOpacity>
              <Link href={"/lobby"} asChild>
                <TouchableOpacity
                  style={{ ...styles.Btn, backgroundColor: Colors.red }}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <BoldText size={25} transform="uppercase">
                    Leave
                  </BoldText>
                  <MaterialCommunityIcons
                    name="exit-run"
                    size={35}
                    color="white"
                  />
                </TouchableOpacity>
              </Link>

            </View>
            <View style={{paddingTop:20,flexDirection:"row",gap:5}}>
              <BoldText size={15} color={Colors.info}>
                ROOM ID : 
              </BoldText>
              <BoldText size={15} >
              {gameId}
              </BoldText>
            </View>
            <View style={styles.BottomBar}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 15,
                  width:150
                }}
              >
                <SemiBoldText size={18} color={Colors.logoGreen}>
                  Stock Bazar
                </SemiBoldText>
                <Image
                  style={styles.logo}
                  source={require("../../assets/images/withoutBgLogo2.png")}
                  contentFit="contain"
                />
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  gap: -5,
                }}
              >
                <SemiBoldText color={Colors.dim} size={13}>
                  Created with ❤️
                </SemiBoldText>
                <SemiBoldText>
                  Bhavik Shah, Arun Mulakkal, Arpit Shah
                </SemiBoldText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  marginRight: 15,
                  width:150
                }}
              >
                <SemiBoldText color={Colors.info}>Copyright</SemiBoldText>
                <AntDesign name="copyright" size={24} color={Colors.info} />
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.SettingButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="settings" size={28} color="#e1e3e2" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#262525",
    justifyContent: "space-between",
    alignItems: "center",
  },
  SettingButton: {
    marginLeft: 20,
  },
  Btn: {
    flexDirection: "row",
    borderRadius: 5,
    height: 70,
    width: 200,
    borderRadius: 40,
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonsContainer: {
    gap: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  BottomBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
});
