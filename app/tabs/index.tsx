import RecentWorkout from "@/components/elements/recent-workout";
import WeekActivity from "@/components/elements/week-activity";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { supabase } from "../../utils/supabase";

type Todo = {
  id: number;
  name: string;
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const { data: todos, error } = await supabase.from("todos").select();

        if (error) {
          console.error("Error fetching todos:", error.message);
          return;
        }

        if (todos && todos.length > 0) {
          setTodos(todos);
        }
      } catch (error: any) {
        console.error("Error fetching todos:", error.message);
      }
    };

    getTodos();
  }, []);

  const styles = StyleSheet.create({
    headerText: {
      fontSize: 30,
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
        paddingBottom: 30,
      }}
    >
      <View
        style={{
          flex: 0.2,
          justifyContent: "center",
        }}
      >
        <Text style={styles.headerText}>Welcome Matthew!</Text>
      </View>
      <View
        style={{
          flex: 0.8,
          width: 350,
          gap: 30,
        }}
      >
        <RecentWorkout />
        <WeekActivity />
      </View>
    </View>
  );
}
