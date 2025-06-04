import { createFileRoute } from "@tanstack/router";
import { useQuery, useMutation } from "convex/react";
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
  Star
} from "lucide-react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

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
    const personalityMatrix = selectedAnalysis.personalityMatrix;

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
      const { response, effectiveness } = await generateInvestorResponse(currentMessage);
      
      const investorMessage: Message = {
        role: 'investor',
        content: response,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, { ...userMessage, effectiveness }, investorMessage]);
      updateSessionScore(effectiveness);
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
          ⚔️ WAR ROOM SIMULATOR
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
                      🎯 ENGAGE TARGET
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
              🎯 SELECT NEW TARGET
            </button>
          </div>
        </div>
      )}
    </div>
  );
}