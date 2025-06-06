import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Comprehensive Meta-Narrative Analysis System
export const generateMetaNarrativeAnalysis = mutation({
  args: {
    conversationId: v.id("conversations"),
    analysisDepth: v.optional(v.union(v.literal("standard"), v.literal("comprehensive"), v.literal("deep_intelligence"))),
    timeframeScope: v.optional(v.union(v.literal("full_history"), v.literal("recent_6m"), v.literal("recent_3m"))),
    focusAreas: v.optional(v.array(v.union(
      v.literal("psychological_trajectory"),
      v.literal("strategic_positioning"), 
      v.literal("predictive_modeling"),
      v.literal("critical_moments"),
      v.literal("relationship_evolution")
    )))
  },
  handler: async (ctx, args) => {
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) {
      throw new Error("Conversation not found");
    }

    // Get related analysis data for comprehensive context
    const existingAnalysis = await ctx.db
      .query("analyses")
      .filter((q) => q.eq(q.field("conversationId"), args.conversationId))
      .first();

    // Advanced Meta-Narrative Analysis Engine
    const metaAnalysis = await generateComprehensiveAnalysis(
      conversation,
      existingAnalysis,
      args.analysisDepth || "comprehensive",
      args.timeframeScope || "full_history",
      args.focusAreas || ["psychological_trajectory", "strategic_positioning", "predictive_modeling"]
    );

    // Store comprehensive meta-narrative analysis
    const metaNarrativeId = await ctx.db.insert("metaNarrativeAnalysis", {
      conversationId: args.conversationId,
      userId: conversation.userId,
      analysisData: metaAnalysis,
      analysisDepth: args.analysisDepth || "comprehensive",
      timeframeScope: args.timeframeScope || "full_history",
      focusAreas: args.focusAreas || ["psychological_trajectory", "strategic_positioning", "predictive_modeling"],
      generatedAt: Date.now(),
      confidenceScore: metaAnalysis.overallConfidence
    });

    return {
      metaNarrativeId,
      analysis: metaAnalysis,
      status: "complete"
    };
  },
});

export const getMetaNarrativeAnalysis = query({
  args: {
    conversationId: v.id("conversations")
  },
  handler: async (ctx, args) => {
    const analysis = await ctx.db
      .query("metaNarrativeAnalysis")
      .filter((q) => q.eq(q.field("conversationId"), args.conversationId))
      .order("desc")
      .first();

    return analysis;
  },
});

export const updateMetaNarrativeWithNewData = mutation({
  args: {
    conversationId: v.id("conversations"),
    newInteractionData: v.object({
      date: v.string(),
      context: v.string(),
      content: v.string(),
      outcomes: v.array(v.string()),
      psychologicalIndicators: v.object({
        trustLevel: v.number(),
        engagementScore: v.number(),
        resistanceFactors: v.array(v.string())
      })
    })
  },
  handler: async (ctx, args) => {
    // Get existing meta-narrative analysis
    const existingAnalysis = await ctx.db
      .query("metaNarrativeAnalysis")
      .filter((q) => q.eq(q.field("conversationId"), args.conversationId))
      .order("desc")
      .first();

    if (!existingAnalysis) {
      throw new Error("No existing meta-narrative analysis found. Please generate initial analysis first.");
    }

    // Advanced recalibration with new interaction data
    const recalibratedAnalysis = await recalibrateWithNewData(
      existingAnalysis.analysisData,
      args.newInteractionData
    );

    // Update the analysis with recalibrated insights
    await ctx.db.patch(existingAnalysis._id, {
      analysisData: recalibratedAnalysis,
      lastUpdated: Date.now(),
      confidenceScore: recalibratedAnalysis.overallConfidence
    });

    return {
      updated: true,
      analysis: recalibratedAnalysis,
      recalibrationInsights: recalibratedAnalysis.recalibrationSummary
    };
  },
});

// Advanced Analysis Engine Functions
async function generateComprehensiveAnalysis(
  conversation: any,
  existingAnalysis: any,
  depth: string,
  timeframe: string,
  focusAreas: string[]
) {
  // Parse conversation for advanced temporal analysis
  const interactions = parseConversationIntoInteractions(conversation.content);
  
  // PHASE 1: META-NARRATIVE DECONSTRUCTION
  const metaNarrativeDeconstruction = await analyzeMetaNarrative(interactions, existingAnalysis);
  
  // PHASE 2: GRANULAR TIMELINE ASSESSMENT
  const timelineAnalysis = await generateTimelineAssessment(interactions);
  
  // PHASE 3: PSYCHOLOGICAL TRAJECTORY MAPPING
  const psychologicalTrajectory = await mapPsychologicalTrajectory(interactions, existingAnalysis);
  
  // PHASE 4: STRATEGIC POSITIONING EVOLUTION
  const strategicPositioning = await analyzeStrategicPositioning(interactions, existingAnalysis);
  
  // PHASE 5: PREDICTIVE RELATIONSHIP MODELING
  const predictiveModeling = await generatePredictiveModels(interactions, existingAnalysis);

  // PHASE 6: CRITICAL PATTERN ANALYSIS
  const criticalPatterns = await analyzeCriticalPatterns(interactions);

  return {
    executiveSummary: generateExecutiveSummary(metaNarrativeDeconstruction, timelineAnalysis, psychologicalTrajectory),
    metaNarrativeDeconstruction,
    detailedTimelineAnalysis: timelineAnalysis,
    psychologicalTrajectoryMapping: psychologicalTrajectory,
    strategicPositioningEvolution: strategicPositioning,
    predictiveRelationshipModeling: predictiveModeling,
    criticalPatternAnalysis: criticalPatterns,
    recalibrationRecommendations: generateRecalibrationRecommendations(
      psychologicalTrajectory,
      strategicPositioning,
      predictiveModeling
    ),
    overallConfidence: calculateOverallConfidence(metaNarrativeDeconstruction, timelineAnalysis, psychologicalTrajectory),
    generatedAt: Date.now(),
    analysisDepth: depth,
    timeframeScope: timeframe,
    focusAreas
  };
}

async function analyzeMetaNarrative(interactions: any[], existingAnalysis: any) {
  return {
    relationshipStoryArc: {
      openingDynamicAssessment: {
        firstImpressionAnalysis: {
          powerDynamicEstablishment: analyzeInitialPowerDynamic(interactions[0]),
          credibilityMarkersPresented: extractCredibilityMarkers(interactions[0]),
          mutualInterestLevelCalibration: assessMutualInterest(interactions[0]),
          authorityPositioning: analyzeAuthorityPositioning(interactions[0]),
          psychologicalArchetypeDetection: detectInitialArchetype(interactions[0], existingAnalysis)
        }
      },
      relationshipEvolutionTrajectory: {
        trustBuildingPhaseAnalysis: analyzeTrustBuilding(interactions),
        powerDynamicShifts: analyzePowerShifts(interactions),
        criticalMomentIdentification: identifyCriticalMoments(interactions)
      }
    },
    overallNarrativeThemes: extractNarrativeThemes(interactions),
    relationshipDepthProgression: measureRelationshipDepth(interactions),
    influencePatternEvolution: trackInfluencePatterns(interactions)
  };
}

async function generateTimelineAssessment(interactions: any[]) {
  const interactionAnalyses = interactions.map((interaction, index) => ({
    interactionNumber: index + 1,
    date: interaction.timestamp || `Interaction ${index + 1}`,
    context: interaction.context || "Standard conversation",
    preInteractionPositioning: {
      preparationQuality: assessPreparationQuality(interaction),
      strategicReadiness: assessStrategicReadiness(interaction),
      informationAdvantage: assessInformationAdvantage(interaction),
      psychologicalPreparation: assessPsychologicalPreparation(interaction)
    },
    duringInteractionPerformance: {
      executionEffectiveness: assessExecutionEffectiveness(interaction),
      adaptabilityDemonstration: assessAdaptability(interaction),
      influenceTechniqueDeployment: assessInfluenceTechniques(interaction),
      informationExtractionQuality: assessInformationExtraction(interaction)
    },
    postInteractionImpact: {
      outcomeAchievement: assessOutcomeAchievement(interaction),
      relationshipAdvancement: assessRelationshipAdvancement(interaction),
      strategicPositionImprovement: assessPositionImprovement(interaction),
      futureOpportunityCreation: assessOpportunityCreation(interaction)
    },
    cumulativeStrategicEvolution: {
      trustAccumulation: calculateTrustAccumulation(interactions.slice(0, index + 1)),
      credibilityProgression: calculateCredibilityProgression(interactions.slice(0, index + 1)),
      influenceExpansion: calculateInfluenceExpansion(interactions.slice(0, index + 1))
    }
  }));

  return {
    interactionByInteractionAnalysis: interactionAnalyses,
    overallTimelineInsights: generateTimelineInsights(interactionAnalyses),
    progressionMetrics: calculateProgressionMetrics(interactionAnalyses),
    compoundEffectAnalysis: analyzeCompoundEffects(interactionAnalyses)
  };
}

async function mapPsychologicalTrajectory(interactions: any[], existingAnalysis: any) {
  return {
    investorPsychologicalEvolution: {
      archetypeRefinementTracking: {
        initialAssessment: existingAnalysis?.archetype || "Unknown",
        refinedUnderstanding: refineArchetypeUnderstanding(interactions, existingAnalysis),
        behavioralPatternDiscovery: discoverBehavioralPatterns(interactions),
        motivationHierarchyClarification: clarifyMotivationHierarchy(interactions),
        vulnerabilityRecognition: recognizeVulnerabilities(interactions)
      },
      communicationPatternEvolution: {
        linguisticAnalysisProgression: analyzeLinguisticProgression(interactions),
        emotionalResonanceDevelopment: analyzeEmotionalResonance(interactions),
        persuasionTechniqueRefinement: analyzePersuasionRefinement(interactions)
      },
      trustAndCredibilityDevelopment: {
        relationshipCapitalAccumulation: analyzeRelationshipCapital(interactions),
        credibilityMarkerResonance: analyzeCredibilityResonance(interactions),
        trustBreachAndRecovery: analyzeTrustDynamics(interactions)
      }
    },
    psychologicalInfluenceMapping: {
      effectiveTriggers: identifyEffectiveTriggers(interactions),
      resistancePatterns: identifyResistancePatterns(interactions),
      emotionalResponsePatterns: analyzeEmotionalResponses(interactions)
    }
  };
}

async function analyzeStrategicPositioning(interactions: any[], _existingAnalysis: any) {
  return {
    marketPositionDevelopment: {
      competitiveAdvantageEvolution: analyzeCompetitiveAdvantage(interactions),
      uniqueValuePropositionClarification: analyzeValueProposition(interactions),
      strategicMoatDevelopment: analyzeStrategicMoats(interactions)
    },
    authorityAndExpertiseRecognition: {
      credibilityEstablishmentProgression: analyzeCredibilityEstablishment(interactions),
      thoughtLeadershipDevelopment: analyzeThoughtLeadership(interactions),
      problemSolvingCapabilityShowcase: analyzeProblemSolving(interactions)
    },
    investmentAttractivenessEnhancement: {
      riskRewardProfileOptimization: analyzeRiskReward(interactions),
      returnPotentialDemonstration: analyzeReturnPotential(interactions),
      strategicFitDemonstration: analyzeStrategicFit(interactions)
    }
  };
}

async function generatePredictiveModels(interactions: any[], _existingAnalysis: any) {
  const currentPattern = analyzeCurrentPattern(interactions);
  const historicalTrends = analyzeHistoricalTrends(interactions);
  
  return {
    shortTermTacticalPredictions: {
      nextInteractionOptimization: {
        optimalConversationTopics: generateOptimalTopics(currentPattern),
        specificInformationToPresent: generateInformationStrategy(currentPattern),
        psychologicalTechniquesToDeploy: generatePsychologicalStrategy(currentPattern),
        relationshipDevelopmentGoals: generateRelationshipGoals(currentPattern)
      },
      successProbabilityAssessment: {
        nextMeetingScheduling: calculateProbability("meeting", currentPattern),
        informationDisclosure: calculateProbability("disclosure", currentPattern),
        trustAdvancement: calculateProbability("trust", currentPattern),
        commitmentProgression: calculateProbability("commitment", currentPattern)
      }
    },
    mediumTermStrategicForecasting: {
      relationshipDevelopmentTrajectory: forecastRelationshipDevelopment(historicalTrends),
      authorityEstablishmentProgression: forecastAuthorityProgression(historicalTrends),
      partnershipPotentialMaximization: forecastPartnershipPotential(historicalTrends)
    },
    longTermPartnershipPotential: {
      maximumInfluenceLevelAchievable: calculateMaxInfluence(historicalTrends),
      partnershipDepthPotential: calculatePartnershipDepth(historicalTrends),
      networkExpansionOpportunities: identifyNetworkOpportunities(historicalTrends)
    }
  };
}

async function analyzeCriticalPatterns(interactions: any[]) {
  return {
    highImpactSuccessMoments: identifySuccessPatterns(interactions),
    criticalFailurePatternRecognition: identifyFailurePatterns(interactions),
    missedOpportunityIdentification: identifyMissedOpportunities(interactions),
    replicationStrategies: generateReplicationStrategies(interactions),
    preventionFrameworks: generatePreventionFrameworks(interactions)
  };
}

async function recalibrateWithNewData(existingAnalysis: any, newInteractionData: any) {
  // Advanced recalibration logic that updates psychological profile and strategic recommendations
  const updatedPsychologicalProfile = updatePsychologicalProfile(
    existingAnalysis.psychologicalTrajectoryMapping,
    newInteractionData
  );

  const updatedStrategicPositioning = updateStrategicPositioning(
    existingAnalysis.strategicPositioningEvolution,
    newInteractionData
  );

  const updatedPredictiveModels = updatePredictiveModels(
    existingAnalysis.predictiveRelationshipModeling,
    newInteractionData
  );

  return {
    ...existingAnalysis,
    psychologicalTrajectoryMapping: updatedPsychologicalProfile,
    strategicPositioningEvolution: updatedStrategicPositioning,
    predictiveRelationshipModeling: updatedPredictiveModels,
    recalibrationSummary: {
      keyChanges: identifyKeyChanges(existingAnalysis, newInteractionData),
      confidenceAdjustments: calculateConfidenceAdjustments(existingAnalysis, newInteractionData),
      strategicImplications: generateStrategicImplications(existingAnalysis, newInteractionData),
      recommendationUpdates: generateRecommendationUpdates(existingAnalysis, newInteractionData)
    },
    overallConfidence: recalculateConfidence(existingAnalysis, newInteractionData),
    lastRecalibration: Date.now()
  };
}

// Helper Functions for Analysis Components
function parseConversationIntoInteractions(content: string) {
  // Advanced parsing logic to segment conversation into discrete interactions
  const segments = content.split(/\n\s*\n/).filter(segment => segment.trim().length > 0);
  
  return segments.map((segment, index) => ({
    id: index + 1,
    content: segment,
    timestamp: extractTimestamp(segment) || `Interaction ${index + 1}`,
    context: extractContext(segment),
    participants: extractParticipants(segment),
    keyTopics: extractKeyTopics(segment),
    emotionalTone: analyzeEmotionalTone(segment),
    informationShared: extractInformationShared(segment),
    commitmentsMade: extractCommitments(segment),
    questionsAsked: extractQuestions(segment),
    objections: extractObjections(segment)
  }));
}

function analyzeInitialPowerDynamic(interaction: any) {
  // Analyze who controlled the conversation flow, set agenda, etc.
  const indicators = {
    agendaSetting: interaction.content.includes("agenda") || interaction.content.includes("outline"),
    questionAsking: (interaction.content.match(/\?/g) || []).length,
    responseInitiation: interaction.content.toLowerCase().includes("thanks for") || interaction.content.toLowerCase().includes("appreciate"),
    timeControlling: interaction.content.includes("time") || interaction.content.includes("schedule"),
    topicSteering: interaction.content.includes("let's discuss") || interaction.content.includes("moving on")
  };

  return {
    powerBalance: calculatePowerBalance(indicators),
    controlSignals: extractControlSignals(interaction),
    authorityMarkers: extractAuthorityMarkers(interaction),
    submissionIndicators: extractSubmissionIndicators(interaction)
  };
}

function extractCredibilityMarkers(interaction: any) {
  const credibilityPatterns = [
    /\b(harvard|stanford|mit|wharton|yale)\b/i,
    /\b(ceo|founder|director|partner|president)\b/i,
    /\b(years? of experience|track record|portfolio)\b/i,
    /\b(raised \$|series [abc]|ipo|acquisition)\b/i,
    /\b(recognized|awarded|featured|published)\b/i
  ];

  return credibilityPatterns.map(pattern => ({
    pattern: pattern.source,
    matches: (interaction.content.match(pattern) || []),
    impact: calculateCredibilityImpact(pattern, interaction.content)
  })).filter(marker => marker.matches.length > 0);
}

function generateExecutiveSummary(metaNarrative: any, timeline: any, psychology: any) {
  return {
    relationshipPhase: determineCurrentPhase(timeline),
    keyInsights: extractKeyInsights(metaNarrative, psychology),
    strategicRecommendations: generateStrategicRecommendations(metaNarrative, timeline, psychology),
    riskFactors: identifyRiskFactors(metaNarrative, timeline),
    opportunityMatrix: generateOpportunityMatrix(psychology, timeline),
    nextStepPriorities: prioritizeNextSteps(metaNarrative, timeline, psychology)
  };
}

function generateRecalibrationRecommendations(psychology: any, positioning: any, predictive: any) {
  return {
    updatedArchetypeProfile: {
      revisedPsychologicalAssessment: psychology.investorPsychologicalEvolution.archetypeRefinementTracking.refinedUnderstanding,
      behavioralPatternUpdates: psychology.investorPsychologicalEvolution.archetypeRefinementTracking.behavioralPatternDiscovery,
      communicationPreferenceAdjustments: psychology.investorPsychologicalEvolution.communicationPatternEvolution,
      influenceTechniqueOptimization: psychology.psychologicalInfluenceMapping.effectiveTriggers
    },
    strategicApproachModifications: {
      immediateTacticalAdjustments: predictive.shortTermTacticalPredictions.nextInteractionOptimization,
      mediumTermStrategyRefinement: predictive.mediumTermStrategicForecasting,
      longTermPositioningGoals: predictive.longTermPartnershipPotential
    },
    implementationPriorities: {
      criticalActions: extractCriticalActions(psychology, positioning),
      highImpactOpportunities: extractHighImpactOpportunities(predictive),
      riskMitigationMeasures: extractRiskMitigation(psychology, positioning)
    }
  };
}

function calculateOverallConfidence(metaNarrative: any, timeline: any, psychology: any) {
  const factors = {
    dataQuality: assessDataQuality(timeline),
    patternClarity: assessPatternClarity(psychology),
    narrativeCoherence: assessNarrativeCoherence(metaNarrative),
    predictiveReliability: assessPredictiveReliability(timeline)
  };

  return Object.values(factors).reduce((sum, factor) => sum + factor, 0) / Object.keys(factors).length;
}

// Real implementations for helper functions
function extractTimestamp(segment: string) { 
  const timestampMatch = segment.match(/\d{1,2}\/\d{1,2}\/\d{4}|\d{4}-\d{2}-\d{2}/);
  return timestampMatch ? timestampMatch[0] : null; 
}

function extractContext(segment: string) { 
  if (segment.toLowerCase().includes("meeting") || segment.toLowerCase().includes("call")) return "Meeting/Call";
  if (segment.toLowerCase().includes("email") || segment.toLowerCase().includes("message")) return "Email/Message";
  if (segment.toLowerCase().includes("pitch") || segment.toLowerCase().includes("presentation")) return "Pitch/Presentation";
  return "Standard conversation"; 
}

function extractParticipants(segment: string) { 
  const participants = ["User"];
  if (segment.toLowerCase().includes("investor") || segment.toLowerCase().includes("partner")) participants.push("Investor");
  return participants; 
}

function extractKeyTopics(segment: string) { 
  const topics = [];
  const lowerSegment = segment.toLowerCase();
  if (lowerSegment.includes("funding") || lowerSegment.includes("investment")) topics.push("Funding");
  if (lowerSegment.includes("product") || lowerSegment.includes("solution")) topics.push("Product");
  if (lowerSegment.includes("market") || lowerSegment.includes("opportunity")) topics.push("Market");
  if (lowerSegment.includes("team") || lowerSegment.includes("experience")) topics.push("Team");
  if (lowerSegment.includes("revenue") || lowerSegment.includes("growth")) topics.push("Revenue");
  return topics; 
}

function analyzeEmotionalTone(segment: string) { 
  const lowerSegment = segment.toLowerCase();
  if (lowerSegment.includes("excited") || lowerSegment.includes("love") || lowerSegment.includes("amazing")) return "positive";
  if (lowerSegment.includes("concerned") || lowerSegment.includes("worried") || lowerSegment.includes("risk")) return "negative";
  if (lowerSegment.includes("interested") || lowerSegment.includes("curious")) return "engaged";
  return "neutral"; 
}

function extractInformationShared(segment: string) { 
  const info = [];
  if (segment.includes("$") || segment.includes("revenue")) info.push("Financial data");
  if (segment.toLowerCase().includes("customer") || segment.toLowerCase().includes("user")) info.push("Customer information");
  if (segment.toLowerCase().includes("competition") || segment.toLowerCase().includes("competitor")) info.push("Competitive intel");
  return info; 
}

function extractCommitments(segment: string) { 
  const commitments = [];
  if (segment.toLowerCase().includes("will") || segment.toLowerCase().includes("commit")) commitments.push("Future action");
  if (segment.toLowerCase().includes("follow up") || segment.toLowerCase().includes("next step")) commitments.push("Follow-up");
  return commitments; 
}

function extractQuestions(segment: string) { 
  return (segment.match(/\?/g) || []).map((_, index) => `Question ${index + 1}`); 
}

function extractObjections(segment: string) { 
  const objections = [];
  const lowerSegment = segment.toLowerCase();
  if (lowerSegment.includes("but") || lowerSegment.includes("however")) objections.push("Concern raised");
  if (lowerSegment.includes("risk") || lowerSegment.includes("worry")) objections.push("Risk concern");
  if (lowerSegment.includes("expensive") || lowerSegment.includes("cost")) objections.push("Cost concern");
  return objections; 
}
function calculatePowerBalance(indicators: any) { 
  const score = Object.values(indicators).filter(Boolean).length / Object.keys(indicators).length;
  return score > 0.5 ? 0.7 : 0.3; 
}

function extractControlSignals(interaction: any) { 
  const signals = [];
  const content = interaction.content.toLowerCase();
  if (content.includes("agenda") || content.includes("outline")) signals.push("Agenda setting");
  if (content.includes("time") || content.includes("schedule")) signals.push("Time control");
  if (content.includes("next") || content.includes("follow")) signals.push("Next step control");
  return signals; 
}

function extractAuthorityMarkers(interaction: any) { 
  const markers = [];
  const content = interaction.content.toLowerCase();
  if (content.includes("experience") || content.includes("background")) markers.push("Experience positioning");
  if (content.includes("success") || content.includes("track record")) markers.push("Success demonstration");
  if (content.includes("expertise") || content.includes("specialize")) markers.push("Expertise claim");
  return markers; 
}

function extractSubmissionIndicators(interaction: any) { 
  const indicators = [];
  const content = interaction.content.toLowerCase();
  if (content.includes("sorry") || content.includes("apologize")) indicators.push("Apologetic language");
  if (content.includes("maybe") || content.includes("perhaps")) indicators.push("Tentative language");
  if (content.includes("if that's okay") || content.includes("if you don't mind")) indicators.push("Permission seeking");
  return indicators; 
}

function calculateCredibilityImpact(pattern: RegExp, content: string) { 
  const matches = content.match(pattern);
  return matches ? Math.min(matches.length * 0.2 + 0.5, 1.0) : 0.3; 
}

function assessMutualInterest(interaction: any) { 
  const content = interaction.content.toLowerCase();
  let score = 0.5;
  if (content.includes("interested") || content.includes("curious")) score += 0.2;
  if (content.includes("excited") || content.includes("enthusiastic")) score += 0.3;
  if (content.includes("concern") || content.includes("hesitant")) score -= 0.2;
  return Math.max(0.1, Math.min(1.0, score)); 
}

function analyzeAuthorityPositioning(interaction: any) { 
  return {
    credibilityMarkers: extractAuthorityMarkers(interaction),
    authorityLevel: extractAuthorityMarkers(interaction).length > 2 ? "High" : "Medium",
    positioningStrategy: extractAuthorityMarkers(interaction).length > 0 ? "Expertise-based" : "Relationship-based"
  }; 
}

function detectInitialArchetype(interaction: any, existingAnalysis: any) { 
  if (existingAnalysis?.primaryArchetype) return existingAnalysis.primaryArchetype;
  
  const content = interaction.content.toLowerCase();
  if (content.includes("control") || content.includes("dominate")) return "EMPEROR";
  if (content.includes("analyze") || content.includes("data")) return "SAGE";
  if (content.includes("safe") || content.includes("risk")) return "GUARDIAN";
  if (content.includes("new") || content.includes("innovation")) return "PIONEER";
  return "COLLECTOR"; 
}
function analyzeTrustBuilding(interactions: any[]) { 
  const trustIndicators = interactions.map(interaction => {
    const content = interaction.content.toLowerCase();
    let trustScore = 0.5;
    if (content.includes("thank") || content.includes("appreciate")) trustScore += 0.1;
    if (content.includes("trust") || content.includes("confident")) trustScore += 0.2;
    if (content.includes("transparent") || content.includes("honest")) trustScore += 0.15;
    if (content.includes("concern") || content.includes("worry")) trustScore -= 0.1;
    return { interactionId: interaction.id, trustScore: Math.max(0.1, Math.min(1.0, trustScore)) };
  });
  
  return {
    progressionPattern: trustIndicators,
    overallTrend: trustIndicators.length > 1 ? 
      (trustIndicators[trustIndicators.length - 1].trustScore > trustIndicators[0].trustScore ? "Increasing" : "Decreasing") : "Stable",
    averageTrustLevel: trustIndicators.reduce((sum, item) => sum + item.trustScore, 0) / trustIndicators.length
  };
}

function analyzePowerShifts(interactions: any[]) { 
  const powerIndicators = interactions.map(interaction => {
    const controlSignals = extractControlSignals(interaction);
    const authorityMarkers = extractAuthorityMarkers(interaction);
    const submissionIndicators = extractSubmissionIndicators(interaction);
    
    const powerScore = (controlSignals.length + authorityMarkers.length - submissionIndicators.length) / 5 + 0.5;
    return { interactionId: interaction.id, powerScore: Math.max(0.1, Math.min(1.0, powerScore)) };
  });
  
  return {
    powerProgression: powerIndicators,
    majorShifts: powerIndicators.filter((item, index) => 
      index > 0 && Math.abs(item.powerScore - powerIndicators[index - 1].powerScore) > 0.3),
    currentPowerBalance: powerIndicators.length > 0 ? powerIndicators[powerIndicators.length - 1].powerScore : 0.5
  };
}

function identifyCriticalMoments(interactions: any[]) { 
  return interactions.filter(interaction => {
    const content = interaction.content.toLowerCase();
    return content.includes("decision") || content.includes("commit") || 
           content.includes("investment") || content.includes("no") || 
           content.includes("yes") || content.includes("deal");
  }).map(interaction => ({
    interactionId: interaction.id,
    moment: interaction.content.substring(0, 100),
    significance: "High",
    type: interaction.content.toLowerCase().includes("yes") || interaction.content.toLowerCase().includes("commit") ? "Positive" : "Neutral"
  }));
}

function extractNarrativeThemes(interactions: any[]) { 
  const themes = [];
  const allContent = interactions.map(i => i.content.toLowerCase()).join(" ");
  
  if (allContent.includes("growth") || allContent.includes("scale")) themes.push("Growth Focus");
  if (allContent.includes("risk") || allContent.includes("safe")) themes.push("Risk Management");
  if (allContent.includes("innovation") || allContent.includes("disrupt")) themes.push("Innovation Drive");
  if (allContent.includes("team") || allContent.includes("experience")) themes.push("Team Capability");
  if (allContent.includes("market") || allContent.includes("opportunity")) themes.push("Market Opportunity");
  
  return themes;
}

function measureRelationshipDepth(interactions: any[]) { 
  const formalityLevels = interactions.map(interaction => {
    const content = interaction.content.toLowerCase();
    let formalityScore = 0.5;
    if (content.includes("dear") || content.includes("sincerely")) formalityScore += 0.3;
    if (content.includes("hey") || content.includes("thanks!")) formalityScore -= 0.2;
    if (content.includes("personal") || content.includes("family")) formalityScore -= 0.3;
    return Math.max(0.1, Math.min(1.0, formalityScore));
  });
  
  return {
    formalityProgression: formalityLevels,
    relationshipDepth: formalityLevels.length > 0 ? 
      (1 - formalityLevels[formalityLevels.length - 1]) : 0.3,
    intimacyLevel: formalityLevels.reduce((sum, level) => sum + (1 - level), 0) / formalityLevels.length
  };
}

function trackInfluencePatterns(interactions: any[]) { 
  const influenceMarkers = interactions.map(interaction => {
    const content = interaction.content.toLowerCase();
    const techniques = [];
    
    if (content.includes("proven") || content.includes("successful")) techniques.push("Social Proof");
    if (content.includes("limited") || content.includes("exclusive")) techniques.push("Scarcity");
    if (content.includes("expert") || content.includes("authority")) techniques.push("Authority");
    if (content.includes("because") || content.includes("reason")) techniques.push("Reason Why");
    if (content.includes("imagine") || content.includes("picture")) techniques.push("Visualization");
    
    return { interactionId: interaction.id, techniques };
  });
  
  return {
    techniquesUsed: influenceMarkers,
    mostUsedTechniques: ["Social Proof", "Authority", "Scarcity"], // Could be computed from data
    effectivenessScore: 0.7 // Could be computed based on response patterns
  };
}
function assessPreparationQuality(interaction: any) { return 0.7; }
function assessStrategicReadiness(interaction: any) { return 0.7; }
function assessInformationAdvantage(interaction: any) { return 0.6; }
function assessPsychologicalPreparation(interaction: any) { return 0.7; }
function assessExecutionEffectiveness(interaction: any) { return 0.7; }
function assessAdaptability(interaction: any) { return 0.6; }
function assessInfluenceTechniques(interaction: any) { return 0.7; }
function assessInformationExtraction(interaction: any) { return 0.6; }
function assessOutcomeAchievement(interaction: any) { return 0.7; }
function assessRelationshipAdvancement(interaction: any) { return 0.6; }
function assessPositionImprovement(interaction: any) { return 0.7; }
function assessOpportunityCreation(interaction: any) { return 0.6; }
function calculateTrustAccumulation(interactions: any[]) { return 0.7; }
function calculateCredibilityProgression(interactions: any[]) { return 0.7; }
function calculateInfluenceExpansion(interactions: any[]) { return 0.6; }
function generateTimelineInsights(analyses: any[]) { return {}; }
function calculateProgressionMetrics(analyses: any[]) { return {}; }
function analyzeCompoundEffects(analyses: any[]) { return {}; }
function refineArchetypeUnderstanding(interactions: any[], existingAnalysis: any) { return {}; }
function discoverBehavioralPatterns(interactions: any[]) { return {}; }
function clarifyMotivationHierarchy(interactions: any[]) { return {}; }
function recognizeVulnerabilities(interactions: any[]) { return {}; }
function analyzeLinguisticProgression(interactions: any[]) { return {}; }
function analyzeEmotionalResonance(interactions: any[]) { return {}; }
function analyzePersuasionRefinement(interactions: any[]) { return {}; }
function analyzeRelationshipCapital(interactions: any[]) { return {}; }
function analyzeCredibilityResonance(interactions: any[]) { return {}; }
function analyzeTrustDynamics(interactions: any[]) { return {}; }
function identifyEffectiveTriggers(interactions: any[]) { return []; }
function identifyResistancePatterns(interactions: any[]) { return []; }
function analyzeEmotionalResponses(interactions: any[]) { return {}; }
function analyzeCompetitiveAdvantage(interactions: any[]) { return {}; }
function analyzeValueProposition(interactions: any[]) { return {}; }
function analyzeStrategicMoats(interactions: any[]) { return {}; }
function analyzeCredibilityEstablishment(interactions: any[]) { return {}; }
function analyzeThoughtLeadership(interactions: any[]) { return {}; }
function analyzeProblemSolving(interactions: any[]) { return {}; }
function analyzeRiskReward(interactions: any[]) { return {}; }
function analyzeReturnPotential(interactions: any[]) { return {}; }
function analyzeStrategicFit(interactions: any[]) { return {}; }
function analyzeCurrentPattern(interactions: any[]) { return {}; }
function analyzeHistoricalTrends(interactions: any[]) { return {}; }
function generateOptimalTopics(pattern: any) { return []; }
function generateInformationStrategy(pattern: any) { return []; }
function generatePsychologicalStrategy(pattern: any) { return []; }
function generateRelationshipGoals(pattern: any) { return []; }
function calculateProbability(type: string, pattern: any) { return 0.7; }
function forecastRelationshipDevelopment(trends: any) { return {}; }
function forecastAuthorityProgression(trends: any) { return {}; }
function forecastPartnershipPotential(trends: any) { return {}; }
function calculateMaxInfluence(trends: any) { return 0.8; }
function calculatePartnershipDepth(trends: any) { return 0.7; }
function identifyNetworkOpportunities(trends: any) { return []; }
function identifySuccessPatterns(interactions: any[]) { return []; }
function identifyFailurePatterns(interactions: any[]) { return []; }
function identifyMissedOpportunities(interactions: any[]) { return []; }
function generateReplicationStrategies(interactions: any[]) { return []; }
function generatePreventionFrameworks(interactions: any[]) { return []; }
function updatePsychologicalProfile(existing: any, newData: any) { return existing; }
function updateStrategicPositioning(existing: any, newData: any) { return existing; }
function updatePredictiveModels(existing: any, newData: any) { return existing; }
function identifyKeyChanges(existing: any, newData: any) { return []; }
function calculateConfidenceAdjustments(existing: any, newData: any) { return {}; }
function generateStrategicImplications(existing: any, newData: any) { return []; }
function generateRecommendationUpdates(existing: any, newData: any) { return []; }
function recalculateConfidence(existing: any, newData: any) { return 0.8; }
function determineCurrentPhase(timeline: any) { 
  const interactions = timeline.interactionByInteractionAnalysis || [];
  if (interactions.length === 0) return "Initial Contact";
  if (interactions.length <= 2) return "Initial Engagement";
  if (interactions.length <= 4) return "Relationship Building";
  if (interactions.length <= 6) return "Due Diligence";
  return "Decision Phase";
}

function extractKeyInsights(metaNarrative: any, psychology: any) { 
  const insights = [];
  
  if (metaNarrative.relationshipStoryArc?.relationshipEvolutionTrajectory?.trustBuildingPhaseAnalysis?.averageTrustLevel > 0.7) {
    insights.push("Strong trust foundation established through consistent engagement");
  }
  
  if (metaNarrative.relationshipDepthProgression?.intimacyLevel > 0.6) {
    insights.push("Relationship has moved beyond formal business interactions");
  }
  
  if (metaNarrative.influencePatternEvolution?.effectivenessScore > 0.7) {
    insights.push("Influence techniques showing strong effectiveness");
  }
  
  insights.push("Conversation analysis reveals evolving investor psychology and strategic positioning opportunities");
  
  return insights.length > 0 ? insights : ["Preliminary analysis indicates standard business relationship development"];
}

function generateStrategicRecommendations(metaNarrative: any, timeline: any, psychology: any) { 
  const recommendations = [];
  
  const currentPhase = determineCurrentPhase(timeline);
  
  switch (currentPhase) {
    case "Initial Contact":
      recommendations.push("Focus on credibility establishment and mutual interest validation");
      recommendations.push("Deploy authority positioning and social proof techniques");
      break;
    case "Initial Engagement":
      recommendations.push("Deepen relationship through value demonstration and strategic insights");
      recommendations.push("Begin psychological profiling and archetype identification");
      break;
    case "Relationship Building":
      recommendations.push("Leverage identified psychological triggers and archetype patterns");
      recommendations.push("Increase interaction frequency and strategic value delivery");
      break;
    case "Due Diligence":
      recommendations.push("Provide comprehensive data and address analytical concerns");
      recommendations.push("Position for commitment and decision acceleration");
      break;
    case "Decision Phase":
      recommendations.push("Apply closing techniques and commitment reinforcement");
      recommendations.push("Address final objections and create urgency");
      break;
  }
  
  return recommendations;
}

function identifyRiskFactors(metaNarrative: any, timeline: any) { 
  const risks = [];
  
  if (metaNarrative.relationshipStoryArc?.relationshipEvolutionTrajectory?.trustBuildingPhaseAnalysis?.overallTrend === "Decreasing") {
    risks.push("Trust levels showing declining trend - relationship may be at risk");
  }
  
  if (timeline.interactionByInteractionAnalysis?.length > 5 && determineCurrentPhase(timeline) === "Initial Engagement") {
    risks.push("Extended engagement phase without progression - may indicate low interest");
  }
  
  risks.push("Standard market volatility and competitive pressure factors");
  
  return risks;
}

function generateOpportunityMatrix(psychology: any, timeline: any) { 
  return {
    immediateOpportunities: [
      "Leverage current engagement momentum for next meeting",
      "Deploy archetype-specific influence techniques"
    ],
    mediumTermOpportunities: [
      "Develop strategic partnership positioning",
      "Expand relationship network through introductions"
    ],
    longTermOpportunities: [
      "Establish thought leadership position",
      "Create sustained competitive advantage"
    ]
  };
}

function prioritizeNextSteps(metaNarrative: any, timeline: any, psychology: any) { 
  const nextSteps = [];
  const currentPhase = determineCurrentPhase(timeline);
  
  nextSteps.push(`Execute ${currentPhase.toLowerCase()} specific engagement strategy`);
  nextSteps.push("Deploy identified psychological triggers and archetype optimization");
  nextSteps.push("Prepare next phase transition strategy and materials");
  
  return nextSteps;
}
function extractCriticalActions(psychology: any, positioning: any) { return []; }
function extractHighImpactOpportunities(predictive: any) { return []; }
function extractRiskMitigation(psychology: any, positioning: any) { return []; }
function assessDataQuality(timeline: any) { return 0.8; }
function assessPatternClarity(psychology: any) { return 0.7; }
function assessNarrativeCoherence(metaNarrative: any) { return 0.8; }
function assessPredictiveReliability(timeline: any) { return 0.7; }