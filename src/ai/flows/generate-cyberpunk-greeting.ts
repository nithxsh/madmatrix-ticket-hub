'use server';
/**
 * @fileOverview A Genkit flow to generate a unique, short, and thematic cyberpunk-style welcome message or quote.
 *
 * - generateCyberpunkGreeting - A function that handles the generation of the cyberpunk greeting.
 * - GenerateCyberpunkGreetingInput - The input type for the generateCyberpunkGreeting function.
 * - GenerateCyberpunkGreetingOutput - The return type for the generateCyberpunkGreeting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCyberpunkGreetingInputSchema = z.object({
  attendeeName: z.string().describe('The name of the attendee to personalize the greeting.'),
});
export type GenerateCyberpunkGreetingInput = z.infer<typeof GenerateCyberpunkGreetingInputSchema>;

const GenerateCyberpunkGreetingOutputSchema = z.object({
  greeting: z.string().describe('A unique, short, and thematic cyberpunk-style welcome message or quote.'),
});
export type GenerateCyberpunkGreetingOutput = z.infer<typeof GenerateCyberpunkGreetingOutputSchema>;

export async function generateCyberpunkGreeting(
  input: GenerateCyberpunkGreetingInput
): Promise<GenerateCyberpunkGreetingOutput> {
  return generateCyberpunkGreetingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cyberpunkGreetingPrompt',
  input: {schema: GenerateCyberpunkGreetingInputSchema},
  output: {schema: GenerateCyberpunkGreetingOutputSchema},
  prompt: `You are an AI specializing in crafting short, immersive, and thematic cyberpunk-style welcome messages or quotes for the MadMatrix '26 event. The greeting should feel personalized and enhance the event's immersive experience. It should be concise and evocative of a dystopian, high-tech future.

Generate a unique cyberpunk greeting for the attendee named: {{{attendeeName}}}`,
});

const generateCyberpunkGreetingFlow = ai.defineFlow(
  {
    name: 'generateCyberpunkGreetingFlow',
    inputSchema: GenerateCyberpunkGreetingInputSchema,
    outputSchema: GenerateCyberpunkGreetingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
