import HeaderMenu from "./HeaderMenu";
import { useChat, ChatProp } from "./useChat";
import ChatView from "./ChatView";
import { ChatFormButtonDataList } from "./ChatForm/ChatForm";


export type ModelList = {
    modelList: string[];
}

export type AIChatViewProps = ChatProp & ModelList & ChatFormButtonDataList;

export default function AIChatView({
    systemPrompt,
    fetchAIChatAPI,
    fetchVoiceAPI,
    modelList,
    topButtonDataList,
    bottomButtonDataList
}: AIChatViewProps) {

    const {
        resetChat,
        ...props
    } = useChat({ fetchAIChatAPI, fetchVoiceAPI, systemPrompt });

    return (
        <div className="w-full">
            <HeaderMenu resetChat={resetChat} isOudio={!!fetchVoiceAPI} modelList={modelList} />
            <div className="flex flex-row w-full">
                <ChatView
                    {...{ topButtonDataList, bottomButtonDataList }}
                    {...props} />
            </div>
        </div>
    )
}
