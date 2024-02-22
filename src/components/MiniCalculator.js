import {
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../common/styles";
import { LightText, SemiBoldText } from "../common/Text";
import { useState } from "react";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";

export default function MiniCalculator({ modalVisible, setModalVisible }) {
  const [result, setResult] = useState("");
  const [ques, setQues] = useState("");

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
      statusBarTranslucent={true}
    >
      <View style={styles.container}>
        <View style={styles.innerBox}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeBtn}
          >
            <AntDesign name="closecircle" size={28} color={Colors.white} />
          </TouchableOpacity>

          <SemiBoldText size={25}>Calculator</SemiBoldText>

          <View style={{ width: 70 * 4 + 4 * 3 }}>
            <View style={styles.result}>
              <LightText
                numberOfLines={1}
                size={11}
                align="right"
                color={Colors.dim}
              >
                {ques}
              </LightText>
              <TextInput
                value={result || "0"}
                onChangeText={setResult}
                style={styles.input}
              />
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => {
                  setResult("");
                  setQues("");
                }}
                style={styles.cell}
              >
                <SemiBoldText color={Colors.teal}>C</SemiBoldText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setResult((p) => p + "(")}
                style={styles.cell}
              >
                <SemiBoldText size={11} color={Colors.teal}>
                  (
                </SemiBoldText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setResult((p) => p + ")")}
                style={styles.cell}
              >
                <SemiBoldText size={11} color={Colors.teal}>
                  )
                </SemiBoldText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setResult((p) => p + "/")}
                style={styles.cell}
              >
                <SemiBoldText>
                  <FontAwesome5 name="divide" size={14} color={Colors.teal} />
                </SemiBoldText>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              {[1, 2, 3].map((no) => (
                <TouchableOpacity
                  key={no}
                  onPress={() => setResult((p) => p + no.toString())}
                  style={styles.cell}
                >
                  <SemiBoldText>{no}</SemiBoldText>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={() => setResult((p) => p + "*")}
                style={styles.cell}
              >
                <AntDesign name="close" size={14} color={Colors.teal} />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              {[4, 5, 6].map((no) => (
                <TouchableOpacity
                  key={no}
                  onPress={() => setResult((p) => p + no.toString())}
                  style={styles.cell}
                >
                  <SemiBoldText>{no}</SemiBoldText>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={() => setResult((p) => p + "+")}
                style={styles.cell}
              >
                <AntDesign name="plus" size={14} color={Colors.teal} />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              {[7, 8, 9].map((no) => (
                <TouchableOpacity
                  key={no}
                  onPress={() => setResult((p) => p + no.toString())}
                  style={styles.cell}
                >
                  <SemiBoldText>{no}</SemiBoldText>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={() => setResult((p) => p + "-")}
                style={styles.cell}
              >
                <AntDesign name="minus" size={14} color={Colors.teal} />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => setResult((p) => p + ".")}
                style={styles.cell}
              >
                <SemiBoldText>.</SemiBoldText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setResult((p) => p + "0")}
                style={styles.cell}
              >
                <SemiBoldText>0</SemiBoldText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cell}
                disabled={result.length == 0}
                onPress={() => setResult((p) => p.slice(0, -1))}
              >
                <FontAwesome5 name="backspace" size={14} color={Colors.dim} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  try {
                    const res = eval(result);

                    setQues(result);
                    setResult(res.toString());
                  } catch (error) {
                    console.log(error);
                  }
                }}
                style={{ ...styles.cell, ...styles.equals }}
              >
                <FontAwesome5 name="equals" size={10} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#00000044",
  },

  innerBox: {
    position: "relative",
    backgroundColor: Colors.black,
    padding: 15,
    width: "60%",
    height: "85%",
    borderRadius: 4,
    alignItems: "center",
    shadowColor: Colors.dim,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
    elevation: 21,
  },

  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },

  cell: {
    height: 35,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dim + "44",
    borderRadius: 4,
  },

  result: {
    borderRadius: 4,
    justifyContent: "center",
    gap: -2,
    marginTop: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: Colors.dim + "33",
    justifyContent: "flex-end",
  },

  input: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    textAlign: "right",
    color: Colors.white,
  },

  equals: {
    backgroundColor: Colors.green,
    shadowColor: Colors.green,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
    elevation: 21,
  },
});
