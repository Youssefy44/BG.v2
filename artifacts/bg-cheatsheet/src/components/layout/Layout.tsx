import { ReactNode, useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { CommandPalette } from "@/components/CommandPalette";
import { useHealthCheck, getHealthCheckQueryKey } from "@workspace/api-client-react";
import { PAGE_MAP, PAGE_OPTIONS } from "@/lib/pageMap";
import { Columns2, X, ChevronDown, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export function Layout({ children }: { children: ReactNode }) {
  useHealthCheck({ query: { queryKey: getHealthCheckQueryKey(), refetchInterval: 60000, retry: false } });

  const isMobile = useIsMobile();
  const [cmdOpen, setCmdOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [splitPath, setSplitPath] = useState<string | null>(null);
  const [splitPickerOpen, setSplitPickerOpen] = useState(false);

  // Close sidebar on desktop
  useEffect(() => {
    if (!isMobile) setSidebarOpen(false);
  }, [isMobile]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "\\") {
        e.preventDefault();
        setSplitPath((p) => (p ? null : "/scheduling"));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobile, sidebarOpen]);

  const SecondaryComponent = splitPath ? PAGE_MAP[splitPath] : null;
  const secondaryLabel = PAGE_OPTIONS.find((p) => p.path === splitPath)?.label ?? "Section";
  const showSplit = splitPath && !isMobile;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        onOpenSearch={() => setCmdOpen(true)}
        isOpen={isMobile ? sidebarOpen : true}
        onClose={isMobile ? () => setSidebarOpen(false) : undefined}
      />

      {/* Main area — offset by sidebar on desktop */}
      <main className="lg:pl-64 flex flex-col min-h-screen">

        {/* Top bar — always visible, hamburger on mobile */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-2.5 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            {/* App name — mobile only */}
            <span className="lg:hidden text-sm font-semibold text-foreground">BG Reference</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Split view toggle — desktop only */}
            {!isMobile && (
              <button
                onClick={() => setSplitPath((p) => (p ? null : "/scheduling"))}
                className={cn(
                  "hidden lg:flex items-center gap-1.5 text-xs transition-colors px-2 py-1 rounded-md",
                  splitPath
                    ? "text-primary bg-primary/10 font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                title="Toggle split view (⌘⇧\)"
              >
                <Columns2 className="w-3.5 h-3.5" />
                {splitPath ? "Split view on" : "Split view"}
              </button>
            )}
          </div>
        </header>

        {/* Content area */}
        {showSplit ? (
          <div className="flex flex-1 overflow-hidden divide-x divide-border">
            {/* Primary Panel */}
            <div className="flex-1 overflow-y-auto">
              <div className="flex items-center px-5 py-2 border-b border-border/60 bg-muted/20">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Primary</span>
              </div>
              <div className="p-5 max-w-3xl">
                {children}
              </div>
            </div>

            {/* Secondary Panel */}
            <div className="flex-1 overflow-y-auto bg-muted/5">
              <div className="flex items-center justify-between px-5 py-2 border-b border-border/60 bg-muted/20">
                <div className="relative">
                  <button
                    onClick={() => setSplitPickerOpen((o) => !o)}
                    className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {secondaryLabel}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {splitPickerOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setSplitPickerOpen(false)} />
                      <div className="absolute top-full left-0 mt-1 z-20 bg-background border border-border rounded-lg shadow-xl py-1 min-w-[200px]">
                        {PAGE_OPTIONS.map((opt) => (
                          <button
                            key={opt.path}
                            onClick={() => { setSplitPath(opt.path); setSplitPickerOpen(false); }}
                            className={cn(
                              "w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors",
                              splitPath === opt.path && "bg-primary/10 text-primary font-medium"
                            )}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <button
                  onClick={() => setSplitPath(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title="Close split panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 max-w-3xl">
                {SecondaryComponent && <SecondaryComponent />}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        )}
      </main>

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </div>
  );
}
