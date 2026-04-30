import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { StyleSheet, Text, View } from "react-native";

export default function RecentWorkout() {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    headerText: {
      fontSize: 19,
      fontWeight: "bold",
      color: Colors[colorScheme ?? "light"].text,
    },
    baseText: {
      fontSize: 15,
      backgroundColor: Colors[colorScheme ?? "light"].text,
    },
    smallHighlight: {
      backgroundColor: Colors[colorScheme ?? "light"].contentBorder,
      borderRadius: 10,
      padding: 8,
      width: 160,
      height: 45,
      alignItems: "center",
      justifyContent: "center",
    },
  });

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

      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 2 }}>
          <IconSymbol
            size={20}
            name="arrow.swap"
            color={Colors[colorScheme ?? "light"].iconDefault}
          />
          <Text>5.5 Miles</Text>
          <Text>302 Calories</Text>
          <Text>32 Minutes</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>Picture</Text>
        </View>
      </View>
    </View>
  );
}
