import { useState } from "react";

import { ChatType, ChatContextType, RoleType } from "./Type/ChatContextType";
import { v4 as uuidv4 } from "uuid";
// import { TiktokenModel, encoding_for_model } from "tiktoken";
//import useChatStore from "./useChatStore";

export function useChatContext(initialSystemPrompt: string) {
  //const modelName = useChatStore((state) => state.modelName);
  const createMessage = (
    role: RoleType,
    content: string,
    tokenCount?: number
  ): ChatType => ({
    id: uuidv4(),
    role,
    content,
    tokenCount: tokenCount ? tokenCount : 0,
  });

  // const getTokenCount = (content: string) => {
  //   const enc = encoding_for_model(
  //     modelName ? (modelName as TiktokenModel) : "gpt-4o"
  //   );
  //   console.log("modelName", modelName);
  //   const encoded = enc.encode(content);
  //   enc.free();
  //   console.log("tokenCount", encoded.length);
  //   return encoded.length;
  // };

  const createSystemMessage = (content: string): ChatType =>
    createMessage("system", content);

  const createUserMessage = (content: string, tokenCount?: number): ChatType =>
    createMessage("user", content, tokenCount);

  const createAssistantMessage = (
    content: string,
    tokenCount: number
  ): ChatType => createMessage("assistant", content, tokenCount);

  const [chatContext, setChatContext] = useState<ChatContextType>([
    createSystemMessage(initialSystemPrompt),
  ]);

  const resetContext = (initialSystemPrompt: string) => {
    setChatContext([createSystemMessage(initialSystemPrompt)]);
  };

  function getUpdatedContextWithUserMessage(message: string) {
    return [...chatContext, createUserMessage(message)];
  }

  function getUpdatedContextWithoutLastMessage() {
    return chatContext.slice(0, -1);
  }

  const addUserMessage = (message: string, tokenCount: number) => {
    setChatContext((context) => [
      ...context,
      createUserMessage(message, tokenCount),
    ]);
  };

  const addAssistantMessage = (message: string, tokenCount: number) => {
    setChatContext((context) => [
      ...context,
      createAssistantMessage(message, tokenCount),
    ]);
  };

  const removeMessage = (index: number) => {
    setChatContext((currentContext) =>
      currentContext.filter((_, i) => i !== index)
    );
  };

  // 最後のメッセージを取得
  const getLastMessage = () => chatContext.slice(-1)[0];

  const isLastMessageUser = () => getLastMessage()?.role === "user";

  return {
    context: chatContext,
    setContext: setChatContext,
    addUserMessage,
    addAssistantMessage,
    resetContext,
    removeMessage,
    getLastMessage,
    isLastMessageUser,
    getUpdatedContextWithUserMessage,
    getUpdatedContextWithoutLastMessage,
  };
}
