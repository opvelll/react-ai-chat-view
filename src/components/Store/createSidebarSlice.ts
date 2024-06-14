import { StateCreator } from "zustand";
import { ChatStoreState } from "./useChatStore";

export type SidebarSlice = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const createSidebarSlice: StateCreator<
  ChatStoreState,
  [["zustand/persist", unknown]],
  [],
  SidebarSlice
> = (set) => ({
  isSidebarOpen: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
});

export default createSidebarSlice;
