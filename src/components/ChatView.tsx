import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import useChatForm from "./ChatForm/useChatForm";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ChatContextType } from "./ChatContextType";
import ChatForm, { ChatFormButtonDataList } from "./ChatForm/ChatForm";
import ChatBubbleView from "./ChatBubbleView";

type ChatViewProps =
  {
    inputTextValue: string,
    setInputTextValue: (value: string) => void,
    textAreaRef: React.RefObject<HTMLTextAreaElement>,
    isLoading: boolean,
    context: ChatContextType,
    submitChat: () => Promise<void>,
    removeMessage: (index: number) => void,
    isLastMessageUser: () => boolean,
    submitChatWithUserMessage: (inputTextValue: string) => Promise<void>,
    processChatWithoutLastMessage: () => Promise<void>
  } & ChatFormButtonDataList;

export default function ChatView({
  inputTextValue,
  setInputTextValue,
  textAreaRef,
  isLoading,
  context,
  submitChat,
  removeMessage,
  isLastMessageUser,
  submitChatWithUserMessage,
  processChatWithoutLastMessage,
  buttonDataList,
}: ChatViewProps) {

  // チャット状態の更新時に最下部にスクロール
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [prevMessageCount, setPrevMessageCount] = useState(0);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => {
    if (prevMessageCount !== 0 && context.length > prevMessageCount) {
      scrollToBottom();
    }
    setPrevMessageCount(context.length);
  }, [context.length, prevMessageCount]);

  const handleResetLastMessage = useCallback(async () => await processChatWithoutLastMessage(), [processChatWithoutLastMessage]);

  const { ...props } = useChatForm({ inputTextValue, setInputTextValue, textAreaRef, submitChatWithUserMessage, submitChat, isLastMessageUser });

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

        <ChatForm {...{ isLoading, textAreaRef, buttonDataList }} {...props} />

        {/* エラー表示 */}
        <ToastContainer position="bottom-right" closeOnClick />
      </main>

    </div>

  );
}

