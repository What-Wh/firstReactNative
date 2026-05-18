import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="about">
        <Icon sf="info.circle.fill" drawable="custom_settings_drawable" />
        <Label>About</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}