import CardElement from "@/components/elements/card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors, RarityStyles, StaticColors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../../utils/supabase";

type Card = {
  id: number;
  brand: "Trail" | "Wave" | "Typhoon";
  model: string;
  rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";
};

type CardInventoryItem = Card & {
  amount: number;
};

export default function GameScreen() {
  const colorScheme = useColorScheme();

  const [stars, setStars] = useState(0);
  const [collection, setCollection] = useState<CardInventoryItem[]>([]);
  const [openedPack, setOpenedPack] = useState<Card[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const PACK_STARCOST = 5;

  const styles = StyleSheet.create({
    headerText: {
      fontSize: 25,
      fontWeight: "bold",
      color: Colors[colorScheme ?? "light"].text,
    },
    baseText: {
      fontSize: 22,
      color: Colors[colorScheme ?? "light"].text,
    },
    contentBox: {
      width: 350,
      backgroundColor: Colors[colorScheme ?? "light"].contentBackground,
      borderColor: Colors[colorScheme ?? "light"].contentBorder,
      borderWidth: 5,
      borderRadius: 20,
      padding: 20,
      gap: 20,
    },
  });

  useFocusEffect(
    useCallback(() => {
      const loadStars = async () => {
        const { data, error } = await supabase
          .from("stars")
          .select("star_amount")
          .single();

        if (!error && data) {
          setStars(data.star_amount);
        }
      };

      loadStars();
    }, []),
  );

  const cardLookup: Record<number, Card> = {
    1: {
      id: 1,
      brand: "Trail",
      model: "Roller",
      rarity: "Common",
    },
    2: {
      id: 2,
      brand: "Wave",
      model: "Plankton",
      rarity: "Common",
    },
    3: {
      id: 3,
      brand: "Typhoon",
      model: "Butterfly",
      rarity: "Common",
    },
    4: {
      id: 4,
      brand: "Trail",
      model: "Roamer",
      rarity: "Common",
    },
    5: {
      id: 5,
      brand: "Wave",
      model: "Guppy",
      rarity: "Common",
    },
    6: {
      id: 6,
      brand: "Typhoon",
      model: "Mosquito",
      rarity: "Common",
    },

    7: {
      id: 7,
      brand: "Trail",
      model: "Runner",
      rarity: "Uncommon",
    },
    8: {
      id: 8,
      brand: "Trail",
      model: "Zapper",
      rarity: "Uncommon",
    },
    9: {
      id: 9,
      brand: "Wave",
      model: "Goldfish",
      rarity: "Uncommon",
    },
    10: {
      id: 10,
      brand: "Typhoon",
      model: "Moth",
      rarity: "Uncommon",
    },
    11: {
      id: 11,
      brand: "Typhoon",
      model: "Dragonfly",
      rarity: "Uncommon",
    },

    12: {
      id: 12,
      brand: "Trail",
      model: "Speeder",
      rarity: "Rare",
    },
    13: {
      id: 13,
      brand: "Wave",
      model: "Steelhead",
      rarity: "Rare",
    },
    14: {
      id: 14,
      brand: "Typhoon",
      model: "Hummingbird",
      rarity: "Rare",
    },

    15: {
      id: 15,
      brand: "Trail",
      model: "Striker",
      rarity: "Epic",
    },
    16: {
      id: 16,
      brand: "Wave",
      model: "Swordfish",
      rarity: "Epic",
    },
    17: {
      id: 17,
      brand: "Typhoon",
      model: "Vulture",
      rarity: "Epic",
    },

    18: {
      id: 18,
      brand: "Trail",
      model: "Rocket",
      rarity: "Legendary",
    },
    19: {
      id: 19,
      brand: "Typhoon",
      model: "Peregrine",
      rarity: "Legendary",
    },
    20: {
      id: 20,
      brand: "Wave",
      model: "Great White",
      rarity: "Legendary",
    },
  };

  const loadCards = useCallback(async () => {
    const { data, error } = await supabase
      .from("card_collection")
      .select("card_id, amount");

    if (!error && data) {
      const formatted = data.map((row) => ({
        ...cardLookup[row.card_id],
        amount: row.amount,
      }));

      //sorts into owned cards first and then missing ones
      const sorted = formatted.sort((a, b) => {
        const aOwned = a.amount > 0;
        const bOwned = b.amount > 0;

        if (aOwned !== bOwned) {
          return aOwned ? -1 : 1;
        }

        return a.id - b.id;
      });

      setCollection(sorted);
    }
  }, [cardLookup]);

  useFocusEffect(
    useCallback(() => {
      loadCards();
    }, [loadCards]),
  );

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

  const commonCards: Card[] = [
    { id: 1, brand: "Trail", model: "Roller", rarity: "Common" },
    {
      id: 2,
      brand: "Wave",
      model: "Plankton",
      rarity: "Common",
    },
    {
      id: 3,
      brand: "Typhoon",
      model: "Butterfly",
      rarity: "Common",
    },
    { id: 4, brand: "Trail", model: "Roamer", rarity: "Common" },
    { id: 5, brand: "Wave", model: "Guppy", rarity: "Common" },
    {
      id: 6,
      brand: "Typhoon",
      model: "Mosquito",
      rarity: "Common",
    },
  ];

  const uncommonCards: Card[] = [
    {
      id: 7,
      brand: "Trail",
      model: "Runner",
      rarity: "Uncommon",
    },
    {
      id: 8,
      brand: "Trail",
      model: "Zapper",
      rarity: "Uncommon",
    },
    {
      id: 9,
      brand: "Wave",
      model: "Goldfish",
      rarity: "Uncommon",
    },
    {
      id: 10,
      brand: "Typhoon",
      model: "Moth",
      rarity: "Uncommon",
    },
    {
      id: 11,
      brand: "Typhoon",
      model: "Dragonfly",
      rarity: "Uncommon",
    },
  ];

  const rareCards: Card[] = [
    {
      id: 12,
      brand: "Trail",
      model: "Speeder",
      rarity: "Rare",
    },
    {
      id: 13,
      brand: "Wave",
      model: "Steelhead",
      rarity: "Rare",
    },
    {
      id: 14,
      brand: "Typhoon",
      model: "Hummingbird",
      rarity: "Rare",
    },
  ];

  const epicCards: Card[] = [
    {
      id: 15,
      brand: "Trail",
      model: "Striker",
      rarity: "Epic",
    },
    {
      id: 16,
      brand: "Wave",
      model: "Swordfish",
      rarity: "Epic",
    },
    {
      id: 17,
      brand: "Typhoon",
      model: "Vulture",

      rarity: "Epic",
    },
  ];

  const legendaryCards: Card[] = [
    {
      id: 18,
      brand: "Trail",
      model: "Rocket",
      rarity: "Legendary",
    },
    {
      id: 19,
      brand: "Typhoon",
      model: "Peregrine",
      rarity: "Legendary",
    },
    {
      id: 20,
      brand: "Wave",
      model: "Great White",
      rarity: "Legendary",
    },
  ];

  const getRandom = (arr: Card[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const getCommon = () => getRandom(commonCards);

  const getUncommon = () => getRandom(uncommonCards);

  const getRare = () => getRandom(rareCards);

  const getEpic = () => getRandom(epicCards);

  const getLegendary = () => getRandom(legendaryCards);

  const openPack = async () => {
    if (stars < PACK_STARCOST) return;

    const cards: Card[] = [];

    for (let i = 0; i < 3; i++) {
      const rand = Math.random();

      if (rand < 0.65) cards.push(getCommon());
      else if (rand < 0.85) cards.push(getUncommon());
      else if (rand < 0.95) cards.push(getRare());
      else if (rand < 0.99) cards.push(getEpic());
      else cards.push(getLegendary());
    }

    const newStars = stars - PACK_STARCOST;

    const { error } = await supabase
      .from("stars")
      .update({ star_amount: newStars })
      .eq("id", 1);

    if (!error) {
      setStars(newStars);
    }

    await saveCards(cards);
    await loadCards();
    setOpenedPack(cards);
    setModalVisible(true);
  };

  const saveCards = async (cards: Card[]) => {
    const updates: Record<number, number> = {};

    for (const card of cards) {
      updates[card.id] = (updates[card.id] || 0) + 1;
    }

    for (const [id, amountToAdd] of Object.entries(updates)) {
      const { data, error } = await supabase
        .from("card_collection")
        .select("amount")
        .eq("card_id", Number(id))
        .single();

      if (error) {
        console.log("fetch error:", error.message);
        continue;
      }

      const newAmount = (data?.amount || 0) + amountToAdd;

      const { error: updateError } = await supabase
        .from("card_collection")
        .update({ amount: newAmount })
        .eq("card_id", Number(id));

      if (updateError) {
        console.log("update error:", updateError.message);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? "light"].mainBackground,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        paddingTop: 40,
      }}
    >
      <View
        style={{
          width: 350,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={[
            styles.contentBox,
            {
              width: 170,
              height: 80,
              backgroundColor: StaticColors.starYellow,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 60,
              padding: 7,
              gap: 5,
            },
          ]}
        >
          <IconSymbol
            size={50}
            name="star"
            color={Colors[colorScheme ?? "light"].iconDefault}
          />
          <View style={{ alignItems: "center" }}>
            <Text
              style={[styles.baseText, { fontSize: 20, fontWeight: "bold" }]}
            >
              {stars} Stars
            </Text>
          </View>
        </View>

        <Pressable onPress={openPack}>
          <View
            style={[
              styles.contentBox,
              {
                width: 170,
                height: 80,
                backgroundColor: StaticColors.buttonBlue,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 60,
                padding: 7,
              },
            ]}
          >
            <Text
              style={[styles.baseText, { fontSize: 15, fontWeight: "bold" }]}
            >
              {stars >= PACK_STARCOST
                ? `Open Pack (${PACK_STARCOST} stars)`
                : `Need ${PACK_STARCOST - stars} more stars`}
            </Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.contentBox}>
        <Text style={styles.headerText}>Bike Card Collection</Text>

        <FlatList
          data={collection}
          keyExtractor={(item) => item.id.toString()}
          numColumns={4}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ gap: 7 }}
          renderItem={({ item }) => <CardElement card={item} />}
        />
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.contentBox}>
            <Text
              style={[styles.baseText, { fontSize: 25, fontWeight: "bold" }]}
            >
              You got:
            </Text>

            {openedPack.map((card, index) => {
              const rarity = rarityStyleMap[card.rarity];
              return (
                <View key={index} style={{ flexDirection: "row", gap: 10 }}>
                  <Text style={styles.baseText}>
                    {card.brand} {card.model}
                  </Text>
                  <View
                    style={{
                      backgroundColor: rarity.main,
                      borderColor: rarity.tint,
                      borderWidth: 5,
                      borderRadius: 15,
                      padding: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: rarity.text,
                        fontWeight: "bold",
                      }}
                    >
                      {card.rarity}
                    </Text>
                  </View>
                </View>
              );
            })}

            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={{ fontSize: 16, color: "blue" }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
