import { useRef, useState } from "react";
import { showErrorToast } from "../Toast";
import { useAudio } from "./useAudio";
import {
  ChatContextType,
  ChatType,
  createSystemMessage,
  getUpdatedContextWithAssistantMessage,
  getUpdatedContextWithUserMessage,
  getUpdatedContextWithoutLastMessage,
} from "./Type/ChatContextType";
import { AIChatResponse, ModelName } from "./Type/AIChatAPIType";
import useContextChatStore from "../Store/useContextStore";

export type ChatProp = {
  systemPrompt: string;
  fetchAIChatAPI: (
    modelName: ModelName,
    context: ChatContextType
  ) => Promise<AIChatResponse>;
  fetchVoiceAPI?: ((text: string) => Promise<Blob>) | null;
};

export const useChat = ({
  systemPrompt,
  fetchAIChatAPI,
  fetchVoiceAPI = null,
}: ChatProp) => {
  const [inputTextValue, setInputTextValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const store = useContextChatStore();
  const modelName = store((state) => state.modelName);
  const setTotalTokenCount = store((state) => state.setTotalTokenCount);

  const { setVoiceAudioData, isRunAudio } = useAudio();

  const [chatContext, setChatContext] = useState<ChatContextType>([
    createSystemMessage(systemPrompt),
  ]);

  const resetChat = () => setChatContext([createSystemMessage(systemPrompt)]);

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
      setIsLoading(true);
      setChatContext(context); // ユーザー入力を画面に表示しておく
      await handleResponse(context, await fetchAIChatAPI(modelName, context));
      resetInput();
    } catch (e) {
      handleError(e as Error);
    }
  };

  const resetInput = () => {
    setInputTextValue("");
    setTimeout(() => textAreaRef.current?.focus(), 0);
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
      setVoiceAudioData(await fetchVoiceAPI(aiChatResponse.content));
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
