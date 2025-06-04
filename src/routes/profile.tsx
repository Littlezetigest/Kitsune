import { createFileRoute } from "@tanstack/react-router";
import { Authenticated } from "convex/react";
import { User, Target, Shield, AlertTriangle, CheckCircle, TrendingUp, Brain, Zap } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/profile")({
  component: ProfileAnalysisPage,
});

function ProfileAnalysisPage() {
  const [profileData, setProfileData] = useState({
    name: "",
    role: "",
    industry: "",
    experience: "",
    communication_style: "",
    goals: "",
    background: ""
  });
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const analyzeProfile = async () => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock comprehensive profile analysis
    const mockAnalysis = {
      overall_rating: 7.2,
      investor_appeal: "Medium-High",
      credibility_score: 8.1,
      risk_factors: [
        "Limited track record in stated industry",
        "Communication style may appear too aggressive for conservative investors",
        "Lack of specific financial metrics in presentation"
      ],
      strengths: [
        "Clear articulation of value proposition",
        "Strong technical background",
        "Demonstrates market awareness",
        "Confident presentation style"
      ],
      investor_perception: {
        first_impression: "Professional but needs refinement",
        trust_level: "Moderate - requires validation",
        investment_readiness: "65%",
        archetype_match: "THE VALIDATOR - Seeks proof and social validation"
      },
      recommendations: {
        immediate: [
          "Prepare 3-5 concrete success metrics",
          "Develop customer testimonials",
          "Create more conservative financial projections"
        ],
        strategic: [
          "Build advisory board with industry veterans",
          "Establish partnerships with recognized brands",
          "Focus on risk mitigation strategies"
        ]
      },
      communication_optimization: {
        tone: "Reduce urgency, increase confidence",
        language: "Use more data-driven terminology",
        presentation: "Lead with problem validation, not solution",
        body_language: "Maintain eye contact, slower speech pace"
      },
      archetype_strategy: {
        primary_approach: "Evidence-based presentation with testimonials",
        key_phrases: [
          "Our data shows...",
          "Industry leaders confirm...", 
          "Multiple customers have validated...",
          "Conservative projections indicate..."
        ],
        avoid_phrases: [
          "Revolutionary breakthrough",
          "Guaranteed returns",
          "No competition",
          "Can't fail"
        ]
      }
    };
    
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  return (
    <Authenticated>
      <div className="not-prose max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light mb-4 tracking-wider brush-stroke-text">YOUR INVESTOR PROFILE</h1>
          <div className="artistic-divider w-24 mx-auto mb-6"></div>
          <p className="text-base-content/70 font-light leading-relaxed max-w-3xl mx-auto">
            Analyze how investors perceive you as a communicator. Understand your strengths, 
            vulnerabilities, and optimization strategies for maximum investment appeal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Input Section */}
          <div className="cyber-shrine-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-fox-fire-cyan" />
              <h2 className="text-xl font-light tracking-wide cia-text">PROFILE INPUT</h2>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); analyzeProfile(); }}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text cia-text">Name / Title</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  placeholder="John Smith, CEO"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text cia-text">Role / Position</span>
                </label>
                <select
                  name="role"
                  value={profileData.role}
                  onChange={handleInputChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Role</option>
                  <option value="founder">Founder/CEO</option>
                  <option value="cto">CTO/Technical Lead</option>
                  <option value="vp">VP/Senior Manager</option>
                  <option value="entrepreneur">Serial Entrepreneur</option>
                  <option value="consultant">Consultant/Advisor</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text cia-text">Industry</span>
                </label>
                <select
                  name="industry"
                  value={profileData.industry}
                  onChange={handleInputChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Industry</option>
                  <option value="tech">Technology/Software</option>
                  <option value="fintech">FinTech</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="ai">AI/Machine Learning</option>
                  <option value="biotech">Biotech</option>
                  <option value="cleantech">Clean Technology</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text cia-text">Experience Level</span>
                </label>
                <select
                  name="experience"
                  value={profileData.experience}
                  onChange={handleInputChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Experience</option>
                  <option value="first-time">First-time Founder</option>
                  <option value="experienced">Experienced (1-2 exits)</option>
                  <option value="serial">Serial Entrepreneur (3+ ventures)</option>
                  <option value="corporate">Corporate Executive</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text cia-text">Communication Style</span>
                </label>
                <textarea
                  name="communication_style"
                  value={profileData.communication_style}
                  onChange={handleInputChange}
                  placeholder="Describe how you typically communicate in business settings..."
                  className="textarea textarea-bordered w-full h-24"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text cia-text">Investment Goals</span>
                </label>
                <textarea
                  name="goals"
                  value={profileData.goals}
                  onChange={handleInputChange}
                  placeholder="What are you seeking from investors? (funding amount, partnerships, etc.)"
                  className="textarea textarea-bordered w-full h-24"
                />
              </div>

              <button
                type="submit"
                disabled={isAnalyzing || !profileData.name || !profileData.role}
                className="fox-fire-btn w-full p-4 text-sm tracking-widest"
              >
                {isAnalyzing ? (
                  <>
                    <div className="loading loading-spinner loading-sm mr-2"></div>
                    ANALYZING PROFILE...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    GENERATE INVESTOR ANALYSIS
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Analysis Results Section */}
          <div className="space-y-6">
            {analysis && (
              <>
                {/* Overall Rating */}
                <div className="cyber-shrine-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-6 h-6 text-hot-magenta" />
                    <h3 className="text-xl font-light tracking-wide cia-text">INVESTOR APPEAL RATING</h3>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-fox-fire-cyan">
                      {analysis.overall_rating}/10
                    </div>
                    <div className="badge badge-outline text-lg px-4 py-2">
                      {analysis.investor_appeal}
                    </div>
                    <div className="progress progress-primary w-full">
                      <div 
                        className="progress-bar bg-fox-fire-cyan" 
                        style={{ width: `${(analysis.overall_rating / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Strengths */}
                <div className="cyber-shrine-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-5 h-5 text-fox-fire-cyan" />
                    <h4 className="font-light tracking-wide cia-text">STRENGTHS</h4>
                  </div>
                  <ul className="space-y-2">
                    {analysis.strengths.map((strength: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-fox-fire-cyan mt-1">▸</span>
                        <span className="cia-text">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Risk Factors */}
                <div className="cyber-shrine-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-5 h-5 text-hot-magenta" />
                    <h4 className="font-light tracking-wide cia-text">RISK FACTORS</h4>
                  </div>
                  <ul className="space-y-2">
                    {analysis.risk_factors.map((risk: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-hot-magenta mt-1">⚠</span>
                        <span className="cia-text">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {!analysis && !isAnalyzing && (
              <div className="cyber-shrine-card p-8 text-center">
                <Shield className="w-12 h-12 text-fox-fire-cyan/50 mx-auto mb-4" />
                <p className="cia-text opacity-70">Complete your profile to receive CIA-level analysis of your investor appeal</p>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Analysis */}
        {analysis && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Communication Optimization */}
            <div className="cyber-shrine-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-shrine-gold" />
                <h4 className="font-light tracking-wide cia-text">COMMUNICATION OPTIMIZATION</h4>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold text-fox-fire-cyan">Tone:</span>
                  <span className="cia-text ml-2">{analysis.communication_optimization.tone}</span>
                </div>
                <div>
                  <span className="font-semibold text-fox-fire-cyan">Language:</span>
                  <span className="cia-text ml-2">{analysis.communication_optimization.language}</span>
                </div>
                <div>
                  <span className="font-semibold text-fox-fire-cyan">Presentation:</span>
                  <span className="cia-text ml-2">{analysis.communication_optimization.presentation}</span>
                </div>
              </div>
            </div>

            {/* Strategic Phrases */}
            <div className="cyber-shrine-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-5 h-5 text-shrine-gold" />
                <h4 className="font-light tracking-wide cia-text">STRATEGIC PHRASES</h4>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-fox-fire-cyan text-sm mb-2">USE THESE:</h5>
                  <div className="space-y-1">
                    {analysis.archetype_strategy.key_phrases.map((phrase: string, index: number) => (
                      <div key={index} className="text-xs bg-fox-fire-cyan/10 p-2 rounded border border-fox-fire-cyan/30">
                        <span className="cia-text">"{phrase}"</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-hot-magenta text-sm mb-2">AVOID THESE:</h5>
                  <div className="space-y-1">
                    {analysis.archetype_strategy.avoid_phrases.map((phrase: string, index: number) => (
                      <div key={index} className="text-xs bg-hot-magenta/10 p-2 rounded border border-hot-magenta/30">
                        <span className="cia-text">"{phrase}"</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="cyber-shrine-card p-6 lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-5 h-5 text-hot-magenta" />
                <h4 className="font-light tracking-wide cia-text">STRATEGIC RECOMMENDATIONS</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-fox-fire-cyan mb-3">IMMEDIATE ACTIONS:</h5>
                  <ul className="space-y-2">
                    {analysis.recommendations.immediate.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-fox-fire-cyan mt-1">1.</span>
                        <span className="cia-text">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-semibold text-shrine-gold mb-3">STRATEGIC INITIATIVES:</h5>
                  <ul className="space-y-2">
                    {analysis.recommendations.strategic.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-shrine-gold mt-1">◆</span>
                        <span className="cia-text">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Authenticated>
  );
}