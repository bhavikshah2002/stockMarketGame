import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "../common/styles";

export default function ChangeIcon({ netChange, size = 34, ...props }) {
  if (netChange == 0)
    return (
      <FontAwesome5 name="equals" size={size} color={Colors.info} {...props} />
    );

  return (
    <AntDesign
      name={netChange > 0 ? "caretup" : "caretdown"}
      size={size}
      color={netChange > 0 ? Colors.green : Colors.red}
      {...props}
    />
  );
}
