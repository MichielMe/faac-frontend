import { useRef, useCallback, useState } from "react";
import { Audio } from "expo-av";
import { useSettingsStore } from "../store/settingStore";
import { Keyword } from "../types";
import { Platform } from "react-native";

export const useAudio = () => {
  const sound = useRef(new Audio.Sound());
  const { voiceGender } = useSettingsStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidAudioUrl = (url: string | null | undefined): boolean => {
    if (!url) return false;

    // Check if URL is properly formatted
    try {
      new URL(url);

      // Verify it's an audio file
      const lowerUrl = url.toLowerCase();
      return (
        lowerUrl.endsWith(".mp3") ||
        lowerUrl.endsWith(".wav") ||
        lowerUrl.endsWith(".m4a") ||
        lowerUrl.includes("audio")
      );
    } catch (e) {
      return false;
    }
  };

  const playAudio = useCallback(
    async (keywordData: Keyword) => {
      try {
        if (isLoading) {
          console.log("Sound is still loading, please wait");
          return;
        }

        setError(null);

        const audioUrl =
          voiceGender === "male"
            ? keywordData.voice_man_url
            : keywordData.voice_woman_url;

        if (!isValidAudioUrl(audioUrl)) {
          const message = `No audio available for "${keywordData.name}" (${voiceGender} voice)`;
          console.warn(message);
          setError(message);
          return;
        }

        // For debugging
        console.log(`Playing audio: ${audioUrl} for "${keywordData.name}"`);

        setIsLoading(true);

        // First unload any current sound
        try {
          const status = await sound.current.getStatusAsync();
          if (status.isLoaded) {
            await sound.current.unloadAsync();
          }
        } catch (e) {
          // If unloading fails, create a new Sound instance
          sound.current = new Audio.Sound();
        }

        // Configure audio mode for better playback
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
          allowsRecordingIOS: false,
        });

        // Load and play the new sound
        await sound.current.loadAsync({ uri: audioUrl as string });
        await sound.current.playAsync();
      } catch (error) {
        const errorMessage = `Error playing audio: ${
          error instanceof Error ? error.message : String(error)
        }`;
        console.error(errorMessage);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [voiceGender, isLoading]
  );

  // Clean up when component unmounts
  const unloadSound = useCallback(async () => {
    try {
      const status = await sound.current.getStatusAsync();
      if (status.isLoaded) {
        await sound.current.unloadAsync();
      }
    } catch (e) {
      console.log("Error unloading sound:", e);
    }
  }, []);

  return {
    playAudio,
    unloadSound,
    isPlaying: isLoading,
    error,
  };
};
