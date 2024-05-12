"use client"
import HeaderMenu from "./HeaderMenu";
import { useChat, ChatProp } from "./useChat";
import ChatView from "./ChatView";

export default function AIChatView(chatProp: ChatProp) {
    const {
        resetChat,
        ...props
    } = useChat(chatProp);


    return (
        <><div className="w-full">
            <HeaderMenu resetChat={resetChat} />
            <div className="flex flex-row w-full">
                <ChatView {...props} />
            </div>
        </div>
        </>
    )
}