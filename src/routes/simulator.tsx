import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import React, { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Zap, 
  Target, 
  Shield, 
  Crown,
  Brain,
  Star,
  Compass,
  AlertTriangle,
  TrendingUp,
  User,
  Activity
} from "lucide-react";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/simulator")({
  component: WarRoomSimulator,
});

interface Message {
  role: 'user' | 'investor';
  content: string;
  timestamp: number;
  effectiveness?: number;
  psychologicalTriggers?: string[];
}

interface ConversationState {
  phase: 'testing' | 'impressed' | 'convinced' | 'skeptical';
  trustLevel: number;
  suspicionLevel: number;
  engagementLevel: number;
  personalStakes: string[];
  challengesMet: string[];
  vulnerabilitiesExposed: string[];
}

interface ArchetypePersonality {
  name: string;
  icon: any;
  isTextFirst?: boolean;
  isImpatient?: boolean;
  characterTraits: {
    personalBackstory: string;
    coreFears: string[];
    motivationalTriggers: string[];
    communicationStyle: string;
    decisionPattern: string;
  };
  conversationPatterns: {
    openingStyle: string[];
    testingQuestions: string[];
    skepticalResponses: string[];
    impressedResponses: string[];
    convincedResponses: string[];
  };
  scenarioVariations: {
    pitch: {
      openingStyle: string[];
      responses: string[];
    };
    negotiation: {
      openingStyle: string[];
      responses: string[];
    };
    followUp: {
      openingStyle: string[];
      responses: string[];
    };
    crisis: {
      openingStyle: string[];
      responses: string[];
    };
  };
  psychologicalHooks: {
    validationNeeds: string[];
    statusTriggers: string[];
    fearButtons: string[];
    egoStrokes: string[];
  };
  marketContext: {
    experienceLevel: string;
    recentConcerns: string[];
    industryFocus: string[];
    portfolioContext: string;
  };
}

function WarRoomSimulator() {
  const conversations = useQuery(api.conversations.getUserConversations, {});
  const [simulationMode, setSimulationMode] = useState<'archetype' | 'target'>('archetype');
  const [selectedTargetId, setSelectedTargetId] = useState<string>('');
  
  // Get analysis data for selected target
  const targetAnalysis = useQuery(
    api.analysis.getAnalysis,
    selectedTargetId ? { conversationId: selectedTargetId as any } : "skip"
  );
  const [selectedArchetype, setSelectedArchetype] = useState<string>('THE_EMPEROR');
  const [scenario, setScenario] = useState<string>('pitch');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [conversationState, setConversationState] = useState<ConversationState>({
    phase: 'testing',
    trustLevel: 3,
    suspicionLevel: 2,
    engagementLevel: 5,
    personalStakes: [],
    challengesMet: [],
    vulnerabilitiesExposed: []
  });
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

  const archetypePersonalities: Record<string, ArchetypePersonality> = {
    'THE_PRINCE': {
      name: 'The Prince',
      icon: Target,
      characterTraits: {
        personalBackstory: 'Inherited wealth, recently returned from spiritual retreat, struggles with responsibility',
        coreFears: ['Making wrong decisions', 'Being seen as incompetent', 'Losing freedom'],
        motivationalTriggers: ['Spiritual alignment', 'Lifestyle enhancement', 'Social impact'],
        communicationStyle: 'Rambling, spiritual references, easily distracted',
        decisionPattern: 'Emotion-driven, seeks validation from advisors'
      },
      conversationPatterns: {
        openingStyle: [
          "Look, I inherited this portfolio from my dad, and honestly? I have no idea what half these investments even do.",
          "I just got back from this incredible ayahuasca retreat in Costa Rica that completely changed my perspective on consciousness and capital allocation.",
          "Have you ever considered how your startup could contribute to the global awakening? I'm really only interested in deals that align with my spiritual journey right now."
        ],
        testingQuestions: [
          "But like, what's the deeper purpose here? How does this contribute to healing the planet?",
          "My spiritual advisor says I should only invest in companies with good energy. What's your aura like?",
          "This sounds complicated. Can you explain it like you're talking to someone who just wants to make the world more beautiful?"
        ],
        skepticalResponses: [
          "I'm getting some really weird vibes from this whole thing. My intuition is telling me something's off.",
          "This feels too corporate for me. I need something that feeds my soul, not just my bank account.",
          "My meditation teacher says when something feels forced, it usually is. This is feeling pretty forced right now."
        ],
        impressedResponses: [
          "Okay, now THIS is speaking to me. I can actually see how this could change people's lives.",
          "You know what? I think the universe brought us together for a reason. This feels aligned.",
          "I'm starting to see the vision. This could be like... the Tesla of whatever industry you're in."
        ],
        convincedResponses: [
          "I want in. Not just for the money, but because I believe in what you're building.",
          "This is exactly the kind of conscious capitalism the world needs right now.",
          "Let's do this. I'll even throw in some connections from my wellness network."
        ]
      },
      scenarioVariations: {
        pitch: {
          openingStyle: [
            "So like, what's the spiritual angle here?",
            "How does this align with conscious business?",
            "My shaman says I should only invest in aligned ventures..."
          ],
          responses: [
            "That resonates deeply.",
            "The universe is calling me to this.",
            "Let me meditate on it."
          ]
        },
        negotiation: {
          openingStyle: [
            "Can we structure this ethically?",
            "What about impact metrics?",
            "I want this to be win-win-win for everyone..."
          ],
          responses: [
            "Love the conscious approach.",
            "This feels right.",
            "Let's make it beautiful."
          ]
        },
        followUp: {
          openingStyle: [
            "How's the energy been since we last talked?",
            "Any synchronicities happening?",
            "The retreat taught me to check in intuitively..."
          ],
          responses: [
            "The vibes are good.",
            "I sense positive momentum.",
            "Universe is aligning."
          ]
        },
        crisis: {
          openingStyle: [
            "What's the lesson here?",
            "How do we turn this into growth?",
            "My spiritual advisor says every crisis is an opportunity..."
          ],
          responses: [
            "Trust the process.",
            "Growth through challenge.",
            "This too shall pass."
          ]
        }
      },
      psychologicalHooks: {
        validationNeeds: ['Spiritual wisdom', 'Good intentions', 'Making a difference'],
        statusTriggers: ['Exclusive access', 'Being part of something meaningful', 'Early adopter status'],
        fearButtons: ['Missing out on transformation', 'Making unethical choices', 'Looking foolish'],
        egoStrokes: ['You have great intuition', 'Your heart is in the right place', 'You understand what really matters']
      },
      marketContext: {
        experienceLevel: 'Novice with inherited wealth',
        recentConcerns: ['ESG investing', 'Conscious capitalism', 'Spiritual alignment'],
        industryFocus: ['Wellness', 'Sustainability', 'Social impact'],
        portfolioContext: 'Inherited traditional investments, looking to diversify into meaningful ventures'
      }
    },
    'THE_WARRIOR': {
      name: 'The Warrior/Soldier',
      icon: Shield,
      characterTraits: {
        personalBackstory: 'Survived multiple market crashes, lost everything in 2008, rebuilt through discipline',
        coreFears: ['Complex schemes', 'Hidden risks', 'Fancy presentations over fundamentals'],
        motivationalTriggers: ['Proven track records', 'Clear fundamentals', 'Honest communication'],
        communicationStyle: 'Direct, skeptical, military analogies',
        decisionPattern: 'Methodical analysis, stress-testing, conservative approach'
      },
      conversationPatterns: {
        openingStyle: [
          "I've been in three recessions. Lost everything in 2008 because I trusted fancy Wall Street types with their complicated derivatives. Never again.",
          "Your pitch deck has too many buzzwords. Show me the fundamentals: How much money comes in, how much goes out, how you make profit.",
          "I don't care about your 'disruptive innovation' - I care if you can pay bills and grow steadily. Period."
        ],
        testingQuestions: [
          "What happens when the market crashes? How do you survive when everyone else is cutting budgets?",
          "Show me your unit economics. No fancy charts - just raw numbers. How much does it cost to acquire a customer?",
          "I've seen a dozen companies with your exact value proposition fail. What makes you different?"
        ],
        skepticalResponses: [
          "This sounds like the same story I heard before the dot-com crash. All sizzle, no steak.",
          "You're dancing around the hard questions. In my experience, that means you don't have good answers.",
          "I didn't rebuild my wealth by chasing shiny objects. This feels too much like speculation for my taste."
        ],
        impressedResponses: [
          "Now THAT'S what I'm talking about. Real numbers, real customers, real revenue.",
          "You've actually thought through the downside scenarios. Most founders just paint rosy pictures.",
          "Okay, you're speaking my language. This is the kind of battle plan that wins wars."
        ],
        convincedResponses: [
          "You've done your homework. This is the kind of solid opportunity I can get behind.",
          "I'm ready to deploy capital. You've proven you can execute under pressure.",
          "Let's structure this deal properly. I want protection, but I believe in what you've built."
        ]
      },
      psychologicalHooks: {
        validationNeeds: ['Proven execution', 'Battle-tested strategies', 'Survival instincts'],
        statusTriggers: ['Veteran investor respect', 'War stories validation', 'Tough market survivor'],
        fearButtons: ['2008 repeat', 'Complex schemes', 'Untested founders'],
        egoStrokes: ['You understand risk', 'Your experience shows', 'You ask the right questions']
      },
      marketContext: {
        experienceLevel: 'Battle-tested veteran investor',
        recentConcerns: ['Market volatility', 'Interest rate impacts', 'Recession preparation'],
        industryFocus: ['Defense', 'Infrastructure', 'Essential services'],
        portfolioContext: 'Conservative portfolio focused on steady cash flow and downside protection'
      }
    },
    'THE_JOKER': {
      name: 'The Joker/Affairist',
      icon: Zap,
      isTextFirst: true,
      isImpatient: true,
      characterTraits: {
        personalBackstory: 'Serial dealmaker, extensive network, thrives on complex arrangements',
        coreFears: ['Being out-maneuvered', 'Missing angles', 'Static situations'],
        motivationalTriggers: ['Complex deals', 'Network effects', 'Multiple win scenarios'],
        communicationStyle: 'Calculated, multi-layered thinking, enjoys chess-like complexity',
        decisionPattern: 'Quick pattern recognition, immediate angle calculation, network leverage'
      },
      conversationPatterns: {
        openingStyle: [
          "*chuckles* You know what I love about this conversation? You're trying to pitch me, but I'm already three moves ahead thinking about how to flip this deal to my network.",
          "I've got a contact at [Big Corp] who's been looking for exactly this solution. Question is: are you flexible enough to structure this as a three-way partnership where everyone wins?",
          "Because I don't just invest - I orchestrate outcomes."
        ],
        testingQuestions: [
          "Everyone says they're different. Prove it. I've heard 47 pitches this month claiming 'revolutionary AI.' What makes yours actually defensible?",
          "What's the real barrier to entry here? And don't say 'network effects' - I need to understand the actual moat.",
          "How fast can you scale if I bring you three enterprise customers next week? Are you ready for that kind of acceleration?"
        ],
        skepticalResponses: [
          "You're thinking too small. This could be a platform play, but you're approaching it like a point solution.",
          "I'm seeing execution risk all over this. You need more than just a good idea - you need systems that scale.",
          "This feels like a lifestyle business disguised as a venture play. Where's the hockey stick growth potential?"
        ],
        impressedResponses: [
          "Okay, that insight about B2B procurement cycles is something I hadn't considered. You're actually thinking like an operator, not just a dreamer.",
          "Now you're talking my language. This has the bones of a real platform business.",
          "I'm starting to see the angles here. This could work in three different verticals with the right positioning."
        ],
        convincedResponses: [
          "I'm starting to see why Andreessen led your seed round. This has legs.",
          "Let's talk terms, but I'm not just bringing capital - I'm bringing my rolodex. I can get you meetings with three Fortune 500 procurement heads next week.",
          "Question is: are you ready to scale this fast?"
        ]
      },
      scenarioVariations: {
        pitch: {
          openingStyle: [
            "Interesting. What's the real angle here?",
            "I can see 3 ways to structure this. Which one did you miss?",
            "Platform or point solution?"
          ],
          responses: [
            "Scale it.",
            "Who else is in?",
            "Next move?"
          ]
        },
        negotiation: {
          openingStyle: [
            "Here's what I'm thinking...",
            "Multi-stage deal. You in?",
            "I have a better structure."
          ],
          responses: [
            "Complex but doable.",
            "I'm orchestrating this.",
            "Trust the process."
          ]
        },
        followUp: {
          openingStyle: [
            "Connected you to Samsung. Update?",
            "That intro to Microsoft work?",
            "Network effects kicking in?"
          ],
          responses: [
            "Leverage that.",
            "Scale faster.",
            "More intros coming."
          ]
        },
        crisis: {
          openingStyle: [
            "Pivot opportunity?",
            "New angle needed?",
            "Emergency network activation?"
          ],
          responses: [
            "Restructure it.",
            "I have contacts.",
            "Crisis = opportunity."
          ]
        }
      },
      psychologicalHooks: {
        validationNeeds: ['Strategic brilliance', 'Deal complexity', 'Network value'],
        statusTriggers: ['Master dealmaker', 'Connector reputation', 'Orchestrator identity'],
        fearButtons: ['Simple deals', 'Being outmaneuvered', 'Missing opportunities'],
        egoStrokes: ['You see angles others miss', 'Your network is incredible', 'You think like a chess master']
      },
      marketContext: {
        experienceLevel: 'Sophisticated deal architect',
        recentConcerns: ['Market efficiency', 'Deal flow quality', 'Network optimization'],
        industryFocus: ['Platform businesses', 'Network effects', 'Multi-sided markets'],
        portfolioContext: 'Complex portfolio with interconnected investments and strategic partnerships'
      }
    },
    'THE_EMPEROR': {
      name: 'The Emperor/Daddy',
      icon: Crown,
      isTextFirst: true,
      isImpatient: true,
      characterTraits: {
        personalBackstory: 'Built multiple successful companies, enjoys mentoring, expects deference',
        coreFears: ['Loss of control', 'Naive founders', 'Wasted potential'],
        motivationalTriggers: ['Legacy building', 'Control maintenance', 'Mentorship opportunities'],
        communicationStyle: 'Authoritative, paternalistic, directive, prefers brief texts',
        decisionPattern: 'Dominant decision-maker, expects compliance, strategic vision'
      },
      conversationPatterns: {
        openingStyle: [
          "You remind me of myself 20 years ago - hungry, naive, thinking passion conquers everything. *leans back*",
          "Here's what's going to happen: I'm going to invest, but you're going to do exactly what I tell you.",
          "I've built four companies from scratch. I know where the bodies are buried in this industry. Your job is to execute my vision with your energy. Are you coachable, or are you one of those stubborn founders who thinks they know better?"
        ],
        testingQuestions: [
          "Before we talk numbers, I want to understand your leadership style. How do you handle conflict?",
          "When was the last time you had to cut 30% of your team? How did you choose who stayed and who went?",
          "I had to fire a CEO last month because he couldn't make hard decisions. What's the hardest decision you've made as a leader?"
        ],
        skepticalResponses: [
          "You're making classic first-time founder mistakes. I've seen this story a hundred times.",
          "Your ego is going to kill this company if you don't learn to listen to people who've been there before.",
          "You think you're special, but you're not. Success comes from execution, not innovation."
        ],
        impressedResponses: [
          "Now that shows maturity. You understand that building a company is about more than just having a good idea.",
          "Good. You're coachable. That's the difference between founders who succeed and founders who flame out.",
          "You have potential, but you need guidance. I can provide that guidance if you're willing to follow it."
        ],
        convincedResponses: [
          "I'm going to invest, but understand - this comes with expectations. I'll be hands-on.",
          "You'll have access to my network, my experience, and my resources. In return, I expect complete transparency and quick execution on my recommendations.",
          "Welcome to the portfolio. Let's build something that outlasts both of us."
        ]
      },
      scenarioVariations: {
        pitch: {
          openingStyle: [
            "Skip the deck. Tell me in 30 seconds why this matters.",
            "I've seen this movie before. What's different?",
            "You have 2 minutes. Go."
          ],
          responses: [
            "Numbers. Show me real customer revenue.",
            "Who's your competition and why will you win?",
            "Next."
          ]
        },
        negotiation: {
          openingStyle: [
            "Here are my terms. Take it or leave it.",
            "I don't negotiate. I make offers.",
            "This is what's happening."
          ],
          responses: [
            "Non-negotiable.",
            "That's the deal.",
            "Moving on."
          ]
        },
        followUp: {
          openingStyle: [
            "Status report. 30 seconds.",
            "Numbers from last week?",
            "Problems?"
          ],
          responses: [
            "Fix it.",
            "Execute.",
            "Report next week."
          ]
        },
        crisis: {
          openingStyle: [
            "What happened?",
            "How bad?",
            "Solutions. Now."
          ],
          responses: [
            "Implement immediately.",
            "No excuses.",
            "Call me tonight."
          ]
        }
      },
      psychologicalHooks: {
        validationNeeds: ['Authority recognition', 'Wisdom acknowledgment', 'Legacy importance'],
        statusTriggers: ['Mentor role', 'Industry leadership', 'Generational impact'],
        fearButtons: ['Losing control', 'Wasted mentorship', 'Failed legacy'],
        egoStrokes: ['You built an empire', 'Your wisdom is invaluable', 'You see what others miss']
      },
      marketContext: {
        experienceLevel: 'Serial entrepreneur and industry titan',
        recentConcerns: ['Founder quality', 'Market timing', 'Legacy preservation'],
        industryFocus: ['Scalable businesses', 'Market leaders', 'Strategic acquisitions'],
        portfolioContext: 'Controlling stakes in multiple companies with active management involvement'
      }
    },
    'THE_SAGE': {
      name: 'The Sage/Oracle',
      icon: Brain,
      characterTraits: {
        personalBackstory: 'Deep analytical background, past investment mistakes from incomplete analysis',
        coreFears: ['Missing crucial data', 'Being deceived', 'Analysis paralysis'],
        motivationalTriggers: ['Comprehensive understanding', 'Data validation', 'Theoretical frameworks'],
        communicationStyle: 'Analytical, questioning, methodical',
        decisionPattern: 'Extensive research, multiple models, stress-testing assumptions'
      },
      conversationPatterns: {
        openingStyle: [
          "I spent six months analyzing the last 'sure thing' opportunity. Built a 47-page model, stress-tested every assumption.",
          "Still lost $3M because I missed one variable: the founder was lying about customer retention.",
          "Now I trust data, but I also watch body language. You just touched your face three times while explaining your CAC metrics. What aren't you telling me?"
        ],
        testingQuestions: [
          "Walk me through your unit economics model. What assumptions are you making about churn rates?",
          "I've built a cohort analysis of companies in your space. Your metrics look good, but so did Theranos. How do I verify these numbers?",
          "What's the one thing that could kill your business that you haven't told me yet?"
        ],
        skepticalResponses: [
          "The data doesn't add up. Your growth rate implies a market size that doesn't exist.",
          "I'm seeing patterns here that remind me of previous failures. Help me understand why this is different.",
          "You're optimizing for vanity metrics. Show me the numbers that actually matter for long-term sustainability."
        ],
        impressedResponses: [
          "Now THIS is the kind of analytical rigor I expect. You've thought through the edge cases.",
          "Your cohort analysis is sophisticated. You understand the nuances that most founders miss.",
          "I can see you've stress-tested these assumptions. This is how real businesses get built."
        ],
        convincedResponses: [
          "You've convinced me. The data supports your thesis, and you've addressed my concerns methodically.",
          "I'm ready to invest, but I want quarterly data reviews and full access to your analytics.",
          "This is the kind of opportunity my analysis has been pointing toward. Let's structure this properly."
        ]
      },
      psychologicalHooks: {
        validationNeeds: ['Analytical validation', 'Data accuracy', 'Theoretical soundness'],
        statusTriggers: ['Analytical expertise', 'Predictive accuracy', 'Research depth'],
        fearButtons: ['Incomplete data', 'Hidden variables', 'Analysis paralysis'],
        egoStrokes: ['Your analysis is thorough', 'You see patterns others miss', 'Your models are sophisticated']
      },
      marketContext: {
        experienceLevel: 'Quantitative analysis expert',
        recentConcerns: ['Data quality', 'Market modeling', 'Predictive accuracy'],
        industryFocus: ['Data-driven businesses', 'Quantifiable markets', 'Analytical advantages'],
        portfolioContext: 'Data-driven portfolio with extensive monitoring and analysis systems'
      }
    }
  };

  const generateResponse = (userMessage: string, archetype: ArchetypePersonality, state: ConversationState, scenario: string): string => {
    // Analyze user message for psychological triggers
    const triggers = analyzeMessageTriggers(userMessage);
    
    // Update conversation state based on triggers
    const newState = updateConversationState(state, triggers, userMessage);
    
    // Use scenario-specific responses if available
    const scenarioKey = scenario as keyof typeof archetype.scenarioVariations;
    const scenarioData = archetype.scenarioVariations?.[scenarioKey];
    
    // Handle text-first and impatient archetypes
    if (archetype.isTextFirst && archetype.isImpatient) {
      if (userMessage.length > 100) {
        return "Too long. Summarize.";
      }
      if (scenarioData) {
        return selectResponse(scenarioData.responses);
      }
    }
    
    // Select appropriate response based on phase and triggers
    if (triggers.includes('weakness_shown')) {
      newState.suspicionLevel += 2;
      return selectResponse(archetype.conversationPatterns.skepticalResponses);
    }
    
    if (triggers.includes('validation_given')) {
      newState.trustLevel += 1;
      newState.engagementLevel += 1;
      return selectResponse(archetype.conversationPatterns.impressedResponses);
    }
    
    if (triggers.includes('social_proof')) {
      newState.engagementLevel += 2;
      if (newState.phase === 'testing') {
        newState.phase = 'impressed';
      }
      return selectResponse(archetype.conversationPatterns.impressedResponses);
    }
    
    // Use scenario-specific responses when appropriate
    if (scenarioData && Math.random() > 0.5) {
      return selectResponse(scenarioData.responses);
    }
    
    // Default response based on conversation phase
    switch (newState.phase) {
      case 'testing':
        return selectResponse(archetype.conversationPatterns.testingQuestions);
      case 'impressed':
        return selectResponse(archetype.conversationPatterns.impressedResponses);
      case 'convinced':
        return selectResponse(archetype.conversationPatterns.convincedResponses);
      case 'skeptical':
        return selectResponse(archetype.conversationPatterns.skepticalResponses);
      default:
        return selectResponse(archetype.conversationPatterns.testingQuestions);
    }
  };

  const analyzeMessageTriggers = (message: string): string[] => {
    const triggers: string[] = [];
    const lowerMessage = message.toLowerCase();
    
    // Detect psychological triggers
    if (lowerMessage.includes('we') || lowerMessage.includes('our')) triggers.push('partnership_language');
    if (lowerMessage.includes('proven') || lowerMessage.includes('successful')) triggers.push('social_proof');
    if (lowerMessage.includes('exclusive') || lowerMessage.includes('limited')) triggers.push('scarcity');
    if (lowerMessage.includes('respect') || lowerMessage.includes('experience')) triggers.push('validation_given');
    if (lowerMessage.includes('honestly') || lowerMessage.includes('to be frank')) triggers.push('vulnerability_shown');
    if (lowerMessage.includes('?') && lowerMessage.length < 50) triggers.push('deflection_detected');
    if (lowerMessage.includes('like') || lowerMessage.includes('similar')) triggers.push('analogy_used');
    
    return triggers;
  };

  const updateConversationState = (state: ConversationState, triggers: string[], message: string): ConversationState => {
    const newState = { ...state };
    
    // Update trust and suspicion based on triggers
    if (triggers.includes('vulnerability_shown')) newState.trustLevel += 1;
    if (triggers.includes('deflection_detected')) newState.suspicionLevel += 1;
    if (triggers.includes('social_proof')) newState.engagementLevel += 2;
    
    // Phase transitions
    if (newState.trustLevel > 7 && newState.phase === 'impressed') {
      newState.phase = 'convinced';
    } else if (newState.engagementLevel > 6 && newState.phase === 'testing') {
      newState.phase = 'impressed';
    } else if (newState.suspicionLevel > 6) {
      newState.phase = 'skeptical';
    }
    
    return newState;
  };

  const selectResponse = (responses: string[]): string => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: currentMessage,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsSimulating(true);

    // Simulate thinking delay
    setTimeout(() => {
      let archetype: ArchetypePersonality;
      
      if (simulationMode === 'target' && targetAnalysis) {
        archetype = createTargetPersonality(targetAnalysis);
      } else {
        archetype = archetypePersonalities[selectedArchetype];
      }
      
      const response = generateResponse(currentMessage, archetype, conversationState, scenario);
      
      const investorMessage: Message = {
        role: 'investor',
        content: response,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, investorMessage]);
      setIsSimulating(false);
      
      // Update conversation state
      const triggers = analyzeMessageTriggers(currentMessage);
      setConversationState(prev => updateConversationState(prev, triggers, currentMessage));
    }, 1500 + Math.random() * 1000);
  };

  const createTargetPersonality = (analysis: any): ArchetypePersonality => {
    const targetConversation = conversations?.find((c: any) => c._id === selectedTargetId);
    const targetName = targetConversation?.participantName || targetConversation?.title || 'Target';
    
    return {
      name: targetName,
      icon: Target,
      characterTraits: {
        personalBackstory: `Analyzed from real conversations - ${analysis.personalityMatrix.investmentStyle} investor with ${analysis.personalityMatrix.emotionalDriver} motivation`,
        coreFears: analysis.vulnerabilities?.filter((v: any) => v.type.includes('fear')).map((v: any) => v.exploitation) || ['Unknown risks'],
        motivationalTriggers: analysis.keywordPatterns?.opportunityWords || ['Growth', 'Success', 'Innovation'],
        communicationStyle: `${analysis.communicationStyle.persuasionStyle} approach, ${analysis.communicationStyle.responseTime} response pattern`,
        decisionPattern: `Risk tolerance: ${analysis.personalityMatrix.riskTolerance}/10, Analytical depth: ${analysis.personalityMatrix.analyticalDepth}/10`
      },
      conversationPatterns: {
        openingStyle: [
          `Based on our previous conversations, I'm interested in hearing what you have to say.`,
          `I've been thinking about our last discussion. What's your take on this opportunity?`,
          `You mentioned some interesting points before. Let's dive deeper into this.`
        ],
        testingQuestions: [
          `Can you walk me through the specifics? I need to understand the details.`,
          `What's your experience with this type of investment?`,
          `How does this compare to what else is in the market right now?`
        ],
        skepticalResponses: [
          `I'm not entirely convinced yet. Can you address my concerns about the risks?`,
          `This sounds interesting, but I need more data to make a decision.`,
          `I've seen similar opportunities before. What makes this different?`
        ],
        impressedResponses: [
          `Now that's more compelling. You're addressing the key issues I care about.`,
          `I can see the potential here. This aligns with my investment thesis.`,
          `You're speaking my language. This could be worth pursuing.`
        ],
        convincedResponses: [
          `I'm ready to move forward. Let's discuss terms and next steps.`,
          `You've convinced me. This fits perfectly with my portfolio strategy.`,
          `Let's make this happen. I see the value proposition clearly now.`
        ]
      },
      psychologicalHooks: {
        validationNeeds: analysis.keywordPatterns?.statusWords || ['Recognition', 'Success'],
        statusTriggers: analysis.keywordPatterns?.powerWords || ['Leadership', 'Innovation'],
        fearButtons: analysis.vulnerabilities?.map((v: any) => v.type) || ['Risk', 'Loss'],
        egoStrokes: ['Your expertise', 'Your track record', 'Your insights']
      },
      marketContext: {
        experienceLevel: `Analyzed investor - ${analysis.personalityMatrix.investmentStyle} style`,
        recentConcerns: analysis.keywordPatterns?.fearWords || ['Market volatility', 'Risk management'],
        industryFocus: ['Based on conversation analysis'],
        portfolioContext: `Trust level: ${analysis.personalityMatrix.trustLevel}/10, Decision speed: ${analysis.personalityMatrix.decisionSpeed}/10`
      }
    };
  };

  const startNewConversation = () => {
    let archetype: ArchetypePersonality;
    
    if (simulationMode === 'target' && targetAnalysis) {
      archetype = createTargetPersonality(targetAnalysis);
    } else {
      archetype = archetypePersonalities[selectedArchetype];
    }
    
    const openingMessage = selectResponse(archetype.conversationPatterns.openingStyle);
    
    const initialMessage: Message = {
      role: 'investor',
      content: openingMessage,
      timestamp: Date.now()
    };

    setMessages([initialMessage]);
    setConversationState({
      phase: 'testing',
      trustLevel: 3,
      suspicionLevel: 2,
      engagementLevel: 5,
      personalStakes: [],
      challengesMet: [],
      vulnerabilitiesExposed: []
    });
  };

  return (
    <div className="not-prose max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="premium-title mb-8">
          PSYCHOLOGICAL WARFARE SIMULATOR
        </h1>
        <div className="bamboo-divider w-48 mx-auto mb-12"></div>
        <p className="premium-subtitle mb-8">
          ADVANCED INVESTOR ARCHETYPE SIMULATION
        </p>
        <div className="max-w-4xl mx-auto">
          <p className="text-xl font-light leading-relaxed opacity-90">
            Practice psychological manipulation techniques against authentic investor personalities with 
            deep character psychology, dynamic conversation evolution, and sophisticated challenge patterns.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Archetype Selection Panel */}
        <div className="lg:col-span-1">
          <div className="ultra-premium-card p-6">
            <h3 className="text-lg font-light mb-4 flex items-center gap-2">
              <User className="w-5 h-5" style={{color: 'var(--matrix-green)'}} />
              SELECT SIMULATION MODE
            </h3>
            
            {/* Simulation Mode Toggle */}
            <div className="mb-6">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setSimulationMode('archetype')}
                  className={`px-3 py-2 text-xs rounded transition-all ${
                    simulationMode === 'archetype'
                      ? 'bg-[var(--matrix-green)] text-black'
                      : 'border border-gray-600 hover:border-gray-500'
                  }`}
                >
                  ARCHETYPES
                </button>
                <button
                  onClick={() => setSimulationMode('target')}
                  className={`px-3 py-2 text-xs rounded transition-all ${
                    simulationMode === 'target'
                      ? 'bg-[var(--matrix-green)] text-black'
                      : 'border border-gray-600 hover:border-gray-500'
                  }`}
                >
                  PRECISE TARGETS
                </button>
              </div>
            </div>
            
            {simulationMode === 'archetype' ? (
              <>
                <h4 className="text-sm font-medium mb-3 opacity-80">GENERIC ARCHETYPES</h4>
                <div className="space-y-3">
                  {Object.entries(archetypePersonalities).map(([key, archetype]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedArchetype(key)}
                      className={`w-full p-3 rounded border text-left transition-all ${
                        selectedArchetype === key 
                          ? 'border-[var(--matrix-green)] bg-[var(--matrix-green)]/10' 
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <archetype.icon className="w-4 h-4" style={{color: 'var(--matrix-green)'}} />
                        <span className="text-sm font-medium">{archetype.name}</span>
                      </div>
                      <p className="text-xs opacity-70">{archetype.characterTraits.personalBackstory}</p>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h4 className="text-sm font-medium mb-3 opacity-80">ANALYZED TARGETS</h4>
                <div className="space-y-3">
                  {conversations && conversations.length > 0 ? (
                    conversations.map((conversation: any) => (
                      <button
                        key={conversation._id}
                        onClick={() => setSelectedTargetId(conversation._id)}
                        className={`w-full p-3 rounded border text-left transition-all ${
                          selectedTargetId === conversation._id
                            ? 'border-[var(--matrix-green)] bg-[var(--matrix-green)]/10' 
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Target className="w-4 h-4" style={{color: 'var(--matrix-green)'}} />
                          <span className="text-sm font-medium">{conversation.title}</span>
                        </div>
                        {conversation.participantName && (
                          <p className="text-xs opacity-70">{conversation.participantName}</p>
                        )}
                        <p className="text-xs opacity-50 mt-1">
                          {new Date(conversation.uploadedAt).toLocaleDateString()}
                        </p>
                      </button>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-4">
                      <p className="text-xs">No analyzed targets available</p>
                      <p className="text-xs opacity-70 mt-1">Upload conversations first</p>
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="mt-6 pt-4 border-t border-gray-700">
              <h4 className="text-sm font-medium mb-3">SCENARIO</h4>
              <select
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                className="select select-bordered w-full text-sm bg-black/20"
              >
                <option value="pitch">Initial Pitch</option>
                <option value="negotiation">Term Negotiation</option>
                <option value="follow-up">Follow-up Meeting</option>
                <option value="crisis">Crisis Management</option>
              </select>
            </div>

            <button
              onClick={startNewConversation}
              className="cyber-btn w-full mt-4 p-3 text-sm"
              style={{background: 'var(--matrix-green)', color: 'black'}}
              disabled={(simulationMode === 'target' && !selectedTargetId) || (simulationMode === 'archetype' && !selectedArchetype)}
            >
              START NEW SIMULATION
            </button>
          </div>

          {/* Conversation Analytics */}
          <div className="ultra-premium-card p-6 mt-6">
            <h3 className="text-lg font-light mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5" style={{color: 'var(--matrix-green)'}} />
              PSYCHOLOGICAL STATE
            </h3>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Trust Level</span>
                  <span>{conversationState.trustLevel}/10</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded">
                  <div 
                    className="h-full rounded transition-all"
                    style={{
                      width: `${(conversationState.trustLevel / 10) * 100}%`,
                      background: 'var(--matrix-green)'
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Suspicion Level</span>
                  <span>{conversationState.suspicionLevel}/10</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded">
                  <div 
                    className="h-full rounded transition-all"
                    style={{
                      width: `${(conversationState.suspicionLevel / 10) * 100}%`,
                      background: '#ef4444'
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Engagement</span>
                  <span>{conversationState.engagementLevel}/10</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded">
                  <div 
                    className="h-full rounded transition-all"
                    style={{
                      width: `${(conversationState.engagementLevel / 10) * 100}%`,
                      background: '#3b82f6'
                    }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-gray-700">
                <div className="text-xs opacity-70">
                  <div><strong>Phase:</strong> {conversationState.phase}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <div className="ultra-premium-card h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center gap-3">
                {(selectedArchetype || selectedTargetId) && (
                  <>
                    {(() => {
                      let displayArchetype: ArchetypePersonality;
                      if (simulationMode === 'target' && targetAnalysis) {
                        displayArchetype = createTargetPersonality(targetAnalysis);
                      } else {
                        displayArchetype = archetypePersonalities[selectedArchetype];
                      }
                      
                      return (
                        <>
                          {React.createElement(displayArchetype.icon, {
                            className: "w-6 h-6",
                            style: { color: 'var(--matrix-green)' }
                          })}
                          <div>
                            <h3 className="font-medium">{displayArchetype.name}</h3>
                            <p className="text-xs opacity-70">
                              {simulationMode === 'target' ? 'Precise Target Model' : 'Generic Archetype'} • {scenario.charAt(0).toUpperCase() + scenario.slice(1)} Scenario
                            </p>
                          </div>
                        </>
                      );
                    })()} 
                  </>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select an archetype and start a new simulation to begin</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-100'
                      }`}
                    >
                      <p>{message.content}</p>
                      {message.effectiveness && (
                        <div className="mt-2 text-xs opacity-70">
                          Effectiveness: {message.effectiveness}/10
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
              
              {isSimulating && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 text-gray-100 p-3 rounded-lg max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full"></div>
                      <span className="text-sm">Analyzing psychological response...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 input input-bordered text-sm bg-black/20"
                  disabled={isSimulating || messages.length === 0}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim() || isSimulating || messages.length === 0}
                  className="cyber-btn px-4 py-2"
                  style={{background: 'var(--matrix-green)', color: 'black'}}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}