"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

// LLM-powered dynamic analysis system
export const generateLLMAnalysis = action({
  args: {
    conversationId: v.id("conversations"),
    analysisType: v.union(
      v.literal("psychological_profiling"),
      v.literal("strategic_optimization"),
      v.literal("communication_enhancement"),
      v.literal("archetype_refinement"),
      v.literal("vulnerability_assessment")
    ),
    context: v.optional(v.string()),
    targetPersonality: v.optional(v.object({
      archetype: v.string(),
      riskTolerance: v.number(),
      decisionSpeed: v.number(),
      trustLevel: v.number(),
      emotionalDriver: v.string()
    }))
  },
  handler: async (ctx, args) => {
    // Get conversation data
    const conversation = await ctx.runQuery(api.conversations.getConversation, {
      id: args.conversationId
    });

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    // Get existing analysis for context
    const existingAnalysis = await ctx.runQuery(api.analysis.getAnalysis, {
      conversationId: args.conversationId
    });

    // Generate dynamic LLM analysis
    const llmAnalysis = await generateDynamicAnalysis(
      conversation.content,
      args.analysisType,
      existingAnalysis,
      args.targetPersonality,
      args.context
    );

    // Store LLM analysis results
    const analysisId = await ctx.runMutation(api.analysis.storeLLMAnalysis, {
      conversationId: args.conversationId,
      analysisType: args.analysisType,
      llmResults: llmAnalysis,
      generatedAt: Date.now(),
      confidence: llmAnalysis.confidence
    });

    return {
      analysisId,
      results: llmAnalysis,
      status: "complete"
    };
  },
});

export const enhanceCommunicationWithLLM = action({
  args: {
    originalMessage: v.string(),
    targetArchetype: v.optional(v.string()),
    targetPersonality: v.optional(v.object({
      archetype: v.string(),
      vulnerabilities: v.array(v.string()),
      communicationStyle: v.string(),
      emotionalDriver: v.string()
    })),
    enhancementGoals: v.array(v.string())
  },
  handler: async (ctx, args) => {
    const enhancedCommunication = await generateEnhancedCommunication(
      args.originalMessage,
      args.targetArchetype,
      args.targetPersonality,
      args.enhancementGoals
    );

    return {
      originalMessage: args.originalMessage,
      enhancedVersions: enhancedCommunication,
      analysisBreakdown: enhancedCommunication.analysisBreakdown,
      confidence: enhancedCommunication.confidence
    };
  },
});

export const generatePersonalityInsights = action({
  args: {
    conversationContent: v.string(),
    existingProfile: v.optional(v.object({
      archetype: v.string(),
      traits: v.array(v.string()),
      vulnerabilities: v.array(v.string())
    }))
  },
  handler: async (ctx, args) => {
    const personalityInsights = await generateDynamicPersonalityProfile(
      args.conversationContent,
      args.existingProfile
    );

    return personalityInsights;
  },
});

// Core LLM analysis functions
async function generateDynamicAnalysis(
  conversationContent: string,
  analysisType: string,
  existingAnalysis: any,
  targetPersonality: any,
  context?: string
) {
  // Create analysis prompt based on type
  const prompt = createAnalysisPrompt(conversationContent, analysisType, existingAnalysis, targetPersonality, context);
  
  // Simulate LLM call (in production, this would call OpenAI/Anthropic API)
  const llmResponse = await simulateLLMResponse(prompt, analysisType);
  
  return {
    analysisType,
    insights: llmResponse.insights,
    recommendations: llmResponse.recommendations,
    confidence: llmResponse.confidence,
    metadata: {
      promptTokens: prompt.length,
      responseTokens: llmResponse.insights.join(" ").length,
      model: "gpt-4-turbo",
      temperature: 0.7,
      timestamp: Date.now()
    }
  };
}

async function generateEnhancedCommunication(
  originalMessage: string,
  targetArchetype?: string,
  targetPersonality?: any,
  enhancementGoals?: string[]
) {
  const enhancementPrompt = createCommunicationPrompt(
    originalMessage,
    targetArchetype,
    targetPersonality,
    enhancementGoals
  );

  const llmResponse = await simulateLLMResponse(enhancementPrompt, "communication_enhancement");

  return {
    professional: llmResponse.versions.professional,
    archetypeSpecific: llmResponse.versions.archetypeSpecific,
    persuasive: llmResponse.versions.persuasive,
    analysisBreakdown: {
      originalWeaknesses: llmResponse.analysis.weaknesses,
      enhancementStrategies: llmResponse.analysis.strategies,
      psychologicalTriggers: llmResponse.analysis.triggers,
      frameworkApplications: llmResponse.analysis.frameworks
    },
    confidence: llmResponse.confidence
  };
}

async function generateDynamicPersonalityProfile(
  conversationContent: string,
  existingProfile?: any
) {
  const profilePrompt = createPersonalityPrompt(conversationContent, existingProfile);
  const llmResponse = await simulateLLMResponse(profilePrompt, "personality_profiling");

  return {
    refinedArchetype: llmResponse.profile.archetype,
    personalityTraits: llmResponse.profile.traits,
    communicationPatterns: llmResponse.profile.communicationStyle,
    motivationalDrivers: llmResponse.profile.motivations,
    vulnerabilities: llmResponse.profile.vulnerabilities,
    trustFactors: llmResponse.profile.trustFactors,
    decisionMakingStyle: llmResponse.profile.decisionStyle,
    confidence: llmResponse.confidence
  };
}

// Prompt creation functions
function createAnalysisPrompt(
  content: string,
  analysisType: string,
  existingAnalysis: any,
  targetPersonality: any,
  context?: string
): string {
  const basePrompt = `Analyze the following investor conversation for ${analysisType.replace("_", " ")}:\n\nConversation:\n${content}\n\n`;
  
  let specificPrompt = "";
  
  switch (analysisType) {
    case "psychological_profiling":
      specificPrompt = `Provide deep psychological analysis including:
1. Archetype classification (EMPEROR, SAGE, GUARDIAN, etc.)
2. Core motivational drivers
3. Communication preferences
4. Decision-making patterns
5. Trust-building factors
6. Influence susceptibilities

Focus on actionable psychological insights for strategic positioning.`;
      break;
      
    case "strategic_optimization":
      specificPrompt = `Analyze strategic positioning opportunities:
1. Competitive advantages to emphasize
2. Authority positioning strategies
3. Value proposition optimization
4. Risk mitigation approaches
5. Timeline acceleration tactics

Provide concrete strategic recommendations.`;
      break;
      
    case "communication_enhancement":
      specificPrompt = `Optimize communication effectiveness:
1. Professional language elevation
2. Psychological trigger integration
3. Persuasion framework application (Cialdini, Voss, SPIN)
4. Archetype-specific customization
5. Call-to-action optimization

Generate enhanced message versions.`;
      break;
      
    case "vulnerability_assessment":
      specificPrompt = `Identify strategic vulnerabilities and opportunities:
1. Psychological weak points
2. Decision-making biases
3. Status and ego triggers
4. Fear and scarcity sensitivities
5. Authority susceptibilities

Provide exploitation strategies within ethical bounds.`;
      break;
  }
  
  if (targetPersonality) {
    specificPrompt += `\n\nTarget personality context:\n- Archetype: ${targetPersonality.archetype}\n- Risk tolerance: ${targetPersonality.riskTolerance}/10\n- Decision speed: ${targetPersonality.decisionSpeed}/10\n- Trust level: ${targetPersonality.trustLevel}/10\n- Emotional driver: ${targetPersonality.emotionalDriver}`;
  }
  
  if (context) {
    specificPrompt += `\n\nAdditional context: ${context}`;
  }
  
  return basePrompt + specificPrompt;
}

function createCommunicationPrompt(
  originalMessage: string,
  targetArchetype?: string,
  targetPersonality?: any,
  enhancementGoals?: string[]
): string {
  let prompt = `Transform this message for maximum investor impact:\n\nOriginal: "${originalMessage}"\n\n`;
  
  if (targetArchetype) {
    prompt += `Target archetype: ${targetArchetype}\n`;
  }
  
  if (targetPersonality) {
    prompt += `Personality profile: ${JSON.stringify(targetPersonality, null, 2)}\n`;
  }
  
  if (enhancementGoals) {
    prompt += `Enhancement goals: ${enhancementGoals.join(", ")}\n`;
  }
  
  prompt += `\nGenerate:
1. Professional version with authority positioning
2. Archetype-specific version with psychological triggers
3. Persuasive version with influence frameworks
4. Analysis of original weaknesses and enhancement strategies

Use proven frameworks: Cialdini's influence principles, Chris Voss negotiation tactics, SPIN selling methodology.`;
  
  return prompt;
}

function createPersonalityPrompt(conversationContent: string, existingProfile?: any): string {
  let prompt = `Analyze this conversation to create a comprehensive personality profile:\n\n${conversationContent}\n\n`;
  
  if (existingProfile) {
    prompt += `Existing profile: ${JSON.stringify(existingProfile, null, 2)}\n\nRefine and enhance this profile based on new conversation data.\n\n`;
  }
  
  prompt += `Provide detailed analysis of:
1. Investor archetype classification
2. Communication style and preferences
3. Decision-making patterns and speed
4. Trust-building factors and barriers
5. Motivational drivers and fears
6. Strategic vulnerabilities and opportunities
7. Influence susceptibilities and resistance patterns

Focus on actionable insights for relationship development and strategic positioning.`;
  
  return prompt;
}

// LLM response simulation (replace with actual API calls in production)
async function simulateLLMResponse(prompt: string, analysisType: string) {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Generate contextual response based on analysis type
  switch (analysisType) {
    case "psychological_profiling":
      return {
        insights: [
          "Strong analytical tendencies suggest SAGE archetype with secondary GUARDIAN traits",
          "Decision-making process favors data validation over emotional appeals",
          "Trust-building requires credibility markers and peer validation",
          "Communication style indicates preference for detailed, logical presentations"
        ],
        recommendations: [
          "Lead with quantifiable metrics and third-party validation",
          "Provide comprehensive data room access for thorough due diligence",
          "Use analytical frameworks and comparative analysis in presentations",
          "Schedule extended discussion sessions to accommodate deliberate decision style"
        ],
        confidence: 0.87
      };
      
    case "communication_enhancement":
      return {
        versions: {
          professional: "I'm reaching out because your analytical approach to investment evaluation aligns perfectly with our data-driven growth strategy. Our Series A opportunity represents validated product-market fit with quantifiable growth efficiency metrics.",
          archetypeSpecific: "Given your expertise in systematic due diligence, I've prepared comprehensive financial models and technical architecture documentation. The investment thesis is supported by independent validation from industry analysts.",
          persuasive: "Our platform has achieved the type of analytical rigor you require - 3.2 LTV/CAC ratio, 95% gross retention, positioned in 95th percentile for growth efficiency across 47 comparable companies."
        },
        analysis: {
          weaknesses: ["Lacks credibility markers", "Missing quantification", "No social proof"],
          strategies: ["Authority positioning", "Data-driven validation", "Peer comparison"],
          triggers: ["Analytical validation", "Credibility establishment", "Systematic approach"],
          frameworks: ["SPIN methodology", "Cialdini authority principle", "Logical appeal structure"]
        },
        confidence: 0.82
      };
      
    case "strategic_optimization":
      return {
        insights: [
          "Competitive positioning should emphasize analytical rigor and systematic approach",
          "Authority establishment critical for credibility with SAGE archetype investors",
          "Data transparency and comprehensive documentation will accelerate decision timeline",
          "Peer validation and industry expert endorsements provide necessary social proof"
        ],
        recommendations: [
          "Develop comprehensive analytical framework for investment evaluation",
          "Secure industry expert advisors and testimonials for credibility enhancement",
          "Create detailed competitive analysis and market positioning documentation",
          "Establish thought leadership through technical content and industry speaking"
        ],
        confidence: 0.84
      };
      
    default:
      return {
        insights: [
          "Advanced analysis reveals sophisticated psychological patterns",
          "Strategic positioning opportunities identified across multiple dimensions",
          "Communication optimization potential significant with targeted approach"
        ],
        recommendations: [
          "Implement archetype-specific engagement strategies",
          "Deploy psychological trigger optimization",
          "Enhance authority positioning and credibility markers"
        ],
        confidence: 0.80
      };
  }
}