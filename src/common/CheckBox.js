import { TouchableOpacity, View } from "react-native";
import { Colors } from "./styles";
import { AntDesign } from "@expo/vector-icons";

export default function CheckBox({
  value,
  onChange,
  size = 18,
  color = Colors.white,
  style = {},
}) {
  return (
    <TouchableOpacity onPress={() => onChange(!value)}>
      <View
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 4,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: Colors.dim,
            overflow: "hidden",
          },
          style,
        ]}
      >
        <AntDesign
          name="check"
          size={size - 4}
          color={value ? color : "transparent"}
        />
      </View>
    </TouchableOpacity>
  );
}
