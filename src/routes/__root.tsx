import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth as useClerkAuth,
  useUser,
} from "@clerk/clerk-react";
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import {
  Authenticated,
  ConvexReactClient,
  Unauthenticated,
  useMutation,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";

// Quote Rain Component for Enhanced Atmosphere
function QuoteRain() {
  useEffect(() => {
    const sunTzuQuotes = [
      "知己知彼，百戰不殆",
      "兵者，詭道也", 
      "故善戰者，求之於勢",
      "攻其無備，出其不意",
      "兵貴勝，不貴久",
      "上兵伐謀，其次伐交",
      "善戰者，立於不敗之地",
      "故兵無常勢，水無常形",
      "All warfare is based on deception",
      "Supreme excellence is breaking the enemy's resistance without fighting",
      "If you know the enemy and know yourself, you need not fear",
      "Rapidity is the essence of war",
      "Energy may be likened to the bending of a crossbow",
      "The clever combatant looks to the effect of combined energy"
    ];

    const powerLaws = [
      "Never outshine the master",
      "Never trust friends, use enemies", 
      "Conceal your intentions",
      "Always say less than necessary",
      "Guard your reputation",
      "Court attention at all costs",
      "Get others to do work for you",
      "Make others come to you",
      "Win through actions, not argument",
      "Avoid the unhappy and unlucky",
      "Learn to keep people dependent",
      "Use selective honesty",
      "Pose as a friend, work as spy",
      "Crush your enemy totally"
    ];

    function createQuoteDrop() {
      const container = document.querySelector('.quote-rain');
      if (!container) return;

      const allQuotes = [...sunTzuQuotes, ...powerLaws];
      const quote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
      
      const drop = document.createElement('div');
      drop.className = 'quote-drop';
      drop.textContent = quote;
      drop.style.left = Math.random() * 100 + '%';
      drop.style.animationDuration = (8 + Math.random() * 12) + 's';
      drop.style.animationDelay = Math.random() * 2 + 's';
      
      container.appendChild(drop);
      
      setTimeout(() => {
        if (drop.parentNode) {
          drop.parentNode.removeChild(drop);
        }
      }, 20000);
    }

    const interval = setInterval(createQuoteDrop, 1500);
    
    // Create initial drops
    for (let i = 0; i < 8; i++) {
      setTimeout(createQuoteDrop, i * 500);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="quote-rain"></div>
      <div className="temple-atmosphere">
        <div className="shrine-particles"></div>
      </div>
    </>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  convexClient: ConvexReactClient;
}>()({
  component: RootComponent,
});

function RootComponent() {
  const { queryClient, convexClient: convex } = Route.useRouteContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl="/"
    >
      <ConvexProviderWithClerk client={convex} useAuth={useClerkAuth}>
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen flex flex-col relative">
            {/* Quote Rain and Temple Atmosphere */}
            <QuoteRain />
            <Authenticated>
              <EnsureUser />
              {/* Mobile sidebar drawer */}
              <div className="drawer min-h-screen">
                <input
                  id="drawer-toggle"
                  type="checkbox"
                  className="drawer-toggle"
                  checked={isSidebarOpen}
                  onChange={toggleSidebar}
                />
                <div className="drawer-content container mx-auto flex flex-col h-full">
                  {/* Navbar */}
                  <header className="cyber-nav navbar shadow-sm">
                    <div className="navbar-start">
                      <label
                        htmlFor="drawer-toggle"
                        className="btn btn-square btn-ghost drawer-button lg:hidden mr-2"
                      >
                        <Menu className="w-5 h-5 fox-fire-glow" style={{color: 'var(--fox-fire)'}} />
                      </label>
                      <Link
                        to="/"
                        className="hologram-text text-xl font-light tracking-widest sakura-glitch"
                      >
                         KITSUNE
                      </Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                      <nav className="flex gap-2">
                        <Link
                          to="/archetypes"
                          className="fox-fire-btn text-xs tracking-widest"
                          onClick={() => setIsSidebarOpen(false)}
                        >
                           ARCHETYPES
                        </Link>
                        <Link
                          to="/upload"
                          className="fox-fire-btn text-xs tracking-widest"
                          onClick={() => setIsSidebarOpen(false)}
                        >
                           UPLOAD
                        </Link>
                        <Link
                          to="/"
                          className="fox-fire-btn text-xs tracking-widest"
                          onClick={() => setIsSidebarOpen(false)}
                        >
                           TARGETS
                        </Link>
                        <Link
                          to="/simulator"
                          className="fox-fire-btn text-xs tracking-widest"
                          onClick={() => setIsSidebarOpen(false)}
                        >
                           SIMULATE
                        </Link>
                        <Link
                          to="/optimizer"
                          className="fox-fire-btn text-xs tracking-widest"
                          onClick={() => setIsSidebarOpen(false)}
                        >
                           OPTIMIZER
                        </Link>
                        <Link
                          to="/profile"
                          className="fox-fire-btn text-xs tracking-widest"
                          onClick={() => setIsSidebarOpen(false)}
                        >
                           YOUR PROFILE
                        </Link>
                      </nav>
                    </div>
                    <div className="navbar-end">
                      <UserButton />
                    </div>
                  </header>
                  {/* Cyberpunk Background Effects */}
                  <div className="cyber-particles" id="cyber-particles"></div>
                  
                  {/* Main content */}
                  <main className="flex-1 p-4 prose prose-invert max-w-none relative z-10">
                    <Outlet />
                  </main>
                  <footer className="footer footer-center p-8 text-base-content">
                    <div className="neon-divider w-12 h-px mx-auto mb-4"></div>
                    <p className="text-xs opacity-40 font-light tracking-widest circuit-text">© {new Date().getFullYear()} </p>
                  </footer>
                </div>
                {/* Sidebar content for mobile */}
                <div className="drawer-side z-10">
                  <label
                    htmlFor="drawer-toggle"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <div className="menu p-4 w-64 min-h-full bg-base-200 text-base-content flex flex-col">
                    <div className="flex-1">
                      <div className="menu-title mb-4">Menu</div>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            to="/archetypes"
                            onClick={() => setIsSidebarOpen(false)}
                            className="flex items-center p-2 fox-fire-btn mb-2 text-xs tracking-widest"
                          >
                            ARCHETYPES
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/upload"
                            onClick={() => setIsSidebarOpen(false)}
                            className="flex items-center p-2 fox-fire-btn mb-2 text-xs tracking-widest"
                          >
                            UPLOAD
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/"
                            onClick={() => setIsSidebarOpen(false)}
                            className="flex items-center p-2 fox-fire-btn mb-2 text-xs tracking-widest"
                          >
                            TARGETS
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/simulator"
                            onClick={() => setIsSidebarOpen(false)}
                            className="flex items-center p-2 fox-fire-btn mb-2 text-xs tracking-widest"
                          >
                            SIMULATE
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/optimizer"
                            onClick={() => setIsSidebarOpen(false)}
                            className="flex items-center p-2 fox-fire-btn mb-2 text-xs tracking-widest"
                          >
                            OPTIMIZER
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/profile"
                            onClick={() => setIsSidebarOpen(false)}
                            className="flex items-center p-2 fox-fire-btn mb-2 text-xs tracking-widest"
                          >
                            YOUR PROFILE
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-auto py-4 border-t border-base-300 flex justify-center items-center">
                      <UserButton />
                    </div>
                  </div>
                </div>
              </div>
            </Authenticated>
            <Unauthenticated>
              <header className="navbar bg-base-100 shadow-sm border-b border-base-300">
                <div className="container mx-auto flex justify-between w-full">
                  <div className="navbar-start">
                    <h1 className="hologram-text font-bold"> KITSUNE WAR ROOM</h1>
                  </div>
                  <div className="navbar-end">
                    <SignInButton mode="modal">
                      <button className="btn btn-primary btn-sm">
                        Sign in
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="btn btn-ghost btn-sm ml-2">
                        Sign up
                      </button>
                    </SignUpButton>
                  </div>
                </div>
              </header>
              <main className="flex-1 container mx-auto p-4 prose prose-invert max-w-none">
                <Outlet />
              </main>
              <footer className="footer footer-center p-4 text-base-content">
                <p>© {new Date().getFullYear()} Fullstack Vibe Coding</p>
              </footer>
            </Unauthenticated>
          </div>
          {import.meta.env.DEV && <TanStackRouterDevtools />}
        </QueryClientProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

function EnsureUser() {
  const { isLoaded, isSignedIn, user } = useUser();
  const ensureUser = useMutation(api.users.ensureUser);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      void ensureUser();
    }
  }, [isLoaded, isSignedIn, user, ensureUser]);

  return null;
}
