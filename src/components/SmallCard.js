import { Image, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { BoldText } from "../common/Text";
import { CompanyInObj } from "../data/cards";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../common/styles";
import { Entypo } from "@expo/vector-icons";

export default function SmallCard({ card }) {
  switch (card.type) {
    case "NORMAL": {
      const isProfit = card.netChange > 0;
      return (
        <>
          <TouchableOpacity>
            <View style={styles.Card}>
              <Image
                source={CompanyInObj[card.companyId].photoUrl}
                style={{
                  width: 50,
                  height: 20,
                  borderRadius: 5,
                  objectFit: "contain",
                }}
              />
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <AntDesign
                  name={isProfit ? "caretup" : "caretdown"}
                  size={24}
                  color={isProfit ? Colors.green : Colors.red}
                />
              </View>
              <View>
                <BoldText>₹{Math.abs(card.netChange)}</BoldText>
              </View>
            </View>
          </TouchableOpacity>
        </>
      );
    }
    case "CIRCUIT": {
        let isUp=false
        if (card.circuitType == "UP") isUp=true
      return (
        <>
          <TouchableOpacity>
            <View style={styles.Card}>
              <View style={{height:20,width:50,justifyContent:"center", alignItems:"center",gap:-5}}>
                <BoldText size={9} style={{marginTop:5}} >Circuit </BoldText>
                <BoldText size={9}>{card.circuitType}</BoldText>
              </View>
              <Entypo
                name="bar-graph"
                style={isUp?{}:{ transform: [{ rotateY: "180deg" }] }}
                size={24}
                color={isUp?Colors.green:Colors.red}
              />
            <View>
            <BoldText>₹{card.denomination}</BoldText>
            </View>
            </View>
          </TouchableOpacity>
        </>
      );
    }
    case "CRYSTAL": {
      return (
        <>
          <TouchableOpacity>
            <View style={styles.Card}>
              <BoldText color="black">{card.type} </BoldText>
            </View>
          </TouchableOpacity>
        </>
      );
    }
  }
}

const styles = StyleSheet.create({
  Card: {
    flex: 1,
    width: 50,
    marginTop: 1,
    marginBottom: 3,
    marginHorizontal: 8,
    backgroundColor: "#262525",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
  },
});
