import { TouchableOpacity, View } from "react-native";
import { Modal } from "react-native";
import { StyleSheet } from "react-native";
import { BoldText, RegularText } from "../common/Text";
import { Colors } from "../common/styles";

function getRow({values}) {
    return(
        <View>
            <RegularText>Round</RegularText>
        </View>
    )
}

export default function PriceBook({ priceBookVisible, setPriceBookVisible }) {
  return (
    <Modal
      animationType="slide"
      visible={priceBookVisible}
      transparent
      onRequestClose={() => {
        setPriceBookVisible(!priceBookVisible);
      }}
    >
      <View style={styles.Container}>
        <View style={styles.InnerConatiner}>
          <View>
            <BoldText size={25} style={{textDecorationLine:"underline",fontStyle:"italic"}}>
                Price Book
            </BoldText>
            <View>
                
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={{}}
              onPress={() => setPriceBookVisible(!priceBookVisible)}
            >
              <BoldText size={25} transform="uppercase">
                Go Back
              </BoldText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
  },
  InnerConatiner: {
    height:"100%",
    width: "50%",
    backgroundColor: "#262525",
    position:"absolute",
    right:0,
    justifyContent: "center",
    alignItems: "center",
  },
});
