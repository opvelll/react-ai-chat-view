import HeaderMenu from "./HeaderMenu";
import { useChat, ChatProp } from "./useChat";
import ChatView from "./ChatView";

export type ChatFormButtonHandlers = {
    handleGetSelectionButton: (
        inputTextValue: string,
        setInputTextValue: (value: string) => void
    ) => Promise<void>;
}

export type AIChatViewProps = ChatProp & ChatFormButtonHandlers;

export default function AIChatView(aiChatProp: AIChatViewProps) {

    const {
        resetChat,
        ...props
    } = useChat(aiChatProp);

    return (
        <div className="w-full">
            <HeaderMenu resetChat={resetChat} isOudio={!!aiChatProp.fetchVoiceAPI} />
            <div className="flex flex-row w-full">
                <ChatView
                    handleGetSelectionButton={aiChatProp.handleGetSelectionButton}
                    {...props} />
            </div>
        </div>
    )

}
