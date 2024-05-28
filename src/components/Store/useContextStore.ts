import { useContext } from "react";
import { StoreContext } from "../AIChatViewRoot";

export default function useContextChatStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("Store is not found");
  return store;
}
