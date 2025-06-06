import { createFileRoute, Link } from "@tanstack/react-router";
import { Authenticated } from "convex/react";
import { Target, Brain, Shield, Zap, Users, Upload, Gauge, Eye, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/command")({
  component: CommandCenterPage,
});

function CommandCenterPage() {
  const features = [
    {
      icon: Upload,
      title: "INTELLIGENCE UPLOAD",
      description: "Upload conversation screenshots, email chains, or chat logs for advanced Claude API analysis and psychological profiling",
      color: "var(--electric-blue)",
      illustration: "📱💬📧"
    },
    {
      icon: Target,
      title: "TARGET DOSSIERS", 
      description: "View and analyze uploaded conversations. Access comprehensive psychological profiles and vulnerability assessments for each investor target",
      color: "var(--matrix-green)",
      illustration: "🎯📊🔍"
    },
    {
      icon: Zap,
      title: "COMBAT SIMULATOR",
      description: "Practice psychological warfare techniques against AI-powered investor archetypes with realistic conversation dynamics and strategic responses",
      color: "var(--neon-green)",
      illustration: "⚔️🤖💼"
    },
    {
      icon: Gauge,
      title: "COMMUNICATION OPTIMIZER",
      description: "Optimize your messages using advanced psychological frameworks (Cialdini, Voss, SPIN, NLP) for maximum persuasive impact and influence",
      color: "var(--shrine-gold)",
      illustration: "📈🧠💡"
    },
    {
      icon: Brain,
      title: "ARCHETYPE ANALYSIS",
      description: "Study the five investor psychological archetypes: Emperor, Warrior, Sage, Prince, and Joker with detailed manipulation strategies",
      color: "var(--hot-magenta)",
      illustration: "👑⚔️📚🃏"
    },
    {
      icon: Users,
      title: "PERSONAL PROFILE",
      description: "Analyze your own communication patterns and receive personalized recommendations for improving persuasive effectiveness",
      color: "var(--fox-fire-cyan)",
      illustration: "👤📋✨"
    }
  ];

  return (
    <div className="not-prose relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="matrix-rain opacity-15">
        {Array.from({length: 8}).map((_, i) => (
          <div 
            key={i}
            className="matrix-column" 
            style={{
              left: `${(i + 1) * 12}%`, 
              animationDelay: `${Math.random() * 5}s`, 
              animationDuration: `${10 + Math.random() * 15}s`
            }}
          >
            知己知彼百戦不殆兵者詭道也故善戦者求之於勢攻其無備出其不意上兵伐謀其次伐交
          </div>
        ))}
      </div>

      <Authenticated>
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header Section */}
          <div className="max-w-6xl mx-auto px-8 py-16 text-center">
            
            {/* Art of War Quote - Main Feature */}
            <div className="ultra-premium-card py-16 px-12 mb-16 depth-layer-1">
              <div className="text-sm opacity-60 mb-8 tracking-wider uppercase">
                The Art of War • 孫子兵法
              </div>
              
              <blockquote className="text-4xl md:text-6xl font-light leading-relaxed mb-12 spirit-hologram" 
                          style={{color: 'var(--matrix-green)'}} 
                          data-text="Know yourself and know your enemy, and you will never be defeated">
                "Know yourself and know your enemy, and you will never be defeated"
              </blockquote>
              
              <div className="text-3xl opacity-80 mb-8" style={{color: 'var(--matrix-green)'}}>
                知己知彼，百戰不殆
              </div>
              
              <div className="bamboo-divider w-48 mx-auto"></div>
            </div>

            {/* Platform Overview */}
            <div className="ultra-premium-card p-12 mb-16">
              <h1 className="premium-title mb-8 text-black">
                KITSUNE PSYCHOLOGICAL WARFARE COMMAND CENTER
              </h1>
              
              <p className="text-xl font-light leading-relaxed opacity-90 mb-8 max-w-5xl mx-auto">
                Master the art of psychological persuasion in high-stakes investor relationships through advanced behavioral analysis, 
                strategic communication optimization, and real-time conversation intelligence powered by Claude AI.
              </p>
            </div>

            {/* Features Grid with Illustrations */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <Link key={feature.title} to={feature.title === "INTELLIGENCE UPLOAD" ? "/upload" : 
                                                 feature.title === "TARGET DOSSIERS" ? "/" :
                                                 feature.title === "COMBAT SIMULATOR" ? "/simulator" :
                                                 feature.title === "COMMUNICATION OPTIMIZER" ? "/optimizer" :
                                                 feature.title === "ARCHETYPE ANALYSIS" ? "/archetypes" :
                                                 "/profile"}>
                  <div className="ultra-premium-card p-8 group cursor-pointer hover:scale-105 transition-all duration-500 h-full depth-layer-2">
                    
                    {/* Icon and Illustration Header */}
                    <div className="flex items-center justify-between mb-6">
                      <feature.icon 
                        className="w-12 h-12 group-hover:scale-110 transition-all duration-500" 
                        style={{color: feature.color}} 
                      />
                      <div className="text-3xl opacity-80 group-hover:scale-110 transition-all duration-500">
                        {feature.illustration}
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-medium mb-4 spirit-hologram" 
                        style={{color: feature.color}}
                        data-text={feature.title}>
                      {feature.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm opacity-70 leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    
                    {/* Status Indicator */}
                    <div className="flex justify-between items-center">
                      <div className="text-xs opacity-50 tracking-wider">
                        MODULE {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="text-xs font-medium" style={{color: feature.color}}>
                        OPERATIONAL
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4 pt-4 border-t border-gray-700/30">
                      <div className="w-full bg-gray-700/30 rounded-full h-1">
                        <div 
                          className="h-1 rounded-full transition-all duration-1000 group-hover:w-full"
                          style={{
                            background: feature.color,
                            width: `${70 + Math.random() * 25}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* System Status Dashboard */}
            <div className="ultra-premium-card p-8 mb-12">
              <h2 className="text-2xl font-light mb-8 spirit-hologram" 
                  style={{color: 'var(--matrix-green)'}}
                  data-text="SYSTEM STATUS">
                SYSTEM STATUS
              </h2>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-light mb-2" style={{color: 'var(--neon-green)'}}>
                    100%
                  </div>
                  <div className="text-xs opacity-60">UPTIME</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light mb-2" style={{color: 'var(--electric-blue)'}}>
                    ∞
                  </div>
                  <div className="text-xs opacity-60">ANALYSIS CAPACITY</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light mb-2" style={{color: 'var(--shrine-gold)'}}>
                    95%
                  </div>
                  <div className="text-xs opacity-60">PERSUASION SUCCESS</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light mb-2" style={{color: 'var(--hot-magenta)'}}>
                    24/7
                  </div>
                  <div className="text-xs opacity-60">AVAILABILITY</div>
                </div>
              </div>
            </div>

            {/* Footer Wisdom */}
            <div className="text-center opacity-60">
              <p className="text-sm italic mb-2">
                "All warfare is based on deception"
              </p>
              <p className="text-xs">
                兵者，詭道也 - The Art of War
              </p>
            </div>
          </div>
        </div>
      </Authenticated>
    </div>
  );
}