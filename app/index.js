import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView,View } from "react-native";
import {
  BoldText,
  ItalicText,
  LightText,
  RegularText,
  SemiBoldText,
} from "../src/common/Text";

export default function HomePage() {
  return (
    <View style={{ flex: 1 }}>
      <RegularText>this is text</RegularText>
      <SemiBoldText>this is text</SemiBoldText>
      <BoldText>this is text</BoldText>
      <LightText>this is text</LightText>
      <ItalicText>this is text</ItalicText>
      <Link href="/lobby">G o to lobby</Link>
      <AntDesign name="caretright" size={24} color="black" />
    </View>
  );
}
