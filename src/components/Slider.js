import { AntDesign } from "@expo/vector-icons";
import { Slider } from "react-native-awesome-slider";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../common/styles";
import { useSharedValue } from "react-native-reanimated";
import { RegularText } from "../common/Text";
import { useEffect, useState } from "react";

export default function MySlider({
  value,
  min = 0,
  max = 100,
  bubble: bubbleText = (s) => Math.floor(s) + "K",
  ...props
}) {
  const _max = useSharedValue(max);
  const _min = useSharedValue(min);
  const [_value, setValue] = useState(0);
  const isDisabled = min >= max;
  const dimCol = isDisabled ? Colors.dim + "88" : Colors.dim;
  useEffect(()=>{
    value.value;
  },[max,min])
  return (
    <>
      <TouchableOpacity
        disabled={isDisabled}
        onPress={() => {
          const newVal = Math.max(min, value.value - 1);
          value.value = newVal;
          setValue(newVal);
        }}
      >
        <AntDesign name="minuscircle" size={20} color={dimCol} />
      </TouchableOpacity>
      <Slider
        disable={isDisabled}
        progress={value}
        minimumValue={_min}
        maximumValue={_max}
        sliderHeight={3}
        onSlidingComplete={setValue}
        bubble={bubbleText}
        theme={{
          disableMinTrackTintColor: "#fff",
          maximumTrackTintColor: Colors.dim,
          minimumTrackTintColor: Colors.darkGreen,
          cacheTrackTintColor: "#333",
          bubbleBackgroundColor: Colors.dim,
        }}
        {...props}
      />
      <TouchableOpacity
        disabled={isDisabled}
        onPress={() => {
          const newVal = Math.min(max, value.value + 1);
          value.value = newVal;
          setValue(newVal);
        }}
      >
        <AntDesign name="pluscircle" size={20} color={dimCol} />
      </TouchableOpacity>
      <RegularText style={{ width: 30 }}>{bubbleText(_value)}</RegularText>
    </>
  );
}
