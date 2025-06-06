"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

// Content-based analysis that derives insights purely from uploaded content
export const analyzeUploadedContent = action({
  args: {
    conversationId: v.id("conversations"),
    useClaudeAnalysis: v.optional(v.boolean())
  },
  handler: async (ctx, args) => {
    // Get the conversation content
    const conversation = await ctx.runQuery(api.conversations.getConversation, {
      id: args.conversationId
    });

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    // Use Claude AI to analyze the content without predefined archetypes
    if (args.useClaudeAnalysis) {
      return await analyzeWithClaude(conversation.content, conversation.title || "Conversation");
    } else {
      // Fallback to content-based analysis without external dependencies
      return await analyzeContentDirectly(conversation.content);
    }
  },
});

// Claude AI analysis focused purely on content patterns
async function analyzeWithClaude(content: string, title: string) {
  const prompt = `Analyze this conversation content and provide insights based EXCLUSIVELY on what is written, without reference to any predefined personality types or archetypes.

Content to analyze:
${content}

Please provide:

1. COMMUNICATION PATTERNS observed in this specific content:
   - Language style and tone
   - Decision-making indicators
   - Emotional expressions
   - Priority indicators

2. BEHAVIORAL INDICATORS found in the text:
   - Risk attitudes expressed
   - Time sensitivity markers
   - Authority/hierarchy preferences
   - Trust/skepticism signals

3. MOTIVATIONAL DRIVERS evident from the content:
   - What seems to motivate this person
   - What concerns or fears are expressed
   - What values are prioritized
   - What outcomes they seek

4. COMMUNICATION PREFERENCES shown:
   - How they like to receive information
   - What persuasion methods might work
   - What triggers defensive responses
   - How they make decisions

5. STRATEGIC INSIGHTS for interaction:
   - Best approaches based on their expressed preferences
   - What to emphasize in communications
   - What to avoid based on their signals
   - Optimal timing and framing strategies

6. SUPPORTING EVIDENCE from the uploaded content:
   - Extract 3-5 specific quotes that best demonstrate the patterns identified
   - Include exact text from conversations/messages as evidence
   - Show specific examples of language that reveals behavioral indicators
   - Quote specific phrases that demonstrate motivational drivers

IMPORTANT: If this content was extracted from images (indicated by file headers like "=== filename.jpg ==="), make sure to quote directly from the extracted text to provide concrete evidence for your analysis.

Base your analysis ONLY on patterns, language, and behaviors observable in this specific content. Do not apply external personality frameworks or assume characteristics not evidenced in the text.

Return your analysis in JSON format with clear sections for each category, including the supporting evidence section.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 4000,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`);
    }

    const result = await response.json();
    const analysisText = result.content?.[0]?.text || "No analysis returned";
    
    // Parse JSON response or fall back to text analysis
    let structuredAnalysis;
    try {
      structuredAnalysis = JSON.parse(analysisText);
    } catch {
      structuredAnalysis = parseClaudeTextAnalysis(analysisText);
    }

    return {
      success: true,
      analysisSource: "claude",
      contentTitle: title,
      rawAnalysis: analysisText,
      structuredInsights: structuredAnalysis,
      metadata: {
        contentLength: content.length,
        analysisTimestamp: Date.now(),
        model: "claude-3-5-sonnet-20241022"
      }
    };

  } catch (error) {
    console.error("Claude analysis error:", error);
    // Fallback to direct content analysis
    return await analyzeContentDirectly(content);
  }
}

// Direct content analysis without external AI
async function analyzeContentDirectly(content: string) {
  const words = content.toLowerCase().split(/\s+/);
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  // Extract patterns from the actual content
  const communicationPatterns = extractCommunicationPatterns(content, sentences);
  const behavioralIndicators = extractBehavioralIndicators(content, words);
  const motivationalDrivers = extractMotivationalDrivers(content, sentences);
  const strategicInsights = generateContentBasedStrategy(communicationPatterns, behavioralIndicators);

  return {
    success: true,
    analysisSource: "content-based",
    structuredInsights: {
      communicationPatterns,
      behavioralIndicators,
      motivationalDrivers,
      strategicInsights
    },
    metadata: {
      contentLength: content.length,
      wordCount: words.length,
      sentenceCount: sentences.length,
      analysisTimestamp: Date.now()
    }
  };
}

function extractCommunicationPatterns(content: string, sentences: string[]) {
  const urgencyWords = ['urgent', 'immediate', 'asap', 'quickly', 'fast', 'now', 'soon'];
  const formalityMarkers = ['please', 'would', 'could', 'might', 'perhaps', 'thank you'];
  const certaintyMarkers = ['definitely', 'certainly', 'absolutely', 'sure', 'confident'];
  const questionMarkers = content.match(/\?/g) || [];
  
  return {
    urgencyLevel: countPatterns(content, urgencyWords),
    formalityLevel: countPatterns(content, formalityMarkers),
    certaintyLevel: countPatterns(content, certaintyMarkers),
    questioningBehavior: questionMarkers.length,
    averageSentenceLength: sentences.reduce((sum, s) => sum + s.split(' ').length, 0) / sentences.length,
    toneIndicators: extractToneFromContent(content)
  };
}

function extractBehavioralIndicators(content: string, words: string[]) {
  const riskWords = ['risk', 'risky', 'safe', 'secure', 'guarantee', 'certain', 'protect'];
  const timeWords = ['deadline', 'timeline', 'schedule', 'timing', 'when', 'how long'];
  const authorityWords = ['decide', 'decision', 'approve', 'authority', 'permission', 'boss'];
  const trustWords = ['trust', 'verify', 'proof', 'evidence', 'skeptical', 'believe'];
  
  return {
    riskAttitude: analyzeRiskAttitude(content, riskWords),
    timeSensitivity: countPatterns(content, timeWords),
    authorityPreference: countPatterns(content, authorityWords),
    trustLevel: analyzeTrustLevel(content, trustWords),
    detailOrientation: analyzeDetailLevel(content)
  };
}

function extractMotivationalDrivers(content: string, sentences: string[]) {
  // Look for expressed motivations, concerns, and values in the actual content
  const goalWords = ['want', 'need', 'goal', 'objective', 'achieve', 'success'];
  const fearWords = ['worry', 'concern', 'afraid', 'nervous', 'problem', 'issue'];
  const valueWords = ['important', 'matter', 'priority', 'value', 'principle'];
  
  const expressedGoals = extractContextualMatches(sentences, goalWords);
  const expressedConcerns = extractContextualMatches(sentences, fearWords);
  const expressedValues = extractContextualMatches(sentences, valueWords);
  
  return {
    primaryMotivations: expressedGoals,
    keysConcerns: expressedConcerns,
    coreValues: expressedValues,
    outcomeOrientation: analyzeOutcomeOrientation(content)
  };
}

function generateContentBasedStrategy(communicationPatterns: any, behavioralIndicators: any) {
  const recommendations = [];
  
  // Generate specific recommendations based on observed patterns
  if (communicationPatterns.urgencyLevel > 2) {
    recommendations.push("Respond quickly and emphasize immediate action items");
  }
  
  if (communicationPatterns.formalityLevel > 3) {
    recommendations.push("Maintain formal communication style and professional language");
  }
  
  if (behavioralIndicators.riskAttitude === "conservative") {
    recommendations.push("Provide detailed risk mitigation and safety assurances");
  }
  
  if (behavioralIndicators.detailOrientation > 0.7) {
    recommendations.push("Include comprehensive details and supporting documentation");
  }
  
  return {
    recommendedApproaches: recommendations,
    communicationTiming: communicationPatterns.urgencyLevel > 2 ? "immediate" : "standard",
    contentDepth: behavioralIndicators.detailOrientation > 0.5 ? "detailed" : "summary",
    persuasionStyle: behavioralIndicators.trustLevel > 0.5 ? "evidence-based" : "relationship-based"
  };
}

// Helper functions
function countPatterns(content: string, patterns: string[]): number {
  return patterns.reduce((count, pattern) => {
    const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
    const matches = content.match(regex);
    return count + (matches ? matches.length : 0);
  }, 0);
}

function extractToneFromContent(content: string): string[] {
  const positiveWords = ['good', 'great', 'excellent', 'perfect', 'love', 'like'];
  const negativeWords = ['bad', 'terrible', 'hate', 'dislike', 'problem', 'issue'];
  const neutralWords = ['okay', 'fine', 'standard', 'normal', 'regular'];
  
  const tones = [];
  if (countPatterns(content, positiveWords) > 0) tones.push("positive");
  if (countPatterns(content, negativeWords) > 0) tones.push("negative");
  if (countPatterns(content, neutralWords) > 0) tones.push("neutral");
  
  return tones.length > 0 ? tones : ["neutral"];
}

function analyzeRiskAttitude(content: string, riskWords: string[]): string {
  const safeWords = ['safe', 'secure', 'guarantee', 'certain', 'protect'];
  const riskyWords = ['risk', 'risky', 'venture', 'gamble'];
  
  const safeCount = countPatterns(content, safeWords);
  const riskyCount = countPatterns(content, riskyWords);
  
  if (safeCount > riskyCount) return "conservative";
  if (riskyCount > safeCount) return "aggressive";
  return "moderate";
}

function analyzeTrustLevel(content: string, trustWords: string[]): number {
  const trustPositive = ['trust', 'believe', 'confident'];
  const trustNegative = ['verify', 'proof', 'evidence', 'skeptical'];
  
  const positive = countPatterns(content, trustPositive);
  const negative = countPatterns(content, trustNegative);
  
  return positive > negative ? 0.8 : negative > positive ? 0.3 : 0.5;
}

function analyzeDetailLevel(content: string): number {
  const detailWords = ['specific', 'detail', 'exactly', 'precisely', 'explain'];
  const summaryWords = ['summary', 'overview', 'brief', 'quick'];
  
  const detailCount = countPatterns(content, detailWords);
  const summaryCount = countPatterns(content, summaryWords);
  
  return detailCount > summaryCount ? 0.8 : summaryCount > detailCount ? 0.3 : 0.5;
}

function analyzeOutcomeOrientation(content: string): string {
  const processWords = ['how', 'process', 'method', 'approach', 'way'];
  const resultWords = ['result', 'outcome', 'goal', 'target', 'achieve'];
  
  const processCount = countPatterns(content, processWords);
  const resultCount = countPatterns(content, resultWords);
  
  return resultCount > processCount ? "results-focused" : "process-focused";
}

function extractContextualMatches(sentences: string[], keywords: string[]): string[] {
  const matches: string[] = [];
  
  sentences.forEach(sentence => {
    keywords.forEach(keyword => {
      if (sentence.toLowerCase().includes(keyword)) {
        // Extract the relevant part of the sentence
        const words = sentence.split(' ');
        const keywordIndex = words.findIndex(word => 
          word.toLowerCase().includes(keyword.toLowerCase())
        );
        
        if (keywordIndex !== -1) {
          // Get context around the keyword
          const start = Math.max(0, keywordIndex - 3);
          const end = Math.min(words.length, keywordIndex + 4);
          const context = words.slice(start, end).join(' ');
          matches.push(context.trim());
        }
      }
    });
  });
  
  return [...new Set(matches)]; // Remove duplicates
}

function parseClaudeTextAnalysis(text: string) {
  // Parse Claude's response if it's not JSON
  const sections = {
    communicationPatterns: extractSection(text, "COMMUNICATION PATTERNS"),
    behavioralIndicators: extractSection(text, "BEHAVIORAL INDICATORS"), 
    motivationalDrivers: extractSection(text, "MOTIVATIONAL DRIVERS"),
    strategicInsights: extractSection(text, "STRATEGIC INSIGHTS")
  };
  
  return sections;
}

function extractSection(text: string, sectionName: string): string[] {
  const regex = new RegExp(`${sectionName}[:\\s]+(.*?)(?=\\n\\n|$)`, 'is');
  const match = text.match(regex);
  
  if (match) {
    return match[1]
      .split('\n')
      .map(line => line.replace(/^[-*•]\s*/, '').trim())
      .filter(line => line.length > 0);
  }
  
  return [];
}

// Store content-based analysis results
export const storeContentAnalysis = action({
  args: {
    conversationId: v.id("conversations"),
    analysisResults: v.any(),
    analysisType: v.union(
      v.literal("claude-content-based"),
      v.literal("direct-content-based")
    )
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.runQuery(api.users.getUser, {
      clerkId: identity.subject
    });

    if (!user) {
      throw new Error("User not found");
    }

    return await ctx.runMutation(api.analysis.storeLLMAnalysis, {
      conversationId: args.conversationId,
      analysisType: "communication_enhancement",
      llmResults: {
        insights: Array.isArray(args.analysisResults.structuredInsights?.communicationPatterns) 
          ? args.analysisResults.structuredInsights.communicationPatterns 
          : ["Content-based analysis completed"],
        recommendations: Array.isArray(args.analysisResults.structuredInsights?.strategicInsights?.recommendedApproaches)
          ? args.analysisResults.structuredInsights.strategicInsights.recommendedApproaches
          : ["Review content-based recommendations"],
        confidence: 0.85,
        metadata: {
          promptTokens: 0,
          responseTokens: 0,
          model: args.analysisType,
          temperature: 0,
          timestamp: Date.now()
        }
      },
      generatedAt: Date.now(),
      confidence: 0.85,
      context: "Content-based analysis without predefined archetypes"
    });
  },
});