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

export default function useAIChatView(aiChatProp: AIChatViewProps) {
    const {
        resetChat,
        inputTextValue,
        setInputTextValue,
        ...props
    } = useChat(aiChatProp);

    const AIChatView = () => (
        <div className="w-full">
            <HeaderMenu resetChat={resetChat} isOudio={!!aiChatProp.fetchVoiceAPI} />
            <div className="flex flex-row w-full">
                <ChatView inputTextValue={inputTextValue}
                    setInputTextValue={setInputTextValue}
                    handleGetSelectionButton={aiChatProp.handleGetSelectionButton}
                    {...props} />
            </div>
        </div>
    )

    return { inputTextValue, setInputTextValue, AIChatView }
}
