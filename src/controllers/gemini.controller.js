import { analyzeEmotion } from '../services/gemini.service.js';

export const emotionAnalyzer = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Text mandatory." });

    const result = await analyzeEmotion(text);
    res.json(result);
  } catch (error) {
    if (error.response) {
      next(new Error(`Error de la API: ${error.response.status} - ${error.response.data.error?.message}`));
    } else if (error.request) {
      next(new Error("No hubo respuesta de la API."));
    } else {
      next(new Error("Error en la configuración de la solicitud."));
    }
  }
}