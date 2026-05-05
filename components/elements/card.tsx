import { Colors, RarityStyles } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { StyleSheet, Text, View } from "react-native";

type Card = {
  id: number;
  brand: "Trail" | "Wave" | "Typhoon";
  model: string;
  rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";
};

type CardInventoryItem = Card & {
  amount: number;
};

type Props = {
  card: CardInventoryItem;
};

export default function CardElement({ card }: Props) {
  const colorScheme = useColorScheme();

  const rarityStyleMap = {
    Common: {
      main: RarityStyles.commonMain,
      tint: RarityStyles.commonTint,
      text: RarityStyles.commonText,
    },
    Uncommon: {
      main: RarityStyles.uncommonMain,
      tint: RarityStyles.uncommonTint,
      text: RarityStyles.uncommonText,
    },
    Rare: {
      main: RarityStyles.rareMain,
      tint: RarityStyles.rareTint,
      text: RarityStyles.rareText,
    },
    Epic: {
      main: RarityStyles.epicMain,
      tint: RarityStyles.epicTint,
      text: RarityStyles.epicText,
    },
    Legendary: {
      main: RarityStyles.legendaryMain,
      tint: RarityStyles.legendaryTint,
      text: RarityStyles.legendaryText,
    },
  } as const;

  const rarity = rarityStyleMap[card.rarity];
  const isOwned = card.amount > 0;

  const styles = StyleSheet.create({
    headerText: {
      fontSize: 12,
      fontWeight: "bold",
      color: Colors[colorScheme ?? "light"].text,
    },
    baseText: {
      fontSize: 10,
    },
    cardContainer: {
      width: 70,
      height: 100,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 3,
      borderRadius: 10,
      padding: 1,
      gap: 5,
    },
  });
  return (
    <View
      style={[
        styles.cardContainer,
        isOwned
          ? {
              backgroundColor: rarity.main,
              borderColor: rarity.tint,
            }
          : {
              backgroundColor: "#626262",
              borderColor: "#232323",
            },
      ]}
    >
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            backgroundColor: isOwned ? rarity.main : "#626262",
            borderColor: rarity.tint,
            borderWidth: 2,
            borderRadius: 15,
            padding: 2,
          }}
        >
          <Text
            style={{
              color: isOwned ? rarity.text : "#fff",
              fontWeight: "bold",
              fontSize: 10,
            }}
          >
            {card.rarity}
          </Text>
        </View>
        <Text
          style={[styles.headerText, { color: isOwned ? rarity.text : "#fff" }]}
        >
          {card.brand}
        </Text>

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.headerText, { color: isOwned ? rarity.text : "#fff" }]}
        >
          {card.model}
        </Text>
      </View>

      <Text
        style={[styles.baseText, { color: isOwned ? rarity.text : "#fff" }]}
      >
        {card.amount} owned
      </Text>
    </View>
  );
}
