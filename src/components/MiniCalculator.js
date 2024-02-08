import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../common/styles";
import { SemiBoldText } from "../common/Text";
import { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

export default function MiniCalculator({ modalVisible, setModalVisible }) {
  const [result, setResult] = useState("1+2/3");

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.container}>
        <View style={styles.innerBox}>
          <SemiBoldText size={15}>Calculator</SemiBoldText>
          <View style={styles.result}>
            <SemiBoldText>{result || "0"}</SemiBoldText>
          </View>
          <View>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => setResult("")}
                style={styles.cell}
              >
                <SemiBoldText>C</SemiBoldText>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => setResult((p) => p.slice(0, -1))}
                style={styles.cell}
              >
                <SemiBoldText>
                  <FontAwesome5 name="backspace" size={14} color="black" />
                </SemiBoldText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setResult((p) => p + "%")}
                style={styles.cell}
              >
                <SemiBoldText>%</SemiBoldText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setResult((p) => p + "/")}
                style={styles.cell}
              >
                <SemiBoldText>
                  <FontAwesome5 name="divide" size={14} color="black" />
                </SemiBoldText>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => setResult((p) => p + "1")}
                style={styles.cell}
              >
                <SemiBoldText>1</SemiBoldText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setResult((p) => p + "2")}
                style={styles.cell}
              >
                <SemiBoldText>2</SemiBoldText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setResult((p) => p + "3")}
                style={styles.cell}
              >
                <SemiBoldText>3</SemiBoldText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setResult((p) => p + "*")}
                style={styles.cell}
              >
                <SemiBoldText>x</SemiBoldText>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => setResult((p) => p + "4")}
                style={styles.cell}
              >
                <SemiBoldText>4</SemiBoldText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setResult((p) => p + "5")}
                style={styles.cell}
              >
                <SemiBoldText>5</SemiBoldText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setResult((p) => p + "6")}
                style={styles.cell}
              >
                <SemiBoldText>6</SemiBoldText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setResult((p) => p + "+")}
                style={styles.cell}
              >
                <SemiBoldText>+</SemiBoldText>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => setResult((p) => p + "7")}
                style={styles.cell}
              >
                <SemiBoldText>7</SemiBoldText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setResult((p) => p + "8")}
                style={styles.cell}
              >
                <SemiBoldText>8</SemiBoldText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setResult((p) => p + "9")}
                style={styles.cell}
              >
                <SemiBoldText>9</SemiBoldText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setResult((p) => p + "-")}
                style={styles.cell}
              >
                <SemiBoldText>-</SemiBoldText>
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
                onPress={() => setResult((p) => p + "")}
                style={styles.cell}
              >
                <SemiBoldText>C</SemiBoldText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  const res = eval(result);
                  if (res) setResult(res);
                }}
                style={styles.cell}
              >
                <SemiBoldText>=</SemiBoldText>
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
    backgroundColor: Colors.black,
    padding: 15,
    width: "60%",
    height: "80%",
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

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },

  cell: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dim + "44",
    borderRadius: 4,
  },

  result: {
    marginTop: 10,
    backgroundColor: Colors.dim + "44",
  },
});
