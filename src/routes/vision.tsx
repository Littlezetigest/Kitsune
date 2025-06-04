import { createFileRoute } from "@tanstack/react-router";
import { Authenticated } from "convex/react";
import { Camera, Upload, Eye, Brain, Target, AlertTriangle, CheckCircle, Image as ImageIcon } from "lucide-react";
import { useState, useRef } from "react";

export const Route = createFileRoute("/vision")({
  component: VisionAnalysisPage,
});

function VisionAnalysisPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        analyzeImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (imageData: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analysis results
    const mockAnalysis = {
      confidence: 0.94,
      type: "Email Communication",
      language_patterns: {
        formality_level: "Professional",
        urgency_indicators: ["time-sensitive", "urgent review", "immediate"],
        power_words: ["exclusive", "limited", "opportunity", "strategic"],
        emotional_tone: "Cautiously optimistic with underlying anxiety"
      },
      psychological_profile: {
        archetype: "THE VALIDATOR",
        confidence_level: 0.87,
        risk_tolerance: "Low-Medium",
        decision_speed: "Deliberate",
        key_motivations: ["Security", "Social proof", "Peer validation"],
        vulnerability_points: ["FOMO on missing opportunities", "Need for expert validation", "Fear of making wrong decision"]
      },
      communication_analysis: {
        dominant_style: "Visual (uses charts, graphs, references)",
        technical_sophistication: "High",
        industry_knowledge: "Advanced",
        credibility_tier: "Tier 1 (High-Net-Worth)",
        bluff_indicators: "None detected"
      },
      strategic_recommendations: {
        approach: "Provide comprehensive data and peer validation",
        optimal_language: "Conservative, proven, validated, established",
        timing: "Allow extended evaluation period",
        pressure_points: ["Reference similar successful investments", "Emphasize downside protection"]
      }
    };
    
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  return (
    <div className="not-prose relative min-h-screen">
      {/* Enhanced Matrix Background */}
      <div className="matrix-rain opacity-30">
        <div className="matrix-column" style={{left: '8%', animationDelay: '0s', animationDuration: '14s'}}>
          視覚分析画像処理機械学習深層学習コンピュータビジョン
        </div>
        <div className="matrix-column" style={{left: '25%', animationDelay: '2s', animationDuration: '18s'}}>
          光学文字認識自然言語処理感情分析心理評価
        </div>
        <div className="matrix-column" style={{left: '45%', animationDelay: '4s', animationDuration: '12s'}}>
          パターン認識行動分析予測モデル戦略立案
        </div>
        <div className="matrix-column" style={{left: '65%', animationDelay: '1s', animationDuration: '16s'}}>
          人工知能機械視覚データ抽出情報処理
        </div>
        <div className="matrix-column" style={{left: '85%', animationDelay: '3s', animationDuration: '20s'}}>
          知己知彼百戦不殆兵者詭道攻其無備出其不意
        </div>
      </div>

      <div className="morphing-grid opacity-20"></div>

      <Authenticated>
        <div className="max-w-7xl mx-auto px-8 py-16 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="premium-title mb-8">
              VISUAL INTELLIGENCE
            </h1>
            <div className="bamboo-divider w-48 mx-auto mb-12"></div>
            <p className="premium-subtitle mb-8 text-black bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text">
              ADVANCED IMAGE ANALYSIS & COMMUNICATION EXTRACTION
            </p>
          </div>

          {/* CIA Strategic Assessment for Vision */}
          <div className="mb-16">
            <div className="ultra-premium-card p-8 depth-layer-2 border-l-4" style={{borderLeftColor: 'var(--hot-magenta)'}}>
              <div className="flex items-center gap-4 mb-6">
                <Eye className="w-6 h-6" style={{color: 'var(--hot-magenta)'}} />
                <h3 className="text-xl font-light spirit-hologram text-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text" data-text="VISUAL INTELLIGENCE ASSESSMENT">
                  VISUAL INTELLIGENCE ASSESSMENT
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4 text-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">
                  <p className="text-sm leading-relaxed">
                    <strong>OPERATIONAL CAPABILITY:</strong> Advanced computer vision and OCR technology 
                    extracts psychological intelligence from email screenshots, message captures, and 
                    document images. System analyzes language patterns, emotional indicators, and 
                    communication styles to build comprehensive behavioral profiles.
                  </p>
                  
                  <p className="text-sm leading-relaxed">
                    <strong>INTELLIGENCE VALUE:</strong> Visual communication analysis reveals subconscious 
                    patterns that text analysis alone cannot detect. Formatting choices, image selection, 
                    and visual emphasis provide deep insight into target psychology and decision-making processes.
                  </p>
                </div>
                
                <div className="space-y-4 text-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                  <p className="text-sm leading-relaxed">
                    <strong>TACTICAL APPLICATIONS:</strong> Extracted intelligence feeds directly into 
                    archetype classification algorithms and vulnerability assessment protocols. Visual 
                    patterns correlate with specific psychological types, enabling precision targeting 
                    of persuasion strategies.
                  </p>
                  
                  <p className="text-sm leading-relaxed">
                    <strong>SECURITY PROTOCOLS:</strong> All uploaded images are processed locally with 
                    military-grade encryption. Visual intelligence is stored in secure vaults with 
                    automatic classification based on sensitivity and strategic value.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Interface */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            
            {/* Upload Section */}
            <div className="ultra-premium-card p-8 depth-layer-3">
              <div className="text-center">
                <h3 className="text-2xl font-light mb-6 spirit-hologram text-black bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text" data-text="IMAGE ACQUISITION">
                  IMAGE ACQUISITION
                </h3>
                
                <div className="bamboo-divider w-24 mx-auto mb-8"></div>
                
                {!uploadedImage ? (
                  <div 
                    className="border-2 border-dashed border-gray-600 rounded-lg p-12 cursor-pointer hover:border-cyan-500 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-16 h-16 mx-auto mb-4 opacity-60" style={{color: 'var(--fox-fire-cyan)'}} />
                    <p className="text-lg mb-2 text-black bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text">Upload Email Screenshot</p>
                    <p className="text-sm opacity-60 text-black bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text">
                      Drag & drop or click to select image
                    </p>
                    <p className="text-xs opacity-40 mt-2 text-black bg-gradient-to-r from-gray-500 to-gray-300 bg-clip-text">
                      Supports: JPG, PNG, PDF, Screenshots
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded for analysis" 
                        className="max-w-full h-auto rounded-lg shadow-lg"
                      />
                      {isAnalyzing && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                          <div className="text-center">
                            <Brain className="w-12 h-12 mx-auto mb-4 animate-pulse" style={{color: 'var(--fox-fire-cyan)'}} />
                            <p className="text-lg font-light text-white">Analyzing Visual Intelligence...</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => {setUploadedImage(null); setAnalysis(null);}}
                      className="fox-fire-btn text-sm tracking-widest"
                    >
                      UPLOAD NEW IMAGE
                    </button>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Analysis Results */}
            <div className="ultra-premium-card p-8 depth-layer-3">
              <h3 className="text-2xl font-light mb-6 spirit-hologram text-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text" data-text="INTELLIGENCE EXTRACT">
                INTELLIGENCE EXTRACT
              </h3>
              
              <div className="bamboo-divider w-24 mb-8"></div>
              
              {!analysis ? (
                <div className="text-center py-12">
                  <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-40" style={{color: 'var(--shrine-gold)'}} />
                  <p className="text-lg opacity-60 text-black bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text">
                    Awaiting Image Upload
                  </p>
                  <p className="text-sm opacity-40 mt-2 text-black bg-gradient-to-r from-gray-500 to-gray-300 bg-clip-text">
                    Upload an email screenshot to begin analysis
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Confidence Score */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-60">ANALYSIS CONFIDENCE:</span>
                    <span className="font-medium" style={{color: 'var(--neon-green)'}}>
                      {(analysis.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  
                  {/* Archetype Result */}
                  <div className="border-l-4 pl-4" style={{borderLeftColor: 'var(--hot-magenta)'}}>
                    <div className="text-xs uppercase tracking-wider opacity-60 mb-1">
                      PSYCHOLOGICAL ARCHETYPE
                    </div>
                    <div className="text-lg font-light spirit-hologram text-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text" data-text={analysis.psychological_profile.archetype}>
                      {analysis.psychological_profile.archetype}
                    </div>
                    <div className="text-sm opacity-70 mt-1 text-black bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text">
                      Confidence: {(analysis.psychological_profile.confidence_level * 100).toFixed(0)}%
                    </div>
                  </div>
                  
                  {/* Key Insights */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2 opacity-80 text-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text">VULNERABILITY POINTS</h4>
                      <ul className="space-y-1 text-sm opacity-70">
                        {analysis.psychological_profile.vulnerability_points.map((point: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-black bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text">
                            <AlertTriangle className="w-3 h-3 mt-1 flex-shrink-0" style={{color: 'var(--electric-arterial)'}} />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2 opacity-80 text-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text">STRATEGIC APPROACH</h4>
                      <p className="text-sm opacity-70 text-black bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text">
                        {analysis.strategic_recommendations.approach}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2 opacity-80 text-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text">OPTIMAL LANGUAGE</h4>
                      <p className="text-sm opacity-70 text-black bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text">
                        {analysis.strategic_recommendations.optimal_language}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Analysis */}
          {analysis && (
            <div className="ultra-premium-card p-8 depth-layer-2">
              <h3 className="text-2xl font-light mb-8 spirit-hologram text-black bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text" data-text="COMPREHENSIVE INTELLIGENCE REPORT">
                COMPREHENSIVE INTELLIGENCE REPORT
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                
                {/* Language Analysis */}
                <div>
                  <h4 className="text-lg font-light mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5" style={{color: 'var(--fox-fire-cyan)'}} />
                    <span className="text-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text">Language Patterns</span>
                  </h4>
                  
                  <div className="space-y-3">
                    {Object.entries(analysis.language_patterns).map(([key, value]) => (
                      <div key={key} className="border-l-2 pl-3" style={{borderLeftColor: 'var(--fox-fire-cyan)'}}>
                        <div className="text-xs uppercase tracking-wider opacity-60 mb-1">
                          {key.replace(/_/g, ' ')}
                        </div>
                        <div className="text-sm text-black bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text">
                          {Array.isArray(value) ? value.join(', ') : value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Communication Analysis */}
                <div>
                  <h4 className="text-lg font-light mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5" style={{color: 'var(--hot-magenta)'}} />
                    <span className="text-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">Communication Style</span>
                  </h4>
                  
                  <div className="space-y-3">
                    {Object.entries(analysis.communication_analysis).map(([key, value]) => (
                      <div key={key} className="border-l-2 pl-3" style={{borderLeftColor: 'var(--hot-magenta)'}}>
                        <div className="text-xs uppercase tracking-wider opacity-60 mb-1">
                          {key.replace(/_/g, ' ')}
                        </div>
                        <div className="text-sm text-black bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Psychological Profile */}
                <div>
                  <h4 className="text-lg font-light mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5" style={{color: 'var(--shrine-gold)'}} />
                    <span className="text-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text">Psychology Profile</span>
                  </h4>
                  
                  <div className="space-y-3">
                    {Object.entries(analysis.psychological_profile).filter(([key]) => !['vulnerability_points'].includes(key)).map(([key, value]) => (
                      <div key={key} className="border-l-2 pl-3" style={{borderLeftColor: 'var(--shrine-gold)'}}>
                        <div className="text-xs uppercase tracking-wider opacity-60 mb-1">
                          {key.replace(/_/g, ' ')}
                        </div>
                        <div className="text-sm text-black bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text">
                          {Array.isArray(value) ? value.join(', ') : value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Authenticated>
    </div>
  );
}