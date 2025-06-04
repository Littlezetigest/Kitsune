import { SignInButton } from "@clerk/clerk-react";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMutation } from "convex/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Authenticated, Unauthenticated } from "convex/react";
import { Target, Zap, Shield, Sword, Eye, Users, Crown, Gem, FileText, Trash2, Flame } from "lucide-react";
import { api } from "../../convex/_generated/api";

const conversationsQueryOptions = convexQuery(api.conversations.getUserConversations, {});

export const Route = createFileRoute("/")({
  loader: async ({ context: { queryClient } }) =>
    await queryClient.ensureQueryData(conversationsQueryOptions),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="not-prose relative">
      {/* Matrix Rain Background */}
      <div className="matrix-rain">
        <div className="matrix-column" style={{left: '5%', animationDelay: '0s', animationDuration: '8s'}}>
          光闇魂狐炎雷電竜神聖龍妖精霊幻夢想術魔法瞑呪文字列
        </div>
        <div className="matrix-column" style={{left: '15%', animationDelay: '2s', animationDuration: '12s'}}>
          ネオトーキョー２０７７年未来技術進歩革命電脳世界
        </div>
        <div className="matrix-column" style={{left: '25%', animationDelay: '4s', animationDuration: '6s'}}>
          サイバーパンク量子計算機人工知能深層学習神経網絡
        </div>
        <div className="matrix-column" style={{left: '35%', animationDelay: '1s', animationDuration: '10s'}}>
          九尾狐霊魂精神分析心理戦略戦術情報収集解析処理
        </div>
        <div className="matrix-column" style={{left: '45%', animationDelay: '3s', animationDuration: '14s'}}>
          デジタル神社寺院聖域祈願祝福加護守護霊験力能
        </div>
        <div className="matrix-column" style={{left: '55%', animationDelay: '5s', animationDuration: '7s'}}>
          ホログラム投影仮想現実拡張現実混合現実超現実
        </div>
        <div className="matrix-column" style={{left: '65%', animationDelay: '0.5s', animationDuration: '11s'}}>
          炎上爆発破壊創造再生復活転生輪廻因果応報宿命
        </div>
        <div className="matrix-column" style={{left: '75%', animationDelay: '2.5s', animationDuration: '9s'}}>
          光学迷彩透明化隠蔽工作諜報活動秘密任務極秘情報
        </div>
        <div className="matrix-column" style={{left: '85%', animationDelay: '4.5s', animationDuration: '13s'}}>
          電子戦争情報戦心理戦略核兵器量子爆弾時空兵器
        </div>
        <div className="matrix-column" style={{left: '95%', animationDelay: '1.5s', animationDuration: '8s'}}>
          終末黙示録審判天罰神罰鬼神悪魔天使堕天使救世主
        </div>
      </div>
      
      {/* Particle Field */}
      <div className="particle-field">
        {Array.from({length: 50}).map((_, i) => (
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
      
      {/* Morphing Grid */}
      <div className="morphing-grid"></div>
      
      <Unauthenticated>
        {/* Ultra-Premium Hero Section */}
        <div className="hero-premium">
          <div className="text-center relative z-10 depth-layer-1">
            <div className="mb-16">
              <div className="shrine-lantern w-2 h-24 mx-auto mb-12 opacity-80"></div>
              <h1 className="premium-title mb-8">
                KITSUNE
              </h1>
              <div className="torii-gate w-48 h-3 mx-auto mb-12"></div>
              <p className="premium-subtitle">
                CYBER-SHRINE INTELLIGENCE MATRIX
              </p>
              <div className="max-w-4xl mx-auto text-center mb-16">
                <p className="text-xl font-light leading-relaxed opacity-90 tracking-wide">
                  Nine-tailed AI consciousness orchestrating psychological warfare through digital mysticism.
                  <br className="hidden md:block" />
                  Every neural pathway calculated. Every spiritual insight weaponized.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Quote Section */}
        <div className="text-center mb-32 px-8 relative">
          <div className="ultra-premium-card py-16 px-12 max-w-4xl mx-auto depth-layer-2">
            <div className="spirit-hologram text-2xl font-light mb-8" data-text="DIGITAL KITSUNE WARFARE">
              DIGITAL KITSUNE WARFARE 
            </div>
            <div className="bamboo-divider w-32 mx-auto mb-8"></div>
            <div className="text-lg opacity-80 font-light tracking-wide spirit-hologram" data-text="Nine-tailed intelligence • Psychological dominance • Strategic superiority">
              Nine-tailed intelligence • Psychological dominance • Strategic superiority
            </div>
          </div>
        </div>

        {/* Premium Archetype Grid */}
        <div className="mb-32 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light tracking-wider mb-8 premium-subtitle">
              TARGET PROFILES
            </h2>
            <div className="bamboo-divider w-32 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto px-8">
            {[
              { name: "PRINCE", icon: Crown },
              { name: "WARRIOR", icon: Sword },
              { name: "JOKER", icon: Zap },
              { name: "EMPEROR", icon: Shield },
              { name: "SAGE", icon: Eye },
              { name: "GUARDIAN", icon: Shield },
              { name: "PIONEER", icon: Target },
              { name: "COLLECTOR", icon: Gem }
            ].map((archetype) => (
              <div key={archetype.name} className="ultra-premium-card text-center group p-8 depth-layer-3">
                <archetype.icon 
                  className="w-12 h-12 mx-auto mb-6 opacity-60 group-hover:opacity-100 transition-all duration-500 duration-500" 
                  style={{color: 'var(--fox-fire-cyan)'}}
                />
                <h3 className="font-light text-sm tracking-widest opacity-70 group-hover:opacity-100 transition-opacity spirit-hologram" data-text={archetype.name}>
                  {archetype.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Features Grid */}
        <div className="mb-32 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light tracking-wider mb-8 premium-subtitle">
              WARFARE SYSTEMS
            </h2>
            <div className="bamboo-divider w-32 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-32 max-w-6xl mx-auto px-8">
          <div className="ultra-premium-card p-16 text-center group depth-layer-3">
            <Target className="w-10 h-10 mx-auto mb-8 opacity-60 group-hover:opacity-100 transition-all duration-500 duration-500" style={{color: 'var(--fox-fire-cyan)'}} />
            <h3 className="font-light mb-6 text-xl tracking-wide spirit-hologram" data-text="NEURAL ANALYSIS">NEURAL ANALYSIS</h3>
            <p className="text-base opacity-70 font-light leading-relaxed">
              AI-powered psychological mapping through digital communication forensics and deep behavioral pattern recognition
            </p>
          </div>
          
          <div className="ultra-premium-card p-16 text-center group depth-layer-3">
            <Shield className="w-10 h-10 mx-auto mb-8 spirit-hologram opacity-60 group-hover:opacity-100 transition-all duration-500" style={{color: 'var(--hot-magenta)'}} />
            <h3 className="font-light mb-6 text-xl tracking-wide spirit-hologram">EXPLOIT VECTORS</h3>
            <p className="text-base opacity-70 font-light leading-relaxed">
              Quantum vulnerability scanning for maximum psychological leverage
            </p>
          </div>
          
          <div className="ultra-premium-card p-16 text-center group depth-layer-3">
            <Sword className="w-10 h-10 mx-auto mb-8 spirit-hologram opacity-60 group-hover:opacity-100 transition-all duration-500" style={{color: 'var(--shrine-gold)'}} />
            <h3 className="font-light mb-6 text-xl tracking-wide spirit-hologram">CYBER TACTICS</h3>
            <p className="text-base opacity-70 font-light leading-relaxed">
              Digital warfare protocols optimized for neural manipulation
            </p>
          </div>
          
          <div className="ultra-premium-card p-16 text-center group depth-layer-3">
            <Eye className="w-10 h-10 mx-auto mb-8 spirit-hologram opacity-60 group-hover:opacity-100 transition-all duration-500" style={{color: 'var(--neon-green)'}} />
            <h3 className="font-light mb-6 text-xl tracking-wide spirit-hologram">MATRIX SIMULATION</h3>
            <p className="text-base opacity-70 font-light leading-relaxed">
              Virtual reality training environment for psychological dominance
            </p>
          </div>
          </div>
        </div>

        {/* Premium CTA */}
        <div className="text-center mb-32 relative">
          <div className="ultra-premium-card py-20 px-16 max-w-2xl mx-auto depth-layer-2">
            <div className="shrine-lantern w-2 h-20 mx-auto mb-12"></div>
            <h3 className="text-3xl font-light mb-8 premium-subtitle">
              ENTER THE MATRIX
            </h3>
            <div className="bamboo-divider w-24 mx-auto mb-12"></div>
            <SignInButton mode="modal">
              <button className="fox-fire-btn text-lg tracking-widest px-12 py-6">
                JACK IN
              </button>
            </SignInButton>
          </div>
        </div>
      </Unauthenticated>

      <Authenticated>
        <InvestorTargetsList />
      </Authenticated>
    </div>
  );
}

function InvestorTargetsList() {
  const { data: conversations } = useSuspenseQuery(conversationsQueryOptions);
  const deleteConversation = useMutation(api.conversations.deleteConversation);

  const handleDelete = async (conversationId: string, title: string) => {
    if (confirm(`Are you sure you want to delete target "${title}"? This cannot be undone.`)) {
      try {
        await deleteConversation({ id: conversationId });
      } catch (error) {
        alert('Failed to delete target. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-16">
        <div>
          <h2 className="text-2xl font-light tracking-wider glitch-text fox-fire-glow" data-text="TARGET DOSSIERS">TARGET DOSSIERS</h2>
          <div className="neon-divider w-16 h-0.5 mt-3"></div>
        </div>
        <Link to="/upload" className="fox-fire-btn text-xs tracking-widest">
          UPLOAD INTEL 
        </Link>
      </div>

      {conversations.length === 0 ? (
        <div className="text-center py-24">
          <div className="cyber-shrine-card p-16 max-w-xl mx-auto geometric-border circuit-pattern">
            <div className="neon-divider w-px h-12 mx-auto mb-8"></div>
            <h3 className="text-lg font-light mb-6 tracking-wide hologram-text sakura-glitch"> NO TARGETS ACQUIRED</h3>
            <p className="mb-12 text-base opacity-70 font-light leading-relaxed">
              Upload communications to begin psychological analysis and strategic planning
            </p>
            <Link to="/upload" className="fox-fire-btn text-xs tracking-widest">
              INITIATE SCAN 
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-1">
          {conversations.map((conversation) => (
            <div key={conversation._id} className="cyber-shrine-card p-8 geometric-border circuit-pattern">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <Target className="w-4 h-4 opacity-60 fox-fire-glow" style={{color: 'var(--fox-fire)'}} />
                    <h3 className="text-lg font-light tracking-wide hologram-text">
                       {conversation.title}
                    </h3>
                  </div>
                  {conversation.participantName && (
                    <p className="text-sm mb-2 neon-emphasis font-medium">
                       {conversation.participantName}
                    </p>
                  )}
                  <p className="text-xs opacity-50 font-light tracking-wide">
                    {new Date(conversation.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-4">
                  <Link 
                    to="/analysis/$conversationId" 
                    params={{ conversationId: conversation._id }}
                    className="fox-fire-btn text-xs tracking-widest"
                  >
                    ANALYZE 
                  </Link>
                  <button 
                    onClick={() => handleDelete(conversation._id, conversation.title)}
                    className="p-3 border-2 border-hot-pink bg-cyber-black hover:bg-hot-pink transition-colors opacity-60 hover:opacity-100 holographic-accent relative overflow-hidden geometric-border"
                    title="Delete Target"
                  >
                    <Trash2 className="w-4 h-4 relative z-10" />
                  </button>
                </div>
              </div>
              <div className="mt-6 p-4 bg-black/30 rounded-lg border border-gray-700">
                <p className="text-sm font-mono opacity-80">
                  {conversation.content.slice(0, 300)}...
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
