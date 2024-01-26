import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BoldText, RegularText } from "../../common/Text";
import { Colors } from "../../common/styles";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CompanyValueZeroCard({
  modalVisible,
  setModalVisible,
}) {
  if (!modalVisible) return null;
  return (
    <View style={styles.container}>
      <View style={styles.bottom2}>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="close-box"
            size={40}
            color={Colors.red}
          />
          <BoldText size={22} style={{ paddingTop: 3 }}>
            Company Bankrupt!
          </BoldText>
        </View>
        <View>
          <RegularText color={Colors.dim} style={{ paddingHorizontal: 20 }}>
            Since company share value is zero, No transaction can be made! Wait
            for the Company share value to rise again.
          </RegularText>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={{ ...styles.Btn, backgroundColor: Colors.info, marginTop: 15 }}
        >
          <BoldText size={15} transform="uppercase">
            Close
          </BoldText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    backgroundColor: "#141414",
    marginVertical: 10,
    borderRadius: 6,
    overflow: "hidden",
    borderColor: Colors.green + "22",
    borderWidth: 2,
    position: "relative",
  },
  bottom2: {
    width: "100%",
    alignItems: "center",
    paddingTop: 10,
    gap: 5,
    flex: 1,
  },
  Btn: {
    flexDirection: "row",
    borderRadius: 5,
    height: 40,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
  },
});
