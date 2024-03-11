import { View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import SmallCard from "../SmallCard";

export default function CardsList({ cards, style = {} }) {
  return (
    <View
      style={[
        {
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          gap: -10,
        },
        style,
      ]}
    >
      {cards.map((card) => (
        <DraggableFlatList
          key={card.id}
          data={[card]}
          onDragEnd={() => {}}
          horizontal={true}
          contentContainerStyle={{ height: 80 }}
          renderItem={({ item, drag }) => (
            <SmallCard
              key={item.id}
              card={item}
              drag={drag}
              isActive={false}
              toSet={false}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ))}
    </View>
  );
}
