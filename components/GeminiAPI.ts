// Gemini API integration
import Constants from 'expo-constants';

// Define the interface for the API response
interface GeminiResponse {
  text: string;
  status: 'success' | 'error';
}

// Function to call the Gemini API
export async function callGeminiAPI(prompt: string): Promise<GeminiResponse> {
  try {
    const apiKey = Constants.expoConfig?.extra?.geminiApiKey || process.env.EXPO_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'AIzaSyBY48PE9CRwbmaUSk24N52WwyFVS8V7oSk') {
      console.warn('Gemini API key not configured. Using mock response.');
      return getMockResponse(prompt);
    }

    // Check if this is a location-based query
    const isLocationQuery = prompt.toLowerCase().includes('location:') || 
                           prompt.toLowerCase().includes('near me') || 
                           prompt.toLowerCase().includes('places to visit') ||
                           prompt.toLowerCase().includes('restaurants');

    // Enhance the prompt with instructions for location-based queries
    let enhancedPrompt = prompt;
    if (isLocationQuery) {
      enhancedPrompt = `Please provide specific, detailed recommendations for the following query, considering the user's location if provided: ${prompt}. 
      If the query mentions "near me" or asks for local recommendations, and no location is specified, politely ask for the user's location first. 
      For location-based recommendations, include specific place names, brief descriptions, and why they're worth visiting. 
      Format your response in a clear, organized way with bullet points or numbering for lists of places.`;
    } else {
      // For general queries, enhance with instructions for better responses
      enhancedPrompt = `Please provide a helpful, informative, and engaging response to the following query: ${prompt}. 
      Be conversational but concise, and provide specific information rather than general statements when possible. 
      If appropriate, offer follow-up questions the user might want to ask to learn more.`;
    }

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: enhancedPrompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('Gemini API error:', data.error);
      return {
        text: `Error: ${data.error.message || 'Unknown error occurred'}`,
        status: 'error'
      };
    }

    if (data.candidates && data.candidates.length > 0 && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts.length > 0) {
      return {
        text: data.candidates[0].content.parts[0].text,
        status: 'success'
      };
    } else {
      return {
        text: 'Sorry, I couldn\'t generate a response. Please try again.',
        status: 'error'
      };
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return getMockResponse(prompt);
  }
}

// Function to get a mock response when API is not available
function getMockResponse(prompt: string): GeminiResponse {
  console.log('Using mock response for prompt:', prompt);
  
  // Check if this is a location-based query
  if (prompt.toLowerCase().includes('near me') || 
      prompt.toLowerCase().includes('places to visit') ||
      prompt.toLowerCase().includes('restaurants')) {
    
    // Check if location is provided
    const hasLocation = prompt.includes('User location:');
    
    if (!hasLocation) {
      return {
        text: "I'd be happy to recommend places, but I'll need to know your location first. Could you please share your city or area so I can provide relevant suggestions?",
        status: 'success'
      };
    }
    
    // Extract location from the prompt
    const locationMatch = prompt.match(/User location: (.*?)\)/);
    const location = locationMatch ? locationMatch[1] : "your area";
    
    // Location-based response templates
    const locationResponses = [
      `Based on your location in ${location}, here are some great places to visit today:

1. **Central Park** - A beautiful urban oasis with walking paths, lakes, and seasonal activities. Perfect for a relaxing afternoon.

2. **The Metropolitan Museum of Art** - One of the world's finest art museums with an extensive collection spanning 5,000 years of world culture.

3. **High Line Park** - An elevated linear park built on a former railroad track with unique views of the city and interesting art installations.

4. **Brooklyn Bridge** - Take a walk across this iconic landmark for spectacular city views, especially around sunset.

5. **Chelsea Market** - An indoor food hall with diverse dining options, local shops, and a vibrant atmosphere.

Would you like more specific recommendations based on your interests? For example, I could suggest family-friendly activities, outdoor adventures, or cultural experiences.`,

      `Here are some excellent restaurants near ${location} that I'd recommend:

1. **Harvest Table** - Farm-to-table restaurant with seasonal ingredients and a cozy atmosphere. Known for their fresh salads and artisanal pizzas.

2. **Blue Door Cafe** - Charming breakfast and lunch spot with excellent coffee, homemade pastries, and creative brunch options.

3. **Sapphire Lounge** - Upscale dining with a diverse menu featuring both international and local cuisine. Their seafood dishes are particularly noteworthy.

4. **Green Garden** - Vegetarian and vegan-friendly restaurant with innovative plant-based dishes that even meat-eaters enjoy.

5. **The Corner Bistro** - Casual neighborhood spot with comfort food classics and a great selection of local beers.

Would you like recommendations for a specific type of cuisine or dining experience?`,

      `For interesting places to explore in ${location}, I recommend:

1. **Riverside Museum** - Interactive exhibits on local history and culture, with special events on weekends.

2. **Botanical Gardens** - Beautiful seasonal displays, walking paths, and a conservatory with tropical plants.

3. **Old Town District** - Historic area with preserved architecture, boutique shops, and charming cafes.

4. **Sunset Point** - Scenic overlook with panoramic views, especially beautiful in the evening.

5. **Cultural Arts Center** - Check their calendar for exhibitions, performances, and workshops happening today.

Is there a particular type of activity or attraction you're interested in?`
    ];
    
    // Return a location-based response
    if (prompt.toLowerCase().includes('restaurant')) {
      return { text: locationResponses[1], status: 'success' };
    } else if (prompt.toLowerCase().includes('places to visit')) {
      return { text: locationResponses[0], status: 'success' };
    } else {
      return { text: locationResponses[Math.floor(Math.random() * locationResponses.length)], status: 'success' };
    }
  }
  
  // General response templates for non-location queries
  const generalResponses = [
    `I understand you're asking about "${prompt.substring(0, 30)}...". This is an interesting topic. Based on my knowledge, I can provide some insights. First, it's important to consider multiple perspectives. Some experts suggest that the key factors include careful analysis and thoughtful consideration of the context. What specific aspects would you like me to elaborate on?`,
    
    `Thanks for your question about "${prompt.substring(0, 30)}...". From my understanding, there are several important points to consider. The current research suggests that this is a complex topic with various interpretations. Some approaches focus on practical applications, while others emphasize theoretical frameworks. Would you like me to focus on a particular aspect?`,
    
    `Regarding "${prompt.substring(0, 30)}...", I can offer some thoughts. This is a fascinating area with ongoing developments. Recent advancements have shown promising results, particularly in how we understand the fundamental concepts. There are multiple factors to consider, including the context, implementation details, and potential implications. Is there a specific direction you'd like to explore further?`,
    
    `I've analyzed your question about "${prompt.substring(0, 30)}..." and can provide some insights. This topic involves several interconnected elements that work together in complex ways. The key considerations include understanding the underlying principles, recognizing patterns, and applying appropriate methodologies. Would you like me to elaborate on any particular aspect?`,
    
    `Your question about "${prompt.substring(0, 30)}..." touches on an important topic. Based on current understanding, there are multiple perspectives to consider. Some approaches emphasize practical applications, while others focus on theoretical foundations. The most effective strategies often combine elements from different viewpoints to create a comprehensive understanding. What specific aspects are you most interested in?`
  ];
  
  // Book recommendation response
  if (prompt.toLowerCase().includes('book') && prompt.toLowerCase().includes('recommend')) {
    return {
      text: `I'd be happy to recommend some books! Here are five excellent reads across different genres:

1. **"The Midnight Library" by Matt Haig** - A thought-provoking novel about the infinite possibilities of life and the choices we make.

2. **"Educated" by Tara Westover** - A powerful memoir about self-invention, family, and the pursuit of knowledge.

3. **"Project Hail Mary" by Andy Weir** - An engaging sci-fi adventure with problem-solving, humor, and unexpected friendship.

4. **"The Song of Achilles" by Madeline Miller** - A beautiful retelling of Greek mythology focusing on the relationship between Achilles and Patroclus.

5. **"Atomic Habits" by James Clear** - A practical guide to building good habits and breaking bad ones with small, incremental changes.

Would you like more specific recommendations based on your preferred genres or themes?`,
      status: 'success'
    };
  }
  
  // Fun fact response
  if (prompt.toLowerCase().includes('fun fact')) {
    const funFacts = [
      "Honey never spoils! Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good to eat.",
      
      "Octopuses have three hearts, nine brains, and blue blood. Two hearts pump blood to the gills, while the third pumps it to the rest of the body.",
      
      "The world's oldest known living tree is a Great Basin bristlecone pine named Methuselah, growing in the White Mountains of California. It's estimated to be over 4,850 years old!",
      
      "Crows can recognize human faces and hold grudges against people who have threatened or harmed them. They can even pass this knowledge to other crows.",
      
      "A day on Venus is longer than a year on Venus. It takes Venus 243 Earth days to rotate once on its axis but only 225 Earth days to complete one orbit around the Sun."
    ];
    
    return {
      text: `Here's a fun fact for you: ${funFacts[Math.floor(Math.random() * funFacts.length)]}

Would you like to hear another interesting fact?`,
      status: 'success'
    };
  }
  
  // Dinner suggestion response
  if (prompt.toLowerCase().includes('cook') && prompt.toLowerCase().includes('dinner')) {
    return {
      text: `Here are some delicious dinner ideas you could cook tonight:

1. **Mediterranean Baked Salmon** - Salmon fillets topped with olives, tomatoes, and feta cheese, baked with lemon and herbs.

2. **Vegetable Stir-Fry with Tofu** - Colorful vegetables and tofu in a savory sauce, served over rice or noodles.

3. **One-Pot Pasta Primavera** - A simple pasta dish with seasonal vegetables, garlic, and parmesan cheese.

4. **Homemade Pizza** - Make your own dough or use store-bought, then add your favorite toppings for a customized meal.

5. **Stuffed Bell Peppers** - Bell peppers filled with a mixture of ground meat (or lentils for vegetarian), rice, and spices.

Would you like a specific recipe for any of these suggestions?`,
      status: 'success'
    };
  }
  
  // Return a general response for other queries
  return {
    text: generalResponses[Math.floor(Math.random() * generalResponses.length)],
    status: 'success'
  };
}