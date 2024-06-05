import HeaderMenu from "./ChatView/HeaderMenu";
import { useChat, ChatProp } from "./ChatView/useChat";
import ChatView from "./ChatView/ChatView";
import { ChatFormButtonDataList } from "./ChatView/ChatForm/ChatForm";
import { ModelDataList, allModelList } from "./ChatView/Type/ModelDataList";


export type AIChatViewProps = ChatProp & ModelList & ChatFormButtonDataList;

export type ModelList = {
    modelList?: ModelDataList
}

export default function AIChatViewLayout({
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
    } = useChat({
        fetchAIChatAPI,
        fetchVoiceAPI,
        systemPrompt,
    });

    return (
        <div className="w-full">
            <HeaderMenu resetChat={resetChat} isOudio={!!fetchVoiceAPI} modelList={modelList || allModelList} />
            <div className="flex flex-row w-full">
                <ChatView
                    {...{ topButtonDataList, bottomButtonDataList }}
                    {...props} />
            </div>
        </div>
    )
}
