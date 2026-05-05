import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors, StaticColors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { supabase } from "../../utils/supabase";

type Workout = {
  id: number;
  date: string;
  distance: number;
  calories: number;
  time: number;
};

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const [stars, setStars] = useState(0);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const totalDistance = workouts.reduce((sum, w) => sum + w.distance, 0);
  const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);
  const totalTime = workouts.reduce((sum, w) => sum + w.time, 0);
  const iconSize = 40;

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
    // "background" of progress bar that isn't filled
    progressBarContainer: {
      width: 350,
      height: 100,
      backgroundColor: "#232323",
      borderColor: Colors[colorScheme ?? "light"].contentBorder,
      borderWidth: 5,
      borderRadius: 60,
      overflow: "hidden",
    },
    // filled part to represent xp gain through level
    progressBarFill: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      backgroundColor: StaticColors.levelOrange,
      borderRadius: 60,
    },
    // for the text to overlay correctly over the progress bar
    progressContent: {
      position: "absolute",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    smallHighlight: {
      backgroundColor: Colors[colorScheme ?? "light"].contentBorder,
      borderRadius: 10,
      width: 220,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    row: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
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

  useFocusEffect(
    useCallback(() => {
      const getAllWorkouts = async () => {
        try {
          const { data: workouts, error } = await supabase
            .from("workouts")
            .select("*");

          if (error) {
            console.error("Error fetching workouts:", error.message);
            return;
          }

          setWorkouts(workouts || []);
        } catch (error: any) {
          console.error("Error fetching workouts:", error.message);
        }
      };

      getAllWorkouts();
    }, []),
  );

  const activeDays = new Set(workouts.map((w) => w.date)).size;

  let level = 1;
  let daysUsed = 0;

  while (true) {
    const needed = level * 3;

    if (activeDays < daysUsed + needed) break;

    daysUsed += needed;
    level++;
  }

  const currentXP = activeDays - daysUsed;
  const maxXP = level * 3;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? "light"].mainBackground,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        paddingTop: 50,
      }}
    >
      <View
        style={[
          styles.contentBox,
          {
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            borderRadius: 80,
            padding: 7,
            height: 150,
            gap: 10,
          },
        ]}
      >
        <IconSymbol
          size={80}
          name="person.fill"
          color={Colors[colorScheme ?? "light"].iconDefault}
        />
        <Text style={[styles.baseText, { fontSize: 30 }]}>Matthew Smith</Text>
      </View>

      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${(currentXP / maxXP) * 100}%` },
          ]}
        />
        <View style={styles.progressContent}>
          <Text style={{ fontSize: 30, color: "#fff" }}>Level {level}</Text>
          <Text style={{ fontSize: 17, color: "#fff" }}>
            {currentXP}/{maxXP} Active days to level up
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.contentBox,
          {
            backgroundColor: StaticColors.starYellow,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 60,
            padding: 7,
          },
        ]}
      >
        <IconSymbol
          size={80}
          name="star"
          color={Colors[colorScheme ?? "light"].iconDefault}
        />
        <View style={{ alignItems: "center" }}>
          <Text style={[styles.baseText, { fontSize: 30 }]}>{stars} Stars</Text>
        </View>
      </View>

      <View style={styles.contentBox}>
        <View style={styles.smallHighlight}>
          <Text style={styles.headerText}>Lifetime Statistics</Text>
        </View>
        <View style={styles.row}>
          <IconSymbol
            size={iconSize}
            name="arrow.swap"
            color={Colors[colorScheme ?? "light"].iconDefault}
          />
          <Text style={styles.baseText}>
            {totalDistance ? `${totalDistance}` : "N/A"} Miles
          </Text>
        </View>
        <View style={styles.row}>
          <IconSymbol
            size={iconSize}
            name="flame.fill"
            color={Colors[colorScheme ?? "light"].iconDefault}
          />
          <Text style={styles.baseText}>
            {totalCalories ? `${totalCalories}` : "N/A"} Calories
          </Text>
        </View>
        <View style={styles.row}>
          <IconSymbol
            size={iconSize}
            name="stopwatch"
            color={Colors[colorScheme ?? "light"].iconDefault}
          />
          <Text style={styles.baseText}>
            {totalTime ? `${totalTime}` : "N/A"} Minutes
          </Text>
        </View>
      </View>
    </View>
  );
}
