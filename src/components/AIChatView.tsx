import HeaderMenu from "./HeaderMenu";
import { useChat, ChatProp } from "./useChat";
import ChatView from "./ChatView";
import { useState } from "react";
import { ChatFormButtonDataList } from "./ChatForm/ChatForm";


export type ModelList = {
    modelList: string[];
}

export type AIChatViewProps = ChatProp & ModelList & ChatFormButtonDataList;

export default function AIChatView({
    systemPrompt,
    fetchAIChatAPI,
    fetchVoiceAPI,
    modelName,
    modelList,
    topButtonDataList,
    bottomButtonDataList
}: AIChatViewProps) {

    const [model, setModel] = useState(modelName);

    const {
        resetChat,
        ...props
    } = useChat({ fetchAIChatAPI, fetchVoiceAPI, systemPrompt, modelName: model });

    return (
        <div className="w-full">
            <HeaderMenu resetChat={resetChat} isOudio={!!fetchVoiceAPI} modelList={modelList} model={model} setModel={setModel} />
            <div className="flex flex-row w-full">
                <ChatView
                    {...{ topButtonDataList, bottomButtonDataList }}
                    {...props} />
            </div>
        </div>
    )
}
