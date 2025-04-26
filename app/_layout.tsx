// app/_layout.js
import React from "react";
import { Stack } from "expo-router";
import { TamaguiProvider, Theme } from "tamagui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import config from "../tamagui.config";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

export default function Layout() {
  return (
    <TamaguiProvider config={config}>
      <Theme name="dark">
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="index"
              options={{
                title: "",
              }}
            />
            <Stack.Screen
              name="settings"
              options={{
                title: "Settings",
              }}
            />
          </Stack>
        </QueryClientProvider>
      </Theme>
    </TamaguiProvider>
  );
}
