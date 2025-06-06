import { createFileRoute, Link } from "@tanstack/react-router";
import { Authenticated, useUser } from "convex/react";
import { Shield, Target, Brain, Zap, Users, ChevronRight, Lock, Unlock, Mail, Crown, Database, BarChart3 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/command")({
  component: CommandCenterPage,
});

function CommandCenterPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const { user } = useUser();
  
  // Check if user is admin
  const isAdmin = user?.emailAddresses?.[0]?.emailAddress === "admin@kitsune.ai";

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  const handleEmailLogin = () => {
    if (email.includes("@")) {
      // Simulate email login for reports
      alert(`Report access request sent to ${email}. You will receive analysis reports and insights via email.`);
      setShowEmailLogin(false);
      setEmail("");
    }
  };

  const handleAdminLogin = () => {
    if (adminKey === "KITSUNE_NEURAL_OVERRIDE_2077") {
      // Admin authentication successful
      window.location.href = "/admin";
    } else {
      alert("Invalid admin key. Access denied.");
    }
  };

  const modules = [
    {
      name: "TARGET DOSSIERS",
      description: "Active investor intelligence files",
      icon: Target,
      route: "/",
      color: "var(--fox-fire-cyan)"
    },
    {
      name: "ARCHETYPE ANALYSIS",
      description: "Psychological warfare profiles",
      icon: Brain,
      route: "/archetypes",
      color: "var(--hot-magenta)"
    },
    {
      name: "INTEL ACQUISITION",
      description: "Upload and process new intelligence",
      icon: Shield,
      route: "/upload",
      color: "var(--shrine-gold)"
    },
    {
      name: "COMBAT SIMULATION",
      description: "Strategic conversation modeling",
      icon: Zap,
      route: "/simulator",
      color: "var(--neon-green)"
    },
    {
      name: "YOUR PROFILE",
      description: "Personal investor communication analysis",
      icon: Users,
      route: "/profile",
      color: "var(--electric-blue)"
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
                  ACCESS STATUS: {isAuthenticated ? 'AUTHENTICATED' : 'PENDING'}
                </div>
              </div>
              
              <h1 className="premium-title mb-6" style={{color: 'var(--matrix-green)'}}>
                OPERATION KITSUNE
              </h1>
              
              <div className="bamboo-divider w-48 mx-auto mb-8"></div>
              
              <div className="premium-subtitle mb-8" style={{color: 'var(--matrix-green)'}}>
                PSYCHOLOGICAL WARFARE COMMAND CENTER
              </div>
              
            </div>
          </div>

          {/* Email and Admin Login Section */}
          <div className="max-w-4xl mx-auto px-8 mb-12">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Email Login for Reports */}
              <div className="ultra-premium-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-6 h-6" style={{color: 'var(--electric-blue)'}} />
                  <h3 className="text-lg font-light">INTEL REPORTS</h3>
                </div>
                <p className="text-sm opacity-70 mb-4">
                  Receive automated analysis reports and psychological insights directly via email.
                </p>
                
                {!showEmailLogin ? (
                  <button
                    onClick={() => setShowEmailLogin(true)}
                    className="cyber-btn w-full p-3"
                    style={{background: 'var(--electric-blue)', color: 'black'}}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    SETUP EMAIL REPORTS
                  </button>
                ) : (
                  <div className="space-y-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="input input-bordered w-full bg-black/20 border-gray-600"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleEmailLogin}
                        className="cyber-btn flex-1 p-2 text-sm"
                        style={{background: 'var(--electric-blue)', color: 'black'}}
                        disabled={!email.includes("@")}
                      >
                        <BarChart3 className="w-4 h-4 mr-1" />
                        REQUEST ACCESS
                      </button>
                      <button
                        onClick={() => setShowEmailLogin(false)}
                        className="cyber-btn px-4 py-2 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Admin Login */}
              <div className="ultra-premium-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Crown className="w-6 h-6" style={{color: 'var(--matrix-green)'}} />
                  <h3 className="text-lg font-light">ADMIN ARCHIVE</h3>
                </div>
                <p className="text-sm opacity-70 mb-4">
                  Access comprehensive user intelligence archive and system analytics.
                </p>
                
                {isAdmin ? (
                  <Link to="/admin">
                    <button className="cyber-btn w-full p-3" style={{background: 'var(--matrix-green)', color: 'black'}}>
                      <Database className="w-4 h-4 mr-2" />
                      ACCESS ADMIN ARCHIVE
                    </button>
                  </Link>
                ) : !showAdminLogin ? (
                  <button
                    onClick={() => setShowAdminLogin(true)}
                    className="cyber-btn w-full p-3"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    ADMIN LOGIN
                  </button>
                ) : (
                  <div className="space-y-3">
                    <input
                      type="password"
                      value={adminKey}
                      onChange={(e) => setAdminKey(e.target.value)}
                      placeholder="Enter admin override key..."
                      className="input input-bordered w-full bg-black/20 border-gray-600"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleAdminLogin}
                        className="cyber-btn flex-1 p-2 text-sm"
                        style={{background: 'var(--matrix-green)', color: 'black'}}
                        disabled={!adminKey}
                      >
                        <Shield className="w-4 h-4 mr-1" />
                        AUTHENTICATE
                      </button>
                      <button
                        onClick={() => setShowAdminLogin(false)}
                        className="cyber-btn px-4 py-2 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
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
                      
                      <h3 className="text-xl font-light mb-4 spirit-hologram" style={{color: module.color}} data-text={module.name}>
                        {module.name}
                      </h3>
                      
                      <p className="text-sm opacity-70 mb-6 leading-relaxed">
                        {module.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="opacity-60">STATUS:</span>
                          <span className="font-medium" style={{color: module.color}}>
                            OPERATIONAL
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
              <div className="text-lg font-light spirit-hologram" style={{color: 'var(--matrix-green)'}} data-text="If you know the enemy and know yourself, you need not fear the result of a hundred battles">
                If you know the enemy and know yourself, you need not fear the result of a hundred battles
              </div>
              <div className="text-sm opacity-70 mt-2" style={{color: 'var(--matrix-green)'}}>
                知己知彼，百戦不殆
              </div>
            </div>
          </div>
        </div>
      </Authenticated>
    </div>
  );
}