import { createFileRoute, Link } from "@tanstack/react-router";
import { Authenticated } from "convex/react";
import { Target, Brain, Shield, Zap, Users, Upload, Gauge, Eye, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/command")({
  component: CommandCenterPage,
});

function CommandCenterPage() {
  return (
    <div className="not-prose relative min-h-screen overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="matrix-rain opacity-20">
        {Array.from({length: 12}).map((_, i) => (
          <div 
            key={i}
            className="matrix-column" 
            style={{
              left: `${(i + 1) * 8}%`, 
              animationDelay: `${Math.random() * 5}s`, 
              animationDuration: `${8 + Math.random() * 12}s`
            }}
          >
            知己知彼百戦不殆兵者詭道也故善戦者求之於勢攻其無備出其不意上兵伐謀其次伐交善戦者立於不敗之地故兵無常勢水無常形
          </div>
        ))}
      </div>

      <Authenticated>
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
          <div className="max-w-4xl mx-auto px-8 text-center">
            
            {/* Main Shapeshifting Button */}
            <div className="ultra-premium-card p-16 mb-12 border-4 border-[var(--matrix-green)] shadow-2xl">
              <Link to="/upload" className="block">
                <button className="group relative overflow-hidden">
                  <div className="relative z-10 text-center">
                    <div className="text-8xl md:text-9xl font-bold mb-6 spirit-hologram transition-all duration-500 group-hover:scale-110" 
                         style={{color: 'var(--matrix-green)', textShadow: '0 0 50px var(--matrix-green)', filter: 'brightness(1.4)'}}
                         data-text="READY FOR SHAPESHIFTING">
                      READY FOR
                    </div>
                    <div className="text-8xl md:text-9xl font-bold mb-8 spirit-hologram transition-all duration-500 group-hover:scale-110" 
                         style={{color: 'var(--fox-fire)', textShadow: '0 0 50px var(--fox-fire)', filter: 'brightness(1.4)'}}
                         data-text="SHAPESHIFTING">
                      SHAPESHIFTING
                    </div>
                    
                    {/* Animated Effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--matrix-green)]/20 via-[var(--fox-fire)]/20 to-[var(--matrix-green)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                    <div className="absolute inset-0 border-4 border-[var(--fox-fire)] opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
                  </div>
                </button>
              </Link>
            </div>

            {/* Art of War Quote */}
            <div className="ultra-premium-card p-12 border-2 border-[var(--shrine-gold)]/50">
              <div className="text-sm opacity-60 mb-6 tracking-wider uppercase" style={{color: 'var(--shrine-gold)'}}>
                The Art of War • 孫子兵法
              </div>
              
              <blockquote className="text-3xl md:text-4xl font-light leading-relaxed mb-8 spirit-hologram" 
                          style={{color: 'var(--shrine-gold)'}} 
                          data-text="If you know the enemy and know yourself, you need not fear the result of a hundred battles">
                "If you know the enemy and know yourself, you need not fear the result of a hundred battles"
              </blockquote>
              
              <div className="text-2xl opacity-80" style={{color: 'var(--matrix-green)'}}>
                知己知彼，百戰不殆
              </div>
            </div>
          </div>
        </div>
      </Authenticated>
    </div>
  );
}