import { Image } from "expo-image";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
const { width, height } = Dimensions.get("window");
export default function HomePage() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={{ width: 150, height: 100 }}
          source={require('../assets/images/withoutBgLogo2.png')}
          contentFit="cover"
          
        />
        <Text style={styles.gameName}>Stock Bazar</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            /* Join button action */
          }}
        >
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            /* Create button action */
          }}
        >
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  logo: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
  gameName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: width * 0.8,
  },
  button: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
