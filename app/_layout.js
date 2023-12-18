import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";

export default function HomeLayout() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins/Poppins-Light.ttf"),
    "Poppins-Italic": require("../assets/fonts/Poppins/Poppins-Italic.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <Slot />
    </SafeAreaView>
  );
}
