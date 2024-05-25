import React, { useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { ChatFormButtonData } from './ChatFormSideButton';
import ButtonList from './ButtonList';
import { Id } from 'react-toastify';

type ChatFormProps = {
    inputTextValue: string;
    setInputTextValue: (value: string) => void;
    textAreaRef: React.RefObject<HTMLTextAreaElement>;
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleKeyPress: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    handleChatButton: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    isLoading: boolean;
    adjustHeight: () => void;
    scrollToBottom: (textValue: string) => void;
    handleSideButton: (func: (inputTextValue: string, showCautionToast: (cautionMessage: string) => Id) => Promise<string>) => () => Promise<void>;
} & ChatFormButtonDataList;

export type ChatFormButtonDataList = {
    topButtonDataList?: ChatFormButtonData[];
    bottomButtonDataList?: ChatFormButtonData[];
}

const ChatForm: React.FC<ChatFormProps> = ({
    inputTextValue,
    textAreaRef,
    handleChange,
    handleKeyPress,
    handleChatButton,
    isLoading,
    adjustHeight,
    handleSideButton,
    topButtonDataList,
    bottomButtonDataList
}) => {

    useEffect(() => {
        adjustHeight();
    }, [adjustHeight, inputTextValue]);

    return (
        <div className="fixed bottom-0 px-4 py-1 w-full md:w-10/12">
            <ButtonList buttonDataList={topButtonDataList} handleSideButton={handleSideButton} />
            <form id="chatForm" name="chatForm" className="flex justify-center bg-gray-100 md:shadow-md drop-shadow-md rounded-lg">
                <div className="flex items-center w-full">
                    <textarea
                        ref={textAreaRef}
                        className="bg-gray-100 box-border ml-3 mt-1 mb-1 pt-2 pb-2 pl-1 pr-1 w-full border-0 resize-none rounded-lg focus:outline-none overflow-auto whitespace-nowrap scrollbar-thin h-auto"
                        style={{ maxHeight: "35rem" }}
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
                    <button className="bg-gray-100 hover:bg-gray-300 border-2 border-gray-300 ml-1 mt-2 mr-2 mb-2 size-9 rounded-lg"
                        onClick={handleChatButton}
                        title="Send">
                        <div className="flex justify-center">
                            <FaArrowUp />
                        </div>
                    </button>
                </div>
            </form>
            <ButtonList buttonDataList={bottomButtonDataList} handleSideButton={handleSideButton} />
        </div>)
};

export default ChatForm;
