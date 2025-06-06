import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create analysis record
export const createAnalysis = mutation({
  args: {
    conversationId: v.id("conversations"),
    primaryArchetype: v.union(
      v.literal("PRINCE"), v.literal("CHILD"),
      v.literal("WARRIOR"), v.literal("SOLDIER"), 
      v.literal("JOKER"), v.literal("AFFAIRIST"),
      v.literal("EMPEROR"), v.literal("DADDY"),
      v.literal("SAGE"), v.literal("ORACLE"),
      v.literal("GUARDIAN"), v.literal("PROTECTOR"),
      v.literal("PIONEER"), v.literal("EXPLORER"),
      v.literal("COLLECTOR"), v.literal("CURATOR")
    ),
    archetypeConfidence: v.number(),
    personalityMatrix: v.object({
      riskTolerance: v.number(),
      decisionSpeed: v.number(),
      trustLevel: v.number(),
      analyticalDepth: v.number(),
      emotionalDriver: v.string(),
      investmentStyle: v.string(),
    }),
    vulnerabilities: v.array(v.object({
      type: v.string(),
      severity: v.number(),
      exploitation: v.string(),
      triggerWords: v.array(v.string()),
    })),
    communicationStyle: v.object({
      preferredChannels: v.array(v.string()),
      responseTime: v.string(),
      persuasionStyle: v.string(),
      attentionSpan: v.string(),
    }),
    keywordPatterns: v.object({
      powerWords: v.array(v.string()),
      fearWords: v.array(v.string()),
      opportunityWords: v.array(v.string()),
      relationshipWords: v.array(v.string()),
      statusWords: v.array(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    return await ctx.db.insert("analyses", {
      ...args,
      userId: user._id,
      analyzedAt: Date.now(),
    });
  },
});

// Generate strategic recommendations
export const generateRecommendations = mutation({
  args: {
    analysisId: v.id("analyses"),
    archetype: v.string(),
    vulnerabilities: v.array(v.string()),
    behaviorProfile: v.any(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    return await ctx.db.insert("recommendations", {
      analysisId: args.analysisId,
      userId: user._id,
      lawsArsenal: generate48LawsArsenal(args.archetype, args.vulnerabilities),
      complimentCodex: generateComplimentCodex(args.archetype),
      approachStrategies: generateApproachStrategies(args.archetype, args.vulnerabilities),
      simulatorConfig: generateSimulatorConfig(args.archetype),
      createdAt: Date.now(),
    });
  },
});

function generate48LawsArsenal(archetype: string, vulnerabilities: string[]) {
  const lawsDatabase = [
    { lawNumber: 1, lawTitle: "Never Outshine the Master", effectiveness: 8, attackVector: "Let them feel superior while you guide", example: "Acknowledge their expertise before presenting ideas" },
    { lawNumber: 3, lawTitle: "Conceal Your Intentions", effectiveness: 9, attackVector: "Present benefits without revealing full agenda", example: "Focus on their gains, not your needs" },
    { lawNumber: 4, lawTitle: "Always Say Less Than Necessary", effectiveness: 7, attackVector: "Create mystique and let them fill silence", example: "Ask probing questions and listen more than you speak" },
    { lawNumber: 9, lawTitle: "Win Through Actions, Not Arguments", effectiveness: 9, attackVector: "Demonstrate value rather than debate", example: "Show ROI projections instead of arguing investment thesis" },
    { lawNumber: 15, lawTitle: "Crush Your Enemy Totally", effectiveness: 6, attackVector: "Address all objections comprehensively", example: "Anticipate and neutralize every possible concern" },
    { lawNumber: 21, lawTitle: "Play a Sucker to Catch a Sucker", effectiveness: 8, attackVector: "Appear less sophisticated to lower their guard", example: "Ask 'naive' questions that reveal their assumptions" }
  ];

  // Filter and score laws based on archetype and vulnerabilities
  return lawsDatabase.map(law => ({
    ...law,
    effectiveness: calculateLawEffectiveness(law, archetype, vulnerabilities)
  })).sort((a, b) => b.effectiveness - a.effectiveness).slice(0, 6);
}

function generateComplimentCodex(archetype: string) {
  const complimentSets = {
    'PRINCE': {
      openingMeeting: ["Your unique perspective on market dynamics is refreshing", "I've heard exceptional things about your investment approach"],
      emailSignature: ["Your distinctive portfolio strategy", "Your exclusive market insights"],
      negotiationEgo: ["You clearly have a sophisticated understanding that others miss", "Your elite status in this space is well-deserved"],
      closingDeal: ["This opportunity matches your prestigious portfolio perfectly"]
    },
    'WARRIOR': {
      openingMeeting: ["Your aggressive market approach has impressive results", "I admire your decisive investment style"],
      emailSignature: ["Your winning track record", "Your proven conquest of market opportunities"],
      negotiationEgo: ["You have the courage to make bold moves others fear", "Your competitive edge is what separates you from the pack"],
      closingDeal: ["This is the kind of victory you're built for"]
    },
    'EMPEROR': {
      openingMeeting: ["Your commanding presence in the investment world is evident", "You've built an impressive empire"],
      emailSignature: ["Your authoritative market position", "Your powerful investment legacy"],
      negotiationEgo: ["You have the vision and control to see this through", "Your strategic dominance is exactly what this needs"],
      closingDeal: ["This addition will strengthen your empire significantly"]
    }
  };

  const defaultSet = {
    openingMeeting: ["Your analytical insight cuts through market noise", "Your strategic thinking is impressive"],
    emailSignature: ["Your investment acumen", "Your market wisdom"],
    negotiationEgo: ["You understand the complexities others miss", "Your experience gives you a clear advantage"],
    closingDeal: ["Your portfolio approach is truly distinctive"]
  };

  return complimentSets[archetype as keyof typeof complimentSets] || defaultSet;
}

function generateApproachStrategies(archetype: string, vulnerabilities: string[]) {
  const strategies = [];
  
  if (vulnerabilities.includes('ego')) {
    strategies.push({
      scenario: 'initial_pitch',
      strategy: 'Lead with recognition of their past successes',
      warningFlags: ['Never appear more knowledgeable', 'Avoid correcting them directly'],
      triggerPhrases: ['Your track record shows', 'Given your expertise', 'You probably already know']
    });
  }
  
  if (vulnerabilities.includes('impatience')) {
    strategies.push({
      scenario: 'negotiation',
      strategy: 'Create time pressure and urgency',
      warningFlags: ['Don\'t drag out explanations', 'Avoid lengthy documentation'],
      triggerPhrases: ['Limited time opportunity', 'Moving quickly on this', 'Others are interested']
    });
  }

  if (archetype.includes('EMPEROR')) {
    strategies.push({
      scenario: 'follow_up',
      strategy: 'Frame as strategic empire building',
      warningFlags: ['Don\'t micromanage their decisions', 'Avoid challenging their authority'],
      triggerPhrases: ['Expand your influence', 'Strengthen your position', 'Strategic advantage']
    });
  }

  return strategies;
}

function generateSimulatorConfig(archetype: string) {
  const configs: Record<string, any> = {
    'PRINCE': {
      responsePatterns: ['That\'s an interesting perspective...', 'I\'ve seen similar opportunities before', 'What makes this special?'],
      objectionTypes: ['exclusivity', 'uniqueness', 'prestige'],
      persuasionTriggers: ['exclusive access', 'limited availability', 'prestigious partners'],
      emotionalButtons: ['recognition', 'status', 'uniqueness']
    },
    'WARRIOR': {
      responsePatterns: ['How does this help me win?', 'What\'s the competitive advantage?', 'Show me the battle plan'],
      objectionTypes: ['risk assessment', 'competitive analysis', 'victory probability'],
      persuasionTriggers: ['competitive edge', 'market dominance', 'crushing competition'],
      emotionalButtons: ['victory', 'conquest', 'domination']
    }
  };

  return configs[archetype] || {
    responsePatterns: ['Tell me more about the opportunity', 'What are the risks?', 'How does this fit my portfolio?'],
    objectionTypes: ['risk', 'returns', 'timeline'],
    persuasionTriggers: ['proven results', 'solid returns', 'low risk'],
    emotionalButtons: ['security', 'growth', 'stability']
  };
}

function calculateLawEffectiveness(law: any, archetype: string, vulnerabilities: string[]): number {
  let effectiveness = law.effectiveness;
  
  // Boost effectiveness based on archetype
  if (archetype === 'PRINCE' && law.lawNumber === 1) effectiveness += 2;
  if (archetype === 'EMPEROR' && law.lawNumber === 15) effectiveness += 2;
  
  // Boost based on vulnerabilities
  if (vulnerabilities.includes('ego') && [1, 21].includes(law.lawNumber)) effectiveness += 1;
  if (vulnerabilities.includes('impatience') && [4, 9].includes(law.lawNumber)) effectiveness += 1;
  
  return Math.min(effectiveness, 10);
}

// Get analysis for a conversation
export const getAnalysis = query({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      return null;
    }

    return await ctx.db
      .query("analyses")
      .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId))
      .first();
  },
});

// Get recommendations for an analysis
export const getRecommendations = query({
  args: { analysisId: v.id("analyses") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      return null;
    }

    return await ctx.db
      .query("recommendations")
      .withIndex("by_analysis", (q) => q.eq("analysisId", args.analysisId))
      .first();
  },
});

// Store LLM analysis results
export const storeLLMAnalysis = mutation({
  args: {
    conversationId: v.id("conversations"),
    analysisType: v.union(
      v.literal("psychological_profiling"),
      v.literal("strategic_optimization"),
      v.literal("communication_enhancement"),
      v.literal("archetype_refinement"),
      v.literal("vulnerability_assessment")
    ),
    llmResults: v.object({
      insights: v.array(v.string()),
      recommendations: v.array(v.string()),
      confidence: v.number(),
      metadata: v.object({
        promptTokens: v.number(),
        responseTokens: v.number(),
        model: v.string(),
        temperature: v.number(),
        timestamp: v.number()
      })
    }),
    enhancedCommunications: v.optional(v.object({
      professional: v.string(),
      archetypeSpecific: v.string(),
      persuasive: v.string(),
      analysisBreakdown: v.object({
        originalWeaknesses: v.array(v.string()),
        enhancementStrategies: v.array(v.string()),
        psychologicalTriggers: v.array(v.string()),
        frameworkApplications: v.array(v.string())
      })
    })),
    personalityInsights: v.optional(v.object({
      refinedArchetype: v.string(),
      personalityTraits: v.array(v.string()),
      communicationPatterns: v.string(),
      motivationalDrivers: v.array(v.string()),
      vulnerabilities: v.array(v.string()),
      trustFactors: v.array(v.string()),
      decisionMakingStyle: v.string()
    })),
    generatedAt: v.number(),
    confidence: v.number(),
    context: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    return await ctx.db.insert("llmAnalysisResults", {
      ...args,
      userId: user._id,
    });
  },
});

// Get LLM analysis results for a conversation
export const getLLMAnalysis = query({
  args: { 
    conversationId: v.id("conversations"),
    analysisType: v.optional(v.union(
      v.literal("psychological_profiling"),
      v.literal("strategic_optimization"),
      v.literal("communication_enhancement"),
      v.literal("archetype_refinement"),
      v.literal("vulnerability_assessment")
    ))
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      return null;
    }

    let query = ctx.db
      .query("llmAnalysisResults")
      .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId));

    if (args.analysisType) {
      // If specific type requested, filter by type
      const results = await query.collect();
      return results.filter(r => r.analysisType === args.analysisType).slice(-1)[0] || null;
    }

    // Return most recent analysis
    return await query.order("desc").first();
  },
});