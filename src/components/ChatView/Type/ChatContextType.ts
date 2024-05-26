export type ChatContextType = ChatType[];

export type ChatType = {
  id: string;
  role: RoleType;
  content: string;
  tokenCount: number;
};

export type RoleType = "system" | "user" | "assistant";
