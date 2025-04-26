import React, { useState } from "react";
import {
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { View, Text } from "tamagui";
import { Keyword } from "../types";

interface PictogramTileProps {
  keyword: Keyword;
  size: number;
  onPress: () => void;
}

const PictogramTile: React.FC<PictogramTileProps> = ({
  keyword,
  size,
  onPress,
}) => {
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPressed, setIsPressed] = useState(false);

  // Enhanced handler to ensure audio plays
  const handlePress = () => {
    setIsPressed(true);
    onPress();
    // Reset the pressed state after a short delay for visual feedback
    setTimeout(() => setIsPressed(false), 150);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={[
        styles.container,
        {
          width: size,
          height: size * 1.15,
          margin: 12,
          transform: [{ scale: isPressed ? 0.96 : 1 }],
        },
      ]}
    >
      <View
        style={[
          styles.card,
          {
            borderColor: isPressed
              ? "rgba(56,189,248,0.4)"
              : "rgba(255,255,255,0.1)",
          },
        ]}
      >
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#38bdf8" />
          </View>
        )}

        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: imageError
                ? "https://via.placeholder.com/150?text=No+Image"
                : keyword.pictogram_url,
            }}
            style={{
              width: size * 0.65,
              height: size * 0.65,
              opacity: 0.95,
            }}
            resizeMode="contain"
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onError={() => {
              setImageError(true);
              setLoading(false);
            }}
          />
        </View>
        <View style={styles.labelContainer}>
          <Text
            fontSize={Math.max(size * 0.14, 16)}
            color="$blue1"
            textAlign="center"
            fontWeight="600"
            letterSpacing={0.5}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {keyword.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  card: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#1e293b",
    borderWidth: 1,
  },
  loadingContainer: {
    position: "absolute",
    width: "100%",
    height: "75%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  imageContainer: {
    backgroundColor: "#020617",
    width: "100%",
    height: "75%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  labelContainer: {
    backgroundColor: "#0f172a",
    width: "100%",
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
});

export default PictogramTile;
