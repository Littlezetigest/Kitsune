import { createFileRoute } from "@tanstack/react-router";
import { Authenticated } from "convex/react";
import { Brain, Target, Shield, Eye, Crown, Zap, Users, Gem, TrendingUp, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export const Route = createFileRoute("/archetypes")({
  component: ArchetypesPage,
});

function ArchetypesPage() {
  const archetypes = [
    {
      name: "THE VISIONARY",
      icon: Eye,
      color: "var(--fox-fire-cyan)",
      representation: `
    ████████╗██╗  ██╗███████╗
    ╚══██╔══╝██║  ██║██╔════╝
       ██║   ███████║█████╗  
       ██║   ██╔══██║██╔══╝  
       ██║   ██║  ██║███████╗
       ╚═╝   ╚═╝  ╚═╝╚══════╝
      ╔═══════ VISIONARY ═══════╗
      ║   🔮 Future-Focused     ║
      ║   ⚡ Risk Embracer      ║  
      ║   🚀 Paradigm Shifter   ║
      ╚═════════════════════════╝`,
      description: "Seeks cutting-edge opportunities and revolutionary technologies",
      coreMotivations: [
        "Being first to market with breakthrough innovations",
        "Creating transformative impact on society",
        "Building legendary companies that reshape industries"
      ],
      psychologyProfile: {
        decisionSpeed: "Fast - Makes intuitive leaps",
        riskTolerance: "High - Embraces uncertainty for massive returns",
        validationNeeds: "Future vision alignment, not past performance",
        communicationStyle: "Big picture concepts, visionary language"
      },
      strengths: [
        "Quick to recognize disruptive potential",
        "Comfortable with ambiguity and uncertainty", 
        "Willing to bet on unproven technologies",
        "Drives innovation through bold investments"
      ],
      weaknesses: [
        "May overlook fundamental business basics",
        "Susceptible to hype and buzzwords",
        "Can be impatient with execution details",
        "Risk of backing style over substance"
      ],
      vulnerabilities: [
        "FOMO on next big thing",
        "Ego gratification from being 'first'",
        "Fear of missing paradigm shifts",
        "Desire for exclusive access"
      ],
      persuasionStrategy: {
        approach: "Paint the revolutionary future, create scarcity",
        language: "Transformative, revolutionary, paradigm shift, first-mover",
        timing: "Strike while opportunity feels limited",
        validation: "Show other visionaries already engaged"
      },
      nlpTactics: {
        sensoryLanguage: "Visual dominance - use 'envision', 'picture this', 'see the future'",
        presuppositions: "When you become the category leader... (not if)",
        temporalShifts: "Speak from future success position - 'Once this transforms the industry...'",
        authorityAnchors: "Reference thought leaders they respect: 'As Elon mentioned at...'",
        scarcityFrames: "Limited founding member positions", "exclusive preview access",
        metamodel: "Chunk up to bigger vision when they focus on details",
        reframing: "Position risks as 'innovation barriers' that create competitive moats"
      },
      credibilityMarkers: [
        "Discusses emerging technologies naturally",
        "References cutting-edge research and trends",
        "Comfortable with technical uncertainty",
        "Asks about long-term vision and disruption potential"
      ],
      warningSignals: [
        "Chases every new trend indiscriminately",
        "Lacks follow-through on commitments",
        "Overuses buzzwords without depth",
        "Claims unrealistic personal achievements"
      ]
    },
    {
      name: "THE VALIDATOR",
      icon: Shield,
      color: "var(--hot-magenta)",
      representation: `
    ██╗   ██╗ █████╗ ██╗     
    ██║   ██║██╔══██╗██║     
    ██║   ██║███████║██║     
    ╚██╗ ██╔╝██╔══██║██║     
     ╚████╔╝ ██║  ██║███████╗
      ╚═══╝  ╚═╝  ╚═╝╚══════╝
      ╔═══════ VALIDATOR ═══════╗
      ║   🛡️  Risk Minimizer    ║
      ║   📊 Data Dependent     ║  
      ║   👥 Peer Validation    ║
      ╚═════════════════════════╝`,
      description: "Risk-averse investor who follows proven patterns and seeks extensive social proof",
      coreMotivations: [
        "Minimizing downside risk and capital preservation",
        "Following successful investment patterns",
        "Building diversified, stable portfolio"
      ],
      psychologyProfile: {
        decisionSpeed: "Slow - Methodical analysis and validation",
        riskTolerance: "Low to Medium - Needs proven models",
        validationNeeds: "Track records, peer validation, data-driven proof",
        communicationStyle: "Conservative, analytical, comparison-focused"
      },
      strengths: [
        "Thorough due diligence and risk assessment",
        "Excellent at pattern recognition",
        "Protects capital through careful analysis",
        "Reduces portfolio volatility"
      ],
      weaknesses: [
        "May miss early-stage opportunities",
        "Over-reliance on past performance indicators",
        "Slow to adapt to market changes",
        "Can be paralyzed by analysis"
      ],
      vulnerabilities: [
        "Fear of being left behind by peers",
        "Need for social proof and validation",
        "Anxiety about making wrong decisions",
        "Desire for guaranteed outcomes"
      ],
      persuasionStrategy: {
        approach: "Provide extensive proof, emphasize peer participation",
        language: "Proven, validated, established, comparable",
        timing: "Allow extended evaluation period",
        validation: "Reference similar successful investments"
      },
      nlpTactics: {
        sensoryLanguage: "Kinesthetic - 'solid foundation', 'concrete evidence', 'substantial proof'",
        presuppositions: "Assume their need for validation is wisdom: 'Your careful approach...'",
        temporalShifts: "Past tense references - 'Companies that have demonstrated...'",
        authorityAnchors: "Quote respected institutions: 'According to McKinsey research...'",
        evidenceStacking: "Layer multiple proof points in sequence",
        metamodel: "Chunk down to specific details when they generalize",
        pacing: "Match their deliberate communication style - speak slower, pause more"
      },
      credibilityMarkers: [
        "Requests detailed financial projections",
        "Asks for comparable company analysis",
        "Seeks references from other investors",
        "Focuses on risk mitigation strategies"
      ],
      warningSignals: [
        "Endless requests for more data",
        "Inability to make decisions despite adequate information",
        "Excessive focus on worst-case scenarios",
        "Unrealistic expectations for guarantees"
      ]
    },
    {
      name: "THE CONTROLLER", 
      icon: Crown,
      color: "var(--shrine-gold)",
      representation: `
    ██████╗ ██████╗ ███╗   ██╗
    ██╔══██╗██╔══██╗████╗  ██║
    ██║  ██║██████╔╝██╔██╗ ██║
    ██║  ██║██╔══██╗██║╚██╗██║
    ██████╔╝██║  ██║██║ ╚████║
    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝
      ╔══════ CONTROLLER ═══════╗
      ║   👑 Strategic Command  ║
      ║   📋 Detail Oriented    ║  
      ║   🎯 Control Focused    ║
      ╚═════════════════════════╝`,
      description: "Analytical investor who demands detailed information and strategic control",
      coreMotivations: [
        "Maintaining control over investment outcomes",
        "Accessing exclusive information and opportunities",
        "Building strategic portfolio with active involvement"
      ],
      psychologyProfile: {
        decisionSpeed: "Medium - Systematic evaluation process",
        riskTolerance: "Medium - Calculated risks with control measures",
        validationNeeds: "Detailed data, insider access, control mechanisms",
        communicationStyle: "Analytical, strategic, detail-oriented"
      },
      strengths: [
        "Comprehensive analysis and strategic thinking",
        "Adds value through active involvement",
        "Excellent at identifying operational improvements",
        "Strong network and industry connections"
      ],
      weaknesses: [
        "Can be overly controlling and micromanaging",
        "May slow down agile decision-making",
        "Risk of analysis paralysis",
        "Potential conflicts with management teams"
      ],
      vulnerabilities: [
        "Need to feel important and influential",
        "Fear of losing control over outcomes",
        "Desire for exclusive insider information",
        "Ego gratification from being consulted"
      ],
      persuasionStrategy: {
        approach: "Provide exclusive access, emphasize partnership role",
        language: "Strategic, insider, exclusive, partnership",
        timing: "Allow for detailed evaluation and negotiation",
        validation: "Offer board seats or advisory roles"
      },
      nlpTactics: {
        sensoryLanguage: "Auditory - 'sounds strategic', 'hear your expertise', 'resonates with'",
        presuppositions: "Assume their expertise: 'With your strategic background...'",
        temporalShifts: "Future perfect - 'When we've successfully implemented your guidance...'",
        authorityAnchors: "Position them as the authority: 'As someone with your experience...'",
        controlFrames: "Offer illusion of control: 'How would you structure this?'",
        metamodel: "Use their precision against overanalysis - provide exhaustive detail",
        mirroring: "Adopt their formal communication style and technical language"
      },
      credibilityMarkers: [
        "Asks detailed operational questions",
        "Discusses governance and control structures",
        "References portfolio company experiences",
        "Focuses on value-add opportunities"
      ],
      warningSignals: [
        "Unrealistic control demands",
        "Inflexibility on terms and structure",
        "Overly critical of management decisions",
        "Excessive interference in operations"
      ]
    },
    {
      name: "THE STATUS SEEKER",
      icon: Crown,
      color: "var(--neon-green)",
      representation: `
    ███████╗████████╗ █████╗ 
    ██╔════╝╚══██╔══╝██╔══██╗
    ███████╗   ██║   ███████║
    ╚════██║   ██║   ██╔══██║
    ███████║   ██║   ██║  ██║
    ╚══════╝   ╚═╝   ╚═╝  ╚═╝
      ╔═══ STATUS SEEKER ════╗
      ║   🏆 Prestige Hunter  ║
      ║   🌟 Recognition Seeker║  
      ║   💎 Elite Networker  ║
      ╚═════════════════════╝`,
      description: "Prestige-driven investor motivated by recognition and association with winners",
      coreMotivations: [
        "Building prestigious investment portfolio",
        "Gaining recognition in investment community",
        "Associating with successful entrepreneurs and deals"
      ],
      psychologyProfile: {
        decisionSpeed: "Fast - Driven by opportunity to join elite deals",
        riskTolerance: "Medium to High - For prestigious opportunities",
        validationNeeds: "Peer recognition, media attention, exclusivity",
        communicationStyle: "Status-conscious, network-focused, image-aware"
      },
      strengths: [
        "Strong motivation to back winners",
        "Excellent network for deal flow and support",
        "Brings credibility and social proof",
        "Willing to pay premium for quality"
      ],
      weaknesses: [
        "May prioritize prestige over fundamentals",
        "Susceptible to hype and buzz",
        "Can be fickle if status diminishes",
        "Risk of overpaying for perceived prestige"
      ],
      vulnerabilities: [
        "Fear of missing high-profile opportunities",
        "Need for recognition and status validation",
        "Desire for exclusive access to elite deals",
        "Anxiety about reputation and image"
      ],
      persuasionStrategy: {
        approach: "Emphasize exclusivity and prestige factor",
        language: "Elite, exclusive, prestigious, high-profile",
        timing: "Create sense of exclusive opportunity",
        validation: "Reference other high-profile investors"
      },
      credibilityMarkers: [
        "Name-drops prominent connections",
        "Asks about other investors in the round",
        "Focuses on company publicity and recognition",
        "Discusses reputation and brand value"
      ],
      warningSignals: [
        "All talk about prestige, no substance",
        "Unrealistic claims about network influence",
        "Demands unreasonable recognition or credit",
        "Inconsistent commitment levels"
      ]
    },
    {
      name: "THE PROTECTOR",
      icon: Shield,
      color: "var(--electric-blue)",
      description: "Conservative wealth preservation focused on stability and hedge strategies",
      coreMotivations: [
        "Preserving and protecting existing wealth",
        "Generating steady, predictable returns",
        "Hedging against market volatility and risks"
      ],
      psychologyProfile: {
        decisionSpeed: "Very Slow - Extensive risk analysis required",
        riskTolerance: "Low - Capital preservation priority",
        validationNeeds: "Downside protection, exit strategies, guarantees",
        communicationStyle: "Conservative, cautious, protection-focused"
      },
      strengths: [
        "Excellent risk assessment and management",
        "Focuses on sustainable business models",
        "Provides stability during market downturns",
        "Strong emphasis on governance and compliance"
      ],
      weaknesses: [
        "May miss high-growth opportunities",
        "Overly conservative approach limits returns",
        "Slow decision-making in fast markets",
        "Risk aversion can stifle innovation"
      ],
      vulnerabilities: [
        "Fear of significant capital loss",
        "Anxiety about market volatility",
        "Need for certainty and predictability",
        "Desire for guaranteed downside protection"
      ],
      persuasionStrategy: {
        approach: "Emphasize stability, downside protection, proven models",
        language: "Stable, protected, guaranteed, conservative",
        timing: "Allow extensive due diligence period",
        validation: "Show defensive characteristics and exit options"
      },
      credibilityMarkers: [
        "Extensive questions about downside scenarios",
        "Focus on exit strategies and liquidity",
        "Requests for financial guarantees or protection",
        "Emphasis on regulatory compliance and governance"
      ],
      warningSignals: [
        "Unrealistic expectations for guaranteed returns",
        "Inability to accept any level of risk",
        "Excessive demands for protection mechanisms",
        "Analysis paralysis from over-caution"
      ]
    },
    {
      name: "THE RELATIONSHIP BUILDER",
      icon: Users,
      color: "var(--hot-magenta)",
      description: "Trust-based investor who values personal connections and long-term partnerships",
      coreMotivations: [
        "Building meaningful business relationships",
        "Supporting entrepreneurs they believe in personally",
        "Creating long-term value through partnership"
      ],
      psychologyProfile: {
        decisionSpeed: "Medium - Depends on relationship development",
        riskTolerance: "Medium - Higher for trusted partners",
        validationNeeds: "Personal connection, shared values, trust building",
        communicationStyle: "Personal, relationship-focused, value-driven"
      },
      strengths: [
        "Strong loyalty and long-term commitment",
        "Provides valuable mentorship and support",
        "Excellent at building trusted networks",
        "Focuses on mutual success and partnership"
      ],
      weaknesses: [
        "May overlook red flags due to personal loyalty",
        "Can be slow to build necessary relationships",
        "Risk of emotional rather than rational decisions",
        "May limit deal flow to existing network"
      ],
      vulnerabilities: [
        "Need for personal validation and appreciation",
        "Fear of betrayal or being taken advantage of",
        "Desire for authentic, meaningful connections",
        "Anxiety about making impersonal business decisions"
      ],
      persuasionStrategy: {
        approach: "Build authentic personal connection, show shared values",
        language: "Partnership, trust, relationship, shared vision",
        timing: "Invest time in relationship building",
        validation: "Demonstrate personal integrity and alignment"
      },
      credibilityMarkers: [
        "Asks about personal background and motivations",
        "Focuses on company culture and values",
        "References long-term portfolio relationships",
        "Emphasizes partnership over pure financial returns"
      ],
      warningSignals: [
        "Overly personal or inappropriate relationship boundaries",
        "Inability to separate personal and business decisions",
        "Unrealistic expectations for friendship vs business",
        "Excessive emotional investment in outcomes"
      ]
    },
    {
      name: "THE COLLECTOR",
      icon: Gem,
      color: "var(--shrine-gold)",
      description: "Opportunity-driven investor building diverse portfolio across multiple sectors",
      coreMotivations: [
        "Building comprehensive investment portfolio",
        "Diversifying across sectors and stages",
        "Capturing multiple market opportunities"
      ],
      psychologyProfile: {
        decisionSpeed: "Fast - Opportunistic and decisive",
        riskTolerance: "High - Portfolio approach to risk management",
        validationNeeds: "Portfolio fit, diversification value, opportunity cost",
        communicationStyle: "Opportunistic, portfolio-focused, efficiency-driven"
      },
      strengths: [
        "Excellent diversification and risk spreading",
        "Quick decision-making and execution",
        "Strong pattern recognition across sectors",
        "Efficient capital allocation"
      ],
      weaknesses: [
        "May lack deep sector expertise",
        "Risk of spreading attention too thin",
        "Potential for superficial due diligence",
        "Limited value-add due to broad focus"
      ],
      vulnerabilities: [
        "FOMO on market opportunities",
        "Need to be active and engaged in markets",
        "Fear of missing optimal portfolio balance",
        "Desire for comprehensive market exposure"
      ],
      persuasionStrategy: {
        approach: "Show portfolio fit and opportunity cost of missing out",
        language: "Opportunity, portfolio, diversification, exposure",
        timing: "Act quickly on limited opportunities",
        validation: "Demonstrate unique positioning in portfolio context"
      },
      credibilityMarkers: [
        "Discusses portfolio construction and allocation",
        "Asks about market timing and opportunity cost",
        "References investments across multiple sectors",
        "Focuses on diversification and correlation benefits"
      ],
      warningSignals: [
        "Lack of investment thesis or strategy",
        "Inconsistent criteria across opportunities",
        "Inability to provide meaningful value-add",
        "Over-diversification leading to poor returns"
      ]
    },
    {
      name: "THE WARRIOR",
      icon: Zap,
      color: "var(--electric-arterial)",
      description: "Aggressive, competitive investor focused on market dominance and high-growth opportunities",
      coreMotivations: [
        "Backing market leaders and category creators",
        "Achieving outsized returns through aggressive growth",
        "Building competitive advantage and market dominance"
      ],
      psychologyProfile: {
        decisionSpeed: "Very Fast - Strike while opportunity is hot",
        riskTolerance: "Very High - Go big or go home mentality",
        validationNeeds: "Competitive advantage, growth metrics, market opportunity",
        communicationStyle: "Aggressive, competitive, results-oriented"
      },
      strengths: [
        "Willing to make bold bets on market leaders",
        "Strong focus on competitive positioning",
        "Excellent at identifying scalable opportunities",
        "Provides aggressive growth capital and support"
      ],
      weaknesses: [
        "May overlook sustainable business fundamentals",
        "Risk of boom-bust investment cycles",
        "Can be impatient with steady growth",
        "Potential for excessive leverage and risk"
      ],
      vulnerabilities: [
        "Fear of being outcompeted or missing big wins",
        "Need for aggressive growth and market validation",
        "Desire to back dominant market leaders",
        "Anxiety about competitive threats and disruption"
      ],
      persuasionStrategy: {
        approach: "Emphasize competitive advantage and market domination potential",
        language: "Dominate, aggressive, competitive, market leader",
        timing: "Create urgency around competitive positioning",
        validation: "Show growth metrics and market capture strategy"
      },
      credibilityMarkers: [
        "Focuses intensely on competitive landscape",
        "Asks about growth rates and scalability",
        "Discusses market share and dominance strategies",
        "References aggressive growth investments"
      ],
      warningSignals: [
        "Unrealistic growth expectations",
        "Ignores fundamental business risks",
        "Overly aggressive or hostile behavior",
        "Inability to assess sustainable competitive advantage"
      ]
    }
  ];

  const evaluationCriteria = [
    {
      category: "Communication Patterns",
      metrics: [
        "Dominant sensory language (Visual/Auditory/Kinesthetic)",
        "Decision-making speed indicators",
        "Risk tolerance language patterns",
        "Authority and validation seeking behaviors",
        "Technical terminology vs layperson language usage"
      ]
    },
    {
      category: "Credibility Assessment",
      metrics: [
        "Industry jargon and process familiarity",
        "Due diligence depth and sophistication",
        "Network quality and reference patterns",
        "Financial literacy and valuation understanding",
        "Consistency vs contradiction detection"
      ]
    },
    {
      category: "Question Analysis",
      metrics: [
        "Market-focused questions (competitive landscape)",
        "Team evaluation queries (execution capability)",
        "Financial analysis depth (unit economics, burn rate)",
        "Technology assessment (IP, scalability, moats)",
        "Strategic vision exploration (roadmap, pivot capability)"
      ]
    },
    {
      category: "Psychological Profiling",
      metrics: [
        "Core motivation identification (security, status, legacy)",
        "Fear pattern analysis (FOMO, loss aversion, reputation)",
        "Ego driver assessment (recognition, exclusivity)",
        "Social proof dependency evaluation",
        "Logical vs emotional decision-making bias"
      ]
    }
  ];

  return (
    <div className="not-prose relative min-h-screen">
      {/* Matrix Background Effects */}
      <div className="matrix-rain opacity-30">
        <div className="matrix-column" style={{left: '10%', animationDelay: '0s', animationDuration: '15s'}}>
          投資家分析心理戦略評価システム認知バイアス感情的脆弱性
        </div>
        <div className="matrix-column" style={{left: '30%', animationDelay: '3s', animationDuration: '12s'}}>
          リスク許容度意思決定速度検証ニーズコミュニケーション
        </div>
        <div className="matrix-column" style={{left: '50%', animationDelay: '6s', animationDuration: '18s'}}>
          信頼性評価専門知識経験指標ネットワーク品質
        </div>
        <div className="matrix-column" style={{left: '70%', animationDelay: '2s', animationDuration: '14s'}}>
          説得戦略言語パターン心理的弱点認知的偏見
        </div>
        <div className="matrix-column" style={{left: '90%', animationDelay: '5s', animationDuration: '16s'}}>
          行動分析パーソナリティプロファイル社会的証明
        </div>
      </div>

      <div className="morphing-grid opacity-20"></div>

      <Authenticated>
        <div className="max-w-7xl mx-auto px-8 py-16 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="premium-title mb-8">
              ARCHETYPE INTELLIGENCE
            </h1>
            <div className="bamboo-divider w-48 mx-auto mb-12"></div>
            <p className="premium-subtitle mb-8">
              PSYCHOLOGICAL WARFARE PROFILING SYSTEM
            </p>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl font-light leading-relaxed opacity-90">
                Advanced psychological profiling framework for investor analysis, vulnerability assessment,
                and strategic persuasion deployment across all communication channels.
              </p>
            </div>
          </div>

          {/* Evaluation Methodology */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light tracking-wider mb-8 premium-subtitle">
                EVALUATION METHODOLOGY
              </h2>
              <div className="bamboo-divider w-32 mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {evaluationCriteria.map((criteria, index) => (
                <div key={criteria.category} className="ultra-premium-card p-8 depth-layer-3">
                  <Brain className="w-8 h-8 mb-6 opacity-80" style={{color: 'var(--fox-fire-cyan)'}} />
                  <h3 className="text-xl font-light mb-6 spirit-hologram" data-text={criteria.category}>
                    {criteria.category}
                  </h3>
                  <ul className="space-y-3">
                    {criteria.metrics.map((metric, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm opacity-80">
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{color: 'var(--neon-green)'}} />
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Archetype Profiles */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light tracking-wider mb-8 premium-subtitle">
                INVESTOR ARCHETYPES
              </h2>
              <div className="bamboo-divider w-32 mx-auto"></div>
            </div>
            
            <div className="grid gap-8">
              {archetypes.map((archetype, index) => (
                <div key={archetype.name} className="ultra-premium-card p-12 depth-layer-2">
                  <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* Core Profile */}
                    <div className="lg:col-span-1">
                      <div className="flex items-center gap-4 mb-6">
                        <archetype.icon 
                          className="w-12 h-12" 
                          style={{color: archetype.color}} 
                        />
                        <h3 className="text-2xl font-light spirit-hologram" data-text={archetype.name}>
                          {archetype.name}
                        </h3>
                      </div>
                      
                      {/* ASCII Representation */}
                      {archetype.representation && (
                        <div className="mb-6">
                          <pre className="text-xs font-mono text-center p-4 cyber-shrine-card" style={{color: archetype.color, lineHeight: '1.2'}}>
                            {archetype.representation}
                          </pre>
                        </div>
                      )}
                      
                      <p className="text-base opacity-80 mb-8 leading-relaxed">
                        {archetype.description}
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2 opacity-60">CORE MOTIVATIONS</h4>
                          <ul className="space-y-2 text-sm opacity-70">
                            {archetype.coreMotivations.map((motivation, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Target className="w-3 h-3 mt-1 flex-shrink-0" style={{color: archetype.color}} />
                                {motivation}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Psychology & Strategy */}
                    <div className="lg:col-span-1">
                      <h4 className="text-lg font-light mb-6 spirit-hologram" data-text="PSYCHOLOGICAL PROFILE">
                        PSYCHOLOGICAL PROFILE
                      </h4>
                      
                      <div className="space-y-4 mb-8">
                        {Object.entries(archetype.psychologyProfile).map(([key, value]) => (
                          <div key={key} className="border-l-2 pl-4" style={{borderColor: archetype.color}}>
                            <div className="text-xs uppercase tracking-wider opacity-60 mb-1">
                              {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                            </div>
                            <div className="text-sm opacity-80">{value}</div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h5 className="text-sm font-medium mb-3 opacity-80">VULNERABILITIES</h5>
                          <ul className="space-y-2 text-sm opacity-70">
                            {archetype.vulnerabilities.map((vulnerability, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <AlertTriangle className="w-3 h-3 mt-1 flex-shrink-0" style={{color: 'var(--electric-arterial)'}} />
                                {vulnerability}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Strengths & Weaknesses */}
                    <div className="lg:col-span-1">
                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <h5 className="text-sm font-medium mb-3 opacity-80 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" style={{color: 'var(--neon-green)'}} />
                            STRENGTHS
                          </h5>
                          <ul className="space-y-2 text-sm opacity-70">
                            {archetype.strengths.map((strength, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: 'var(--neon-green)'}}></div>
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium mb-3 opacity-80 flex items-center gap-2">
                            <XCircle className="w-4 h-4" style={{color: 'var(--electric-arterial)'}} />
                            WEAKNESSES
                          </h5>
                          <ul className="space-y-2 text-sm opacity-70">
                            {archetype.weaknesses.map((weakness, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: 'var(--electric-arterial)'}}></div>
                                {weakness}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Persuasion Strategy */}
                  <div className="mt-8 pt-8 border-t border-gray-700/50">
                    <h4 className="text-lg font-light mb-6 spirit-hologram" data-text="PERSUASION PROTOCOL">
                      PERSUASION PROTOCOL
                    </h4>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        {Object.entries(archetype.persuasionStrategy).map(([key, value]) => (
                          <div key={key} className="border-l-2 pl-4" style={{borderColor: archetype.color}}>
                            <div className="text-xs uppercase tracking-wider opacity-60 mb-1">
                              {key.toUpperCase()}
                            </div>
                            <div className="text-sm opacity-80">{value}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h6 className="text-xs uppercase tracking-wider opacity-60 mb-2">CREDIBILITY MARKERS</h6>
                          <ul className="space-y-1 text-xs opacity-70">
                            {archetype.credibilityMarkers.map((marker, idx) => (
                              <li key={idx}>• {marker}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h6 className="text-xs uppercase tracking-wider opacity-60 mb-2">WARNING SIGNALS</h6>
                          <ul className="space-y-1 text-xs opacity-70">
                            {archetype.warningSignals.map((signal, idx) => (
                              <li key={idx}>• {signal}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    {/* Advanced NLP Tactics */}
                    {archetype.nlpTactics && (
                      <div className="mt-8 pt-8 border-t border-gray-700/30">
                        <h4 className="text-lg font-light mb-6 spirit-hologram" data-text="TACTICAL LINGUISTICS">
                          TACTICAL LINGUISTICS
                        </h4>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {Object.entries(archetype.nlpTactics).map(([key, value]) => (
                            <div key={key} className="cyber-shrine-card p-4">
                              <div className="text-xs uppercase tracking-wider mb-2" style={{color: archetype.color}}>
                                {key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}
                              </div>
                              <div className="text-xs opacity-80 leading-relaxed">
                                {Array.isArray(value) ? value.join(', ') : value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Intel Tracking System */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light tracking-wider mb-8 premium-subtitle">
                INTEL TRACKING MATRIX
              </h2>
              <div className="bamboo-divider w-32 mx-auto"></div>
            </div>
            
            <div className="ultra-premium-card p-12 depth-layer-2">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4" style={{color: 'var(--fox-fire-cyan)'}} />
                  <h3 className="text-xl font-light mb-4 spirit-hologram" data-text="CONVERSATION ANALYSIS">
                    CONVERSATION ANALYSIS
                  </h3>
                  <p className="text-sm opacity-70 leading-relaxed">
                    Real-time processing of uploaded conversations to extract psychological patterns, 
                    credibility markers, and vulnerability indicators across all investor interactions.
                  </p>
                </div>
                
                <div className="text-center">
                  <Brain className="w-12 h-12 mx-auto mb-4" style={{color: 'var(--hot-magenta)'}} />
                  <h3 className="text-xl font-light mb-4 spirit-hologram" data-text="PROFILE EVOLUTION">
                    PROFILE EVOLUTION
                  </h3>
                  <p className="text-sm opacity-70 leading-relaxed">
                    Dynamic archetype classification that updates with each interaction, tracking 
                    behavioral changes and refinement of psychological profiles over time.
                  </p>
                </div>
                
                <div className="text-center">
                  <Target className="w-12 h-12 mx-auto mb-4" style={{color: 'var(--shrine-gold)'}} />
                  <h3 className="text-xl font-light mb-4 spirit-hologram" data-text="STRATEGIC UPDATES">
                    STRATEGIC UPDATES
                  </h3>
                  <p className="text-sm opacity-70 leading-relaxed">
                    Continuous optimization of persuasion strategies based on conversation outcomes 
                    and investor response patterns across all communication channels.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Authenticated>
    </div>
  );
}