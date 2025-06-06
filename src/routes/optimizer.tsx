import { createFileRoute } from "@tanstack/react-router";
import { Authenticated, useQuery } from "convex/react";
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
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";

export const Route = createFileRoute("/optimizer")({
  component: CommunicationOptimizerPage,
});

function CommunicationOptimizerPage() {
  const [inputMessage, setInputMessage] = useState("");
  const [selectedConversationId, setSelectedConversationId] = useState("");
  const [analysisMode, setAnalysisMode] = useState("comprehensive");
  const [optimization, setOptimization] = useState<any>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [activeTab, setActiveTab] = useState('analysis');
  const [useLLMEnhancement, setUseLLMEnhancement] = useState(false);

  // LLM-powered analysis mutations
  const generateLLMAnalysis = useMutation(api.llmAnalysis.generateLLMAnalysis);
  const enhanceCommunicationWithLLM = useMutation(api.llmAnalysis.enhanceCommunicationWithLLM);

  // Real message analysis function
  const analyzeMessageContent = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Analyze professional level
    const professionalIndicators = {
      formal: /\b(professional|industry|enterprise|strategic|comprehensive)\b/.test(lowerMessage),
      credibility: /\b(experience|track record|proven|established|recognized)\b/.test(lowerMessage),
      technical: /\b(solution|platform|technology|system|framework)\b/.test(lowerMessage),
      business: /\b(revenue|growth|market|roi|investment)\b/.test(lowerMessage)
    };
    
    // Identify influence gaps
    const influenceGaps = [];
    if (!professionalIndicators.credibility) influenceGaps.push("Lacks credibility markers and social proof");
    if (!professionalIndicators.business) influenceGaps.push("Missing business value quantification");
    if (message.length < 100) influenceGaps.push("Too brief - lacks strategic depth");
    if (!lowerMessage.includes("you") && !lowerMessage.includes("your")) influenceGaps.push("Not personalized to recipient");
    if (!/\b(exclusive|limited|opportunity|urgent)\b/.test(lowerMessage)) influenceGaps.push("Missing scarcity and urgency elements");
    
    // Determine professional level
    const professionalScore = Object.values(professionalIndicators).filter(Boolean).length;
    let professionalLevel = "Basic";
    if (professionalScore >= 3) professionalLevel = "Advanced";
    else if (professionalScore >= 2) professionalLevel = "Intermediate";
    
    return {
      professionalIndicators,
      influenceGaps,
      professionalLevel,
      messageLength: message.length,
      formalityScore: professionalScore
    };
  };

  // Helper functions for real analysis
  const generateMessageAssessment = (analysis: any, targetData: any) => {
    let assessment = `${analysis.professionalLevel} level communication`;
    if (analysis.messageLength < 50) assessment += " - Too brief for investor engagement";
    if (analysis.formalityScore < 2) assessment += " - Lacks professional sophistication";
    if (targetData) assessment += ` - Missing ${targetData.archetype}-specific psychological triggers`;
    return assessment;
  };

  const generateInfluenceGaps = (analysis: any, targetData: any) => {
    const gaps = [...analysis.influenceGaps];
    if (targetData) {
      gaps.push(`Missing triggers for ${targetData.archetype} archetype psychology`);
      if (targetData.vulnerabilities.length > 0) {
        gaps.push(`Not exploiting known vulnerabilities: ${targetData.vulnerabilities.slice(0, 2).map((v: any) => v.type).join(', ')}`);
      }
    }
    return gaps;
  };

  const getImprovementNote = (level: string) => {
    switch (level) {
      case "Basic": return "Requires significant enhancement for investor-grade communication";
      case "Intermediate": return "Needs professional sophistication and psychological optimization";
      case "Advanced": return "Ready for archetype-specific customization";
      default: return "Requires enhancement";
    }
  };

  const generateArchetypeOptimization = (inputMessage: string, targetData: any) => {
    if (!targetData) return null;
    
    const archetype = targetData.archetype;
    const vulnerabilities = targetData.vulnerabilities.map((v: any) => v.type).join(', ');
    
    // Generate archetype-specific versions based on real data
    switch (archetype) {
      case "EMPEROR":
        return `I wanted to personally reach out given your reputation for building market-dominating portfolio companies. Based on our analysis of your investment patterns, this Series A opportunity aligns perfectly with your focus on ${targetData.personalityMatrix.emotionalDriver} and control-oriented investments.

Our platform addresses the exact market dynamics you've identified as critical - we've achieved the type of commanding market position that transforms investor portfolios. Given your preference for ${targetData.communicationStyle.responseTime} decision-making and ${targetData.communicationStyle.persuasionStyle} validation, I believe this represents a signature investment opportunity.

I'd welcome the opportunity to brief you on our strategic roadmap and discuss how we can accelerate your portfolio's market dominance. Are you available for a strategic discussion this week?`;
        
      case "SAGE":
        return `I'm reaching out because your analytical approach to investment evaluation aligns perfectly with our data-driven growth strategy. Based on your preference for ${targetData.communicationStyle.persuasionStyle} analysis and ${targetData.personalityMatrix.analyticalDepth}/10 analytical depth, you'll appreciate our comprehensive approach to market validation.

Our metrics demonstrate strong fundamentals: proven product-market fit with quantifiable growth efficiency. The investment thesis is supported by independent validation and addresses the analytical rigor I know you require for ${targetData.personalityMatrix.emotionalDriver}-focused investments.

Given your systematic due diligence process, I've prepared a comprehensive data room with complete financial models, competitive analysis, and technical architecture review. Would you be interested in scheduling a detailed analytical discussion?`;
        
      case "GUARDIAN":
        return `I'm writing to introduce an investment opportunity that prioritizes sustainable growth and risk-adjusted returns - qualities that align with your conservative investment philosophy and focus on ${targetData.personalityMatrix.emotionalDriver}.

Our Series A features comprehensive downside protection and conservative growth projections that match your ${targetData.personalityMatrix.riskTolerance}/10 risk tolerance. We maintain strong runway and have established multiple funding relationships for future capital needs.

Risk mitigation is built into every aspect: validated market fit, experienced management, and clear competitive protections. This aligns with your preference for ${targetData.personalityMatrix.investmentStyle} investments and ${targetData.communicationStyle.responseTime} decision processes.

Could we schedule a call to review the complete risk assessment framework and protection structures?`;
        
      default:
        return generateGenericOptimization(inputMessage, targetData);
    }
  };

  const generateGenericOptimization = (inputMessage: string, targetData: any) => {
    return `Based on our analysis of your investment focus and communication preferences, I believe you'll find our Series A opportunity compelling. Our platform has achieved strong growth metrics that typically attract institutional investors with your profile.

Given your expertise in identifying market opportunities and preference for ${targetData?.communicationStyle?.persuasionStyle || 'logical'} validation, I'd appreciate the opportunity to share our strategic positioning and discuss alignment with your investment thesis.

Would you be available for a strategic discussion this week to explore the partnership potential?`;
  };
  
  // Fetch user's conversations and analyses
  const conversations = useQuery(api.conversations.getConversations);
  const selectedAnalysis = selectedConversationId 
    ? useQuery(api.analysis.getAnalysis, { conversationId: selectedConversationId as any })
    : undefined;

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
    
    try {
      let optimization;
      
      if (useLLMEnhancement && selectedConversationId) {
        // Use LLM-powered enhancement
        const targetData = selectedAnalysis ? {
          archetype: selectedAnalysis.primaryArchetype,
          vulnerabilities: selectedAnalysis.vulnerabilities.map((v: any) => v.type),
          communicationStyle: selectedAnalysis.communicationStyle.persuasionStyle,
          emotionalDriver: selectedAnalysis.personalityMatrix.emotionalDriver
        } : undefined;

        const llmResult = await enhanceCommunicationWithLLM({
          originalMessage: inputMessage,
          targetArchetype: selectedAnalysis?.primaryArchetype,
          targetPersonality: targetData,
          enhancementGoals: ["professional_sophistication", "psychological_optimization", "influence_maximization"]
        });

        optimization = {
          originalAnalysis: {
            messageAssessment: `LLM Analysis: ${llmResult.analysisBreakdown.originalWeaknesses.join(", ")}`,
            targetAudience: targetData ? `${conversations?.find(c => c._id === selectedConversationId)?.participantName || "Target"} (${targetData.archetype} archetype)` : "Generic investor",
            influenceGaps: llmResult.analysisBreakdown.originalWeaknesses,
            professionalLevel: "LLM-Enhanced Analysis"
          },
          strategicObjectives: {
            primaryGoal: "LLM-optimized investor engagement and commitment acceleration",
            targetArchetype: targetData?.archetype || "Multi-archetype approach",
            psychologicalProfile: targetData ? 
              `${targetData.archetype} - Emotional driver: ${targetData.emotionalDriver}` :
              "LLM-analyzed psychological profile",
            keyInfluencePoints: llmResult.analysisBreakdown.psychologicalTriggers.join(", ")
          },
          frameworkApplications: {
            llmEnhancement: {
              technique: "Advanced Language Model Optimization",
              enhancement: llmResult.analysisBreakdown.enhancementStrategies.join(", "),
              frameworks: llmResult.analysisBreakdown.frameworkApplications.join(", ")
            }
          },
          optimizedVersions: {
            professional: llmResult.professional,
            archetypeSpecific: targetData ? {
              [targetData.archetype.toLowerCase()]: llmResult.archetypeSpecific
            } : { llm_optimized: llmResult.archetypeSpecific },
            persuasive: llmResult.persuasive
          },
          strategicEnhancements: {
            llmInsights: llmResult.analysisBreakdown.psychologicalTriggers,
            enhancementStrategies: llmResult.analysisBreakdown.enhancementStrategies,
            frameworkApplications: llmResult.analysisBreakdown.frameworkApplications
          }
        };
      } else {
        // Use traditional analysis
        const messageAnalysis = analyzeMessageContent(inputMessage);
        
        // Get target data from selected conversation
        const targetData = selectedAnalysis ? {
          archetype: selectedAnalysis.primaryArchetype,
          participantName: conversations?.find(c => c._id === selectedConversationId)?.participantName || "Target",
          vulnerabilities: selectedAnalysis.vulnerabilities,
          communicationStyle: selectedAnalysis.communicationStyle,
          personalityMatrix: selectedAnalysis.personalityMatrix
        } : null;
    
        // Generate comprehensive optimization analysis with real target-specific data
        optimization = {
          originalAnalysis: {
            messageAssessment: generateMessageAssessment(messageAnalysis, targetData),
            targetAudience: targetData ? `${targetData.participantName} (${targetData.archetype} archetype)` : "Generic investor",
            influenceGaps: generateInfluenceGaps(messageAnalysis, targetData),
            professionalLevel: `${messageAnalysis.professionalLevel} - ${getImprovementNote(messageAnalysis.professionalLevel)}`
          },
          strategicObjectives: {
        primaryGoal: "Secure investment commitment and follow-up meeting",
        targetArchetype: targetData?.archetype || "Multi-archetype approach",
        psychologicalProfile: targetData ? 
          `${targetData.archetype} - Risk tolerance: ${targetData.personalityMatrix.riskTolerance}/10, Decision speed: ${targetData.personalityMatrix.decisionSpeed}/10` :
          "Authority-seeking, risk-conscious, status-aware",
        keyInfluencePoints: targetData ?
          `Exploit: ${targetData.vulnerabilities.map((v: any) => v.type).join(', ')}` :
          "Credibility, exclusivity, market timing, competitive advantage"
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
        professional: generateGenericOptimization(inputMessage, targetData),
        
        archetypeSpecific: targetData ? {
          [targetData.archetype.toLowerCase()]: generateArchetypeOptimization(inputMessage, targetData)
        } : {
          emperor: generateArchetypeOptimization(inputMessage, {archetype: "EMPEROR", personalityMatrix: {emotionalDriver: "control"}, communicationStyle: {responseTime: "immediate", persuasionStyle: "authoritative"}}),
          sage: generateArchetypeOptimization(inputMessage, {archetype: "SAGE", personalityMatrix: {emotionalDriver: "knowledge", analyticalDepth: 8}, communicationStyle: {responseTime: "deliberate", persuasionStyle: "logical"}}),
          guardian: generateArchetypeOptimization(inputMessage, {archetype: "GUARDIAN", personalityMatrix: {emotionalDriver: "security", riskTolerance: 3, investmentStyle: "conservative"}, communicationStyle: {responseTime: "deliberate", persuasionStyle: "logical"}})
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
      }
      
      setOptimization(optimization);
    } catch (error) {
      console.error("Optimization failed:", error);
      alert("Optimization failed. Please try again.");
    } finally {
      setIsOptimizing(false);
    }
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
        <div className="max-w-4xl mx-auto mb-8">
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
                      <span className="label-text font-medium opacity-80">Target Conversation</span>
                    </label>
                    <select
                      value={selectedConversationId}
                      onChange={(e) => setSelectedConversationId(e.target.value)}
                      className="select select-bordered bg-black/20 border-gray-600"
                    >
                      <option value="">Select target conversation...</option>
                      {conversations?.map((conversation) => (
                        <option key={conversation._id} value={conversation._id}>
                          {conversation.title} {conversation.participantName ? `- ${conversation.participantName}` : ""}
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

                {/* LLM Enhancement Toggle */}
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text font-medium opacity-80">🤖 LLM-Powered Enhancement</span>
                    <input
                      type="checkbox"
                      checked={useLLMEnhancement}
                      onChange={(e) => setUseLLMEnhancement(e.target.checked)}
                      className="toggle toggle-primary"
                      disabled={!selectedConversationId}
                    />
                  </label>
                  <div className="label">
                    <span className="label-text-alt opacity-60">
                      {!selectedConversationId 
                        ? "Select a target conversation to enable LLM enhancement" 
                        : useLLMEnhancement 
                          ? "Advanced AI analysis for maximum psychological impact"
                          : "Use traditional pattern-based analysis"
                      }
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 hidden">
                  <div className="form-control hidden">
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
                      {useLLMEnhancement ? "LLM ANALYZING..." : "OPTIMIZING COMMUNICATION..."}
                    </>
                  ) : (
                    <>
                      {useLLMEnhancement ? (
                        <>
                          <Brain className="w-4 h-4 mr-2" />
                          🤖 OPTIMIZE WITH AI ENHANCEMENT
                        </>
                      ) : (
                        <>
                          <Brain className="w-4 h-4 mr-2" />
                          OPTIMIZE FOR MAXIMUM IMPACT
                        </>
                      )}
                    </>
                  )}
                </button>
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