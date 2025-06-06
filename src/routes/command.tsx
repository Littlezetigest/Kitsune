import { createFileRoute, Link } from "@tanstack/react-router";
import { Authenticated } from "convex/react";
import { Target, Brain, Shield, Zap, Users, Upload, Gauge } from "lucide-react";

export const Route = createFileRoute("/command")({
  component: CommandCenterPage,
});

function CommandCenterPage() {
  const siteOptions = [
    {
      name: "TARGET DOSSIERS",
      description: "View and analyze uploaded conversations. Access psychological profiles and vulnerability assessments for each investor target.",
      icon: Target,
      route: "/",
      color: "var(--matrix-green)"
    },
    {
      name: "UPLOAD INTELLIGENCE",
      description: "Upload conversation screenshots, email chains, or chat logs for advanced OCR analysis and psychological profiling.",
      icon: Upload,
      route: "/upload",
      color: "var(--electric-blue)"
    },
    {
      name: "COMBAT SIMULATOR",
      description: "Practice psychological warfare techniques against AI-powered investor archetypes with realistic conversation dynamics.",
      icon: Zap,
      route: "/simulator",
      color: "var(--neon-green)"
    },
    {
      name: "COMMUNICATION OPTIMIZER",
      description: "Optimize your messages using advanced psychological frameworks (Cialdini, Voss, SPIN, NLP) for maximum persuasive impact.",
      icon: Gauge,
      route: "/optimizer",
      color: "var(--shrine-gold)"
    },
    {
      name: "ARCHETYPE ANALYSIS",
      description: "Study the five investor psychological archetypes: Emperor, Warrior, Sage, Prince, and Joker with detailed manipulation strategies.",
      icon: Brain,
      route: "/archetypes",
      color: "var(--hot-magenta)"
    },
    {
      name: "YOUR PROFILE",
      description: "Analyze your own communication patterns and receive personalized recommendations for improving persuasive effectiveness.",
      icon: Users,
      route: "/profile",
      color: "var(--fox-fire-cyan)"
    }
  ];

  return (
    <div className="not-prose relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="matrix-rain opacity-20">
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
            知己知彼百戦不殆兵者詭道也故善戦者求之於勢攻其無備出其不意
          </div>
        ))}
      </div>

      <Authenticated>
        <div className="relative z-10 min-h-screen flex flex-col justify-center">
          {/* Main Content */}
          <div className="max-w-5xl mx-auto px-8 text-center">
            
            {/* Art of War Quote - Main Feature */}
            <div className="ultra-premium-card py-12 px-16 mb-16 depth-layer-1">
              <div className="text-sm opacity-60 mb-6 tracking-wider uppercase">
                The Art of War • 孫子兵法
              </div>
              
              <blockquote className="text-4xl md:text-5xl font-light leading-relaxed mb-8 spirit-hologram" 
                          style={{color: 'var(--matrix-green)'}} 
                          data-text="If you know the enemy and know yourself, you need not fear the result of a hundred battles">
                "If you know the enemy and know yourself, you need not fear the result of a hundred battles"
              </blockquote>
              
              <div className="text-2xl opacity-80 mb-8" style={{color: 'var(--matrix-green)'}}>
                知己知彼，百戦不殆
              </div>
              
              <div className="bamboo-divider w-32 mx-auto"></div>
            </div>

            {/* Website Description */}
            <div className="ultra-premium-card p-10 mb-12">
              <h1 className="premium-title mb-8 text-black">
                KITSUNE PSYCHOLOGICAL WARFARE SUITE
              </h1>
              
              <p className="text-xl font-light leading-relaxed opacity-90 mb-12 max-w-4xl mx-auto">
                A comprehensive platform for psychological analysis and strategic communication optimization in high-stakes investor relationships. 
                Master the art of persuasion through advanced behavioral profiling, conversation simulation, and tactical messaging frameworks.
              </p>

              {/* Site Options Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {siteOptions.map((option, index) => (
                  <Link key={option.name} to={option.route}>
                    <div className="ultra-premium-card p-6 group cursor-pointer hover:scale-105 transition-all duration-300 h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <option.icon 
                          className="w-8 h-8" 
                          style={{color: option.color}} 
                        />
                        <h3 className="text-lg font-medium">{option.name}</h3>
                      </div>
                      
                      <p className="text-sm opacity-70 leading-relaxed">
                        {option.description}
                      </p>
                      
                      <div className="mt-4 pt-4 border-t border-gray-700/50">
                        <div className="text-xs opacity-50 tracking-wider">
                          MODULE {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer Quote */}
            <div className="text-center opacity-60">
              <p className="text-sm italic">
                "All warfare is based on deception" - 兵者，詭道也
              </p>
            </div>
          </div>
        </div>
      </Authenticated>
    </div>
  );
}