"use client";
import { useState } from "react";

import { ChatType, ChatContextType, RoleType } from "./ChatContextType";
import { v4 as uuidv4 } from "uuid";

export function useChatContext(initialSystemPrompt: string) {
  const createMessage = (role: RoleType, content: string): ChatType => ({
    id: uuidv4(),
    role,
    content,
  });

  const createSystemMessage = (content: string): ChatType =>
    createMessage("system", content);

  const createUserMessage = (content: string): ChatType =>
    createMessage("user", content);

  const createAssistantMessage = (content: string): ChatType =>
    createMessage("assistant", content);

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

  const addUserMessage = (message: string) => {
    setChatContext((context) => [...context, createUserMessage(message)]);
  };

  const addAssistantMessage = (message: string) => {
    setChatContext((context) => [...context, createAssistantMessage(message)]);
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
