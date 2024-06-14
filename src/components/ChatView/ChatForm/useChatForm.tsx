import { useCallback, useState } from "react";
import { showCautionToast, showErrorToast } from "../../Toast";
import { SideButtonFunc } from "./ChatFormSideButton";
import useContextChatStore from "../../Store/useContextStore";

// 入力画面
export default function useChatForm() {
    const store = useContextChatStore();
    const { textAreaRef,
        inputTextValue,
        setInputTextValue,
        isLastMessageUser,
        submitChatWithUserMessage,
        resubmitChatContextAsIs,
        setIsLoading } = store();

    const [images, setImages] = useState<string[]>([]);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (!file) return;
        // 許可されたファイル形式のリスト
        const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/gif"];

        // ファイルのタイプが許可された形式に含まれているか確認
        if (!allowedFormats.includes(file.type)) {
            showCautionToast("png,jpeg,webp,gifファイルのみ対応しています");
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            setImages([...images, event.target ? event.target.result as string : ""]);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => setInputTextValue(e.target.value), [setInputTextValue]);

    const handleKeyPress = useCallback(
        async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey && inputTextValue !== "") {
                e.preventDefault();
                await submitChatWithUserMessage(inputTextValue, images);
                setImages([]);
            }
        },
        [inputTextValue, submitChatWithUserMessage, images],
    );

    const handleChatButton = useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (inputTextValue !== "" || images.length > 0) {
            await submitChatWithUserMessage(inputTextValue, images);
            setImages([]);
        }
        if (isLastMessageUser()) return await resubmitChatContextAsIs();// 会話の編集時(最後のアシスタントメッセージを削除した状態)用
    }, [inputTextValue, isLastMessageUser, submitChatWithUserMessage, resubmitChatContextAsIs, images]);

    const adjustHeight = (rightSideRef: React.RefObject<HTMLDivElement>, buttonRef: React.RefObject<HTMLButtonElement>) => {
        if (textAreaRef.current && rightSideRef.current && buttonRef.current) {
            textAreaRef.current.style.height = 'auto';  // 高さを一旦リセット
            const fontSize = window.getComputedStyle(textAreaRef.current).fontSize; // 文字の高さを取得
            const scrollHeight = textAreaRef.current.scrollHeight;
            // 画像がない場合
            if (images.length === 0) {
                const minHeight = rightSideRef.current.offsetHeight; // 最低横のボックスの高さに合わせる
                const maxHeight = parseInt(fontSize) * 30;
                textAreaRef.current.style.height = `${Math.min(maxHeight, Math.max(minHeight, scrollHeight))}px`;
            } else {
                const minHeight = buttonRef.current.offsetHeight; // ボタンの高さに合わせる
                const maxHeight = parseInt(fontSize) * 24; // 24行分の高さ
                // テキストエリアの高さを、minHeightとmaxHeightの間で調整
                textAreaRef.current.style.height = `${Math.min(maxHeight, Math.max(minHeight, scrollHeight))}px`;

            }

        }
    }

    const scrollToBottom = useCallback((textValue: string) => {
        if (textAreaRef.current) {
            textAreaRef.current.focus();
            textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd = Array.from(textValue).length;
            setTimeout(() => { if (textAreaRef.current) textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight }, 0);
        }
    }, [textAreaRef]);

    const handleSideButton =
        (func: SideButtonFunc) => {
            return async () => {
                try {
                    setIsLoading(true);
                    const { newText, newImages } = await func(inputTextValue, images, showCautionToast);
                    setInputTextValue(newText);
                    if (newImages) setImages(newImages);
                    scrollToBottom(newText);
                    setIsLoading(false);
                } catch (e) {
                    const error = e as Error;
                    showErrorToast(error.message);
                    console.error(error.message);
                    setIsLoading(false);
                }
            }
        }

    const handleClearButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setInputTextValue("");
        setImages([]);
    }

    return {
        inputTextValue,
        setInputTextValue,
        handleChange,
        handleKeyPress,
        handleChatButton,
        adjustHeight,
        scrollToBottom,
        handleSideButton,
        images,
        handleDrop,
        handleRemoveImage,
        handleClearButton
    };
}