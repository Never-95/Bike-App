import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Image, StyleSheet, Text, View } from "react-native";

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
      color: Colors[colorScheme ?? "light"].text,
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
    row: {
      flex: 1,
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
    },
  });

  const iconSize = 28;

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
            <Text style={styles.baseText}>5.5 Miles</Text>
          </View>
          <View style={styles.row}>
            <IconSymbol
              size={iconSize}
              name="flame.fill"
              color={Colors[colorScheme ?? "light"].iconDefault}
            />
            <Text style={styles.baseText}>302 Calories</Text>
          </View>
          <View style={styles.row}>
            <IconSymbol
              size={iconSize}
              name="stopwatch"
              color={Colors[colorScheme ?? "light"].iconDefault}
            />
            <Text style={styles.baseText}>32 Minutes</Text>
          </View>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Text style={styles.baseText}>13th January 2026</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Image
            source={require("../../assets/images/react-logo.png")}
            height={150}
          />
        </View>
      </View>
    </View>
  );
}
