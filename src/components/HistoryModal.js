import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import {
  BoldText,
  ItalicText,
  RegularText,
  SemiBoldText,
} from "../common/Text";
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
import { useMemo } from "react";
import { useGameState } from "../contexts/GameStateContext";

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
    case "BONUS_SHARE": {
      return (
        <>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="plus" size={24} color="#1bcfab" />
            <FontAwesome name="plus" size={15} color="#14967c" />
          </View>
        </>
      );
    }
    case "RIGHT_ISSUE": {
      return (
        <>
          <View style={{ flexDirection: "row", gap: -10 }}>
            <MaterialIcons name="attach-money" size={30} color="orange" />
          </View>
        </>
      );
    }
    case "LOAN_ON_STOCK": {
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
function GetCrstalText({ type, transaction }) {
  switch (type) {
    case "FRAUD": {
      return (
        <RegularText size={12} color={Colors.dim}>{`Bought ${
          transaction.numberOfStocks / 1000
        }K stocks of ${CompanyInObj[transaction.companyId].name} @ ₹${
          transaction.stockPrice
        } per share `}</RegularText>
      );
    }
    case "DIVIDEND": {
      return (
        <RegularText size={12} color={Colors.dim}>{`Received ₹${
          transaction.stockPrice
        } as Dividend for ${transaction.numberOfStocks / 1000}K stocks in ${
          CompanyInObj[transaction.companyId].name
        } `}</RegularText>
      );
    }
    case "BONUS_SHARE": {
      return (
        <RegularText size={12} color={Colors.dim}>{`Collected extra ${
          transaction.numberOfStocks / 1000
        }K shares in ${
          CompanyInObj[transaction.companyId].name
        } as Bonus`}</RegularText>
      );
    }
    case "RIGHT_ISSUE": {
      return (
        <RegularText size={12} color={Colors.dim}>{`Got ${
          transaction.numberOfStocks / 1000
        }K shares in ${
          CompanyInObj[transaction.companyId].name
        } @ ₹10 per share`}</RegularText>
      );
    }
    case "LOAN_ON_STOCK": {
      return (
        <RegularText
          size={12}
          color={Colors.dim}
        >{`Paisa hee Paisa hoga! Collected ₹1L`}</RegularText>
      );
    }
    default: {
      return (
        <RegularText size={12} color={Colors.dim}>
          No transaction
        </RegularText>
      );
    }
  }
}

export default function HistoryModal({
  historyModalVisible,
  setHistoryModalVisble,
}) {
  const { gameState } = useGameState();
  const history = useMemo(() => {
    return gameState.transactions;
  }, [gameState]);

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
          {history.length == 0 ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <BoldText size={20}>No transactions to be shown!</BoldText>
            </View>
          ) : (
            <FlatList
              data={history}
              renderItem={({ item }) => {
                if (item.type.split(":")[0] == "CRYSTAL") {
                  return (
                    <View style={styles.transactionBox}>
                      <GetCrstalIcon size={34} type={item.type.split(":")[1]} />
                      <View>
                        <SemiBoldText transform="capitalize">
                          {gameState.userState[item.userId].username}
                          {"  "}
                          <ItalicText transform="lowercase" size={13}>
                            used{" "}
                          </ItalicText>
                          {item.type.split(":")[1].split("_").join(" ")} card
                        </SemiBoldText>
                        <GetCrstalText
                          type={item.type.split(":")[1]}
                          transaction={item}
                        />
                      </View>
                    </View>
                  );
                } else if (item.type == "BUY" || item.type == "SELL") {
                  const isBuy = item.type == "BUY";

                  return (
                    <View style={styles.transactionBox}>
                      <Fontisto
                        name={
                          isBuy
                            ? "shopping-basket-add"
                            : "shopping-basket-remove"
                        }
                        size={29}
                        color={isBuy ? Colors.green : Colors.red}
                      />
                      <View>
                        <SemiBoldText>
                          {gameState.userState[item.userId].username}
                          {"  "}
                          <ItalicText size={13}>
                            {isBuy ? "bought" : "sold"}
                            {"  "}
                          </ItalicText>
                          {CompanyInObj[item.companyId].name}
                        </SemiBoldText>
                        <RegularText size={12} color={Colors.dim}>
                          {isBuy ? "bought" : "sold"}{" "}
                          {item.numberOfStocks / 1000}K stocks at ₹
                          {item.stockPrice} per share
                        </RegularText>
                      </View>
                    </View>
                  );
                } else if (item.type.split(":")[0] == "CIRCUIT") {
                  const isUp = item.type.split(":")[1] == "UP";

                  return (
                    <View style={styles.transactionBox}>
                      <Entypo
                        name="bar-graph"
                        style={
                          isUp ? {} : { transform: [{ rotateY: "180deg" }] }
                        }
                        size={24}
                        color={isUp ? Colors.green : Colors.red}
                      />
                      <View>
                        <SemiBoldText>
                          {gameState.userState[item.userId].username}
                          {"  "}
                          <ItalicText size={13}>
                            applied
                            {"  "}
                          </ItalicText>
                          {isUp ? "Upper" : "Lower"} Circuit
                        </SemiBoldText>
                        <RegularText size={12} color={Colors.dim}>
                          On {CompanyInObj[item.companyId].name} of{" "}
                          {item.circuitValue}
                        </RegularText>
                      </View>
                    </View>
                  );
                } else if (item.type == "PASS") {
                  return (
                    <View style={styles.transactionBox}>
                      <FontAwesome5
                        name="hand-peace"
                        size={28}
                        style={{ marginHorizontal: 9 }}
                        color={Colors.info}
                      />
                      <View>
                        <SemiBoldText>
                          {gameState.userState[item.userId].username}
                          {"  "}
                          <ItalicText size={13}>
                            has
                            {"  "}
                          </ItalicText>
                          Passed
                        </SemiBoldText>
                        <RegularText size={12} color={Colors.dim}>
                          {
                            [
                              `current round was passed by ${
                                gameState.userState[item.userId].username
                              }!`,
                              `kuch toh sharam karle bhai!`,
                              `passing turn is subject to market risk!`,
                            ][Math.floor(Math.random() * 3)]
                          }
                        </RegularText>
                      </View>
                    </View>
                  );
                } else {
                  return <View></View>;
                }
              }}
            />
          )}
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
    width: "60%",
    height: "80%",
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
