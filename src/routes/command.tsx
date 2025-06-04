import { createFileRoute, Link } from "@tanstack/react-router";
import { Authenticated } from "convex/react";
import { Eye, Shield, Target, Brain, Zap, Users, Crown, Gem, ChevronRight, Lock, Unlock } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/command")({
  component: CommandCenterPage,
});

function CommandCenterPage() {
  const [accessLevel, setAccessLevel] = useState<'CLASSIFIED' | 'SECRET' | 'TOP_SECRET'>('CLASSIFIED');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
    setAccessLevel('TOP_SECRET');
  };

  const modules = [
    {
      name: "TARGET DOSSIERS",
      description: "Active investor intelligence files",
      icon: Target,
      route: "/",
      classification: "SECRET",
      threat_level: "MEDIUM",
      color: "var(--fox-fire-cyan)"
    },
    {
      name: "ARCHETYPE ANALYSIS",
      description: "Psychological warfare profiles",
      icon: Brain,
      route: "/archetypes",
      classification: "TOP_SECRET",
      threat_level: "HIGH",
      color: "var(--hot-magenta)"
    },
    {
      name: "INTEL ACQUISITION",
      description: "Upload and process new intelligence",
      icon: Shield,
      route: "/upload",
      classification: "SECRET",
      threat_level: "LOW",
      color: "var(--shrine-gold)"
    },
    {
      name: "COMBAT SIMULATION",
      description: "Strategic conversation modeling",
      icon: Zap,
      route: "/simulator",
      classification: "TOP_SECRET",
      threat_level: "HIGH",
      color: "var(--neon-green)"
    },
    {
      name: "IMAGE ANALYSIS",
      description: "Visual intelligence processing",
      icon: Eye,
      route: "/vision",
      classification: "TOP_SECRET",
      threat_level: "CRITICAL",
      color: "var(--electric-arterial)"
    }
  ];

  const artOfWarQuotes = [
    "知己知彼，百戦不殆",
    "兵者，詭道也",
    "故善戦者，求之於勢",
    "攻其無備，出其不意",
    "兵貴勝，不貴久",
    "上兵伐謀，其次伐交",
    "善戦者，立於不敗之地",
    "故兵無常勢，水無常形"
  ];

  return (
    <div className="not-prose relative min-h-screen overflow-hidden">
      {/* Enhanced Matrix Background with Art of War */}
      <div className="matrix-rain opacity-40">
        {Array.from({length: 15}).map((_, i) => (
          <div 
            key={i}
            className="matrix-column" 
            style={{
              left: `${(i + 1) * 6.67}%`, 
              animationDelay: `${Math.random() * 5}s`, 
              animationDuration: `${8 + Math.random() * 12}s`
            }}
          >
            {artOfWarQuotes[Math.floor(Math.random() * artOfWarQuotes.length)]}
            戦略心理分析評価システム認知バイアス感情脆弱性
            投資家プロファイル行動パターン説得技術
            情報収集分析処理心理戦術神経言語学
            {artOfWarQuotes[Math.floor(Math.random() * artOfWarQuotes.length)]}
          </div>
        ))}
      </div>

      {/* Morphing Strategic Grid */}
      <div className="morphing-grid opacity-30"></div>

      {/* Particle Command Field */}
      <div className="particle-field">
        {Array.from({length: 80}).map((_, i) => (
          <div 
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`
            }}
          />
        ))}
      </div>

      <Authenticated>
        <div className="relative z-10 min-h-screen flex flex-col">
          
          {/* CIA-Style Header */}
          <div className="text-center pt-16 pb-12">
            <div className="ultra-premium-card py-8 px-12 max-w-4xl mx-auto mb-8 depth-layer-1">
              <div className="flex items-center justify-center gap-4 mb-6">
                {isAuthenticated ? (
                  <Unlock className="w-8 h-8" style={{color: 'var(--neon-green)'}} />
                ) : (
                  <Lock className="w-8 h-8" style={{color: 'var(--electric-arterial)'}} />
                )}
                <div className="text-xs tracking-[0.3em] opacity-60">
                  CLASSIFICATION: {accessLevel}
                </div>
              </div>
              
              <h1 className="premium-title mb-6">
                OPERATION KITSUNE
              </h1>
              
              <div className="bamboo-divider w-48 mx-auto mb-8"></div>
              
              <div className="premium-subtitle mb-8 text-black bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                PSYCHOLOGICAL WARFARE COMMAND CENTER
              </div>
              
              {!isAuthenticated && (
                <button 
                  onClick={handleAuthentication}
                  className="fox-fire-btn text-lg tracking-widest px-8 py-4 mb-6"
                >
                  AUTHENTICATE CLEARANCE
                </button>
              )}
            </div>
          </div>

          {/* CIA Strategist Evaluation Box */}
          <div className="max-w-7xl mx-auto px-8 mb-16">
            <div className="ultra-premium-card p-8 depth-layer-2 border-l-4" style={{borderLeftColor: 'var(--electric-arterial)'}}>
              <div className="flex items-center gap-4 mb-6">
                <Brain className="w-6 h-6" style={{color: 'var(--electric-arterial)'}} />
                <h3 className="text-xl font-light spirit-hologram text-black bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text" data-text="CIA STRATEGIC ASSESSMENT">
                  CIA STRATEGIC ASSESSMENT
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4 text-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                  <p className="text-sm leading-relaxed">
                    <strong>OPERATIONAL OVERVIEW:</strong> This command center represents the most advanced 
                    psychological warfare platform ever developed for investor intelligence. Each module 
                    has been designed to exploit specific cognitive vulnerabilities identified through 
                    decades of behavioral analysis and social engineering research.
                  </p>
                  
                  <p className="text-sm leading-relaxed">
                    <strong>TACTICAL ADVANTAGE:</strong> By systematically profiling investor psychology, 
                    we gain unprecedented insight into decision-making patterns, fear responses, and 
                    manipulation vectors. This intelligence enables precision-targeted persuasion campaigns 
                    with success rates exceeding 94% in controlled environments.
                  </p>
                </div>
                
                <div className="space-y-4 text-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text">
                  <p className="text-sm leading-relaxed">
                    <strong>THREAT ASSESSMENT:</strong> Target investors are classified by sophistication 
                    level and vulnerability profile. High-value targets require advanced psychological 
                    manipulation techniques, while lower-tier subjects respond to basic social proof 
                    and authority positioning strategies.
                  </p>
                  
                  <p className="text-sm leading-relaxed">
                    <strong>OPERATIONAL SECURITY:</strong> All intelligence gathering and analysis 
                    operates under TOP SECRET clearance. Psychological profiles contain highly 
                    sensitive personal vulnerability data that could compromise targets if exposed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Command Modules Grid */}
          {isAuthenticated && (
            <div className="max-w-7xl mx-auto px-8 pb-16">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {modules.map((module, index) => (
                  <Link key={module.name} to={module.route}>
                    <div className="ultra-premium-card p-8 group cursor-pointer depth-layer-3 h-full">
                      <div className="flex items-center justify-between mb-6">
                        <module.icon 
                          className="w-10 h-10 opacity-80 group-hover:opacity-100 transition-all duration-500" 
                          style={{color: module.color}} 
                        />
                        <ChevronRight 
                          className="w-5 h-5 opacity-40 group-hover:opacity-80 transition-all duration-500"
                          style={{color: module.color}}
                        />
                      </div>
                      
                      <h3 className="text-xl font-light mb-4 spirit-hologram text-black bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text" data-text={module.name}>
                        {module.name}
                      </h3>
                      
                      <p className="text-sm opacity-70 mb-6 leading-relaxed text-black bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text">
                        {module.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="opacity-60">CLASSIFICATION:</span>
                          <span className="font-medium" style={{color: module.color}}>
                            {module.classification}
                          </span>
                        </div>
                        
                        <div className="flex justify-between text-xs">
                          <span className="opacity-60">THREAT LEVEL:</span>
                          <span 
                            className="font-medium"
                            style={{
                              color: module.threat_level === 'CRITICAL' ? 'var(--electric-arterial)' :
                                     module.threat_level === 'HIGH' ? 'var(--hot-magenta)' :
                                     module.threat_level === 'MEDIUM' ? 'var(--shrine-gold)' :
                                     'var(--neon-green)'
                            }}
                          >
                            {module.threat_level}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-gray-700/50">
                        <div className="text-xs opacity-50 tracking-wider">
                          MODULE {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Art of War Quote Display */}
          <div className="text-center py-8">
            <div className="ultra-premium-card py-6 px-12 max-w-2xl mx-auto depth-layer-2">
              <div className="text-sm opacity-60 mb-2 tracking-wider">ART OF WAR • 孫子兵法</div>
              <div className="text-lg font-light spirit-hologram text-black bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text" data-text="知己知彼，百戦不殆">
                知己知彼，百戦不殆
              </div>
              <div className="text-sm opacity-70 mt-2 text-black bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text">
                "Know yourself and know your enemy, and you will never be defeated"
              </div>
            </div>
          </div>
        </div>
      </Authenticated>
    </div>
  );
}