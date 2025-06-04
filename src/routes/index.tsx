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
          <div className="calligraphic-text text-xl font-light py-8 px-16 relative">
            <div className="absolute top-0 left-1/2 artistic-divider w-20 h-0.5 transform -translate-x-1/2"></div>
            知己知彼，百战不殆
            <div className="text-sm mt-4 opacity-70 font-normal tracking-wide">
              Know yourself and know your enemy, and you will never be defeated
            </div>
            <div className="absolute bottom-0 left-1/2 artistic-divider w-20 h-0.5 transform -translate-x-1/2"></div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-24">
          <div className="mb-12">
            <div className="artistic-divider w-1 h-16 mx-auto mb-8"></div>
          </div>
          <h1 className="text-5xl font-light mb-6 tracking-wider brush-stroke-text">
            KITSUNE
          </h1>
          <div className="artistic-divider w-32 mx-auto mb-8"></div>
          <p className="text-lg mb-8 font-light tracking-wide strategic-emphasis">
            TACTICAL ANALYSIS SYSTEM
          </p>
          <p className="text-base mb-16 max-w-2xl mx-auto font-light leading-relaxed opacity-80">
            Strategic intelligence platform for psychological analysis and tactical communication.
            Every interaction calculated. Every response purposeful.
          </p>
        </div>

        {/* Archetype Grid */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-light tracking-wider mb-4 brush-stroke-text">
              TARGET PROFILES
            </h2>
            <div className="artistic-divider w-24 mx-auto"></div>
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
              <div key={archetype.name} className="zen-archetype-card text-center group">
                <archetype.icon 
                  className="w-8 h-8 mx-auto mb-4 zen-focus opacity-60 group-hover:opacity-100" 
                  style={{color: 'var(--pure-white)'}}
                />
                <h3 className="font-light text-xs tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">
                  {archetype.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-1 mb-24 max-w-4xl mx-auto">
          <div className="zen-card p-12 text-center group">
            <Target className="w-6 h-6 mx-auto mb-6 zen-focus opacity-60 group-hover:opacity-100" />
            <h3 className="font-light mb-4 tracking-wide">ANALYSIS</h3>
            <p className="text-sm opacity-60 font-light leading-relaxed">
              Psychological profiling through communication pattern analysis
            </p>
          </div>
          
          <div className="zen-card p-12 text-center group">
            <Shield className="w-6 h-6 mx-auto mb-6 zen-focus opacity-60 group-hover:opacity-100" />
            <h3 className="font-light mb-4 tracking-wide">VULNERABILITIES</h3>
            <p className="text-sm opacity-60 font-light leading-relaxed">
              Strategic weaknesses identified through behavioral patterns
            </p>
          </div>
          
          <div className="zen-card p-12 text-center group">
            <Sword className="w-6 h-6 mx-auto mb-6 zen-focus opacity-60 group-hover:opacity-100" />
            <h3 className="font-light mb-4 tracking-wide">TACTICS</h3>
            <p className="text-sm opacity-60 font-light leading-relaxed">
              Strategic influence techniques based on psychological principles
            </p>
          </div>
          
          <div className="zen-card p-12 text-center group">
            <Eye className="w-6 h-6 mx-auto mb-6 zen-focus opacity-60 group-hover:opacity-100" />
            <h3 className="font-light mb-4 tracking-wide">SIMULATION</h3>
            <p className="text-sm opacity-60 font-light leading-relaxed">
              Practice environment for strategic communication training
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-24">
          <div className="w-px h-16 bg-strategic-red mx-auto mb-8"></div>
          <SignInButton mode="modal">
            <button className="zen-btn text-sm tracking-widest">
              ENTER
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
          <h2 className="text-2xl font-light tracking-wider brush-stroke-text">TARGET DOSSIERS</h2>
          <div className="artistic-divider w-16 h-0.5 mt-3"></div>
        </div>
        <Link to="/upload" className="zen-btn text-xs tracking-widest">
          UPLOAD INTEL
        </Link>
      </div>

      {conversations.length === 0 ? (
        <div className="text-center py-24">
          <div className="zen-card p-16 max-w-xl mx-auto">
            <div className="artistic-divider w-px h-12 mx-auto mb-8"></div>
            <h3 className="text-lg font-light mb-6 tracking-wide">NO TARGETS ACQUIRED</h3>
            <p className="mb-12 text-sm opacity-60 font-light leading-relaxed">
              Upload communications to begin psychological analysis and strategic planning
            </p>
            <Link to="/upload" className="zen-btn text-xs tracking-widest">
              INITIATE ACQUISITION
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-1">
          {conversations.map((conversation) => (
            <div key={conversation._id} className="zen-card p-8">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <Target className="w-4 h-4 opacity-60" />
                    <h3 className="text-lg font-light tracking-wide">
                      {conversation.title}
                    </h3>
                  </div>
                  {conversation.participantName && (
                    <p className="text-sm mb-2 strategic-emphasis font-medium">
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
                    className="zen-btn text-xs tracking-widest"
                  >
                    ANALYZE
                  </Link>
                  <button 
                    onClick={() => handleDelete(conversation._id, conversation.title)}
                    className="p-3 border border-strategic-red bg-void-black hover:bg-strategic-red transition-colors opacity-60 hover:opacity-100 brush-accent relative overflow-hidden"
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
