export type ChatContextType = ChatType[];

export type ChatType = {
  id: string;
  role: RoleType;
  content: string;
};

export type RoleType = "system" | "user" | "assistant";
