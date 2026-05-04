import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { StyleSheet, Text, View } from "react-native";

export default function WeekActivity() {
  const colorScheme = useColorScheme();

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
      color: Colors[colorScheme ?? "light"].best,
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
  });

  const iconSize = 30;

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
            <Text style={styles.baseText}>5.5 Miles</Text>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <IconSymbol
              size={iconSize}
              name="flame.fill"
              color={Colors[colorScheme ?? "light"].iconDefault}
            />
            <Text style={styles.baseText}>5.5 Miles</Text>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <IconSymbol
              size={iconSize}
              name="stopwatch"
              color={Colors[colorScheme ?? "light"].iconDefault}
            />
            <Text style={styles.baseText}>5.5 Miles</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={[styles.smallHighlight, { width: 85 }]}>
          <Text style={styles.headerText}>Activity</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row", gap: 5, paddingTop: 10 }}>
          <View style={styles.dayDefault}>
            <Text style={styles.dayTextDefault}>M</Text>
          </View>
          <View style={styles.dayHighlight}>
            <Text style={styles.dayTextHighlight}>Tu</Text>
          </View>
          <View style={styles.dayDefault}>
            <Text style={styles.dayTextDefault}>W</Text>
          </View>
          <View style={styles.dayDefault}>
            <Text style={styles.dayTextDefault}>Th</Text>
          </View>
          <View style={styles.dayDefault}>
            <Text style={styles.dayTextDefault}>F</Text>
          </View>
          <View style={styles.dayHighlight}>
            <Text style={styles.dayTextHighlight}>Sa</Text>
          </View>
          <View style={styles.dayDefault}>
            <Text style={styles.dayTextDefault}>Su</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, gap: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View style={[styles.smallHighlight, { width: 100 }]}>
            <Text style={styles.headerText}>Best day:</Text>
          </View>
          <Text style={styles.headerText}>30th September</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <IconSymbol
              size={iconSize}
              name="arrow.swap"
              color={Colors[colorScheme ?? "light"].best}
            />
            <Text style={styles.bestText}>5.5 Miles</Text>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <IconSymbol
              size={iconSize}
              name="flame.fill"
              color={Colors[colorScheme ?? "light"].best}
            />
            <Text style={styles.bestText}>5.5 Miles</Text>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <IconSymbol
              size={iconSize}
              name="stopwatch"
              color={Colors[colorScheme ?? "light"].best}
            />
            <Text style={styles.bestText}>5.5 Miles</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
