import { useEffect, useRef } from "react";
import { FaArrowUp } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import { MdOutlineSubtitles } from "react-icons/md";

export type ChatFormProps = {
    inputTextValue: string,
    setInputTextValue: (value: string) => void,
    isLoading: boolean,
    handleKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void,
    handleChatButton: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void

    handleGetSelectionButton: (inputTextValue: string, setInputTextValue: (value: string) => void) => Promise<void>
}

// 入力画面
export default function ChatForm({ inputTextValue, setInputTextValue, isLoading, handleKeyPress, handleChatButton, handleGetSelectionButton }: ChatFormProps) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        adjustHeight();
    }, [inputTextValue]);

    const adjustHeight = () => {
        const textArea = textAreaRef.current;
        if (textArea) {
            textArea.style.height = '1em'; // 高さを一旦リセット
            textArea.style.height = textArea.scrollHeight + 'px'; // 内容に基づいて高さを設定
        }
    };


    return (
        <div className="fixed z-40 bottom-0 p-4 w-full md:w-10/12">
            <div className="flex mb-1">
                <button className="rounded hover:bg-gray-300 border-white border bg-gray-200 px-2 py-1 ml-1 md:text-lg"
                    title="get selection"
                    onClick={async () => await handleGetSelectionButton(inputTextValue, setInputTextValue)}>
                    <FaRegCopy />
                </button>
                <button className="rounded hover:bg-gray-300 border-white border bg-gray-200 px-2 py-1 ml-1 md:text-lg"
                    title="subtitles">
                    <MdOutlineSubtitles />
                </button>
            </div>
            <form className="flex justify-center bg-gray-100 md:shadow-md drop-shadow-md rounded-lg">
                <div className="flex flex-col items-center w-full">
                    <textarea
                        ref={textAreaRef}
                        className="bg-gray-100 m-1 w-full p-3 border-0 resize-none rounded-lg focus:outline-none"
                        value={inputTextValue}
                        onChange={(e) => setInputTextValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        disabled={isLoading}
                        placeholder="..."
                    />
                </div>
                {/* ローディングスピナー */}
                {isLoading && (
                    <div className="absolute inset-y-0 left-8 flex items-center pr-3">
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                <div className="flex flex-col-reverse">
                    {/* 送信ボタン */}
                    <button className="bg-gray-100 hover:bg-gray-300 border-2 border-gray-300 m-2 size-10 rounded-lg"
                        onClick={handleChatButton}
                        title="Send">
                        <div className="flex justify-center">
                            <FaArrowUp />
                        </div>
                    </button>
                </div>


            </form>
        </div>
    )
}