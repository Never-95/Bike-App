import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const iconSize = 40;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].iconSelected,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].tabBackground,
          height: 85,
          paddingTop: 5,
        },
        tabBarIconStyle: {
          width: iconSize,
          height: iconSize,
        },
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].iconDefault,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={iconSize} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="game"
        options={{
          title: "Game",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={iconSize}
              name="gamecontroller.fill"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="addworkout"
        options={{
          title: "Add Workout",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={iconSize} name="plus" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={iconSize} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
