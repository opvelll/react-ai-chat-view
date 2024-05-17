import { useCallback, useState } from "react";

export type ChatFormProps = {
    submitChat: () => Promise<void>,
    isLastMessageUser: () => boolean,
    submitChatWithUserMessage: (inputTextValue: string) => Promise<void>,
}

// 入力画面
export default function useChatForm({ submitChat, isLastMessageUser, submitChatWithUserMessage }: ChatFormProps) {
    const [inputTextValue, setInputTextValue] = useState<string>("");

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => setInputTextValue(e.target.value), []);

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

    return { inputTextValue, setInputTextValue, handleChange, handleKeyPress, handleChatButton }
}