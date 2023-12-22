import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ItalicText, RegularText, SemiBoldText } from "../common/Text";
import { Colors } from "../common/styles";
import {
  AntDesign,
  FontAwesome,
  Fontisto,
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { CompanyInObj } from "../data/cards";

function GetCrstalIcon({ type }) {
  switch (type) {
    case "FRAUD": {
      return (
        <>
          <MaterialCommunityIcons
            name="guy-fawkes-mask"
            size={34}
            color="#0c5419"
          />
        </>
      );
    }
    case "DIVIDEND": {
      return (
        <>
          <FontAwesome5 name="divide" size={34} color="#aa42f5" />
        </>
      );
    }
    case "BONUS": {
      return (
        <>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="plus" size={24} color="#1bcfab" />
            <FontAwesome name="plus" size={15} color="#14967c" />
          </View>
        </>
      );
    }
    case "RIGHT": {
      return (
        <>
          <View style={{ flexDirection: "row", gap: -10 }}>
            <MaterialIcons name="attach-money" size={30} color="orange" />
          </View>
        </>
      );
    }
    case "LOAN": {
      return (
        <>
          <Fontisto name="money-symbol" size={30} color="#cf1bc0" />
        </>
      );
    }
    default: {
      return <FontAwesome name="diamond" size={30} color="blue" />;
    }
  }
}

export default function HistoryModal({
  historyModalVisible,
  setHistoryModalVisble,
}) {
  let history = new Array(5).fill(0).map((_, id) => ({
    id,
    type: "BUY",
    userId: Math.floor(Math.random() * 6),
    companyId: Math.floor(Math.random() * 7) + 1,
    noOfStock: Math.floor(Math.random() * 12) * 1000,
    price: Math.floor(Math.random() * 50) + 20,
  }));

  history.push(
    ...new Array(5).fill(0).map((_, id) => ({
      id: id + 10,
      type: "SOLD",
      userId: Math.floor(Math.random() * 6),
      companyId: Math.floor(Math.random() * 7) + 1,
      noOfStock: Math.floor(Math.random() * 12) * 1000,
      price: Math.floor(Math.random() * 50) + 20,
    }))
  );

  history.push(
    ...["FRAUD", "DIVIDEND", "BONUS_SHARE", "RIGHT_ISSUE", "LOAN_ON_STOCK"].map(
      (cardType, id) => ({
        id: id + 20,
        type: "CARD",
        cardType,
        userId: Math.floor(Math.random() * 6),
        companyId: Math.floor(Math.random() * 8),
      })
    )
  );

  return (
    <Modal
      animationType="slide"
      transparent
      visible={historyModalVisible}
      onRequestClose={() => {
        setHistoryModalVisble(false);
      }}
    >
      <View style={styles.container}>
        <View style={styles.innerBox}>
          <View style={styles.header}>
            <SemiBoldText size={15}>Transaction History</SemiBoldText>
            <TouchableOpacity onPress={() => setHistoryModalVisble(false)}>
              <AntDesign name="closecircle" size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.hr} />

          <FlatList
            data={history}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => {
              if (item.type == "CARD") {
                return (
                  <View style={styles.transactionBox}>
                    <GetCrstalIcon
                      size={34}
                      type={item.cardType.split("_")[0]}
                    />
                    <View>
                      <SemiBoldText transform="capitalize">
                        Arun Joseph{"  "}
                        <ItalicText transform="lowercase" size={13}>
                          used{" "}
                        </ItalicText>
                        {item.cardType.split("_").join(" ")}
                      </SemiBoldText>
                      <RegularText size={12} color={Colors.dim}>
                        This text should be replaced
                      </RegularText>
                    </View>
                  </View>
                );
              }

              const isBuy = item.type == "BUY";

              return (
                <View style={styles.transactionBox}>
                  <Fontisto
                    name={
                      isBuy ? "shopping-basket-add" : "shopping-basket-remove"
                    }
                    size={29}
                    color={isBuy ? Colors.green : Colors.red}
                  />
                  <View>
                    <SemiBoldText>
                      Arun Joseph{"  "}
                      <ItalicText size={13}>
                        {isBuy ? "bought" : "sold"}
                        {"  "}
                      </ItalicText>
                      {CompanyInObj[item.companyId].name}
                    </SemiBoldText>
                    <RegularText size={12} color={Colors.dim}>
                      {isBuy ? "bought" : "sold"} {item.noOfStock / 1000}K
                      stocks at ₹{item.price} per share
                    </RegularText>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#00000044",
  },

  innerBox: {
    backgroundColor: Colors.black,
    padding: 15,
    width: "65%",
    height: "70%",
    borderRadius: 4,
    shadowColor: Colors.dim,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 21,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  transactionBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#242121",
    borderRadius: 5,
    marginVertical: 4,
  },

  hr: {
    backgroundColor: Colors.dim,
    width: "100%",
    height: 2,
    marginVertical: 6,
    borderRadius: 1000,
  },
});
