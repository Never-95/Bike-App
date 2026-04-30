import RecentWorkout from "@/components/elements/recent-workout";
import WeekActivity from "@/components/elements/week-activity";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    headerText: {
      fontSize: 25,
      fontWeight: "bold",
      color: Colors[colorScheme ?? "light"].text,
    },
    baseText: {
      fontSize: 15,
      backgroundColor: Colors[colorScheme ?? "light"].text,
    },
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? "light"].mainBackground,
        alignItems: "center",
        paddingTop: 50,
        paddingBottom: 40,
      }}
    >
      <View
        style={{
          flex: 0.2,
          justifyContent: "center",
        }}
      >
        <Text style={styles.headerText}>Welcome (PUT NAME HERE)</Text>
      </View>

      <View
        style={{
          flex: 0.8,
          width: 320,
          gap: 30,
        }}
      >
        <RecentWorkout />
        <WeekActivity />
      </View>
    </View>
  );
}
