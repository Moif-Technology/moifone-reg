import {
  UtensilsCrossed,
  Store,
  ShoppingCart,
  Coffee,
  Pill,
  Croissant,
  Truck,
  Briefcase,
} from "lucide-react";

export const businessTypes = [
  { id: "restaurants", label: "Restaurants", icon: UtensilsCrossed },
  { id: "retail", label: "Retail Shops", icon: Store },
  { id: "supermarkets", label: "Supermarkets", icon: ShoppingCart },
  { id: "cafes", label: "Cafes", icon: Coffee },
  { id: "pharmacies", label: "Pharmacies", icon: Pill },
  { id: "bakeries", label: "Bakeries", icon: Croissant },
  { id: "wholesale", label: "Wholesale", icon: Truck },
  { id: "service", label: "Service Businesses", icon: Briefcase },
];
