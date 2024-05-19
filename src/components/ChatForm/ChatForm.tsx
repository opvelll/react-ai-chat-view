import React, { useEffect } from 'react';
import { FaArrowUp, FaRegCopy } from 'react-icons/fa';
import { MdOutlineSubtitles } from 'react-icons/md';
import { SiPagekit } from "react-icons/si";

type ChatFormProps = {
    inputTextValue: string;
    setInputTextValue: (value: string) => void;
    textAreaRef: React.RefObject<HTMLTextAreaElement>;
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleKeyPress: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    handleChatButton: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    isLoading: boolean;
    adjustHeight: () => void;
} & ChatFormButtonHandles;

export type ChatFormButtonHandles = {
    handleGetSelectionButton: (inputTextValue: string, setInputTextValue: (value: string) => void) => Promise<void>
    handleGetSubtitlesButton: (inputTextValue: string, setInputTextValue: (value: string) => void) => Promise<void>
    handleGetAllPageButton: (inputTextValue: string, setInputTextValue: (value: string) => void) => Promise<void>
}


const ChatForm: React.FC<ChatFormProps> = ({
    inputTextValue,
    setInputTextValue,
    textAreaRef,
    handleChange,
    handleKeyPress,
    handleChatButton,
    isLoading,
    adjustHeight,
    handleGetSelectionButton,
    handleGetSubtitlesButton,
    handleGetAllPageButton,
}) => {

    useEffect(() => {
        adjustHeight();
    }, [adjustHeight, inputTextValue]); // inputTextValueが変わるたびに実行

    return (
        <div className="fixed bottom-0 px-4 py-1 w-full md:w-10/12">

            <form id="chatForm" name="chatForm" className="flex justify-center bg-gray-100 md:shadow-md drop-shadow-md rounded-lg">
                <div className="flex flex-col items-center w-full">
                    <textarea
                        ref={textAreaRef}
                        className="bg-gray-100 m-1 w-full p-3 border-0 resize-none rounded-lg focus:outline-none"
                        value={inputTextValue}
                        onChange={handleChange}
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
            <div className="flex mt-2 mb-1">
                <button className="rounded hover:bg-gray-300 border-white border bg-gray-200 px-2 py-1 md:text-lg text-orange-300 text"
                    title="get selection"
                    onClick={async () => await handleGetSelectionButton(inputTextValue, setInputTextValue)}>
                    <FaRegCopy />
                </button>
                <button className="rounded hover:bg-gray-300 border-white border bg-gray-200 px-2 py-1 ml-1 md:text-lg text-red-400"
                    title="subtitles"
                    onClick={async () => await handleGetSubtitlesButton(inputTextValue, setInputTextValue)}>
                    <MdOutlineSubtitles />
                </button>
                <button className="rounded hover:bg-gray-300 border-white border bg-gray-200 px-2 py-1 ml-1 md:text-lg text-gray-500"
                    title="all page"
                    onClick={async () => await handleGetAllPageButton(inputTextValue, setInputTextValue)}>
                    <SiPagekit />
                </button>
            </div>
        </div>)
};

export default ChatForm;
