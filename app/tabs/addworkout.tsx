import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";

export default function AddWorkoutScreen() {
  const colorScheme = useColorScheme();
  const { control, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);
  const [image, setImage] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const styles = StyleSheet.create({
    headerText: {
      fontSize: 30,
      fontWeight: "bold",
      color: Colors[colorScheme ?? "light"].text,
    },
    baseText: {
      fontSize: 16,
      color: Colors[colorScheme ?? "light"].text,
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
        <Text style={styles.headerText}>Add Workout</Text>
      </View>

      <View
        style={{
          flex: 0.8,
          width: 350,
          backgroundColor: Colors[colorScheme ?? "light"].contentBackground,
          borderColor: Colors[colorScheme ?? "light"].contentBorder,
          borderWidth: 5,
          borderRadius: 20,
          padding: 10,
          gap: 10,
        }}
      >
        <Controller
          control={control}
          name="image"
          render={({ field: { onChange, value } }) => (
            <View>
              <Button
                title="Pick an image from camera roll"
                onPress={pickImage}
              />
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200 }}
                />
              )}
            </View>
          )}
        />
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <View>
              <Button title="Pick Date" onPress={() => setShow(true)} />
              {show && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  onChange={(event, selectedDate) => {
                    setShow(false);
                    if (selectedDate) setDate(selectedDate);
                  }}
                />
              )}
            </View>
          )}
        />

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />

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
        </View>
      </View>
    </View>
  );
}
