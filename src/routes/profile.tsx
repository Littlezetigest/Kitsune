import { createFileRoute } from "@tanstack/react-router";
import { Authenticated, useQuery } from "convex/react";
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
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Get selected target data for personalization
    const selectedTargetData = conversations?.filter((c: any) => selectedTargets.includes(c._id)) || [];
    
    // Comprehensive business framework analysis with target personalization
    const mockAnalysis = {
      // Enneagram Analysis
      enneagramType: {
        primary: "Type 8 - The Challenger",
        secondary: "Type 3 - The Achiever",
        confidence: 87,
        description: "Driven by control and achievement, with strong leadership tendencies",
        strengths: [
          "Natural leadership and confidence",
          "Direct communication style", 
          "High energy and determination",
          "Ability to make tough decisions"
        ],
        weaknesses: [
          "Can appear overly aggressive",
          "May dismiss others' opinions",
          "Impatience with slower processes",
          "Tendency to micromanage"
        ],
        stress_patterns: [
          "Becomes more controlling under pressure",
          "May alienate team members when stressed",
          "Rushes decisions without full consultation"
        ],
        growth_opportunities: [
          "Develop emotional intelligence",
          "Practice active listening",
          "Learn to delegate effectively",
          "Build collaborative leadership style"
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
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'enneagram', label: 'Enneagram', icon: Brain },
    { id: 'frameworks', label: 'Business Frameworks', icon: BarChart3 },
    { id: 'goals', label: 'Investment Goals', icon: DollarSign },
    { id: 'personalization', label: 'Target Insights', icon: Users },
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
                        ENNEAGRAM PERSONALITY ANALYSIS
                      </h3>
                      
                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold mb-2" style={{color: 'var(--matrix-green)'}}>
                          {analysis.enneagramType.primary}
                        </div>
                        <div className="text-lg opacity-80 mb-4">
                          {analysis.enneagramType.description}
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <span>Confidence:</span>
                          <span className="font-bold" style={{color: 'var(--matrix-green)'}}>
                            {analysis.enneagramType.confidence}%
                          </span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold mb-3 text-green-400">STRENGTHS</h4>
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
                          <h4 className="font-bold mb-3 text-orange-400">GROWTH AREAS</h4>
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