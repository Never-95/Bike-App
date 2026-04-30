import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Text, View } from "react-native";

export default function WeekActivity() {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? "light"].contentBackground,
        borderColor: Colors[colorScheme ?? "light"].contentBorder,
        borderWidth: 5,
        borderRadius: 20,
        padding: 10,
      }}
    >
      <Text>Week Activity</Text>
    </View>
  );
}
