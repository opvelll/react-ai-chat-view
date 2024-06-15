import React, { useEffect, useRef } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { ChatFormButtonData } from './ChatFormSideButton';
import ButtonList from './ButtonList';
import { IoMdClose } from "react-icons/io";
import useChatForm from './useChatForm';
import useContextChatStore from '../../Store/useContextStore';

export type ChatFormButtonDataList = {
    topButtonDataList?: ChatFormButtonData[];
    bottomButtonDataList?: ChatFormButtonData[];
}

const ChatForm: React.FC<ChatFormButtonDataList> = ({
    topButtonDataList,
    bottomButtonDataList,
}) => {

    const rightSideRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const store = useContextChatStore();
    const { isLoading, inputTextValue, textAreaRef, images } = store();
    const {
        adjustHeight,
        handleDrop,
        handleRemoveImage,
        handleClearButton,
        handleChatButton,
        handleChange,
        handleKeyPress
    } = useChatForm()

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    useEffect(() => {
        adjustHeight(rightSideRef, buttonRef);
    }, [adjustHeight, inputTextValue, images]);

    return (
        <div className="fixed bottom-0 px-4 py-1 w-full md:w-10/12">
            <ButtonList buttonDataList={topButtonDataList} />
            <form id="chatForm"
                name="chatForm"
                className="flex justify-center bg-gray-100 md:shadow-md drop-shadow-md rounded-lg"
                style={{ maxHeight: "30rem" }}>
                <div className="flex flex-col w-full"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}>
                    {/* 画像プレビュー */}
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
                    {/* 入力フォーム */}
                    <textarea
                        ref={textAreaRef}
                        className="bg-gray-100 w-full pl-2 pt-2 pb-1 border-0 resize-none rounded-lg focus:outline-none overflow-auto whitespace-nowrap"
                        style={{ maxHeight: "30rem" }}
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
                <div ref={rightSideRef} className={(inputTextValue || images.length > 0) ? "flex flex-col justify-between" : "flex flex-col justify-end"}>
                    {/* クリアボタン */}
                    {(inputTextValue || images.length > 0) && <button className="bg-gray-100 hover:bg-gray-300 border-gray-300 m-2 size-9 rounded-full flex items-center justify-center"
                        onClick={handleClearButton}
                        title="Clear">
                        <IoMdClose />
                    </button>}
                    {/* 送信ボタン */}
                    <button ref={buttonRef} className="bg-gray-100 hover:bg-gray-300 border-2 border-gray-300 m-2 size-9 rounded-lg flex items-center justify-center"
                        onClick={handleChatButton}
                        title="Send">
                        <FaArrowUp />
                    </button>
                </div>
            </form>
            <ButtonList buttonDataList={bottomButtonDataList} />
        </div>)
};

export default ChatForm;
