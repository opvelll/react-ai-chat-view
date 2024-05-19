import { create } from "zustand";
import { persistNSync } from "persist-and-sync";

export type ChatStore = {
  isRunAudio: boolean;
  toggleAudio: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const useChatStore = create<ChatStore>(
  persistNSync(
    (set) => ({
      // AudioのON/OFF
      isRunAudio: false,
      toggleAudio: () => set((state) => ({ isRunAudio: !state.isRunAudio })),
      // SidebarのON/OFF
      isSidebarOpen: false,
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    }),
    { name: "chatStore" }
  )
);

export default useChatStore;
