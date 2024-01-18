import { Alert } from "react-native";

function alertFunction(title = "Error", message = "Please try again") {
    Alert.alert(title, message, [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
      ]);
}

export default alertFunction
