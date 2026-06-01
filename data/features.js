import {
  Cloud,
  MonitorSmartphone,
  Users,
  Package,
  ShieldCheck,
  LineChart,
  Building2,
  TrendingUp,
  Radar,
  Boxes,
  FileStack,
  UserRoundCog,
  Compass,
} from "lucide-react";

export const featureGroups = [
  {
    id: "platform",
    label: "ERP & POS",
    items: [
      {
        icon: Cloud,
        title: "Cloud ERP setup",
        description: "Guided cloud back-office—no servers or heavy installs.",
      },
      {
        icon: MonitorSmartphone,
        title: "POS onboarding",
        description: "Selling on the floor wired to finance and stock.",
      },
      {
        icon: Users,
        title: "Company & staff",
        description: "Entities, branches, and roles in one structured profile.",
      },
      {
        icon: Package,
        title: "Inventory & billing",
        description: "Purchasing, stock, and invoices aligned with POS.",
      },
      {
        icon: ShieldCheck,
        title: "Role-based access",
        description: "Fine-grained permissions from register to management.",
      },
      {
        icon: LineChart,
        title: "Reporting & control",
        description: "Dashboards for sales, margin, and daily operations.",
      },
      {
        icon: Building2,
        title: "Multi-branch",
        description: "One standard across locations—local flexibility where it counts.",
      },
      {
        icon: TrendingUp,
        title: "Scalable growth",
        description: "Add depth, users, and branches without replatforming.",
      },
    ],
  },
  {
    id: "signals",
    label: "Intelligent signals",
    items: [
      {
        icon: Radar,
        title: "Sales signals",
        description: "Demand, mix, and margin pressure surfaced early.",
        signals: true,
      },
      {
        icon: Boxes,
        title: "Inventory predictions",
        description: "Reorder and risk hints by branch, promo, and season.",
        signals: true,
      },
      {
        icon: FileStack,
        title: "Automated reporting",
        description: "Scheduled packs and exceptions—less manual assembly.",
        signals: true,
      },
      {
        icon: UserRoundCog,
        title: "Staff performance",
        description: "Throughput and coaching cues without spreadsheet sprawl.",
        signals: true,
      },
      {
        icon: Compass,
        title: "Guided recommendations",
        description: "Next steps grounded in your live operational data.",
        signals: true,
      },
    ],
  },
];

/** Flat list for reuse (search, analytics, etc.) */
export const featureItems = featureGroups.flatMap((g) => g.items);
