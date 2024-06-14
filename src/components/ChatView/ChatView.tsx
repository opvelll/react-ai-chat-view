import { Fragment, useEffect, useRef, useState } from "react";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ChatForm, { ChatFormButtonDataList } from "./ChatForm/ChatForm";
import ChatBubbleView from "./ChatBubbleView";
import useContextChatStore from "../Store/useContextStore";

type ChatViewProps = ChatFormButtonDataList;

export default function ChatView({
  topButtonDataList,
  bottomButtonDataList
}: ChatViewProps) {
  const store = useContextChatStore();
  const {
    chatContext,

  } = store();

  // チャット状態の更新時に最下部にスクロール
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [prevMessageCount, setPrevMessageCount] = useState(0);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => {
    if (prevMessageCount !== 0 && chatContext.length > prevMessageCount) {
      scrollToBottom();
    }
    setPrevMessageCount(chatContext.length);
  }, [chatContext.length, prevMessageCount]);

  return (
    <div className="flex flex-row w-full">
      <main className="flex-1 flex flex-col items-center w-full px-0 md:px-20">
        <div className="pt-2 min-h-screen md:border-l md:border-r w-full px-5 pb-36">
          {chatContext
            .filter((chat) => chat.role !== "system") // contextから1引く
            .map((chat, index) => {
              return (
                <Fragment key={index}>
                  <ChatBubbleView {...{ index, chat, chatContext }} />
                </Fragment>
              );
            })}
          <div ref={messagesEndRef}></div>
        </div>

        <ChatForm {...{ topButtonDataList, bottomButtonDataList }} />

        {/* エラー表示 */}
        <ToastContainer position="bottom-right" closeOnClick />
      </main>

    </div>

  );
}

