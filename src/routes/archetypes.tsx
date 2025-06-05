import { createFileRoute } from "@tanstack/react-router";
import { Authenticated } from "convex/react";
import { Target, Shield, Crown, AlertTriangle, ChevronDown, ChevronRight, Zap, Star, Brain, Compass } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/archetypes")({
  component: ArchetypesPage,
});

function ArchetypesPage() {
  const [expandedArchetype, setExpandedArchetype] = useState<string | null>(null);

  const toggleArchetype = (name: string) => {
    setExpandedArchetype(expandedArchetype === name ? null : name);
  };

  const archetypes = [
    {
      name: "THE PRINCE",
      icon: Target,
      description: "Experience-Driven Investor",
      characterProfile: "Doesn't know how to make money, provide, or take social responsibility. Lazy, unmotivated, can't sell or make goals. Can be rich but lacks drive. Knows how to talk well but can't react in emergencies. Loves freedom over material things - easily spends on experiences like mountain trips, dance lessons, yoga, gym memberships, vitamins, concerts, surfing. Prone to being influenced by charismatic Joker types.",
      sunTzuVulnerabilities: [
        "\"Know yourself and know your enemy\" - They don't know their own investment capabilities or limits",
        "\"All warfare is based on deception\" - Easily deceived by lifestyle narratives and experiential promises",
        "Can't handle pressure or crisis situations in investments",
        "Lacks strategic discipline and long-term planning",
        "Prone to emotional investment decisions based on lifestyle appeal"
      ],
      strategicVulnerabilities: [
        {
          vulnerability: "Lifestyle Fantasy Exploitation",
          description: "Dreams of freedom and experiences override financial discipline",
          sunTzu: "兵者，詭道也 - All warfare is based on deception",
          powerLaw: "Law 27: Play on People's Need to Believe - Extremely susceptible to lifestyle transformation promises",
          tactics: [
            "Frame investments as lifestyle enhancements and exclusive experiences",
            "Appeal to their desire for adventure and freedom",
            "Use experiential language and visual imagery",
            "Create investment narratives around travel and personal growth"
          ]
        },
        {
          vulnerability: "Influence Susceptibility",
          description: "Easily manipulated by charismatic personalities",
          sunTzu: "知己知彼，百戰不殆 - They don't know themselves or others",
          powerLaw: "Law 1: Never Outshine the Master - They love being flattered and made to feel sophisticated",
          tactics: [
            "Position charismatic intermediaries as deal champions",
            "Use social proof from influencer-type personalities",
            "Create exclusive community feel around investments",
            "Leverage FOMO through lifestyle peer pressure"
          ]
        },
        {
          vulnerability: "Crisis Incapacity",
          description: "Cannot handle emergency situations or pressure decisions",
          sunTzu: "兵貴勝，不貴久 - They cannot act swiftly in crisis",
          powerLaw: "Law 33: Discover Each Man's Thumbscrew - Their need for experiences and adventure",
          tactics: [
            "Exploit their inability to analyze downside risks",
            "Create time pressure during their vulnerable moments",
            "Structure deals that seem low-maintenance but aren't",
            "Hide complexity behind lifestyle benefits"
          ]
        }
      ],
      exploitationStrategy: "Frame investments as lifestyle enhancements and exclusive experiences while exploiting their inability to analyze downside risks."
    },
    {
      name: "THE WARRIOR / SOLDIER",
      icon: Shield,
      description: "Traditional Value Investor",
      characterProfile: "Concrete goals, inflexible thinking. Don't bend, only go in straight lines. Military/soldier mentality. Mildly limited intelligence, less flexibility. Give practical, understandable, necessary things - a fur coat so you don't freeze, a bag because the old one is torn, pays for repairs because the ceiling is collapsing.",
      sunTzuVulnerabilities: [
        "\"All warfare is based on deception\" - Too straightforward to recognize sophisticated schemes",
        "\"Supreme excellence is breaking enemy's resistance without fighting\" - Always want direct confrontation",
        "Rigid thinking makes them predictable in negotiations",
        "Cannot adapt when investment thesis changes rapidly",
        "Miss opportunities requiring creative or flexible approaches"
      ],
      strategicVulnerabilities: [
        {
          vulnerability: "Rigid Thinking Exploitation",
          description: "Inflexible mental models make them predictable",
          sunTzu: "兵者，詭道也 - They cannot recognize deception",
          powerLaw: "Law 8: Make Other People Come to You - They'll charge straight into logical traps",
          tactics: [
            "Present straightforward value propositions hiding complex elements",
            "Use their predictable patterns against them in negotiations",
            "Create situations where their rigidity becomes weakness",
            "Exploit their inability to adapt to changing circumstances"
          ]
        },
        {
          vulnerability: "Practical Necessity Focus",
          description: "Only respond to immediate, concrete needs",
          sunTzu: "攻其無備，出其不意 - Attack where unprepared",
          powerLaw: "Law 13: Appeal to Self-Interest - Show concrete, practical benefits and necessity",
          tactics: [
            "Frame opportunities as solving immediate practical problems",
            "Use military/construction analogies they understand",
            "Focus on necessity and utility over growth potential",
            "Present clear, linear cause-and-effect relationships"
          ]
        },
        {
          vulnerability: "Uncertainty Aversion",
          description: "Struggle with ambiguous or rapidly changing situations",
          sunTzu: "故兵無常勢，水無常形 - They cannot flow like water",
          powerLaw: "Law 17: Keep Others in Suspended Terror - Their rigid nature struggles with uncertainty",
          tactics: [
            "Create controlled uncertainty to trigger their discomfort",
            "Force quick decisions in ambiguous situations",
            "Exploit their inability to handle market volatility",
            "Use their inflexibility during market chaos"
          ]
        }
      ],
      exploitationStrategy: "Present straightforward value propositions while hiding complex strategic elements they can't adapt to."
    },
    {
      name: "THE JOKER / AFFAIRIST",
      icon: Zap,
      description: "Deal-Maker Investor",
      characterProfile: "Always selling things. All entrepreneurs, all people who sell. Work through schemes, very flexible, great negotiators. Can adjust and be different things. Gives emotions and memories - spa evenings in romantic settings, picnics with Eiffel Tower views, huge bouquets for social media bragging. Likes to shock and stick in memory.",
      sunTzuVulnerabilities: [
        "\"He who is prudent and lies in wait for an enemy who is not, will be victorious\" - Always moving, rarely patient",
        "Overconfidence in their adaptability and deal-making skills",
        "Their flexibility can become inconsistency in investment strategy",
        "Susceptible to deals that stroke their ego as master dealmakers",
        "Can be out-maneuvered by more patient, strategic opponents"
      ],
      strategicVulnerabilities: [
        {
          vulnerability: "Ego-Driven Deal Making",
          description: "Need to be seen as the smartest dealmaker in the room",
          sunTzu: "驕兵必敗 - Pride comes before the fall",
          powerLaw: "Law 21: Play a Sucker to Catch a Sucker - They think they're always the smartest in the room",
          tactics: [
            "Let them think they're getting the better deal initially",
            "Structure terms that benefit you long-term",
            "Appeal to their reputation as master negotiators",
            "Create complex deals that stroke their intellectual vanity"
          ]
        },
        {
          vulnerability: "Constant Motion Weakness",
          description: "Always moving and scheming, rarely patient or strategic",
          sunTzu: "善戰者，先為不可勝 - Good warriors first become invincible",
          powerLaw: "Law 48: Assume Formlessness - Be more adaptable than they are",
          tactics: [
            "Use their impatience against them in negotiations",
            "Force them into positions requiring patience",
            "Exploit their need for constant action and stimulation",
            "Out-maneuver them through strategic stillness"
          ]
        },
        {
          vulnerability: "Scheme Complexity Addiction",
          description: "Drawn to overly complex deals and structures",
          sunTzu: "兵者，詭道也 - Match their deceptive nature but stay ahead",
          powerLaw: "Law 3: Conceal Your Intentions - Match their deceptive nature but stay one step ahead",
          tactics: [
            "Create deals with hidden long-term advantages",
            "Use their love of complexity against them",
            "Structure multiple exit strategies they can't see",
            "Leverage their overconfidence in scheme detection"
          ]
        }
      ],
      exploitationStrategy: "Let them think they're getting the better deal while structuring terms that benefit you long-term."
    },
    {
      name: "THE EMPEROR / DADDY",
      icon: Crown,
      description: "Power-Driven Investor",
      characterProfile: "Boss mentality, creates new businesses. Likes naive people, enjoys having people under their system. Knows luxury attributes and will share the importance of branded things and latest iPhones. You can ask for cars, apartments, money for beauty, traveling, language learning, educational courses.",
      sunTzuVulnerabilities: [
        "\"Pride goes before destruction\" - Their ego is their greatest weakness",
        "\"The supreme art of war is to subdue enemy without fighting\" - Expect direct challenges to authority",
        "Surrounded by yes-men, poor independent intelligence gathering",
        "Vulnerable to flattery about their business acumen and success",
        "Miss opportunities that don't fit their established power patterns"
      ],
      strategicVulnerabilities: [
        {
          vulnerability: "Ego-Driven Authority",
          description: "Need to be recognized as the dominant authority figure",
          sunTzu: "驕兵必敗 - Their ego is their greatest weakness",
          powerLaw: "Law 1: Never Outshine the Master - Critical - their ego must be preserved at all costs",
          tactics: [
            "Always present them as the visionary leader",
            "Structure deals where they appear to be in control",
            "Use sophisticated business flattery consistently",
            "Position yourself as the vehicle for their legacy"
          ]
        },
        {
          vulnerability: "Mentorship Complex",
          description: "Enjoy controlling and mentoring naive people",
          sunTzu: "知彼知己，百戰不殆 - They prefer weaker opponents",
          powerLaw: "Law 11: Learn to Keep People Dependent - They do this, so reverse it subtly",
          tactics: [
            "Appeal to their desire to mentor and guide",
            "Present yourself as the eager student initially",
            "Gradually become indispensable to their operations",
            "Leverage their need to feel superior and wise"
          ]
        },
        {
          vulnerability: "Luxury Status Obsession",
          description: "Fixated on luxury brands and status symbols",
          sunTzu: "攻其所愛 - Attack what they cherish most",
          powerLaw: "Law 16: Use Absence to Increase Respect - Make yourself scarce to increase value",
          tactics: [
            "Frame opportunities in terms of exclusive luxury access",
            "Appeal to their knowledge of premium brands and status",
            "Create scarcity around high-status investment opportunities",
            "Use their material desires to influence decisions"
          ]
        }
      ],
      exploitationStrategy: "Appeal to their desire to mentor and control while positioning yourself as the vehicle for their legacy and power expansion."
    },
    {
      name: "THE SAGE / ORACLE",
      icon: Brain,
      description: "Analytical Perfectionist",
      characterProfile: "Deep analytical thinking, seeks complete understanding before action. Loves research, data, and theoretical frameworks. Can become paralyzed by analysis. Values wisdom and comprehensive knowledge above quick gains.",
      sunTzuVulnerabilities: [
        "\"Rapidity is the essence of war\" - Analysis paralysis in time-sensitive situations",
        "\"In chaos, there is opportunity\" - Struggle with incomplete information environments",
        "Overthinking leads to missed opportunities",
        "Vulnerable to information overload and decision fatigue",
        "Miss forest for trees in complex deal structures"
      ],
      strategicVulnerabilities: [
        {
          vulnerability: "Analysis Paralysis",
          description: "Overthinking prevents timely action and decision-making",
          sunTzu: "兵貴神速 - Speed is essential, but they analyze endlessly",
          powerLaw: "Law 25: Re-Create Yourself - Present data that challenges their existing models",
          tactics: [
            "Overwhelm with sophisticated data while creating time pressure",
            "Force reliance on your analysis through information control",
            "Create decision fatigue through excessive options",
            "Use their need for complete understanding against them"
          ]
        },
        {
          vulnerability: "Theoretical Framework Obsession",
          description: "Prefer theoretical models over practical execution",
          sunTzu: "紙上談兵 - Armchair strategists fail in real battle",
          powerLaw: "Law 28: Enter Action with Boldness - Their cautiousness is exploitable",
          tactics: [
            "Present opportunities wrapped in academic frameworks",
            "Use their love of theoretical models to mask practical risks",
            "Exploit gap between their analysis and execution capability",
            "Create urgency that forces action despite incomplete analysis"
          ]
        },
        {
          vulnerability: "Perfectionism Paralysis",
          description: "Need for perfect information prevents timely decisions",
          sunTzu: "完美是善的敵人 - Perfect is the enemy of good",
          powerLaw: "Law 34: Be Royal in Your Fashion - Present confidence they lack in uncertainty",
          tactics: [
            "Show controlled vulnerability to gain their trust",
            "Demonstrate decisive action capability they lack",
            "Create situations requiring imperfect but timely decisions",
            "Use their perfectionism to delay competing opportunities"
          ]
        }
      ],
      exploitationStrategy: "Overwhelm with sophisticated data while creating time pressure that forces reliance on your analysis."
    },
    {
      name: "THE GUARDIAN / PROTECTOR",
      icon: Shield,
      description: "Security-Focused Conservative",
      characterProfile: "Risk-averse, focuses on wealth preservation and downside protection. Conservative approach to all investments. Spreads risk across multiple areas for safety. Always looking for guarantees and security.",
      sunTzuVulnerabilities: [
        "\"Opportunities multiply as they are seized\" - Fear prevents acting on opportunities",
        "\"Security against defeat implies defensive tactics\" - Always reactive, never proactive",
        "Defensive mindset limits offensive investment strategies",
        "Paralyzed by potential downside scenarios",
        "Susceptible to loss aversion manipulation"
      ],
      strategicVulnerabilities: [
        {
          vulnerability: "Loss Aversion Manipulation",
          description: "Fear of loss outweighs potential for gain",
          sunTzu: "善戰者，立於不敗之地 - They seek invincible positions but miss opportunities",
          powerLaw: "Law 29: Plan All the Way to the End - Show complete safe path",
          tactics: [
            "Amplify downside of missing opportunities",
            "Provide detailed risk mitigation frameworks",
            "Frame inaction as the riskiest choice",
            "Use comprehensive safety narratives to overcome paralysis"
          ]
        },
        {
          vulnerability: "Security Theater Obsession",
          description: "Focus on appearance of safety over actual risk management",
          sunTzu: "兵不厭詐 - They want guarantees in an uncertain world",
          powerLaw: "Law 40: Despise the Free Lunch - Make them pay for protection to value it",
          tactics: [
            "Structure deals with multiple layers of apparent protection",
            "Charge premium for security features they demand",
            "Create elaborate protective provisions that favor you",
            "Use their need for guarantees to justify complex terms"
          ]
        },
        {
          vulnerability: "Diversification Paralysis",
          description: "Spread resources too thin for meaningful impact",
          sunTzu: "兵力分散，必敗無疑 - Divided forces ensure defeat",
          powerLaw: "Law 23: Concentrate Your Forces - They spread resources too thin for safety",
          tactics: [
            "Exploit their scattered investment approach",
            "Create multiple small opportunities that seem safer",
            "Use their diversification obsession to reduce their influence",
            "Benefit from their inability to concentrate resources effectively"
          ]
        }
      ],
      exploitationStrategy: "Amplify downside of missing opportunities while providing detailed risk mitigation frameworks."
    },
    {
      name: "THE PIONEER / EXPLORER",
      icon: Compass,
      description: "Innovation-Driven Risk-Taker",
      characterProfile: "Seeks new frontiers and breakthrough opportunities. First to explore new markets and technologies. High risk tolerance but scattered focus. Always looking for the next big thing.",
      sunTzuVulnerabilities: [
        "\"He who knows when to fight and when not to fight will be victorious\" - They fight every battle",
        "Scattered focus across too many fronts",
        "\"Invincibility lies in defense\" - Always on offense, poor defense",
        "Overconfidence in ability to spot trends",
        "Susceptible to FOMO on revolutionary opportunities"
      ],
      strategicVulnerabilities: [
        {
          vulnerability: "Shiny Object Syndrome",
          description: "Constantly distracted by new opportunities and trends",
          sunTzu: "專心致志者勝 - Those who focus win, but they scatter attention",
          powerLaw: "Law 36: Disdain Things You Cannot Have - Make opportunities seem scarce",
          tactics: [
            "Feed their ego about being early adopters",
            "Create urgency around limited access to transformative deals",
            "Exploit their FOMO with exclusive opportunity narratives",
            "Use their scattered focus to prevent deep due diligence"
          ]
        },
        {
          vulnerability: "Trend Overconfidence",
          description: "Believe they can predict and ride every new wave",
          sunTzu: "驕者必敗 - The overconfident will surely fail",
          powerLaw: "Law 47: Don't Go Past the Mark - They always push too far",
          tactics: [
            "Exploit their overconfidence in trend identification",
            "Create false signals that trigger their investment instincts",
            "Use their need to be first to push them into premature decisions",
            "Leverage their inability to know when to stop"
          ]
        },
        {
          vulnerability: "Revolutionary Narrative Addiction",
          description: "Drawn to stories of transformation and disruption",
          sunTzu: "兵者，詭道也 - They're susceptible to revolutionary deception",
          powerLaw: "Law 32: Play to People's Fantasies - Appeal to their vision of being transformative",
          tactics: [
            "Frame opportunities as paradigm-shifting breakthroughs",
            "Use language of revolution and transformation",
            "Position them as visionary pioneers of new era",
            "Exploit their desire to be associated with historic change"
          ]
        }
      ],
      exploitationStrategy: "Feed their ego about being early adopters while creating urgency around limited access to transformative deals."
    },
    {
      name: "THE COLLECTOR / CURATOR",
      icon: Star,
      description: "Portfolio-Focused Accumulator",
      characterProfile: "Focuses on building impressive investment portfolios. Values appearance and prestige of holdings. Collects notable deals and trophy investments. Motivated by portfolio aesthetics and bragging rights.",
      sunTzuVulnerabilities: [
        "\"All warfare is based on deception\" - They value appearance over substance",
        "Pride in collection makes them predictable",
        "\"Know your enemy\" - Focus on assets, not people behind them",
        "Vulnerable to status-based manipulation",
        "Miss fundamentals while chasing prestigious deals"
      ],
      strategicVulnerabilities: [
        {
          vulnerability: "Trophy Asset Obsession",
          description: "Prioritize prestigious investments over fundamentally sound ones",
          sunTzu: "外表欺人 - Appearances can be deceiving, but they're fooled by prestige",
          powerLaw: "Law 37: Create Compelling Spectacles - They're drawn to impressive presentations",
          tactics: [
            "Appeal to their desire for trophy assets",
            "Hide fundamental weaknesses through prestigious positioning",
            "Create investment opportunities that enhance portfolio appearance",
            "Use their vanity about collection quality against sound judgment"
          ]
        },
        {
          vulnerability: "Exclusivity Addiction",
          description: "Need for rare and exclusive investment opportunities",
          sunTzu: "稀為貴 - Rarity creates perceived value",
          powerLaw: "Law 16: Use Absence to Increase Respect - Make deals seem exclusive and rare",
          tactics: [
            "Create artificial scarcity around investment opportunities",
            "Use invitation-only positioning for deals",
            "Exploit their need to have what others cannot",
            "Structure exclusive access that they'll pay premium for"
          ]
        },
        {
          vulnerability: "Portfolio Aesthetics Focus",
          description: "More concerned with how portfolio looks than how it performs",
          sunTzu: "實勝於名 - Substance should triumph over reputation, but they choose appearance",
          powerLaw: "Law 32: Play to People's Fantasies - Appeal to their vision of perfect portfolio",
          tactics: [
            "Present opportunities that enhance portfolio's visual appeal",
            "Focus on how investment looks to others rather than returns",
            "Exploit their need for diversified, impressive-looking holdings",
            "Use their desire for bragging rights to justify poor terms"
          ]
        }
      ],
      exploitationStrategy: "Appeal to their desire for trophy assets while hiding fundamental weaknesses through prestigious positioning."
    }
  ];

  return (
    <Authenticated>
      <div className="max-w-7xl mx-auto px-8 py-16 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="premium-title mb-8">
            STRATEGIC VULNERABILITIES & APPLICABLE LAWS
          </h1>
          <div className="bamboo-divider w-48 mx-auto mb-12"></div>
          <p className="premium-subtitle mb-8">
            COMPREHENSIVE INVESTOR ARCHETYPE WARFARE MATRIX
          </p>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl font-light leading-relaxed opacity-90">
              Advanced psychological warfare profiling system combining character analysis, Sun Tzu strategic principles,
              and 48 Laws of Power applications for systematic investor manipulation and exploitation.
            </p>
          </div>
        </div>

        {/* Archetype Profiles */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light tracking-wider mb-8 premium-subtitle">
              INVESTOR ARCHETYPE VULNERABILITIES
            </h2>
            <div className="bamboo-divider w-32 mx-auto"></div>
          </div>
          
          <div className="space-y-4">
            {archetypes.map((archetype) => (
              <div key={archetype.name} className="ultra-premium-card">
                {/* Compact Clickable Header */}
                <button
                  onClick={() => toggleArchetype(archetype.name)}
                  className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <archetype.icon 
                      className="w-6 h-6" 
                      style={{color: 'var(--matrix-green)'}} 
                    />
                    <div className="text-left">
                      <h3 className="text-lg font-light">
                        {archetype.name}
                      </h3>
                      <span className="text-sm opacity-60">{archetype.description}</span>
                    </div>
                  </div>
                  {expandedArchetype === archetype.name ? 
                    <ChevronDown className="w-5 h-5" style={{color: 'var(--matrix-green)'}} /> : 
                    <ChevronRight className="w-5 h-5" style={{color: 'var(--matrix-green)'}} />
                  }
                </button>

                {/* Expanded Content */}
                {expandedArchetype === archetype.name && (
                  <div className="border-t border-gray-700 p-6">
                    <div className="grid md:grid-cols-1 gap-8">
                      
                      {/* Character Profile */}
                      <div className="mb-6">
                        <h5 className="text-sm font-medium mb-3 opacity-80 flex items-center gap-2">
                          <Target className="w-4 h-4" style={{color: 'var(--matrix-green)'}} />
                          CHARACTER PROFILE
                        </h5>
                        <p className="text-sm opacity-80 leading-relaxed">
                          {archetype.characterProfile}
                        </p>
                      </div>

                      {/* Sun Tzu Vulnerabilities */}
                      <div className="mb-6">
                        <h5 className="text-sm font-medium mb-3 opacity-80 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" style={{color: 'var(--matrix-green)'}} />
                          SUN TZU VULNERABILITIES
                        </h5>
                        <ul className="space-y-2 text-sm opacity-70">
                          {archetype.sunTzuVulnerabilities.map((vulnerability, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: 'var(--matrix-green)'}}></div>
                              {vulnerability}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Strategic Vulnerabilities */}
                      <div>
                        <h5 className="text-sm font-medium mb-3 opacity-80 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" style={{color: 'var(--matrix-green)'}} />
                          STRATEGIC VULNERABILITIES & 48 LAWS APPLICATIONS
                        </h5>
                        <div className="space-y-4">
                          {archetype.strategicVulnerabilities.map((vuln, idx) => (
                            <div key={idx} className="border-l-2 pl-4 space-y-2" style={{borderColor: 'var(--matrix-green)'}}>
                              <div className="text-sm font-medium opacity-90">{vuln.vulnerability}</div>
                              <div className="text-xs opacity-70">{vuln.description}</div>
                              <div className="space-y-1">
                                <div className="text-xs">
                                  <span className="opacity-60">SUN TZU:</span>
                                  <span className="ml-2 opacity-80">{vuln.sunTzu}</span>
                                </div>
                                <div className="text-xs">
                                  <span className="opacity-60">48 LAWS:</span>
                                  <span className="ml-2 opacity-80">{vuln.powerLaw}</span>
                                </div>
                              </div>
                              <div className="text-xs opacity-60">
                                <div className="font-medium mb-1">EXPLOITATION TACTICS:</div>
                                <ul className="space-y-1">
                                  {vuln.tactics.map((tactic, tacticIdx) => (
                                    <li key={tacticIdx} className="flex items-start gap-2">
                                      <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{backgroundColor: 'var(--matrix-green)'}}></div>
                                      {tactic}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Exploitation Strategy */}
                      <div className="mt-6 p-4 bg-red-500/10 rounded border border-red-500/30">
                        <h5 className="text-sm font-medium mb-2 text-red-400">EXPLOITATION STRATEGY</h5>
                        <p className="text-sm opacity-80">{archetype.exploitationStrategy}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cross-Archetype Principles */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light tracking-wider mb-8 premium-subtitle">
              CROSS-ARCHETYPE STRATEGIC PRINCIPLES
            </h2>
            <div className="bamboo-divider w-32 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="ultra-premium-card p-6">
              <h3 className="text-xl font-light mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5" style={{color: 'var(--matrix-green)'}} />
                UNIVERSAL VULNERABILITIES
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span style={{color: 'var(--matrix-green)'}}>•</span>
                  <span><strong>Confirmation Bias</strong> - All archetypes seek information confirming existing beliefs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{color: 'var(--matrix-green)'}}>•</span>
                  <span><strong>Loss Aversion</strong> - Fear of missing out outweighs potential gains across all types</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{color: 'var(--matrix-green)'}}>•</span>
                  <span><strong>Social Proof</strong> - Even Controllers and Protectors are influenced by peer behavior</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{color: 'var(--matrix-green)'}}>•</span>
                  <span><strong>Authority Bias</strong> - Credible sources affect all archetypes differently but consistently</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{color: 'var(--matrix-green)'}}>•</span>
                  <span><strong>Anchoring Effect</strong> - First impressions and numbers disproportionately influence decisions</span>
                </li>
              </ul>
            </div>

            <div className="ultra-premium-card p-6">
              <h3 className="text-xl font-light mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5" style={{color: 'var(--matrix-green)'}} />
                WARFARE MATRIX PRINCIPLE
              </h3>
              <div className="text-sm space-y-3">
                <p className="opacity-80 leading-relaxed">
                  Each archetype's greatest strength becomes their exploitable weakness when their core psychological 
                  drivers are systematically manipulated through coordinated application of Sun Tzu's strategic principles 
                  and Greene's power dynamics.
                </p>
                <div className="p-3 bg-yellow-500/10 rounded border border-yellow-500/30">
                  <p className="text-xs font-medium text-yellow-400">
                    STRATEGIC PRINCIPLE: Target the ego through strength-weakness inversion while maintaining plausible deniability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Authenticated>
  );
}