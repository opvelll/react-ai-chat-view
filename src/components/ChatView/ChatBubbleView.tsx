import { ChatContextType, ChatType } from "./ChatContextType"
import { SlReload } from "react-icons/sl";
import { MdCancel } from "react-icons/md";
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'

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
                    } inline-block rounded-lg p-2 whitespace-pre-wrap break-all max-w-full`}
            >
                <Markdown
                    children={chat.content}
                    components={{
                        code(props) {
                            const { children, className } = props
                            const match = /language-(\w+)/.exec(className || '')
                            return match ? (
                                <SyntaxHighlighter
                                    PreTag="div"
                                    children={String(children).replace(/\n$/, '')}
                                    language={match[1]}
                                    style={prism}
                                />
                            ) : (
                                <code className={`rounded overflow-auto ${className}`}>
                                    {children}
                                </code>
                            )
                        },
                        pre({ children }) {
                            return <pre className="overflow-auto">{children}</pre>;
                        }
                    }}
                />
                <span className="text-black ml-1 inline-flex flex-row gap-1.5">
                    {/* 最後の行のアシスタント側に、アシスタントの返事再生成ボタンを作成 */}
                    {index === context.length - 2 && chat.role === 'assistant' && (
                        <button type="button"
                            onClick={() => handleResetLastMessage()}
                            className=" bg-transparent hover:bg-slate-300 text-slate-600 font-bold p-1.5 rounded-full">
                            <SlReload />
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => removeMessage(index + 1)} // systemの分を除く
                        className=" bg-transparent hover:bg-slate-300 text-slate-600 font-bold p-1.5 rounded-full"
                    >
                        <MdCancel />
                    </button >
                </span>
            </div>
        </div>
    )
}