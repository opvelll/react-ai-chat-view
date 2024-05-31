import { useRef, useState } from "react";
import { showErrorToast } from "../Toast";
import { useAudio } from "./useAudio";
import {
  ChatContextType,
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

export function useChat({
  systemPrompt,
  fetchAIChatAPI,
  fetchVoiceAPI = null,
}: ChatProp) {
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

  const getLastMessage = () => chatContext.slice(-1)[0];

  const isLastMessageUser = () => getLastMessage()?.role === "user";

  const removeMessage = (index: number) =>
    setChatContext((prev) => prev.filter((_, i) => i !== index));

  const submitChat = async () => await processChatContext(chatContext);

  async function submitChatWithUserMessage(userMessage: string) {
    await processChatContext(
      getUpdatedContextWithUserMessage(chatContext, userMessage)
    );
  }

  async function processChatWithoutLastMessage() {
    await processChatContext(getUpdatedContextWithoutLastMessage(chatContext));
  }

  async function processChatContext(context: ChatContextType) {
    try {
      setIsLoading(true);
      await handleResponse(context, await fetchAIChatAPI(modelName, context)); // ChatGPT等AIからの応答をフェッチ + 応答の処理 音声化も行う
      resetInput();
    } catch (e) {
      handleError(e as Error); // エラー処理
    }
  }

  // 入力とローディング状態のリセット
  function resetInput() {
    setInputTextValue("");
    setTimeout(() => textAreaRef.current?.focus(), 0); // 少し遅延させてフォーカスを設定
  }

  // 応答の処理
  async function handleResponse(
    chatContext: ChatContextType,
    aiChatResponse: AIChatResponse
  ) {
    setChatContext(
      getUpdatedContextWithAssistantMessage(
        chatContext,
        aiChatResponse.content,
        aiChatResponse.tokenCount
      )
    ); // 応答をコンテキストに追加
    setTotalTokenCount(aiChatResponse.totalTokenCount); // Storeのトークン数の更新
    if (fetchVoiceAPI && isRunAudio)
      setVoiceAudioData(await fetchVoiceAPI(aiChatResponse.content)); // 音声化
    setIsLoading(false);
  }

  // エラー処理
  function handleError(e: Error) {
    showErrorToast(e.message);
    console.error(e);
    setIsLoading(false);
  }

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
}
