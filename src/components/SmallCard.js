import { TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { BoldText } from "../common/Text";

export default function SmallCard({CardInfo}) {
  return (
    <>
      <TouchableOpacity>
        <View style={styles.Card}>
          <BoldText color="black">Card {CardInfo}</BoldText>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
    Card: {
        flex: 1,
        marginTop: 1,
        marginBottom: 3,
        marginHorizontal: 8,
        backgroundColor: "#b8b8b8",
        justifyContent: "center",
        alignItems: "center",
      },
});
