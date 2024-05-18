import HeaderMenu from "./HeaderMenu";
import { useChat, ChatProp } from "./useChat";
import ChatView from "./ChatView";
import useChatStore from "./useChatStore";
import { useEffect } from "react";

export type ChatFormButtonHandlers = {
    handleGetSelectionButton: (
        inputTextValue: string,
        setInputTextValue: (value: string) => void
    ) => Promise<void>;
}

export type ModelList = {
    initModelName: string;
    modelList: string[];

}

export type AIChatViewProps = ChatProp & ChatFormButtonHandlers & ModelList;

export default function AIChatView({
    systemPrompt,
    fetchAIChatAPI,
    handleGetSelectionButton,
    fetchVoiceAPI,
    initModelName,
    modelList }: AIChatViewProps) {

    const setModelName = useChatStore((state) => state.setModelName);
    const setModelList = useChatStore((state) => state.setModelList);

    useEffect(() => {
        setModelName(initModelName);
        setModelList(modelList);
    }, [initModelName, modelList, setModelList, setModelName])

    const {
        resetChat,
        ...props
    } = useChat({ fetchAIChatAPI, fetchVoiceAPI, systemPrompt });



    return (
        <div className="w-full">
            <HeaderMenu resetChat={resetChat} isOudio={!!fetchVoiceAPI} />
            <div className="flex flex-row w-full">
                <ChatView
                    handleGetSelectionButton={handleGetSelectionButton}
                    {...props} />
            </div>
        </div>
    )
}
