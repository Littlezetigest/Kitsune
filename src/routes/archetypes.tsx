import { createFileRoute } from "@tanstack/react-router";
import { Authenticated } from "convex/react";
import { Target, Shield, Eye, Crown, AlertTriangle, CheckCircle, XCircle, ChevronDown, ChevronRight } from "lucide-react";
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
      name: "THE VISIONARY",
      icon: Eye,
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
      strategicVulnerabilities: [
        {
          vulnerability: "FOMO Exploitation",
          description: "Fear of missing the next unicorn drives irrational urgency",
          sunTzu: "兵貴勝，不貴久 - Speed is essential in war, but haste makes waste",
          powerLaw: "Law 1: Never Outshine the Master - Present opportunity as their discovery",
          tactics: [
            "Create artificial scarcity with limited timeframes",
            "Reference competitors who 'missed out' on previous opportunities",
            "Use future-tense language to paint vivid success scenarios"
          ]
        },
        {
          vulnerability: "Ego-Driven Validation",
          description: "Need to be seen as prescient and ahead of the curve",
          sunTzu: "故善戰者，求之於勢 - The skillful strategist uses positioning",
          powerLaw: "Law 6: Court Attention at All Costs - Feed their need for recognition",
          tactics: [
            "Position them as industry thought leader in communications",
            "Offer exclusive access to 'invite-only' opportunities",
            "Reference their past successful predictions in presentations"
          ]
        },
        {
          vulnerability: "Complexity Aversion",
          description: "Preference for simple, elegant narratives over messy reality",
          sunTzu: "兵者，詭道也 - All warfare is based on deception",
          powerLaw: "Law 3: Conceal Your Intentions - Hide operational complexities",
          tactics: [
            "Lead with compelling vision before revealing implementation details",
            "Use metaphors and analogies from successful tech companies",
            "Frame challenges as 'execution details' to be solved later"
          ]
        }
      ]
    },
    {
      name: "THE VALIDATOR",
      icon: CheckCircle,
      description: "Methodical analyst who relies on data, metrics, and proven track records",
      coreMotivations: [
        "Minimizing downside risk through thorough analysis",
        "Building sustainable, profitable portfolios",
        "Backing proven business models and teams"
      ],
      psychologyProfile: {
        decisionSpeed: "Deliberate - Requires extensive due diligence",
        riskTolerance: "Conservative - Prefers proven models",
        validationNeeds: "Historical performance, concrete metrics",
        communicationStyle: "Data-driven, analytical discourse"
      },
      strengths: [
        "Excellent at spotting red flags early",
        "Thorough understanding of fundamentals",
        "Builds sustainable long-term portfolios",
        "Strong risk management capabilities"
      ],
      weaknesses: [
        "May miss early-stage opportunities",
        "Analysis paralysis in fast-moving markets",
        "Conservative approach limits upside",
        "Slow to adapt to new paradigms"
      ],
      strategicVulnerabilities: [
        {
          vulnerability: "Analysis Paralysis",
          description: "Endless data requests to delay difficult decisions",
          sunTzu: "攻其無備，出其不意 - Attack where they are unprepared",
          powerLaw: "Law 25: Re-Create Yourself - Become their trusted data source",
          tactics: [
            "Provide overwhelming amounts of supporting data upfront",
            "Create detailed financial models with conservative projections",
            "Reference multiple independent validation sources"
          ]
        },
        {
          vulnerability: "Impostor Syndrome",
          description: "Fear that their analytical approach will miss breakthrough opportunities",
          sunTzu: "善戰者，立於不敗之地 - Good fighters position themselves beyond defeat",
          powerLaw: "Law 15: Crush Your Enemy Totally - Eliminate their self-doubt",
          tactics: [
            "Acknowledge their analytical superiority in past decisions",
            "Frame opportunity as 'hidden in plain sight' requiring their skills",
            "Provide case studies where analytical approach identified winners"
          ]
        },
        {
          vulnerability: "Metric Manipulation",
          description: "Over-reliance on historical metrics that may not predict future",
          sunTzu: "故兵無常勢，水無常形 - Military tactics are like water",
          powerLaw: "Law 32: Play to People's Fantasies - Show them the metrics they want",
          tactics: [
            "Present metrics in most favorable light without lying",
            "Focus on leading indicators over lagging ones",
            "Use cohort analysis to show positive trends"
          ]
        }
      ]
    },
    {
      name: "THE CONTROLLER",
      icon: Shield,
      description: "Focuses on control, governance, and protective measures",
      coreMotivations: [
        "Maintaining control over investment outcomes",
        "Protecting against downside scenarios",
        "Ensuring proper governance and oversight"
      ],
      psychologyProfile: {
        decisionSpeed: "Cautious - Extensive risk assessment",
        riskTolerance: "Low to moderate - Control-focused",
        validationNeeds: "Governance structures, protection mechanisms",
        communicationStyle: "Risk-focused, protective language"
      },
      strengths: [
        "Excellent at identifying potential risks",
        "Strong governance and oversight focus",
        "Protects against worst-case scenarios",
        "Ensures proper legal and financial structures"
      ],
      weaknesses: [
        "May over-engineer protection mechanisms",
        "Can stifle entrepreneurial creativity",
        "Risk-averse to breakthrough opportunities",
        "May focus too much on downside protection"
      ],
      strategicVulnerabilities: [
        {
          vulnerability: "Control Illusion",
          description: "False belief that all risks can be anticipated and mitigated",
          sunTzu: "上兵伐謀，其次伐交 - Supreme excellence is winning without fighting",
          powerLaw: "Law 31: Control the Options - Structure deal to give them control",
          tactics: [
            "Offer board seats, protective provisions, and veto rights",
            "Create detailed risk mitigation frameworks",
            "Provide regular reporting and transparency mechanisms"
          ]
        },
        {
          vulnerability: "Perfectionism Paralysis",
          description: "Endless pursuit of perfect risk mitigation prevents action",
          sunTzu: "故善戰者，立於不敗之地 - Position yourself where you cannot lose",
          powerLaw: "Law 40: Despise the Free Lunch - Make them pay for protection",
          tactics: [
            "Structure deals with multiple layers of downside protection",
            "Offer liquidation preferences and anti-dilution provisions",
            "Create milestone-based funding with kill switches"
          ]
        },
        {
          vulnerability: "Unknown Unknown Anxiety",
          description: "Paralyzing fear of risks that cannot be identified or quantified",
          sunTzu: "知己知彼，百戰不殆 - Know yourself and your enemy",
          powerLaw: "Law 17: Keep Others in Suspense - Control information flow",
          tactics: [
            "Provide comprehensive due diligence packages",
            "Create scenario planning for multiple risk factors",
            "Establish regular check-ins and monitoring systems"
          ]
        }
      ]
    },
    {
      name: "THE STATUS SEEKER",
      icon: Crown,
      description: "Driven by prestige, recognition, and social validation",
      coreMotivations: [
        "Building prestigious investment portfolio",
        "Gaining recognition in investment community",
        "Associating with high-profile deals and founders"
      ],
      psychologyProfile: {
        decisionSpeed: "Variable - Influenced by social dynamics",
        riskTolerance: "Moderate to high - For prestigious deals",
        validationNeeds: "Social proof, prestigious associations",
        communicationStyle: "Status-conscious, network-focused"
      },
      strengths: [
        "Strong network and relationship building",
        "Good at identifying trending opportunities",
        "Attracts high-quality deal flow",
        "Excellent at marketing and promotion"
      ],
      weaknesses: [
        "May prioritize prestige over fundamentals",
        "Susceptible to groupthink and trends",
        "Can be influenced by social pressure",
        "May overlook solid but unglamorous deals"
      ],
      strategicVulnerabilities: [
        {
          vulnerability: "Social Proof Dependency",
          description: "Decisions heavily influenced by what other prestigious investors are doing",
          sunTzu: "兵者，詭道也 - War is the art of deception",
          powerLaw: "Law 5: So Much Depends on Reputation - Associate with their desired status",
          tactics: [
            "Name-drop other prestigious investors who are interested",
            "Position opportunity as 'invite-only' for select investors",
            "Create sense that missing this would damage their reputation"
          ]
        },
        {
          vulnerability: "Prestige Addiction",
          description: "Prioritizes high-profile deals over fundamentally sound investments",
          sunTzu: "攻其無備，出其不意 - Strike where they don't expect",
          powerLaw: "Law 6: Court Attention at All Costs - Make the deal seem prestigious",
          tactics: [
            "Emphasize media coverage and PR potential of investment",
            "Highlight founder's prestigious background and connections",
            "Create opportunities for them to take credit publicly"
          ]
        },
        {
          vulnerability: "Competition Compulsion",
          description: "Cannot resist opportunities their peers are pursuing",
          sunTzu: "故善戰者，求之於勢 - The expert in war uses momentum",
          powerLaw: "Law 46: Never Appear Too Perfect - Let them 'win' the competition",
          tactics: [
            "Create competitive dynamics with other status-seeking investors",
            "Structure process to feel like exclusive access or victory",
            "Allow them to negotiate minor wins to feel superior"
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="shrine-void absolute inset-0"></div>
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
                and strategic persuasion protocol development. Each archetype represents distinct behavioral
                patterns with specific exploitation vectors and optimal engagement strategies.
              </p>
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
                    {expandedArchetype === archetype.name ? (
                      <ChevronDown className="w-5 h-5" style={{color: 'var(--matrix-green)'}} />
                    ) : (
                      <ChevronRight className="w-5 h-5" style={{color: 'var(--matrix-green)'}} />
                    )}
                  </button>

                  {/* Expandable Details */}
                  {expandedArchetype === archetype.name && (
                    <div className="px-6 pb-6 border-t border-white/10">
                      <div className="grid lg:grid-cols-3 gap-8 pt-6">
                        
                        {/* Core Profile */}
                        <div className="lg:col-span-1">
                          <h4 className="text-lg font-light mb-6">CORE MOTIVATIONS</h4>
                          <ul className="space-y-2 text-sm opacity-70">
                            {archetype.coreMotivations.map((motivation, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Target className="w-3 h-3 mt-1 flex-shrink-0" style={{color: 'var(--matrix-green)'}} />
                                {motivation}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Psychology Profile */}
                        <div className="lg:col-span-1">
                          <h4 className="text-lg font-light mb-6">PSYCHOLOGICAL PROFILE</h4>
                          <div className="space-y-4">
                            {Object.entries(archetype.psychologyProfile).map(([key, value]) => (
                              <div key={key} className="border-l-2 pl-4" style={{borderColor: 'var(--matrix-green)'}}>
                                <div className="text-xs uppercase tracking-wider opacity-60 mb-1">
                                  {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                                </div>
                                <div className="text-sm opacity-80">{value}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Strengths, Weaknesses & Vulnerabilities */}
                        <div className="lg:col-span-1">
                          <div className="space-y-6">
                            <div>
                              <h5 className="text-sm font-medium mb-3 opacity-80 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" style={{color: 'var(--matrix-green)'}} />
                                STRENGTHS
                              </h5>
                              <ul className="space-y-2 text-sm opacity-70">
                                {archetype.strengths.map((strength, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: 'var(--matrix-green)'}}></div>
                                    {strength}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h5 className="text-sm font-medium mb-3 opacity-80 flex items-center gap-2">
                                <XCircle className="w-4 h-4" style={{color: 'var(--matrix-green)'}} />
                                WEAKNESSES
                              </h5>
                              <ul className="space-y-2 text-sm opacity-70">
                                {archetype.weaknesses.map((weakness, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: 'var(--matrix-green)'}}></div>
                                    {weakness}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h5 className="text-sm font-medium mb-3 opacity-80 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" style={{color: 'var(--matrix-green)'}} />
                                STRATEGIC VULNERABILITIES
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
                                      <div className="font-medium mb-1">TACTICS:</div>
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
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </Authenticated>
    </div>
  );
}