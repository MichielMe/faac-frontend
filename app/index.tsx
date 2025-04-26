// app/index.tsx
import React, { useState } from "react";
import {
  ActivityIndicator,
  ToastAndroid,
  Platform,
  Alert,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { View, Text } from "tamagui";
import { useQuery } from "@tanstack/react-query";
import { getKeywords, getKeywordWithAudio } from "../src/api/keywords";
import PictogramGrid from "../src/components/PictogramGrid";
import { useAudio } from "../src/hooks/useAudio";
import { Keyword } from "../src/types";

export default function HomeScreen() {
  const { playAudio, unloadSound, error: audioError } = useAudio();
  const [selectedKeyword, setSelectedKeyword] = useState<Keyword | null>(null);
  const [audioLoading, setAudioLoading] = useState(false);

  const {
    data: keywords,
    isLoading,
    error: apiError,
  } = useQuery({
    queryKey: ["keywords"],
    queryFn: getKeywords,
  });

  const handlePictogramPress = async (keyword: Keyword) => {
    setSelectedKeyword(keyword);
    setAudioLoading(true);

    try {
      // Fetch the complete keyword data with audio URLs
      const keywordWithAudio = await getKeywordWithAudio(keyword.name);

      if (keywordWithAudio) {
        // If we successfully got the data with audio, play it
        playAudio(keywordWithAudio);

        // Update the selected keyword with the complete data
        setSelectedKeyword(keywordWithAudio);

        // Show feedback about missing audio if needed
        if (
          !keywordWithAudio.voice_man_url &&
          !keywordWithAudio.voice_woman_url
        ) {
          showMessage(`No audio available for "${keywordWithAudio.name}"`);
        }
      } else {
        // If we couldn't get audio data, use the original keyword data
        playAudio(keyword);
        showMessage(`Could not fetch audio for "${keyword.name}"`);
      }
    } catch (error) {
      console.error("Error fetching audio:", error);
      showMessage(`Error loading audio for "${keyword.name}"`);
    } finally {
      setAudioLoading(false);
    }
  };

  // Helper function to show platform-specific messages
  const showMessage = (message: string) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      // For iOS
      Alert.alert("Audio Message", message);
    }
  };

  React.useEffect(() => {
    return () => {
      unloadSound();
    };
  }, [unloadSound]);

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#051024" }}>
        <StatusBar barStyle="light-content" backgroundColor="#051024" />
        <View
          flex={1}
          justifyContent="center"
          alignItems="center"
          backgroundColor="$backgroundStrong"
        >
          <ActivityIndicator size="large" color="$blue1" />
        </View>
      </SafeAreaView>
    );
  }

  if (apiError) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#051024" }}>
        <StatusBar barStyle="light-content" backgroundColor="#051024" />
        <View
          flex={1}
          justifyContent="center"
          alignItems="center"
          padding="$4"
          backgroundColor="$backgroundStrong"
        >
          <Text fontSize="$6" color="$red1" fontWeight="bold">
            Error loading pictograms
          </Text>
          <Text fontSize="$3" color="$color9" marginTop="$2">
            {(apiError as Error).message}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#051024" }}>
      <StatusBar barStyle="light-content" backgroundColor="#051024" />
      <PictogramGrid
        keywords={keywords}
        onPictogramPress={handlePictogramPress}
      />
    </SafeAreaView>
  );
}
