import { useRef, useState } from "react";

import { useChatContext } from "./useChatContext";
import { showErrorToast } from "../Toast";
import { useAudio } from "./useAudio";
import { ChatContextType } from "./Type/ChatContextType";
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

  const {
    context,
    setContext,
    addAssistantMessage,
    resetContext,
    removeMessage,
    isLastMessageUser,
    getUpdatedContextWithUserMessage,
    getUpdatedContextWithoutLastMessage,
  } = useChatContext(systemPrompt);

  const { setVoiceAudioData, isRunAudio } = useAudio();
  const setTotalTokenCount = store((state) => state.setTotalTokenCount);

  async function submitChat() {
    await processChatContext(context);
  }

  async function submitChatWithUserMessage(userMessage: string) {
    await processChatContext(getUpdatedContextWithUserMessage(userMessage));
  }

  async function processChatWithoutLastMessage() {
    await processChatContext(getUpdatedContextWithoutLastMessage());
  }

  async function processChatContext(context: ChatContextType) {
    try {
      resetInputAndLoadingState(); // 入力とローディング状態のリセット
      setContext(context); // コンテキストの更新、画面に反映されるのは後なので//
      await handleResponse(await fetchAIChatAPI(modelName, context)); // ChatGPT等AIからの応答をフェッチ + 応答の処理 音声化も行う
    } catch (e) {
      handleError(e as Error); // エラー処理
    }
  }

  // 入力とローディング状態のリセット
  function resetInputAndLoadingState() {
    setInputTextValue("");
    setTimeout(() => textAreaRef.current?.focus(), 0); // 少し遅延させてフォーカスを設定
    setIsLoading(true);
  }

  // 応答の処理
  async function handleResponse({
    content,
    tokenCount,
    totalTokenCount,
  }: AIChatResponse) {
    addAssistantMessage(content, tokenCount); // 応答をコンテキストに追加
    setTotalTokenCount(totalTokenCount); // トークン数の更新
    if (fetchVoiceAPI && isRunAudio)
      setVoiceAudioData(await fetchVoiceAPI(content)); // 音声化
    setIsLoading(false);
  }

  // エラー処理
  function handleError(e: Error) {
    showErrorToast(e.message);
    console.error(e);
    setIsLoading(false);
  }

  function resetChat() {
    resetContext(systemPrompt);
  }

  return {
    context,
    setContext,
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
