import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Podcast {
  id: string;
  title: string;
  author: string;
  description: string;
}

export async function POST(request: NextRequest) {
  const { searchTerm } = await request.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates fictional podcast suggestions based on user input. Provide 3 podcast suggestions in JSON format with fields: title, author, and description(500words). "
        },
        {
          role: "user",
          content: `Generate 3 fictional podcast suggestions related to: ${searchTerm}`
        }
      ],
      temperature: 0.7,
    });

    const suggestionsText = completion.choices[0].message.content;
    console.log('OpenAI response:', suggestionsText);

    // Clean the response by removing Markdown code block syntax
    const cleanedText = suggestionsText.replace(/```json\n?|\n?```/g, '').trim();

    let suggestions: Podcast[] = [];

    try {
      const parsedData = JSON.parse(cleanedText);
      if (Array.isArray(parsedData)) {
        suggestions = parsedData;
      } else if (typeof parsedData === 'object' && parsedData !== null) {
        // If it's an object, try to extract an array from it
        const possibleArray = Object.values(parsedData).find(Array.isArray);
        if (possibleArray) {
          suggestions = possibleArray;
        }
      }
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      console.error('Cleaned text:', cleanedText);
    }

    // Ensure each suggestion has an id and all required fields
    const formattedSuggestions = suggestions.map((suggestion, index) => ({
      id: `${index + 1}`,
      title: suggestion.title || `Untitled Podcast ${index + 1}`,
      author: suggestion.author || 'Unknown Author',
      description: suggestion.description || 'No description available',
    }));

    console.log('Formatted suggestions:', formattedSuggestions);

    return NextResponse.json(formattedSuggestions);
  } catch (error) {
    console.error('Error in Podcast Search:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to generate podcast suggestions', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}