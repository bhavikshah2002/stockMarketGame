import { useState, useRef } from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { BoldText, SemiBoldText } from "../common/Text";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "../common/styles";

function MainSettingsModal({ serverUrl, setServerUrl }) {
  const [modalVisible, setModalVisible] = useState(false);
  const handleInputChange = (url) => setServerUrl(url);
  const inputRef = useRef();
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
                  SETTINGS
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
              <View style={styles.mainContent}>
                <View style={styles.section}>
                  <View style={styles.titles}>
                    <BoldText size={20}>Game URL Setup</BoldText>
                  </View>
                  <View
                    style={{
                      ...styles.content,
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <SemiBoldText
                      size={12}
                      align={"center"}
                      style={{ paddingHorizontal: 5 }}
                    >
                      Wanna bring your own server to the party? Drop your custom
                      URL here!
                    </SemiBoldText>
                    <SemiBoldText
                      size={12}
                      align={"center"}
                      style={{ paddingHorizontal: 5 }}
                    >
                      Don't worry — if you leave it blank, we'll use our default
                      magic portal. ✨🌐
                    </SemiBoldText>
                    <View style={{ ...styles.inputTextBox, ...styles.between }}>
                      <TextInput
                        style={styles.inputTextText}
                        value={serverUrl}
                        placeholder="Enter Server Url"
                        ref={inputRef}
                        onChangeText={handleInputChange}
                      />

                      <TouchableOpacity
                        onPress={() => {
                          inputRef.current.focus();
                        }}
                        style={{ right: 0 }}
                      >
                        <Feather
                          name="edit"
                          size={17}
                          color="black"
                          style={{ backgroundColor: "white" }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={{}} onPress={() => setModalVisible(true)}>
          <View style={styles.buttonView}>
            <Feather name="settings" size={14} color={Colors.black} />
            <SemiBoldText
              color={Colors.black}
              style={{ paddingTop: 2 }}
              size={12}
            >
              GAME SETUP
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
    marginVertical: 5,
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
  inputTextText: {
    flex: 1,
    width: "90%",
    color: "black",
  },
  inputTextBox: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "80%",
    height: 30,
    borderRadius: 50,
    paddingHorizontal: 10,
    alignItems: "center",
    paddingBottom: 2,
    marginTop: 5,
    overflow: "hidden",
  },
  between: {
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default MainSettingsModal;
