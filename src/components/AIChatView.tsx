import HeaderMenu from "./HeaderMenu";
import { useChat, ChatProp } from "./useChat";
import ChatView from "./ChatView";
import React from 'react';

const AIChatView: React.FC<ChatProp> = (chatProp: ChatProp) => {
    const {
        resetChat,
        ...props
    } = useChat(chatProp);

    return (
        <div className="w-full">
            <HeaderMenu resetChat={resetChat} />
            <div className="flex flex-row w-full">
                <ChatView {...props} />
            </div>
        </div>
    )
}

export default AIChatView;