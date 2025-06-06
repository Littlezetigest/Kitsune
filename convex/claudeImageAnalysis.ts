"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";

// Helper function for analyzing a single image
async function analyzeImageDirectly(imageData: string, fileName: string, prompt?: string) {
  try {
    console.log(`Analyzing image with Claude: ${fileName}`);
    
    // Extract image format and base64 data
    const imageMatch = imageData.match(/^data:image\/([^;]+);base64,(.+)$/);
    if (!imageMatch) {
      throw new Error("Invalid image data format");
    }
    
    const [, imageType, base64Data] = imageMatch;
    console.log(`Image type: ${imageType}, data length: ${base64Data.length}`);
    
    // Default prompt for conversation analysis
    const analysisPrompt = prompt || `Analyze this image and extract all text content including:
1. Any conversation messages, chat logs, or email content
2. Names of speakers/participants 
3. Timestamps if visible
4. Emoji reactions or symbols
5. Platform type (Slack, WhatsApp, Email, etc.)

Please transcribe the exact text content and identify the conversation structure. Focus on business/investment related conversations if present. Return the analysis in this format:

EXTRACTED TEXT:
[transcribed text content]

PARTICIPANTS:
[list of speakers/names found]

PLATFORM: [detected platform]

STRUCTURE: [description of conversation format]

EMOJIS/REACTIONS: [any emojis or reactions found]

Be thorough and accurate in extracting all visible text.`;

    // Prepare the request to Claude API
    const requestBody = {
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: analysisPrompt
            },
            {
              type: "image",
              source: {
                type: "base64",
                media_type: `image/${imageType}`,
                data: base64Data
              }
            }
          ]
        }
      ]
    };

    // Call Claude API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Claude API error:", error);
      throw new Error(`Claude API error: ${response.status} - ${error}`);
    }

    const result = await response.json();
    console.log("Claude analysis completed successfully");
    
    // Extract the analysis text
    const analysisText = result.content?.[0]?.text || "No analysis returned";
    
    // Parse the structured response
    const analysis = parseClaudeAnalysis(analysisText);
    
    return {
      success: true,
      fileName,
      analysisText,
      ...analysis,
      rawResponse: result
    };
    
  } catch (error) {
    console.error(`Error analyzing image ${fileName}:`, error);
    return {
      success: false,
      fileName,
      error: error instanceof Error ? error.message : "Unknown error",
      analysisText: `Error analyzing image: ${error}`
    };
  }
}

// Action to analyze images using Claude API
export const analyzeImageWithClaude = action({
  args: {
    imageData: v.string(), // base64 image data
    fileName: v.string(),
    prompt: v.optional(v.string())
  },
  handler: async (ctx, { imageData, fileName, prompt }) => {
    return await analyzeImageDirectly(imageData, fileName, prompt);
  }
});

// Parse Claude's structured analysis response
function parseClaudeAnalysis(text: string) {
  const analysis = {
    extractedText: "",
    participants: [] as string[],
    platform: "Unknown",
    structure: "",
    emojisReactions: "",
    messageCount: 0
  };

  try {
    // Extract sections using regex patterns
    const extractedTextMatch = text.match(/EXTRACTED TEXT:\s*([\s\S]*?)(?=\n\nPARTICIPANTS:|$)/i);
    if (extractedTextMatch) {
      analysis.extractedText = extractedTextMatch[1].trim();
    }

    const participantsMatch = text.match(/PARTICIPANTS:\s*([\s\S]*?)(?=\n\nPLATFORM:|$)/i);
    if (participantsMatch) {
      const participantText = participantsMatch[1].trim();
      analysis.participants = participantText
        .split('\n')
        .map(line => line.replace(/^[-*]\s*/, '').trim())
        .filter(name => name.length > 0);
    }

    const platformMatch = text.match(/PLATFORM:\s*(.*?)(?=\n|$)/i);
    if (platformMatch) {
      analysis.platform = platformMatch[1].trim();
    }

    const structureMatch = text.match(/STRUCTURE:\s*([\s\S]*?)(?=\n\nEMOJIS|$)/i);
    if (structureMatch) {
      analysis.structure = structureMatch[1].trim();
    }

    const emojisMatch = text.match(/EMOJIS\/REACTIONS:\s*(.*?)(?=\n|$)/i);
    if (emojisMatch) {
      analysis.emojisReactions = emojisMatch[1].trim();
    }

    // Count messages by looking for common patterns
    const messageLines = analysis.extractedText.split('\n').filter(line => 
      line.includes(':') && (
        line.includes('[') || // timestamp format
        line.includes('PM') || line.includes('AM') || // time format
        /^[A-Z][a-z]+ [A-Z][a-z]+:/.test(line) // Name format
      )
    );
    analysis.messageCount = messageLines.length;

  } catch (parseError) {
    console.error("Error parsing Claude analysis:", parseError);
  }

  return analysis;
}

// Batch analyze multiple images
export const batchAnalyzeImages = action({
  args: {
    images: v.array(v.object({
      imageData: v.string(),
      fileName: v.string()
    })),
    prompt: v.optional(v.string())
  },
  handler: async (ctx, { images, prompt }) => {
    console.log(`Starting batch analysis of ${images.length} images`);
    
    const results = [];
    
    // Process images sequentially to avoid rate limiting
    for (const image of images) {
      try {
        // Call the analysis function directly instead of using runAction
        const result = await analyzeImageDirectly(image.imageData, image.fileName, prompt);
        results.push(result);
        
        // Small delay between requests to be respectful to API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`Error in batch analysis for ${image.fileName}:`, error);
        results.push({
          success: false,
          fileName: image.fileName,
          error: error instanceof Error ? error.message : "Unknown error"
        });
      }
    }
    
    return {
      success: true,
      totalImages: images.length,
      results,
      combinedText: results
        .filter(r => r.success && 'extractedText' in r && r.extractedText)
        .map(r => `=== ${r.fileName} ===\n${(r as any).extractedText}`)
        .join('\n\n---\n\n')
    };
  }
});