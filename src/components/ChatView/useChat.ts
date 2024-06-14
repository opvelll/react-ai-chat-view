import { useRef, useState } from "react";
import { showErrorToast } from "../Toast";
import {
  ChatContextType,
  ChatType,
  createSystemMessage,
  getUpdatedContextWithAssistantMessage,
  getUpdatedContextWithUserMessage,
  getUpdatedContextWithoutLastMessage,
} from "./Type/ChatContextType";
import { AIChatResponse } from "./Type/AIChatAPIType";
import useContextChatStore from "../Store/useContextStore";
import { AIModelData } from "./Type/ModelDataList";

export type AudioSource = string | Blob;

export type ChatProp = {
  systemPrompt: string;
  fetchAIChatAPI: (
    modelData: AIModelData,
    context: ChatContextType
  ) => Promise<AIChatResponse>;
  fetchVoiceAPI?: (text: string) => Promise<AudioSource>;
};

export const useChat = ({
  systemPrompt,
  fetchAIChatAPI,
  fetchVoiceAPI,
}: ChatProp) => {
  const [inputTextValue, setInputTextValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const store = useContextChatStore();
  const { modelData, setTotalTokenCount, play, isRunAudio } = store(
    (state) => state
  );

  const [chatContext, setChatContext] = useState<ChatContextType>([
    createSystemMessage(systemPrompt),
  ]);

  const resetChat = () => {
    setChatContext([createSystemMessage(systemPrompt)]);
    setTotalTokenCount(0);
  };

  const getLastMessage = (): ChatType | undefined => chatContext.slice(-1)[0];

  const isLastMessageUser = () => getLastMessage()?.role === "user";

  const removeMessage = (index: number) =>
    setChatContext((prev) => prev.filter((_, i) => i !== index));

  const submitChat = async () => await processChatContext(chatContext);

  const submitChatWithUserMessage = async (
    userMessage: string,
    images: string[]
  ) => {
    await processChatContext(
      getUpdatedContextWithUserMessage(chatContext, userMessage, images)
    );
  };

  const processChatWithoutLastMessage = async () => {
    await processChatContext(getUpdatedContextWithoutLastMessage(chatContext));
  };

  const processChatContext = async (context: ChatContextType) => {
    try {
      setChatContext(context); // ユーザー入力を画面に表示しておく
      setInputTextValue(""); // フォームをクリア
      setIsLoading(true);
      await handleResponse(context, await fetchAIChatAPI(modelData, context));
      setTimeout(() => textAreaRef.current?.focus(), 0); // フォーカスを戻す
    } catch (e) {
      handleError(e as Error);
    }
  };

  const handleResponse = async (
    chatContext: ChatContextType,
    aiChatResponse: AIChatResponse
  ) => {
    setChatContext(
      getUpdatedContextWithAssistantMessage(
        chatContext,
        aiChatResponse.content,
        aiChatResponse.tokenCount
      )
    );
    setTotalTokenCount(aiChatResponse.totalTokenCount);
    if (fetchVoiceAPI && isRunAudio)
      play(await fetchVoiceAPI(aiChatResponse.content));
    setIsLoading(false);
  };

  const handleError = (e: Error) => {
    showErrorToast(e.message);
    console.error(e);
    setIsLoading(false);
  };

  return {
    context: chatContext,
    inputTextValue,
    setInputTextValue,
    textAreaRef,
    isLoading,
    setIsLoading,
    removeMessage,
    submitChat,
    resetChat,
    isLastMessageUser,
    submitChatWithUserMessage,
    processChatWithoutLastMessage,
  };
};
