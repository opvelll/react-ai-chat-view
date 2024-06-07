import { StoreApi, UseBoundStore, create } from "zustand";
import {
  AIModelData,
  ModelDataList,
  initModelData,
} from "../ChatView/Type/ModelDataList";
import { PersistOptions, persist } from "zustand/middleware";

export type ChatStoreState = {
  isRunAudio: boolean;
  toggleAudio: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  modelData: AIModelData;
  setModel: (value: AIModelData) => void;
  totalTokenCount: number;
  setTotalTokenCount: (value: number) => void;
};

const useChatStore = (
  modelList: ModelDataList
): UseBoundStore<StoreApi<ChatStoreState>> =>
  create<ChatStoreState>()(
    persist<ChatStoreState>(
      (set) => ({
        // AudioのON/OFF
        isRunAudio: false,
        toggleAudio: () => set((state) => ({ isRunAudio: !state.isRunAudio })),
        // SidebarのON/OFF
        isSidebarOpen: false,
        toggleSidebar: () =>
          set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
        // Modelの選択
        modelData: modelList.length > 0 ? modelList[0] : initModelData,
        setModel: (value: AIModelData) => set({ modelData: value }),

        totalTokenCount: 0,
        setTotalTokenCount: (value: number) => {
          set({ totalTokenCount: value });
        },
      }),
      {
        name: "chatStore",
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(
              ([key]) => !["totalTokenCount"].includes(key)
            )
          ),
      } as PersistOptions<ChatStoreState>
    )
  );

export default useChatStore;
