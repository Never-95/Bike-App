import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Button, View } from "react-native";

type Card = {
  name: string;
  powerlevel: number;
  rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";
};

export default function GameScreen() {
  const colorScheme = useColorScheme();

  const commonCards: Card[] = [
    { name: "Walker", powerlevel: 5, rarity: "Common" },
    { name: "Jogger", powerlevel: 7, rarity: "Common" },
    { name: "Sprinter", powerlevel: 9, rarity: "Common" },
  ];

  const uncommonCards: Card[] = [
    { name: "Trail Runner", powerlevel: 12, rarity: "Uncommon" },
    { name: "Cyclist", powerlevel: 14, rarity: "Uncommon" },
  ];

  const rareCards: Card[] = [
    { name: "Marathoner", powerlevel: 20, rarity: "Rare" },
  ];

  const epicCards: Card[] = [
    { name: "Ultra Athlete", powerlevel: 30, rarity: "Epic" },
  ];

  const legendaryCards: Card[] = [
    { name: "Fitness God", powerlevel: 50, rarity: "Legendary" },
  ];

  const getRandom = (arr: Card[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const getCommon = () => getRandom(commonCards);

  const getUncommon = () => getRandom(uncommonCards);

  const getRare = () => getRandom(rareCards);

  const getEpic = () => getRandom(epicCards);

  const getLegendary = () => getRandom(legendaryCards);

  const openPack = () => {
    const cards = [];

    for (let i = 0; i < 3; i++) {
      const rand = Math.random();

      if (rand < 0.65) cards.push(getCommon());
      else if (rand < 0.85) cards.push(getUncommon());
      else if (rand < 0.95) cards.push(getRare());
      else if (rand < 0.99) cards.push(getEpic());
      else cards.push(getLegendary());
    }
    console.log(cards);
    return cards;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? "light"].mainBackground,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Open Pack" onPress={openPack} />
    </View>
  );
}
