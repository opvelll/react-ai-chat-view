"use client"
import { Fragment, useEffect, useRef } from "react";
import { SlReload } from "react-icons/sl";
import { MdCancel } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ChatContextType, ChatType } from "./ChatContextType";

type ChatViewProps =
  {
    inputTextValue: string,
    setInputTextValue: (value: string) => void,
    isLoading: boolean,
    context: ChatContextType,
    submitChat: () => Promise<void>,
    removeMessage: (index: number) => void,
    isLastMessageUser: () => boolean,
    submitChatWithUserMessage: (inputTextValue: string) => Promise<void>,
    processChatWithoutLastMessage: () => Promise<void>
  }

export default function ChatView({
  inputTextValue,
  setInputTextValue,
  isLoading,
  context,
  submitChat,
  removeMessage,
  isLastMessageUser,
  submitChatWithUserMessage,
  processChatWithoutLastMessage
}: ChatViewProps) {
  // チャット状態の更新時に最下部にスクロール
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [context]);

  async function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && inputTextValue !== "") await submitChatWithUserMessage(inputTextValue);
  }

  async function handleChatButton(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (inputTextValue !== "") return await submitChatWithUserMessage(inputTextValue);
    if (isLastMessageUser()) return await submitChat();// 会話の編集時(最後のアシスタントメッセージを削除した状態)用
  }

  const handleResetLastMessage = async () => await processChatWithoutLastMessage();

  return (
    <div className="flex flex-row w-full">
      <main className="flex-1 flex flex-col items-center w-full px-20">
        <div className="pt-12 min-h-screen border-l border-r w-full px-5 pb-32">
          {context
            .filter((chat) => chat.role !== "system") // contextから1引く
            .map((chat, index) => {
              return (
                <Fragment key={chat.id}>
                  {ChatBubbleView(index, chat, context, handleResetLastMessage, removeMessage)}
                </Fragment>
              );
            })}
        </div>

        <div ref={messagesEndRef}></div>

        {FormView(inputTextValue, setInputTextValue, isLoading, handleKeyPress, handleChatButton)}
        {/* エラー表示 */}
        <ToastContainer position="bottom-right" closeOnClick />
      </main>

    </div>

  );
}

// チャット会話部分
function ChatBubbleView(index: number, chat: ChatType, context: ChatContextType, handleResetLastMessage: () => void, removeMessage: (index: number) => void) {
  return (
    <div

      className={`mb-1 flex ${chat.role === "user" ? "flex-row" : "flex-row-reverse"
        }`}
    >
      <div
        className={`${chat.role === "user"
          ? "bg-blue-400 text-white"
          : "bg-gray-200"
          } inline-block rounded-lg p-2 whitespace-pre-wrap`}
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

// 入力画面
function FormView(inputTextValue: string, setInputTextValue: (value: string) => void, isLoading: boolean, handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void, handleChatButton: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) {
  return (

    <form className="fixed z-40 bottom-0 left-1/2 transform -translate-x-1/2 w-10/12 p-4">
      <div className="flex flex-row">
        <input
          type="text"
          className="w-full bg-gray-100 border border-gray-300 rounded-l py-2 px-4"
          value={inputTextValue}
          onChange={(e) => setInputTextValue(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isLoading}
          placeholder=""
        />
        {/* ローディングスピナー */}
        {isLoading && (
          <div className="absolute inset-y-0 left-8 flex items-center pr-3">
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {/* 送信ボタン */}
        <button className="bg-gray-100 hover:bg-gray-300 border border-gray-300 rounded-r p-2"
          onClick={handleChatButton}
          title="Send">
          <div className="flex justify-center">
            <FaArrowUp />
          </div>
        </button>
      </div>

    </form>

  )
}