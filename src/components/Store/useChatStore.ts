import { StoreApi, UseBoundStore, create } from "zustand";
import { ModelDataList } from "../ChatView/Type/ModelDataList";
import { PersistOptions, persist } from "zustand/middleware";
import createAudioSlice, { AudioSlice } from "./createAudioSlice";
import createSidebarSlice, { SidebarSlice } from "./createSidebarSlice";
import createChatSlice, { ChatSlice } from "./createChatSlice";

export type ChatStoreState = ChatSlice & AudioSlice & SidebarSlice;

const useChatStore = (
  modelList: ModelDataList
): UseBoundStore<StoreApi<ChatStoreState>> =>
  create(
    persist<ChatStoreState>(
      (...a) => ({
        ...createAudioSlice(...a),
        ...createSidebarSlice(...a),
        ...createChatSlice(modelList)(...a),
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
