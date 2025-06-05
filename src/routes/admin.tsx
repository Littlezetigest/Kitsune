import { createFileRoute } from "@tanstack/react-router";
import { Authenticated } from "convex/react";
import { 
  Shield, 
  Users, 
  Target, 
  Brain, 
  Eye, 
  Clock, 
  BarChart3, 
  Search,
  Filter,
  Download,
  Archive,
  Crown,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  TrendingUp,
  Calendar,
  User,
  FileText,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [adminKey, setAdminKey] = useState("");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [timeRange, setTimeRange] = useState("30d");

  const ADMIN_KEY = "KITSUNE_NEURAL_OVERRIDE_2077"; // In production, this would be an environment variable

  const authenticateAdmin = () => {
    if (adminKey === ADMIN_KEY) {
      setIsAdminAuthenticated(true);
    } else {
      alert("Invalid admin key. Access denied.");
    }
  };

  // Mock user data - in production this would come from Convex queries
  const mockUsers = [
    {
      id: "user1",
      name: "Alexandra Chen",
      email: "a.chen@venture.com",
      joinDate: "2024-01-15",
      lastActive: "2024-06-05",
      totalTargets: 12,
      totalAnalyses: 34,
      successfulDeals: 3,
      avgResponseRate: 78,
      preferredArchetype: "EMPEROR",
      riskLevel: "High",
      status: "Premium",
      conversations: [
        {
          id: "conv1",
          title: "Series A Pitch - TechFlow Inc",
          date: "2024-06-01",
          targetName: "Marcus Rivera",
          archetype: "VALIDATOR",
          outcome: "Meeting Scheduled",
          messages: 15,
          analysis: {
            successRate: 85,
            keyInsights: ["Strong technical validation", "Risk mitigation focus", "Data-driven approach"],
            vulnerabilities: ["Analysis paralysis", "Perfectionism"],
            nextSteps: ["Provide comprehensive data room", "Schedule technical deep-dive"]
          }
        },
        {
          id: "conv2", 
          title: "Follow-up - Strategic Partnership",
          date: "2024-05-28",
          targetName: "Sarah Kim",
          archetype: "PIONEER",
          outcome: "Under Review",
          messages: 8,
          analysis: {
            successRate: 72,
            keyInsights: ["Innovation focus", "FOMO susceptibility", "Network effects interest"],
            vulnerabilities: ["Scattered attention", "Trend chasing"],
            nextSteps: ["Create urgency", "Highlight first-mover advantage"]
          }
        }
      ]
    },
    {
      id: "user2",
      name: "David Martinez", 
      email: "d.martinez@startup.co",
      joinDate: "2024-02-03",
      lastActive: "2024-06-04",
      totalTargets: 7,
      totalAnalyses: 18,
      successfulDeals: 1,
      avgResponseRate: 52,
      preferredArchetype: "SAGE",
      riskLevel: "Medium",
      status: "Standard",
      conversations: [
        {
          id: "conv3",
          title: "Cold Outreach - Angel Investor",
          date: "2024-06-04",
          targetName: "Jennifer Walsh",
          archetype: "GUARDIAN",
          outcome: "No Response",
          messages: 3,
          analysis: {
            successRate: 32,
            keyInsights: ["Security focused", "Conservative approach", "Risk averse"],
            vulnerabilities: ["Loss aversion", "Analysis paralysis"],
            nextSteps: ["Emphasize downside protection", "Provide risk mitigation framework"]
          }
        }
      ]
    },
    {
      id: "user3",
      name: "Emma Thompson",
      email: "e.thompson@biotech.com", 
      joinDate: "2024-03-12",
      lastActive: "2024-06-05",
      totalTargets: 23,
      totalAnalyses: 67,
      successfulDeals: 5,
      avgResponseRate: 91,
      preferredArchetype: "JOKER",
      riskLevel: "High",
      status: "Enterprise",
      conversations: [
        {
          id: "conv4",
          title: "Series B Negotiation",
          date: "2024-06-05",
          targetName: "Robert Chen",
          archetype: "EMPEROR",
          outcome: "Term Sheet Signed",
          messages: 42,
          analysis: {
            successRate: 94,
            keyInsights: ["Authority positioning", "Control dynamics", "Legacy building"],
            vulnerabilities: ["Ego sensitivity", "Status consciousness"],
            nextSteps: ["Maintain authority respect", "Focus on empire building narrative"]
          }
        }
      ]
    }
  ];

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || 
                         (filterType === "premium" && user.status === "Premium") ||
                         (filterType === "enterprise" && user.status === "Enterprise") ||
                         (filterType === "standard" && user.status === "Standard");
    return matchesSearch && matchesFilter;
  });

  const selectedUserData = selectedUser ? mockUsers.find(u => u.id === selectedUser) : null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Enterprise": return "text-yellow-400";
      case "Premium": return "text-blue-400";
      default: return "text-gray-400";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High": return "text-red-400";
      case "Medium": return "text-yellow-400";
      default: return "text-green-400";
    }
  };

  if (!isAdminAuthenticated) {
    return (
      <Authenticated>
        <div className="min-h-screen flex items-center justify-center">
          <div className="ultra-premium-card p-8 max-w-md w-full">
            <div className="text-center mb-8">
              <Shield className="w-16 h-16 mx-auto mb-4" style={{color: 'var(--matrix-green)'}} />
              <h1 className="text-2xl font-bold mb-2">ADMIN ACCESS PORTAL</h1>
              <p className="opacity-70">Enter neural override key for archive access</p>
            </div>
            
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Administrator Key</span>
                </label>
                <input
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  placeholder="KITSUNE_NEURAL_OVERRIDE_****"
                  className="input input-bordered bg-black/20 border-gray-600"
                  onKeyPress={(e) => e.key === 'Enter' && authenticateAdmin()}
                />
              </div>
              
              <button
                onClick={authenticateAdmin}
                className="cyber-btn w-full p-3"
                style={{background: 'var(--matrix-green)', color: 'black'}}
              >
                <Shield className="w-4 h-4 mr-2" />
                AUTHENTICATE ACCESS
              </button>
            </div>
            
            <div className="mt-6 p-4 bg-red-900/20 rounded border border-red-500/30">
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertTriangle className="w-4 h-4" />
                Unauthorized access attempts are logged and monitored
              </div>
            </div>
          </div>
        </div>
      </Authenticated>
    );
  }

  return (
    <Authenticated>
      <div className="not-prose max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8 p-6 ultra-premium-card">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="premium-title mb-2">
                KITSUNE NEURAL ARCHIVE
              </h1>
              <p className="premium-subtitle">
                COMPREHENSIVE USER INTELLIGENCE & CONVERSATION LIBRARY
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm opacity-70">Archive Access</div>
                <div className="font-bold" style={{color: 'var(--matrix-green)'}}>ADMINISTRATOR</div>
              </div>
              <Crown className="w-8 h-8" style={{color: 'var(--matrix-green)'}} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* User Sidebar */}
          <div className="col-span-4 space-y-4">
            {/* Search and Filters */}
            <div className="ultra-premium-card p-6">
              <h3 className="text-lg font-light mb-4 flex items-center gap-2">
                <Search className="w-5 h-5" style={{color: 'var(--matrix-green)'}} />
                USER SEARCH
              </h3>
              
              <div className="space-y-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users by name or email..."
                  className="input input-bordered w-full bg-black/20 border-gray-600 text-sm"
                />
                
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="select select-bordered bg-black/20 border-gray-600 text-sm"
                  >
                    <option value="all">All Users</option>
                    <option value="enterprise">Enterprise</option>
                    <option value="premium">Premium</option>
                    <option value="standard">Standard</option>
                  </select>
                  
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="select select-bordered bg-black/20 border-gray-600 text-sm"
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="all">All time</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Archive Statistics */}
            <div className="ultra-premium-card p-6">
              <h3 className="text-lg font-light mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" style={{color: 'var(--matrix-green)'}} />
                ARCHIVE METRICS
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-70">Total Users</span>
                  <span className="font-bold" style={{color: 'var(--matrix-green)'}}>2,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-70">Active Conversations</span>
                  <span className="font-bold" style={{color: 'var(--matrix-green)'}}>15,293</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-70">Successful Deals</span>
                  <span className="font-bold" style={{color: 'var(--matrix-green)'}}>441</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-70">Avg Success Rate</span>
                  <span className="font-bold" style={{color: 'var(--matrix-green)'}}>73.2%</span>
                </div>
              </div>
            </div>

            {/* User List */}
            <div className="ultra-premium-card p-6">
              <h3 className="text-lg font-light mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" style={{color: 'var(--matrix-green)'}} />
                USER ARCHIVE ({filteredUsers.length})
              </h3>
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => setSelectedUser(user.id)}
                    className={`w-full p-3 text-left rounded border transition-all ${
                      selectedUser === user.id 
                        ? 'border-[var(--matrix-green)] bg-[var(--matrix-green)]/10' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs opacity-60">{user.email}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                        </div>
                        <div className="text-xs opacity-60">{user.totalTargets} targets</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-8 space-y-6">
            {selectedUserData ? (
              <>
                {/* User Overview */}
                <div className="ultra-premium-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-light">{selectedUserData.name}</h2>
                      <p className="opacity-70">{selectedUserData.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={`font-bold ${getStatusColor(selectedUserData.status)}`}>
                          {selectedUserData.status}
                        </div>
                        <div className="text-xs opacity-60">
                          Joined {selectedUserData.joinDate}
                        </div>
                      </div>
                      <User className="w-8 h-8" style={{color: 'var(--matrix-green)'}} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-gray-800/50 rounded">
                      <div className="text-2xl font-bold" style={{color: 'var(--matrix-green)'}}>
                        {selectedUserData.totalTargets}
                      </div>
                      <div className="text-xs opacity-70">Total Targets</div>
                    </div>
                    <div className="text-center p-3 bg-gray-800/50 rounded">
                      <div className="text-2xl font-bold" style={{color: 'var(--matrix-green)'}}>
                        {selectedUserData.totalAnalyses}
                      </div>
                      <div className="text-xs opacity-70">Analyses</div>
                    </div>
                    <div className="text-center p-3 bg-gray-800/50 rounded">
                      <div className="text-2xl font-bold" style={{color: 'var(--matrix-green)'}}>
                        {selectedUserData.successfulDeals}
                      </div>
                      <div className="text-xs opacity-70">Successful Deals</div>
                    </div>
                    <div className="text-center p-3 bg-gray-800/50 rounded">
                      <div className="text-2xl font-bold" style={{color: 'var(--matrix-green)'}}>
                        {selectedUserData.avgResponseRate}%
                      </div>
                      <div className="text-xs opacity-70">Response Rate</div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm opacity-70">Preferred Archetype</div>
                      <div className="font-medium">{selectedUserData.preferredArchetype}</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-70">Risk Level</div>
                      <div className={`font-medium ${getRiskColor(selectedUserData.riskLevel)}`}>
                        {selectedUserData.riskLevel}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm opacity-70">Last Active</div>
                      <div className="font-medium">{selectedUserData.lastActive}</div>
                    </div>
                  </div>
                </div>

                {/* Conversation Archive */}
                <div className="ultra-premium-card p-6">
                  <h3 className="text-xl font-light mb-6 flex items-center gap-2">
                    <Archive className="w-6 h-6" style={{color: 'var(--matrix-green)'}} />
                    CONVERSATION ARCHIVE
                  </h3>

                  <div className="space-y-4">
                    {selectedUserData.conversations.map((conv) => (
                      <div key={conv.id} className="border border-gray-600 rounded p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{conv.title}</h4>
                            <div className="text-sm opacity-70">
                              Target: {conv.targetName} • {conv.archetype} Archetype
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium" style={{color: 'var(--matrix-green)'}}>
                              {conv.outcome}
                            </div>
                            <div className="text-xs opacity-60">{conv.date}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-xs opacity-70">Messages Exchanged</div>
                            <div className="font-medium">{conv.messages}</div>
                          </div>
                          <div>
                            <div className="text-xs opacity-70">Success Rate</div>
                            <div className="font-medium" style={{color: 'var(--matrix-green)'}}>
                              {conv.analysis.successRate}%
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="text-sm font-medium mb-2">Key Insights</div>
                            <div className="flex flex-wrap gap-1">
                              {conv.analysis.keyInsights.map((insight, idx) => (
                                <span 
                                  key={idx}
                                  className="px-2 py-1 bg-blue-500/20 rounded text-xs"
                                >
                                  {insight}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <div className="text-sm font-medium mb-2">Vulnerabilities Identified</div>
                            <div className="flex flex-wrap gap-1">
                              {conv.analysis.vulnerabilities.map((vuln, idx) => (
                                <span 
                                  key={idx}
                                  className="px-2 py-1 bg-red-500/20 rounded text-xs"
                                >
                                  {vuln}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <div className="text-sm font-medium mb-2">Next Steps</div>
                            <ul className="text-xs space-y-1">
                              {conv.analysis.nextSteps.map((step, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <ChevronRight className="w-3 h-3 mt-0.5" style={{color: 'var(--matrix-green)'}} />
                                  {step}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="ultra-premium-card p-8 text-center">
                <Archive className="w-16 h-16 mx-auto mb-4 opacity-50" style={{color: 'var(--matrix-green)'}} />
                <h3 className="text-xl font-light mb-2">Select User for Archive Access</h3>
                <p className="opacity-70">
                  Choose a user from the sidebar to view their complete conversation archive and strategic intelligence.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Authenticated>
  );
}