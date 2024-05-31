export type ChatContextType = ChatType[];

export type ChatType = {
  role: RoleType;
  content: string;
  tokenCount: number;
};

export type RoleType = "system" | "user" | "assistant";

export type ChatContent = string | ChatContentListType[];

export type ChatContentListType =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: string };

export const createMessage = (
  role: RoleType,
  content: string,
  tokenCount?: number
): ChatType => ({
  role,
  content,
  tokenCount: tokenCount ? tokenCount : 0,
});

export const createSystemMessage = (content: string): ChatType =>
  createMessage("system", content);

export const createUserMessage = (
  content: string,
  tokenCount?: number
): ChatType => createMessage("user", content, tokenCount);

export const createAssistantMessage = (
  content: string,
  tokenCount: number
): ChatType => createMessage("assistant", content, tokenCount);

export const getUpdatedContextWithUserMessage = (
  chatContext: ChatContextType,
  message: string
) => [...chatContext, createUserMessage(message)];

export const getUpdatedContextWithAssistantMessage = (
  chatContext: ChatContextType,
  message: string,
  tokenCount: number
) => [...chatContext, createAssistantMessage(message, tokenCount)];

export const getUpdatedContextWithoutLastMessage = (
  chatContext: ChatContextType
) => chatContext.slice(0, -1);

export const removeMessage = (chatContext: ChatContextType, index: number) =>
  chatContext.filter((_, i) => i !== index);

export const getLastMessage = (chatContext: ChatContextType) =>
  chatContext.slice(-1)[0];

export const isLastMessageUser = (chatContext: ChatContextType) =>
  getLastMessage(chatContext)?.role === "user";
