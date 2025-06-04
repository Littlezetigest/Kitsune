"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

// Investor Archetype Analysis Patterns
const ARCHETYPE_PATTERNS = {
  'PRINCE': ['deserve', 'entitled', 'special', 'unique', 'exclusive', 'premium', 'bespoke', 'elite', 'luxury', 'sophisticated', 'distinguished', 'prestigious', 'exceptional', 'superior', 'refined', 'caliber', 'tier', 'echelon', 'distinction', 'pedigree', 'provenance', 'curated', 'discerning', 'artisanal', 'couture', 'finest', 'paramount', 'exemplary', 'unparalleled'],
  'CHILD': ['excited', 'fun', 'new', 'shiny', 'cool', 'awesome', 'amazing', 'wow'],
  'WARRIOR': ['fight', 'battle', 'win', 'conquer', 'dominate', 'crush', 'defeat', 'victory'],
  'SOLDIER': ['discipline', 'order', 'structure', 'rules', 'systematic', 'proven', 'reliable'],
  'JOKER': ['playful', 'clever', 'witty', 'ironic', 'amusing', 'entertaining', 'funny'],
  'AFFAIRIST': ['deal', 'opportunity', 'angle', 'leverage', 'advantage', 'edge', 'play'],
  'EMPEROR': ['control', 'power', 'authority', 'command', 'rule', 'empire', 'legacy'],
  'DADDY': ['protect', 'provide', 'responsible', 'family', 'security', 'stability', 'foundation'],
  'SAGE': ['wisdom', 'knowledge', 'understand', 'learn', 'study', 'research', 'insight'],
  'ORACLE': ['intuition', 'sense', 'feeling', 'predict', 'foresee', 'vision', 'prophetic'],
  'GUARDIAN': ['safety', 'security', 'protect', 'defend', 'shield', 'guard', 'preserve'],
  'PROTECTOR': ['care', 'nurture', 'safeguard', 'watch over', 'defend', 'shelter'],
  'PIONEER': ['first', 'new', 'explore', 'discover', 'innovation', 'breakthrough', 'frontier'],
  'EXPLORER': ['adventure', 'journey', 'quest', 'search', 'wanderer', 'roam', 'venture'],
  'COLLECTOR': ['acquire', 'gather', 'accumulate', 'hoard', 'collect', 'amass', 'treasure'],
  'CURATOR': ['curate', 'select', 'refine', 'quality', 'taste', 'aesthetic', 'connoisseur']
};

// Investment behavior indicators
const INVESTMENT_BEHAVIOR_PATTERNS = {
  risk_tolerance: {
    high: ['aggressive', 'bold', 'risky', 'gamble', 'venture', 'speculate'],
    medium: ['balanced', 'moderate', 'calculated', 'measured', 'prudent'],
    low: ['conservative', 'safe', 'secure', 'stable', 'cautious', 'careful']
  },
  decision_speed: {
    fast: ['quick', 'immediate', 'now', 'urgent', 'asap', 'instant'],
    medium: ['consider', 'think', 'evaluate', 'review', 'assess'],
    slow: ['deliberate', 'careful', 'thorough', 'study', 'research', 'analyze']
  },
  trust_indicators: {
    high: ['trust', 'reliable', 'dependable', 'honest', 'transparent'],
    low: ['verify', 'proof', 'evidence', 'skeptical', 'cautious', 'doubt']
  }
};

// Vulnerability patterns (Sun Tzu style)
const VULNERABILITY_PATTERNS = {
  ego: ['proud', 'accomplished', 'successful', 'recognized', 'awarded', 'prestigious'],
  impatience: ['hurry', 'fast', 'quick', 'urgent', 'deadline', 'pressure'],
  greed: ['more', 'maximum', 'profit', 'returns', 'gains', 'wealth'],
  fear: ['worried', 'concerned', 'anxious', 'scared', 'afraid', 'nervous'],
  status: ['status', 'reputation', 'image', 'appearance', 'perception', 'standing'],
  perfectionism: ['perfect', 'flawless', 'ideal', 'best', 'optimal', 'superior']
};

// Analyze conversation text for NLP patterns
export const analyzeConversation = action({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args): Promise<any> => {
    // Get the conversation
    const conversation = await ctx.runQuery(api.conversations.getConversation, {
      id: args.conversationId
    });

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    const text: string = conversation.content.toLowerCase();

    // Analyze investor archetype
    const archetypeAnalysis = analyzeInvestorArchetype(text);
    
    // Analyze investment behavior patterns
    const behaviorAnalysis = analyzeInvestmentBehavior(text);
    
    // Analyze strategic vulnerabilities
    const vulnerabilityAnalysis = analyzeStrategicVulnerabilities(text);
    
    // Create personality matrix
    const personalityMatrix = createPersonalityMatrix(behaviorAnalysis);

    // Create analysis record
    const analysisId: any = await ctx.runMutation(api.analysis.createAnalysis, {
      conversationId: args.conversationId,
      primaryArchetype: archetypeAnalysis.primary as "PRINCE" | "CHILD" | "WARRIOR" | "SOLDIER" | "JOKER" | "AFFAIRIST" | "EMPEROR" | "DADDY" | "SAGE" | "ORACLE" | "GUARDIAN" | "PROTECTOR" | "PIONEER" | "EXPLORER" | "COLLECTOR" | "CURATOR",
      archetypeConfidence: archetypeAnalysis.confidence,
      personalityMatrix,
      vulnerabilities: vulnerabilityAnalysis,
      communicationStyle: {
        preferredChannels: ['email', 'meeting'],
        responseTime: behaviorAnalysis.decisionSpeed > 7 ? 'immediate' : 'deliberate',
        persuasionStyle: archetypeAnalysis.primary.includes('SAGE') ? 'logical' : 'emotional',
        attentionSpan: 'moderate'
      },
      keywordPatterns: {
        powerWords: extractMatchingWords(text, ['power', 'control', 'authority', 'dominance']),
        fearWords: extractMatchingWords(text, VULNERABILITY_PATTERNS.fear),
        opportunityWords: extractMatchingWords(text, ['opportunity', 'growth', 'potential', 'upside']),
        relationshipWords: extractMatchingWords(text, ['trust', 'relationship', 'partnership']),
        statusWords: extractMatchingWords(text, VULNERABILITY_PATTERNS.status)
      }
    });

    // Generate strategic recommendations
    await ctx.runMutation(api.analysis.generateRecommendations, {
      analysisId,
      archetype: archetypeAnalysis.primary,
      vulnerabilities: vulnerabilityAnalysis.map(v => v.type),
      behaviorProfile: behaviorAnalysis
    });

    return analysisId;
  },
});

function analyzeInvestorArchetype(text: string) {
  const archetypeScores: Record<string, number> = {};
  
  // Calculate scores for each archetype
  for (const [archetype, patterns] of Object.entries(ARCHETYPE_PATTERNS)) {
    archetypeScores[archetype] = countModalityWords(text, patterns);
  }
  
  // Find primary archetype
  let primary = 'COLLECTOR';
  let maxScore = 0;
  let totalScore = 0;
  
  for (const [archetype, score] of Object.entries(archetypeScores)) {
    totalScore += score;
    if (score > maxScore) {
      maxScore = score;
      primary = archetype;
    }
  }
  
  const confidence = totalScore > 0 ? maxScore / totalScore : 0.5;
  
  return { primary, confidence, scores: archetypeScores };
}

function analyzeInvestmentBehavior(text: string) {
  // Analyze risk tolerance
  const riskHigh = countModalityWords(text, INVESTMENT_BEHAVIOR_PATTERNS.risk_tolerance.high);
  const riskMedium = countModalityWords(text, INVESTMENT_BEHAVIOR_PATTERNS.risk_tolerance.medium);
  const riskLow = countModalityWords(text, INVESTMENT_BEHAVIOR_PATTERNS.risk_tolerance.low);
  const riskTolerance = riskHigh > riskLow ? (riskHigh > riskMedium ? 8 : 5) : 3;
  
  // Analyze decision speed
  const speedFast = countModalityWords(text, INVESTMENT_BEHAVIOR_PATTERNS.decision_speed.fast);
  const speedMedium = countModalityWords(text, INVESTMENT_BEHAVIOR_PATTERNS.decision_speed.medium);
  const speedSlow = countModalityWords(text, INVESTMENT_BEHAVIOR_PATTERNS.decision_speed.slow);
  const decisionSpeed = speedFast > speedSlow ? (speedFast > speedMedium ? 8 : 5) : 3;
  
  // Analyze trust level
  const trustHigh = countModalityWords(text, INVESTMENT_BEHAVIOR_PATTERNS.trust_indicators.high);
  const trustLow = countModalityWords(text, INVESTMENT_BEHAVIOR_PATTERNS.trust_indicators.low);
  const trustLevel = trustHigh > trustLow ? 7 : 4;
  
  return {
    riskTolerance,
    decisionSpeed,
    trustLevel,
    analyticalDepth: text.includes('research') || text.includes('analysis') ? 8 : 5,
    emotionalDriver: text.includes('family') ? 'security' : text.includes('legacy') ? 'legacy' : 'growth',
    investmentStyle: riskTolerance > 6 ? 'aggressive' : riskTolerance < 4 ? 'conservative' : 'balanced'
  };
}

function analyzeStrategicVulnerabilities(text: string) {
  const vulnerabilities = [];
  
  for (const [vulnType, patterns] of Object.entries(VULNERABILITY_PATTERNS)) {
    const matches = countModalityWords(text, patterns);
    if (matches > 0) {
      vulnerabilities.push({
        type: vulnType,
        severity: Math.min(matches * 2, 10),
        exploitation: getVulnerabilityExploitation(vulnType),
        triggerWords: extractMatchingWords(text, patterns).slice(0, 5)
      });
    }
  }
  
  return vulnerabilities;
}

function createPersonalityMatrix(behaviorAnalysis: any) {
  return {
    riskTolerance: behaviorAnalysis.riskTolerance,
    decisionSpeed: behaviorAnalysis.decisionSpeed,
    trustLevel: behaviorAnalysis.trustLevel,
    analyticalDepth: behaviorAnalysis.analyticalDepth,
    emotionalDriver: behaviorAnalysis.emotionalDriver,
    investmentStyle: behaviorAnalysis.investmentStyle
  };
}

function getVulnerabilityExploitation(vulnType: string): string {
  const exploitations: Record<string, string> = {
    ego: "Praise their past successes and unique insights before making requests",
    impatience: "Create urgency and limited-time opportunities",
    greed: "Emphasize maximum returns and exclusive high-yield opportunities",
    fear: "Provide detailed risk mitigation and safety guarantees",
    status: "Appeal to their reputation and what others will think",
    perfectionism: "Present flawless, well-researched proposals with no gaps"
  };
  return exploitations[vulnType] || "Appeal to their core motivations";
}

function countModalityWords(text: string, patterns: string[]): number {
  return patterns.reduce((count, pattern) => {
    const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
    const matches = text.match(regex);
    return count + (matches ? matches.length : 0);
  }, 0);
}

function extractMatchingWords(text: string, patterns: string[]): string[] {
  const found: string[] = [];
  patterns.forEach(pattern => {
    const regex = new RegExp(`\\b${pattern}\\w*\\b`, 'gi');
    const matches = text.match(regex);
    if (matches) {
      found.push(...matches);
    }
  });
  return [...new Set(found)]; // Remove duplicates
}

