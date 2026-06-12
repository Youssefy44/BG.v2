import { ReactNode, useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { CommandPalette } from "@/components/CommandPalette";
import { useHealthCheck, getHealthCheckQueryKey } from "@workspace/api-client-react";
import { SPLIT_PAGES } from "@/lib/splitPages";
import { X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Layout({ children }: { children: ReactNode }) {
  useHealthCheck({ query: { queryKey: getHealthCheckQueryKey(), refetchInterval: 60000, retry: false } });
  const [cmdOpen, setCmdOpen] = useState(false);
  const [splitKey, setSplitKey] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const SplitPage = splitKey
    ? SPLIT_PAGES.find((p) => p.key === splitKey)?.component
    : null;

  const isSplit = splitKey !== null;

  return (
    <div className={cn("bg-background", isSplit ? "h-screen overflow-hidden flex flex-col" : "min-h-screen")}>
      <Sidebar
        onOpenSearch={() => setCmdOpen(true)}
        splitKey={splitKey}
        onSplitChange={setSplitKey}
      />

      <div className={cn("pl-64", isSplit ? "flex flex-1 overflow-hidden" : "flex flex-col min-h-screen")}>
        {/* Primary pane */}
        <div className={cn(isSplit ? "flex-1 overflow-y-auto" : "flex-1 w-full max-w-6xl mx-auto")}>
          <div className={cn(isSplit ? "p-6 min-h-full" : "p-8")}>
            {children}
          </div>
        </div>

        {/* Split pane */}
        {isSplit && (
          <>
            <div className="w-px bg-border shrink-0" />
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Split pane header */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/40 shrink-0">
                <div className="relative flex-1">
                  <select
                    value={splitKey ?? ""}
                    onChange={(e) => setSplitKey(e.target.value)}
                    className="w-full appearance-none text-xs font-medium bg-transparent pr-6 cursor-pointer focus:outline-none text-foreground"
                  >
                    {SPLIT_PAGES.map((p) => (
                      <option key={p.key} value={p.key}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3 h-3 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
                </div>
                <button
                  onClick={() => setSplitKey(null)}
                  className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  title="Close split view"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Split page content — scrolls independently */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  {SplitPage && <SplitPage />}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </div>
  );
}
