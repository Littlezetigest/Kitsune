"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import type { Id } from "./_generated/dataModel";

// Self-analysis patterns for user's own communication
const SELF_ANALYSIS_PATTERNS = {
  // Dominance indicators
  dominance: {
    high: ['i think', 'i believe', 'obviously', 'clearly', 'definitely', 'should', 'must', 'need to'],
    low: ['maybe', 'perhaps', 'i suppose', 'if you think', 'sorry', 'excuse me', 'i hope that\'s ok']
  },
  
  // Emotional vs logical patterns  
  emotional: ['feel', 'love', 'hate', 'excited', 'frustrated', 'amazing', 'terrible', 'heart'],
  logical: ['analyze', 'data', 'evidence', 'rational', 'logical', 'research', 'facts', 'statistics'],
  
  // Vulnerability indicators
  vulnerabilities: {
    ego: ['i\'m good at', 'i\'m known for', 'people say i\'m', 'i\'ve achieved', 'my success'],
    people_pleasing: ['sorry', 'i don\'t want to bother', 'if that\'s ok', 'whatever you think'],
    impatience: ['hurry', 'quickly', 'asap', 'urgent', 'can\'t wait', 'need this now'],
    perfectionism: ['perfect', 'exactly right', 'has to be', 'must be flawless', 'not good enough'],
    insecurity: ['i\'m not sure', 'maybe i\'m wrong', 'i could be mistaken', 'probably stupid'],
    control: ['i need to', 'has to be done', 'the right way', 'under control', 'manage this']
  },
  
  // Power law violations
  powerLawViolations: {
    // Law 1: Never Outshine the Master
    outshining: ['i know better', 'actually', 'let me correct', 'you\'re wrong', 'i have more experience'],
    // Law 4: Always Say Less Than Necessary  
    over_explaining: ['what i mean is', 'to clarify', 'in other words', 'let me explain further'],
    // Law 9: Win Through Actions, Not Arguments
    arguing: ['but that\'s not right', 'i disagree', 'you don\'t understand', 'let me argue'],
    // Law 15: Crush Your Enemy Totally
    incomplete_responses: ['i guess', 'sort of', 'kind of', 'maybe partially'],
    // Law 21: Play a Sucker to Catch a Sucker
    showing_intelligence: ['as someone who studied', 'in my expertise', 'given my background']
  }
};

// Analyze user's communication style from war room messages
export const analyzeSelfCommunication = action({
  args: { userId: v.id("users") },
  handler: async (ctx, args): Promise<Id<"userProfiles">> => {
    // Get all war room sessions for this user (mock data for now)
    // const _sessions = [] as any[];

    // Use mock data since no war room sessions exist yet
    const mockUserMessages = [
      "i think this is a great opportunity for our business",
      "i need to analyze the data carefully before making decisions", 
      "maybe we should consider all the options available to us"
    ];

    // Use mock messages for analysis
    const userMessages = mockUserMessages;
    const fullText = userMessages.join(' ');

    // Analyze personality archetype
    const archetypeAnalysis = analyzeUserArchetype(fullText);
    
    // Analyze communication style
    const communicationStyle = analyzeUserCommunicationStyle(fullText);
    
    // Identify vulnerabilities
    const vulnerabilities = identifyUserVulnerabilities(fullText, userMessages);
    
    // Identify power law violations
    const powerLawViolations = identifyPowerLawViolations(fullText, userMessages);
    
    // Analyze NLP profile
    const nlpProfile = analyzeUserNLPProfile(fullText);

    // Create user profile
    const profileId: Id<"userProfiles"> = await ctx.runMutation(api.selfAnalysisMutations.createUserProfile, {
      userId: args.userId,
      primaryArchetype: archetypeAnalysis.primary,
      archetypeConfidence: archetypeAnalysis.confidence,
      communicationStyle,
      personalVulnerabilities: vulnerabilities,
      powerLawViolations,
      nlpProfile,
      chatSampleSize: userMessages.length
    });

    return profileId;
  },
});

// Generate character remodeling for specific target
export const generateCharacterRemodeling = action({
  args: { 
    userId: v.id("users"),
    targetAnalysisId: v.id("analyses")
  },
  handler: async (ctx, args) => {
    // Get user profile
    const userProfile = await ctx.runQuery(api.selfAnalysisMutations.getUserProfile, { userId: args.userId });

    if (!userProfile) {
      throw new Error("User profile not found. Run self-analysis first.");
    }

    // For now, use mock target analysis since we don't have real analysis storage
    const targetAnalysis = {
      primaryArchetype: "EMPEROR" as const,
      personalityMatrix: {
        riskTolerance: 8,
        decisionSpeed: 9,
        trustLevel: 4,
        analyticalDepth: 9,
        emotionalDriver: "control",
        investmentStyle: "aggressive"
      }
    };

    // Generate persona adaptation strategy
    const adaptivePersona = generatePersonaAdaptation(userProfile, targetAnalysis);
    
    // Generate communication adjustments
    const communicationAdjustments = generateCommunicationAdjustments(userProfile, targetAnalysis);
    
    // Generate vulnerability mitigation
    const vulnerabilityMitigation = generateVulnerabilityMitigation(userProfile);
    
    // Generate character development plan
    const characterDevelopment = generateCharacterDevelopment(userProfile, targetAnalysis);
    
    // Analyze synergy
    const synergyAnalysis = analyzeSynergy(userProfile, targetAnalysis);

    // Create remodeling recommendations
    const remodelingId: Id<"characterRemodeling"> = await ctx.runMutation(api.selfAnalysisMutations.createCharacterRemodeling, {
      userId: args.userId,
      targetAnalysisId: args.targetAnalysisId,
      adaptivePersona,
      communicationAdjustments,
      vulnerabilityMitigation,
      characterDevelopment,
      synergyAnalysis
    });

    return remodelingId;
  },
});

function analyzeUserArchetype(text: string) {
  const archetypeScores: Record<string, number> = {};
  
  // User-specific archetype patterns
  const userPatterns = {
    'WARRIOR': ['fight for', 'battle', 'compete', 'win', 'defeat', 'conquer'],
    'SAGE': ['research', 'study', 'analyze', 'understand', 'learn', 'wisdom'],
    'JOKER': ['funny', 'joke', 'humor', 'playful', 'amusing', 'entertaining'],
    'EMPEROR': ['control', 'authority', 'power', 'command', 'rule', 'manage'],
    'PROTECTOR': ['help', 'protect', 'care', 'support', 'defend', 'assist'],
    'CHILD': ['excited', 'fun', 'amazing', 'cool', 'awesome', 'love'],
    'COLLECTOR': ['collect', 'gather', 'acquire', 'accumulate', 'save', 'hoard']
  };

  for (const [archetype, patterns] of Object.entries(userPatterns)) {
    archetypeScores[archetype] = countWords(text, patterns);
  }

  let primary: "PRINCE" | "CHILD" | "WARRIOR" | "SOLDIER" | "JOKER" | "AFFAIRIST" | "EMPEROR" | "DADDY" | "SAGE" | "ORACLE" | "GUARDIAN" | "PROTECTOR" | "PIONEER" | "EXPLORER" | "COLLECTOR" | "CURATOR" = 'SAGE';
  let maxScore = 0;
  let totalScore = 0;

  for (const [archetype, score] of Object.entries(archetypeScores)) {
    totalScore += score;
    if (score > maxScore) {
      maxScore = score;
      primary = archetype as typeof primary;
    }
  }

  const confidence = totalScore > 0 ? maxScore / totalScore : 0.5;
  return { primary, confidence };
}

function analyzeUserCommunicationStyle(text: string) {
  // Dominance level
  const highDominance = countWords(text, SELF_ANALYSIS_PATTERNS.dominance.high);
  const lowDominance = countWords(text, SELF_ANALYSIS_PATTERNS.dominance.low);
  const dominanceLevel = Math.max(1, Math.min(10, 5 + (highDominance - lowDominance)));

  // Emotional vs logical
  const emotional = countWords(text, SELF_ANALYSIS_PATTERNS.emotional);
  const logical = countWords(text, SELF_ANALYSIS_PATTERNS.logical);
  const emotionalExpression = emotional + logical > 0 ? 
    Math.round((emotional / (emotional + logical)) * 10) : 5;

  // Directness (inverse of hedging language)
  const hedging = countWords(text, ['maybe', 'perhaps', 'kind of', 'sort of', 'i think']);
  const directness = Math.max(1, 10 - Math.min(9, hedging * 2));

  return {
    dominanceLevel,
    emotionalExpression,
    directness,
    riskTolerance: directness, // Higher directness = higher risk tolerance
    persuasionStyle: emotional > logical ? 'emotional' : 'logical'
  };
}

function identifyUserVulnerabilities(text: string, _messages: string[]) {
  const vulnerabilities = [] as any[];

  for (const [vulnType, patterns] of Object.entries(SELF_ANALYSIS_PATTERNS.vulnerabilities)) {
    const matches = countWords(text, patterns);
    if (matches > 0) {
      vulnerabilities.push({
        type: vulnType,
        severity: Math.min(10, matches * 2),
        manifestation: getVulnerabilityManifestation(vulnType),
        triggerPatterns: extractMatchingWords(text, patterns).slice(0, 3)
      });
    }
  }

  return vulnerabilities;
}

function identifyPowerLawViolations(text: string, _messages: string[]) {
  const violations = [] as any[];
  
  const lawMappings = {
    outshining: { law: 1, title: "Never Outshine the Master" },
    over_explaining: { law: 4, title: "Always Say Less Than Necessary" },
    arguing: { law: 9, title: "Win Through Actions, Not Arguments" },
    incomplete_responses: { law: 15, title: "Crush Your Enemy Totally" },
    showing_intelligence: { law: 21, title: "Play a Sucker to Catch a Sucker" }
  };

  for (const [violationType, patterns] of Object.entries(SELF_ANALYSIS_PATTERNS.powerLawViolations)) {
    const matches = countWords(text, patterns);
    if (matches > 0) {
      const law = lawMappings[violationType as keyof typeof lawMappings];
      violations.push({
        lawNumber: law.law,
        lawTitle: law.title,
        violationSeverity: Math.min(10, matches * 3),
        evidence: extractMatchingWords(text, patterns).slice(0, 3),
        improvement: getLawImprovement(law.law)
      });
    }
  }

  return violations;
}

function analyzeUserNLPProfile(text: string) {
  const visualWords = countWords(text, ['see', 'look', 'view', 'picture', 'clear']);
  const auditoryWords = countWords(text, ['hear', 'listen', 'sound', 'tell', 'say']);
  const kinestheticWords = countWords(text, ['feel', 'touch', 'sense', 'grasp', 'handle']);

  let primaryModality: "visual" | "auditory" | "kinesthetic" = "kinesthetic";
  if (visualWords > auditoryWords && visualWords > kinestheticWords) {
    primaryModality = "visual";
  } else if (auditoryWords > kinestheticWords) {
    primaryModality = "auditory";
  }

  return {
    primaryModality,
    languagePatterns: extractLanguagePatterns(text),
    persuasionSusceptibility: {
      authority: text.includes('expert') || text.includes('authority') ? 8 : 5,
      social_proof: text.includes('everyone') || text.includes('others') ? 7 : 5,
      scarcity: text.includes('limited') || text.includes('rare') ? 6 : 5,
      reciprocity: text.includes('help') || text.includes('favor') ? 8 : 5,
      commitment: text.includes('promise') || text.includes('commit') ? 7 : 5,
      liking: text.includes('like') || text.includes('similar') ? 7 : 5
    }
  };
}

function generatePersonaAdaptation(userProfile: any, targetAnalysis: any) {
  const compatibilityMatrix = {
    'WARRIOR-EMPEROR': { persona: 'STRATEGIC_WARRIOR', level: 7 },
    'SAGE-WARRIOR': { persona: 'TACTICAL_ADVISOR', level: 8 },
    'CHILD-EMPEROR': { persona: 'ENTHUSIASTIC_SUPPORTER', level: 6 },
    'PROTECTOR-PRINCE': { persona: 'LOYAL_GUARDIAN', level: 9 }
  };

  const key = `${userProfile.primaryArchetype}-${targetAnalysis.primaryArchetype}`;
  const match = compatibilityMatrix[key as keyof typeof compatibilityMatrix];

  return {
    targetArchetype: targetAnalysis.primaryArchetype,
    recommendedPersona: match?.persona || 'ADAPTIVE_CHAMELEON',
    adaptationLevel: match?.level || 5,
    keyAdjustments: generateKeyAdjustments(userProfile, targetAnalysis)
  };
}

function generateCommunicationAdjustments(userProfile: any, targetAnalysis: any) {
  const adjustments = {
    toneShifts: [] as string[],
    vocabularyChanges: [] as string[],
    structureChanges: [] as string[],
    timingAdjustments: [] as string[]
  };

  // Adjust dominance level to match target
  if (userProfile.communicationStyle.dominanceLevel > 7 && targetAnalysis.primaryArchetype === 'EMPEROR') {
    adjustments.toneShifts.push('Reduce dominance - show deference to their authority');
  }

  // Vocabulary matching
  if (targetAnalysis.primaryArchetype === 'WARRIOR') {
    adjustments.vocabularyChanges.push('Use competitive language: "victory", "strategy", "advantage"');
  }

  return adjustments;
}

function generateVulnerabilityMitigation(userProfile: any) {
  return userProfile.personalVulnerabilities.map((vuln: any) => ({
    vulnerability: vuln.type,
    mitigationStrategy: getMitigationStrategy(vuln.type),
    practiceExercises: getPracticeExercises(vuln.type),
    powerLawApplication: getPowerLawForVulnerability(vuln.type)
  }));
}

function generateCharacterDevelopment(userProfile: any, targetAnalysis: any) {
  return {
    strengthsToAmplify: identifyStrengths(userProfile),
    weaknessesToMask: identifyWeaknesses(userProfile),
    newSkillsToAcquire: getSkillsForTarget(targetAnalysis),
    practiceScenarios: generatePracticeScenarios(userProfile, targetAnalysis)
  };
}

function analyzeSynergy(userProfile: any, targetAnalysis: any) {
  const compatibilityScore = calculateCompatibility(userProfile, targetAnalysis);
  
  return {
    compatibilityScore,
    conflictPoints: identifyConflicts(userProfile, targetAnalysis),
    harmonyPoints: identifyHarmony(userProfile, targetAnalysis),
    optimalInteractionStyle: getOptimalStyle(userProfile, targetAnalysis)
  };
}

// Helper functions
function countWords(text: string, patterns: string[]): number {
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
    if (matches) found.push(...matches);
  });
  return [...new Set(found)];
}

function getVulnerabilityManifestation(vulnType: string): string {
  const manifestations: Record<string, string> = {
    ego: "Frequently mentions achievements and seeks validation",
    people_pleasing: "Over-apologizes and seeks approval before expressing opinions",
    impatience: "Uses urgent language and pushes for quick decisions",
    perfectionism: "Gets stuck on details and hesitates to commit",
    insecurity: "Hedges statements and undermines own credibility",
    control: "Micromanages conversations and dominates planning"
  };
  return manifestations[vulnType] || "Shows typical vulnerability patterns";
}

function getLawImprovement(lawNumber: number): string {
  const improvements: Record<number, string> = {
    1: "Let others shine first, then guide from behind",
    4: "Speak with precision, eliminate unnecessary explanations",
    9: "Demonstrate value through results, not arguments",
    15: "Address all concerns completely in your response",
    21: "Ask strategic questions rather than showing expertise"
  };
  return improvements[lawNumber] || "Apply this law more consistently";
}

function extractLanguagePatterns(text: string): string[] {
  const patterns = [] as string[];
  if (text.includes('actually')) patterns.push('correction_tendency');
  if (text.includes('sorry')) patterns.push('apologetic');
  if (text.includes('amazing')) patterns.push('enthusiastic');
  return patterns;
}

function generateKeyAdjustments(userProfile: any, targetAnalysis: any): string[] {
  return [
    `Shift from ${userProfile.primaryArchetype} to complement ${targetAnalysis.primaryArchetype}`,
    "Match their decision-making speed",
    "Mirror their communication style"
  ];
}

function getMitigationStrategy(vulnType: string): string {
  const strategies: Record<string, string> = {
    ego: "Practice asking questions before sharing achievements",
    people_pleasing: "Set clear boundaries and express opinions confidently",
    impatience: "Use urgency strategically, not constantly",
    perfectionism: "Embrace 'good enough' for non-critical decisions"
  };
  return strategies[vulnType] || "Awareness and practice";
}

function getPracticeExercises(vulnType: string): string[] {
  const exercises: Record<string, string[]> = {
    ego: ["Ask 3 questions before sharing an achievement", "Practice active listening for 5 minutes"],
    people_pleasing: ["State one opinion without apologizing", "Say no to one request today"]
  };
  return exercises[vulnType] || ["Practice mindful communication"];
}

function getPowerLawForVulnerability(vulnType: string): string {
  const laws: Record<string, string> = {
    ego: "Law 1: Never Outshine the Master",
    people_pleasing: "Law 4: Always Say Less Than Necessary",
    impatience: "Law 35: Master the Art of Timing"
  };
  return laws[vulnType] || "Law 46: Never Appear Too Perfect";
}

function identifyStrengths(userProfile: any): string[] {
  const strengths = [] as string[];
  if (userProfile.communicationStyle.dominanceLevel > 7) strengths.push("Natural leadership presence");
  if (userProfile.communicationStyle.directness > 7) strengths.push("Clear communication style");
  return strengths;
}

function identifyWeaknesses(userProfile: any): string[] {
  return userProfile.personalVulnerabilities.map((v: any) => v.type);
}

function getSkillsForTarget(targetAnalysis: any): string[] {
  const skills: Record<string, string[]> = {
    'EMPEROR': ["Strategic thinking", "Authority recognition", "Power dynamics"],
    'WARRIOR': ["Competitive framing", "Victory language", "Battle metaphors"]
  };
  return skills[targetAnalysis.primaryArchetype] || ["Adaptive communication"];
}

function generatePracticeScenarios(_userProfile: any, _targetAnalysis: any): string[] {
  return [
    "Practice pitching to their archetype type",
    "Role-play handling their common objections",
    "Simulate their decision-making process"
  ];
}

function calculateCompatibility(userProfile: any, targetAnalysis: any): number {
  // Simple compatibility scoring
  let score = 5;
  
  if (userProfile.primaryArchetype === 'SAGE' && targetAnalysis.primaryArchetype === 'EMPEROR') {
    score += 2; // Good match
  }
  
  return Math.min(10, score);
}

function identifyConflicts(userProfile: any, targetAnalysis: any): string[] {
  const conflicts = [] as string[];
  
  if (userProfile.communicationStyle.dominanceLevel > 7 && targetAnalysis.primaryArchetype === 'EMPEROR') {
    conflicts.push("Both want to control the conversation");
  }
  
  return conflicts;
}

function identifyHarmony(_userProfile: any, _targetAnalysis: any): string[] {
  return ["Shared goal of successful outcomes", "Mutual respect for competence"];
}

function getOptimalStyle(userProfile: any, targetAnalysis: any): string {
  return `Adaptive ${userProfile.primaryArchetype} responding to ${targetAnalysis.primaryArchetype}`;
}

