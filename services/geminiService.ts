import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateImpactStory = async (donationType: string, itemDescription: string): Promise<string> => {
  if (!apiKey) {
    return "Thank you! Your donation will bring smiles to many faces. (AI Impact story unavailable without API Key)";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short, heartwarming, and specific impact story (max 2 sentences) describing how a donation of "${itemDescription}" in the category of "${donationType}" helps an underprivileged child or family. Make the donor feel the immediate positive effect of their action. Do not use markdown.`,
    });
    return response.text || "Your donation makes a world of difference.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Your generic contribution is vital to our mission.";
  }
};

export const suggestNgoMatch = async (items: string, location: string): Promise<string> => {
  if (!apiKey) return "EduCare Foundation"; // Fallback

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `I have a donation of: ${items} in ${location}. Suggest a fictional but realistic NGO name that would be the best match for this, and explain why in 10 words. Format: "Name: Reason".`,
    });
    return response.text || "Community Aid Center: General support.";
  } catch (error) {
    return "Local Community Support";
  }
};
