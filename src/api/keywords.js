// src/api/keywords.js
import apiClient from "./client";

export const getKeywords = async () => {
  try {
    const response = await apiClient.get("/keywords/");

    // Log the first item to inspect structure
    if (response.data && response.data.length > 0) {
      console.log(
        "Sample keyword data:",
        JSON.stringify(response.data[0], null, 2)
      );
    } else {
      console.log("Empty keywords response:", response.data);
    }

    // Add default values for missing fields
    const processedData = response.data.map((keyword) => ({
      ...keyword,
      pictogram_url:
        keyword.pictogram_url ||
        "https://via.placeholder.com/150?text=No+Image",
      voice_man_url: keyword.voice_man_url || null,
      voice_woman_url: keyword.voice_woman_url || null,
    }));

    return processedData;
  } catch (error) {
    console.error("Error fetching keywords:", error);
    // Return some fallback data to prevent app crashes
    return [];
  }
};

export const getKeywordByName = async (name) => {
  try {
    const response = await apiClient.get(`/keywords/name/${name}`);
    return {
      ...response.data,
      pictogram_url:
        response.data.pictogram_url ||
        "https://via.placeholder.com/150?text=No+Image",
      voice_man_url: response.data.voice_man_url || null,
      voice_woman_url: response.data.voice_woman_url || null,
    };
  } catch (error) {
    console.error(`Error fetching keyword by name (${name}):`, error);
    return null;
  }
};

export const getKeywordWithAudio = async (name) => {
  try {
    const response = await apiClient.get(`/keywords/audio/${name}`);
    return {
      ...response.data,
      pictogram_url:
        response.data.pictogram_url ||
        "https://via.placeholder.com/150?text=No+Image",
      voice_man_url: response.data.voice_man_url || null,
      voice_woman_url: response.data.voice_woman_url || null,
    };
  } catch (error) {
    console.error(`Error fetching keyword with audio (${name}):`, error);
    return null;
  }
};

export const getKeywordsByCategory = async (categoryId) => {
  try {
    const response = await apiClient.get(`/keywords/?category=${categoryId}`);

    // Add default values for missing fields
    const processedData = response.data.map((keyword) => ({
      ...keyword,
      pictogram_url:
        keyword.pictogram_url ||
        "https://via.placeholder.com/150?text=No+Image",
      voice_man_url: keyword.voice_man_url || null,
      voice_woman_url: keyword.voice_woman_url || null,
    }));

    return processedData;
  } catch (error) {
    console.error(
      `Error fetching keywords by category (${categoryId}):`,
      error
    );
    return [];
  }
};
