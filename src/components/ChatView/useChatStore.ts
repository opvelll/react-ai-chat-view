import { create } from "zustand";
import { persistNSync } from "persist-and-sync";

export type ChatStore = {
  isRunAudio: boolean;
  toggleAudio: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  modelName: string;
  setModel: (value: string) => void;
  modelContextWindow: number;
  setModelContextWindow: (value: number) => void;
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
      // Modelの選択
      modelName: "",
      setModel: (value: string) => set({ modelName: value }),
      modelContextWindow: 0,
      setModelContextWindow: (value: number) =>
        set({ modelContextWindow: value }),
    }),
    { name: "chatStore" }
  )
);

export default useChatStore;
