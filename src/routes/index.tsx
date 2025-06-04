import { SignInButton } from "@clerk/clerk-react";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Authenticated, Unauthenticated } from "convex/react";
import { Target, Zap, Shield, Sword, Eye, Users, Crown, Gem, FileText } from "lucide-react";
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
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="fox-fire-glow">
              🦊
            </div>
          </div>
          <h1 className="hologram-text text-6xl font-bold mb-4 sakura-glitch">
            KITSUNE WAR ROOM
          </h1>
          <p className="text-xl mb-8" style={{color: 'var(--neon-blue)'}}>
            MYSTICAL AI STRATEGIC COMMAND CENTER
          </p>
          <p className="text-lg mb-12 max-w-4xl mx-auto" style={{color: 'var(--hot-pink)'}}>
            Cyberpunk investor personality analyzer that decodes psychological archetypes, 
            exploits strategic vulnerabilities, and weaponizes compliments for maximum persuasion.
          </p>
        </div>

        {/* Archetype Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 hologram-text">
            INVESTOR ARCHETYPES
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { name: "PRINCE/CHILD", icon: Crown, color: "var(--golden-circuit)" },
              { name: "WARRIOR/SOLDIER", icon: Sword, color: "var(--hot-pink)" },
              { name: "JOKER/AFFAIRIST", icon: Zap, color: "var(--cyber-green)" },
              { name: "EMPEROR/DADDY", icon: Shield, color: "var(--electric-purple)" },
              { name: "SAGE/ORACLE", icon: Eye, color: "var(--neon-blue)" },
              { name: "GUARDIAN/PROTECTOR", icon: Shield, color: "var(--golden-circuit)" },
              { name: "PIONEER/EXPLORER", icon: Target, color: "var(--hot-pink)" },
              { name: "COLLECTOR/CURATOR", icon: Gem, color: "var(--cyber-green)" }
            ].map((archetype) => (
              <div key={archetype.name} className="archetype-card text-center">
                <archetype.icon 
                  className="w-12 h-12 mx-auto mb-3 fox-fire-glow" 
                  style={{color: archetype.color}}
                />
                <h3 className="font-bold text-sm" style={{color: archetype.color}}>
                  {archetype.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-7xl mx-auto">
          <div className="cyber-card p-6 text-center">
            <Target className="w-12 h-12 mx-auto mb-4 fox-fire-glow" style={{color: 'var(--neon-blue)'}} />
            <h3 className="font-bold mb-2" style={{color: 'var(--neon-blue)'}}>PERSONALITY MATRIX</h3>
            <p className="text-sm opacity-80">
              Core traits and investment behaviors with pulsing neon indicators
            </p>
          </div>
          
          <div className="cyber-card p-6 text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 fox-fire-glow vulnerability-warning" />
            <h3 className="font-bold mb-2 vulnerability-warning">STRATEGIC VULNERABILITIES</h3>
            <p className="text-sm opacity-80">
              Sun Tzu weaknesses with glowing warning icons and tactical breach points
            </p>
          </div>
          
          <div className="cyber-card p-6 text-center">
            <Sword className="w-12 h-12 mx-auto mb-4" style={{color: 'var(--golden-circuit)'}} />
            <h3 className="font-bold mb-2" style={{color: 'var(--golden-circuit)'}}>48 LAWS ARSENAL</h3>
            <p className="text-sm opacity-80">
              Interactive weapon buttons with hover effects revealing attack vectors
            </p>
          </div>
          
          <div className="cyber-card p-6 text-center">
            <Zap className="w-12 h-12 mx-auto mb-4 fox-fire-glow" style={{color: 'var(--cyber-green)'}} />
            <h3 className="font-bold mb-2" style={{color: 'var(--cyber-green)'}}>WAR ROOM SIMULATOR</h3>
            <p className="text-sm opacity-80">
              Interactive chatbot embodying target personality with fox-fire rating system
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <SignInButton mode="modal">
            <button className="cyber-btn text-lg px-12 py-4">
              🎯 ENTER THE WAR ROOM
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

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold hologram-text">INVESTOR TARGETS</h2>
        <Link to="/upload" className="cyber-btn">
          🎯 UPLOAD NEW INTEL
        </Link>
      </div>

      {conversations.length === 0 ? (
        <div className="text-center py-16">
          <div className="cyber-card p-12 max-w-2xl mx-auto">
            <FileText className="w-24 h-24 mx-auto mb-6 fox-fire-glow" style={{color: 'var(--neon-blue)'}} />
            <h3 className="text-2xl font-bold mb-4 hologram-text">NO TARGETS ACQUIRED</h3>
            <p className="mb-8 text-lg" style={{color: 'var(--hot-pink)'}}>
              Upload investor communications to begin psychological analysis and strategic planning
            </p>
            <Link to="/upload" className="cyber-btn text-lg px-8 py-4">
              🎯 INITIATE TARGET ACQUISITION
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {conversations.map((conversation) => (
            <div key={conversation._id} className="cyber-card p-6 hover:border-color-[var(--golden-circuit)]">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="w-6 h-6 fox-fire-glow" style={{color: 'var(--hot-pink)'}} />
                    <h3 className="text-xl font-bold" style={{color: 'var(--neon-blue)'}}>
                      {conversation.title}
                    </h3>
                  </div>
                  {conversation.participantName && (
                    <p className="text-lg mb-2" style={{color: 'var(--golden-circuit)'}}>
                      TARGET: {conversation.participantName}
                    </p>
                  )}
                  <p className="text-sm opacity-70">
                    INTEL ACQUIRED: {new Date(conversation.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link 
                    to="/analysis/$conversationId" 
                    params={{ conversationId: conversation._id }}
                    className="weapon-button px-6 py-3"
                  >
                    ⚡ ANALYZE TARGET
                  </Link>
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
