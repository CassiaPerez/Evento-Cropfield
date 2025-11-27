import { GoogleGenAI, Type } from "@google/genai";
import { GeminiBadgeResponse } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize Gemini
// Note: In a real production app, API keys should not be exposed on the client.
// This is for demonstration purposes within the specified environment.
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateGuestPersona = async (name: string): Promise<GeminiBadgeResponse> => {
  if (!ai) {
    // Fallback if no API key is present (mock mode for UI testing if needed, though strictly we should use the key)
    console.warn("Gemini API Key missing. Returning fallback data.");
    return {
      role: "Participante VIP",
      welcomeMessage: `Bem-vindo ao evento, ${name}! Prepare-se para uma experiência incrível.`,
      emoji: "🎉"
    };
  }

  try {
    const prompt = `
      Um convidado chamado "${name}" acabou de fazer check-in em um evento de tecnologia e inovação futurista.
      Gere um "cargo fictício e divertido" para ele (ex: "Mago do Código", "Explorador de Ideias", "Visionário Quântico"),
      uma mensagem curta de boas-vindas (máx 15 palavras) e um emoji que combine com a vibe.
      Responda estritamente em JSON.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            role: { type: Type.STRING },
            welcomeMessage: { type: Type.STRING },
            emoji: { type: Type.STRING },
          },
          required: ["role", "welcomeMessage", "emoji"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as GeminiBadgeResponse;

  } catch (error) {
    console.error("Error generating persona:", error);
    // Fallback on error
    return {
      role: "Visitante Ilustre",
      welcomeMessage: `Olá, ${name}! Ótimo ter você conosco.`,
      emoji: "👋"
    };
  }
};
