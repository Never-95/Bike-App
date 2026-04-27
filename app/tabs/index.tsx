import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#564b67",
      }}
    >
      <View
        style={{
          flex: 0.88,
        }}
      >
        <Text>Content</Text>
      </View>

      <View
        style={{
          flex: 0.12,
          flexDirection: "row",
          backgroundColor: "#2f2347",
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#5db74b",
          }}
        >
          <Text>Home</Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#a9b74b",
          }}
        >
          <Text>Game</Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#b76d4b",
          }}
        >
          <Text>Workout</Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#4b86b7",
          }}
        >
          <Text>Profile</Text>
        </View>
      </View>
    </View>
  );
}
