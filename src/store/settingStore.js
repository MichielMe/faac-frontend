// src/store/settingStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useSettingsStore = create(
  persist(
    (set) => ({
      voiceGender: "male", // 'male' or 'female'
      gridSize: 2, // Changed to 2 columns for larger, more attractive tiles
      language: "en",
      setVoiceGender: (gender) => set({ voiceGender: gender }),
      setGridSize: (size) => set({ gridSize: size }),
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
