import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Search,
  CalendarDays,
  PhoneForwarded,
  MessageSquare,
  MapPin,
  Tags,
  FileText,
  Users,
  Sparkles,
  Monitor,
  Activity,
  Shield,
  Phone,
  Command,
  Columns2,
  X,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, group: "main" },
  { href: "/assistant", label: "BG Assistant", icon: Sparkles, group: "main" },
  { href: "/call-flow", label: "Call Flow Builder", icon: Phone, group: "main" },
  { href: "/notes", label: "My Notes", icon: FileText, group: "main" },
  { href: "/digestive", label: "Digestive System", icon: Activity, group: "knowledge" },
  { href: "/insurance", label: "Insurance Terms", icon: Shield, group: "knowledge" },
  { href: "/system-nav", label: "System Navigation", icon: Monitor, group: "reference" },
  { href: "/search", label: "Global Search", icon: Search, group: "reference" },
  { href: "/scheduling", label: "Scheduling Rules", icon: CalendarDays, group: "reference" },
  { href: "/routing", label: "Department Routing", icon: PhoneForwarded, group: "reference" },
  { href: "/scripts", label: "Call Scripts", icon: MessageSquare, group: "reference" },
  { href: "/locations", label: "Locations", icon: MapPin, group: "reference" },
  { href: "/providers", label: "Provider Directory", icon: Users, group: "reference" },
  { href: "/disposition", label: "Disposition Codes", icon: Tags, group: "reference" },
];

const groups = [
  { id: "main", label: "Tools" },
  { id: "knowledge", label: "Knowledge Base" },
  { id: "reference", label: "Reference" },
];

function EgyptClock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const timeStr = new Intl.DateTimeFormat("en-US", {
        timeZone: "Africa/Cairo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      const dateStr = new Intl.DateTimeFormat("en-US", {
        timeZone: "Africa/Cairo",
        weekday: "short",
        month: "short",
        day: "numeric",
      }).format(now);
      setTime(timeStr);
      setDate(dateStr);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="px-3 pb-2">
      <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted/40 border border-border">
        <Clock className="w-3 h-3 text-muted-foreground shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">EGY</span>
            <span className="text-xs font-mono font-bold text-foreground tabular-nums">{time}</span>
          </div>
          <p className="text-[10px] text-muted-foreground truncate">{date}</p>
        </div>
      </div>
    </div>
  );
}

interface SidebarProps {
  onOpenSearch?: () => void;
  splitKey?: string | null;
  onSplitChange?: (key: string | null) => void;
}

export function Sidebar({ onOpenSearch, splitKey, onSplitChange }: SidebarProps) {
  const [location] = useLocation();
  const isSplit = !!splitKey;

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col fixed left-0 top-0 z-10">
      <div className="p-5 pb-3">
        <h1 className="text-xl font-bold text-sidebar-foreground tracking-tight flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded-sm shrink-0 shadow-sm" />
          <span className="truncate">BG Reference App</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-1 font-medium tracking-wide">
          COMMAND CENTER
        </p>
      </div>

      {/* Quick Search Button */}
      <div className="px-3 pb-2">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-muted/50 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all group"
          data-testid="open-search-btn"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="flex-1 text-left text-xs">Quick search…</span>
          <span className="flex items-center gap-0.5 text-[10px] border border-border rounded px-1 py-0.5 font-mono opacity-60 group-hover:opacity-100">
            <Command className="w-2.5 h-2.5" />K
          </span>
        </button>
      </div>

      {/* Split View Toggle */}
      <div className="px-3 pb-2">
        <button
          onClick={() => onSplitChange?.(isSplit ? null : "assistant")}
          className={cn(
            "w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all",
            isSplit
              ? "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15"
              : "text-muted-foreground border border-border bg-muted/30 hover:bg-muted hover:text-foreground"
          )}
          data-testid="split-view-btn"
        >
          {isSplit ? (
            <>
              <X className="w-3.5 h-3.5 shrink-0" />
              Exit Split View
            </>
          ) : (
            <>
              <Columns2 className="w-3.5 h-3.5 shrink-0" />
              Split View
            </>
          )}
        </button>
      </div>

      {/* Egypt Clock */}
      <EgyptClock />

      <nav className="flex-1 px-3 overflow-y-auto pb-4 space-y-4">
        {groups.map((group) => {
          const groupLinks = links.filter((l) => l.group === group.id);
          return (
            <div key={group.id}>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-2 mb-1.5">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {groupLinks.map(({ href, label, icon: Icon }) => {
                  const isActive = location === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold border border-primary/20">
              AS
            </div>
            <div>
              <p className="text-sm font-medium">Agent 47</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
