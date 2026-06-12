import type { ComponentType } from "react";
import Dashboard from "@/pages/Dashboard";
import Assistant from "@/pages/Assistant";
import Scheduling from "@/pages/Scheduling";
import Routing from "@/pages/Routing";
import Scripts from "@/pages/Scripts";
import Locations from "@/pages/Locations";
import Disposition from "@/pages/Disposition";
import Notes from "@/pages/Notes";
import Providers from "@/pages/Providers";
import DigestiveSystem from "@/pages/DigestiveSystem";
import Insurance from "@/pages/Insurance";
import CallFlow from "@/pages/CallFlow";
import SystemNav from "@/pages/SystemNav";

export interface SplitPage {
  key: string;
  label: string;
  component: ComponentType;
}

export const SPLIT_PAGES: SplitPage[] = [
  { key: "assistant", label: "BG Assistant", component: Assistant },
  { key: "call-flow", label: "Call Flow Builder", component: CallFlow },
  { key: "scheduling", label: "Scheduling Rules", component: Scheduling },
  { key: "routing", label: "Department Routing", component: Routing },
  { key: "scripts", label: "Call Scripts", component: Scripts },
  { key: "providers", label: "Provider Directory", component: Providers },
  { key: "disposition", label: "Disposition Codes", component: Disposition },
  { key: "locations", label: "Locations", component: Locations },
  { key: "insurance", label: "Insurance Terms", component: Insurance },
  { key: "digestive", label: "Digestive System", component: DigestiveSystem },
  { key: "notes", label: "My Notes", component: Notes },
  { key: "system-nav", label: "System Navigation", component: SystemNav },
  { key: "dashboard", label: "Dashboard", component: Dashboard },
];
