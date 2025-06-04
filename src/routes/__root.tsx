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

// Matrix Rain Effect Component
function MatrixRain() {
  useEffect(() => {
    const matrixBg = document.getElementById('matrix-bg');
    if (!matrixBg) return;

    const chars = '武士刀侍忍者将軍大名切腹武道剣術忠義名誉義理恥知勇仁礼誠makoto bushido katana samurai shogun daimyo seppuku budo kendo giri shame chi yu jin rei makoto';
    
    const createMatrixChar = () => {
      const char = document.createElement('div');
      char.className = 'matrix-char';
      char.textContent = chars[Math.floor(Math.random() * chars.length)];
      char.style.left = Math.random() * 100 + '%';
      char.style.animationDelay = Math.random() * 3 + 's';
      char.style.fontSize = (Math.random() * 20 + 10) + 'px';
      return char;
    };

    // Create initial matrix characters
    for (let i = 0; i < 50; i++) {
      matrixBg.appendChild(createMatrixChar());
    }

    // Add new characters periodically
    const interval = setInterval(() => {
      if (matrixBg.children.length < 100) {
        matrixBg.appendChild(createMatrixChar());
      }
    }, 500);

    return () => {
      clearInterval(interval);
      matrixBg.innerHTML = '';
    };
  }, []);

  return null;
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
          <div className="min-h-screen flex flex-col">
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
                          to="/command"
                          className="fox-fire-btn text-xs tracking-widest"
                          onClick={() => setIsSidebarOpen(false)}
                        >
                           COMMAND
                        </Link>
                        <Link
                          to="/"
                          className="fox-fire-btn text-xs tracking-widest"
                          onClick={() => setIsSidebarOpen(false)}
                        >
                           TARGETS
                        </Link>
                        <Link
                          to="/upload"
                          className="fox-fire-btn text-xs tracking-widest"
                          onClick={() => setIsSidebarOpen(false)}
                        >
                           UPLOAD
                        </Link>
                        <Link
                          to="/simulator"
                          className="fox-fire-btn text-xs tracking-widest"
                          onClick={() => setIsSidebarOpen(false)}
                        >
                           SIMULATE
                        </Link>
                        <Link
                          to="/archetypes"
                          className="fox-fire-btn text-xs tracking-widest"
                          onClick={() => setIsSidebarOpen(false)}
                        >
                           ARCHETYPES
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
                            to="/command"
                            onClick={() => setIsSidebarOpen(false)}
                            className="flex items-center p-2 fox-fire-btn mb-2 text-xs tracking-widest"
                          >
                            COMMAND
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
                            to="/upload"
                            onClick={() => setIsSidebarOpen(false)}
                            className="flex items-center p-2 fox-fire-btn mb-2 text-xs tracking-widest"
                          >
                            UPLOAD
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
                            to="/archetypes"
                            onClick={() => setIsSidebarOpen(false)}
                            className="flex items-center p-2 fox-fire-btn mb-2 text-xs tracking-widest"
                          >
                            ARCHETYPES
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
