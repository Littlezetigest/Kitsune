import { createFileRoute } from "@tanstack/react-router";
import { 
  Clock, 
  TrendingUp, 
  Brain, 
  Target, 
  Zap, 
  Calendar,
  BarChart3,
  GitBranch,
  Eye,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Compass,
  Network,
  Lightbulb,
  Shield,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  User,
  MessageSquare,
  Heart,
  Briefcase
} from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Authenticated } from "convex/react";

export const Route = createFileRoute("/meta-analyzer")(({
  component: MetaAnalyzerPage,
}));

function MetaAnalyzerPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("full_history");
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<string | null>("marcus_chen");
  const [analysisMode, setAnalysisMode] = useState<"temporal" | "predictive" | "strategic">("temporal");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<number | null>(null);
  
  // Convex queries and mutations
  const conversations = useQuery(api.conversations.getUserConversations, {});
  const existingAnalysis = selectedConversationId 
    ? useQuery(api.metaNarrative.getMetaNarrativeAnalysis, { conversationId: selectedConversationId as any })
    : undefined;
  const generateAnalysis = useMutation(api.metaNarrative.generateMetaNarrativeAnalysis);
  const updateAnalysis = useMutation(api.metaNarrative.updateMetaNarrativeWithNewData);

  // Mock relationship data for comprehensive analysis
  const relationshipTargets = [
    {
      id: "marcus_rivera",
      name: "Marcus Rivera",
      title: "Senior Partner, Validator Capital",
      archetype: "VALIDATOR", 
      riskProfile: "Conservative",
      totalInteractions: 47,
      timespan: "8 months",
      currentPhase: "Due Diligence",
      successProbability: 78,
      keyEvents: 12,
      lastContact: "2024-06-03"
    },
    {
      id: "sarah_kim",
      name: "Sarah Kim", 
      title: "Managing Director, Pioneer Ventures",
      archetype: "PIONEER",
      riskProfile: "Aggressive",
      totalInteractions: 23,
      timespan: "4 months", 
      currentPhase: "Term Negotiation",
      successProbability: 85,
      keyEvents: 8,
      lastContact: "2024-06-05"
    },
    {
      id: "jennifer_walsh",
      name: "Jennifer Walsh",
      title: "Investment Committee Chair, Guardian Fund",
      archetype: "GUARDIAN",
      riskProfile: "Ultra-Conservative", 
      totalInteractions: 15,
      timespan: "3 months",
      currentPhase: "Initial Interest",
      successProbability: 42,
      keyEvents: 4,
      lastContact: "2024-05-28"
    }
  ];

  const selectedTargetData = relationshipTargets.find(t => t.id === selectedTarget);

  // Comprehensive temporal analysis data
  const temporalAnalysis = {
    phases: [
      {
        id: 1,
        name: "Initial Contact",
        duration: "2 weeks",
        period: "Jan 2024",
        status: "completed",
        successRate: 92,
        keyMilestones: [
          "Cold outreach via LinkedIn",
          "Warm introduction through mutual connection",
          "Initial interest expression",
          "Calendar booking for exploratory call"
        ],
        psychologicalState: {
          dominantEmotion: "Curiosity",
          trustLevel: 25,
          engagementScore: 68,
          resistanceFactors: ["Time constraints", "Skepticism about market timing"]
        },
        communicationPatterns: {
          responseTime: "4-6 hours",
          messageLength: "Short, professional",
          preferredChannels: ["Email", "LinkedIn"],
          meetingPreference: "Video calls"
        },
        strategicInsights: [
          "Responds well to data-driven approaches",
          "Values peer validation and social proof",
          "Prefers structured, agenda-driven interactions"
        ]
      },
      {
        id: 2,
        name: "Relationship Building",
        duration: "6 weeks", 
        period: "Feb-Mar 2024",
        status: "completed",
        successRate: 85,
        keyMilestones: [
          "Successful initial pitch call",
          "Technical deep-dive session",
          "Introduction to co-founders",
          "Market analysis presentation",
          "Customer reference calls"
        ],
        psychologicalState: {
          dominantEmotion: "Analytical Interest",
          trustLevel: 65,
          engagementScore: 82,
          resistanceFactors: ["Competitive landscape concerns", "Team scalability questions"]
        },
        communicationPatterns: {
          responseTime: "2-4 hours",
          messageLength: "Detailed, technical",
          preferredChannels: ["Email", "Video calls"],
          meetingPreference: "In-person when possible"
        },
        strategicInsights: [
          "Increasing investment in relationship",
          "Technical validation becoming priority",
          "Beginning to involve internal stakeholders"
        ]
      },
      {
        id: 3,
        name: "Due Diligence",
        duration: "8 weeks",
        period: "Apr-May 2024", 
        status: "in_progress",
        successRate: 78,
        keyMilestones: [
          "Formal LOI signing",
          "Data room access granted",
          "Legal and financial review initiation",
          "Customer interview process",
          "Reference check completion"
        ],
        psychologicalState: {
          dominantEmotion: "Cautious Optimism",
          trustLevel: 78,
          engagementScore: 75,
          resistanceFactors: ["Financial metrics scrutiny", "Market size validation"]
        },
        communicationPatterns: {
          responseTime: "1-2 hours",
          messageLength: "Comprehensive, detailed",
          preferredChannels: ["Email", "Secure platforms"],
          meetingPreference: "Structured meetings with agendas"
        },
        strategicInsights: [
          "Moving from interest to serious consideration", 
          "Risk mitigation becoming primary focus",
          "Investment committee alignment in progress"
        ]
      },
      {
        id: 4,
        name: "Decision Phase",
        duration: "3 weeks",
        period: "Jun 2024",
        status: "pending",
        successRate: 72,
        keyMilestones: [
          "Investment committee presentation",
          "Final term sheet negotiations",
          "Legal documentation review",
          "Board approval process"
        ],
        psychologicalState: {
          dominantEmotion: "Decisive Evaluation",
          trustLevel: 85,
          engagementScore: 88,
          resistanceFactors: ["Valuation concerns", "Control provisions"]
        },
        communicationPatterns: {
          responseTime: "30 minutes - 2 hours",
          messageLength: "Concise, decision-focused",
          preferredChannels: ["Phone", "Video calls", "In-person"],
          meetingPreference: "High-touch, personal interactions"
        },
        strategicInsights: [
          "Maximum engagement and investment",
          "Focus on final negotiation points",
          "Relationship quality determines final outcome"
        ]
      }
    ],
    criticalMoments: [
      {
        date: "2024-02-15",
        event: "Technical Deep-Dive Breakthrough",
        impact: "High Positive",
        description: "Target's technical questions were comprehensively addressed, leading to significant trust increase",
        psychologicalShift: "Skepticism → Analytical Interest",
        followUpActions: ["Provide additional technical documentation", "Schedule team introductions"]
      },
      {
        date: "2024-03-22", 
        event: "Competitive Analysis Concern",
        impact: "Medium Negative",
        description: "Target expressed concerns about competitive landscape after competitor funding announcement",
        psychologicalShift: "Interest → Analytical Caution",
        followUpActions: ["Prepare differentiation analysis", "Arrange customer reference calls"]
      },
      {
        date: "2024-04-10",
        event: "Customer Reference Success",
        impact: "High Positive", 
        description: "Customer interviews provided strong validation, addressing key concerns about product-market fit",
        psychologicalShift: "Caution → Cautious Optimism",
        followUpActions: ["Accelerate due diligence process", "Prepare investment committee materials"]
      }
    ],
    relationshipEvolution: {
      trustTrajectory: [
        { period: "Jan", score: 25 },
        { period: "Feb", score: 45 },
        { period: "Mar", score: 65 },
        { period: "Apr", score: 78 },
        { period: "May", score: 82 },
        { period: "Jun", score: 85 }
      ],
      engagementLevels: [
        { period: "Jan", score: 68 },
        { period: "Feb", score: 75 },
        { period: "Mar", score: 82 },
        { period: "Apr", score: 75 },
        { period: "May", score: 80 },
        { period: "Jun", score: 88 }
      ],
      communicationFrequency: [
        { period: "Jan", interactions: 8 },
        { period: "Feb", interactions: 12 },
        { period: "Mar", interactions: 15 },
        { period: "Apr", interactions: 18 },
        { period: "May", interactions: 22 },
        { period: "Jun", interactions: 25 }
      ]
    },
    predictiveModeling: {
      scenarioAnalysis: [
        {
          scenario: "Optimal Path",
          probability: 35,
          timeline: "2-3 weeks",
          outcome: "Term sheet signed with favorable terms",
          keyFactors: ["Strong financial performance", "Competitive differentiation clarity", "Team confidence"]
        },
        {
          scenario: "Standard Path", 
          probability: 45,
          timeline: "4-6 weeks",
          outcome: "Term sheet signed with standard terms",
          keyFactors: ["Satisfactory due diligence", "Market validation", "Reference confirmation"]
        },
        {
          scenario: "Extended Process",
          probability: 15,
          timeline: "8-12 weeks", 
          outcome: "Delayed decision, additional requirements",
          keyFactors: ["Market concerns", "Competitive pressures", "Internal alignment issues"]
        },
        {
          scenario: "No Deal",
          probability: 5,
          timeline: "1-2 weeks",
          outcome: "Investment declined",
          keyFactors: ["Major red flags", "Market shift", "Internal priority changes"]
        }
      ],
      recommendedActions: [
        {
          priority: "Critical",
          action: "Address valuation expectations proactively",
          rationale: "Recent communication patterns suggest pricing sensitivity",
          timeline: "This week",
          expectedImpact: "High"
        },
        {
          priority: "High",
          action: "Facilitate investment committee preview session",
          rationale: "Target's engagement patterns indicate readiness for formal process",
          timeline: "Next 2 weeks", 
          expectedImpact: "High"
        },
        {
          priority: "Medium",
          action: "Provide competitive landscape update",
          rationale: "Ongoing concern area that needs regular reinforcement",
          timeline: "Monthly",
          expectedImpact: "Medium"
        }
      ]
    }
  };

  const runTemporalAnalysis = async () => {
    if (!selectedConversationId) {
      alert("Please select a conversation to analyze");
      return;
    }
    
    setIsAnalyzing(true);
    setCurrentPhase(null);
    
    try {
      // Show analysis phases
      const phases = ["Parsing Communication Patterns", "Analyzing Psychological Trajectories", "Mapping Critical Moments", "Generating Predictive Models", "Synthesizing Strategic Recommendations"];
      
      for (let i = 0; i < phases.length; i++) {
        setCurrentPhase(i);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      // Run actual analysis
      const focusAreas = [];
      if (analysisMode === "temporal") focusAreas.push("psychological_trajectory", "relationship_evolution");
      if (analysisMode === "predictive") focusAreas.push("predictive_modeling", "strategic_positioning");
      if (analysisMode === "strategic") focusAreas.push("strategic_positioning", "critical_moments");
      
      await generateAnalysis({
        conversationId: selectedConversationId as any,
        analysisDepth: "comprehensive",
        timeframeScope: selectedTimeframe as any,
        focusAreas: focusAreas as any
      });
      
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Analysis failed. Please try again.");
    } finally {
      setCurrentPhase(null);
      setIsAnalyzing(false);
    }
  };

  const getPhaseStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-400";
      case "in_progress": return "text-yellow-400"; 
      case "pending": return "text-blue-400";
      default: return "text-gray-400";
    }
  };

  const getPhaseStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "in_progress": return <Play className="w-4 h-4" />;
      case "pending": return <Pause className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  // Display existing analysis if available, otherwise show mock data for demonstration
  const analysisData = existingAnalysis?.analysisData || temporalAnalysis;
  const selectedConversation = conversations?.find(c => c._id === selectedConversationId);

  return (
    <Authenticated>
      <div className="not-prose max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="premium-title mb-8">
          META-NARRATIVE ANALYZER
        </h1>
        <div className="bamboo-divider w-48 mx-auto mb-12"></div>
        <p className="premium-subtitle mb-8">
          TEMPORAL RELATIONSHIP EVOLUTION & STRATEGIC POSITIONING SYSTEM
        </p>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg font-light leading-relaxed opacity-90">
            Comprehensive analysis of investor relationship trajectories, psychological evolution patterns, 
            and predictive modeling for strategic positioning and optimal outcome achievement.
          </p>
        </div>
      </div>

      {/* Control Panel */}
      <div className="ultra-premium-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Conversation Selection */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium opacity-80">Conversation Selection</span>
            </label>
            <select
              value={selectedConversationId || ""}
              onChange={(e) => setSelectedConversationId(e.target.value || null)}
              className="select select-bordered bg-black/20 border-gray-600"
            >
              <option value="">Select conversation to analyze...</option>
              {conversations?.map((conversation) => (
                <option key={conversation._id} value={conversation._id}>
                  {conversation.title} {conversation.participantName ? `- ${conversation.participantName}` : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Timeframe */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium opacity-80">Analysis Timeframe</span>
            </label>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="select select-bordered bg-black/20 border-gray-600"
            >
              <option value="recent_3m">Last 3 Months</option>
              <option value="recent_6m">Last 6 Months</option>
              <option value="full_history">Complete History</option>
            </select>
          </div>

          {/* Analysis Mode */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium opacity-80">Analysis Mode</span>
            </label>
            <select
              value={analysisMode}
              onChange={(e) => setAnalysisMode(e.target.value as "temporal" | "predictive" | "strategic")}
              className="select select-bordered bg-black/20 border-gray-600"
            >
              <option value="temporal">Temporal Analysis</option>
              <option value="predictive">Predictive Modeling</option>
              <option value="strategic">Strategic Positioning</option>
            </select>
          </div>

          {/* Action Button */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium opacity-80">Execute Analysis</span>
            </label>
            <button
              onClick={runTemporalAnalysis}
              disabled={isAnalyzing}
              className="cyber-btn p-3"
              style={{background: 'var(--matrix-green)', color: 'black'}}
            >
              {isAnalyzing ? (
                <>
                  <div className="loading loading-spinner loading-sm mr-2"></div>
                  ANALYZING...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  RUN ANALYSIS
                </>
              )}
            </button>
          </div>
        </div>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <div className="mt-6 p-4 border border-gray-600 rounded">
            <div className="flex items-center gap-3 mb-2">
              <div className="loading loading-spinner loading-sm"></div>
              <span className="font-medium">Running Comprehensive Meta-Analysis</span>
            </div>
            {currentPhase !== null && (
              <div className="text-sm opacity-70">
                Phase {currentPhase + 1}/5: {["Parsing Communication Patterns", "Analyzing Psychological Trajectories", "Mapping Critical Moments", "Generating Predictive Models", "Synthesizing Strategic Recommendations"][currentPhase]}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Conversation Overview */}
      {selectedConversation && (
        <div className="ultra-premium-card p-6">
          <h3 className="text-xl font-light mb-4 flex items-center gap-2">
            <User className="w-6 h-6" style={{color: 'var(--matrix-green)'}} />
            CONVERSATION PROFILE: {selectedConversation.title.toUpperCase()}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-800/50 rounded">
              <div className="text-2xl font-bold" style={{color: 'var(--matrix-green)'}}>
                {selectedConversation.content.split('\n').length}
              </div>
              <div className="text-xs opacity-70">Message Count</div>
            </div>
            <div className="text-center p-3 bg-gray-800/50 rounded">
              <div className="text-2xl font-bold" style={{color: 'var(--matrix-green)'}}>
                {existingAnalysis ? Math.round(existingAnalysis.confidenceScore * 100) : 85}%
              </div>
              <div className="text-xs opacity-70">Analysis Confidence</div>
            </div>
            <div className="text-center p-3 bg-gray-800/50 rounded">
              <div className="text-2xl font-bold" style={{color: 'var(--matrix-green)'}}>
                {selectedConversation.participantName || "Unknown"}
              </div>
              <div className="text-xs opacity-70">Target Name</div>
            </div>
            <div className="text-center p-3 bg-gray-800/50 rounded">
              <div className="text-lg font-bold" style={{color: 'var(--matrix-green)'}}>
                {existingAnalysis ? existingAnalysis.analysisData.executiveSummary.relationshipPhase : "Initial Analysis"}
              </div>
              <div className="text-xs opacity-70">Current Phase</div>
            </div>
          </div>
        </div>
      )}

      {/* Temporal Phase Analysis */}
      <div className="ultra-premium-card p-6">
        <h3 className="text-xl font-light mb-6 flex items-center gap-2">
          <Clock className="w-6 h-6" style={{color: 'var(--matrix-green)'}} />
          RELATIONSHIP EVOLUTION TIMELINE
        </h3>

        <div className="space-y-6">
          {(temporalAnalysis.phases || []).map((phase: any, index: number) => (
            <div key={phase.id} className={`border rounded p-4 ${
              phase.status === 'in_progress' ? 'border-[var(--matrix-green)]' : 'border-gray-600'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`${getPhaseStatusColor(phase.status)}`}>
                    {getPhaseStatusIcon(phase.status)}
                  </div>
                  <div>
                    <h4 className="font-medium">Phase {phase.id}: {phase.name}</h4>
                    <div className="text-sm opacity-70">{phase.duration} • {phase.period}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold" style={{color: 'var(--matrix-green)'}}>
                    {phase.successRate}%
                  </div>
                  <div className="text-xs opacity-70">Success Rate</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Key Milestones
                  </h5>
                  <ul className="text-sm space-y-1">
                    {phase.keyMilestones.map((milestone: any, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ChevronRight className="w-3 h-3 mt-0.5" style={{color: 'var(--matrix-green)'}} />
                        {milestone}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium mb-2 flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    Psychological State
                  </h5>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="opacity-70">Dominant Emotion:</span>
                      <span>{phase.psychologicalState.dominantEmotion}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">Trust Level:</span>
                      <span>{phase.psychologicalState.trustLevel}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">Engagement:</span>
                      <span>{phase.psychologicalState.engagementScore}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h5 className="font-medium mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Strategic Insights
                </h5>
                <div className="flex flex-wrap gap-2">
                  {phase.strategicInsights.map((insight: any, idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-blue-500/20 rounded text-xs">
                      {insight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Moments Analysis */}
      <div className="ultra-premium-card p-6">
        <h3 className="text-xl font-light mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6" style={{color: 'var(--matrix-green)'}} />
          CRITICAL MOMENT ANALYSIS
        </h3>

        <div className="space-y-4">
          {(temporalAnalysis.criticalMoments || []).map((moment: any, index: number) => (
            <div key={index} className="border border-gray-600 rounded p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium">{moment.event}</h4>
                  <div className="text-sm opacity-70">{moment.date}</div>
                </div>
                <div className={`px-3 py-1 rounded text-sm ${
                  moment.impact.includes('Positive') ? 'bg-green-500/20 text-green-400' :
                  moment.impact.includes('Negative') ? 'bg-red-500/20 text-red-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {moment.impact}
                </div>
              </div>
              
              <p className="text-sm mb-3 opacity-90">{moment.description}</p>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" style={{color: 'var(--matrix-green)'}} />
                  <span className="opacity-70">Shift:</span>
                  <span>{moment.psychologicalShift}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Predictive Modeling */}
      <div className="ultra-premium-card p-6">
        <h3 className="text-xl font-light mb-6 flex items-center gap-2">
          <Compass className="w-6 h-6" style={{color: 'var(--matrix-green)'}} />
          PREDICTIVE SCENARIO MODELING
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(temporalAnalysis.predictiveModeling?.scenarioAnalysis || []).map((scenario: any, index: number) => (
            <div key={index} className="border border-gray-600 rounded p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">{scenario.scenario}</h4>
                <div className="text-lg font-bold" style={{color: 'var(--matrix-green)'}}>
                  {scenario.probability}%
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-70">Timeline:</span>
                  <span>{scenario.timeline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Outcome:</span>
                  <span className="text-right flex-1 ml-2">{scenario.outcome}</span>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="text-xs opacity-70 mb-1">Key Factors:</div>
                <div className="flex flex-wrap gap-1">
                  {scenario.keyFactors.map((factor: any, idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-gray-700/50 rounded text-xs">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Recommendations */}
      <div className="ultra-premium-card p-6">
        <h3 className="text-xl font-light mb-6 flex items-center gap-2">
          <Shield className="w-6 h-6" style={{color: 'var(--matrix-green)'}} />
          STRATEGIC RECOMMENDATIONS
        </h3>

        <div className="space-y-4">
          {(temporalAnalysis.predictiveModeling?.recommendedActions || []).map((action: any, index: number) => (
            <div key={index} className="border border-gray-600 rounded p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`px-2 py-1 rounded text-xs ${
                    action.priority === 'Critical' ? 'bg-red-500/20 text-red-400' :
                    action.priority === 'High' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {action.priority}
                  </div>
                  <h4 className="font-medium">{action.action}</h4>
                </div>
                <div className="text-sm opacity-70">{action.timeline}</div>
              </div>
              
              <p className="text-sm opacity-90 mb-2">{action.rationale}</p>
              
              <div className="flex justify-between items-center text-sm">
                <span className="opacity-70">Expected Impact:</span>
                <span className="font-medium" style={{color: 'var(--matrix-green)'}}>
                  {action.expectedImpact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </Authenticated>
  );
}