import { SignInButton } from "@clerk/clerk-react";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMutation } from "convex/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Authenticated, Unauthenticated } from "convex/react";
import { Target, Zap, Shield, Sword, Eye, Users, Crown, Gem, FileText, Trash2, Dragon } from "lucide-react";
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
        <div className="text-center mb-8 px-8">
          <div className="matrix-text text-lg font-mono italic border-l-4 border-r-4 border-matrix-green py-4 px-8 bg-black/50">
            "知己知彼，百战不殆" — Know yourself and know your enemy, and you will never be defeated
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="dragon-glow">
              <Dragon className="w-16 h-16" style={{color: 'var(--dragon-red)'}} />
            </div>
          </div>
          <h1 className="dragon-text text-6xl font-bold mb-4 dragonGlitch">
            DRAGON MATRIX WAR ROOM
          </h1>
          <p className="text-xl mb-8 matrix-text">
            TACTICAL PSYCHOLOGICAL WARFARE COMMAND CENTER
          </p>
          <p className="text-lg mb-12 max-w-4xl mx-auto" style={{color: 'var(--pure-white)'}}>
            Advanced psychological analysis system that decodes enemy archetypes, 
            exploits strategic vulnerabilities, and weaponizes persuasion for total victory.
          </p>
        </div>

        {/* Archetype Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 dragon-text">
            TARGET ARCHETYPES
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { name: "PRINCE/CHILD", icon: Crown, color: "var(--dragon-red)" },
              { name: "WARRIOR/SOLDIER", icon: Sword, color: "var(--matrix-green)" },
              { name: "JOKER/AFFAIRIST", icon: Zap, color: "var(--pure-white)" },
              { name: "EMPEROR/DADDY", icon: Shield, color: "var(--dragon-red)" },
              { name: "SAGE/ORACLE", icon: Eye, color: "var(--matrix-green)" },
              { name: "GUARDIAN/PROTECTOR", icon: Shield, color: "var(--pure-white)" },
              { name: "PIONEER/EXPLORER", icon: Target, color: "var(--dragon-red)" },
              { name: "COLLECTOR/CURATOR", icon: Gem, color: "var(--matrix-green)" }
            ].map((archetype) => (
              <div key={archetype.name} className="dragon-archetype-card text-center">
                <archetype.icon 
                  className="w-12 h-12 mx-auto mb-3 dragon-glow" 
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
          <div className="dragon-card p-6 text-center">
            <Target className="w-12 h-12 mx-auto mb-4 matrix-glow" style={{color: 'var(--matrix-green)'}} />
            <h3 className="font-bold mb-2" style={{color: 'var(--matrix-green)'}}>PERSONALITY MATRIX</h3>
            <p className="text-sm opacity-80">
              Core traits and psychological behaviors with pulsing matrix indicators
            </p>
          </div>
          
          <div className="dragon-card p-6 text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 dragon-glow danger-warning" />
            <h3 className="font-bold mb-2 danger-warning">STRATEGIC VULNERABILITIES</h3>
            <p className="text-sm opacity-80">
              Art of War weaknesses with glowing warning icons and tactical breach points
            </p>
          </div>
          
          <div className="dragon-card p-6 text-center">
            <Sword className="w-12 h-12 mx-auto mb-4 dragon-glow" style={{color: 'var(--dragon-red)'}} />
            <h3 className="font-bold mb-2" style={{color: 'var(--dragon-red)'}}>48 LAWS ARSENAL</h3>
            <p className="text-sm opacity-80">
              Interactive weapon buttons with hover effects revealing attack vectors
            </p>
          </div>
          
          <div className="dragon-card p-6 text-center">
            <Dragon className="w-12 h-12 mx-auto mb-4 matrix-glow" style={{color: 'var(--matrix-green)'}} />
            <h3 className="font-bold mb-2" style={{color: 'var(--matrix-green)'}}>WAR ROOM SIMULATOR</h3>
            <p className="text-sm opacity-80">
              Interactive AI embodying target personality with dragon matrix rating system
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <SignInButton mode="modal">
            <button className="dragon-btn text-lg px-12 py-4">
              🐉 ENTER THE DRAGON MATRIX
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
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold dragon-text">TARGET DOSSIERS</h2>
        <Link to="/upload" className="dragon-btn">
          🎯 UPLOAD NEW INTEL
        </Link>
      </div>

      {conversations.length === 0 ? (
        <div className="text-center py-16">
          <div className="dragon-card p-12 max-w-2xl mx-auto">
            <FileText className="w-24 h-24 mx-auto mb-6 matrix-glow" style={{color: 'var(--matrix-green)'}} />
            <h3 className="text-2xl font-bold mb-4 dragon-text">NO TARGETS ACQUIRED</h3>
            <p className="mb-8 text-lg" style={{color: 'var(--pure-white)'}}>
              Upload enemy communications to begin psychological analysis and strategic planning
            </p>
            <Link to="/upload" className="dragon-btn text-lg px-8 py-4">
              🎯 INITIATE TARGET ACQUISITION
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {conversations.map((conversation) => (
            <div key={conversation._id} className="dragon-card p-6 hover:border-color-[var(--matrix-green)]">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="w-6 h-6 dragon-glow" style={{color: 'var(--dragon-red)'}} />
                    <h3 className="text-xl font-bold" style={{color: 'var(--pure-white)'}}>
                      {conversation.title}
                    </h3>
                  </div>
                  {conversation.participantName && (
                    <p className="text-lg mb-2" style={{color: 'var(--matrix-green)'}}>
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
                    className="dragon-button px-6 py-3"
                  >
                    ⚡ ANALYZE TARGET
                  </Link>
                  <button 
                    onClick={() => handleDelete(conversation._id, conversation.title)}
                    className="delete-button px-4 py-3"
                    title="Delete Target"
                  >
                    <Trash2 className="w-5 h-5" />
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
