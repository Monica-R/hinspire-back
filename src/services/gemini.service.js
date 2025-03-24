import dotenv from 'dotenv';
import axios from 'axios';
import { text } from 'express';

dotenv.config(); // Cargamos las variables de entorno

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export const analyzeEmotion = async (textContent) => {
  try {
    const contextPrompt = `You are an expert in collaborative storytelling and emotional analysis for stories. 
Analyze the following excerpt and describe the tone and main emotion: ${textContent}`;
    const response = await axios.post(GEMINI_API_URL, {
      contents: [{
        parts:[{text: contextPrompt}]
      }]
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al analizar el tono:', error.response?.data || error.message);
    throw new Error('Error al procesar la solicitud de IA.');
  }
}