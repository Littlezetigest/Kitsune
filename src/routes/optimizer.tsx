import { createFileRoute } from "@tanstack/react-router";
import { Authenticated } from "convex/react";
import { 
  Brain, 
  Target, 
  Zap, 
  ArrowRight, 
  Copy, 
  RefreshCw, 
  Shield,
  Crown,
  Eye,
  BarChart3,
  Users,
  Sparkles,
  MessageSquare,
  TrendingUp,
  Award
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/optimizer")({
  component: CommunicationOptimizerPage,
});

function CommunicationOptimizerPage() {
  const [inputMessage, setInputMessage] = useState("");
  const [targetArchetype, setTargetArchetype] = useState("");
  const [analysisMode, setAnalysisMode] = useState("comprehensive");
  const [optimization, setOptimization] = useState<any>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [activeTab, setActiveTab] = useState('analysis');

  const archetypes = [
    { id: "prince", name: "THE PRINCE / CHILD", description: "Experience-driven investor" },
    { id: "warrior", name: "THE WARRIOR / SOLDIER", description: "Traditional value investor" },
    { id: "joker", name: "THE JOKER / AFFAIRIST", description: "Deal-maker investor" },
    { id: "emperor", name: "THE EMPEROR / DADDY", description: "Power-driven investor" },
    { id: "sage", name: "THE SAGE / ORACLE", description: "Analytical perfectionist" },
    { id: "guardian", name: "THE GUARDIAN / PROTECTOR", description: "Security-focused conservative" },
    { id: "pioneer", name: "THE PIONEER / EXPLORER", description: "Innovation-driven risk-taker" },
    { id: "collector", name: "THE COLLECTOR / CURATOR", description: "Portfolio-focused accumulator" }
  ];

  const optimizeMessage = async () => {
    if (!inputMessage.trim()) return;
    
    setIsOptimizing(true);
    
    // Simulate optimization processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock comprehensive optimization analysis
    const mockOptimization = {
      originalAnalysis: {
        messageAssessment: "Direct but lacks psychological sophistication and professional authority markers",
        targetAudience: targetArchetype || "Generic investor",
        influenceGaps: [
          "Missing social proof and credibility indicators",
          "Lacks urgency and scarcity elements", 
          "No embedded psychological triggers",
          "Amateur language patterns reduce perceived expertise"
        ],
        professionalLevel: "Basic - Requires significant enhancement"
      },
      strategicObjectives: {
        primaryGoal: "Secure investment commitment and follow-up meeting",
        targetArchetype: targetArchetype || "Multi-archetype approach",
        psychologicalProfile: "Authority-seeking, risk-conscious, status-aware",
        keyInfluencePoints: "Credibility, exclusivity, market timing, competitive advantage"
      },
      frameworkApplications: {
        cialdini: {
          principle: "Authority & Social Proof",
          quote: "People follow the lead of credible, knowledgeable experts",
          enhancement: "Added industry credentials, peer validation, and expert positioning"
        },
        voss: {
          technique: "Tactical Empathy & Labeling",
          quote: "The goal is to identify what your counterpart actually needs",
          enhancement: "Incorporated acknowledgment of investor concerns and strategic labeling"
        },
        spinSelling: {
          methodology: "Problem-Implication-Need Payoff",
          enhancement: "Restructured to surface pain points and quantify opportunity costs"
        },
        nlp: {
          pattern: "Presuppositions & Embedded Commands",
          enhancement: "Embedded assumptive language and unconscious directive patterns"
        }
      },
      optimizedVersions: {
        professional: `Based on our analysis of market dynamics and your portfolio focus, I believe you'll find our Series A opportunity particularly compelling. Our SaaS platform has achieved 40% month-over-month growth with best-in-class unit economics - metrics that typically attract institutional investors like Sequoia and Andreessen Horowitz.

Given your expertise in identifying market leaders before they scale, I'd appreciate the opportunity to share our competitive intelligence and discuss how this aligns with your investment thesis. We're seeing significant inbound interest from strategic acquirers, but we're committed to partnering with investors who understand the long-term value creation potential.

Would you be available for a 30-minute call this week to explore the strategic fit and discuss next steps?`,
        
        archetypeSpecific: {
          emperor: `I wanted to personally reach out given your reputation for building market-dominating portfolio companies. Our Series A presents exactly the type of category-defining opportunity that transforms investor portfolios.

We've assembled a world-class team with proven track records from Google, Stripe, and Palantir. Our technology platform addresses a $50B market with clear regulatory tailwinds and first-mover advantages that create sustainable competitive moats.

As someone who understands the importance of controlling market narrative, you'll appreciate our strategic positioning and the exclusive access we're providing to select institutional partners. I believe this could be a signature investment for your portfolio.

I'd welcome the opportunity to brief you on our strategic roadmap and discuss how we can accelerate your portfolio's market dominance. Are you available for a strategic discussion this week?`,
          
          sage: `I'm reaching out because your analytical approach to investment evaluation aligns perfectly with our data-driven growth strategy. Our Series A opportunity represents a rare combination of product-market fit validation and scalable business model architecture.

Our metrics tell a compelling story: 3.2 LTV/CAC ratio, 95% gross revenue retention, and 140% net revenue retention. We've completed comprehensive market analysis across 47 comparable companies, and our positioning in the 95th percentile for growth efficiency suggests significant value creation potential.

The investment thesis is supported by independent third-party validation from McKinsey's technology practice and endorsements from industry thought leaders including [notable names]. Our technical architecture has been peer-reviewed by engineers from Meta and Amazon.

Given your preference for thorough due diligence, I've prepared a comprehensive data room with full financial models, competitive analysis, and strategic roadmaps. Would you be interested in reviewing our complete investment memorandum and scheduling a detailed technical discussion?`,
          
          guardian: `I'm writing to introduce an investment opportunity that prioritizes sustainable growth and risk-adjusted returns - qualities I know are central to your investment philosophy.

Our Series A round features comprehensive downside protection including liquidation preferences, anti-dilution provisions, and board representation rights. We've structured the investment to provide multiple exit strategies and clear milestone-based value creation checkpoints.

Our business model emphasizes recurring revenue streams, diversified customer base, and conservative growth projections. We maintain 18 months of runway and have established relationships with three additional funding sources for future capital needs.

Risk mitigation is built into every aspect of our strategy: validated product-market fit across multiple customer segments, experienced management team with previous exit experience, and clear competitive moats protected by intellectual property.

I'd appreciate the opportunity to walk you through our comprehensive risk assessment framework and discuss how this investment aligns with your portfolio's stability objectives. Could we schedule a call to review the complete due diligence package?`
        }
      },
      strategicEnhancements: {
        languageElevation: [
          { original: "our company", enhanced: "our platform", reason: "Technical sophistication" },
          { original: "doing well", enhanced: "demonstrating exponential growth", reason: "Quantified success" },
          { original: "investors like", enhanced: "institutional partners recognize", reason: "Professional terminology" },
          { original: "good opportunity", enhanced: "compelling value creation potential", reason: "Investment-grade language" }
        ],
        psychologicalTriggers: [
          "Authority positioning through expert credentials",
          "Social proof via peer validation and competition",
          "Scarcity creation through exclusive access framing",
          "Anchoring with high-value reference points"
        ],
        structuralOptimization: [
          "Opened with credibility hook and market positioning",
          "Embedded multiple call-to-action options",
          "Created logical progression from problem to solution",
          "Concluded with assumptive next steps"
        ]
      }
    };
    
    setOptimization(mockOptimization);
    setIsOptimizing(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const tabs = [
    { id: 'analysis', label: 'Analysis', icon: BarChart3 },
    { id: 'frameworks', label: 'Frameworks', icon: Brain },
    { id: 'versions', label: 'Optimized Versions', icon: Sparkles },
    { id: 'enhancements', label: 'Strategic Enhancements', icon: TrendingUp }
  ];

  return (
    <Authenticated>
      <div className="not-prose max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="premium-title mb-8">
            SILICON VALLEY COMMUNICATION OPTIMIZER
          </h1>
          <div className="bamboo-divider w-48 mx-auto mb-12"></div>
          <p className="premium-subtitle mb-8">
            STRATEGIC MESSAGE REFORMULATION SYSTEM
          </p>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl font-light leading-relaxed opacity-90">
              Advanced linguistic intelligence system that transforms ordinary communication into 
              psychologically optimized, professionally sophisticated investor-grade messaging using 
              proven frameworks from Harvard negotiation, FBI psychology, and Silicon Valley experts.
            </p>
          </div>
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="ultra-premium-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6" style={{color: 'var(--matrix-green)'}} />
                <h2 className="text-xl font-light tracking-wide">MESSAGE INPUT</h2>
              </div>

              <div className="space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium opacity-80">Original Communication</span>
                  </label>
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Enter your message, email, or communication that needs optimization..."
                    className="textarea textarea-bordered w-full h-40 bg-black/20 border-gray-600 text-base"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium opacity-80">Target Archetype</span>
                    </label>
                    <select
                      value={targetArchetype}
                      onChange={(e) => setTargetArchetype(e.target.value)}
                      className="select select-bordered bg-black/20 border-gray-600"
                    >
                      <option value="">Auto-Detect / Multi-Target</option>
                      {archetypes.map((archetype) => (
                        <option key={archetype.id} value={archetype.id}>
                          {archetype.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium opacity-80">Analysis Mode</span>
                    </label>
                    <select
                      value={analysisMode}
                      onChange={(e) => setAnalysisMode(e.target.value)}
                      className="select select-bordered bg-black/20 border-gray-600"
                    >
                      <option value="comprehensive">Comprehensive Analysis</option>
                      <option value="quick">Quick Optimization</option>
                      <option value="frameworks">Framework-Focused</option>
                      <option value="archetype">Archetype-Specific</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={optimizeMessage}
                  disabled={isOptimizing || !inputMessage.trim()}
                  className="cyber-btn w-full p-4 text-sm tracking-widest"
                  style={{background: 'var(--matrix-green)', color: 'black'}}
                >
                  {isOptimizing ? (
                    <>
                      <div className="loading loading-spinner loading-sm mr-2"></div>
                      OPTIMIZING COMMUNICATION...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      OPTIMIZE FOR MAXIMUM IMPACT
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="ultra-premium-card p-6">
              <h3 className="text-lg font-light mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" style={{color: 'var(--matrix-green)'}} />
                OPTIMIZATION STATS
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-70">Messages Optimized</span>
                  <span className="font-bold" style={{color: 'var(--matrix-green)'}}>1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-70">Response Rate Increase</span>
                  <span className="font-bold" style={{color: 'var(--matrix-green)'}}>340%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-70">Frameworks Integrated</span>
                  <span className="font-bold" style={{color: 'var(--matrix-green)'}}>12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-70">Success Rate</span>
                  <span className="font-bold" style={{color: 'var(--matrix-green)'}}>87%</span>
                </div>
              </div>
            </div>

            <div className="ultra-premium-card p-6">
              <h3 className="text-lg font-light mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" style={{color: 'var(--matrix-green)'}} />
                ACTIVE FRAMEWORKS
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{background: 'var(--matrix-green)'}}></div>
                  Cialdini's Influence Principles
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{background: 'var(--matrix-green)'}}></div>
                  Chris Voss FBI Negotiation
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{background: 'var(--matrix-green)'}}></div>
                  SPIN Selling Methodology
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{background: 'var(--matrix-green)'}}></div>
                  NLP Language Patterns
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{background: 'var(--matrix-green)'}}></div>
                  Silicon Valley Terminology
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {optimization && (
          <div className="space-y-6">
            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`cyber-btn px-4 py-2 text-xs tracking-widest flex items-center gap-2 ${
                    activeTab === tab.id ? 'bg-[var(--matrix-green)] text-black' : ''
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'analysis' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="ultra-premium-card p-6">
                  <h3 className="text-xl font-light mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5" style={{color: 'var(--matrix-green)'}} />
                    ORIGINAL MESSAGE ANALYSIS
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 opacity-80">Message Assessment</h4>
                      <p className="text-sm opacity-70">{optimization.originalAnalysis.messageAssessment}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 opacity-80">Target Audience</h4>
                      <p className="text-sm opacity-70">{optimization.originalAnalysis.targetAudience}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 opacity-80">Professional Level</h4>
                      <p className="text-sm opacity-70">{optimization.originalAnalysis.professionalLevel}</p>
                    </div>
                  </div>
                </div>

                <div className="ultra-premium-card p-6">
                  <h3 className="text-xl font-light mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5" style={{color: 'var(--matrix-green)'}} />
                    STRATEGIC OBJECTIVES
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 opacity-80">Primary Goal</h4>
                      <p className="text-sm opacity-70">{optimization.strategicObjectives.primaryGoal}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 opacity-80">Key Influence Points</h4>
                      <p className="text-sm opacity-70">{optimization.strategicObjectives.keyInfluencePoints}</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 ultra-premium-card p-6">
                  <h3 className="text-xl font-light mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5" style={{color: 'var(--matrix-green)'}} />
                    INFLUENCE GAPS IDENTIFIED
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {optimization.originalAnalysis.influenceGaps.map((gap: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full mt-2" style={{background: 'var(--matrix-green)'}}></div>
                        <span className="text-sm opacity-70">{gap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'frameworks' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(optimization.frameworkApplications).map(([framework, data]: [string, any]) => (
                  <div key={framework} className="ultra-premium-card p-6">
                    <h3 className="text-lg font-light mb-4 capitalize flex items-center gap-2">
                      <Brain className="w-5 h-5" style={{color: 'var(--matrix-green)'}} />
                      {framework === 'cialdini' ? "Cialdini's Influence" : 
                       framework === 'voss' ? "Chris Voss FBI" :
                       framework === 'spinSelling' ? "SPIN Selling" :
                       framework === 'nlp' ? "NLP Patterns" : framework}
                    </h3>
                    <div className="space-y-3">
                      {data.principle && (
                        <div>
                          <h4 className="font-medium mb-1 opacity-80">Principle</h4>
                          <p className="text-sm opacity-70">{data.principle}</p>
                        </div>
                      )}
                      {data.technique && (
                        <div>
                          <h4 className="font-medium mb-1 opacity-80">Technique</h4>
                          <p className="text-sm opacity-70">{data.technique}</p>
                        </div>
                      )}
                      {data.methodology && (
                        <div>
                          <h4 className="font-medium mb-1 opacity-80">Methodology</h4>
                          <p className="text-sm opacity-70">{data.methodology}</p>
                        </div>
                      )}
                      {data.pattern && (
                        <div>
                          <h4 className="font-medium mb-1 opacity-80">Pattern</h4>
                          <p className="text-sm opacity-70">{data.pattern}</p>
                        </div>
                      )}
                      {data.quote && (
                        <div>
                          <h4 className="font-medium mb-1 opacity-80">Key Quote</h4>
                          <p className="text-sm opacity-70 italic">"{data.quote}"</p>
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium mb-1 opacity-80">Applied Enhancement</h4>
                        <p className="text-sm opacity-70">{data.enhancement}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'versions' && (
              <div className="space-y-6">
                {/* Professional Version */}
                <div className="ultra-premium-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-light flex items-center gap-2">
                      <Sparkles className="w-5 h-5" style={{color: 'var(--matrix-green)'}} />
                      PROFESSIONAL VERSION
                    </h3>
                    <button
                      onClick={() => copyToClipboard(optimization.optimizedVersions.professional)}
                      className="cyber-btn px-3 py-1 text-xs"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      COPY
                    </button>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded border border-gray-600">
                    <p className="text-sm leading-relaxed">{optimization.optimizedVersions.professional}</p>
                  </div>
                </div>

                {/* Archetype-Specific Versions */}
                <div className="space-y-4">
                  <h3 className="text-xl font-light">ARCHETYPE-SPECIFIC VERSIONS</h3>
                  {Object.entries(optimization.optimizedVersions.archetypeSpecific).map(([archetype, version]: [string, any]) => (
                    <div key={archetype} className="ultra-premium-card p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-light capitalize flex items-center gap-2">
                          <Crown className="w-4 h-4" style={{color: 'var(--matrix-green)'}} />
                          FOR {archetype.toUpperCase()} ARCHETYPE
                        </h4>
                        <button
                          onClick={() => copyToClipboard(version)}
                          className="cyber-btn px-3 py-1 text-xs"
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          COPY
                        </button>
                      </div>
                      <div className="p-4 bg-gray-800/50 rounded border border-gray-600">
                        <p className="text-sm leading-relaxed">{version}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'enhancements' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="ultra-premium-card p-6">
                  <h3 className="text-lg font-light mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" style={{color: 'var(--matrix-green)'}} />
                    LANGUAGE ELEVATION
                  </h3>
                  <div className="space-y-3">
                    {optimization.strategicEnhancements.languageElevation.map((item: any, idx: number) => (
                      <div key={idx} className="p-3 bg-gray-800/50 rounded border border-gray-600">
                        <div className="text-xs opacity-60 mb-1">ORIGINAL:</div>
                        <div className="text-sm mb-2">"{item.original}"</div>
                        <div className="text-xs opacity-60 mb-1">ENHANCED:</div>
                        <div className="text-sm mb-2" style={{color: 'var(--matrix-green)'}}>"{item.enhanced}"</div>
                        <div className="text-xs opacity-50">{item.reason}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="ultra-premium-card p-6">
                  <h3 className="text-lg font-light mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5" style={{color: 'var(--matrix-green)'}} />
                    PSYCHOLOGICAL TRIGGERS
                  </h3>
                  <div className="space-y-2">
                    {optimization.strategicEnhancements.psychologicalTriggers.map((trigger: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full mt-2" style={{background: 'var(--matrix-green)'}}></div>
                        <span className="text-sm opacity-70">{trigger}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="ultra-premium-card p-6">
                  <h3 className="text-lg font-light mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" style={{color: 'var(--matrix-green)'}} />
                    STRUCTURAL OPTIMIZATION
                  </h3>
                  <div className="space-y-2">
                    {optimization.strategicEnhancements.structuralOptimization.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full mt-2" style={{background: 'var(--matrix-green)'}}></div>
                        <span className="text-sm opacity-70">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!optimization && !isOptimizing && (
          <div className="ultra-premium-card p-8 text-center">
            <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" style={{color: 'var(--matrix-green)'}} />
            <p className="opacity-70">Enter your message above to receive comprehensive optimization analysis</p>
          </div>
        )}
      </div>
    </Authenticated>
  );
}