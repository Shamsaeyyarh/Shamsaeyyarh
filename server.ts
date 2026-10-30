import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Initialize Gemini SDK with User-Agent header as required
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Server-side AI Agricultural Advisory Route
app.post('/api/gemini/advisor', async (req, res) => {
  try {
    const { prompt, crop, state, userRole } = req.body;

    if (!ai) {
      return res.json({
        success: true,
        source: 'local_intelligence',
        text: `Based on current Nigerian harvest cycles in ${state || 'Nigeria'}, direct farmgate selling for ${crop || 'foodstuffs'} reduces middlemen deductions by 25–35%. Ensure prompt cold-chain or ventilated bagging to prevent transit spoilage.`,
      });
    }

    const systemInstruction = `You are HackAgrifest AI, a leading agricultural economist and agronomist specialized in Nigerian agriculture, farmgate economics, and post-harvest supply chains.
The user is a ${userRole === 'farmer' ? 'Nigerian Farmer' : 'Direct Produce Buyer'}.
Provide practical, actionable advice with authentic Nigerian market context (e.g. Mile 12 Lagos, Bodija Ibadan, Dawanau Kano, Relief Market Onitsha).
Focus on:
1. Fair farmgate price recommendations in Nigerian Naira (₦).
2. Elimination of exploitative middlemen markups.
3. Post-harvest loss mitigation (spoilage prevention, storage, bagging).
4. Recommended logistics and cold-chain timing.
Keep answers concise, formatted with clear bullet points, bold keywords, and warm professional tone.`;

    const userMessage = prompt || `Provide current harvest pricing, direct selling advice, and spoilage prevention tips for ${crop || 'crops'} produced in ${state || 'Nigeria'}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userMessage,
      config: {
        systemInstruction,
      },
    });

    res.json({
      success: true,
      source: 'gemini_api',
      text: response.text,
    });
  } catch (error: any) {
    console.error('Gemini API Error in /api/gemini/advisor:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate agricultural advisory',
    });
  }
});

// Mount Vite middleware for SPA
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  const port = process.env.PORT || 3000;

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`HackAgrifest fullstack server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
