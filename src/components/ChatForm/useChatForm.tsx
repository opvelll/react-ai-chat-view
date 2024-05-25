import { useCallback } from "react";
import { showCautionToast, showErrorToast } from "../Toast";
import { Id } from "react-toastify";

export type ChatFormProps = {
    inputTextValue: string,
    setInputTextValue: (value: string) => void,
    textAreaRef: React.RefObject<HTMLTextAreaElement>,
    submitChat: () => Promise<void>,
    isLastMessageUser: () => boolean,
    submitChatWithUserMessage: (inputTextValue: string) => Promise<void>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
}

// 入力画面
export default function useChatForm({ inputTextValue,
    setInputTextValue,
    textAreaRef,
    submitChat,
    isLastMessageUser,
    submitChatWithUserMessage,
    setIsLoading
}: ChatFormProps) {

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => setInputTextValue(e.target.value), [setInputTextValue]);

    const handleKeyPress = useCallback(
        async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey && inputTextValue !== "") {
                e.preventDefault();
                await submitChatWithUserMessage(inputTextValue);
            }
        },
        [inputTextValue, submitChatWithUserMessage],
    );

    const handleChatButton = useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (inputTextValue !== "") return await submitChatWithUserMessage(inputTextValue);
        if (isLastMessageUser()) return await submitChat();// 会話の編集時(最後のアシスタントメッセージを削除した状態)用
    }, [inputTextValue, isLastMessageUser, submitChatWithUserMessage, submitChat]);

    const adjustHeight = useCallback(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';  // 高さを一旦リセット
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // 内容に基づいて高さを設定
        }
    }, [textAreaRef]);

    const scrollToBottom = useCallback((textValue: string) => {
        if (textAreaRef.current) {
            textAreaRef.current.focus();
            textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd = Array.from(textValue).length;
            setTimeout(() => { if (textAreaRef.current) textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight }, 0);
        }
    }, [textAreaRef]);

    const handleSideButton =
        (func: (inputTextValue: string, showCautionToast: (cautionMessage: string) => Id) => Promise<string>) => {
            return async () => {
                try {
                    setIsLoading(true);
                    const newInputValue = await func(inputTextValue, showCautionToast);
                    setInputTextValue(newInputValue);
                    await scrollToBottom(newInputValue);
                    setIsLoading(false);
                } catch (e) {
                    const error = e as Error;
                    showErrorToast(error.message);
                    console.error(error.message);
                }
            }
        }

    return {
        inputTextValue,
        setInputTextValue,
        handleChange,
        handleKeyPress,
        handleChatButton,
        adjustHeight,
        scrollToBottom,
        handleSideButton
    };
}