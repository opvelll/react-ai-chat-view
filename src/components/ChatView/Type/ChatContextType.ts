export type ChatContextType = ChatType[];

export type ChatType = {
  role: RoleType;
  content: ChatContent;
  tokenCount: number;
};

export type RoleType = "system" | "user" | "assistant";

export type ChatContent = string | ChatContentListType[];

export type ChatContentListType =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: string };

export const chatContentToStringList = (
  content: ChatContentListType[]
): string[] => {
  return content
    .filter((c) => c.type === "text")
    .map((c) => (c.type === "text" ? c.text : ""));
};

export const chatContentToImageURLList = (content: ChatContentListType[]) => {
  return content
    .filter((c) => c.type === "image_url")
    .map((c) => (c.type === "image_url" ? c.image_url : ""));
};

export type CreateMessageType = {
  role: RoleType;
  content: string;
  images?: string[];
  tokenCount?: number;
};

export const createMessage = ({
  role,
  content,
  images,
  tokenCount,
}: CreateMessageType): ChatType => {
  if (images && images.length > 0) {
    const contentList: ChatContentListType[] = images.map((image) => ({
      type: "image_url",
      image_url: image,
    }));
    return {
      role,
      content: [{ type: "text", text: content }, ...contentList],
      tokenCount: tokenCount || 0,
    };
  } else {
    return {
      role,
      content,
      tokenCount: tokenCount || 0,
    };
  }
};

export const createSystemMessage = (content: string): ChatType =>
  createMessage({ role: "system", content });

export const createUserMessage = (
  content: string,
  images: string[],
  tokenCount?: number
): ChatType => createMessage({ role: "user", content, images, tokenCount });

export const createAssistantMessage = (
  content: string,
  tokenCount: number
): ChatType => createMessage({ role: "assistant", content, tokenCount });

export const getUpdatedContextWithUserMessage = (
  chatContext: ChatContextType,
  message: string,
  images: string[]
) => [...chatContext, createUserMessage(message, images)];

export const getUpdatedContextWithAssistantMessage = (
  chatContext: ChatContextType,
  message: string,
  tokenCount: number
) => [...chatContext, createAssistantMessage(message, tokenCount)];

export const getUpdatedContextWithoutLastMessage = (
  chatContext: ChatContextType
) => chatContext.slice(0, -1);
