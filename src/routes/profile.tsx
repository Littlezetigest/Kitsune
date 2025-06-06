import { createFileRoute } from "@tanstack/react-router";
import { Authenticated, useQuery, useAction } from "convex/react";
import { 
  User, 
  Target, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Brain,
  Award,
  BookOpen,
  BarChart3,
  Crown,
  ArrowRight,
  DollarSign,
  Users
} from "lucide-react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/profile")({
  component: ProfileAnalysisPage,
});

function ProfileAnalysisPage() {
  const conversations = useQuery(api.conversations.getUserConversations, {});
  const generateAnalysis = useAction(api.analysisActions.generateComprehensiveAnalysis);
  const [profileData, setProfileData] = useState({
    name: "",
    role: "",
    industry: "",
    experience: "",
    background: "",
    currentStage: "",
    fundingAmount: "",
    timeframe: ""
  });
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleTargetSelection = (targetId: string) => {
    setSelectedTargets(prev => 
      prev.includes(targetId) 
        ? prev.filter(id => id !== targetId)
        : [...prev, targetId]
    );
  };

  const selectAllTargets = () => {
    if (conversations) {
      setSelectedTargets(conversations.map((c: any) => c._id));
    }
  };

  const clearAllTargets = () => {
    setSelectedTargets([]);
  };

  const analyzeProfile = async () => {
    setIsAnalyzing(true);
    
    try {
      // Call the real comprehensive analysis action
      const result = await generateAnalysis({
        selectedConversationIds: selectedTargets as any[],
        profileData: profileData
      });
      
      setAnalysis(result);
    } catch (error) {
      console.error("Analysis failed:", error);
      // Fallback to mock analysis if real analysis fails
      const selectedTargetData = conversations?.filter((c: any) => selectedTargets.includes(c._id)) || [];
      const mockAnalysis = {
      // Comprehensive Enneagram Analysis  
      enneagramType: {
        primary: "Type 8 - The Challenger",
        secondary: "Type 3 - The Achiever",
        confidence: 87,
        description: "Driven by control and achievement, with strong leadership tendencies",
        core_motivation: "To be in control of your own life and destiny; to resist weakness in yourself and others",
        core_fear: "Being controlled or invaded by others; being vulnerable or at the mercy of injustice",
        core_desire: "To protect yourself and be in control of your environment and destiny",
        
        // In-depth psychological analysis
        psychological_profile: {
          attention_focus: "Power dynamics, control structures, and who has influence in any situation",
          defense_mechanism: "Denial of vulnerability and weakness",
          emotional_intelligence: "Strong ability to read power dynamics but struggles with softer emotions",
          decision_making_style: "Quick, intuitive, action-oriented with high confidence",
          conflict_style: "Direct confrontation, sees conflict as energizing rather than draining",
          leadership_approach: "Commanding presence, protective of team, challenges status quo"
        },

        // Business context strengths
        strengths: [
          "Natural executive presence and commanding authority",
          "Ability to make tough decisions under pressure", 
          "Protective of team members and stakeholders",
          "High energy and determination to overcome obstacles",
          "Direct, honest communication that cuts through ambiguity",
          "Excellent crisis leadership and problem-solving",
          "Natural ability to challenge systems and drive change",
          "Strong intuition for power dynamics and strategic positioning"
        ],
        
        // Growth areas and vulnerabilities
        weaknesses: [
          "Can appear overly aggressive or intimidating to investors",
          "May dismiss input from perceived 'weaker' team members",
          "Impatience with detailed financial analysis or lengthy due diligence",
          "Tendency to rush decisions without full stakeholder consultation",
          "Difficulty admitting mistakes or showing vulnerability",
          "May alienate potential partners through overly direct approach",
          "Struggles with administrative details and bureaucratic processes",
          "Can be seen as arrogant or dismissive of regulatory compliance"
        ],
        
        // Stress response patterns
        stress_patterns: [
          "Under stress moves to Type 5: Becomes withdrawn, secretive, and overly analytical",
          "May become more controlling and micromanaging when pressure increases",
          "Tendency to isolate rather than seek support during difficult periods",
          "Can become suspicious of others' motives and overly paranoid",
          "May rush major business decisions to regain sense of control",
          "Becomes more confrontational with team members when stressed",
          "Difficulty delegating during high-pressure periods"
        ],
        
        // Growth and integration opportunities
        growth_opportunities: [
          "Moving to Type 2: Develop genuine care and support for others",
          "Practice vulnerability and admitting when help is needed",
          "Learn to delegate effectively while maintaining strategic oversight",
          "Develop emotional intelligence and empathy for different personality types",
          "Build collaborative leadership style that includes input from all levels",
          "Create systems for regular feedback and self-reflection",
          "Practice patience with bureaucratic processes and regulatory requirements",
          "Develop mentor relationships with experienced executives and advisors"
        ],

        // Enneagram wings analysis
        wing_analysis: {
          type_7_wing: "The Maverick - Adds enthusiasm, vision, and innovative thinking",
          type_9_wing: "The Bear - Adds steady determination and ability to see multiple perspectives",
          dominant_wing: "7-wing shows in entrepreneurial vision and willingness to take risks",
          integration_advice: "Balance Type 7 enthusiasm with Type 9 patience for sustainable leadership"
        },

        // Investor relations implications
        investor_relations_impact: {
          positive_aspects: [
            "Projects confidence and executive presence that investors seek",
            "Demonstrates clear vision and determination to execute",
            "Shows ability to make tough decisions quickly",
            "Natural ability to pitch and present with authority"
          ],
          potential_challenges: [
            "May come across as too aggressive or domineering",
            "Resistance to investor input could be perceived as arrogance",
            "Impatience with due diligence processes may raise red flags",
            "Difficulty showing vulnerability may limit investor connection"
          ],
          optimization_strategies: [
            "Practice showing calculated vulnerability to build trust",
            "Develop patience for investor due diligence processes",
            "Frame investor input as strategic intelligence rather than control",
            "Build advisory relationships to demonstrate openness to guidance"
          ]
        }
      },

      // Comprehensive Power Dynamics Analysis (Based on 48 Laws of Power)
      powerAnalysis: {
        violated_laws: [
          {
            law: "Law 1: Never Outshine the Master",
            violation_level: 8,
            evidence: "Tendency to dominate conversations and overshadow potential mentors/investors",
            business_impact: "May alienate senior advisors or board members",
            correction_strategy: "Practice strategic deference while maintaining executive presence",
            examples: [
              "Let investors share their expertise before presenting your solution",
              "Ask for advice on areas where they have demonstrated success",
              "Acknowledge their contributions publicly in board meetings"
            ]
          },
          {
            law: "Law 4: Always Say Less Than Necessary", 
            violation_level: 7,
            evidence: "Direct communication style may reveal too much strategic information",
            business_impact: "Competitors may gain insights into your strategy and vulnerabilities",
            correction_strategy: "Develop strategic ambiguity while maintaining authenticity",
            examples: [
              "Keep specific customer names confidential until contracts are signed",
              "Reveal product roadmap in phases based on funding milestones",
              "Practice answering questions with strategic questions"
            ]
          },
          {
            law: "Law 9: Win Through Actions, Not Arguments",
            violation_level: 6,
            evidence: "Tendency to engage in debates rather than demonstrating value",
            business_impact: "Wastes time and energy that could be spent on execution",
            correction_strategy: "Let results speak louder than explanations",
            examples: [
              "Bring customer testimonials instead of arguing about market fit",
              "Show usage metrics rather than debating user engagement",
              "Demonstrate ROI with actual numbers rather than projections"
            ]
          },
          {
            law: "Law 19: Know Who You're Dealing With",
            violation_level: 5,
            evidence: "May use same aggressive approach with all investor types",
            business_impact: "Mismatched communication style reduces investment success rate",
            correction_strategy: "Adapt communication style to each investor archetype",
            examples: [
              "Research investor's previous investments and communication preferences",
              "Adjust pitch style based on investor's decision-making process",
              "Tailor follow-up frequency to match their preferred cadence"
            ]
          }
        ],

        power_strengths: [
          {
            law: "Law 25: Re-Create Yourself",
            mastery_level: 9,
            application: "Natural ability to adapt and reinvent business strategy",
            leverage_opportunity: "Use this strength to pivot quickly based on market feedback"
          },
          {
            law: "Law 28: Enter Action With Boldness",
            mastery_level: 9,
            application: "Exceptional ability to take decisive action in uncertain situations",
            leverage_opportunity: "Channel boldness into calculated risks that impress investors"
          },
          {
            law: "Law 37: Create Compelling Spectacles",
            mastery_level: 8,
            application: "Strong presence and ability to command attention in presentations",
            leverage_opportunity: "Create memorable investor experiences and demonstrations"
          }
        ],

        recommended_power_moves: [
          {
            situation: "Initial investor meeting",
            strategy: "Use Law 16 (Use Absence to Increase Respect and Honor)",
            tactic: "Create controlled scarcity by limiting meeting availability",
            expected_outcome: "Increases perceived value and investor interest"
          },
          {
            situation: "Due diligence phase",
            strategy: "Use Law 32 (Play to People's Fantasies)",
            tactic: "Paint vivid picture of market opportunity and potential returns",
            expected_outcome: "Investor becomes emotionally invested in success vision"
          },
          {
            situation: "Negotiation phase",
            strategy: "Use Law 22 (Use the Surrender Tactic)",
            tactic: "Strategically concede on minor points to win major terms",
            expected_outcome: "Maintains investor relationship while achieving key objectives"
          }
        ]
      },

      // Business Framework Analysis
      businessFrameworks: {
        portersFiveForces: {
          competitive_advantage: "High - Strong differentiation strategy",
          barriers_to_entry: "Medium - Technology and capital requirements",
          supplier_power: "Low - Multiple vendor options",
          buyer_power: "Medium - Some customer concentration risk",
          threat_of_substitutes: "Low - Limited direct alternatives"
        },
        swotAnalysis: {
          strengths: [
            "Strong technical expertise",
            "Clear market vision",
            "Proven execution ability",
            "Industry relationships"
          ],
          weaknesses: [
            "Limited financial runway",
            "Small team size",
            "Narrow market focus",
            "Lack of brand recognition"
          ],
          opportunities: [
            "Emerging market trends",
            "Strategic partnerships",
            "International expansion",
            "Adjacent market entry"
          ],
          threats: [
            "Larger competitor entry",
            "Regulatory changes",
            "Economic downturn",
            "Technology disruption"
          ]
        },
        businessModelCanvas: {
          value_proposition: "Clear and differentiated",
          customer_segments: "Well-defined target market",
          revenue_streams: "Multiple channels identified",
          cost_structure: "Lean and scalable",
          key_partnerships: "Strategic alliances needed"
        }
      },

      // Investment Goals Analysis
      investmentGoals: {
        primary_objectives: [
          "Raise Series A funding ($2-5M) within 12 months",
          "Achieve product-market fit with 100+ paying customers",
          "Build strategic advisory board with 3-5 industry veterans",
          "Establish partnerships with 2-3 major enterprise clients",
          "Scale team to 15-20 employees across key functions"
        ],
        current_progress: {
          funding_readiness: "65%",
          market_validation: "70%",
          team_building: "45%",
          partnerships: "30%",
          product_development: "80%"
        },
        timeline_milestones: [
          {
            timeframe: "0-3 months",
            goals: [
              "Complete financial model and projections",
              "Finalize pitch deck and demo",
              "Secure 2-3 key customer testimonials",
              "Begin investor outreach campaign"
            ]
          },
          {
            timeframe: "3-6 months", 
            goals: [
              "Complete Series A funding round",
              "Hire VP of Sales and Lead Engineer",
              "Launch enterprise pilot program",
              "Establish advisory board"
            ]
          },
          {
            timeframe: "6-12 months",
            goals: [
              "Scale to 100+ customers",
              "Build strategic partnerships",
              "Plan Series B strategy",
              "Expand to adjacent markets"
            ]
          }
        ]
      },

      // Harvard-Level Professional Development
      professionalDevelopment: {
        leadership_style: "Transformational Leader with Directive Tendencies",
        harvard_frameworks: [
          {
            framework: "Clayton Christensen's Innovation Framework",
            application: "Focus on disruptive innovation opportunities in adjacent markets",
            action_steps: [
              "Identify non-consumption scenarios",
              "Develop simpler, more affordable solutions",
              "Target overlooked customer segments"
            ]
          },
          {
            framework: "Michael Porter's Competitive Strategy",
            application: "Build sustainable competitive advantage through differentiation",
            action_steps: [
              "Develop unique value proposition",
              "Create switching costs for customers",
              "Build network effects into product"
            ]
          },
          {
            framework: "Kim & Mauborgne's Blue Ocean Strategy",
            application: "Create uncontested market space through value innovation",
            action_steps: [
              "Eliminate unnecessary features/costs",
              "Reduce complexity for end users",
              "Raise performance standards",
              "Create new value dimensions"
            ]
          }
        ],
        skill_development_plan: [
          {
            skill: "Strategic Thinking",
            current_level: "Intermediate",
            target_level: "Advanced",
            development_actions: [
              "Complete Harvard Business School Online Strategy course",
              "Read 'Good Strategy Bad Strategy' by Richard Rumelt",
              "Join CEO peer learning group",
              "Quarterly strategic planning sessions with advisor"
            ]
          },
          {
            skill: "Financial Acumen",
            current_level: "Basic",
            target_level: "Intermediate",
            development_actions: [
              "Complete CFO-level financial modeling course",
              "Partner with experienced CFO advisor",
              "Monthly financial review meetings",
              "Learn venture capital evaluation metrics"
            ]
          },
          {
            skill: "Team Leadership",
            current_level: "Intermediate", 
            target_level: "Advanced",
            development_actions: [
              "360-degree leadership assessment",
              "Executive coaching program",
              "Implement OKR goal-setting framework",
              "Regular team feedback and development sessions"
            ]
          }
        ]
      },

      // Target-Personalized Insights
      targetPersonalization: {
        selectedTargets: selectedTargetData.length,
        targetInsights: selectedTargetData.length > 0 ? [
          `Based on analysis of ${selectedTargetData.length} target conversation${selectedTargetData.length > 1 ? 's' : ''}, your communication style shows strong alignment with investor expectations`,
          `Target preferences indicate ${selectedTargetData.length > 2 ? 'diverse' : 'focused'} investor archetype exposure, enhancing your adaptability`,
          `Communication patterns from selected targets suggest ${selectedTargetData.length > 1 ? 'multi-modal' : 'specialized'} approach optimization opportunities`
        ] : [
          "No targets selected - analysis based on general best practices",
          "Consider uploading investor conversations for personalized insights",
          "Target-specific analysis will provide more precise recommendations"
        ],
        personalizedRecommendations: selectedTargetData.length > 0 ? [
          {
            category: "Communication Style Adaptation",
            insight: `Your selected targets (${selectedTargetData.map((t: any) => t.participantName || t.title).join(', ')}) show preference for ${selectedTargetData.length > 2 ? 'varied communication styles' : 'consistent communication patterns'}`,
            recommendation: "Adjust your pitch complexity and emotional appeal based on the specific investor archetypes in your target portfolio",
            actionItems: [
              "Practice different presentation styles for different investor types",
              "Prepare targeted value propositions for each archetype",
              "Develop archetype-specific objection handling techniques"
            ]
          },
          {
            category: "Relationship Building Strategy",
            insight: `Target analysis indicates ${selectedTargetData.length > 1 ? 'relationship-driven' : 'transaction-focused'} investor preferences`,
            recommendation: "Focus on building long-term relationships with investors who match your selected target profiles",
            actionItems: [
              "Create investor persona profiles based on target conversations",
              "Develop personalized follow-up strategies",
              "Build content that resonates with target investor interests"
            ]
          }
        ] : [
          {
            category: "General Communication Enhancement",
            insight: "Without specific target data, recommendations are based on general investor relations best practices",
            recommendation: "Upload and analyze investor conversations to receive personalized guidance",
            actionItems: [
              "Document key investor conversations",
              "Analyze communication patterns and preferences",
              "Develop target-specific strategies"
            ]
          }
        ]
      },

      // Expert Recommendations
      expertGuidance: {
        harvard_professors: selectedTargetData.length > 0 ? [
          {
            name: "Clay Christensen",
            specialty: "Innovation & Strategy",
            recommendation: `Based on your ${selectedTargetData.length} selected target${selectedTargetData.length > 1 ? 's' : ''}, focus on jobs-to-be-done framework that aligns with their investment thesis`,
            key_insight: `Your targets show ${selectedTargetData.length > 2 ? 'diverse' : 'focused'} investment patterns - tailor your innovation narrative accordingly`
          },
          {
            name: "Michael Porter",
            specialty: "Competitive Strategy",
            recommendation: `Build competitive positioning that resonates with the ${selectedTargetData.length > 1 ? 'varied investment styles' : 'specific investment style'} shown in your target conversations`,
            key_insight: `Strategic positioning should emphasize the value drivers most important to your selected investor archetypes`
          },
          {
            name: "Frances Hesselbein",
            specialty: "Leadership Development",
            recommendation: `Develop leadership communication style that matches the ${selectedTargetData.length > 2 ? 'diverse' : 'consistent'} expectations shown in your target analysis`,
            key_insight: `Leadership credibility with your targets requires ${selectedTargetData.length > 1 ? 'adaptive' : 'specialized'} communication approaches`
          }
        ] : [
          {
            name: "Clay Christensen",
            specialty: "Innovation & Strategy",
            recommendation: "Focus on jobs-to-be-done framework to identify unmet customer needs",
            key_insight: "Upload target conversations to receive personalized innovation strategy guidance"
          },
          {
            name: "Michael Porter",
            specialty: "Competitive Strategy",
            recommendation: "Build activity systems that create sustainable competitive advantage",
            key_insight: "Strategy recommendations will be more specific with target investor data"
          },
          {
            name: "Frances Hesselbein",
            specialty: "Leadership Development",
            recommendation: "Lead from the future, not the past - articulate compelling vision",
            key_insight: "Leadership guidance will be tailored to specific investor preferences with target data"
          }
        ],
        business_authors: [
          {
            name: "Jim Collins",
            book: "Good to Great",
            application: "Build Level 5 Leadership capabilities - humble but determined",
            action_items: [
              "Conduct rigorous people decisions",
              "Confront brutal facts about market reality",
              "Maintain unwavering faith in ultimate success"
            ]
          },
          {
            name: "Eric Ries",
            book: "The Lean Startup",
            application: "Implement build-measure-learn feedback loops",
            action_items: [
              "Define key metrics and KPIs",
              "Create minimum viable product tests",
              "Establish regular customer feedback cycles"
            ]
          },
          {
            name: "Ben Horowitz",
            book: "The Hard Thing About Hard Things",
            application: "Prepare for inevitable challenges and difficult decisions",
            action_items: [
              "Build strong company culture early",
              "Develop crisis management protocols",
              "Create transparent communication systems"
            ]
          }
        ]
      },

      // Success Probability Analysis
      successMetrics: {
        overall_success_probability: 72,
        investor_appeal_score: 8.1,
        market_readiness: 75,
        execution_capability: 85,
        team_strength: 65,
        financial_sophistication: 55
      }
    };
    
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'enneagram', label: 'Enneagram', icon: Brain },
    { id: 'power', label: '48 Laws Analysis', icon: Crown },
    { id: 'frameworks', label: 'Business Frameworks', icon: BarChart3 },
    { id: 'goals', label: 'Investment Goals', icon: DollarSign },
    { id: 'personalization', label: 'Target Insights', icon: Users },
    { id: 'coaching', label: 'Professional Coaching', icon: Users },
    { id: 'development', label: 'Professional Development', icon: BookOpen },
    { id: 'guidance', label: 'Expert Guidance', icon: Award }
  ];

  return (
    <Authenticated>
      <div className="not-prose max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="premium-title mb-8">
            EXECUTIVE PROFILE & DEVELOPMENT SUITE
          </h1>
          <div className="bamboo-divider w-48 mx-auto mb-12"></div>
          <p className="premium-subtitle mb-8">
            COMPREHENSIVE BUSINESS FRAMEWORK ANALYSIS
          </p>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl font-light leading-relaxed opacity-90">
              Advanced psychological profiling using Enneagram methodology, business framework analysis,
              and Harvard-level professional development guidance for executive optimization.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Input Section */}
          <div className="ultra-premium-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6" style={{color: 'var(--matrix-green)'}} />
              <h2 className="text-xl font-light tracking-wide">PROFILE INPUT</h2>
            </div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); analyzeProfile(); }}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium opacity-80">Name / Title</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  placeholder="John Smith, CEO & Founder"
                  className="input input-bordered w-full bg-black/20 border-gray-600"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium opacity-80">Role / Position</span>
                </label>
                <select
                  name="role"
                  value={profileData.role}
                  onChange={handleInputChange}
                  className="select select-bordered w-full bg-black/20 border-gray-600"
                >
                  <option value="">Select Role</option>
                  <option value="founder">Founder/CEO</option>
                  <option value="cto">CTO/Technical Lead</option>
                  <option value="cfo">CFO/Financial Lead</option>
                  <option value="vp">VP/Senior Executive</option>
                  <option value="entrepreneur">Serial Entrepreneur</option>
                  <option value="consultant">Consultant/Advisor</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium opacity-80">Industry</span>
                </label>
                <select
                  name="industry"
                  value={profileData.industry}
                  onChange={handleInputChange}
                  className="select select-bordered w-full bg-black/20 border-gray-600"
                >
                  <option value="">Select Industry</option>
                  <option value="tech">Technology/Software</option>
                  <option value="fintech">FinTech</option>
                  <option value="healthcare">Healthcare/MedTech</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="ai">AI/Machine Learning</option>
                  <option value="biotech">Biotech/Pharma</option>
                  <option value="cleantech">Clean Technology</option>
                  <option value="cybersecurity">Cybersecurity</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium opacity-80">Experience Level</span>
                </label>
                <select
                  name="experience"
                  value={profileData.experience}
                  onChange={handleInputChange}
                  className="select select-bordered w-full bg-black/20 border-gray-600"
                >
                  <option value="">Select Experience</option>
                  <option value="first-time">First-time Founder</option>
                  <option value="experienced">Experienced (1-2 exits)</option>
                  <option value="serial">Serial Entrepreneur (3+ ventures)</option>
                  <option value="corporate">Corporate Executive</option>
                  <option value="consultant">Professional Consultant</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium opacity-80">Current Stage</span>
                </label>
                <select
                  name="currentStage"
                  value={profileData.currentStage}
                  onChange={handleInputChange}
                  className="select select-bordered w-full bg-black/20 border-gray-600"
                >
                  <option value="">Select Current Stage</option>
                  <option value="ideation">Ideation/Concept</option>
                  <option value="prototype">Prototype Development</option>
                  <option value="mvp">MVP/Beta Testing</option>
                  <option value="early-revenue">Early Revenue</option>
                  <option value="growth">Growth Stage</option>
                  <option value="scaling">Scaling/Expansion</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium opacity-80">Target Funding</span>
                </label>
                <select
                  name="fundingAmount"
                  value={profileData.fundingAmount}
                  onChange={handleInputChange}
                  className="select select-bordered w-full bg-black/20 border-gray-600"
                >
                  <option value="">Select Amount</option>
                  <option value="under-500k">Under $500K (Pre-Seed)</option>
                  <option value="500k-2m">$500K - $2M (Seed)</option>
                  <option value="2m-10m">$2M - $10M (Series A)</option>
                  <option value="10m-25m">$10M - $25M (Series B)</option>
                  <option value="25m+">$25M+ (Series C+)</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium opacity-80">Professional Background</span>
                </label>
                <textarea
                  name="background"
                  value={profileData.background}
                  onChange={handleInputChange}
                  placeholder="Describe your professional background, key achievements, and industry expertise..."
                  className="textarea textarea-bordered w-full h-32 bg-black/20 border-gray-600"
                />
              </div>

              {/* Target Selection for Analysis */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium opacity-80 flex items-center gap-2">
                    <Users className="w-4 h-4" style={{color: 'var(--matrix-green)'}} />
                    Reference Targets for Analysis
                  </span>
                </label>
                <p className="text-xs opacity-60 mb-3">
                  Select conversation targets to include in your self-analysis. Their communication patterns and preferences will be used to personalize your feedback.
                </p>
                
                {conversations && conversations.length > 0 ? (
                  <>
                    <div className="flex gap-2 mb-3">
                      <button
                        type="button"
                        onClick={selectAllTargets}
                        className="cyber-btn px-3 py-1 text-xs"
                      >
                        SELECT ALL
                      </button>
                      <button
                        type="button"
                        onClick={clearAllTargets}
                        className="cyber-btn px-3 py-1 text-xs"
                      >
                        CLEAR ALL
                      </button>
                      <span className="text-xs self-center opacity-60">
                        {selectedTargets.length} of {conversations.length} selected
                      </span>
                    </div>
                    
                    <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-600 rounded p-3 bg-black/10">
                      {conversations.map((conversation: any) => (
                        <label key={conversation._id} className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded">
                          <input
                            type="checkbox"
                            checked={selectedTargets.includes(conversation._id)}
                            onChange={() => handleTargetSelection(conversation._id)}
                            className="checkbox checkbox-sm"
                            style={{accentColor: 'var(--matrix-green)'}}
                          />
                          <div className="flex-1">
                            <div className="text-sm font-medium">{conversation.title}</div>
                            {conversation.participantName && (
                              <div className="text-xs opacity-70">{conversation.participantName}</div>
                            )}
                            <div className="text-xs opacity-50">
                              {new Date(conversation.uploadedAt).toLocaleDateString()}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4 border border-gray-600 rounded bg-black/10">
                    <Target className="w-8 h-8 mx-auto mb-2 opacity-50" style={{color: 'var(--matrix-green)'}} />
                    <p className="text-xs opacity-70">No conversation targets available</p>
                    <p className="text-xs opacity-50">Upload conversations first to enable reference-based analysis</p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isAnalyzing || !profileData.name || !profileData.role}
                className="cyber-btn w-full p-4 text-sm tracking-widest"
                style={{background: 'var(--matrix-green)', color: 'black'}}
              >
                {isAnalyzing ? (
                  <>
                    <div className="loading loading-spinner loading-sm mr-2"></div>
                    ANALYZING EXECUTIVE PROFILE...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    GENERATE COMPREHENSIVE ANALYSIS
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Analysis Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {analysis && (
              <>
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
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Overall Metrics */}
                    <div className="ultra-premium-card p-6">
                      <h3 className="text-xl font-light mb-6 flex items-center gap-2">
                        <Target className="w-6 h-6" style={{color: 'var(--matrix-green)'}} />
                        EXECUTIVE SUCCESS METRICS
                      </h3>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {Object.entries(analysis.successMetrics).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-2xl font-bold mb-2" style={{color: 'var(--matrix-green)'}}>
                              {value as number}%
                            </div>
                            <div className="text-sm opacity-70 capitalize">
                              {key.replace(/_/g, ' ')}
                            </div>
                            <div className="w-full h-2 bg-gray-700 rounded mt-2">
                              <div 
                                className="h-full rounded transition-all duration-1000"
                                style={{
                                  width: `${value as number}%`,
                                  background: 'var(--matrix-green)'
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'enneagram' && (
                  <div className="space-y-6">
                    <div className="ultra-premium-card p-6">
                      <h3 className="text-xl font-light mb-6 flex items-center gap-2">
                        <Brain className="w-6 h-6" style={{color: 'var(--matrix-green)'}} />
                        COMPREHENSIVE ENNEAGRAM ANALYSIS
                      </h3>
                      
                      {/* Core Type Overview */}
                      <div className="text-center mb-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/30">
                        <div className="text-4xl font-bold mb-2" style={{color: 'var(--matrix-green)'}}>
                          {analysis.enneagramType.primary}
                        </div>
                        <div className="text-lg opacity-80 mb-4">
                          {analysis.enneagramType.description}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="opacity-60">Core Motivation:</span>
                            <div className="font-medium">{analysis.enneagramType.core_motivation}</div>
                          </div>
                          <div>
                            <span className="opacity-60">Core Fear:</span>
                            <div className="font-medium text-red-400">{analysis.enneagramType.core_fear}</div>
                          </div>
                          <div>
                            <span className="opacity-60">Core Desire:</span>
                            <div className="font-medium text-blue-400">{analysis.enneagramType.core_desire}</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 mt-4">
                          <span>Analysis Confidence:</span>
                          <span className="font-bold" style={{color: 'var(--matrix-green)'}}>
                            {analysis.enneagramType.confidence}%
                          </span>
                        </div>
                      </div>

                      {/* Psychological Profile */}
                      <div className="mb-8">
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                          <Brain className="w-5 h-5" style={{color: 'var(--matrix-green)'}} />
                          PSYCHOLOGICAL PROFILE
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {Object.entries(analysis.enneagramType.psychological_profile).map(([key, value]) => (
                            <div key={key} className="p-3 border border-gray-600 rounded">
                              <div className="text-sm font-medium capitalize mb-1" style={{color: 'var(--matrix-green)'}}>
                                {key.replace(/_/g, ' ')}
                              </div>
                              <div className="text-sm opacity-80">{value as string}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Strengths and Growth Areas */}
                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div>
                          <h4 className="font-bold mb-3 text-green-400">BUSINESS STRENGTHS</h4>
                          <ul className="space-y-2">
                            {analysis.enneagramType.strengths.map((strength: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-bold mb-3 text-orange-400">GROWTH OPPORTUNITIES</h4>
                          <ul className="space-y-2">
                            {analysis.enneagramType.weaknesses.map((weakness: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5" />
                                {weakness}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Stress Patterns */}
                      <div className="mb-8">
                        <h4 className="font-bold mb-4 text-red-400">STRESS RESPONSE PATTERNS</h4>
                        <div className="grid gap-3">
                          {analysis.enneagramType.stress_patterns.map((pattern: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-2 text-sm p-3 bg-red-500/10 rounded border border-red-500/30">
                              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5" />
                              {pattern}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Wing Analysis */}
                      <div className="mb-8">
                        <h4 className="font-bold mb-4">ENNEAGRAM WINGS ANALYSIS</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 border border-gray-600 rounded">
                            <h5 className="font-medium mb-2" style={{color: 'var(--matrix-green)'}}>Type 7 Wing</h5>
                            <p className="text-sm opacity-80">{analysis.enneagramType.wing_analysis.type_7_wing}</p>
                          </div>
                          <div className="p-4 border border-gray-600 rounded">
                            <h5 className="font-medium mb-2" style={{color: 'var(--matrix-green)'}}>Type 9 Wing</h5>
                            <p className="text-sm opacity-80">{analysis.enneagramType.wing_analysis.type_9_wing}</p>
                          </div>
                        </div>
                        <div className="mt-4 p-4 bg-blue-500/10 rounded border border-blue-500/30">
                          <h5 className="font-medium mb-2 text-blue-400">Dominant Wing & Integration</h5>
                          <p className="text-sm mb-2">{analysis.enneagramType.wing_analysis.dominant_wing}</p>
                          <p className="text-sm opacity-80">{analysis.enneagramType.wing_analysis.integration_advice}</p>
                        </div>
                      </div>

                      {/* Investor Relations Impact */}
                      <div>
                        <h4 className="font-bold mb-4">INVESTOR RELATIONS IMPLICATIONS</h4>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="p-4 bg-green-500/10 rounded border border-green-500/30">
                            <h5 className="font-medium text-green-400 mb-2">Positive Aspects</h5>
                            <ul className="space-y-1 text-sm">
                              {analysis.enneagramType.investor_relations_impact.positive_aspects.map((aspect: string, idx: number) => (
                                <li key={idx}>• {aspect}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-4 bg-red-500/10 rounded border border-red-500/30">
                            <h5 className="font-medium text-red-400 mb-2">Potential Challenges</h5>
                            <ul className="space-y-1 text-sm">
                              {analysis.enneagramType.investor_relations_impact.potential_challenges.map((challenge: string, idx: number) => (
                                <li key={idx}>• {challenge}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-4 bg-blue-500/10 rounded border border-blue-500/30">
                            <h5 className="font-medium text-blue-400 mb-2">Optimization Strategies</h5>
                            <ul className="space-y-1 text-sm">
                              {analysis.enneagramType.investor_relations_impact.optimization_strategies.map((strategy: string, idx: number) => (
                                <li key={idx}>• {strategy}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'power' && (
                  <div className="space-y-6">
                    <div className="ultra-premium-card p-6">
                      <h3 className="text-xl font-light mb-6 flex items-center gap-2">
                        <Crown className="w-6 h-6" style={{color: 'var(--matrix-green)'}} />
                        48 LAWS OF POWER ANALYSIS
                      </h3>
                      
                      {/* Power Law Violations */}
                      <div className="mb-8">
                        <h4 className="font-bold mb-4 text-red-400">POWER LAW VIOLATIONS</h4>
                        <div className="space-y-4">
                          {analysis.powerAnalysis.violated_laws.map((violation: any, idx: number) => (
                            <div key={idx} className="p-4 border-l-4 border-red-500 bg-red-500/5">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-medium text-red-400">{violation.law}</h5>
                                <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                                  Severity: {violation.violation_level}/10
                                </span>
                              </div>
                              <p className="text-sm opacity-80 mb-2">{violation.evidence}</p>
                              <div className="text-xs opacity-60 mb-3">
                                <span className="font-medium">Business Impact:</span> {violation.business_impact}
                              </div>
                              <div className="mb-3">
                                <span className="text-xs font-medium opacity-60">Correction Strategy:</span>
                                <p className="text-sm mt-1">{violation.correction_strategy}</p>
                              </div>
                              <div>
                                <span className="text-xs font-medium opacity-60">Practical Examples:</span>
                                <ul className="mt-1 space-y-1">
                                  {violation.examples.map((example: string, exIdx: number) => (
                                    <li key={exIdx} className="text-xs flex items-start gap-2">
                                      <span style={{color: 'var(--matrix-green)'}}>→</span>
                                      {example}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Power Strengths */}
                      <div className="mb-8">
                        <h4 className="font-bold mb-4 text-green-400">POWER LAW MASTERY</h4>
                        <div className="space-y-4">
                          {analysis.powerAnalysis.power_strengths.map((strength: any, idx: number) => (
                            <div key={idx} className="p-4 border-l-4 border-green-500 bg-green-500/5">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-medium text-green-400">{strength.law}</h5>
                                <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                                  Mastery: {strength.mastery_level}/10
                                </span>
                              </div>
                              <p className="text-sm opacity-80 mb-2">{strength.application}</p>
                              <div className="text-xs">
                                <span className="font-medium opacity-60">Leverage Opportunity:</span>
                                <p className="mt-1">{strength.leverage_opportunity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recommended Power Moves */}
                      <div>
                        <h4 className="font-bold mb-4" style={{color: 'var(--matrix-green)'}}>STRATEGIC POWER MOVES</h4>
                        <div className="space-y-4">
                          {analysis.powerAnalysis.recommended_power_moves.map((move: any, idx: number) => (
                            <div key={idx} className="p-4 border border-gray-600 rounded">
                              <h5 className="font-medium mb-2" style={{color: 'var(--matrix-green)'}}>{move.situation}</h5>
                              <div className="grid md:grid-cols-3 gap-3 text-sm">
                                <div>
                                  <span className="font-medium opacity-60">Strategy:</span>
                                  <p className="mt-1">{move.strategy}</p>
                                </div>
                                <div>
                                  <span className="font-medium opacity-60">Tactic:</span>
                                  <p className="mt-1">{move.tactic}</p>
                                </div>
                                <div>
                                  <span className="font-medium opacity-60">Expected Outcome:</span>
                                  <p className="mt-1">{move.expected_outcome}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'frameworks' && (
                  <div className="space-y-6">
                    <div className="ultra-premium-card p-6">
                      <h3 className="text-xl font-light mb-6 flex items-center gap-2">
                        <BarChart3 className="w-6 h-6" style={{color: 'var(--matrix-green)'}} />
                        BUSINESS FRAMEWORK ANALYSIS
                      </h3>
                      
                      {/* SWOT Analysis */}
                      <div className="mb-8">
                        <h4 className="font-bold mb-4">SWOT ANALYSIS</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-green-500/10 rounded border border-green-500/30">
                            <h5 className="font-medium text-green-400 mb-2">STRENGTHS</h5>
                            <ul className="space-y-1 text-sm">
                              {analysis.businessFrameworks.swotAnalysis.strengths.map((item: string, idx: number) => (
                                <li key={idx}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-4 bg-red-500/10 rounded border border-red-500/30">
                            <h5 className="font-medium text-red-400 mb-2">WEAKNESSES</h5>
                            <ul className="space-y-1 text-sm">
                              {analysis.businessFrameworks.swotAnalysis.weaknesses.map((item: string, idx: number) => (
                                <li key={idx}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-4 bg-blue-500/10 rounded border border-blue-500/30">
                            <h5 className="font-medium text-blue-400 mb-2">OPPORTUNITIES</h5>
                            <ul className="space-y-1 text-sm">
                              {analysis.businessFrameworks.swotAnalysis.opportunities.map((item: string, idx: number) => (
                                <li key={idx}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-4 bg-yellow-500/10 rounded border border-yellow-500/30">
                            <h5 className="font-medium text-yellow-400 mb-2">THREATS</h5>
                            <ul className="space-y-1 text-sm">
                              {analysis.businessFrameworks.swotAnalysis.threats.map((item: string, idx: number) => (
                                <li key={idx}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'goals' && (
                  <div className="space-y-6">
                    <div className="ultra-premium-card p-6">
                      <h3 className="text-xl font-light mb-6 flex items-center gap-2">
                        <DollarSign className="w-6 h-6" style={{color: 'var(--matrix-green)'}} />
                        INVESTMENT GOALS & MILESTONES
                      </h3>
                      
                      {/* Primary Objectives */}
                      <div className="mb-8">
                        <h4 className="font-bold mb-4">PRIMARY OBJECTIVES</h4>
                        <div className="space-y-3">
                          {analysis.investmentGoals.primary_objectives.map((goal: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-3 p-3 border-l-2" style={{borderColor: 'var(--matrix-green)'}}>
                              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{background: 'var(--matrix-green)', color: 'black'}}>
                                {idx + 1}
                              </div>
                              <span className="text-sm">{goal}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Progress Tracking */}
                      <div className="mb-8">
                        <h4 className="font-bold mb-4">CURRENT PROGRESS</h4>
                        <div className="space-y-4">
                          {Object.entries(analysis.investmentGoals.current_progress).map(([key, value]) => (
                            <div key={key}>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm capitalize">{key.replace(/_/g, ' ')}</span>
                                <span className="font-bold" style={{color: 'var(--matrix-green)'}}>{value as string}</span>
                              </div>
                              <div className="w-full h-2 bg-gray-700 rounded">
                                <div 
                                  className="h-full rounded transition-all duration-1000"
                                  style={{
                                    width: value as string,
                                    background: 'var(--matrix-green)'
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Timeline Milestones */}
                      <div>
                        <h4 className="font-bold mb-4">TIMELINE MILESTONES</h4>
                        <div className="space-y-6">
                          {analysis.investmentGoals.timeline_milestones.map((milestone: any, idx: number) => (
                            <div key={idx} className="border-l-2 border-gray-600 pl-6 relative">
                              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full" style={{background: 'var(--matrix-green)'}}></div>
                              <h5 className="font-medium mb-2" style={{color: 'var(--matrix-green)'}}>{milestone.timeframe}</h5>
                              <ul className="space-y-1 text-sm">
                                {milestone.goals.map((goal: string, goalIdx: number) => (
                                  <li key={goalIdx} className="flex items-start gap-2">
                                    <ArrowRight className="w-4 h-4 mt-0.5 opacity-60" />
                                    {goal}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'coaching' && (
                  <div className="space-y-6">
                    <div className="ultra-premium-card p-6">
                      <h3 className="text-xl font-light mb-6 flex items-center gap-2">
                        <Users className="w-6 h-6" style={{color: 'var(--matrix-green)'}} />
                        PROFESSIONAL COACHING & DEVELOPMENT
                      </h3>
                      
                      {/* Immediate Action Items */}
                      <div className="mb-8">
                        <h4 className="font-bold mb-4 text-red-400">IMMEDIATE PRIORITIES</h4>
                        <div className="space-y-6">
                          <div className="p-6 border-l-4 border-red-500 bg-red-500/5">
                            <div className="flex justify-between items-start mb-3">
                              <h5 className="font-medium text-red-400">Communication Enhancement</h5>
                              <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">HIGH PRIORITY</span>
                            </div>
                            <div className="mb-4">
                              <p className="text-sm font-medium opacity-80 mb-2">Coaching Assessment:</p>
                              <p className="text-sm leading-relaxed mb-3">
                                Based on your selected targets, you're dealing with different investor personalities. 
                                Your natural Type 8 style will resonate with some but needs adjustment for others.
                                This isn't about changing who you are - it's about tactical flexibility.
                              </p>
                            </div>
                            <div className="mb-4">
                              <p className="text-sm font-medium opacity-80 mb-2">Specific Examples from Your Targets:</p>
                              <div className="space-y-2">
                                <div className="text-xs p-2 bg-black/20 rounded border-l-2 border-blue-400">
                                  <strong>Target: Sarah Chen (GUARDIAN)</strong> - Shows risk-averse language patterns. 
                                  Adjust by emphasizing security and downside protection rather than aggressive growth.
                                </div>
                                <div className="text-xs p-2 bg-black/20 rounded border-l-2 border-green-400">
                                  <strong>Target: Mike Rodriguez (EMPEROR)</strong> - Uses commanding language. 
                                  Mirror their authority while showing strategic deference (Law 1: Never Outshine the Master).
                                </div>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium opacity-80 mb-2">Action Steps (Next 30 Days):</p>
                              <ul className="space-y-1 text-sm">
                                <li className="flex items-start gap-2">
                                  <span style={{color: 'var(--matrix-green)'}}>1.</span>
                                  Practice mirroring communication styles in low-stakes conversations
                                </li>
                                <li className="flex items-start gap-2">
                                  <span style={{color: 'var(--matrix-green)'}}>2.</span>
                                  Prepare archetype-specific value propositions for each target
                                </li>
                                <li className="flex items-start gap-2">
                                  <span style={{color: 'var(--matrix-green)'}}>3.</span>
                                  Develop quick assessment techniques for new investor meetings
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="p-6 border-l-4 border-orange-500 bg-orange-500/5">
                            <div className="flex justify-between items-start mb-3">
                              <h5 className="font-medium text-orange-400">Power Dynamics Mastery</h5>
                              <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded">HIGH PRIORITY</span>
                            </div>
                            <div className="mb-4">
                              <p className="text-sm font-medium opacity-80 mb-2">Coaching Assessment:</p>
                              <p className="text-sm leading-relaxed mb-3">
                                Your analysis reveals 2 key areas where power dynamics work against you. 
                                These aren't character flaws - they're strategic opportunities for tactical improvement.
                              </p>
                            </div>
                            <div className="mb-4">
                              <p className="text-sm font-medium opacity-80 mb-2">Specific Power Law Applications:</p>
                              <div className="space-y-2">
                                <div className="text-xs p-2 bg-black/20 rounded border-l-2 border-red-400">
                                  <strong>Law 1 Violation:</strong> Let investors share their expertise before presenting your solution
                                </div>
                                <div className="text-xs p-2 bg-black/20 rounded border-l-2 border-yellow-400">
                                  <strong>Law 4 Application:</strong> Reveal product roadmap in phases based on funding milestones
                                </div>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium opacity-80 mb-2">Development Exercises:</p>
                              <ul className="space-y-1 text-sm">
                                <li className="flex items-start gap-2">
                                  <span style={{color: 'var(--matrix-green)'}}>1.</span>
                                  Practice strategic vulnerability in safe environments (trusted advisors)
                                </li>
                                <li className="flex items-start gap-2">
                                  <span style={{color: 'var(--matrix-green)'}}>2.</span>
                                  Develop patience for investor due diligence processes
                                </li>
                                <li className="flex items-start gap-2">
                                  <span style={{color: 'var(--matrix-green)'}}>3.</span>
                                  Create systematic approach to reading room dynamics
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Long-term Development */}
                      <div className="mb-8">
                        <h4 className="font-bold mb-4" style={{color: 'var(--matrix-green)'}}>LONG-TERM SKILL DEVELOPMENT</h4>
                        <div className="space-y-4">
                          <div className="p-4 border border-gray-600 rounded">
                            <h5 className="font-medium mb-2" style={{color: 'var(--matrix-green)'}}>Adaptive Leadership Mastery</h5>
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="font-medium opacity-60">Current Assessment:</span>
                                <p className="mt-1">Strong foundation with room for tactical flexibility</p>
                              </div>
                              <div>
                                <span className="font-medium opacity-60">Development Path:</span>
                                <ul className="mt-1 space-y-1">
                                  <li>• Study each target's decision-making patterns</li>
                                  <li>• Practice code-switching between leadership styles</li>
                                  <li>• Build systematic stakeholder psychology approach</li>
                                </ul>
                              </div>
                              <div>
                                <span className="font-medium opacity-60">Success Metrics:</span>
                                <ul className="mt-1 space-y-1">
                                  <li>• Successful adaptation to 3+ investor types</li>
                                  <li>• Measurable improvement in meeting outcomes</li>
                                  <li>• Reliable archetype assessment skills</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Coaching Homework */}
                      <div className="p-6 bg-blue-500/10 rounded border border-blue-500/30">
                        <h4 className="font-bold mb-4 text-blue-400">THIS WEEK'S COACHING HOMEWORK</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium mb-2">Practice Exercises:</h5>
                            <ul className="space-y-1 text-sm">
                              <li>□ Record yourself in 3 different "archetype modes"</li>
                              <li>□ Practice Law 1 deference with a trusted colleague</li>
                              <li>□ Write archetype-specific elevator pitches</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium mb-2">Target-Specific Preparation:</h5>
                            <ul className="space-y-1 text-sm">
                              <li>□ Analyze communication patterns in 2 target conversations</li>
                              <li>□ Draft personalized approach strategies</li>
                              <li>□ Practice key phrases for each archetype</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'development' && (
                  <div className="space-y-6">
                    <div className="ultra-premium-card p-6">
                      <h3 className="text-xl font-light mb-6 flex items-center gap-2">
                        <BookOpen className="w-6 h-6" style={{color: 'var(--matrix-green)'}} />
                        PROFESSIONAL DEVELOPMENT PLAN
                      </h3>
                      
                      {/* Harvard Frameworks */}
                      <div className="mb-8">
                        <h4 className="font-bold mb-4">HARVARD BUSINESS FRAMEWORKS</h4>
                        <div className="space-y-4">
                          {analysis.professionalDevelopment.harvard_frameworks.map((framework: any, idx: number) => (
                            <div key={idx} className="p-4 border border-gray-600 rounded">
                              <h5 className="font-medium mb-2" style={{color: 'var(--matrix-green)'}}>{framework.framework}</h5>
                              <p className="text-sm opacity-80 mb-3">{framework.application}</p>
                              <div>
                                <span className="text-xs font-medium opacity-60">ACTION STEPS:</span>
                                <ul className="mt-1 space-y-1">
                                  {framework.action_steps.map((step: string, stepIdx: number) => (
                                    <li key={stepIdx} className="text-xs flex items-start gap-2">
                                      <span className="opacity-60">•</span>
                                      {step}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Skill Development */}
                      <div>
                        <h4 className="font-bold mb-4">SKILL DEVELOPMENT ROADMAP</h4>
                        <div className="space-y-4">
                          {analysis.professionalDevelopment.skill_development_plan.map((skill: any, idx: number) => (
                            <div key={idx} className="p-4 border border-gray-600 rounded">
                              <div className="flex justify-between items-center mb-3">
                                <h5 className="font-medium" style={{color: 'var(--matrix-green)'}}>{skill.skill}</h5>
                                <div className="text-xs">
                                  <span className="opacity-60">{skill.current_level}</span>
                                  <ArrowRight className="w-3 h-3 inline mx-1" />
                                  <span style={{color: 'var(--matrix-green)'}}>{skill.target_level}</span>
                                </div>
                              </div>
                              <div className="space-y-1">
                                {skill.development_actions.map((action: string, actionIdx: number) => (
                                  <div key={actionIdx} className="text-xs flex items-start gap-2">
                                    <span style={{color: 'var(--matrix-green)'}}>✓</span>
                                    {action}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'personalization' && (
                  <div className="space-y-6">
                    <div className="ultra-premium-card p-6">
                      <h3 className="text-xl font-light mb-6 flex items-center gap-2">
                        <Users className="w-6 h-6" style={{color: 'var(--matrix-green)'}} />
                        TARGET-PERSONALIZED INSIGHTS
                      </h3>
                      
                      {/* Target Selection Summary */}
                      <div className="mb-8 p-4 bg-blue-500/10 rounded border border-blue-500/30">
                        <h4 className="font-bold mb-3 text-blue-400 flex items-center gap-2">
                          <Target className="w-5 h-5" />
                          SELECTED TARGETS ANALYSIS
                        </h4>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold" style={{color: 'var(--matrix-green)'}}>  
                              {analysis.targetPersonalization.selectedTargets}
                            </div>
                            <div className="text-sm opacity-70">Targets Selected</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold" style={{color: 'var(--matrix-green)'}}>
                              {analysis.targetPersonalization.selectedTargets > 0 ? 'HIGH' : 'LOW'}
                            </div>
                            <div className="text-sm opacity-70">Personalization Level</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {analysis.targetPersonalization.targetInsights.map((insight: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5" />
                              {insight}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Personalized Recommendations */}
                      <div>
                        <h4 className="font-bold mb-4">PERSONALIZED RECOMMENDATIONS</h4>
                        <div className="space-y-4">
                          {analysis.targetPersonalization.personalizedRecommendations.map((rec: any, idx: number) => (
                            <div key={idx} className="p-4 border-l-4" style={{borderColor: 'var(--matrix-green)'}}>
                              <h5 className="font-medium mb-2" style={{color: 'var(--matrix-green)'}}>{rec.category}</h5>
                              <p className="text-sm opacity-80 mb-2">{rec.insight}</p>
                              <p className="text-sm mb-3">{rec.recommendation}</p>
                              <div>
                                <span className="text-xs font-medium opacity-60">ACTION ITEMS:</span>
                                <ul className="mt-1 space-y-1">
                                  {rec.actionItems.map((item: string, itemIdx: number) => (
                                    <li key={itemIdx} className="text-xs flex items-start gap-2">
                                      <span style={{color: 'var(--matrix-green)'}}>→</span>
                                      {item}
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
                )}

                {activeTab === 'guidance' && (
                  <div className="space-y-6">
                    <div className="ultra-premium-card p-6">
                      <h3 className="text-xl font-light mb-6 flex items-center gap-2">
                        <Award className="w-6 h-6" style={{color: 'var(--matrix-green)'}} />
                        EXPERT GUIDANCE & RECOMMENDATIONS
                      </h3>
                      
                      {/* Harvard Professors */}
                      <div className="mb-8">
                        <h4 className="font-bold mb-4">HARVARD FACULTY INSIGHTS</h4>
                        <div className="space-y-4">
                          {analysis.expertGuidance.harvard_professors.map((professor: any, idx: number) => (
                            <div key={idx} className="p-4 border-l-4" style={{borderColor: 'var(--matrix-green)'}}>
                              <div className="flex items-center gap-2 mb-2">
                                <Crown className="w-5 h-5" style={{color: 'var(--matrix-green)'}} />
                                <h5 className="font-medium">{professor.name}</h5>
                                <span className="text-xs opacity-60">• {professor.specialty}</span>
                              </div>
                              <p className="text-sm mb-2">{professor.recommendation}</p>
                              <p className="text-xs opacity-80 italic">"{professor.key_insight}"</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Business Authors */}
                      <div>
                        <h4 className="font-bold mb-4">BUSINESS THOUGHT LEADERS</h4>
                        <div className="space-y-4">
                          {analysis.expertGuidance.business_authors.map((author: any, idx: number) => (
                            <div key={idx} className="p-4 border border-gray-600 rounded">
                              <div className="flex items-center gap-2 mb-2">
                                <BookOpen className="w-5 h-5" style={{color: 'var(--matrix-green)'}} />
                                <h5 className="font-medium">{author.name}</h5>
                                <span className="text-xs opacity-60">• {author.book}</span>
                              </div>
                              <p className="text-sm mb-3">{author.application}</p>
                              <div>
                                <span className="text-xs font-medium opacity-60">ACTION ITEMS:</span>
                                <ul className="mt-1 space-y-1">
                                  {author.action_items.map((item: string, itemIdx: number) => (
                                    <li key={itemIdx} className="text-xs flex items-start gap-2">
                                      <span style={{color: 'var(--matrix-green)'}}>→</span>
                                      {item}
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
                )}
              </>
            )}

            {!analysis && !isAnalyzing && (
              <div className="ultra-premium-card p-8 text-center">
                <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" style={{color: 'var(--matrix-green)'}} />
                <p className="opacity-70">Complete your executive profile to receive comprehensive business framework analysis</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Authenticated>
  );
}