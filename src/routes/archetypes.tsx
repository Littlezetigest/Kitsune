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
      vulnerabilities: [
        "FOMO on next big thing",
        "Ego-driven decision making",
        "Overconfidence in pattern recognition",
        "Dismissal of traditional metrics"
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
      vulnerabilities: [
        "Overwhelm with too much data",
        "Fear of missing 'obvious' opportunities",
        "Paralysis from conflicting metrics",
        "Imposter syndrome about intuition"
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
      vulnerabilities: [
        "Fear of loss of control",
        "Anxiety about unknown risks",
        "Perfectionism in risk mitigation",
        "Difficulty with ambiguous situations"
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
      vulnerabilities: [
        "Fear of missing prestigious opportunities",
        "Need for social validation",
        "Competition with peer investors",
        "Ego-driven decision making"
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
                                VULNERABILITIES
                              </h5>
                              <ul className="space-y-2 text-sm opacity-70">
                                {archetype.vulnerabilities.map((vulnerability, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: 'var(--matrix-green)'}}></div>
                                    {vulnerability}
                                  </li>
                                ))}
                              </ul>
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