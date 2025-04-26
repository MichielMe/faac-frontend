// app/settings.js
import React from "react";
import {
  View,
  Text,
  Form,
  Button,
  Select,
  YStack,
  XStack,
  Switch,
  Label,
} from "tamagui";
import { useSettingsStore } from "../src/store/settingStore";

export default function SettingsScreen() {
  const {
    voiceGender,
    gridSize,
    language,
    setVoiceGender,
    setGridSize,
    setLanguage,
  } = useSettingsStore();

  return (
    <View flex={1} padding="$4">
      <Text fontSize="$7" fontWeight="bold" marginBottom="$4">
        Settings
      </Text>

      <Form>
        <YStack space="$4">
          <XStack alignItems="center" space="$4">
            <Label width={100}>Voice Gender</Label>
            <Select
              value={voiceGender}
              onValueChange={setVoiceGender}
              items={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />
          </XStack>

          <XStack alignItems="center" space="$4">
            <Label width={100}>Grid Size</Label>
            <Select
              value={String(gridSize)}
              onValueChange={(value) => setGridSize(Number(value))}
              items={[
                { value: "2", label: "2x2" },
                { value: "3", label: "3x3" },
                { value: "4", label: "4x4" },
                { value: "5", label: "5x5" },
              ]}
            />
          </XStack>

          <XStack alignItems="center" space="$4">
            <Label width={100}>Language</Label>
            <Select
              value={language}
              onValueChange={setLanguage}
              items={[
                { value: "en", label: "English" },
                { value: "es", label: "Spanish" },
                // Add more languages as needed
              ]}
            />
          </XStack>
        </YStack>
      </Form>
    </View>
  );
}
