import { StoreApi, UseBoundStore, create } from "zustand";
import { PersistOptions, persist } from "zustand/middleware";
import createAudioSlice, { AudioSlice } from "./createAudioSlice";
import createSidebarSlice, { SidebarSlice } from "./createSidebarSlice";
import createChatSlice, { ChatSlice } from "./createChatSlice";
import { AIChatViewProps } from "../AIChatViewLayout";

export type ChatStoreState = ChatSlice & AudioSlice & SidebarSlice;

const useChatStore = (
  props: AIChatViewProps
): UseBoundStore<StoreApi<ChatStoreState>> =>
  create(
    persist<ChatStoreState>(
      (...a) => ({
        ...createAudioSlice(...a),
        ...createSidebarSlice(...a),
        ...createChatSlice(props)(...a),
      }),
      {
        name: "chatStore",
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(([key]) =>
              ["isRunAudio", "isSidebarOpen", "modelData"].includes(key)
            )
          ),
      } as PersistOptions<ChatStoreState>
    )
  );

export default useChatStore;
