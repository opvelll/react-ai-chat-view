import React, { useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { ChatFormButtonData, SideButtonFunctions } from './ChatFormSideButton';
import ButtonList from './ButtonList';
import { IoMdClose } from "react-icons/io";

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
    images: string[];
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    handleRemoveImage: (index: number) => void;
} & ChatFormButtonDataList & SideButtonFunctions;

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
    bottomButtonDataList,
    images,
    handleDrop,
    handleRemoveImage
}) => {



    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    useEffect(() => {
        adjustHeight();
    }, [adjustHeight, inputTextValue]);

    return (
        <div className="fixed bottom-0 px-4 py-1 w-full md:w-10/12">
            <ButtonList buttonDataList={topButtonDataList} handleSideButton={handleSideButton} />
            <form id="chatForm"
                name="chatForm"
                className="flex justify-center bg-gray-100 md:shadow-md drop-shadow-md rounded-lg"
                style={{ maxHeight: "30rem" }}>
                <div className="flex flex-col w-full"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}>
                    {images.length > 0 && <div className="preview grid grid-cols-4 max-h-36 overflow-auto pl-2 pt-2" style={{ minHeight: "8rem" }}>
                        {images.map((image, index) => (
                            <div key={index} className="thumbnail w-32 h-32 border border-gray-300 relative ">
                                <button
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-1 right-1 rounded-full w-6 h-6 flex items-center justify-center bg-white  hover:bg-red-100 hover:text-red-700"
                                >
                                    <IoMdClose />
                                </button>
                                <img src={image} alt={`preview-${index}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>}
                    <textarea
                        ref={textAreaRef}
                        className="bg-gray-100 w-full pl-2 pt-2 pb-1 border-0 resize-none rounded-lg focus:outline-none overflow-auto whitespace-nowrap"
                        style={{ maxHeight: "30rem", minHeight: "3rem" }}
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
