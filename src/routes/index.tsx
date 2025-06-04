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
    <div className="not-prose">
      <Unauthenticated>
        {/* Art of War Quote */}
        <div className="text-center mb-16 px-8">
          <div className="liquid-metal-text text-xl font-light py-8 px-16 relative">
            <div className="absolute top-0 left-1/2 neural-network-viz w-20 h-0.5 transform -translate-x-1/2"></div>
             DIGITAL KITSUNE WARFARE 
            <div className="text-sm mt-4 opacity-70 font-normal tracking-wide liquid-metal-text">
              Nine-tailed intelligence • Psychological dominance • Strategic superiority
            </div>
            <div className="absolute bottom-0 left-1/2 neural-network-viz w-20 h-0.5 transform -translate-x-1/2"></div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-24">
          <div className="mb-12">
            <div className="neural-network-viz w-1 h-16 mx-auto mb-8"></div>
          </div>
          <h1 className="text-5xl font-light mb-6 tracking-wider liquid-metal-text">
             KITSUNE
          </h1>
          <div className="neural-network-viz w-32 mx-auto mb-8"></div>
          <p className="text-lg mb-8 font-light tracking-wide liquid-metal-text">
            NEURO-WARFARE MATRIX
          </p>
          <p className="text-base mb-16 max-w-2xl mx-auto font-light leading-relaxed opacity-80">
            Strategic intelligence platform for psychological analysis and tactical communication.
            Every interaction calculated. Every response purposeful.
          </p>
        </div>

        {/* Archetype Grid */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-light tracking-wider mb-4 liquid-metal-text" data-text="TARGET PROFILES">
              TARGET PROFILES
            </h2>
            <div className="neural-network-viz w-24 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-4 gap-1 max-w-6xl mx-auto">
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
              <div key={archetype.name} className="luxury-archetype-card text-center group">
                <archetype.icon 
                  className="w-8 h-8 mx-auto mb-4 platinum-glow opacity-60 group-hover:opacity-100 transition-all" 
                  style={{color: 'var(--platinum-blue)'}}
                />
                <h3 className="font-light text-xs tracking-widest opacity-70 group-hover:opacity-100 transition-opacity prestige-text">
                  {archetype.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-24 max-w-4xl mx-auto">
          <div className="luxury-card p-12 text-center group luxury-frame">
            <Target className="w-6 h-6 mx-auto mb-6 platinum-glow opacity-60 group-hover:opacity-100 transition-all" />
            <h3 className="font-light mb-4 tracking-wide prestige-text">NEURAL ANALYSIS</h3>
            <p className="text-sm opacity-60 font-light leading-relaxed">
              AI-powered psychological mapping through digital communication forensics
            </p>
          </div>
          
          <div className="luxury-card p-12 text-center group luxury-frame">
            <Shield className="w-6 h-6 mx-auto mb-6 platinum-glow opacity-60 group-hover:opacity-100 transition-all" style={{color: 'var(--imperial-gold)'}} />
            <h3 className="font-light mb-4 tracking-wide prestige-text">EXPLOIT VECTORS</h3>
            <p className="text-sm opacity-60 font-light leading-relaxed">
              Quantum vulnerability scanning for maximum psychological leverage
            </p>
          </div>
          
          <div className="luxury-card p-12 text-center group luxury-frame">
            <Sword className="w-6 h-6 mx-auto mb-6 platinum-glow opacity-60 group-hover:opacity-100 transition-all" style={{color: 'var(--vermillion-gold)'}} />
            <h3 className="font-light mb-4 tracking-wide prestige-text">CYBER TACTICS</h3>
            <p className="text-sm opacity-60 font-light leading-relaxed">
              Digital warfare protocols optimized for neural manipulation
            </p>
          </div>
          
          <div className="luxury-card p-12 text-center group luxury-frame">
            <Eye className="w-6 h-6 mx-auto mb-6 platinum-glow opacity-60 group-hover:opacity-100 transition-all" style={{color: 'var(--celestial-blue)'}} />
            <h3 className="font-light mb-4 tracking-wide prestige-text">MATRIX SIMULATION</h3>
            <p className="text-sm opacity-60 font-light leading-relaxed">
              Virtual reality training environment for psychological dominance
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-24">
          <div className="neon-divider w-px h-16 mx-auto mb-8"></div>
          <SignInButton mode="modal">
            <button className="cyber-btn text-sm tracking-widest holographic-accent">
              JACK IN 
            </button>
          </SignInButton>
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
        <Link to="/upload" className="cyber-btn text-xs tracking-widest holographic-accent">
          UPLOAD INTEL 
        </Link>
      </div>

      {conversations.length === 0 ? (
        <div className="text-center py-24">
          <div className="cyber-card p-16 max-w-xl mx-auto geometric-border circuit-pattern">
            <div className="neon-divider w-px h-12 mx-auto mb-8"></div>
            <h3 className="text-lg font-light mb-6 tracking-wide hologram-text sakura-glitch"> NO TARGETS ACQUIRED</h3>
            <p className="mb-12 text-sm opacity-60 font-light leading-relaxed">
              Upload communications to begin psychological analysis and strategic planning
            </p>
            <Link to="/upload" className="cyber-btn text-xs tracking-widest holographic-accent">
              INITIATE SCAN 
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-1">
          {conversations.map((conversation) => (
            <div key={conversation._id} className="cyber-card p-8 geometric-border circuit-pattern">
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
                    className="cyber-btn text-xs tracking-widest holographic-accent"
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
