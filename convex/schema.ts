import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema defines your data model for the database.
// For more information, see https://docs.convex.dev/database/schema
export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
  }).index("by_clerkId", ["clerkId"]),

  // Store uploaded conversations for analysis
  conversations: defineTable({
    userId: v.id("users"),
    title: v.string(),
    content: v.string(), // The raw chat/email text
    uploadedAt: v.number(),
    participantName: v.optional(v.string()), // Name of the person being analyzed
  }).index("by_user", ["userId"]),

  // Store investor personality analysis results
  analyses: defineTable({
    conversationId: v.id("conversations"),
    userId: v.id("users"),
    
    // Investor Archetype Classification
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
    archetypeConfidence: v.number(), // 0-1 confidence score
    
    // Personality Matrix Data
    personalityMatrix: v.object({
      riskTolerance: v.number(), // 1-10 scale
      decisionSpeed: v.number(), // 1-10 scale  
      trustLevel: v.number(), // 1-10 scale
      analyticalDepth: v.number(), // 1-10 scale
      emotionalDriver: v.string(), // primary emotional motivation
      investmentStyle: v.string(), // conservative, aggressive, balanced, etc.
    }),
    
    // Strategic Vulnerabilities (Sun Tzu analysis)
    vulnerabilities: v.array(v.object({
      type: v.string(), // ego, impatience, greed, fear, etc.
      severity: v.number(), // 1-10 scale
      exploitation: v.string(), // how to exploit this weakness
      triggerWords: v.array(v.string()), // words that activate this vulnerability
    })),
    
    // Communication patterns
    communicationStyle: v.object({
      preferredChannels: v.array(v.string()), // email, meeting, phone, etc.
      responseTime: v.string(), // immediate, quick, deliberate
      persuasionStyle: v.string(), // logical, emotional, social proof
      attentionSpan: v.string(), // brief, moderate, extended
    }),
    
    // Word choice analysis for investor context
    keywordPatterns: v.object({
      powerWords: v.array(v.string()), // dominance indicators
      fearWords: v.array(v.string()), // risk aversion indicators  
      opportunityWords: v.array(v.string()), // growth mindset indicators
      relationshipWords: v.array(v.string()), // trust building indicators
      statusWords: v.array(v.string()), // prestige/recognition indicators
    }),
    
    analyzedAt: v.number(),
  }).index("by_conversation", ["conversationId"])
    .index("by_user", ["userId"])
    .index("by_archetype", ["primaryArchetype"]),

  // Store strategic recommendations for investor relations
  recommendations: defineTable({
    analysisId: v.id("analyses"),
    userId: v.id("users"),
    
    // 48 Laws Arsenal - Which laws work best on this archetype
    lawsArsenal: v.array(v.object({
      lawNumber: v.number(), // 1-48
      lawTitle: v.string(),
      effectiveness: v.number(), // 1-10 effectiveness rating
      attackVector: v.string(), // how to apply this law to this person
      example: v.string(), // specific example for this archetype
    })),
    
    // Compliment Codex - Tailored to investor psychology
    complimentCodex: v.object({
      openingMeeting: v.array(v.string()), // meeting openers
      emailSignature: v.array(v.string()), // email compliments
      negotiationEgo: v.array(v.string()), // ego-stroking phrases
      closingDeal: v.array(v.string()), // deal validation compliments
    }),
    
    // Strategic approach recommendations
    approachStrategies: v.array(v.object({
      scenario: v.string(), // pitch, negotiation, follow-up, etc.
      strategy: v.string(),
      warningFlags: v.array(v.string()), // what to avoid
      triggerPhrases: v.array(v.string()), // what resonates
    })),
    
    // War Room Simulator Configuration
    simulatorConfig: v.object({
      responsePatterns: v.array(v.string()), // typical responses
      objectionTypes: v.array(v.string()), // common objections
      persuasionTriggers: v.array(v.string()), // what convinces them
      emotionalButtons: v.array(v.string()), // emotional triggers
    }),
    
    createdAt: v.number(),
  }).index("by_analysis", ["analysisId"])
    .index("by_user", ["userId"]),

  // Store war room simulation sessions
  warRoomSessions: defineTable({
    analysisId: v.id("analyses"),
    userId: v.id("users"),
    scenario: v.string(), // pitch, negotiation, etc.
    messages: v.array(v.object({
      role: v.union(v.literal("user"), v.literal("investor")),
      content: v.string(),
      timestamp: v.number(),
      effectiveness: v.optional(v.number()), // 1-10 rating for user messages
    })),
    sessionScore: v.object({
      persuasiveness: v.number(), // 1-10
      strategicUse: v.number(), // 1-10  
      rapport: v.number(), // 1-10
      overallRating: v.number(), // 1-10
    }),
    feedback: v.array(v.string()), // AI feedback on performance
    createdAt: v.number(),
  }).index("by_analysis", ["analysisId"])
    .index("by_user", ["userId"]),

  // Store user self-analysis profiles
  userProfiles: defineTable({
    userId: v.id("users"),
    
    // User's personality archetype
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
    
    // User's communication patterns
    communicationStyle: v.object({
      dominanceLevel: v.number(), // 1-10 how dominant/submissive
      emotionalExpression: v.number(), // 1-10 emotional vs logical
      directness: v.number(), // 1-10 direct vs indirect
      riskTolerance: v.number(), // 1-10 in communication
      persuasionStyle: v.string(), // logical, emotional, social proof
    }),
    
    // User's vulnerabilities (self-analysis)
    personalVulnerabilities: v.array(v.object({
      type: v.string(), // ego, impatience, people-pleasing, etc.
      severity: v.number(), // 1-10
      manifestation: v.string(), // how it shows up in their communication
      triggerPatterns: v.array(v.string()), // what triggers this vulnerability
    })),
    
    // Power law violations (which laws they break)
    powerLawViolations: v.array(v.object({
      lawNumber: v.number(), // 1-48
      lawTitle: v.string(),
      violationSeverity: v.number(), // 1-10
      evidence: v.array(v.string()), // examples from their chat history
      improvement: v.string(), // how to fix this
    })),
    
    // NLP analysis of user
    nlpProfile: v.object({
      primaryModality: v.union(v.literal("visual"), v.literal("auditory"), v.literal("kinesthetic")),
      languagePatterns: v.array(v.string()),
      persuasionSusceptibility: v.object({
        authority: v.number(), // 1-10
        social_proof: v.number(), // 1-10
        scarcity: v.number(), // 1-10
        reciprocity: v.number(), // 1-10
        commitment: v.number(), // 1-10
        liking: v.number(), // 1-10
      }),
    }),
    
    analyzedAt: v.number(),
    chatSampleSize: v.number(), // how many messages analyzed
  }).index("by_user", ["userId"]),

  // Store character remodeling recommendations  
  characterRemodeling: defineTable({
    userId: v.id("users"),
    targetAnalysisId: v.id("analyses"), // the person they're adapting to
    
    // Persona adaptation strategy
    adaptivePersona: v.object({
      targetArchetype: v.string(), // who they're talking to
      recommendedPersona: v.string(), // who they should become
      adaptationLevel: v.number(), // 1-10 how much to change
      keyAdjustments: v.array(v.string()), // specific changes to make
    }),
    
    // Communication remodeling
    communicationAdjustments: v.object({
      toneShifts: v.array(v.string()), // how to adjust tone
      vocabularyChanges: v.array(v.string()), // words to add/remove
      structureChanges: v.array(v.string()), // how to restructure messages
      timingAdjustments: v.array(v.string()), // when to respond, how fast
    }),
    
    // Vulnerability mitigation
    vulnerabilityMitigation: v.array(v.object({
      vulnerability: v.string(),
      mitigationStrategy: v.string(),
      practiceExercises: v.array(v.string()),
      powerLawApplication: v.string(), // which law helps mitigate this
    })),
    
    // Strategic character development
    characterDevelopment: v.object({
      strengthsToAmplify: v.array(v.string()),
      weaknessesToMask: v.array(v.string()),
      newSkillsToAcquire: v.array(v.string()),
      practiceScenarios: v.array(v.string()),
    }),
    
    // Synergy analysis (how user + target work together)
    synergyAnalysis: v.object({
      compatibilityScore: v.number(), // 1-10
      conflictPoints: v.array(v.string()),
      harmonyPoints: v.array(v.string()),
      optimalInteractionStyle: v.string(),
    }),
    
    createdAt: v.number(),
  }).index("by_user", ["userId"])
    .index("by_target", ["targetAnalysisId"]),

  // Meta-Narrative Analysis - Comprehensive temporal relationship intelligence
  metaNarrativeAnalysis: defineTable({
    conversationId: v.id("conversations"),
    userId: v.id("users"),
    
    // Comprehensive analysis data structure
    analysisData: v.object({
      executiveSummary: v.object({
        relationshipPhase: v.string(),
        keyInsights: v.array(v.string()),
        strategicRecommendations: v.array(v.string()),
        riskFactors: v.array(v.string()),
        opportunityMatrix: v.any(),
        nextStepPriorities: v.array(v.string())
      }),
      
      metaNarrativeDeconstruction: v.object({
        relationshipStoryArc: v.any(),
        overallNarrativeThemes: v.array(v.string()),
        relationshipDepthProgression: v.any(),
        influencePatternEvolution: v.any()
      }),
      
      detailedTimelineAnalysis: v.object({
        interactionByInteractionAnalysis: v.array(v.any()),
        overallTimelineInsights: v.any(),
        progressionMetrics: v.any(),
        compoundEffectAnalysis: v.any()
      }),
      
      psychologicalTrajectoryMapping: v.object({
        investorPsychologicalEvolution: v.any(),
        psychologicalInfluenceMapping: v.any()
      }),
      
      strategicPositioningEvolution: v.object({
        marketPositionDevelopment: v.any(),
        authorityAndExpertiseRecognition: v.any(),
        investmentAttractivenessEnhancement: v.any()
      }),
      
      predictiveRelationshipModeling: v.object({
        shortTermTacticalPredictions: v.any(),
        mediumTermStrategicForecasting: v.any(),
        longTermPartnershipPotential: v.any()
      }),
      
      criticalPatternAnalysis: v.object({
        highImpactSuccessMoments: v.array(v.any()),
        criticalFailurePatternRecognition: v.array(v.any()),
        missedOpportunityIdentification: v.array(v.any()),
        replicationStrategies: v.array(v.any()),
        preventionFrameworks: v.array(v.any())
      }),
      
      recalibrationRecommendations: v.any(),
      overallConfidence: v.number(),
      generatedAt: v.number(),
      analysisDepth: v.string(),
      timeframeScope: v.string(),
      focusAreas: v.array(v.string())
    }),
    
    // Analysis configuration
    analysisDepth: v.union(v.literal("standard"), v.literal("comprehensive"), v.literal("deep_intelligence")),
    timeframeScope: v.union(v.literal("full_history"), v.literal("recent_6m"), v.literal("recent_3m")),
    focusAreas: v.array(v.union(
      v.literal("psychological_trajectory"),
      v.literal("strategic_positioning"), 
      v.literal("predictive_modeling"),
      v.literal("critical_moments"),
      v.literal("relationship_evolution")
    )),
    
    // Meta information
    generatedAt: v.number(),
    lastUpdated: v.optional(v.number()),
    confidenceScore: v.number(),
    
    // Recalibration tracking
    recalibrationHistory: v.optional(v.array(v.object({
      timestamp: v.number(),
      triggerEvent: v.string(),
      confidenceChange: v.number(),
      keyUpdates: v.array(v.string())
    })))
  }).index("by_conversation", ["conversationId"])
    .index("by_user", ["userId"])
    .index("by_confidence", ["confidenceScore"])
    .index("by_generated_date", ["generatedAt"]),

  // LLM-powered analysis results
  llmAnalysisResults: defineTable({
    conversationId: v.id("conversations"),
    userId: v.id("users"),
    
    // Analysis type and configuration
    analysisType: v.union(
      v.literal("psychological_profiling"),
      v.literal("strategic_optimization"),
      v.literal("communication_enhancement"),
      v.literal("archetype_refinement"),
      v.literal("vulnerability_assessment")
    ),
    
    // LLM response data
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
    
    // Enhanced communication versions (if applicable)
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
    
    // Personality insights (if applicable)
    personalityInsights: v.optional(v.object({
      refinedArchetype: v.string(),
      personalityTraits: v.array(v.string()),
      communicationPatterns: v.string(),
      motivationalDrivers: v.array(v.string()),
      vulnerabilities: v.array(v.string()),
      trustFactors: v.array(v.string()),
      decisionMakingStyle: v.string()
    })),
    
    // Analysis metadata
    generatedAt: v.number(),
    confidence: v.number(),
    context: v.optional(v.string())
  }).index("by_conversation", ["conversationId"])
    .index("by_user", ["userId"])
    .index("by_type", ["analysisType"])
    .index("by_confidence", ["confidence"])
    .index("by_generated_date", ["generatedAt"]),
});
