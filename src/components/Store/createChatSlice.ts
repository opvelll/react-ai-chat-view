import { StateCreator } from "zustand";
import {
  AIModelData,
  defaultModelList,
  initModelData,
} from "../Type/ModelDataList";
import { ChatStoreState } from "./useChatStore";
import { AIChatViewProps } from "../AIChatViewLayout";
import {
  ChatContextType,
  ChatType,
  createSystemMessage,
  getUpdatedContextWithAssistantMessage,
  getUpdatedContextWithUserMessage,
  getUpdatedContextWithoutLastMessage,
} from "../Type/ChatContextType";
import { AIChatResponse } from "../Type/AIChatAPIType";
import { useRef } from "react";
import { showErrorToast } from "../Toast";

export type ChatSlice = {
  modelData: AIModelData;
  setModel: (value: AIModelData) => void;
  modelList: AIModelData[];
  setModelList: (value: AIModelData[]) => void;
  totalTokenCount: number;
  setTotalTokenCount: (value: number) => void;

  systemPrompt: string;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  inputTextValue: string;
  setInputTextValue: (value: string) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  chatContext: ChatContextType;
  setChatContext: (context: ChatContextType) => void;
  resetChat: () => void;
  getLastMessage: () => ChatType | undefined;
  isLastMessageUser: () => boolean;
  removeMessage: (index: number) => void;
  submitChat: () => Promise<void>;
  submitChatWithUserMessage: (
    userMessage: string,
    images: string[]
  ) => Promise<void>;
  processChatWithoutLastMessage: () => Promise<void>;
  processChatContext: (context: ChatContextType) => Promise<void>;
  handleResponse: (
    chatContext: ChatContextType,
    aiChatResponse: AIChatResponse
  ) => Promise<void>;
  handleError: (e: Error) => void;
};

const createChatSlice: (
  props: AIChatViewProps
) => StateCreator<
  ChatStoreState,
  [["zustand/persist", unknown]],
  [],
  ChatSlice
> = (props) => (set, get) => ({
  modelList: props.modelList || defaultModelList,
  setModelList: (value: AIModelData[]) => set({ modelList: value }),

  modelData:
    props.modelList && props.modelList.length > 0
      ? props.modelList[0]
      : initModelData,
  setModel: (value: AIModelData) => set({ modelData: value }),
  totalTokenCount: 0,
  setTotalTokenCount: (value: number) => set({ totalTokenCount: value }),

  systemPrompt: props.systemPrompt,
  textAreaRef: useRef<HTMLTextAreaElement>(null),
  inputTextValue: "",
  setInputTextValue: (value: string) => set({ inputTextValue: value }),
  isLoading: false,
  setIsLoading: (value: boolean) => set({ isLoading: value }),
  chatContext: [createSystemMessage("")],
  setChatContext: (context: ChatContextType) => set({ chatContext: context }),
  resetChat: () => {
    set({
      chatContext: [createSystemMessage(get().systemPrompt)],
      totalTokenCount: 0,
    });
  },
  getLastMessage: () => get().chatContext.slice(-1)[0],
  isLastMessageUser: () => get().getLastMessage()?.role === "user",
  removeMessage: (index: number) =>
    set((state) => ({
      chatContext: state.chatContext.filter((_, i) => i !== index),
    })),

  submitChat: async () => await get().processChatContext(get().chatContext),
  submitChatWithUserMessage: async (userMessage: string, images: string[]) => {
    await get().processChatContext(
      getUpdatedContextWithUserMessage(get().chatContext, userMessage, images)
    );
  },
  processChatWithoutLastMessage: async () => {
    await get().processChatContext(
      getUpdatedContextWithoutLastMessage(get().chatContext)
    );
  },
  processChatContext: async (context: ChatContextType) => {
    try {
      set({ chatContext: context, inputTextValue: "", isLoading: true });
      const response = await props.fetchAIChatAPI(get().modelData, context);
      await get().handleResponse(context, response);
      setTimeout(() => get().textAreaRef.current?.focus(), 0);
    } catch (e) {
      get().handleError(e as Error);
    }
  },
  handleResponse: async (
    chatContext: ChatContextType,
    aiChatResponse: AIChatResponse
  ) => {
    set({
      chatContext: getUpdatedContextWithAssistantMessage(
        chatContext,
        aiChatResponse.content,
        aiChatResponse.tokenCount
      ),
      totalTokenCount: aiChatResponse.totalTokenCount,
      isLoading: false,
    });
    if (props.fetchVoiceAPI && get().isRunAudio)
      get().play(await props.fetchVoiceAPI(aiChatResponse.content));
  },
  handleError: (e: Error) => {
    showErrorToast(e.message);
    console.error(e);
    set({ isLoading: false });
  },
});

export default createChatSlice;
