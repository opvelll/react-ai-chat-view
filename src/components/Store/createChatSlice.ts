import { StateCreator } from "zustand";
import {
  AIModelData,
  ModelDataList,
  initModelData,
} from "../ChatView/Type/ModelDataList";
import { ChatStoreState } from "./useChatStore";

export type ChatSlice = {
  modelData: AIModelData;
  setModel: (value: AIModelData) => void;
  totalTokenCount: number;
  setTotalTokenCount: (value: number) => void;
};

const createChatSlice: (
  ModelList: ModelDataList
) => StateCreator<
  ChatStoreState,
  [["zustand/persist", unknown]],
  [],
  ChatSlice
> = (modelList) => (set) => ({
  modelData: modelList.length > 0 ? modelList[0] : initModelData,
  setModel: (value: AIModelData) => set({ modelData: value }),
  totalTokenCount: 0,
  setTotalTokenCount: (value: number) => {
    set({ totalTokenCount: value });
  },
});

export default createChatSlice;
