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

export default function WeekActivity() {
  const colorScheme = useColorScheme();
  const iconSize = 30;

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const totalDistance = workouts.reduce((sum, w) => sum + w.distance, 0);
  const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);
  const totalTime = workouts.reduce((sum, w) => sum + w.time, 0);
  const activityByDay = [0, 0, 0, 0, 0, 0, 0];

  const styles = StyleSheet.create({
    headerText: {
      fontSize: 19,
      fontWeight: "bold",
      color: Colors[colorScheme ?? "light"].text,
    },
    baseText: {
      fontSize: 16,
      color: Colors[colorScheme ?? "light"].text,
    },
    bestText: {
      fontSize: 16,
      color: StaticColors.best,
    },
    smallHighlight: {
      backgroundColor: Colors[colorScheme ?? "light"].contentBorder,
      borderRadius: 10,
      width: 135,
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
    dayDefault: {
      flex: 1,
      backgroundColor: "#afa8b3",
      borderColor: "#000000",
      borderWidth: 3,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      height: 50,
    },
    dayTextDefault: {
      fontSize: 20,
      color: Colors[colorScheme ?? "light"].text,
      fontWeight: "bold",
    },
    dayHighlight: {
      flex: 1,
      backgroundColor: Colors[colorScheme ?? "light"].iconSelected,
      borderColor: "#000000",
      borderWidth: 3,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      height: 50,
    },
    dayTextHighlight: {
      fontSize: 20,
      color: Colors[colorScheme ?? "light"].textOpposite,
      fontWeight: "bold",
    },
    dayFuture: {
      flex: 1,
      backgroundColor: "#5a575b",
      borderColor: "#000000",
      borderWidth: 3,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      height: 50,
    },
    dayToday: {
      flex: 1,
      backgroundColor: "#afa8b3",
      borderColor: "#ffffff",
      borderWidth: 3,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      height: 50,
    },
    dayTodayHighlight: {
      flex: 1,
      backgroundColor: Colors[colorScheme ?? "light"].iconSelected,
      borderColor: "#ffffff",
      borderWidth: 3,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      height: 50,
    },
  });

  const getWeekRange = () => {
    const now = new Date();
    //starts from Sunday as 0
    const day = now.getDay();

    const diffToMonday = day === 0 ? -6 : 1 - day;

    const start = new Date(now);
    start.setDate(now.getDate() + diffToMonday);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);

    return { start, end };
  };

  useFocusEffect(
    useCallback(() => {
      const getWeeklyWorkouts = async () => {
        const { start, end } = getWeekRange();

        const { data, error } = await supabase
          .from("workouts")
          .select("*")
          .gte("date", start.toISOString())
          .lte("date", end.toISOString())
          .order("date", { ascending: true });

        if (error) {
          console.error(error);
          return;
        }

        setWorkouts(data || []);
        console.log("Week activity fetch", workouts);
      };

      getWeeklyWorkouts();
    }, []),
  );

  workouts.forEach((w) => {
    const d = new Date(w.date);
    let day = d.getDay();

    day = day === 0 ? 6 : day - 1;

    activityByDay[day] += w.distance;
    console.log("Activities:", activityByDay);
  });

  const hasActivity = (index: number) => activityByDay[index] > 0;

  const todayIndex = (() => {
    const d = new Date().getDay();
    return d === 0 ? 6 : d - 1;
  })();

  const getDayStyle = (index: number) => {
    if (index > todayIndex) return styles.dayFuture;
    if (index === todayIndex) {
      return hasActivity(index) ? styles.dayTodayHighlight : styles.dayToday;
    }
    return hasActivity(index) ? styles.dayHighlight : styles.dayDefault;
  };

  const getTextStyle = (index: number) => {
    if (index > todayIndex) return styles.dayTextDefault;
    return hasActivity(index) ? styles.dayTextHighlight : styles.dayTextDefault;
  };

  let bestDayIndex = 0;
  let max = 0;

  activityByDay.forEach((val, i) => {
    if (val > max) {
      max = val;
      bestDayIndex = i;
    }
  });

  const bestDayWorkouts = workouts.filter((w) => {
    const d = new Date(w.date);
    let day = d.getDay();
    day = day === 0 ? 6 : day - 1;
    return day === bestDayIndex;
  });

  const bestDayDate = bestDayWorkouts[0]?.date;

  const bestDayTotals = bestDayWorkouts.reduce(
    (acc, w) => {
      acc.distance += w.distance;
      acc.calories += w.calories;
      acc.time += w.time;
      return acc;
    },
    { distance: 0, calories: 0, time: 0 },
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? "light"].contentBackground,
        borderColor: Colors[colorScheme ?? "light"].contentBorder,
        borderWidth: 5,
        borderRadius: 20,
        padding: 10,
        gap: 5,
      }}
    >
      <View style={{ flex: 1, gap: 10 }}>
        <View style={styles.smallHighlight}>
          <Text style={styles.headerText}>Week Activity</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <IconSymbol
              size={iconSize}
              name="arrow.swap"
              color={Colors[colorScheme ?? "light"].iconDefault}
            />
            <Text style={styles.baseText}>
              {totalDistance ? `${totalDistance}` : "N/A"} Miles
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <IconSymbol
              size={iconSize}
              name="flame.fill"
              color={Colors[colorScheme ?? "light"].iconDefault}
            />
            <Text style={styles.baseText}>
              {totalCalories ? `${totalCalories}` : "N/A"} Calories
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
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
      <View style={{ flex: 1 }}>
        <View style={[styles.smallHighlight, { width: 120 }]}>
          <Text style={styles.headerText}>Day Activity</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row", gap: 5, paddingTop: 10 }}>
          <View style={getDayStyle(0)}>
            <Text style={getTextStyle(0)}>M</Text>
          </View>
          <View style={getDayStyle(1)}>
            <Text style={getTextStyle(1)}>Tu</Text>
          </View>
          <View style={getDayStyle(2)}>
            <Text style={getTextStyle(2)}>W</Text>
          </View>
          <View style={getDayStyle(3)}>
            <Text style={getTextStyle(3)}>Th</Text>
          </View>
          <View style={getDayStyle(4)}>
            <Text style={getTextStyle(4)}>F</Text>
          </View>
          <View style={getDayStyle(5)}>
            <Text style={getTextStyle(5)}>Sa</Text>
          </View>
          <View style={getDayStyle(6)}>
            <Text style={getTextStyle(6)}>Su</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, gap: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View style={[styles.smallHighlight, { width: 100 }]}>
            <Text style={styles.headerText}>Best day:</Text>
          </View>
          <Text style={styles.headerText}>
            {bestDayDate
              ? new Date(bestDayDate).toLocaleDateString("en-GB", {
                  weekday: "short",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "N/A"}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <IconSymbol
              size={iconSize}
              name="arrow.swap"
              color={StaticColors.best}
            />
            <Text style={styles.bestText}>{bestDayTotals.distance} Miles</Text>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <IconSymbol
              size={iconSize}
              name="flame.fill"
              color={StaticColors.best}
            />
            <Text style={styles.bestText}>
              {bestDayTotals.calories} Calories
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <IconSymbol
              size={iconSize}
              name="stopwatch"
              color={StaticColors.best}
            />
            <Text style={styles.bestText}>{bestDayTotals.time} Minutes</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
