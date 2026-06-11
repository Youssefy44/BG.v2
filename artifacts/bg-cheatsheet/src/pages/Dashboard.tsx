import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  CalendarDays,
  PhoneForwarded,
  MessageSquare,
  MapPin,
  Tags,
  FileText,
  Phone,
  TrendingUp,
  Clock,
  Star,
  AlertTriangle,
  CheckCircle,
  Activity,
  Shield,
  Keyboard,
  Search,
  Users,
  Sparkles,
  Monitor,
  Columns2,
  Command,
  XCircle,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function LiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
  const isHighVolume = now.getDay() === 1 || now.getDay() === 2;
  return (
    <div className="text-right">
      <p className="text-2xl font-bold tabular-nums text-foreground leading-none">{time}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{date}</p>
      {isHighVolume && (
        <Badge className="mt-1 text-[10px] bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-700">
          ⚡ High Volume Day
        </Badge>
      )}
    </div>
  );
}

const kpiGoals = [
  { metric: "Calls / Day", goal: "60+", sub: "target", icon: Phone, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40" },
  { metric: "Adherence", goal: "90%", sub: "minimum", icon: TrendingUp, color: "text-green-600 bg-green-50 dark:bg-green-950/40" },
  { metric: "AHT Target", goal: "6 min", sub: "average", icon: Clock, color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40" },
  { metric: "Quality Score", goal: "90%", sub: "minimum", icon: Star, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40" },
];

const criticalAlerts = [
  {
    id: "ov-timing",
    label: "OV Timing Rule",
    detail: "Book 2–3 days out minimum. No same-day or next-day appointments — ever.",
    level: "danger",
  },
  {
    id: "egd-rule",
    label: "Initial EGD Rule",
    detail: "NEVER schedule an initial EGD directly. Office visit must come first.",
    level: "danger",
  },
  {
    id: "balance",
    label: "$1,000+ Balance",
    detail: "Cannot schedule a procedure. Warm transfer to Collections. You CAN reschedule.",
    level: "danger",
  },
  {
    id: "phreesia",
    label: "Phreesia Rule",
    detail: "Do NOT open anything else in Phreesia under any circumstances.",
    level: "warning",
  },
  {
    id: "sharepoint",
    label: "Check SharePoint First",
    detail: "Always verify the Scheduling Cheat Sheet in SharePoint before scheduling.",
    level: "warning",
  },
  {
    id: "gi-only",
    label: "GI Only",
    detail: "We support Gastroenterology & Hepatology only — including Diabetes and Weight Loss.",
    level: "info",
  },
];

const quickRules = [
  { situation: "New pt + HFU + provider listed", action: "Schedule with listed provider", type: "info" },
  { situation: "New pt + HFU + no provider", action: "Contact Hospital Follow-Up Team", type: "warning" },
  { situation: "Established pt + HFU", action: "Schedule with established provider", type: "info" },
  { situation: "Insurance questions", action: "Warm transfer → Insurance Team", type: "transfer" },
  { situation: "Initial colonoscopy", action: "DAP only if eligible", type: "warning" },
  { situation: "Initial EGD", action: "Schedule office visit FIRST", type: "danger" },
  { situation: "Waitlist request", action: "OV only; pt must already have appt", type: "info" },
  { situation: "Balance over $1,000", action: "Warm transfer → Collections (no new procedures)", type: "danger" },
  { situation: "Allergy (Dr. Watkins)", action: "NEVER reschedule/cancel → Warm transfer", type: "danger" },
  { situation: "Recall call", action: "Colonoscopy or EGD → check recall type", type: "warning" },
];

const shortcuts = [
  { keys: ["⌘", "K"], label: "Quick search anywhere" },
  { keys: ["⌘", "⇧", "\\"], label: "Toggle split view" },
  { keys: ["↑", "↓"], label: "Navigate search results" },
  { keys: ["↵"], label: "Open selected result" },
  { keys: ["ESC"], label: "Close search / palette" },
];

const quickLinks = [
  { href: "/call-flow", label: "Call Flow", icon: Phone, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800" },
  { href: "/scripts", label: "Scripts", icon: MessageSquare, color: "text-teal-600 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800" },
  { href: "/scheduling", label: "Scheduling", icon: CalendarDays, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800" },
  { href: "/routing", label: "Routing", icon: PhoneForwarded, color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800" },
  { href: "/providers", label: "Providers", icon: Users, color: "text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800" },
  { href: "/disposition", label: "Disposition", icon: Tags, color: "text-orange-600 bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800" },
  { href: "/digestive", label: "GI Guide", icon: Activity, color: "text-green-600 bg-green-50 dark:bg-green-950/40 border-green-200 dark:border-green-800" },
  { href: "/insurance", label: "Insurance", icon: Shield, color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800" },
  { href: "/search", label: "Search", icon: Search, color: "text-gray-600 bg-gray-50 dark:bg-gray-950/40 border-gray-200 dark:border-gray-700" },
  { href: "/assistant", label: "Assistant", icon: Sparkles, color: "text-pink-600 bg-pink-50 dark:bg-pink-950/40 border-pink-200 dark:border-pink-800" },
  { href: "/locations", label: "Locations", icon: MapPin, color: "text-cyan-600 bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800" },
  { href: "/system-nav", label: "System Nav", icon: Monitor, color: "text-slate-600 bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-700" },
];

const typeColors: Record<string, string> = {
  info: "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800",
  warning: "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800",
  transfer: "bg-teal-50 border-teal-200 dark:bg-teal-950/30 dark:border-teal-800",
  danger: "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800",
};
const actionColors: Record<string, string> = {
  info: "text-blue-700 dark:text-blue-300",
  warning: "text-amber-700 dark:text-amber-300",
  transfer: "text-teal-700 dark:text-teal-300",
  danger: "text-red-700 dark:text-red-300",
};
const alertStyles = {
  danger: {
    bg: "bg-red-50 border-red-300 dark:bg-red-950/30 dark:border-red-700",
    icon: "text-red-600 dark:text-red-400",
    title: "text-red-800 dark:text-red-300",
    body: "text-red-700 dark:text-red-400",
    badge: "bg-red-100 text-red-700 border-red-300 dark:bg-red-950 dark:text-red-300 dark:border-red-700",
  },
  warning: {
    bg: "bg-amber-50 border-amber-300 dark:bg-amber-950/30 dark:border-amber-700",
    icon: "text-amber-600 dark:text-amber-400",
    title: "text-amber-800 dark:text-amber-300",
    body: "text-amber-700 dark:text-amber-400",
    badge: "bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-700",
  },
  info: {
    bg: "bg-blue-50 border-blue-300 dark:bg-blue-950/30 dark:border-blue-700",
    icon: "text-blue-600 dark:text-blue-400",
    title: "text-blue-800 dark:text-blue-300",
    body: "text-blue-700 dark:text-blue-400",
    badge: "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-700",
  },
};

const AlertIcon = ({ level }: { level: string }) =>
  level === "info" ? (
    <Info className="w-4 h-4 shrink-0 mt-0.5" />
  ) : (
    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
  );

export default function Dashboard() {
  return (
    <div className="space-y-6" data-testid="dashboard-page">
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Command Center</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Borland Groover — Patient Support Services</p>
          <p className="text-xs text-muted-foreground mt-0.5 font-mono">
            BG Main Line:{" "}
            <span className="font-semibold text-foreground">904-398-7205</span>
          </p>
        </div>
        <LiveClock />
      </div>

      {/* ── Critical Alerts ── */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
          🚨 Critical Rules — Always Remember
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {criticalAlerts.map((alert) => {
            const s = alertStyles[alert.level as keyof typeof alertStyles];
            return (
              <div
                key={alert.id}
                className={`flex items-start gap-2.5 p-3 rounded-lg border ${s.bg}`}
              >
                <span className={s.icon}>
                  <AlertIcon level={alert.level} />
                </span>
                <div className="min-w-0">
                  <p className={`text-xs font-bold leading-none mb-1 ${s.title}`}>{alert.label}</p>
                  <p className={`text-xs leading-relaxed ${s.body}`}>{alert.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── KPI Goals ── */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
          Daily KPI Goals
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {kpiGoals.map(({ metric, goal, sub, icon: Icon, color }) => (
            <Card key={metric} className="border border-border">
              <CardContent className="p-3 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground leading-none">{metric}</p>
                  <p className="text-lg font-bold text-foreground mt-0.5 leading-none">{goal}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 capitalize">{sub}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Quick Links ── */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
          Quick Access
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
          {quickLinks.map(({ href, label, icon: Icon, color }) => (
            <Link key={href} href={href}>
              <div className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border cursor-pointer hover:shadow-md transition-all ${color}`}>
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-semibold text-center leading-tight">{label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Quick Reference ── */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
          Quick Reference — Decision Rules
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
          {quickRules.map(({ situation, action, type }) => (
            <div
              key={situation}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-sm ${typeColors[type]}`}
              data-testid="quick-rule"
            >
              <CheckCircle className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
              <span className="text-foreground font-medium text-xs flex-shrink-0">{situation}</span>
              <span className="mx-1 text-muted-foreground text-xs">→</span>
              <span className={`font-semibold text-xs ${actionColors[type]}`}>{action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Keyboard Shortcuts ── */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
          ⌨ Keyboard Shortcuts
        </h2>
        <Card className="border border-border">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {shortcuts.map(({ keys, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 shrink-0">
                    {keys.map((k) => (
                      <kbd
                        key={k}
                        className="inline-flex items-center justify-center px-2 py-0.5 rounded border border-border bg-muted text-xs font-mono font-semibold text-foreground shadow-sm min-w-[1.6rem]"
                      >
                        {k}
                      </kbd>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 shrink-0">
                  <kbd className="inline-flex items-center justify-center px-2 py-0.5 rounded border border-border bg-muted text-xs font-mono font-semibold text-foreground shadow-sm min-w-[1.6rem]">
                    ⌘
                  </kbd>
                  <kbd className="inline-flex items-center justify-center px-2 py-0.5 rounded border border-border bg-muted text-xs font-mono font-semibold text-foreground shadow-sm min-w-[1.6rem]">
                    Enter
                  </kbd>
                </div>
                <span className="text-xs text-muted-foreground">Save note (in Notes)</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
              <Columns2 className="inline w-3.5 h-3.5 mr-1 mb-0.5" />
              Use <strong>Split View</strong> (button top-right) to open two sections side-by-side — great for comparing Scheduling Rules while on a call.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ── Quick Notes for the Shift ── */}
      <div className="pb-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
          Shift Reminders
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="p-3 rounded-lg border border-border bg-muted/30 text-xs text-muted-foreground space-y-1.5">
            <p className="font-semibold text-foreground text-sm">Before Every Call</p>
            <p>✓ Confirm patient identity (name + DOB)</p>
            <p>✓ Check existing appointments in NextGen</p>
            <p>✓ Verify insurance before scheduling procedures</p>
            <p>✓ Review SharePoint cheat sheet for complex cases</p>
          </div>
          <div className="p-3 rounded-lg border border-border bg-muted/30 text-xs text-muted-foreground space-y-1.5">
            <p className="font-semibold text-foreground text-sm">Disposition Reminders</p>
            <p>✓ Set disposition code before ending every call</p>
            <p>✓ AI calls happen on Mondays — volume is higher</p>
            <p>✓ HFU calls: verify 90-day rule from hospital discharge</p>
            <p>✓ Clinical messages SLA: 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}
