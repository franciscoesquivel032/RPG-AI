import { Injectable } from '@nestjs/common';
import axios from 'axios';


/**
 * Service to interact with the Gemini AI API for generating character content.
 */

@Injectable()
export class AIService {

    private readonly API_KEY: string = process.env.GEMINI_API_KEY || 'NO API KEY PROVIDED';
    private readonly API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.API_KEY}`;

  async sendPrompt(prompt: string): Promise<string> {
    try {
      const response = await axios.post(this.API_URL, {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      });
      return response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (error) {
      console.error('Error generating character: ', error);
      throw new Error('Error while generating character with AI');
    }
  }
}
