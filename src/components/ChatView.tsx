"use client"
import { Fragment, useEffect, useRef } from "react";
import { SlReload } from "react-icons/sl";
import { MdCancel } from "react-icons/md";
import useChatForm from "./useChatForm";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ChatContextType, ChatType } from "./ChatContextType";
import ChatForm from "./ChatForm";

type ChatViewProps =
  {
    isLoading: boolean,
    context: ChatContextType,
    submitChat: () => Promise<void>,
    removeMessage: (index: number) => void,
    isLastMessageUser: () => boolean,
    submitChatWithUserMessage: (inputTextValue: string) => Promise<void>,
    processChatWithoutLastMessage: () => Promise<void>,

    handleGetSelectionButton: (inputTextValue: string, setInputTextValue: (value: string) => void) => Promise<void>
  }

export default function ChatView({
  isLoading,
  context,
  submitChat,
  removeMessage,
  isLastMessageUser,
  submitChatWithUserMessage,
  processChatWithoutLastMessage,
  handleGetSelectionButton
}: ChatViewProps) {
  // チャット状態の更新時に最下部にスクロール
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [context]);

  const handleResetLastMessage = async () => await processChatWithoutLastMessage();

  const { ...props } = useChatForm({ submitChatWithUserMessage, submitChat, isLastMessageUser });

  return (
    <div className="flex flex-row w-full">
      <main className="flex-1 flex flex-col items-center w-full px-0 md:px-20">
        <div className="pt-2 min-h-screen md:border-l md:border-r w-full px-5 pb-32">
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

        <ChatForm isLoading={isLoading} {...props} handleGetSelectionButton={handleGetSelectionButton} />

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
          ? "bg-blue-100"
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
