import { ChatContextType, ChatType } from "./ChatContextType"
import { SlReload } from "react-icons/sl";
import { MdCancel } from "react-icons/md";


export type ChatBubbleViewProps = {
    index: number,
    chat: ChatType,
    context: ChatContextType,
    handleResetLastMessage: () => void,
    removeMessage: (index: number) => void
}

export default function ChatBubbleView({ index, chat, context, handleResetLastMessage, removeMessage }: ChatBubbleViewProps) {
    return (
        <div
            className={`mb-1 flex ${chat.role === "user" ? "flex-row" : "flex-row-reverse"}`}
        >
            <div
                className={`${chat.role === "user"
                    ? "bg-blue-100"
                    : "bg-gray-200"
                    } inline-block rounded-lg p-2 whitespace-pre-wrap break-all`}
            >
                {chat.content}
                <span className="text-black ml-1 inline-flex flex-row gap-1.5">
                    {/* 最後の行のアシスタント側に、アシスタントの返事再生成ボタンを作成 */}
                    {index === context.length - 2 && chat.role === 'assistant' && (
                        <button type="button"
                            onClick={() => handleResetLastMessage()}
                            className=" bg-transparent hover:bg-slate-300 font-bold p-1.5 rounded-full">
                            <SlReload />
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => removeMessage(index + 1)} // systemの分を除く
                        className=" bg-transparent hover:bg-slate-300 font-bold p-1.5 rounded-full"
                    >
                        <MdCancel />
                    </button >
                </span>
            </div>
        </div>
    )
}