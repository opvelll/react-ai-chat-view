import { StoreApi, UseBoundStore, create } from "zustand";
import { persistNSync } from "persist-and-sync";
import { ModelName } from "../ChatView/Type/AIChatAPIType";
import {
  ModelDataList,
  getContextWindow,
} from "../ChatView/Type/ModelDataList";

export type ChatStoreState = {
  isRunAudio: boolean;
  toggleAudio: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  modelName: ModelName;
  setModel: (value: ModelName) => void;
  modelContextWindow: number;
  setModelContextWindow: (value: number) => void;
  totalTokenCount: number;
  setTotalTokenCount: (value: number) => void;
};

const useChatStore = (
  modelList: ModelDataList
): UseBoundStore<StoreApi<ChatStoreState>> =>
  create<ChatStoreState>(
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
        modelName: modelList[0].modelName,
        setModel: (value: string) => set({ modelName: value }),
        modelContextWindow: getContextWindow(modelList[0].modelName, modelList),
        setModelContextWindow: (value: number) =>
          set({ modelContextWindow: value }),
        totalTokenCount: 0,
        setTotalTokenCount: (value: number) => set({ totalTokenCount: value }),
      }),

      { name: "chatStore", exclude: ["totalTokenCount"] }
    )
  );

export default useChatStore;
