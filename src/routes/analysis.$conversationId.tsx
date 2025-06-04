import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation } from "convex/react";
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
  
  const conversation = useQuery(api.conversations.getConversation, {
    id: conversationId as Id<"conversations">
  });

  // Mutations for self-analysis and remodeling
  const analyzeSelf = useMutation(api.selfAnalysis.analyzeSelfCommunication);
  const generateRemodeling = useMutation(api.selfAnalysis.generateCharacterRemodeling);

  // Get user profile and remodeling data
  const userProfile = useQuery(api.selfAnalysis.getUserProfile, conversation ? { userId: conversation.userId } : "skip");
  const characterRemodeling = useQuery(api.selfAnalysis.getCharacterRemodeling, 
    conversation ? { targetAnalysisId: "mock_analysis_id" as Id<"analyses"> } : "skip"
  );
  
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
          🦊 KITSUNE PSYCHOLOGICAL WARFARE SUITE
        </h1>
        <div className="flex items-center justify-center gap-4 mb-4">
          <Target className="w-8 h-8 fox-fire-glow" style={{color: 'var(--hot-pink)'}} />
          <div className="text-center">
            <p className="text-2xl font-bold" style={{color: 'var(--neon-blue)'}}>
              {conversation.title}
            </p>
            {conversation.participantName && (
              <p className="text-lg" style={{color: 'var(--golden-circuit)'}}>
                SUBJECT: {conversation.participantName}
              </p>
            )}
          </div>
        </div>

        {/* Analysis Type Selector */}
        <div className="flex justify-center gap-4 mb-6">
          {[
            { id: 'target', label: '🎯 TARGET ANALYSIS', icon: Target, desc: 'Analyze other party' },
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
                onClick={() => conversation && analyzeSelf({ userId: conversation.userId })}
                className="cyber-btn px-6 py-3 bg-[var(--cyber-green)] text-black"
              >
                <RefreshCw className="w-5 h-5 inline mr-2" />
                🧠 ANALYZE YOUR COMMUNICATION PATTERNS
              </button>
            )}
            
            {analysisView === 'remodeling' && !characterRemodeling && userProfile && (
              <button
                onClick={() => conversation && generateRemodeling({ 
                  userId: conversation.userId, 
                  targetAnalysisId: "mock_analysis_id" as Id<"analyses"> 
                })}
                className="cyber-btn px-6 py-3 bg-[var(--hot-pink)] text-black"
              >
                <Shuffle className="w-5 h-5 inline mr-2" />
                🎭 GENERATE CHARACTER REMODELING
              </button>
            )}
          </div>
        )}
      </div>

      {/* Archetype Classification */}
      <div className="cyber-card p-8 mb-8 text-center">
        <div className="flex justify-center mb-6">
          {analysisView === 'target' && (
            <ArchetypeIcon className="w-24 h-24 fox-fire-glow" style={{color: 'var(--golden-circuit)'}} />
          )}
          {analysisView === 'self' && (
            <Brain className="w-24 h-24 fox-fire-glow" style={{color: 'var(--cyber-green)'}} />
          )}
          {analysisView === 'remodeling' && (
            <Shuffle className="w-24 h-24 fox-fire-glow" style={{color: 'var(--hot-pink)'}} />
          )}
        </div>
        <h2 className="text-4xl font-bold mb-4 hologram-text">
          {analysisView === 'target' && mockAnalysis.primaryArchetype}
          {analysisView === 'self' && mockUserProfile.primaryArchetype}
          {analysisView === 'remodeling' && 'ADAPTIVE PERSONA'}
        </h2>
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-xl">
            {analysisView === 'remodeling' ? 'ADAPTATION LEVEL:' : 'CLASSIFICATION CONFIDENCE:'}
          </span>
          <div className="flex items-center gap-2">
            <div className="w-32 h-4 bg-gray-700 rounded">
              <div 
                className="kitsune-rating h-full rounded"
                style={{width: `${
                  analysisView === 'target' ? mockAnalysis.archetypeConfidence * 100 :
                  analysisView === 'self' ? mockUserProfile.archetypeConfidence * 100 :
                  mockRemodeling.adaptivePersona.adaptationLevel * 10
                }%`}}
              />
            </div>
            <span className="text-xl font-bold" style={{color: 'var(--golden-circuit)'}}>
              {analysisView === 'target' && Math.round(mockAnalysis.archetypeConfidence * 100)}
              {analysisView === 'self' && Math.round(mockUserProfile.archetypeConfidence * 100)}
              {analysisView === 'remodeling' && mockRemodeling.adaptivePersona.adaptationLevel}
              {analysisView === 'remodeling' ? '/10' : '%'}
            </span>
          </div>
        </div>
        <p className="text-lg opacity-80">
          {analysisView === 'target' && 'Primary investor archetype identified through behavioral pattern analysis'}
          {analysisView === 'self' && 'Your communication archetype based on chat history analysis'}
          {analysisView === 'remodeling' && mockRemodeling.adaptivePersona.recommendedPersona}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex gap-2 flex-wrap">
          {analysisView === 'target' && [
            { id: 'target-matrix', label: '📊 PERSONALITY MATRIX', icon: BarChart3 },
            { id: 'target-vulnerabilities', label: '🛡️ VULNERABILITIES', icon: AlertTriangle },
            { id: 'target-arsenal', label: '⚔️ 48 LAWS ARSENAL', icon: Sword },
            { id: 'target-codex', label: '💬 COMPLIMENT CODEX', icon: Star }
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
            { id: 'self-matrix', label: '📊 YOUR PROFILE', icon: User },
            { id: 'self-vulnerabilities', label: '⚠️ YOUR WEAKNESSES', icon: AlertTriangle },
            { id: 'self-violations', label: '📜 POWER LAW VIOLATIONS', icon: Brain },
            { id: 'self-nlp', label: '🧠 NLP PROFILE', icon: Activity }
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
            { id: 'remodeling-persona', label: '🎭 ADAPTIVE PERSONA', icon: Shuffle },
            { id: 'remodeling-communication', label: '💬 COMMUNICATION SHIFTS', icon: RefreshCw },
            { id: 'remodeling-mitigation', label: '🛡️ VULNERABILITY FIXES', icon: Shield },
            { id: 'remodeling-synergy', label: '⚡ SYNERGY ANALYSIS', icon: Zap }
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
            ⚔️ ENTER WAR ROOM SIMULATOR
          </Link>
        </div>
      </div>

      {/* Digital Kitsune Evolution Feedback */}
      <div className="cyber-card p-8">
        <h2 className="text-3xl font-bold text-center mb-6 hologram-text">
          🦊 DIGITAL KITSUNE EVOLUTION FEEDBACK
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { label: 'Analysis Accuracy', value: 9.2, color: 'var(--cyber-green)' },
            { label: 'Strategy Usefulness', value: 8.7, color: 'var(--neon-blue)' },
            { label: 'Simulator Realism', value: 8.9, color: 'var(--hot-pink)' },
            { label: 'Overall Power Level', value: 9.0, color: 'var(--golden-circuit)' }
          ].map((metric, index) => (
            <div key={index} className="text-center">
              <h3 className="font-bold mb-3" style={{color: metric.color}}>
                {metric.label}
              </h3>
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
                <div 
                  className="absolute inset-0 rounded-full border-4 border-transparent fox-fire-glow"
                  style={{
                    borderTopColor: metric.color,
                    borderRightColor: metric.color,
                    transform: `rotate(${(metric.value / 10) * 360}deg)`,
                    transition: 'transform 2s ease-in-out'
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold" style={{color: metric.color}}>
                    {metric.value}
                  </span>
                </div>
              </div>
              <div className="flex justify-center">
                {Array.from({length: 5}, (_, i) => (
                  <Star 
                    key={i}
                    className={`w-5 h-5 fox-fire-glow ${i < Math.floor(metric.value / 2) ? '' : 'opacity-30'}`}
                    style={{color: metric.color}}
                    fill="currentColor"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-lg mb-4" style={{color: 'var(--hot-pink)'}}>
            Your kitsune powers are evolving! Suggest additional tactical abilities:
          </p>
          <div className="flex justify-center gap-4">
            <input 
              type="text" 
              placeholder="Suggest new psychological warfare techniques..."
              className="input input-bordered flex-1 max-w-md bg-black/50 border-[var(--neon-blue)] text-[var(--neon-blue)]"
            />
            <button className="weapon-button px-6 py-3">
              📡 TRANSMIT EVOLUTION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}