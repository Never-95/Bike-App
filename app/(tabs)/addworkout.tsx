import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors, StaticColors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
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

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const updateStars = async (earnedStars: number) => {
    const { data, error: fetchError } = await supabase
      .from("stars")
      .select("star_amount")
      .single();

    if (fetchError || !data) {
      console.log("Fetching stars error:", fetchError?.message);
      return;
    }

    const newTotalStars = data.star_amount + earnedStars;

    const { error: updateError } = await supabase
      .from("stars")
      .update({ star_amount: newTotalStars })
      .eq("id", 1);

    if (updateError) {
      console.log("Update stars error:", updateError.message);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const parsedData = {
        ...data,
        distance: parseInt(data.distance) || 0,
        calories: parseInt(data.calories) || 0,
        time: parseInt(data.time) || 0,
      };

      const { error } = await supabase.from("workouts").insert([
        {
          date: formatDate(parsedData.date),
          distance: parsedData.distance,
          calories: parsedData.calories,
          time: parsedData.time,
        },
      ]);

      if (error) throw error;

      await updateStars(parsedData.distance);

      Alert.alert("Success", "Workout saved!");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong");
    }
  };

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

        <Pressable onPress={handleSubmit(onSubmit)}>
          <View
            style={{
              backgroundColor: StaticColors.buttonBlue,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 5,
              borderRadius: 20,
              borderColor: Colors[colorScheme ?? "light"].contentBorder,
              padding: 7,
            }}
          >
            <Text
              style={[styles.baseText, { fontSize: 20, fontWeight: "bold" }]}
            >
              Submit
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
