import { Alert } from "react-native";

function alertFunction(
  title = "Error",
  message = "Please try again",
  cancelButtonText = "Cancel",
  onClose = () => {}
) {
  Alert.alert(title, message, [
    {
      text: cancelButtonText,
      onPress: onClose,
      style: "cancel",
    },
  ]);
}

export default alertFunction;
