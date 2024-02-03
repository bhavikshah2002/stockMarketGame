import { AntDesign } from "@expo/vector-icons";
import { Colors } from "./styles";
import { RegularText } from "./Text";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Slider from "@react-native-community/slider";

export default function SimpleSlider({
  value,
  setValue,
  min = 0,
  max = 100,
  step = 1,
  width = 180,
  bubbleText = (p) => p,
}) {
  const isDisabled = min >= max;
  const dimCol = isDisabled ? Colors.dim + "88" : Colors.dim;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={isDisabled}
        onPress={() => setValue(Math.max(min, value - 1))}
      >
        <AntDesign name="minuscircle" size={20} color={dimCol} />
      </TouchableOpacity>
      <Slider
        disabled={isDisabled}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={setValue}
        maximumTrackTintColor={dimCol}
        minimumTrackTintColor={Colors.darkGreen}
        thumbTintColor={Colors.darkGreen}
        style={{ width }}
      />
      <TouchableOpacity
        disabled={isDisabled}
        onPress={() => setValue(Math.min(max, value + 1))}
      >
        <AntDesign name="pluscircle" size={20} color={dimCol} />
      </TouchableOpacity>
      <RegularText style={{ width: 35 }}>{bubbleText(value)}</RegularText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    position: "relative",
  },
});
