import HeaderMenu from "./HeaderMenu";
import { useChat, ChatProp } from "./useChat";
import ChatView from "./ChatView";
import { useState } from "react";
import { ChatFormButtonHandles } from "./ChatForm/ChatForm";


export type ModelList = {
    modelList: string[];
}

export type AIChatViewProps = ChatProp & ChatFormButtonHandles & ModelList;

export default function AIChatView({
    systemPrompt,
    fetchAIChatAPI,
    fetchVoiceAPI,
    modelName,
    modelList,
    handleGetSelectionButton,
    handleGetSubtitlesButton,
    handleGetAllPageButton,
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
                    {...{
                        handleGetSelectionButton,
                        handleGetSubtitlesButton,
                        handleGetAllPageButton,
                    }}
                    {...props} />
            </div>
        </div>
    )
}
