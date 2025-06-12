import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GoogleGenAI } from '@google/genai';
/**
 * Service to interact with the Gemini AI API for generating character content.
 */

@Injectable()
export class AIService {
  private readonly API_KEY: string = process.env.GEMINI_API_KEY || 'NO API KEY PROVIDED';
  private readonly AI = new GoogleGenAI({ apiKey: this.API_KEY });

  /**
   * Generates text content based on the provided prompt using the Gemini AI API.
   * @param prompt - The input text prompt to generate content from.
   * @returns A promise that resolves to the generated text.
   */
  async textToText(prompt: string) : Promise<string> {
    const response = await this.AI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });
    return response.text ?? 'No response text available';
  }
}
