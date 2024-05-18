import { create } from "zustand";
import { persistNSync } from "persist-and-sync";

export type ChatStore = {
  isRunAudio: boolean;
  toggleAudio: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  modelName: string;
  setModelName: (model: string) => void;
  modelList: string[];
  setModelList: (modelList: string[]) => void;
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

      // モデル名
      modelName: "",
      setModelName: (model: string) => set({ modelName: model }),
      modelList: [],
      setModelList: (modelList: string[]) => set({ modelList: modelList }),
    }),
    { name: "chatStore" }
  )
);

export default useChatStore;
