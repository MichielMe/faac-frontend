import React from "react";
import { FlatList, Dimensions, Platform, StatusBar } from "react-native";
import { View } from "tamagui";
import PictogramTile from "./PictogramTile";
import { useSettingsStore } from "../store/settingStore";
import { Keyword } from "../types";

interface PictogramGridProps {
  keywords: Keyword[];
  onPictogramPress: (keyword: Keyword) => void;
}

const PictogramGrid: React.FC<PictogramGridProps> = ({
  keywords,
  onPictogramPress,
}) => {
  const { gridSize } = useSettingsStore();
  const screenWidth = Dimensions.get("window").width;

  // Calculate status bar height for proper top spacing
  const statusBarHeight =
    Platform.OS === "ios" ? 44 : StatusBar.currentHeight || 0;
  const topPadding = statusBarHeight + 15;

  // Calculate tile size with appropriate spacing for a professional grid
  const horizontalMargin = 24; // Margin on sides of screen
  const tileMargin = 8; // Margin around each tile (will be doubled between tiles)
  const availableWidth = screenWidth - horizontalMargin * 2;
  const tileWidth = availableWidth / gridSize - tileMargin * 2;

  // Filter out any keywords without names (if any)
  const validKeywords =
    keywords?.filter((keyword) => keyword && keyword.name) || [];

  return (
    <View flex={1} backgroundColor="$background">
      <FlatList
        data={validKeywords}
        renderItem={({ item }) => (
          <PictogramTile
            keyword={item}
            size={tileWidth}
            onPress={() => onPictogramPress(item)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={gridSize}
        contentContainerStyle={{
          paddingTop: topPadding,
          paddingBottom: 120, // Add bottom padding for better scrolling experience
          paddingHorizontal: horizontalMargin - tileMargin, // Account for tile margins
        }}
        columnWrapperStyle={{
          justifyContent: "space-evenly",
        }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={gridSize * 4}
        maxToRenderPerBatch={gridSize * 5}
        windowSize={7}
      />
    </View>
  );
};

export default PictogramGrid;
