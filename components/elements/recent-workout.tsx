import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { supabase } from "../../utils/supabase";

type Workout = {
  id: number;
  date: string;
  distance: number;
  calories: number;
  time: number;
};

export default function RecentWorkout() {
  const colorScheme = useColorScheme();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const iconSize = 30;

  const styles = StyleSheet.create({
    headerText: {
      fontSize: 19,
      fontWeight: "bold",
      color: Colors[colorScheme ?? "light"].text,
    },
    baseText: {
      fontSize: 18,
      color: Colors[colorScheme ?? "light"].text,
    },
    smallHighlight: {
      backgroundColor: Colors[colorScheme ?? "light"].contentBorder,
      borderRadius: 10,
      width: 155,
      height: 30,
      alignItems: "center",
      justifyContent: "center",
    },
    row: {
      flex: 1,
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
    },
  });

  useEffect(() => {
    const getRecentWorkout = async () => {
      try {
        const { data: workout, error } = await supabase
          .from("workouts")
          .select()
          .order("date", { ascending: false })
          .limit(1)
          .single();

        if (error) {
          console.error("Error fetching workout:", error.message);
          return;
        }

        setWorkout(workout);
      } catch (error: any) {
        console.error("Error fetching workout:", error.message);
      }
    };

    getRecentWorkout();
  }, []);

  return (
    <View
      style={{
        flex: 0.5,
        backgroundColor: Colors[colorScheme ?? "light"].contentBackground,
        borderColor: Colors[colorScheme ?? "light"].contentBorder,
        borderWidth: 5,
        borderRadius: 20,
        padding: 10,
        gap: 10,
      }}
    >
      <View style={styles.smallHighlight}>
        <Text style={styles.headerText}>Recent Workout</Text>
      </View>

      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1.5 }}>
          <View style={styles.row}>
            <IconSymbol
              size={iconSize}
              name="arrow.swap"
              color={Colors[colorScheme ?? "light"].iconDefault}
            />
            <Text style={styles.baseText}>
              {workout ? `${workout.distance}` : "N/A"} Miles
            </Text>
          </View>
          <View style={styles.row}>
            <IconSymbol
              size={iconSize}
              name="flame.fill"
              color={Colors[colorScheme ?? "light"].iconDefault}
            />
            <Text style={styles.baseText}>
              {workout ? `${workout.calories}` : "N/A"} Calories
            </Text>
          </View>
          <View style={styles.row}>
            <IconSymbol
              size={iconSize}
              name="stopwatch"
              color={Colors[colorScheme ?? "light"].iconDefault}
            />
            <Text style={styles.baseText}>
              {workout ? `${workout.time}` : "N/A"} Minutes
            </Text>
          </View>
        </View>
        <View style={{ flex: 1.4 }}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <IconSymbol
              size={40}
              name="calendar"
              color={Colors[colorScheme ?? "light"].iconDefault}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text style={[styles.baseText, { fontSize: 15 }]}>
              {workout
                ? new Date(workout.date).toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "N/A"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
