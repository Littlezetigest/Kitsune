"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

// Enhanced Investor Archetype Analysis with Psychological Framework Integration
const ARCHETYPE_PATTERNS = {
  'PRINCE': {
    core_words: ['deserve', 'entitled', 'special', 'unique', 'exclusive', 'premium', 'bespoke', 'elite', 'luxury', 'sophisticated', 'distinguished', 'prestigious', 'exceptional', 'superior', 'refined', 'caliber', 'tier', 'echelon', 'distinction', 'pedigree', 'provenance', 'curated', 'discerning', 'artisanal', 'couture', 'finest', 'paramount', 'exemplary', 'unparalleled'],
    linguistic_markers: {
      tone_indicators: ['obviously', 'naturally', 'clearly', 'of course', 'certainly'],
      pacing_patterns: ['deliberate', 'measured', 'considered'],
      authority_markers: ['I believe', 'In my experience', 'I prefer', 'I require'],
      status_references: ['my usual', 'my standards', 'what I expect', 'typically']
    },
    sentence_structure: 'complex_conditional', // Uses conditional statements to maintain superiority
    decision_language: ['when I decide', 'if I choose', 'should I proceed', 'my inclination']
  },
  'EMPEROR': {
    core_words: ['control', 'power', 'authority', 'command', 'rule', 'empire', 'legacy', 'dominance', 'leadership', 'strategy', 'execute', 'direct', 'manage', 'oversee'],
    linguistic_markers: {
      tone_indicators: ['will', 'must', 'shall', 'need to', 'have to', 'require'],
      pacing_patterns: ['immediate', 'urgent', 'now', 'quick', 'fast'],
      authority_markers: ['I decide', 'my decision', 'I determine', 'I choose'],
      command_structure: ['make it happen', 'get it done', 'ensure this', 'see to it']
    },
    sentence_structure: 'imperative_declarative', // Direct commands and statements
    decision_language: ['I will', 'this needs', 'make sure', 'ensure that']
  },
  'SAGE': {
    core_words: ['wisdom', 'knowledge', 'understand', 'learn', 'study', 'research', 'insight', 'analysis', 'evaluate', 'consider', 'examine', 'assess', 'review', 'investigate'],
    linguistic_markers: {
      tone_indicators: ['interesting', 'fascinating', 'curious', 'noteworthy', 'significant'],
      pacing_patterns: ['thorough', 'comprehensive', 'detailed', 'careful', 'methodical'],
      authority_markers: ['based on research', 'according to data', 'studies show', 'evidence suggests'],
      analytical_structure: ['let me think', 'I need to consider', 'this requires analysis', 'the data indicates']
    },
    sentence_structure: 'analytical_complex', // Multi-clause analytical sentences
    decision_language: ['after careful consideration', 'based on my analysis', 'the evidence suggests', 'logically speaking']
  },
  'WARRIOR': {
    core_words: ['fight', 'battle', 'win', 'conquer', 'dominate', 'crush', 'defeat', 'victory', 'compete', 'challenge', 'overcome', 'triumph', 'achieve', 'succeed'],
    linguistic_markers: {
      tone_indicators: ['absolutely', 'definitely', 'totally', 'completely', 'entirely'],
      pacing_patterns: ['aggressive', 'forceful', 'direct', 'intense', 'strong'],
      authority_markers: ['I will win', 'I always', 'I never give up', 'I fight for'],
      competitive_structure: ['beat the competition', 'outperform', 'dominate the market', 'crush it']
    },
    sentence_structure: 'action_oriented', // Short, punchy action statements
    decision_language: ['I attack', 'I go for', 'I take on', 'I compete']
  },
  'GUARDIAN': {
    core_words: ['safety', 'security', 'protect', 'defend', 'shield', 'guard', 'preserve', 'safe', 'secure', 'stable', 'risk', 'careful', 'cautious', 'conservative'],
    linguistic_markers: {
      tone_indicators: ['carefully', 'cautiously', 'prudently', 'safely', 'securely'],
      pacing_patterns: ['measured', 'deliberate', 'careful', 'slow', 'thorough'],
      authority_markers: ['I protect', 'I ensure', 'I safeguard', 'I preserve'],
      risk_structure: ['what if', 'potential risks', 'downside protection', 'safety measures']
    },
    sentence_structure: 'conditional_protective', // Conditional statements focused on protection
    decision_language: ['I need to be sure', 'I want guarantees', 'I require safety', 'I protect against']
  },
  'PIONEER': {
    core_words: ['first', 'new', 'explore', 'discover', 'innovation', 'breakthrough', 'frontier', 'disrupt', 'revolutionary', 'cutting-edge', 'transform', 'change', 'evolve', 'advance'],
    linguistic_markers: {
      tone_indicators: ['exciting', 'revolutionary', 'groundbreaking', 'innovative', 'transformative'],
      pacing_patterns: ['fast', 'rapid', 'quick', 'immediate', 'instant'],
      authority_markers: ['I pioneer', 'I lead', 'I discover', 'I innovate'],
      future_structure: ['the future is', 'tomorrow will', 'the next big thing', 'game changer']
    },
    sentence_structure: 'future_focused', // Future-tense visionary statements
    decision_language: ['I see the future', 'I will lead', 'I explore new', 'I discover']
  },
  'COLLECTOR': {
    core_words: ['acquire', 'gather', 'accumulate', 'hoard', 'collect', 'amass', 'treasure', 'portfolio', 'assets', 'holdings', 'investments', 'diversify', 'build', 'grow'],
    linguistic_markers: {
      tone_indicators: ['systematically', 'methodically', 'strategically', 'carefully', 'selectively'],
      pacing_patterns: ['steady', 'consistent', 'regular', 'systematic', 'planned'],
      authority_markers: ['I collect', 'I build', 'I acquire', 'I accumulate'],
      possession_structure: ['my collection', 'my portfolio', 'my holdings', 'my assets']
    },
    sentence_structure: 'possessive_systematic', // Statements about building and possessing
    decision_language: ['I add to', 'I build up', 'I collect', 'I diversify']
  }
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
  const archetypeScores: Record<string, any> = {};
  
  // Enhanced analysis for each archetype
  for (const [archetype, patterns] of Object.entries(ARCHETYPE_PATTERNS)) {
    const analysis = analyzeArchetypeDepth(text, patterns, archetype);
    archetypeScores[archetype] = analysis;
  }
  
  // Find primary archetype based on comprehensive scoring
  let primary = 'COLLECTOR';
  let maxScore = 0;
  let bestAnalysis = null;
  
  for (const [archetype, analysis] of Object.entries(archetypeScores)) {
    if (analysis.total_score > maxScore) {
      maxScore = analysis.total_score;
      primary = archetype;
      bestAnalysis = analysis;
    }
  }
  
  const confidence = maxScore > 0 ? Math.min(maxScore / 100, 1) : 0.5;
  
  return { 
    primary, 
    confidence, 
    scores: archetypeScores,
    detailed_analysis: bestAnalysis,
    supporting_quotes: bestAnalysis?.quotes || []
  };
}

function analyzeArchetypeDepth(text: string, patterns: any, _archetypeName: string) {
  
  // Score different linguistic dimensions
  const scores = {
    core_words: countModalityWords(text, patterns.core_words),
    tone_indicators: 0,
    pacing_patterns: 0,
    authority_markers: 0,
    sentence_structure: 0
  };
  
  // Analyze linguistic markers
  if (patterns.linguistic_markers) {
    scores.tone_indicators = countModalityWords(text, patterns.linguistic_markers.tone_indicators || []);
    scores.pacing_patterns = countModalityWords(text, patterns.linguistic_markers.pacing_patterns || []);
    scores.authority_markers = countModalityWords(text, patterns.linguistic_markers.authority_markers || []);
    
    // Analyze additional marker types
    const additionalMarkers = Object.values(patterns.linguistic_markers).flat().filter((marker): marker is string => typeof marker === 'string');
    scores.authority_markers += countModalityWords(text, additionalMarkers);
  }
  
  // Sentence structure analysis
  scores.sentence_structure = analyzeSentenceStructure(text, patterns.sentence_structure);
  
  // Extract supporting quotes
  const quotes = extractSupportingQuotes(text, patterns, _archetypeName);
  
  // Calculate weighted total score
  const total_score = (
    scores.core_words * 3 +
    scores.tone_indicators * 2 +
    scores.pacing_patterns * 2 +
    scores.authority_markers * 4 +
    scores.sentence_structure * 3
  );
  
  return {
    scores,
    total_score,
    quotes,
    linguistic_evidence: {
      dominant_tone: getDominantTone(text, patterns),
      communication_style: getCommunicationStyle(text, patterns),
      decision_making_language: getDecisionMakingLanguage(text, patterns)
    }
  };
}

function analyzeSentenceStructure(text: string, expectedStructure: string): number {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  let score = 0;
  
  sentences.forEach(sentence => {
    const trimmed = sentence.trim().toLowerCase();
    
    switch (expectedStructure) {
      case 'imperative_declarative':
        if (trimmed.includes(' will ') || trimmed.includes(' must ') || trimmed.includes(' need to ')) {
          score += 2;
        }
        break;
      case 'analytical_complex':
        if (trimmed.includes(' because ') || trimmed.includes(' therefore ') || trimmed.includes(' however ')) {
          score += 2;
        }
        break;
      case 'future_focused':
        if (trimmed.includes(' will ') || trimmed.includes(' going to ') || trimmed.includes(' future ')) {
          score += 2;
        }
        break;
      case 'conditional_protective':
        if (trimmed.includes(' if ') || trimmed.includes(' should ') || trimmed.includes(' might ')) {
          score += 2;
        }
        break;
      default:
        score += 1;
    }
  });
  
  return score;
}

function extractSupportingQuotes(text: string, patterns: any, _archetypeName: string): string[] {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const quotes: string[] = [];
  
  // Find sentences that contain archetype-specific patterns
  sentences.forEach(sentence => {
    const trimmed = sentence.trim();
    let relevanceScore = 0;
    
    // Check for core words
    patterns.core_words.forEach((word: string) => {
      if (trimmed.toLowerCase().includes(word.toLowerCase())) {
        relevanceScore += 2;
      }
    });
    
    // Check for linguistic markers
    if (patterns.linguistic_markers) {
      Object.values(patterns.linguistic_markers).flat().forEach((marker: any) => {
        if (typeof marker === 'string' && trimmed.toLowerCase().includes(marker.toLowerCase())) {
          relevanceScore += 1;
        }
      });
    }
    
    // If sentence is relevant, add it as a quote
    if (relevanceScore >= 2 && quotes.length < 3) {
      quotes.push(`"${trimmed}"`);
    }
  });
  
  return quotes;
}

function getDominantTone(text: string, patterns: any): string {
  if (!patterns.linguistic_markers?.tone_indicators) return 'neutral';
  
  const toneWords = patterns.linguistic_markers.tone_indicators;
  const toneCount = countModalityWords(text, toneWords);
  
  if (toneCount > 2) {
    return toneWords[0] || 'confident';
  }
  return 'neutral';
}

function getCommunicationStyle(text: string, _patterns: any): string {
  const wordCount = text.split(' ').length;
  const sentenceCount = text.split(/[.!?]+/).length;
  const avgWordsPerSentence = wordCount / sentenceCount;
  
  if (avgWordsPerSentence > 20) return 'verbose';
  if (avgWordsPerSentence < 10) return 'concise';
  return 'balanced';
}

function getDecisionMakingLanguage(text: string, patterns: any): string {
  if (!patterns.decision_language) return 'standard';
  
  const decisionWords = patterns.decision_language;
  const decisionCount = countModalityWords(text, decisionWords);
  
  if (decisionCount > 1) {
    return patterns.sentence_structure || 'decisive';
  }
  return 'standard';
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

// Comprehensive user profile analysis based on selected conversations
export const generateComprehensiveAnalysis = action({
  args: { 
    selectedConversationIds: v.array(v.id("conversations")),
    profileData: v.object({
      name: v.string(),
      role: v.string(),
      industry: v.string(),
      experience: v.string(),
      background: v.string(),
      currentStage: v.string(),
      fundingAmount: v.string(),
      timeframe: v.string()
    })
  },
  handler: async (ctx, args): Promise<any> => {
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

    // Get selected conversations for analysis
    const conversations = [];
    for (const conversationId of args.selectedConversationIds) {
      const conversation = await ctx.runQuery(api.conversations.getConversation, {
        id: conversationId
      });
      if (conversation) {
        conversations.push(conversation);
      }
    }

    // Analyze each conversation to get target profiles
    const targetAnalyses = [];
    for (const conversation of conversations) {
      try {
        const analysis = await ctx.runQuery(api.analysis.getAnalysis, {
          conversationId: conversation._id
        });
        
        if (analysis) {
          targetAnalyses.push({
            conversation,
            analysis,
            content: conversation.content
          });
        }
      } catch (error) {
        console.log(`Failed to analyze conversation ${conversation._id}:`, error);
      }
    }

    // Generate comprehensive user analysis
    const comprehensiveAnalysis = await generateUserAnalysis(
      args.profileData,
      conversations,
      targetAnalyses
    );

    // Store the analysis
    await ctx.runMutation(api.selfAnalysisMutations.createUserProfile, {
      userId: user._id,
      primaryArchetype: comprehensiveAnalysis.enneagramType.primary as any,
      archetypeConfidence: comprehensiveAnalysis.enneagramType.confidence / 100,
      communicationStyle: comprehensiveAnalysis.communicationAnalysis,
      personalVulnerabilities: comprehensiveAnalysis.powerAnalysis.violated_laws,
      powerLawViolations: comprehensiveAnalysis.powerAnalysis.violated_laws,
      nlpProfile: comprehensiveAnalysis.nlpProfile,
      chatSampleSize: conversations.length,
    });

    return comprehensiveAnalysis;
  },
});

async function generateUserAnalysis(profileData: any, conversations: any[], targetAnalyses: any[]) {
  // Analyze communication patterns across all conversations
  const combinedText = conversations.map(c => c.content).join(' ').toLowerCase();
  
  // Determine user archetype based on profile and communication patterns
  const userArchetype = determineUserArchetype(profileData, combinedText);
  
  // Analyze communication style
  const communicationAnalysis = analyzeCommunicationStyle(combinedText, profileData);
  
  // Generate power analysis based on target interactions
  const powerAnalysis = generatePowerAnalysis(targetAnalyses, communicationAnalysis);
  
  // Generate coaching recommendations
  const coachingRecommendations = generateCoachingRecommendations(
    userArchetype,
    powerAnalysis,
    targetAnalyses,
    profileData
  );

  // Generate business framework analysis
  const businessFrameworks = generateBusinessFrameworkAnalysis(profileData, targetAnalyses);

  return {
    enneagramType: userArchetype,
    communicationAnalysis,
    powerAnalysis,
    businessFrameworks,
    coachingRecommendations,
    targetPersonalization: generateTargetPersonalization(targetAnalyses),
    professionalDevelopment: generateProfessionalDevelopment(userArchetype, powerAnalysis),
    nlpProfile: generateNLPProfile(combinedText),
    successMetrics: calculateSuccessMetrics(userArchetype, powerAnalysis, targetAnalyses)
  };
}

function determineUserArchetype(profileData: any, text: string) {
  // Analyze based on role and industry
  let primaryType = "SAGE";
  let confidence = 75;
  
  // Role-based archetype determination
  if (profileData.role === "founder") {
    if (profileData.experience === "serial") {
      primaryType = "EMPEROR";
      confidence = 85;
    } else if (profileData.experience === "first-time") {
      primaryType = "PIONEER";
      confidence = 80;
    }
  } else if (profileData.role === "cto") {
    primaryType = "SAGE";
    confidence = 82;
  } else if (profileData.role === "cfo") {
    primaryType = "GUARDIAN";
    confidence = 88;
  }

  // Text analysis refinement
  const archetypeAnalysis = analyzeInvestorArchetype(text);
  if (archetypeAnalysis.confidence > 0.6) {
    primaryType = archetypeAnalysis.primary;
    confidence = Math.round(archetypeAnalysis.confidence * 100);
  }

  return {
    primary: `Type 8 - The ${primaryType}`,
    secondary: "Type 3 - The Achiever",
    confidence,
    description: getArchetypeDescription(primaryType),
    core_motivation: getArchetypeMotivation(primaryType),
    core_fear: getArchetypeFear(primaryType),
    core_desire: getArchetypeDesire(primaryType),
    // ... (include all the psychological profile fields from the original mock)
  };
}

function analyzeCommunicationStyle(text: string, profileData: any) {
  return {
    dominanceLevel: text.includes('lead') || text.includes('direct') ? 8 : 5,
    emotionalExpression: text.includes('feel') || text.includes('emotion') ? 7 : 4,
    directness: profileData.role === "founder" ? 8 : 6,
    riskTolerance: profileData.experience === "serial" ? 9 : 6,
    persuasionStyle: text.includes('data') || text.includes('research') ? "logical" : "emotional"
  };
}

function generatePowerAnalysis(_targetAnalyses: any[], communicationStyle: any) {
  const violated_laws = [
    {
      law: "Law 1: Never Outshine the Master",
      violation_level: communicationStyle.dominanceLevel > 7 ? 8 : 4,
      evidence: "Strong leadership presence may overshadow potential mentors/investors",
      business_impact: "Could alienate senior advisors or board members",
      correction_strategy: "Practice strategic deference while maintaining executive presence",
      examples: [
        "Let investors share their expertise before presenting your solution",
        "Ask for advice on areas where they have demonstrated success",
        "Acknowledge their contributions publicly in board meetings"
      ]
    },
    {
      law: "Law 4: Always Say Less Than Necessary",
      violation_level: communicationStyle.directness > 6 ? 7 : 3,
      evidence: "Direct communication style may reveal too much strategic information",
      business_impact: "Competitors may gain insights into your strategy",
      correction_strategy: "Develop strategic ambiguity while maintaining authenticity",
      examples: [
        "Keep specific customer names confidential until contracts are signed",
        "Reveal product roadmap in phases based on funding milestones",
        "Practice answering questions with strategic questions"
      ]
    }
  ];

  const power_strengths = [
    {
      law: "Law 25: Re-Create Yourself",
      mastery_level: 9,
      application: "Natural ability to adapt and reinvent business strategy",
      leverage_opportunity: "Use this strength to pivot quickly based on market feedback"
    }
  ];

  return { violated_laws, power_strengths, recommended_power_moves: [] };
}

function generateCoachingRecommendations(archetype: any, powerAnalysis: any, targetAnalyses: any[], _profileData: any) {
  const targetInsights = targetAnalyses.map(target => ({
    target: target.conversation.participantName || target.conversation.title,
    archetype: target.analysis?.primaryArchetype || "UNKNOWN",
    key_insights: [
      `Communication style shows ${target.analysis?.communicationStyle?.persuasionStyle || 'mixed'} preference`,
      `Risk tolerance appears ${target.analysis?.personalityMatrix?.riskTolerance > 6 ? 'high' : 'moderate'}`,
      `Decision speed indicates ${target.analysis?.personalityMatrix?.decisionSpeed > 7 ? 'quick' : 'deliberate'} style`
    ]
  }));

  return {
    immediate_actions: [
      {
        category: "Communication Enhancement",
        priority: "HIGH",
        specific_examples: targetInsights.slice(0, 2).map(target => 
          `For ${target.target} (${target.archetype}): Adjust tone to match their ${target.archetype.toLowerCase()} preferences`
        ),
        coaching_feedback: `Based on your selected targets, you're dealing with ${targetAnalyses.length} different investor personalities. Your natural ${archetype.primary} style will resonate well with some but needs adjustment for others.`,
        action_steps: [
          "Practice mirroring communication styles in low-stakes conversations",
          "Prepare archetype-specific value propositions",
          "Develop quick assessment techniques for new investor meetings"
        ]
      },
      {
        category: "Power Dynamics Mastery",
        priority: "HIGH",
        specific_examples: powerAnalysis.violated_laws.map((law: any) => 
          `${law.law}: ${law.examples[0]}`
        ),
        coaching_feedback: `Your analysis reveals ${powerAnalysis.violated_laws.length} key areas where power dynamics work against you. These aren't character flaws - they're strategic opportunities.`,
        action_steps: [
          "Practice strategic vulnerability in safe environments",
          "Develop patience for investor due diligence processes",
          "Create systematic approach to reading room dynamics"
        ]
      }
    ],
    long_term_development: [
      {
        skill: "Adaptive Leadership",
        current_assessment: "Strong foundation with room for tactical flexibility",
        development_path: [
          "Study each target's decision-making patterns",
          "Practice code-switching between different leadership styles",
          "Build systematic approach to stakeholder psychology"
        ],
        success_metrics: [
          "Successful adaptation to 3+ different investor types",
          "Measurable improvement in investor meeting outcomes",
          "Development of reliable archetype assessment skills"
        ]
      }
    ]
  };
}

function generateBusinessFrameworkAnalysis(profileData: any, targetAnalyses: any[]) {
  return {
    swotAnalysis: {
      strengths: [
        `${profileData.experience} experience in ${profileData.industry}`,
        "Clear understanding of target market dynamics",
        "Established communication patterns with investors"
      ],
      weaknesses: [
        "Power law violations limiting negotiation effectiveness",
        "Potential archetype mismatches with some investor types"
      ],
      opportunities: [
        `${targetAnalyses.length} analyzed investor relationships for optimization`,
        "Clear path to improved investor communication",
        "Systematic approach to relationship development"
      ],
      threats: [
        "Misaligned communication reducing funding success",
        "Competitors with better investor relationship skills"
      ]
    }
  };
}

function generateTargetPersonalization(targetAnalyses: any[]) {
  return {
    selectedTargets: targetAnalyses.length,
    targetInsights: targetAnalyses.length > 0 ? [
      `Analysis of ${targetAnalyses.length} target conversation${targetAnalyses.length > 1 ? 's' : ''} reveals specific communication preferences`,
      `Target portfolio shows ${targetAnalyses.length > 2 ? 'diverse' : 'focused'} archetype distribution`,
      `Strategic adaptation opportunities identified across ${targetAnalyses.length} relationships`
    ] : [
      "No targets selected for personalized analysis",
      "Upload investor conversations for specific insights",
      "Target-specific coaching requires conversation data"
    ]
  };
}

function generateProfessionalDevelopment(_archetype: any, _powerAnalysis: any) {
  return {
    skill_development_plan: [
      {
        skill: "Strategic Communication",
        current_level: "Intermediate",
        target_level: "Advanced",
        development_actions: [
          "Master archetype-specific communication patterns",
          "Develop power law application skills",
          "Practice adaptive presentation styles"
        ]
      }
    ]
  };
}

function generateNLPProfile(text: string) {
  return {
    primaryModality: text.includes('see') || text.includes('look') ? "visual" : 
                    text.includes('hear') || text.includes('sound') ? "auditory" : "kinesthetic",
    languagePatterns: ["analytical", "goal-oriented"],
    persuasionSusceptibility: {
      authority: 7,
      social_proof: 6,
      scarcity: 5,
      reciprocity: 8,
      commitment: 9,
      liking: 6
    }
  };
}

function calculateSuccessMetrics(_archetype: any, _powerAnalysis: any, targetAnalyses: any[]) {
  return {
    overall_success_probability: 72 + (targetAnalyses.length * 5),
    investor_appeal_score: 8.1,
    market_readiness: 75,
    execution_capability: 85,
    team_strength: 65,
    financial_sophistication: 55
  };
}

// Helper functions for archetype determination
function getArchetypeDescription(type: string): string {
  const descriptions: Record<string, string> = {
    "EMPEROR": "Driven by control and achievement, with strong leadership tendencies",
    "SAGE": "Analytical and knowledge-focused, with deep thinking patterns",
    "GUARDIAN": "Security-oriented and risk-averse, focused on protection",
    "PIONEER": "Innovation-driven and forward-thinking, with high risk tolerance"
  };
  return descriptions[type] || "Analytical and strategic, with balanced leadership approach";
}

function getArchetypeMotivation(type: string): string {
  const motivations: Record<string, string> = {
    "EMPEROR": "To be in control of your own life and destiny; to resist weakness in yourself and others",
    "SAGE": "To understand the truth and develop wisdom; to use intelligence to analyze and understand the world",
    "GUARDIAN": "To maintain stability and security; to protect what you've built",
    "PIONEER": "To explore new frontiers and create breakthrough innovations"
  };
  return motivations[type] || "To understand and master your environment through strategic thinking";
}

function getArchetypeFear(type: string): string {
  const fears: Record<string, string> = {
    "EMPEROR": "Being controlled or invaded by others; being vulnerable or at the mercy of injustice",
    "SAGE": "Being deceived, ignorant, or making the wrong decision due to bad information",
    "GUARDIAN": "Loss of security, financial ruin, or being unprepared for crisis",
    "PIONEER": "Being trapped in conformity or missing the next big opportunity"
  };
  return fears[type] || "Being unprepared or making decisions without adequate information";
}

function getArchetypeDesire(type: string): string {
  const desires: Record<string, string> = {
    "EMPEROR": "To protect yourself and be in control of your environment and destiny",
    "SAGE": "To find the truth and understand how the world works",
    "GUARDIAN": "To feel safe, secure, and prepared for any eventuality",
    "PIONEER": "To discover new opportunities and lead transformative change"
  };
  return desires[type] || "To understand and successfully navigate complex challenges";
}

