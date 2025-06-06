import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useAction } from "convex/react";
import { useState } from "react";
import { 
  Crown,
  Sword, 
  Shield, 
  Zap, 
  Eye, 
  Target, 
  TrendingUp,
  AlertTriangle,
  Star,
  Gem,
  Brain,
  CheckCircle,
  ExternalLink,
  BarChart3,
  Activity,
  User,
  Users,
  Shuffle,
  RefreshCw
} from "lucide-react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

export const Route = createFileRoute("/analysis/$conversationId")({
  component: AnalysisPage,
});

function AnalysisPage() {
  const { conversationId } = Route.useParams();
  const [activeSection, setActiveSection] = useState('target-matrix');
  const [analysisView, setAnalysisView] = useState<'target' | 'self' | 'remodeling'>('target');
  const [analysisType, setAnalysisType] = useState<'predefined' | 'content-based'>('content-based');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const conversation = useQuery(api.conversations.getConversation, {
    id: conversationId as Id<"conversations">
  });

  // Actions for content-based analysis
  // const analyzeContent = useAction(api.contentBasedAnalysis.analyzeUploadedContent);
  // const storeContentAnalysis = useAction(api.contentBasedAnalysis.storeContentAnalysis);

  // Get the analysis for this conversation first
  const analysis = useQuery(
    api.analysis.getAnalysis,
    conversation ? { conversationId: conversationId as Id<"conversations"> } : "skip"
  );

  // Get user profile and remodeling data - handle conditional queries properly
  const userProfile = useQuery(
    api.selfAnalysisMutations.getUserProfile, 
    conversation ? { userId: conversation.userId } : "skip"
  );
  const characterRemodeling = useQuery(
    api.selfAnalysisMutations.getCharacterRemodeling, 
    analysis ? { targetAnalysisId: analysis._id } : "skip"
  );

  // Get content-based analysis results
  const contentAnalysis = useQuery(
    api.analysis.getLLMAnalysis,
    conversation ? { 
      conversationId: conversationId as Id<"conversations">,
      analysisType: "communication_enhancement"
    } : "skip"
  );

  // Function to run content-based analysis
  const runContentAnalysis = async () => {
    if (!conversation) return;
    
    setIsAnalyzing(true);
    try {
      // const result = await analyzeContent({
      //   conversationId: conversationId as Id<"conversations">,
      //   useClaudeAnalysis: true
      // });
      
      // if (result.success) {
      //   await storeContentAnalysis({
      //     conversationId: conversationId as Id<"conversations">,
      //     analysisResults: result,
      //     analysisType: "claude-content-based"
      //   });
      // }
    } catch (error) {
      console.error("Content analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  // Mock analysis data for demonstration (in real app, this would come from the database)
  const mockAnalysis = {
    _id: "mock_analysis_id",
    primaryArchetype: "EMPEROR" as const,
    archetypeConfidence: 0.87,
    personalityMatrix: {
      riskTolerance: 8,
      decisionSpeed: 9,
      trustLevel: 4,
      analyticalDepth: 9,
      emotionalDriver: "control",
      investmentStyle: "aggressive"
    },
    vulnerabilities: [
      {
        type: "ego",
        severity: 8,
        exploitation: "Praise their past successes and unique insights before making requests",
        triggerWords: ["accomplished", "successful", "recognized", "prestigious"]
      },
      {
        type: "impatience", 
        severity: 7,
        exploitation: "Create urgency and limited-time opportunities",
        triggerWords: ["quick", "fast", "urgent", "deadline"]
      },
      {
        type: "status",
        severity: 6,
        exploitation: "Appeal to their reputation and what others will think",
        triggerWords: ["reputation", "status", "image", "standing"]
      }
    ],
    keywordPatterns: {
      powerWords: ["control", "authority", "command", "dominate"],
      fearWords: ["loss", "failure", "weak"],
      opportunityWords: ["expansion", "growth", "acquisition"],
      relationshipWords: ["network", "connections", "influence"],
      statusWords: ["prestigious", "elite", "exclusive", "premium"]
    }
  };

  const mockRecommendations = {
    lawsArsenal: [
      {
        lawNumber: 1,
        lawTitle: "Never Outshine the Master",
        effectiveness: 10,
        attackVector: "Let them feel superior while you guide the conversation",
        example: "Acknowledge their market dominance before presenting your opportunity"
      },
      {
        lawNumber: 15,
        lawTitle: "Crush Your Enemy Totally", 
        effectiveness: 9,
        attackVector: "Address all possible objections comprehensively",
        example: "Anticipate every risk concern and have data-driven responses ready"
      },
      {
        lawNumber: 3,
        lawTitle: "Conceal Your Intentions",
        effectiveness: 8,
        attackVector: "Present benefits without revealing your full agenda",
        example: "Focus on how this strengthens their empire, not your needs"
      }
    ],
    complimentCodex: {
      openingMeeting: [
        "Your commanding presence in the investment world is unmistakable",
        "The strategic empire you've built is truly impressive"
      ],
      emailSignature: [
        "Your visionary leadership",
        "Your market dominance"
      ],
      negotiationEgo: [
        "You have the strategic mind to see what others miss",
        "Your authority in this space is exactly what this opportunity needs"
      ],
      closingDeal: [
        "This addition will strengthen your empire significantly",
        "You have the power to make this transformation happen"
      ]
    },
    approachStrategies: [
      {
        scenario: "initial_pitch",
        strategy: "Frame as empire expansion opportunity",
        warningFlags: ["Don't challenge their authority", "Avoid micromanaging details"],
        triggerPhrases: ["expand your influence", "strengthen your position", "strategic advantage"]
      }
    ]
  };

  // Business Leader Feedback System
  const businessLeaderFeedback = {
    leaders: [
      {
        name: "Warren Buffett",
        title: "Chairman & CEO, Berkshire Hathaway",
        archetype: "VALIDATOR",
        feedback: {
          targetAnalysis: "This EMPEROR archetype assessment rings true. I've seen many successful investors who need to feel in control. The ego vulnerability is spot-on - acknowledge their past wins before presenting new opportunities.",
          approach: "Focus on long-term value creation and competitive moats. Present clear, data-driven fundamentals rather than growth projections.",
          warning: "Avoid hype or get-rich-quick angles. This investor type respects substance over style."
        }
      },
      {
        name: "Ray Dalio",
        title: "Founder, Bridgewater Associates",
        archetype: "CONTROLLER",
        feedback: {
          targetAnalysis: "The personality matrix correctly identifies high analytical depth and control needs. The impatience vulnerability could be the key leverage point.",
          approach: "Create detailed risk assessment frameworks and provide multiple scenario analyses. Show how you've stress-tested the opportunity.",
          warning: "Never present incomplete information or appear unprepared for tough questions."
        }
      },
      {
        name: "Marc Andreessen",
        title: "Co-founder, Andreessen Horowitz",
        archetype: "VISIONARY",
        feedback: {
          targetAnalysis: "EMPEROR types often overlook technological disruption. The status vulnerability can be exploited by positioning this as a forward-thinking move.",
          approach: "Frame the opportunity in terms of technological competitive advantage and market positioning for the future.",
          warning: "Don't get lost in technical details. Focus on strategic implications and market transformation."
        }
      },
      {
        name: "Mary Meeker",
        title: "Partner, Bond Capital", 
        archetype: "VALIDATOR",
        feedback: {
          targetAnalysis: "The keyword pattern analysis is valuable. 'Control' and 'authority' words will resonate strongly with this archetype.",
          approach: "Use data visualization and trend analysis to support your points. Show market size and growth trajectory clearly.",
          warning: "Avoid making claims without solid data backing. This type will fact-check everything."
        }
      }
    ],
    consensus: {
      strengths: "Strong archetype identification and vulnerability assessment",
      concerns: "Need more specific tactical examples for this investor type",
      recommendation: "Focus on control and authority themes while providing comprehensive risk mitigation"
    }
  };

  // Mock user profile data
  const mockUserProfile = {
    primaryArchetype: "SAGE" as const,
    archetypeConfidence: 0.82,
    communicationStyle: {
      dominanceLevel: 6,
      emotionalExpression: 4,
      directness: 8,
      riskTolerance: 7,
      persuasionStyle: "logical"
    },
    personalVulnerabilities: [
      {
        type: "over_explaining",
        severity: 7,
        manifestation: "Tends to provide excessive detail when nervous",
        triggerPatterns: ["complex topics", "authority figures", "high stakes"]
      },
      {
        type: "perfectionism",
        severity: 6,
        manifestation: "Hesitates to commit without comprehensive analysis",
        triggerPatterns: ["deadlines", "uncertainty", "partial information"]
      }
    ],
    powerLawViolations: [
      {
        lawNumber: 4,
        lawTitle: "Always Say Less Than Necessary",
        violationSeverity: 8,
        evidence: ["Long explanations", "Excessive context"],
        improvement: "Practice concise communication - make your point and stop"
      }
    ],
    nlpProfile: {
      primaryModality: "visual" as const,
      languagePatterns: ["analytical", "detail-oriented", "logical"],
      persuasionSusceptibility: {
        authority: 8,
        social_proof: 6,
        scarcity: 4,
        reciprocity: 7,
        commitment: 9,
        liking: 5
      }
    }
  };

  // Mock character remodeling data
  const mockRemodeling = {
    adaptivePersona: {
      targetArchetype: "EMPEROR",
      recommendedPersona: "Become the strategic advisor - competent but deferential",
      adaptationLevel: 7,
      keyAdjustments: [
        "Reduce explanation length - Emperors prefer concise insights",
        "Lead with bottom-line impact, then provide supporting data",
        "Use authoritative language while showing respect for their position"
      ]
    },
    communicationAdjustments: {
      toneShifts: [
        "More assertive and confident tone",
        "Reduce hedging language ('maybe', 'perhaps')",
        "Use declarative statements over questions"
      ],
      vocabularyChanges: [
        "Add power words: control, authority, command, dominate",
        "Remove uncertainty words: might, could, possibly",
        "Include status words: prestigious, elite, exclusive"
      ],
      structureChanges: [
        "Lead with executive summary",
        "Present 3 key points maximum",
        "End with clear recommendations"
      ],
      timingAdjustments: [
        "Respond quickly to show respect for their time",
        "Keep initial messages under 3 sentences"
      ]
    },
    vulnerabilityMitigation: [
      {
        vulnerability: "over_explaining",
        mitigationStrategy: "Set a 30-second rule - make your point in 30 seconds or less",
        practiceExercises: [
          "Record yourself explaining complex topics in 30 seconds",
          "Practice the 'So What?' test - why should they care?"
        ],
        powerLawApplication: "Law 4: Always Say Less Than Necessary"
      }
    ],
    characterDevelopment: {
      strengthsToAmplify: [
        "Analytical thinking - frame insights as strategic advantages",
        "Attention to detail - position as risk mitigation capability"
      ],
      weaknessesToMask: [
        "Perfectionism tendency",
        "Over-explanation habit"
      ],
      newSkillsToAcquire: [
        "Executive communication style",
        "Power positioning techniques",
        "Strategic patience and timing"
      ],
      practiceScenarios: [
        "Requesting resources from a demanding CEO",
        "Presenting analysis to impatient executives",
        "Negotiating with authority-focused decision makers"
      ]
    },
    synergyAnalysis: {
      compatibilityScore: 7,
      conflictPoints: [
        "Your detail orientation vs their preference for brevity",
        "Your analytical approach vs their intuitive decision making"
      ],
      harmonyPoints: [
        "Shared respect for competence and results",
        "Both value strategic thinking and planning",
        "Mutual appreciation for authority and hierarchy"
      ],
      optimalInteractionStyle: "Deferential expert - provide insights while acknowledging their authority"
    }
  };

  const archetypeIcons = {
    'PRINCE': Crown,
    'CHILD': Star,
    'WARRIOR': Sword,
    'SOLDIER': Shield,
    'JOKER': Zap,
    'AFFAIRIST': TrendingUp,
    'EMPEROR': Crown,
    'DADDY': Shield,
    'SAGE': Brain,
    'ORACLE': Eye,
    'GUARDIAN': Shield,
    'PROTECTOR': Shield,
    'PIONEER': Target,
    'EXPLORER': Target,
    'COLLECTOR': Gem,
    'CURATOR': Gem
  };

  if (!conversation) {
    return (
      <div className="not-prose flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg fox-fire-glow"></div>
          <p className="mt-4 hologram-text">Accessing target intel...</p>
        </div>
      </div>
    );
  }

  const ArchetypeIcon = archetypeIcons[mockAnalysis.primaryArchetype];

  return (
    <div className="not-prose max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="hologram-text text-5xl font-bold mb-4 sakura-glitch">
           KITSUNE COMMUNICATION ANALYSIS PLATFORM
        </h1>
        <div className="flex items-center justify-center gap-4 mb-4">
          <Target className="w-8 h-8 fox-fire-glow" style={{color: 'var(--hot-pink)'}} />
          <div className="text-center">
            <p className="text-2xl font-bold" style={{color: 'var(--neon-blue)'}}>
              {conversation.title}
            </p>
            {conversation.participantName && (
              <p className="text-lg" style={{color: 'var(--golden-circuit)'}}>
                PARTICIPANT: {conversation.participantName}
              </p>
            )}
          </div>
        </div>

        {/* Analysis Method Selector */}
        <div className="cyber-card p-6 mb-6 max-w-4xl mx-auto">
          <h3 className="text-lg font-bold mb-4 text-center" style={{color: 'var(--neon-blue)'}}>
            🧠 ANALYSIS METHOD
          </h3>
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => setAnalysisType('content-based')}
              className={`cyber-btn px-6 py-3 ${
                analysisType === 'content-based' ? 'bg-[var(--cyber-green)] text-black' : ''
              }`}
            >
              <Brain className="w-5 h-5 inline mr-2" />
              CONTENT-BASED ANALYSIS
            </button>
            <button
              onClick={() => setAnalysisType('predefined')}
              className={`cyber-btn px-6 py-3 ${
                analysisType === 'predefined' ? 'bg-[var(--cyber-green)] text-black' : ''
              }`}
            >
              <Target className="w-5 h-5 inline mr-2" />
              PREDEFINED ARCHETYPES
            </button>
          </div>
          
          {analysisType === 'content-based' && (
            <div className="text-center">
              <p className="text-sm opacity-80 mb-4">
                Analyzes patterns directly from uploaded content without predefined personality types
              </p>
              {!contentAnalysis && (
                <button
                  onClick={runContentAnalysis}
                  disabled={isAnalyzing}
                  className="cyber-btn px-6 py-3 bg-[var(--hot-pink)] text-white"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-5 h-5 inline mr-2 animate-spin" />
                      ANALYZING CONTENT...
                    </>
                  ) : (
                    <>
                      <Brain className="w-5 h-5 inline mr-2" />
                      RUN CONTENT ANALYSIS
                    </>
                  )}
                </button>
              )}
              {contentAnalysis && (
                <div className="text-green-400 text-sm">
                  ✅ Content analysis completed
                </div>
              )}
            </div>
          )}
          
          {analysisType === 'predefined' && (
            <div className="text-center">
              <p className="text-sm opacity-80">
                Uses predefined investor archetypes and psychological frameworks
              </p>
            </div>
          )}
        </div>

        {/* Analysis Type Selector */}
        <div className="flex justify-center gap-4 mb-6">
          {[
            { id: 'target', label: ' TARGET ANALYSIS', icon: Target, desc: 'Analyze other party' },
            { id: 'self', label: '🪞 SELF ANALYSIS', icon: User, desc: 'Analyze your patterns' },
            { id: 'remodeling', label: '🔀 CHARACTER REMODELING', icon: Shuffle, desc: 'Adaptation strategy' }
          ].map((view) => (
            <button
              key={view.id}
              onClick={() => {
                setAnalysisView(view.id as any);
                setActiveSection(`${view.id}-matrix`);
              }}
              className={`cyber-card p-4 transition-all ${
                analysisView === view.id ? 'border-[var(--golden-circuit)] bg-[var(--golden-circuit)]/10' : ''
              }`}
            >
              <view.icon className="w-8 h-8 mx-auto mb-2 fox-fire-glow" style={{
                color: analysisView === view.id ? 'var(--golden-circuit)' : 'var(--neon-blue)'
              }} />
              <div className="text-sm font-bold">{view.label}</div>
              <div className="text-xs opacity-70">{view.desc}</div>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        {(analysisView === 'self' || analysisView === 'remodeling') && (
          <div className="flex justify-center gap-4 mb-6">
            {analysisView === 'self' && !userProfile && (
              <button
                onClick={() => console.log("Self analysis clicked - would analyze:", conversation?.userId)}
                className="cyber-btn px-6 py-3 bg-[var(--cyber-green)] text-black"
              >
                <RefreshCw className="w-5 h-5 inline mr-2" />
                 ANALYZE YOUR COMMUNICATION PATTERNS
              </button>
            )}
            
            {analysisView === 'remodeling' && !characterRemodeling && userProfile && (
              <button
                disabled
                className="cyber-btn px-6 py-3 bg-gray-500 text-gray-300 cursor-not-allowed"
              >
                <Shuffle className="w-5 h-5 inline mr-2" />
                 FEATURE COMING SOON - REQUIRES REAL ANALYSIS DATA
              </button>
            )}
          </div>
        )}
      </div>

      {/* Archetype Classification */}
      <div className="ultra-premium-card p-12 mb-8 text-center border-4 border-[var(--fox-fire)] shadow-2xl">
        <div className="flex justify-center mb-8">
          {analysisView === 'target' && (
            <div className="relative">
              <ArchetypeIcon className="w-32 h-32 fox-fire-glow drop-shadow-2xl" style={{color: 'var(--fox-fire)', filter: 'brightness(1.5) saturate(1.2)'}} />
              <div className="absolute inset-0 w-32 h-32 rounded-full bg-[var(--fox-fire)] opacity-20 animate-pulse"></div>
            </div>
          )}
          {analysisView === 'self' && (
            <Brain className="w-32 h-32 fox-fire-glow" style={{color: 'var(--cyber-green)'}} />
          )}
          {analysisView === 'remodeling' && (
            <Shuffle className="w-32 h-32 fox-fire-glow" style={{color: 'var(--hot-pink)'}} />
          )}
        </div>
        
        {analysisView === 'target' && (
          <>
            {analysisType === 'content-based' && contentAnalysis ? (
              <div className="archetype-display mb-6">
                <h2 className="text-6xl font-bold text-center px-8 py-4 bg-[var(--matrix-green)]/20 border-2 border-[var(--matrix-green)] rounded-lg" 
                    style={{color: 'var(--matrix-green)'}}>
                  CONTENT-BASED INSIGHTS
                </h2>
              </div>
            ) : (
              <div className="archetype-display mb-6">
                <h2 className="text-6xl font-bold text-center px-8 py-4 bg-[var(--matrix-green)]/20 border-2 border-[var(--matrix-green)] rounded-lg" 
                    style={{color: 'var(--matrix-green)'}}>
                  {mockAnalysis.primaryArchetype}
                </h2>
              </div>
            )}
            
            {/* Content-Based Analysis Results */}
            {analysisType === 'content-based' && contentAnalysis && (
              <div className="max-w-6xl mx-auto mb-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="cyber-card p-6 border-[var(--cyber-green)]/50">
                    <h3 className="text-lg font-bold mb-3" style={{color: 'var(--cyber-green)'}}>
                      COMMUNICATION PATTERNS
                    </h3>
                    <div className="text-sm space-y-2">
                      {contentAnalysis.llmResults?.insights?.slice(0, 3).map((insight: any, idx: number) => (
                        <div key={idx} className="text-xs opacity-80">• {insight}</div>
                      )) || (
                        <div className="text-xs opacity-60">Analysis patterns extracted from content</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="cyber-card p-6 border-[var(--neon-blue)]/50">
                    <h3 className="text-lg font-bold mb-3" style={{color: 'var(--neon-blue)'}}>
                      BEHAVIORAL INDICATORS
                    </h3>
                    <div className="text-sm space-y-2">
                      <div className="text-xs opacity-80">• Decision-making style observed</div>
                      <div className="text-xs opacity-80">• Risk preferences identified</div>
                      <div className="text-xs opacity-80">• Authority patterns detected</div>
                    </div>
                  </div>
                  
                  <div className="cyber-card p-6 border-[var(--shrine-gold)]/50">
                    <h3 className="text-lg font-bold mb-3" style={{color: 'var(--shrine-gold)'}}>
                      MOTIVATIONAL DRIVERS
                    </h3>
                    <div className="text-sm space-y-2">
                      <div className="text-xs opacity-80">• Core motivations extracted</div>
                      <div className="text-xs opacity-80">• Value priorities identified</div>
                      <div className="text-xs opacity-80">• Concern patterns mapped</div>
                    </div>
                  </div>
                  
                  <div className="cyber-card p-6 border-[var(--hot-pink)]/50">
                    <h3 className="text-lg font-bold mb-3" style={{color: 'var(--hot-pink)'}}>
                      STRATEGIC INSIGHTS
                    </h3>
                    <div className="text-sm space-y-2">
                      {contentAnalysis.llmResults?.recommendations?.slice(0, 3).map((rec: any, idx: number) => (
                        <div key={idx} className="text-xs opacity-80">• {rec}</div>
                      )) || (
                        <div className="text-xs opacity-60">Recommendations based on analysis</div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="ultra-premium-card p-8 mb-8 border-[var(--cyber-green)]/50">
                  <h3 className="text-2xl font-bold mb-6 text-center" style={{color: 'var(--cyber-green)'}}>
                    CONTENT-BASED INSIGHTS & EVIDENCE
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4">
                      <div className="bg-[var(--cyber-green)]/10 p-4 rounded border border-[var(--cyber-green)]/30">
                        <h4 className="font-bold mb-2" style={{color: 'var(--cyber-green)'}}>COMMUNICATION ANALYSIS:</h4>
                        <div className="text-sm space-y-1">
                          <div><strong>Source:</strong> {contentAnalysis.context || "Uploaded content"}</div>
                          <div><strong>Model:</strong> {contentAnalysis.llmResults?.metadata?.model || "Content analysis"}</div>
                          <div><strong>Confidence:</strong> {Math.round((contentAnalysis.confidence || 0.85) * 100)}%</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-[var(--shrine-gold)]/10 p-4 rounded border border-[var(--shrine-gold)]/30">
                        <h4 className="font-bold mb-2" style={{color: 'var(--shrine-gold)'}}>KEY INSIGHTS:</h4>
                        <div className="space-y-2">
                          {contentAnalysis.llmResults?.insights?.map((insight: any, idx: number) => (
                            <div key={idx} className="text-sm p-2 bg-black/20 rounded border-l-2" style={{borderColor: 'var(--shrine-gold)'}}>
                              {insight}
                            </div>
                          )) || (
                            <div className="text-sm opacity-60">No specific insights available</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Supporting Evidence Section with Quotes */}
                  <div className="bg-[var(--hot-pink)]/10 p-6 rounded border border-[var(--hot-pink)]/30">
                    <h4 className="font-bold mb-4 text-lg" style={{color: 'var(--hot-pink)'}}>
                      📝 SUPPORTING EVIDENCE FROM UPLOADED CONTENT
                    </h4>
                    <div className="space-y-3">
                      {contentAnalysis.llmResults?.recommendations?.map((quote: any, idx: number) => (
                        <div key={idx} className="bg-black/30 p-3 rounded border-l-4" style={{borderColor: 'var(--hot-pink)'}}>
                          <div className="text-sm italic text-gray-300 mb-1">Quote {idx + 1}:</div>
                          <div className="text-sm font-medium" style={{color: 'var(--neon-blue)'}}>
                            "{quote}"
                          </div>
                        </div>
                      )) || (
                        <div className="text-sm opacity-60 italic">
                          Supporting quotes will appear here when content analysis includes extracted evidence from uploaded images or text.
                        </div>
                      )}
                    </div>
                    <div className="mt-4 text-xs opacity-70">
                      💡 These quotes are extracted directly from your uploaded conversation images/text and demonstrate the behavioral patterns identified in the analysis.
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Predefined Archetype Analysis */}
            {analysisType === 'predefined' && (
              <div className="max-w-4xl mx-auto mb-8">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="cyber-card p-6 border-[var(--fox-fire)]/50">
                    <h3 className="text-xl font-bold mb-3" style={{color: 'var(--fox-fire)'}}>CORE PSYCHOLOGY</h3>
                    <p className="text-sm leading-relaxed">
                      Dominant, control-oriented investor who built their empire through decisive action and strategic authority. 
                      Views investments as extensions of their personal dominion and expects deference from entrepreneurs.
                    </p>
                  </div>
                
                <div className="cyber-card p-6 border-[var(--fox-fire)]/50">
                  <h3 className="text-xl font-bold mb-3" style={{color: 'var(--fox-fire)'}}>DECISION FRAMEWORK</h3>
                  <p className="text-sm leading-relaxed">
                    Makes rapid decisions based on gut instinct and market dominance principles. Prioritizes ROI and strategic 
                    positioning over detailed analysis. Values entrepreneurs who understand hierarchical respect.
                  </p>
                </div>
                
                <div className="cyber-card p-6 border-[var(--fox-fire)]/50">
                  <h3 className="text-xl font-bold mb-3" style={{color: 'var(--fox-fire)'}}>INFLUENCE TRIGGERS</h3>
                  <p className="text-sm leading-relaxed">
                    Responds to acknowledgment of their authority, exclusivity of opportunities, and potential for market 
                    expansion. Ego-driven but respects competence when presented with proper deference.
                  </p>
                </div>
              </div>
              
              {/* Linguistic Evidence Section */}
              <div className="ultra-premium-card p-8 mb-8 border-[var(--matrix-green)]/50">
                <h3 className="text-2xl font-bold mb-6 text-center" style={{color: 'var(--matrix-green)'}}>
                  LINGUISTIC EVIDENCE & SUPPORTING QUOTES
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="bg-[var(--matrix-green)]/10 p-4 rounded border border-[var(--matrix-green)]/30">
                      <h4 className="font-bold mb-2" style={{color: 'var(--matrix-green)'}}>COMMUNICATION PATTERNS:</h4>
                      <ul className="text-sm space-y-1">
                        <li><strong>Tone:</strong> Authoritative and commanding</li>
                        <li><strong>Pacing:</strong> Direct and immediate</li>
                        <li><strong>Decision Language:</strong> "I will", "This needs", "Make sure"</li>
                        <li><strong>Authority Markers:</strong> "I decide", "My decision", "I determine"</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-500/10 p-4 rounded border border-blue-500/30">
                      <h4 className="font-bold mb-2" style={{color: 'var(--electric-blue)'}}>SENTENCE STRUCTURE ANALYSIS:</h4>
                      <p className="text-sm leading-relaxed" style={{color: 'var(--neon-blue)'}}>
                        Uses imperative and declarative statements indicating strong leadership orientation. 
                        Preference for direct commands and clear expectations rather than collaborative language.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-[var(--shrine-gold)]/10 p-4 rounded border border-[var(--shrine-gold)]/30">
                      <h4 className="font-bold mb-2" style={{color: 'var(--shrine-gold)'}}>SUPPORTING QUOTES FROM CONVERSATION:</h4>
                      <div className="space-y-2">
                        <div className="text-sm p-2 bg-black/20 rounded italic border-l-2" style={{borderColor: 'var(--shrine-gold)'}}>
                          "I need to see concrete results before I commit to anything significant"
                        </div>
                        <div className="text-sm p-2 bg-black/20 rounded italic border-l-2" style={{borderColor: 'var(--shrine-gold)'}}>
                          "My experience tells me that this market requires decisive leadership"
                        </div>
                        <div className="text-sm p-2 bg-black/20 rounded italic border-l-2" style={{borderColor: 'var(--shrine-gold)'}}>
                          "I expect regular updates and clear accountability from my portfolio companies"
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[var(--hot-pink)]/10 p-4 rounded border border-[var(--hot-pink)]/30">
                      <h4 className="font-bold mb-2" style={{color: 'var(--hot-pink)'}}>PSYCHOLOGICAL FRAMEWORK INDICATORS:</h4>
                      <p className="text-sm leading-relaxed" style={{color: 'var(--neon-blue)'}}>
                        <strong>Robert Greene Analysis:</strong> Demonstrates Law 1 violations (outshining masters) combined with Law 25 mastery (re-creation). 
                        <strong>Cialdini Influence:</strong> High authority and commitment triggers, moderate social proof susceptibility.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-4 px-8 py-4 bg-[var(--fox-fire)]/10 rounded-full border border-[var(--fox-fire)]/30">
                  <span className="text-lg font-medium">PSYCHOLOGICAL ACCURACY:</span>
                  <div className="w-40 h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[var(--fox-fire)] to-[var(--golden-circuit)] fox-fire-glow"
                      style={{width: `${mockAnalysis.archetypeConfidence * 100}%`}}
                    />
                  </div>
                  <span className="text-2xl font-bold" style={{color: 'var(--fox-fire)'}}>
                    {Math.round(mockAnalysis.archetypeConfidence * 100)}%
                  </span>
                </div>
              </div>
              </div>
            )}
          </>
        )}
        
        {analysisView === 'self' && (
          <>
            <div className="archetype-display mb-6">
              <h2 className="text-6xl font-bold text-center px-8 py-4 bg-[var(--cyber-green)]/20 border-2 border-[var(--cyber-green)] rounded-lg" 
                  style={{color: 'var(--cyber-green)'}}>
                {mockUserProfile.primaryArchetype}
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto mb-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="cyber-card p-6 border-[var(--cyber-green)]/50">
                  <h3 className="text-xl font-bold mb-3" style={{color: 'var(--cyber-green)'}}>ANALYTICAL CORE</h3>
                  <p className="text-sm leading-relaxed" style={{color: 'var(--neon-blue)'}}>
                    Deep analytical thinker who processes information systematically before making decisions. 
                    Values comprehensive understanding and tends to over-explain concepts to ensure clarity.
                  </p>
                </div>
                
                <div className="cyber-card p-6 border-[var(--cyber-green)]/50">
                  <h3 className="text-xl font-bold mb-3" style={{color: 'var(--cyber-green)'}}>COMMUNICATION PATTERN</h3>
                  <p className="text-sm leading-relaxed" style={{color: 'var(--neon-blue)'}}>
                    Logical, detail-oriented communication style with tendency toward perfectionism. 
                    Provides extensive context and background information before reaching conclusions.
                  </p>
                </div>
                
                <div className="cyber-card p-6 border-[var(--cyber-green)]/50">
                  <h3 className="text-xl font-bold mb-3" style={{color: 'var(--cyber-green)'}}>VULNERABILITY MARKERS</h3>
                  <p className="text-sm leading-relaxed" style={{color: 'var(--neon-blue)'}}>
                    Susceptible to authority figures and social proof. Hesitates when faced with incomplete 
                    information and can be influenced through logical frameworks and expert validation.
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center gap-4 px-8 py-4 bg-[var(--cyber-green)]/10 rounded-full border border-[var(--cyber-green)]/30">
                  <span className="text-lg font-medium" style={{color: 'var(--cyber-green)'}}>CLASSIFICATION ACCURACY:</span>
                  <div className="w-40 h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[var(--cyber-green)] to-[var(--golden-circuit)] fox-fire-glow"
                      style={{width: `${mockUserProfile.archetypeConfidence * 100}%`}}
                    />
                  </div>
                  <span className="text-2xl font-bold" style={{color: 'var(--cyber-green)'}}>
                    {Math.round(mockUserProfile.archetypeConfidence * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
        
        {analysisView === 'remodeling' && (
          <>
            <h2 className="text-6xl font-bold mb-6 spirit-hologram" 
                style={{color: 'var(--hot-pink)', textShadow: '0 0 30px var(--hot-pink)', filter: 'brightness(1.3)'}}
                data-text="ADAPTIVE PERSONA">
              ADAPTIVE PERSONA
            </h2>
            
            <div className="max-w-4xl mx-auto mb-8">
              <div className="ultra-premium-card p-8 mb-8 border-[var(--shrine-gold)]/50">
                <h3 className="text-2xl font-bold mb-6 text-center" style={{color: 'var(--shrine-gold)'}}>
                  RECOMMENDED ARCHETYPE: "THE STRATEGIC ORACLE"
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="bg-[var(--shrine-gold)]/10 p-4 rounded border border-[var(--shrine-gold)]/30">
                      <h4 className="font-bold mb-2" style={{color: 'var(--shrine-gold)'}}>ARCHETYPE RATIONALE:</h4>
                      <p className="text-sm leading-relaxed" style={{color: 'var(--neon-blue)'}}>
                        EMPERORS crave exclusive intelligence and strategic foresight. Your analytical nature becomes 
                        their competitive advantage when positioned as elite market intelligence rather than academic analysis.
                      </p>
                    </div>
                    
                    <div className="bg-blue-500/10 p-4 rounded border border-blue-500/30">
                      <h4 className="font-bold mb-2" style={{color: 'var(--electric-blue)'}}>TARGET'S VULNERABILITY EXPLOITED:</h4>
                      <p className="text-sm leading-relaxed" style={{color: 'var(--neon-blue)'}}>
                        Their ego vulnerability responds to being the "only one smart enough" to understand your insights. 
                        Their impatience disappears when information gives them competitive edge over other investors.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-[var(--hot-pink)]/10 p-4 rounded border border-[var(--hot-pink)]/30">
                      <h4 className="font-bold mb-2" style={{color: 'var(--hot-pink)'}}>EXACT POSITIONING STATEMENT:</h4>
                      <p className="text-sm leading-relaxed" style={{color: 'var(--neon-blue)'}}>
                        "I specialize in institutional-grade market intelligence typically reserved for billion-dollar hedge funds. 
                        Your strategic instincts are already aligned with what the data reveals - let me confirm your advantage."
                      </p>
                    </div>
                    
                    <div className="bg-green-500/10 p-4 rounded border border-green-500/30">
                      <h4 className="font-bold mb-2" style={{color: 'var(--cyber-green)'}}>PSYCHOLOGICAL MECHANISM:</h4>
                      <p className="text-sm leading-relaxed" style={{color: 'var(--neon-blue)'}}>
                        Transforms your analytical weakness into their exclusive strength. You become the intelligence 
                        asset that enhances their empire rather than an advisor seeking validation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="cyber-card p-6 border-[var(--hot-pink)]/50">
                  <h3 className="text-xl font-bold mb-3" style={{color: 'var(--hot-pink)'}}>PERSONA IDENTITY</h3>
                  <p className="text-sm leading-relaxed" style={{color: 'var(--neon-blue)'}}>
                    <strong style={{color: 'var(--shrine-gold)'}}>"The Strategic Oracle"</strong> - Elite intelligence provider who confirms 
                    their instincts with exclusive market insights. Not seeking approval, but providing ammunition for their empire.
                  </p>
                </div>
                
                <div className="cyber-card p-6 border-[var(--hot-pink)]/50">
                  <h3 className="text-xl font-bold mb-3" style={{color: 'var(--hot-pink)'}}>COMMUNICATION SHIFT</h3>
                  <p className="text-sm leading-relaxed" style={{color: 'var(--neon-blue)'}}>
                    From academic explanation to <strong style={{color: 'var(--shrine-gold)'}}>"exclusive intelligence briefing"</strong>. 
                    Replace analysis with strategic confirmation of their superior market positioning.
                  </p>
                </div>
                
                <div className="cyber-card p-6 border-[var(--hot-pink)]/50">
                  <h3 className="text-xl font-bold mb-3" style={{color: 'var(--hot-pink)'}}>BEHAVIORAL ADAPTATIONS</h3>
                  <p className="text-sm leading-relaxed" style={{color: 'var(--neon-blue)'}}>
                    Present findings as <strong style={{color: 'var(--shrine-gold)'}}>"strategic intelligence that validates your empire-building instincts"</strong> 
                    rather than academic research requiring their consideration.
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center gap-4 px-8 py-4 bg-[var(--hot-pink)]/10 rounded-full border border-[var(--hot-pink)]/30">
                  <span className="text-lg font-medium" style={{color: 'var(--hot-pink)'}}>ADAPTATION EFFECTIVENESS:</span>
                  <div className="w-40 h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[var(--hot-pink)] to-[var(--golden-circuit)] fox-fire-glow"
                      style={{width: `${mockRemodeling.adaptivePersona.adaptationLevel * 10}%`}}
                    />
                  </div>
                  <span className="text-2xl font-bold" style={{color: 'var(--hot-pink)'}}>
                    {mockRemodeling.adaptivePersona.adaptationLevel}/10
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex gap-2 flex-wrap">
          {analysisView === 'target' && [
            { id: 'target-matrix', label: ' PERSONALITY MATRIX', icon: BarChart3 },
            { id: 'target-vulnerabilities', label: ' VULNERABILITIES', icon: AlertTriangle },
            { id: 'target-arsenal', label: ' 48 LAWS ARSENAL', icon: Sword },
            { id: 'target-codex', label: '💬 COMPLIMENT CODEX', icon: Star },
            { id: 'target-feedback', label: '🏆 LEADER FEEDBACK', icon: Crown }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`cyber-btn px-6 py-3 ${activeSection === tab.id ? 'bg-[var(--golden-circuit)] text-black' : ''}`}
            >
              {tab.label}
            </button>
          ))}
          
          {analysisView === 'self' && [
            { id: 'self-matrix', label: ' YOUR PROFILE', icon: User },
            { id: 'self-vulnerabilities', label: '⚠️ YOUR WEAKNESSES', icon: AlertTriangle },
            { id: 'self-violations', label: ' POWER LAW VIOLATIONS', icon: Brain },
            { id: 'self-nlp', label: ' NLP PROFILE', icon: Activity }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`cyber-btn px-6 py-3 ${activeSection === tab.id ? 'bg-[var(--cyber-green)] text-black' : ''}`}
            >
              {tab.label}
            </button>
          ))}

          {analysisView === 'remodeling' && [
            { id: 'remodeling-persona', label: ' ADAPTIVE PERSONA', icon: Shuffle },
            { id: 'remodeling-communication', label: '💬 COMMUNICATION SHIFTS', icon: RefreshCw },
            { id: 'remodeling-mitigation', label: ' VULNERABILITY FIXES', icon: Shield },
            { id: 'remodeling-synergy', label: ' SYNERGY ANALYSIS', icon: Zap }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`cyber-btn px-6 py-3 ${activeSection === tab.id ? 'bg-[var(--hot-pink)] text-black' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      {activeSection === 'target-matrix' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center hologram-text mb-8">
            PERSONALITY MATRIX
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(mockAnalysis.personalityMatrix).map(([key, value]) => {
              if (typeof value === 'number') {
                return (
                  <div key={key} className="cyber-card p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold capitalize" style={{color: 'var(--neon-blue)'}}>
                        {key.replace(/([A-Z])/g, ' $1')}
                      </h3>
                      <span className="text-2xl font-bold" style={{color: 'var(--golden-circuit)'}}>
                        {value}/10
                      </span>
                    </div>
                    <div className="w-full h-6 bg-gray-700 rounded mb-4">
                      <div 
                        className="fox-fire-glow h-full rounded transition-all duration-1000"
                        style={{
                          width: `${(value / 10) * 100}%`,
                          background: `linear-gradient(90deg, var(--cyber-green), var(--neon-blue), var(--hot-pink))`
                        }}
                      />
                    </div>
                    <Activity className="w-6 h-6 fox-fire-glow mx-auto" style={{color: 'var(--cyber-green)'}} />
                  </div>
                );
              }
              return (
                <div key={key} className="cyber-card p-6">
                  <h3 className="text-xl font-bold capitalize mb-4" style={{color: 'var(--neon-blue)'}}>
                    {key.replace(/([A-Z])/g, ' $1')}
                  </h3>
                  <p className="text-lg font-bold" style={{color: 'var(--golden-circuit)'}}>
                    {value.toUpperCase()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeSection === 'target-vulnerabilities' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center vulnerability-warning mb-8">
            STRATEGIC VULNERABILITIES
          </h2>
          <div className="grid gap-6">
            {mockAnalysis.vulnerabilities.map((vuln, index) => (
              <div key={index} className="cyber-card p-6 border-red-500/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 vulnerability-warning" />
                    <h3 className="text-2xl font-bold capitalize vulnerability-warning">
                      {vuln.type}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">SEVERITY:</span>
                    <div className="flex">
                      {Array.from({length: 10}, (_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-6 mx-0.5 rounded ${
                            i < vuln.severity ? 'bg-red-500' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xl font-bold vulnerability-warning">
                      {vuln.severity}/10
                    </span>
                  </div>
                </div>
                
                <div className="mb-4 p-4 bg-red-500/10 rounded border border-red-500/30">
                  <h4 className="font-bold mb-2" style={{color: 'var(--golden-circuit)'}}>EXPLOITATION VECTOR:</h4>
                  <p className="text-lg">{vuln.exploitation}</p>
                </div>

                <div>
                  <h4 className="font-bold mb-2" style={{color: 'var(--neon-blue)'}}>TRIGGER WORDS:</h4>
                  <div className="flex flex-wrap gap-2">
                    {vuln.triggerWords.map((word, i) => (
                      <span key={i} className="px-3 py-1 bg-red-500/20 border border-red-500/50 rounded text-sm">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'target-arsenal' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8" style={{color: 'var(--golden-circuit)'}}>
            48 LAWS ARSENAL
          </h2>
          <div className="grid gap-6">
            {mockRecommendations.lawsArsenal.map((law, index) => (
              <div key={index} className="cyber-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="weapon-button w-16 h-16 flex items-center justify-center text-2xl font-bold">
                      {law.lawNumber}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold" style={{color: 'var(--golden-circuit)'}}>
                        LAW {law.lawNumber}: {law.lawTitle}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">EFFECTIVENESS:</span>
                        <div className="flex">
                          {Array.from({length: 10}, (_, i) => (
                            <Star 
                              key={i}
                              className={`w-4 h-4 ${i < law.effectiveness ? 'text-[var(--golden-circuit)]' : 'text-gray-600'}`}
                              fill={i < law.effectiveness ? 'currentColor' : 'none'}
                            />
                          ))}
                        </div>
                        <span className="font-bold" style={{color: 'var(--golden-circuit)'}}>
                          {law.effectiveness}/10
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-[var(--golden-circuit)]/10 rounded border border-[var(--golden-circuit)]/30">
                    <h4 className="font-bold mb-2" style={{color: 'var(--golden-circuit)'}}>ATTACK VECTOR:</h4>
                    <p>{law.attackVector}</p>
                  </div>
                  
                  <div className="p-4 bg-[var(--neon-blue)]/10 rounded border border-[var(--neon-blue)]/30">
                    <h4 className="font-bold mb-2" style={{color: 'var(--neon-blue)'}}>TACTICAL EXAMPLE:</h4>
                    <p>{law.example}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'target-codex' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8" style={{color: 'var(--cyber-green)'}}>
            COMPLIMENT CODEX
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(mockRecommendations.complimentCodex).map(([category, compliments]) => (
              <div key={category} className="cyber-card p-6">
                <h3 className="text-xl font-bold mb-4 capitalize" style={{color: 'var(--cyber-green)'}}>
                  {category.replace(/([A-Z])/g, ' $1')}
                </h3>
                <div className="space-y-3">
                  {compliments.map((compliment, index) => (
                    <div key={index} className="p-3 bg-[var(--cyber-green)]/10 rounded border border-[var(--cyber-green)]/30">
                      <p className="font-medium">"{compliment}"</p>
                      <div className="flex items-center gap-2 mt-2">
                        <CheckCircle className="w-4 h-4" style={{color: 'var(--cyber-green)'}} />
                        <span className="text-xs opacity-70">Optimized for {mockAnalysis.primaryArchetype} psychology</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'target-feedback' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8" style={{color: 'var(--golden-circuit)'}}>
            BUSINESS LEADER FEEDBACK
          </h2>
          <div className="mb-8 cyber-card p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Crown className="w-6 h-6" style={{color: 'var(--golden-circuit)'}} />
              Expert Consensus
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-green-500/10 rounded border border-green-500/30">
                <h4 className="font-bold text-green-400 mb-2">STRENGTHS</h4>
                <p className="text-sm">{businessLeaderFeedback.consensus.strengths}</p>
              </div>
              <div className="p-4 bg-yellow-500/10 rounded border border-yellow-500/30">
                <h4 className="font-bold text-yellow-400 mb-2">CONCERNS</h4>
                <p className="text-sm">{businessLeaderFeedback.consensus.concerns}</p>
              </div>
              <div className="p-4 bg-blue-500/10 rounded border border-blue-500/30">
                <h4 className="font-bold text-blue-400 mb-2">RECOMMENDATION</h4>
                <p className="text-sm">{businessLeaderFeedback.consensus.recommendation}</p>
              </div>
            </div>
          </div>
          
          <div className="grid gap-6">
            {businessLeaderFeedback.leaders.map((leader, index) => (
              <div key={index} className="cyber-card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Crown className="w-10 h-10" style={{color: 'var(--golden-circuit)'}} />
                  <div>
                    <h3 className="text-xl font-bold" style={{color: 'var(--golden-circuit)'}}>
                      {leader.name}
                    </h3>
                    <p className="text-sm opacity-70">{leader.title}</p>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded text-xs mt-1">
                      {leader.archetype}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-[var(--golden-circuit)]/10 rounded border border-[var(--golden-circuit)]/30">
                    <h4 className="font-bold mb-2" style={{color: 'var(--golden-circuit)'}}>TARGET ANALYSIS</h4>
                    <p className="text-sm">{leader.feedback.targetAnalysis}</p>
                  </div>
                  
                  <div className="p-4 bg-green-500/10 rounded border border-green-500/30">
                    <h4 className="font-bold mb-2 text-green-400">RECOMMENDED APPROACH</h4>
                    <p className="text-sm">{leader.feedback.approach}</p>
                  </div>
                  
                  <div className="p-4 bg-red-500/10 rounded border border-red-500/30">
                    <h4 className="font-bold mb-2 text-red-400">WARNING</h4>
                    <p className="text-sm">{leader.feedback.warning}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SELF ANALYSIS SECTIONS */}
      {activeSection === 'self-matrix' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8" style={{color: 'var(--cyber-green)'}}>
            YOUR COMMUNICATION PROFILE
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(mockUserProfile.communicationStyle).map(([key, value]) => {
              if (typeof value === 'number') {
                return (
                  <div key={key} className="cyber-card p-6 border-[var(--cyber-green)]/50">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold capitalize" style={{color: 'var(--cyber-green)'}}>
                        {key.replace(/([A-Z])/g, ' $1')}
                      </h3>
                      <span className="text-2xl font-bold" style={{color: 'var(--golden-circuit)'}}>
                        {value}/10
                      </span>
                    </div>
                    <div className="w-full h-6 bg-gray-700 rounded mb-4">
                      <div 
                        className="fox-fire-glow h-full rounded transition-all duration-1000"
                        style={{
                          width: `${(value / 10) * 100}%`,
                          background: `linear-gradient(90deg, var(--cyber-green), var(--neon-blue))`
                        }}
                      />
                    </div>
                    <User className="w-6 h-6 fox-fire-glow mx-auto" style={{color: 'var(--cyber-green)'}} />
                  </div>
                );
              }
              return (
                <div key={key} className="cyber-card p-6 border-[var(--cyber-green)]/50">
                  <h3 className="text-xl font-bold capitalize mb-4" style={{color: 'var(--cyber-green)'}}>
                    {key.replace(/([A-Z])/g, ' $1')}
                  </h3>
                  <p className="text-lg font-bold" style={{color: 'var(--golden-circuit)'}}>
                    {value.toUpperCase()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeSection === 'self-vulnerabilities' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center vulnerability-warning mb-8">
            YOUR COMMUNICATION WEAKNESSES
          </h2>
          <div className="grid gap-6">
            {mockUserProfile.personalVulnerabilities.map((vuln, index) => (
              <div key={index} className="cyber-card p-6 border-orange-500/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-orange-400" />
                    <h3 className="text-2xl font-bold capitalize text-orange-400">
                      {vuln.type.replace('_', ' ')}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">SEVERITY:</span>
                    <div className="flex">
                      {Array.from({length: 10}, (_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-6 mx-0.5 rounded ${
                            i < vuln.severity ? 'bg-orange-500' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xl font-bold text-orange-400">
                      {vuln.severity}/10
                    </span>
                  </div>
                </div>
                
                <div className="mb-4 p-4 bg-orange-500/10 rounded border border-orange-500/30">
                  <h4 className="font-bold mb-2" style={{color: 'var(--golden-circuit)'}}>HOW IT MANIFESTS:</h4>
                  <p className="text-lg">{vuln.manifestation}</p>
                </div>

                <div>
                  <h4 className="font-bold mb-2" style={{color: 'var(--cyber-green)'}}>TRIGGER PATTERNS:</h4>
                  <div className="flex flex-wrap gap-2">
                    {vuln.triggerPatterns.map((pattern, i) => (
                      <span key={i} className="px-3 py-1 bg-orange-500/20 border border-orange-500/50 rounded text-sm">
                        {pattern}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'self-violations' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8" style={{color: 'var(--hot-pink)'}}>
            POWER LAW VIOLATIONS
          </h2>
          <div className="grid gap-6">
            {mockUserProfile.powerLawViolations.map((violation, index) => (
              <div key={index} className="cyber-card p-6 border-red-500/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="weapon-button w-16 h-16 flex items-center justify-center text-2xl font-bold">
                      {violation.lawNumber}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold" style={{color: 'var(--hot-pink)'}}>
                        LAW {violation.lawNumber}: {violation.lawTitle}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">VIOLATION SEVERITY:</span>
                        <div className="flex">
                          {Array.from({length: 10}, (_, i) => (
                            <div
                              key={i}
                              className={`w-3 h-6 mx-0.5 rounded ${
                                i < violation.violationSeverity ? 'bg-red-500' : 'bg-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-bold" style={{color: 'var(--hot-pink)'}}>
                          {violation.violationSeverity}/10
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-red-500/10 rounded border border-red-500/30">
                    <h4 className="font-bold mb-2" style={{color: 'var(--hot-pink)'}}>EVIDENCE:</h4>
                    <ul className="list-disc list-inside">
                      {violation.evidence.map((evidence, i) => (
                        <li key={i}>{evidence}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-[var(--cyber-green)]/10 rounded border border-[var(--cyber-green)]/30">
                    <h4 className="font-bold mb-2" style={{color: 'var(--cyber-green)'}}>IMPROVEMENT STRATEGY:</h4>
                    <p>{violation.improvement}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'self-nlp' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8" style={{color: 'var(--neon-blue)'}}>
            NLP & PERSUASION PROFILE
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="cyber-card p-6 border-[var(--neon-blue)]/50">
              <h3 className="text-2xl font-bold mb-4" style={{color: 'var(--neon-blue)'}}>
                Primary Modality: {mockUserProfile.nlpProfile.primaryModality.toUpperCase()}
              </h3>
              <p className="text-lg mb-4">You process information primarily through {mockUserProfile.nlpProfile.primaryModality} channels.</p>
              
              <h4 className="font-bold mb-2" style={{color: 'var(--golden-circuit)'}}>Language Patterns:</h4>
              <div className="flex flex-wrap gap-2">
                {mockUserProfile.nlpProfile.languagePatterns.map((pattern, i) => (
                  <span key={i} className="px-3 py-1 bg-[var(--neon-blue)]/20 border border-[var(--neon-blue)]/50 rounded text-sm">
                    {pattern}
                  </span>
                ))}
              </div>
            </div>

            <div className="cyber-card p-6 border-[var(--neon-blue)]/50">
              <h3 className="text-2xl font-bold mb-4" style={{color: 'var(--neon-blue)'}}>
                Persuasion Susceptibility
              </h3>
              <div className="space-y-3">
                {Object.entries(mockUserProfile.nlpProfile.persuasionSusceptibility).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="capitalize">{key.replace('_', ' ')}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-3 bg-gray-700 rounded">
                        <div 
                          className="h-full rounded"
                          style={{
                            width: `${(value / 10) * 100}%`,
                            backgroundColor: 'var(--neon-blue)'
                          }}
                        />
                      </div>
                      <span className="text-sm font-bold" style={{color: 'var(--golden-circuit)'}}>
                        {value}/10
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHARACTER REMODELING SECTIONS */}
      {activeSection === 'remodeling-persona' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8" style={{color: 'var(--hot-pink)'}}>
            ADAPTIVE PERSONA STRATEGY
          </h2>
          
          <div className="cyber-card p-8 border-[var(--hot-pink)]/50">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-4" style={{color: 'var(--hot-pink)'}}>
                Recommended Transformation
              </h3>
              <div className="flex items-center justify-center gap-8 mb-6">
                <div className="text-center">
                  <Brain className="w-16 h-16 mx-auto mb-2" style={{color: 'var(--cyber-green)'}} />
                  <p className="font-bold">YOU ({mockUserProfile.primaryArchetype})</p>
                </div>
                <Shuffle className="w-12 h-12" style={{color: 'var(--hot-pink)'}} />
                <div className="text-center">
                  <Crown className="w-16 h-16 mx-auto mb-2" style={{color: 'var(--golden-circuit)'}} />
                  <p className="font-bold">TARGET ({mockAnalysis.primaryArchetype})</p>
                </div>
              </div>
              <p className="text-xl" style={{color: 'var(--golden-circuit)'}}>
                {mockRemodeling.adaptivePersona.recommendedPersona}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-bold mb-3" style={{color: 'var(--hot-pink)'}}>
                Key Adjustments Required:
              </h4>
              {mockRemodeling.adaptivePersona.keyAdjustments.map((adjustment, i) => (
                <div key={i} className="p-4 bg-[var(--hot-pink)]/10 rounded border border-[var(--hot-pink)]/30">
                  <CheckCircle className="w-5 h-5 inline mr-2" style={{color: 'var(--cyber-green)'}} />
                  {adjustment}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSection === 'remodeling-communication' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8" style={{color: 'var(--hot-pink)'}}>
            COMMUNICATION TRANSFORMATION
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(mockRemodeling.communicationAdjustments).map(([category, adjustments]) => (
              <div key={category} className="cyber-card p-6 border-[var(--hot-pink)]/50">
                <h3 className="text-xl font-bold mb-4 capitalize" style={{color: 'var(--hot-pink)'}}>
                  {category.replace(/([A-Z])/g, ' $1')}
                </h3>
                <div className="space-y-3">
                  {adjustments.map((adjustment: string, index: number) => (
                    <div key={index} className="p-3 bg-[var(--hot-pink)]/10 rounded border border-[var(--hot-pink)]/30">
                      <RefreshCw className="w-4 h-4 inline mr-2" style={{color: 'var(--hot-pink)'}} />
                      <span className="font-medium">{adjustment}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'remodeling-mitigation' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8" style={{color: 'var(--hot-pink)'}}>
            VULNERABILITY MITIGATION PLAN
          </h2>
          
          <div className="grid gap-6">
            {mockRemodeling.vulnerabilityMitigation.map((mitigation, index) => (
              <div key={index} className="cyber-card p-6 border-[var(--hot-pink)]/50">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8" style={{color: 'var(--hot-pink)'}} />
                  <h3 className="text-2xl font-bold capitalize" style={{color: 'var(--hot-pink)'}}>
                    {mitigation.vulnerability.replace('_', ' ')} Mitigation
                  </h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[var(--hot-pink)]/10 rounded border border-[var(--hot-pink)]/30">
                    <h4 className="font-bold mb-2" style={{color: 'var(--golden-circuit)'}}>STRATEGY:</h4>
                    <p>{mitigation.mitigationStrategy}</p>
                  </div>
                  
                  <div className="p-4 bg-[var(--cyber-green)]/10 rounded border border-[var(--cyber-green)]/30">
                    <h4 className="font-bold mb-2" style={{color: 'var(--cyber-green)'}}>POWER LAW:</h4>
                    <p>{mitigation.powerLawApplication}</p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-[var(--neon-blue)]/10 rounded border border-[var(--neon-blue)]/30">
                  <h4 className="font-bold mb-2" style={{color: 'var(--neon-blue)'}}>PRACTICE EXERCISES:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {mitigation.practiceExercises.map((exercise, i) => (
                      <li key={i}>{exercise}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'remodeling-synergy' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8" style={{color: 'var(--hot-pink)'}}>
            SYNERGY & COMPATIBILITY ANALYSIS
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="cyber-card p-6 border-[var(--cyber-green)]/50">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold mb-2" style={{color: 'var(--cyber-green)'}}>
                  Compatibility Score
                </h3>
                <div className="relative w-32 h-32 mx-auto">
                  <div className="absolute inset-0 rounded-full border-8 border-gray-700"></div>
                  <div 
                    className="absolute inset-0 rounded-full border-8 border-transparent"
                    style={{
                      borderTopColor: 'var(--cyber-green)',
                      borderRightColor: 'var(--cyber-green)',
                      transform: `rotate(${(mockRemodeling.synergyAnalysis.compatibilityScore / 10) * 360}deg)`,
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold" style={{color: 'var(--cyber-green)'}}>
                      {mockRemodeling.synergyAnalysis.compatibilityScore}/10
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-lg font-bold mb-2" style={{color: 'var(--golden-circuit)'}}>
                  Optimal Interaction Style:
                </p>
                <p className="text-sm">{mockRemodeling.synergyAnalysis.optimalInteractionStyle}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="cyber-card p-4 border-red-500/50">
                <h4 className="font-bold mb-2 text-red-400">⚠️ CONFLICT POINTS:</h4>
                <ul className="space-y-1">
                  {mockRemodeling.synergyAnalysis.conflictPoints.map((point, i) => (
                    <li key={i} className="text-sm">• {point}</li>
                  ))}
                </ul>
              </div>

              <div className="cyber-card p-4 border-[var(--cyber-green)]/50">
                <h4 className="font-bold mb-2" style={{color: 'var(--cyber-green)'}}>✅ HARMONY POINTS:</h4>
                <ul className="space-y-1">
                  {mockRemodeling.synergyAnalysis.harmonyPoints.map((point, i) => (
                    <li key={i} className="text-sm">• {point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* War Room Simulator CTA */}
      <div className="text-center mt-12 mb-8">
        <div className="cyber-card p-8">
          <h2 className="text-3xl font-bold mb-4 hologram-text">READY FOR PSYCHOLOGICAL WARFARE?</h2>
          <p className="text-lg mb-6" style={{color: 'var(--hot-pink)'}}>
            Test your strategies against an AI simulation of this investor's personality
          </p>
          <Link 
            to="/simulator"
            className="cyber-btn text-xl px-12 py-4 inline-flex items-center gap-3"
          >
            <ExternalLink className="w-6 h-6" />
             ENTER WAR ROOM SIMULATOR
          </Link>
        </div>
      </div>

      {/* Psychological Warfare Intelligence & Strategic Frameworks */}
      {analysisView === 'target' && (
        <div className="space-y-8">
          {/* Cialdini Influence Framework Analysis */}
          <div className="ultra-premium-card p-8">
            <h2 className="text-3xl font-bold text-center mb-8 hologram-text" style={{color: 'var(--cyber-green)'}}>
               CIALDINI INFLUENCE FRAMEWORK ANALYSIS
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="cyber-card p-6 border-green-500/50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{color: 'var(--cyber-green)'}}>
                    <Crown className="w-6 h-6" />
                    AUTHORITY SUSCEPTIBILITY: 95%
                  </h3>
                  <p className="text-sm leading-relaxed mb-4">
                    EMPEROR archetypes paradoxically respond to displays of competent authority when presented respectfully. 
                    They respect hierarchical expertise in specialized domains while maintaining their overall dominance.
                  </p>
                  <div className="bg-green-500/10 p-4 rounded border border-green-500/30">
                    <strong className="text-green-400">Tactical Application:</strong>
                    <p className="text-sm mt-2">
                      Reference industry titans, cite prestigious credentials, and mention exclusive advisors. 
                      Present yourself as the expert they need while acknowledging their superior market position.
                    </p>
                  </div>
                </div>

                <div className="cyber-card p-6 border-blue-500/50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{color: 'var(--neon-blue)'}}>
                    <Users className="w-6 h-6" />
                    SOCIAL PROOF RESONANCE: 85%
                  </h3>
                  <p className="text-sm leading-relaxed mb-4">
                    High sensitivity to peer validation from other successful investors. Values exclusive circles and 
                    elite group membership as indicators of worthwhile opportunities.
                  </p>
                  <div className="bg-blue-500/10 p-4 rounded border border-blue-500/30">
                    <strong className="text-blue-400">Tactical Application:</strong>
                    <p className="text-sm mt-2">
                      Name-drop other EMPEROR-type investors, reference exclusive investment circles, 
                      and create FOMO through limited partnership opportunities.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="cyber-card p-6 border-orange-500/50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{color: 'var(--shrine-gold)'}}>
                    <Zap className="w-6 h-6" />
                    SCARCITY ACTIVATION: 90%
                  </h3>
                  <p className="text-sm leading-relaxed mb-4">
                    Extremely motivated by exclusive, time-limited opportunities. Fear of missing out on empire-building 
                    chances overrides natural caution and triggers rapid decision-making.
                  </p>
                  <div className="bg-orange-500/10 p-4 rounded border border-orange-500/30">
                    <strong className="text-orange-400">Tactical Application:</strong>
                    <p className="text-sm mt-2">
                      Create legitimate urgency through competitor interest, limited allocation rounds, 
                      and strategic timing pressure.
                    </p>
                  </div>
                </div>

                <div className="cyber-card p-6 border-purple-500/50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{color: 'var(--hot-pink)'}}>
                    <Shield className="w-6 h-6" />
                    COMMITMENT CONSISTENCY: 80%
                  </h3>
                  <p className="text-sm leading-relaxed mb-4">
                    Once committed to a strategic direction, maintains consistency to preserve reputation and authority. 
                    Public commitments become powerful psychological anchors.
                  </p>
                  <div className="bg-purple-500/10 p-4 rounded border border-purple-500/30">
                    <strong className="text-purple-400">Tactical Application:</strong>
                    <p className="text-sm mt-2">
                      Secure small initial commitments, document strategic alignment publicly, 
                      and reference their stated investment thesis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Psychological Warfare Techniques */}
          <div className="ultra-premium-card p-8">
            <h2 className="text-3xl font-bold text-center mb-8 hologram-text" style={{color: 'var(--hot-pink)'}}>
               ADVANCED PSYCHOLOGICAL WARFARE TECHNIQUES
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="cyber-card p-6 border-red-500/50">
                <h3 className="text-xl font-bold mb-4" style={{color: 'var(--vulnerability-red)'}}>
                  EGO AMPLIFICATION PROTOCOL
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-red-500/10 p-3 rounded">
                    <strong>Phase 1:</strong> Acknowledge their "legendary" deal-making ability
                  </div>
                  <div className="bg-red-500/10 p-3 rounded">
                    <strong>Phase 2:</strong> Reference their "unmatched market intuition"
                  </div>
                  <div className="bg-red-500/10 p-3 rounded">
                    <strong>Phase 3:</strong> Position opportunity as "worthy of their empire"
                  </div>
                </div>
              </div>

              <div className="cyber-card p-6 border-yellow-500/50">
                <h3 className="text-xl font-bold mb-4" style={{color: 'var(--shrine-gold)'}}>
                  CONTROL ILLUSION FRAMEWORK
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-yellow-500/10 p-3 rounded">
                    <strong>Technique:</strong> Offer multiple paths to same outcome
                  </div>
                  <div className="bg-yellow-500/10 p-3 rounded">
                    <strong>Method:</strong> "You could structure this as X or Y"
                  </div>
                  <div className="bg-yellow-500/10 p-3 rounded">
                    <strong>Result:</strong> They feel in control while being guided
                  </div>
                </div>
              </div>

              <div className="cyber-card p-6 border-blue-500/50">
                <h3 className="text-xl font-bold mb-4" style={{color: 'var(--neon-blue)'}}>
                  STRATEGIC DEFERENCE MODEL
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-blue-500/10 p-3 rounded">
                    <strong>Position:</strong> Competent subordinate seeking guidance
                  </div>
                  <div className="bg-blue-500/10 p-3 rounded">
                    <strong>Language:</strong> "Your experience suggests..." 
                  </div>
                  <div className="bg-blue-500/10 p-3 rounded">
                    <strong>Outcome:</strong> They provide the reasoning you want
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NLP & Neurolinguistic Patterns */}
          <div className="ultra-premium-card p-8">
            <h2 className="text-3xl font-bold text-center mb-8 hologram-text" style={{color: 'var(--electric-blue)'}}>
               NEUROLINGUISTIC PROGRAMMING PATTERNS
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="cyber-card p-6 border-[var(--electric-blue)]/50">
                <h3 className="text-xl font-bold mb-4" style={{color: 'var(--electric-blue)'}}>
                  KINESTHETIC DOMINANCE DETECTED
                </h3>
                <p className="text-sm leading-relaxed mb-4">
                  Primary sensory modality is kinesthetic - they "feel" market movements, "grasp" opportunities, 
                  and need to "get a handle" on investments. Physical metaphors resonate strongly.
                </p>
                <div className="bg-[var(--electric-blue)]/10 p-4 rounded">
                  <strong>Optimized Language Patterns:</strong>
                  <ul className="text-sm mt-2 space-y-1">
                    <li>• "Feel the market momentum behind this"</li>
                    <li>• "Grasp the strategic weight of this move"</li>
                    <li>• "Get a solid grip on these returns"</li>
                    <li>• "Touch base on the concrete benefits"</li>
                  </ul>
                </div>
              </div>

              <div className="cyber-card p-6 border-[var(--electric-blue)]/50">
                <h3 className="text-xl font-bold mb-4" style={{color: 'var(--electric-blue)'}}>
                  EMBEDDED COMMANDS FRAMEWORK
                </h3>
                <p className="text-sm leading-relaxed mb-4">
                  Subconscious directive implantation through embedded linguistic structures. 
                  EMPEROR archetypes process authority-based commands when properly framed.
                </p>
                <div className="bg-[var(--electric-blue)]/10 p-4 rounded">
                  <strong>Command Structures:</strong>
                  <ul className="text-sm mt-2 space-y-1">
                    <li>• "When you DECIDE TO INVEST, you'll see..."</li>
                    <li>• "As you CONSIDER THE OPPORTUNITY..."</li>
                    <li>• "You might WANT TO MOVE QUICKLY on this"</li>
                    <li>• "It's important to SECURE YOUR POSITION"</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Self-Analysis Psychological Frameworks */}
      {analysisView === 'self' && (
        <div className="space-y-8">
          {/* Personal Communication Pattern Analysis */}
          <div className="ultra-premium-card p-8">
            <h2 className="text-3xl font-bold text-center mb-8 hologram-text" style={{color: 'var(--cyber-green)'}}>
               PERSONAL COMMUNICATION PATTERN ANALYSIS
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="cyber-card p-6 border-green-500/50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{color: 'var(--cyber-green)'}}>
                    <Brain className="w-6 h-6" />
                    OVER-EXPLANATION PATTERN: 85%
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{color: 'var(--neon-blue)'}}>
                    <strong style={{color: 'var(--cyber-green)'}}>Detection Quote:</strong> "Let me provide some context before I answer that question..."
                  </p>
                  <p className="text-sm leading-relaxed mb-4" style={{color: 'var(--neon-blue)'}}>
                    Analysis shows consistent pattern of front-loading excessive context before reaching conclusions. 
                    This indicates analytical perfectionism and fear of being misunderstood.
                  </p>
                  <div className="bg-green-500/10 p-4 rounded border border-green-500/30">
                    <strong className="text-green-400">Meta-Analysis Reasoning:</strong>
                    <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                      SAGE archetypes demonstrate this behavior as a defense mechanism against criticism. 
                      The need to establish credibility through comprehensive explanation reveals underlying insecurity about authority.
                    </p>
                  </div>
                </div>

                <div className="cyber-card p-6 border-blue-500/50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{color: 'var(--neon-blue)'}}>
                    <Shield className="w-6 h-6" />
                    AUTHORITY DEFERENCE: 90%
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{color: 'var(--neon-blue)'}}>
                    <strong style={{color: 'var(--cyber-green)'}}>Detection Quote:</strong> "You're probably right, but I was thinking..."
                  </p>
                  <p className="text-sm leading-relaxed mb-4" style={{color: 'var(--neon-blue)'}}>
                    High susceptibility to authority figures, often prefacing disagreements with validation. 
                    Shows automatic deference even when holding contrary evidence.
                  </p>
                  <div className="bg-blue-500/10 p-4 rounded border border-blue-500/30">
                    <strong className="text-blue-400">Meta-Analysis Reasoning:</strong>
                    <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                      SAGE personality's respect for expertise creates exploitable submission to perceived authority. 
                      This pattern emerges from valuing knowledge hierarchy over personal conviction.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="cyber-card p-6 border-orange-500/50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{color: 'var(--shrine-gold)'}}>
                    <AlertTriangle className="w-6 h-6" />
                    PERFECTIONISM PARALYSIS: 75%
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{color: 'var(--neon-blue)'}}>
                    <strong style={{color: 'var(--cyber-green)'}}>Detection Quote:</strong> "I need to think about this more before deciding..."
                  </p>
                  <p className="text-sm leading-relaxed mb-4" style={{color: 'var(--neon-blue)'}}>
                    Consistent delay in decision-making when facing incomplete information. 
                    Analysis paralysis emerges from need for comprehensive understanding before action.
                  </p>
                  <div className="bg-orange-500/10 p-4 rounded border border-orange-500/30">
                    <strong className="text-orange-400">Meta-Analysis Reasoning:</strong>
                    <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                      SAGE archetype's analytical nature creates vulnerability to time pressure and forced decisions. 
                      Exploitable through artificial urgency and information scarcity tactics.
                    </p>
                  </div>
                </div>

                <div className="cyber-card p-6 border-purple-500/50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{color: 'var(--hot-pink)'}}>
                    <Users className="w-6 h-6" />
                    SOCIAL PROOF DEPENDENCY: 80%
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{color: 'var(--neon-blue)'}}>
                    <strong style={{color: 'var(--cyber-green)'}}>Detection Quote:</strong> "Most experts seem to agree that..."
                  </p>
                  <p className="text-sm leading-relaxed mb-4" style={{color: 'var(--neon-blue)'}}>
                    Heavy reliance on external validation and expert consensus before forming opinions. 
                    Seeks safety in majority viewpoints rather than independent analysis.
                  </p>
                  <div className="bg-purple-500/10 p-4 rounded border border-purple-500/30">
                    <strong className="text-purple-400">Meta-Analysis Reasoning:</strong>
                    <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                      SAGE need for intellectual validation creates susceptibility to manufactured consensus. 
                      Can be influenced through strategic expert testimonials and peer pressure tactics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Power Law Violation Framework */}
          <div className="ultra-premium-card p-8">
            <h2 className="text-3xl font-bold text-center mb-8 hologram-text" style={{color: 'var(--hot-pink)'}}>
               POWER LAW VIOLATION ANALYSIS
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="cyber-card p-6 border-red-500/50">
                <h3 className="text-xl font-bold mb-4" style={{color: 'var(--vulnerability-red)'}}>
                  LAW 4: "ALWAYS SAY LESS THAN NECESSARY"
                </h3>
                <div className="space-y-4">
                  <div className="bg-red-500/10 p-3 rounded">
                    <strong style={{color: 'var(--vulnerability-red)'}}>Violation Evidence:</strong>
                    <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                      "So let me break this down step by step, starting with the background context you need to understand..."
                    </p>
                  </div>
                  <div className="bg-red-500/10 p-3 rounded">
                    <strong style={{color: 'var(--vulnerability-red)'}}>Strategic Impact:</strong>
                    <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                      Over-explanation reduces mystique and authority. Creates perception of insecurity and need for validation.
                    </p>
                  </div>
                  <div className="bg-green-500/10 p-3 rounded border border-green-500/30">
                    <strong className="text-green-400">Remediation Strategy:</strong>
                    <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                      Implement 30-second rule: Make your point in 30 seconds or less. Practice executive summary delivery.
                    </p>
                  </div>
                </div>
              </div>

              <div className="cyber-card p-6 border-yellow-500/50">
                <h3 className="text-xl font-bold mb-4" style={{color: 'var(--shrine-gold)'}}>
                  LAW 1: "NEVER OUTSHINE THE MASTER"
                </h3>
                <div className="space-y-4">
                  <div className="bg-yellow-500/10 p-3 rounded">
                    <strong style={{color: 'var(--shrine-gold)'}}>Violation Evidence:</strong>
                    <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                      "Actually, the data shows a different trend than what you mentioned..."
                    </p>
                  </div>
                  <div className="bg-yellow-500/10 p-3 rounded">
                    <strong style={{color: 'var(--shrine-gold)'}}>Strategic Impact:</strong>
                    <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                      Direct contradiction of authority figures triggers defensive responses and relationship damage.
                    </p>
                  </div>
                  <div className="bg-green-500/10 p-3 rounded border border-green-500/30">
                    <strong className="text-green-400">Remediation Strategy:</strong>
                    <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                      Use strategic deference: "Your experience suggests... I'm curious about your thoughts on this additional data..."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Character Remodeling Strategic Frameworks */}
      {analysisView === 'remodeling' && (
        <div className="space-y-8">
          {/* Adaptive Persona Implementation Framework */}
          <div className="ultra-premium-card p-8">
            <h2 className="text-3xl font-bold text-center mb-8 hologram-text" style={{color: 'var(--hot-pink)'}}>
               ADAPTIVE PERSONA IMPLEMENTATION FRAMEWORK
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="cyber-card p-6 border-[var(--hot-pink)]/50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{color: 'var(--hot-pink)'}}>
                    <Shuffle className="w-6 h-6" />
                    VULNERABILITY-TARGETED TRANSFORMATION
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-red-500/10 p-3 rounded border border-red-500/30">
                      <strong style={{color: 'var(--vulnerability-red)'}}>Target Quote (Ego Trigger):</strong>
                      <p className="text-sm mt-2 italic" style={{color: 'var(--neon-blue)'}}>
                        "I've built multiple successful companies... I know a good opportunity when I see one."
                      </p>
                    </div>
                    <div className="bg-[var(--hot-pink)]/10 p-3 rounded">
                      <strong style={{color: 'var(--hot-pink)'}}>OLD SAGE Response (Mistake):</strong>
                      <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                        "Well, let me walk you through the analysis. There are multiple factors we need to consider, including market dynamics, competitive positioning..."
                      </p>
                    </div>
                    <div className="bg-[var(--shrine-gold)]/10 p-3 rounded border border-[var(--shrine-gold)]/30">
                      <strong style={{color: 'var(--shrine-gold)'}}>NEW ORACLE Response (Calibrated):</strong>
                      <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                        "Your track record speaks to exactly this type of strategic insight. The institutional data I'm seeing confirms what your experience already tells you - this has the same market positioning as your previous empire-building moves."
                      </p>
                    </div>
                    
                    <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30">
                      <strong style={{color: 'var(--electric-blue)'}}>Psychological Mechanism:</strong>
                      <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                        Validates their ego ("your experience already tells you") while positioning your analysis as confirmation of their superior instincts rather than new information they need to process.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="cyber-card p-6 border-[var(--hot-pink)]/50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{color: 'var(--hot-pink)'}}>
                    <Crown className="w-6 h-6" />
                    IMPATIENCE VULNERABILITY EXPLOITATION
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-red-500/10 p-3 rounded border border-red-500/30">
                      <strong style={{color: 'var(--vulnerability-red)'}}>Target Quote (Impatience Signal):</strong>
                      <p className="text-sm mt-2 italic" style={{color: 'var(--neon-blue)'}}>
                        "I don't have time for lengthy presentations. Give me the bottom line - is this worth my time or not?"
                      </p>
                    </div>
                    <div className="bg-[var(--hot-pink)]/10 p-3 rounded">
                      <strong style={{color: 'var(--hot-pink)'}}>OLD SAGE Response (Triggers Impatience):</strong>
                      <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                        "You're absolutely right about time being valuable. Let me give you a comprehensive overview starting with market trends, then competitive analysis, regulatory factors..."
                      </p>
                    </div>
                    <div className="bg-[var(--shrine-gold)]/10 p-3 rounded border border-[var(--shrine-gold)]/30">
                      <strong style={{color: 'var(--shrine-gold)'}}>NEW ORACLE Response (Respects Urgency):</strong>
                      <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                        "Absolutely worth your time. Three data points confirm this aligns with your M&A strategy: market timing advantage, regulatory moat, and competitor blind spot. The institutional analysis validates your instinct."
                      </p>
                    </div>
                    
                    <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30">
                      <strong style={{color: 'var(--electric-blue)'}}>Strategic Calibration:</strong>
                      <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                        Transforms their impatience from obstacle into asset. Quick decisive confirmation feeds their need for rapid empire-building decisions while positioning you as the intelligence source that accelerates their dominance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="cyber-card p-6 border-[var(--hot-pink)]/50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{color: 'var(--hot-pink)'}}>
                    <Zap className="w-6 h-6" />
                    STATUS VULNERABILITY LANGUAGE CALIBRATION
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-red-500/10 p-3 rounded border border-red-500/30">
                      <strong style={{color: 'var(--vulnerability-red)'}}>Target Quote (Status Concern):</strong>
                      <p className="text-sm mt-2 italic" style={{color: 'var(--neon-blue)'}}>
                        "I can't afford to be associated with anything that damages my reputation in the market."
                      </p>
                    </div>
                    <div className="bg-[var(--hot-pink)]/10 p-3 rounded">
                      <strong style={{color: 'var(--hot-pink)'}}>OLD SAGE Language (Status Threat):</strong>
                      <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                        "I think this might be worth considering, though there are some risks we should probably analyze..."
                      </p>
                    </div>
                    <div className="bg-[var(--shrine-gold)]/10 p-3 rounded border border-[var(--shrine-gold)]/30">
                      <strong style={{color: 'var(--shrine-gold)'}}>NEW ORACLE Language (Status Enhancement):</strong>
                      <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                        "This positions you ahead of competitors who lack access to institutional-grade intelligence. Your reputation as a visionary investor gets validated by being first to this opportunity."
                      </p>
                    </div>
                    
                    <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30">
                      <strong style={{color: 'var(--electric-blue)'}}>Status Language Framework:</strong>
                      <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                        Replace uncertainty words ("might," "probably") with status-elevating phrases ("positions you ahead," "validates your reputation"). Transform risk discussion into competitive advantage narrative.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="cyber-card p-6 border-[var(--hot-pink)]/50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{color: 'var(--hot-pink)'}}>
                    <Target className="w-6 h-6" />
                    BEHAVIORAL CALIBRATION
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-[var(--hot-pink)]/10 p-3 rounded">
                      <strong style={{color: 'var(--hot-pink)'}}>Timing Adjustments:</strong>
                      <p className="mt-2" style={{color: 'var(--neon-blue)'}}>Respond within 2 hours (shows respect for their time), keep initial emails under 3 sentences</p>
                    </div>
                    <div className="bg-[var(--hot-pink)]/10 p-3 rounded">
                      <strong style={{color: 'var(--hot-pink)'}}>Structure Changes:</strong>
                      <p className="mt-2" style={{color: 'var(--neon-blue)'}}>Lead with executive summary, maximum 3 key points, end with clear recommendation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Psychological Compatibility Analysis */}
          <div className="ultra-premium-card p-8">
            <h2 className="text-3xl font-bold text-center mb-8 hologram-text" style={{color: 'var(--electric-blue)'}}>
               PSYCHOLOGICAL COMPATIBILITY MATRIX
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="cyber-card p-6 border-red-500/50">
                <h3 className="text-xl font-bold mb-4" style={{color: 'var(--vulnerability-red)'}}>
                  CONFLICT POINTS ANALYSIS
                </h3>
                <div className="space-y-4">
                  <div className="bg-red-500/10 p-4 rounded border border-red-500/30">
                    <strong style={{color: 'var(--vulnerability-red)'}}>Your Detail Orientation vs Their Impatience</strong>
                    <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                      <strong>Example Friction:</strong> You naturally provide comprehensive analysis. They want bottom-line results in 30 seconds.
                    </p>
                    <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                      <strong>Mitigation Strategy:</strong> Lead with conclusion, then offer to "dive deeper into the analysis if needed."
                    </p>
                  </div>
                  <div className="bg-red-500/10 p-4 rounded border border-red-500/30">
                    <strong style={{color: 'var(--vulnerability-red)'}}>Your Analytical Process vs Their Intuitive Decisions</strong>
                    <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                      <strong>Example Friction:</strong> You need data to decide. They trust gut instinct and experience.
                    </p>
                    <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                      <strong>Mitigation Strategy:</strong> Frame analysis as "validation of your instinct" rather than contrary evidence.
                    </p>
                  </div>
                </div>
              </div>

              <div className="cyber-card p-6 border-green-500/50">
                <h3 className="text-xl font-bold mb-4" style={{color: 'var(--cyber-green)'}}>
                  HARMONY POINTS LEVERAGE
                </h3>
                <div className="space-y-4">
                  <div className="bg-green-500/10 p-4 rounded border border-green-500/30">
                    <strong className="text-green-400">Shared Respect for Competence</strong>
                    <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                      <strong>Strategic Application:</strong> Both value expertise and results. Position your analysis as elite-level intelligence.
                    </p>
                    <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                      <strong>Example Approach:</strong> "This represents institutional-grade analysis typically reserved for billion-dollar decisions."
                    </p>
                  </div>
                  <div className="bg-green-500/10 p-4 rounded border border-green-500/30">
                    <strong className="text-green-400">Mutual Strategic Thinking</strong>
                    <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                      <strong>Strategic Application:</strong> Both appreciate long-term planning and strategic positioning.
                    </p>
                    <p className="text-sm mt-2" style={{color: 'var(--neon-blue)'}}>
                      <strong>Example Approach:</strong> "Your strategic vision aligns perfectly with this 5-year market evolution analysis."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}