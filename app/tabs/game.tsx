import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Text, View } from "react-native";

export default function GameScreen() {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? "light"].contentBackground,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Game Screen</Text>
    </View>
  );
}
