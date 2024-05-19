import HeaderMenu from "./HeaderMenu";
import { useChat, ChatProp } from "./useChat";
import ChatView from "./ChatView";
import { useState } from "react";

export type ChatFormButtonHandlers = {
    handleGetSelectionButton: (
        inputTextValue: string,
        setInputTextValue: (value: string) => void
    ) => Promise<void>;
}

export type ModelList = {
    modelList: string[];
}

export type AIChatViewProps = ChatProp & ChatFormButtonHandlers & ModelList;

export default function AIChatView({
    systemPrompt,
    fetchAIChatAPI,
    handleGetSelectionButton,
    fetchVoiceAPI,
    modelName,
    modelList }: AIChatViewProps) {

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
                    handleGetSelectionButton={handleGetSelectionButton}
                    {...props} />
            </div>
        </div>
    )
}
