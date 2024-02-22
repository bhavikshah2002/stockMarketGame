import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "./styles";
import { AntDesign } from "@expo/vector-icons";

export default function CheckBox({
  value,
  onChange,
  size = 18,
  disabled = false,
  color = Colors.white,
  style = {},
}) {
  return (
    <TouchableOpacity disabled={disabled} onPress={() => onChange(!value)}>
      <View style={[{ width: size }, styles.checkbox, style]}>
        <AntDesign
          name="check"
          size={size - 4}
          color={value ? color : "transparent"}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.dim,
    overflow: "hidden",
    aspectRatio: 1,
    borderRadius: 5,
  },
});
