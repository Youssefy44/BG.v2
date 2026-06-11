import { ReactNode, useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { CommandPalette } from "@/components/CommandPalette";
import { useHealthCheck, getHealthCheckQueryKey } from "@workspace/api-client-react";
import { PAGE_MAP, PAGE_OPTIONS } from "@/lib/pageMap";
import { Columns2, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
  onOpenSplit?: (path: string) => void;
}

export function Layout({ children }: LayoutProps) {
  useHealthCheck({ query: { queryKey: getHealthCheckQueryKey(), refetchInterval: 60000, retry: false } });
  const [cmdOpen, setCmdOpen] = useState(false);
  const [splitPath, setSplitPath] = useState<string | null>(null);
  const [splitPickerOpen, setSplitPickerOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "\\") {
        e.preventDefault();
        if (splitPath) {
          setSplitPath(null);
        } else {
          setSplitPath("/scheduling");
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [splitPath]);

  const SecondaryComponent = splitPath ? PAGE_MAP[splitPath] : null;
  const secondaryLabel = PAGE_OPTIONS.find((p) => p.path === splitPath)?.label ?? "Section";

  return (
    <div className="min-h-screen bg-background">
      <Sidebar onOpenSearch={() => setCmdOpen(true)} />
      <main className={cn("pl-64 flex flex-col min-h-screen")}>
        {splitPath ? (
          <div className="flex flex-1 h-screen overflow-hidden divide-x divide-border">
            {/* Primary Panel */}
            <div className="flex-1 overflow-y-auto">
              <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-muted/30">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Primary</span>
                <button
                  onClick={() => {
                    if (splitPath) {
                      setSplitPath(null);
                    } else {
                      setSplitPath("/scheduling");
                    }
                  }}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  title="Toggle split view (⌘⇧\)"
                >
                  <Columns2 className="w-3.5 h-3.5" />
                  Split view
                </button>
              </div>
              <div className="p-6 max-w-3xl">
                {children}
              </div>
            </div>

            {/* Secondary Panel */}
            <div className="flex-1 overflow-y-auto bg-muted/10">
              <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-muted/30">
                <div className="relative">
                  <button
                    onClick={() => setSplitPickerOpen((o) => !o)}
                    className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
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
                            onClick={() => {
                              setSplitPath(opt.path);
                              setSplitPickerOpen(false);
                            }}
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
              <div className="p-6 max-w-3xl">
                {SecondaryComponent && <SecondaryComponent />}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1">
            <div className="flex items-center justify-end px-8 py-2 border-b border-border/50">
              <button
                onClick={() => setSplitPath("/scheduling")}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                title="Toggle split view (⌘⇧\)"
              >
                <Columns2 className="w-3.5 h-3.5" />
                Split view
              </button>
            </div>
            <div className="flex-1 w-full max-w-5xl mx-auto p-8">
              {children}
            </div>
          </div>
        )}
      </main>
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </div>
  );
}
