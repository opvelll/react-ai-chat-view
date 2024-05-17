"use client"
import { Fragment, useEffect, useRef } from "react";
import useChatForm from "./useChatForm";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ChatContextType } from "./ChatContextType";
import ChatForm from "./ChatForm";
import ChatBubbleView from "./ChatBubbleView";

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
                  <ChatBubbleView {...{ index, chat, context, handleResetLastMessage, removeMessage }} />
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

