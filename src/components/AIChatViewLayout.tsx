import HeaderMenu from "./ChatView/HeaderMenu";
import ChatView from "./ChatView/ChatView";
import { ChatFormButtonDataList } from "./ChatView/ChatForm/ChatForm";
import AudioComponent from "./ChatView/AudioComponent";
import { AIChatViewProp } from "./Type/AIChatViewProp";


export type AIChatViewProps = AIChatViewProp & ChatFormButtonDataList;

export default function AIChatViewLayout({
    fetchVoiceAPI,
    topButtonDataList,
    bottomButtonDataList
}: AIChatViewProps) {

    return (
        <div className="w-full">
            <HeaderMenu isOudio={!!fetchVoiceAPI} />
            <AudioComponent />
            <div className="flex flex-row w-full">
                <ChatView {...{ topButtonDataList, bottomButtonDataList }} />
            </div>
        </div>
    )
}
