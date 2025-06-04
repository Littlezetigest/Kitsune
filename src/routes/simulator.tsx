import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Zap, 
  Target, 
  Shield, 
  Sword,
  Crown,
  Eye,
  Gem,
  Brain,
  TrendingUp,
  AlertTriangle,
  Star,
  Sparkles,
  Dna,
  FlaskConical,
  Microscope
} from "lucide-react";
import { api } from "../../convex/_generated/api";
// import type { Id } from "../../convex/_generated/dataModel";

export const Route = createFileRoute("/simulator")({
  component: WarRoomSimulator,
});

interface Message {
  role: 'user' | 'investor';
  content: string;
  timestamp: number;
  effectiveness?: number;
}

interface AnalysisData {
  _id: string;
  primaryArchetype: string;
  archetypeConfidence: number;
  personalityMatrix: {
    riskTolerance: number;
    decisionSpeed: number;
    trustLevel: number;
    analyticalDepth: number;
    emotionalDriver: string;
    investmentStyle: string;
  };
  vulnerabilities: Array<{
    type: string;
    severity: number;
    exploitation: string;
    triggerWords: string[];
  }>;
}

function WarRoomSimulator() {
  const conversations = useQuery(api.conversations.getUserConversations, {});
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisData | null>(null);
  const [scenario, setScenario] = useState<string>('pitch');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [sessionScore, setSessionScore] = useState({
    persuasiveness: 0,
    strategicUse: 0,
    rapport: 0,
    overallRating: 0
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

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

  const handleTargetSelect = async (conversationId: string) => {
    setSelectedTarget(conversationId);
    // In a real implementation, we'd fetch the analysis data
    // For now, we'll simulate it
    const mockAnalysis: AnalysisData = {
      _id: "mock_analysis_id",
      primaryArchetype: "EMPEROR",
      archetypeConfidence: 0.85,
      personalityMatrix: {
        riskTolerance: 7,
        decisionSpeed: 8,
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
          triggerWords: ["accomplished", "successful", "recognized"]
        },
        {
          type: "impatience",
          severity: 6,
          exploitation: "Create urgency and limited-time opportunities",
          triggerWords: ["quick", "fast", "urgent"]
        }
      ]
    };
    setSelectedAnalysis(mockAnalysis);
    setMessages([{
      role: 'investor',
      content: getOpeningMessage(mockAnalysis, scenario),
      timestamp: Date.now()
    }]);
  };

  const getOpeningMessage = (analysis: AnalysisData, scenario: string) => {
    const openings = {
      pitch: {
        'EMPEROR': "I have 15 minutes. Show me why this deserves my attention and capital.",
        'PRINCE': "I'm always interested in exclusive opportunities. What makes this special?",
        'WARRIOR': "What's the competitive advantage? How do we crush the competition?",
        'SAGE': "I'd like to understand the fundamentals. Walk me through your analysis."
      },
      negotiation: {
        'EMPEROR': "Let's discuss terms. I expect this to be straightforward and decisive.",
        'PRINCE': "I assume you have something uniquely valuable to offer me.",
        'WARRIOR': "What's your best offer? I don't have time for games.",
        'SAGE': "Let's examine the details carefully. I want to understand all aspects."
      },
      follow_up: {
        'EMPEROR': "You said you'd follow up. I hope you have something concrete to show me.",
        'PRINCE': "I've been considering our previous conversation. Remind me why this matters.",
        'WARRIOR': "Time is money. What's the next move?",
        'SAGE': "I've done some research since we last spoke. I have some questions."
      }
    };

    const archetype = analysis.primaryArchetype;
    const fallback = "I'm interested to hear what you have to say. Please proceed.";
    
    return openings[scenario as keyof typeof openings]?.[archetype as keyof typeof openings.pitch] || fallback;
  };

  const generateInvestorResponse = async (userMessage: string) => {
    if (!selectedAnalysis) return "I need more information.";

    const archetype = selectedAnalysis.primaryArchetype;
    const vulnerabilities = selectedAnalysis.vulnerabilities;
    // const _personalityMatrix = selectedAnalysis.personalityMatrix;

    // Simple response generation based on archetype and message content
    const responses = {
      'EMPEROR': [
        "That's an interesting perspective. How does this strengthen my position?",
        "I need to see concrete numbers and projections.",
        "What's the timeline for implementation?",
        "This needs to align with my strategic vision."
      ],
      'PRINCE': [
        "Is this available to others, or is this an exclusive opportunity?",
        "I appreciate unique propositions. Tell me more about the exclusivity.",
        "How does this enhance my portfolio's prestige?",
        "I'm interested, but I need to see how this sets me apart."
      ],
      'WARRIOR': [
        "How does this help me dominate the market?",
        "What's our competitive edge here?",
        "I like aggressive strategies. Show me the battle plan.",
        "How quickly can we move on this?"
      ]
    };

    // Score the user's message effectiveness
    let effectiveness = 5; // Base score
    
    // Check if they're using vulnerability triggers
    vulnerabilities.forEach(vuln => {
      vuln.triggerWords.forEach(trigger => {
        if (userMessage.toLowerCase().includes(trigger)) {
          effectiveness += 1;
        }
      });
    });

    // Check for archetype-specific language
    if (archetype === 'EMPEROR' && (userMessage.includes('strategic') || userMessage.includes('control'))) {
      effectiveness += 1;
    }
    if (archetype === 'PRINCE' && (userMessage.includes('exclusive') || userMessage.includes('unique'))) {
      effectiveness += 1;
    }

    effectiveness = Math.min(effectiveness, 10);

    const responseOptions = responses[archetype as keyof typeof responses] || responses['EMPEROR'];
    const response = responseOptions[Math.floor(Math.random() * responseOptions.length)];

    return { response, effectiveness };
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || !selectedAnalysis) return;

    const userMessage: Message = {
      role: 'user',
      content: currentMessage,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsSimulating(true);

    // Generate investor response
    setTimeout(async () => {
      const result = await generateInvestorResponse(currentMessage);
      const response = typeof result === 'string' ? result : result.response;
      const effectiveness = typeof result === 'string' ? undefined : result.effectiveness;
      
      const investorMessage: Message = {
        role: 'investor',
        content: response,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, { ...userMessage, effectiveness }, investorMessage]);
      updateSessionScore(effectiveness || 5);
      setIsSimulating(false);
    }, 1000 + Math.random() * 2000); // Simulate thinking time
  };

  const updateSessionScore = (messageEffectiveness: number) => {
    setSessionScore(prev => {
      const messageCount = messages.filter(m => m.role === 'user').length + 1;
      const newPersuasiveness = (prev.persuasiveness * (messageCount - 1) + messageEffectiveness) / messageCount;
      const strategicUse = messageEffectiveness > 7 ? prev.strategicUse + 0.5 : prev.strategicUse;
      const rapport = messageEffectiveness > 6 ? prev.rapport + 0.3 : prev.rapport - 0.1;
      const overallRating = (newPersuasiveness + Math.min(strategicUse, 10) + Math.max(rapport, 0)) / 3;

      return {
        persuasiveness: Math.min(newPersuasiveness, 10),
        strategicUse: Math.min(strategicUse, 10),
        rapport: Math.max(Math.min(rapport, 10), 0),
        overallRating: Math.min(overallRating, 10)
      };
    });
  };

  if (!conversations) {
    return (
      <div className="not-prose flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4">Loading war room...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="not-prose max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="hologram-text text-5xl font-bold mb-4 sakura-glitch">
           WAR ROOM SIMULATOR
        </h1>
        <p className="text-xl" style={{color: 'var(--hot-pink)'}}>
          Practice psychological warfare against AI-powered investor personalities
        </p>
      </div>

      {!selectedTarget ? (
        /* Target Selection */
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center hologram-text mb-8">
            SELECT YOUR TARGET
          </h2>
          
          {conversations.length === 0 ? (
            <div className="text-center py-16">
              <div className="cyber-card p-12 max-w-2xl mx-auto">
                <AlertTriangle className="w-24 h-24 mx-auto mb-6 vulnerability-warning" />
                <h3 className="text-2xl font-bold mb-4 vulnerability-warning">NO TARGETS AVAILABLE</h3>
                <p className="mb-8 text-lg">
                  Upload investor communications first to create simulation targets
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
              {conversations.map((conversation) => (
                <div 
                  key={conversation._id} 
                  className="cyber-card p-6 cursor-pointer hover:border-[var(--golden-circuit)] transition-all"
                  onClick={() => handleTargetSelect(conversation._id)}
                >
                  <div className="flex items-center gap-4">
                    <Target className="w-8 h-8 fox-fire-glow" style={{color: 'var(--hot-pink)'}} />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold" style={{color: 'var(--neon-blue)'}}>
                        {conversation.title}
                      </h3>
                      {conversation.participantName && (
                        <p className="text-lg" style={{color: 'var(--golden-circuit)'}}>
                          TARGET: {conversation.participantName}
                        </p>
                      )}
                    </div>
                    <div className="weapon-button px-6 py-3">
                       ENGAGE TARGET
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Simulation Interface */
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Target Info */}
          <div className="space-y-6">
            {selectedAnalysis && (
              <>
                {/* Target Profile */}
                <div className="cyber-card p-6">
                  <h3 className="text-xl font-bold mb-4 hologram-text">TARGET PROFILE</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      {(() => {
                        const Icon = archetypeIcons[selectedAnalysis.primaryArchetype as keyof typeof archetypeIcons] || Target;
                        return <Icon className="w-6 h-6 fox-fire-glow" style={{color: 'var(--golden-circuit)'}} />;
                      })()}
                      <div>
                        <p className="font-bold" style={{color: 'var(--golden-circuit)'}}>
                          {selectedAnalysis.primaryArchetype}
                        </p>
                        <p className="text-sm opacity-70">
                          {Math.round(selectedAnalysis.archetypeConfidence * 100)}% confidence
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personality Matrix */}
                <div className="cyber-card p-6">
                  <h3 className="text-lg font-bold mb-4" style={{color: 'var(--neon-blue)'}}>
                    PERSONALITY MATRIX
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(selectedAnalysis.personalityMatrix).map(([key, value]) => {
                      if (typeof value === 'number') {
                        return (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-2 bg-gray-700 rounded">
                                <div 
                                  className="kitsune-rating h-full rounded"
                                  style={{width: `${(value / 10) * 100}%`}}
                                />
                              </div>
                              <span className="text-sm w-6">{value}</span>
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="text-sm" style={{color: 'var(--golden-circuit)'}}>{value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Vulnerabilities */}
                <div className="cyber-card p-6">
                  <h3 className="text-lg font-bold mb-4 vulnerability-warning">
                    TACTICAL VULNERABILITIES
                  </h3>
                  <div className="space-y-3">
                    {selectedAnalysis.vulnerabilities.map((vuln, index) => (
                      <div key={index} className="p-3 bg-black/30 rounded border border-red-500/30">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold capitalize vulnerability-warning">
                            {vuln.type}
                          </span>
                          <span className="text-sm">Severity: {vuln.severity}/10</span>
                        </div>
                        <p className="text-xs opacity-80">{vuln.exploitation}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {vuln.triggerWords.map((word, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-red-500/20 rounded">
                              {word}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Center Panel - Chat Interface */}
          <div className="cyber-card p-6 flex flex-col h-[600px]">
            {/* Scenario Selection */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">SCENARIO:</label>
              <select 
                value={scenario} 
                onChange={(e) => setScenario(e.target.value)}
                className="w-full p-2 bg-black/50 border border-[var(--neon-blue)] rounded text-[var(--neon-blue)]"
              >
                <option value="pitch">Initial Pitch</option>
                <option value="negotiation">Negotiation</option>
                <option value="follow_up">Follow-up Meeting</option>
              </select>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-3 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-[var(--neon-blue)]/20 border border-[var(--neon-blue)]' 
                      : 'bg-[var(--hot-pink)]/20 border border-[var(--hot-pink)]'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    {message.effectiveness && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs">Effectiveness:</span>
                        <div className="flex">
                          {Array.from({length: 10}, (_, i) => (
                            <Star 
                              key={i}
                              className={`w-3 h-3 ${i < message.effectiveness! ? 'text-[var(--golden-circuit)]' : 'text-gray-600'}`}
                              fill={i < message.effectiveness! ? 'currentColor' : 'none'}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isSimulating && (
                <div className="flex justify-start">
                  <div className="bg-[var(--hot-pink)]/20 border border-[var(--hot-pink)] p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="loading loading-dots loading-sm"></div>
                      <span className="text-sm">Investor is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 p-3 bg-black/50 border border-[var(--neon-blue)] rounded text-[var(--neon-blue)] placeholder-[var(--neon-blue)]/50"
                disabled={isSimulating}
              />
              <button
                onClick={handleSendMessage}
                disabled={isSimulating || !currentMessage.trim()}
                className="weapon-button px-4 py-3"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Panel - Live Scoring */}
          <div className="space-y-6">
            {/* Session Score */}
            <div className="cyber-card p-6">
              <h3 className="text-xl font-bold mb-4 hologram-text">KITSUNE RATING</h3>
              <div className="space-y-4">
                {Object.entries(sessionScore).map(([metric, score]) => (
                  <div key={metric} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm capitalize">{metric.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-sm font-bold">{score.toFixed(1)}/10</span>
                    </div>
                    <div className="w-full h-3 bg-gray-700 rounded">
                      <div 
                        className="fox-fire-glow h-full rounded transition-all duration-500"
                        style={{
                          width: `${(score / 10) * 100}%`,
                          background: `linear-gradient(90deg, var(--cyber-green), var(--neon-blue), var(--hot-pink))`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="cyber-card p-6">
              <h3 className="text-lg font-bold mb-4" style={{color: 'var(--cyber-green)'}}>
                TACTICAL TIPS
              </h3>
              <div className="space-y-2 text-sm">
                <p>• Use their vulnerability triggers</p>
                <p>• Match their communication style</p>
                <p>• Reference their emotional drivers</p>
                <p>• Build on their investment preferences</p>
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={() => {
                setSelectedTarget(null);
                setSelectedAnalysis(null);
                setMessages([]);
                setSessionScore({ persuasiveness: 0, strategicUse: 0, rapport: 0, overallRating: 0 });
              }}
              className="w-full cyber-btn"
            >
               SELECT NEW TARGET
            </button>
          </div>
        </div>
      )}

      {/* SILICON VALLEY BIOTECH AI QUESTION GENERATOR */}
      <BiotechQuestionGenerator />
    </div>
  );
}

// ===== BIOTECH AI QUESTION GENERATOR SYSTEM =====

interface BiotechQuestion {
  question: string;
  category: string;
  sophisticationLevel: number;
  keyTerms: string[];
}

function BiotechQuestionGenerator() {
  const [generatedQuestion, setGeneratedQuestion] = useState<BiotechQuestion | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // ===== BIOTECH TERMINOLOGY DATABASE =====
  const biotechTerminology = {
    // Core Technologies
    technologies: [
      "AI-driven drug discovery", "CRISPR-Cas9 gene editing", "CAR-T cell therapy", "synthetic biology platforms",
      "precision medicine algorithms", "biomarker-guided therapy", "organoid modeling systems", "protein folding prediction",
      "single-cell RNA sequencing", "liquid biopsy technology", "digital biomarkers", "computational biology pipelines",
      "machine learning phenotyping", "multi-omics integration", "therapeutic antibody engineering", "mRNA therapeutics",
      "gene circuit design", "cellular reprogramming", "biomolecular condensates", "epigenetic editing tools"
    ],

    // Market Strategy Terms
    marketStrategy: [
      "network effects", "platform monopolization", "data moats", "regulatory arbitrage", "first-mover advantage",
      "switching costs", "viral coefficients", "compound learning loops", "ecosystem lock-in", "winner-take-all dynamics",
      "cross-side network effects", "defensible data assets", "proprietary datasets", "therapeutic flywheel",
      "patient journey optimization", "payer value proposition", "health economics modeling", "real-world evidence generation"
    ],

    // Clinical Development
    clinical: [
      "adaptive trial design", "biomarker stratification", "regulatory pathway optimization", "FDA breakthrough designation",
      "accelerated approval strategy", "companion diagnostics", "patient-reported outcomes", "surrogate endpoints",
      "basket trial methodology", "umbrella protocol design", "master protocols", "decentralized clinical trials",
      "digital endpoints", "wearable device integration", "remote patient monitoring", "clinical data lakes"
    ],

    // Business Model Innovation
    businessModel: [
      "value-based pricing", "risk-sharing agreements", "outcome-based contracts", "subscription therapeutics",
      "platform-as-a-service", "licensing revenue streams", "milestone-based partnerships", "royalty stacking",
      "patient access programs", "tiered pricing strategies", "indication expansion rights", "geographic licensing"
    ],

    // Competitive Dynamics
    competitive: [
      "therapeutic differentiation", "competitive moats", "barrier to entry", "switching costs", "network effects",
      "proprietary technology stack", "intellectual property portfolio", "regulatory exclusivity", "manufacturing scale",
      "clinical trial speed", "patient recruitment advantages", "key opinion leader relationships", "payer relationships"
    ],

    // Financial Sophistication
    financial: [
      "risk-adjusted NPV", "probability-weighted returns", "venture debt leverage", "milestone financing",
      "contingent value rights", "liquidation preferences", "anti-dilution provisions", "down-round protection",
      "option pool expansion", "drag-along rights", "tag-along provisions", "preferred stock structuring"
    ]
  };

  // ===== QUESTION CONSTRUCTION PATTERNS =====
  const questionPatterns = {
    // 1. MARKET STRATEGY & POSITIONING
    marketStrategy: [
      "Given the convergence of {technology1} and {technology2}, how are you positioning your {product} to create {marketStrategy1} that compound with each {businessUnit}, and what's your strategy for building {marketStrategy2} that becomes increasingly defensible as you scale through {milestone}?",
      
      "As the biotech industry shifts toward {trend}, how are you leveraging {technology1} to establish {competitive1} that create {marketStrategy1}, and what's your approach to {businessModel1} while maintaining {competitive2} in an increasingly crowded therapeutic landscape?",
      
      "With {technology1} becoming commoditized, how are you differentiate through {technology2} integration, and what's your thesis on building {marketStrategy1} that scale beyond traditional {businessModel1} into platform-level {marketStrategy2}?",
      
      "Given the regulatory shift toward {clinical1}, how are you positioning your {technology1} platform to capture {marketStrategy1} while building {competitive1} that compound through {businessModel1} optimization?"
    ],

    // 2. CLINICAL & TECHNOLOGY INTEGRATION  
    clinicalTech: [
      "How are you integrating {technology1} with {clinical1} to create {competitive1} that traditional pharma can't replicate, and what's your strategy for scaling {technology2} capabilities while maintaining {clinical2} throughout your {businessModel1}?",
      
      "Given the complexity of {technology1} combined with {clinical1}, how are you building {competitive1} into your {technology2} platform, and what's your approach to {clinical2} that creates {marketStrategy1} as you expand beyond your initial indication?",
      
      "With {technology1} generating unprecedented data volumes, how are you architecting your {technology2} infrastructure to enable {clinical1} while building {competitive1} that improve with each {businessUnit}, and what's your path to {businessModel1}?",
      
      "How are you leveraging {technology1} to overcome traditional {clinical1} limitations, and what's your strategy for {technology2} integration that creates {competitive1} while optimizing for {clinical2} across multiple therapeutic areas?"
    ],

    // 3. BUSINESS MODEL & MONETIZATION
    businessModel: [
      "Beyond traditional {businessModel1}, how are you building {marketStrategy1} through {technology1}, and what's your strategy for {businessModel2} that captures value from {competitive1} while scaling {technology2} capabilities?",
      
      "Given the shift toward {businessModel1}, how are you structuring {financial1} to align with {clinical1} outcomes, and what's your approach to {businessModel2} that creates {marketStrategy1} as your platform expands?",
      
      "How are you designing {businessModel1} that capture value from {technology1} improvements over time, and what's your strategy for {financial1} that scales with {competitive1} while maintaining {marketStrategy1}?",
      
      "With payers demanding {businessModel1}, how are you building {technology1} capabilities that enable {businessModel2}, and what's your approach to {financial1} that aligns stakeholder incentives across the {clinical1} journey?"
    ],

    // 4. COMPETITIVE DYNAMICS & DEFENSIBILITY
    competitive: [
      "As competitors develop similar {technology1} approaches, how are you building {competitive1} through {technology2} integration, and what's your strategy for {competitive2} that creates {marketStrategy1} even as the underlying technology becomes commoditized?",
      
      "Given the potential for {technology1} disruption, how are you positioning your {competitive1} to withstand new entrants, and what's your approach to {competitive2} that strengthens with each {businessUnit} interaction?",
      
      "How are you leveraging {technology1} to create {competitive1} that traditional players can't replicate, and what's your strategy for {competitive2} that compound through {marketStrategy1} while maintaining {businessModel1} flexibility?",
      
      "With {technology1} becoming increasingly accessible, how are you building {competitive1} at the {technology2} level, and what's your approach to {competitive2} that creates {marketStrategy1} through superior {clinical1} execution?"
    ],

    // 5. SCALING & PLATFORM DEVELOPMENT
    scaling: [
      "How are you architecting your {technology1} platform to enable {marketStrategy1} across multiple therapeutic areas, and what's your strategy for {competitive1} that strengthen as you scale from {businessUnit} to {businessUnit}?",
      
      "Given the complexity of scaling {technology1}, how are you building {competitive1} into your platform architecture, and what's your approach to {businessModel1} that captures increasing value as your {technology2} capabilities expand?",
      
      "How are you designing {technology1} infrastructure that enables {clinical1} at scale, and what's your strategy for {competitive1} that improve with each additional {businessUnit} while maintaining {marketStrategy1}?",
      
      "As you scale beyond your initial {technology1} application, how are you building {competitive1} that transfer across indications, and what's your approach to {businessModel1} that captures value from cross-platform {marketStrategy1}?"
    ],

    // 6. STRATEGIC PARTNERSHIPS & ECOSYSTEM
    partnerships: [
      "How are you structuring partnerships that enhance your {competitive1} without diluting your {marketStrategy1}, and what's your strategy for {businessModel1} that aligns partner incentives with your long-term {technology1} platform vision?",
      
      "Given the importance of {clinical1} relationships, how are you building {competitive1} through strategic partnerships, and what's your approach to {businessModel1} that creates value for all stakeholders while strengthening your {technology1} moat?",
      
      "How are you leveraging partnerships to accelerate {technology1} development while maintaining {competitive1}, and what's your strategy for {businessModel1} that scales partnership value as your {marketStrategy1} expands?",
      
      "With the shift toward ecosystem-based competition, how are you positioning your {technology1} platform within broader partnerships, and what's your approach to {competitive1} that strengthen through collaborative {businessModel1} while maintaining strategic independence?"
    ]
  };

  // ===== QUESTION GENERATION LOGIC =====
  const generateSophisticatedQuestion = (): BiotechQuestion => {
    const categories = Object.keys(questionPatterns);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const categoryPatterns = questionPatterns[randomCategory as keyof typeof questionPatterns];
    const randomPattern = categoryPatterns[Math.floor(Math.random() * categoryPatterns.length)];

    // Dynamic variable substitution
    let question = randomPattern;
    const usedTerms: string[] = [];

    // Replace technology variables
    question = question.replace(/{technology\d+}/g, () => {
      const tech = biotechTerminology.technologies[Math.floor(Math.random() * biotechTerminology.technologies.length)];
      usedTerms.push(tech);
      return tech;
    });

    // Replace market strategy variables
    question = question.replace(/{marketStrategy\d+}/g, () => {
      const strategy = biotechTerminology.marketStrategy[Math.floor(Math.random() * biotechTerminology.marketStrategy.length)];
      usedTerms.push(strategy);
      return strategy;
    });

    // Replace clinical variables
    question = question.replace(/{clinical\d+}/g, () => {
      const clinical = biotechTerminology.clinical[Math.floor(Math.random() * biotechTerminology.clinical.length)];
      usedTerms.push(clinical);
      return clinical;
    });

    // Replace business model variables
    question = question.replace(/{businessModel\d+}/g, () => {
      const business = biotechTerminology.businessModel[Math.floor(Math.random() * biotechTerminology.businessModel.length)];
      usedTerms.push(business);
      return business;
    });

    // Replace competitive variables
    question = question.replace(/{competitive\d+}/g, () => {
      const competitive = biotechTerminology.competitive[Math.floor(Math.random() * biotechTerminology.competitive.length)];
      usedTerms.push(competitive);
      return competitive;
    });

    // Replace financial variables
    question = question.replace(/{financial\d+}/g, () => {
      const financial = biotechTerminology.financial[Math.floor(Math.random() * biotechTerminology.financial.length)];
      usedTerms.push(financial);
      return financial;
    });

    // Replace generic variables
    question = question.replace(/{product}/g, () => {
      const products = ["therapeutic platform", "diagnostic tool", "drug discovery engine", "biomarker panel"];
      return products[Math.floor(Math.random() * products.length)];
    });

    question = question.replace(/{businessUnit}/g, () => {
      const units = ["patient interaction", "clinical trial", "therapeutic indication", "partnership", "data point"];
      return units[Math.floor(Math.random() * units.length)];
    });

    question = question.replace(/{milestone}/g, () => {
      const milestones = ["clinical validation milestones", "regulatory approvals", "market penetration targets", "partnership agreements"];
      return milestones[Math.floor(Math.random() * milestones.length)];
    });

    question = question.replace(/{trend}/g, () => {
      const trends = ["personalized medicine", "digital health integration", "value-based care", "AI-driven therapeutics"];
      return trends[Math.floor(Math.random() * trends.length)];
    });

    return {
      question,
      category: randomCategory,
      sophisticationLevel: Math.floor(Math.random() * 3) + 8, // 8-10 sophistication level
      keyTerms: usedTerms
    };
  };

  const handleGenerateQuestion = async () => {
    setIsGenerating(true);
    
    // Simulate AI thinking time for dramatic effect
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newQuestion = generateSophisticatedQuestion();
    setGeneratedQuestion(newQuestion);
    setIsGenerating(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-8 hologram-text sakura-glitch">
          🧬 SILICON VALLEY BIOTECH AI QUESTION GENERATOR
        </h2>
        <div className="bamboo-divider w-64 mx-auto mb-12"></div>
        <p className="text-xl font-light leading-relaxed opacity-90 max-w-4xl mx-auto">
          Generate sophisticated biotech questions that demonstrate deep ecosystem knowledge and strategic thinking. 
          Combines Silicon Valley startup culture with cutting-edge biotech domain expertise.
        </p>
      </div>

      {/* Main Generator Interface */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        
        {/* Left Panel - Question Generator */}
        <div className="space-y-8">
          <div className="ultra-premium-card p-8 depth-layer-2">
            <div className="flex items-center gap-4 mb-6">
              <Dna className="w-12 h-12 fox-fire-glow" style={{color: 'var(--fox-fire-cyan)'}} />
              <h3 className="text-3xl font-light spirit-hologram" data-text="AI QUESTION ENGINE">
                AI QUESTION ENGINE
              </h3>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg opacity-80 leading-relaxed">
                The generator creates sophisticated questions by randomly combining templates from 6 key categories:
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Target, label: "Market Strategy", color: "var(--fox-fire-cyan)" },
                  { icon: Microscope, label: "Clinical & Tech", color: "var(--hot-magenta)" },
                  { icon: TrendingUp, label: "Business Model", color: "var(--shrine-gold)" },
                  { icon: Shield, label: "Competitive", color: "var(--neon-green)" },
                  { icon: Zap, label: "Scaling", color: "var(--electric-blue)" },
                  { icon: Brain, label: "Partnerships", color: "var(--electric-arterial)" }
                ].map((category, index) => (
                  <div key={index} className="cyber-shrine-card p-4 text-center">
                    <category.icon className="w-8 h-8 mx-auto mb-2" style={{color: category.color}} />
                    <div className="text-sm font-medium">{category.label}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleGenerateQuestion}
                disabled={isGenerating}
                className="w-full fox-fire-btn text-xl py-6 flex items-center justify-center gap-4"
              >
                {isGenerating ? (
                  <>
                    <FlaskConical className="w-6 h-6 animate-pulse" />
                    GENERATING SOPHISTICATED QUESTION...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    GENERATE SILICON VALLEY BIOTECH QUESTION
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Technical Features */}
          <div className="ultra-premium-card p-6 depth-layer-3">
            <h4 className="text-xl font-light mb-4 spirit-hologram" data-text="TECHNICAL FEATURES">
              TECHNICAL FEATURES
            </h4>
            <div className="space-y-3 text-sm opacity-80">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2" style={{backgroundColor: 'var(--fox-fire-cyan)'}}></div>
                <span>Dynamic variable substitution using 100+ industry-relevant terms</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2" style={{backgroundColor: 'var(--hot-magenta)'}}></div>
                <span>Multi-layered complexity demonstrating deep biotech knowledge</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2" style={{backgroundColor: 'var(--shrine-gold)'}}></div>
                <span>Strategic thinking integration beyond technical knowledge</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2" style={{backgroundColor: 'var(--neon-green)'}}></div>
                <span>Sophisticated sentence construction patterns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Generated Question Display */}
        <div className="space-y-8">
          {generatedQuestion ? (
            <div className="ultra-premium-card p-8 depth-layer-1">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-light spirit-hologram" data-text="GENERATED QUESTION">
                  GENERATED QUESTION
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm opacity-60">Sophistication Level:</span>
                  <div className="flex">
                    {Array.from({length: 10}, (_, i) => (
                      <Star 
                        key={i}
                        className={`w-4 h-4 ${i < generatedQuestion.sophisticationLevel ? 'text-[var(--shrine-gold)]' : 'text-gray-600'}`}
                        fill={i < generatedQuestion.sophisticationLevel ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold" style={{color: 'var(--shrine-gold)'}}>{generatedQuestion.sophisticationLevel}/10</span>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="cyber-shrine-card p-6" style={{borderLeftColor: 'var(--fox-fire-cyan)', borderLeftWidth: '4px'}}>
                  <p className="text-lg leading-relaxed font-medium">
                    "{generatedQuestion.question}"
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium opacity-60 uppercase tracking-wider">Category</h4>
                    <div className="cyber-shrine-card p-3">
                      <span className="text-lg font-medium capitalize" style={{color: 'var(--hot-magenta)'}}>
                        {generatedQuestion.category.replace(/([A-Z])/g, ' $1')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium opacity-60 uppercase tracking-wider">Key Terms Used</h4>
                    <div className="cyber-shrine-card p-3 max-h-32 overflow-y-auto">
                      <div className="flex flex-wrap gap-2">
                        {generatedQuestion.keyTerms.slice(0, 6).map((term, index) => (
                          <span key={index} className="px-2 py-1 text-xs rounded" 
                                style={{backgroundColor: 'var(--neon-green)', color: 'black'}}>
                            {term}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => navigator.clipboard.writeText(generatedQuestion.question)}
                    className="flex-1 cyber-btn bg-[var(--cyber-green)] text-black"
                  >
                    📋 COPY TO CLIPBOARD
                  </button>
                  <button
                    onClick={handleGenerateQuestion}
                    className="flex-1 cyber-btn bg-[var(--hot-magenta)] text-white"
                  >
                    🔄 GENERATE NEW
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="ultra-premium-card p-8 depth-layer-2 text-center">
              <Dna className="w-24 h-24 mx-auto mb-6 opacity-40" />
              <h3 className="text-2xl font-light mb-4 opacity-60">Ready to Generate</h3>
              <p className="opacity-50">Click the generate button to create a sophisticated biotech question that demonstrates deep ecosystem knowledge.</p>
            </div>
          )}

          {/* Usage Instructions */}
          <div className="ultra-premium-card p-6 depth-layer-3">
            <h4 className="text-xl font-light mb-4 spirit-hologram" data-text="HOW TO USE">
              🎯 HOW TO USE
            </h4>
            <div className="space-y-4 text-sm opacity-80">
              <div className="border-l-2 pl-4" style={{borderColor: 'var(--fox-fire-cyan)'}}>
                <strong>For Investor Meetings:</strong> Use these questions to demonstrate sophisticated understanding of biotech ecosystem dynamics
              </div>
              <div className="border-l-2 pl-4" style={{borderColor: 'var(--hot-magenta)'}}>
                <strong>For Due Diligence:</strong> Show that you think strategically about multi-dimensional business challenges
              </div>
              <div className="border-l-2 pl-4" style={{borderColor: 'var(--shrine-gold)'}}>
                <strong>For Credibility:</strong> Questions that make investors think "this person really knows biotech at a deep level"
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="text-center">
        <div className="ultra-premium-card p-12 depth-layer-2">
          <h3 className="text-4xl font-light mb-8 spirit-hologram" data-text="KEY BENEFITS">
            🚀 KEY BENEFITS
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "Instant Sophistication", desc: "Generate questions that make you sound like a seasoned biotech entrepreneur" },
              { icon: Target, title: "Investor Credibility", desc: "Questions that demonstrate deep understanding of VC evaluation criteria" },
              { icon: Brain, title: "Strategic Thinking", desc: "Goes beyond basic business questions to show complex reasoning" },
              { icon: Dna, title: "Industry Specificity", desc: "Combines Silicon Valley culture with biotech domain expertise" }
            ].map((benefit, index) => (
              <div key={index} className="text-center space-y-4">
                <benefit.icon className="w-16 h-16 mx-auto fox-fire-glow" style={{color: 'var(--fox-fire-cyan)'}} />
                <h4 className="text-xl font-medium" style={{color: 'var(--shrine-gold)'}}>{benefit.title}</h4>
                <p className="text-sm opacity-70 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}