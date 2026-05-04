import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { supabase } from "../../utils/supabase";

export default function AddWorkoutScreen() {
  const colorScheme = useColorScheme();
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const parsedData = {
        ...data,
        distance: parseInt(data.distance) || 0,
        calories: parseInt(data.calories) || 0,
        time: parseInt(data.time) || 0,
      };

      console.log(parsedData);

      const { error } = await supabase.from("workouts").insert([
        {
          date: parsedData.date,
          distance: parsedData.distance,
          calories: parsedData.calories,
          time: parsedData.time,
        },
      ]);

      if (error) throw error;

      Alert.alert("Success", "Workout saved!");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong");
    }
  };
  const [image, setImage] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  const styles = StyleSheet.create({
    headerText: {
      fontSize: 30,
      fontWeight: "bold",
      color: Colors[colorScheme ?? "light"].text,
    },
    baseText: {
      fontSize: 22,
      color: Colors[colorScheme ?? "light"].text,
    },
    highlightText: {
      fontSize: 22,
      color: Colors[colorScheme ?? "light"].textHighlight,
    },
    row: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
    },
  });

  const iconSize = 50;

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
          height: 200,
          justifyContent: "center",
        }}
      >
        <Text style={styles.headerText}>Add Workout</Text>
      </View>

      <View
        style={{
          width: 350,
          backgroundColor: Colors[colorScheme ?? "light"].contentBackground,
          borderColor: Colors[colorScheme ?? "light"].contentBorder,
          borderWidth: 5,
          borderRadius: 20,
          padding: 20,
          gap: 20,
        }}
      >
        <Controller
          control={control}
          name="date"
          defaultValue={new Date()}
          render={({ field: { onChange, value } }) => (
            <View style={styles.row}>
              <IconSymbol
                size={iconSize}
                name="calendar"
                color={Colors[colorScheme ?? "light"].iconDefault}
              />
              {show && (
                <DateTimePicker
                  value={value}
                  mode="date"
                  onChange={(event, selectedDate) => {
                    setShow(false);

                    if (selectedDate) {
                      onChange(selectedDate);
                    }
                  }}
                />
              )}
              <Pressable onPress={() => setShow(true)}>
                <Text style={styles.highlightText}>{value.toDateString()}</Text>
              </Pressable>
            </View>
          )}
        />
        <Controller
          control={control}
          name="distance"
          defaultValue={0}
          render={({ field: { onChange, value } }) => (
            <View style={styles.row}>
              <IconSymbol
                size={iconSize}
                name="arrow.swap"
                color={Colors[colorScheme ?? "light"].iconDefault}
              />
              <TextInput
                style={styles.highlightText}
                value={String(value)}
                placeholder="0"
                keyboardType="numeric"
                onChangeText={(text) => {
                  if (text === "") {
                    onChange("");
                  } else {
                    onChange(text);
                  }
                }}
              />
              <Text style={styles.baseText}>Miles</Text>
            </View>
          )}
        />

        <Controller
          control={control}
          name="calories"
          defaultValue={0}
          render={({ field: { onChange, value } }) => (
            <View style={styles.row}>
              <IconSymbol
                size={iconSize}
                name="flame.fill"
                color={Colors[colorScheme ?? "light"].iconDefault}
              />
              <TextInput
                style={styles.highlightText}
                value={String(value)}
                placeholder="0"
                keyboardType="numeric"
                onChangeText={(text) => {
                  if (text === "") {
                    onChange("");
                  } else {
                    onChange(text);
                  }
                }}
              />
              <Text style={styles.baseText}>Calories</Text>
            </View>
          )}
        />

        <Controller
          control={control}
          name="time"
          defaultValue={0}
          render={({ field: { onChange, value } }) => (
            <View style={styles.row}>
              <IconSymbol
                size={iconSize}
                name="stopwatch"
                color={Colors[colorScheme ?? "light"].iconDefault}
              />
              <TextInput
                style={styles.highlightText}
                value={String(value)}
                placeholder="0"
                keyboardType="numeric"
                onChangeText={(text) => {
                  if (text === "") {
                    onChange("");
                  } else {
                    onChange(text);
                  }
                }}
              />
              <Text style={styles.baseText}>Minutes</Text>
            </View>
          )}
        />

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}
