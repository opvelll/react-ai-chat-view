import { StoreApi, UseBoundStore } from "zustand";
import AIChatViewLayout, { AIChatViewProps } from "./AIChatViewLayout";
import useChatStore, { ChatStoreState } from "./Store/useChatStore";
import { createContext } from "react";
import { allModelList } from "./ChatView/Type/ModelDataList";

export const StoreContext = createContext<UseBoundStore<StoreApi<ChatStoreState>> | null>(null);

export default function AIChatViewRoot(props: AIChatViewProps) {
    const store = useChatStore(props.modelList || allModelList);
    return (
        <StoreContext.Provider value={store}>
            <AIChatViewLayout {...props} />
        </StoreContext.Provider>
    )
}