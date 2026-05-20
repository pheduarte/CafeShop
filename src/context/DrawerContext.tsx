import { createContext } from "react";

export type DrawerContextType = {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

export const DrawerContext = createContext<DrawerContextType | null>(null);
