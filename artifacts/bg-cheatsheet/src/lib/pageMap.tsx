import Dashboard from "@/pages/Dashboard";
import SearchPage from "@/pages/Search";
import Scheduling from "@/pages/Scheduling";
import Routing from "@/pages/Routing";
import Scripts from "@/pages/Scripts";
import Locations from "@/pages/Locations";
import Disposition from "@/pages/Disposition";
import Notes from "@/pages/Notes";
import Providers from "@/pages/Providers";
import Assistant from "@/pages/Assistant";
import SystemNav from "@/pages/SystemNav";
import DigestiveSystem from "@/pages/DigestiveSystem";
import Insurance from "@/pages/Insurance";
import CallFlow from "@/pages/CallFlow";

export const PAGE_MAP: Record<string, React.ComponentType> = {
  "/": Dashboard,
  "/search": SearchPage,
  "/scheduling": Scheduling,
  "/routing": Routing,
  "/scripts": Scripts,
  "/locations": Locations,
  "/disposition": Disposition,
  "/assistant": Assistant,
  "/system-nav": SystemNav,
  "/providers": Providers,
  "/notes": Notes,
  "/digestive": DigestiveSystem,
  "/insurance": Insurance,
  "/call-flow": CallFlow,
};

export const PAGE_OPTIONS = [
  { path: "/", label: "Dashboard" },
  { path: "/assistant", label: "BG Assistant" },
  { path: "/call-flow", label: "Call Flow Builder" },
  { path: "/notes", label: "My Notes" },
  { path: "/digestive", label: "Digestive System" },
  { path: "/insurance", label: "Insurance Terms" },
  { path: "/system-nav", label: "System Navigation" },
  { path: "/search", label: "Global Search" },
  { path: "/scheduling", label: "Scheduling Rules" },
  { path: "/routing", label: "Department Routing" },
  { path: "/scripts", label: "Call Scripts" },
  { path: "/locations", label: "Locations" },
  { path: "/providers", label: "Provider Directory" },
  { path: "/disposition", label: "Disposition Codes" },
];
