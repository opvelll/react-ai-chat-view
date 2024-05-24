import { Id } from "react-toastify";
import { showCautionToast, showErrorToast } from "../Toast";

export type ChatFormButtonData = {
    title?: string;
    icon?: JSX.Element;
    func: (inputTextValue: string, showCaution: (cautionMessage: string) => Id) => Promise<string>;
    color?: string;
};

export type SideButtonFunctions = {
    inputTextValue: string,
    setInputTextValue: (value: string) => void,
    scrollToBottom: (textValue: string) => void,
}

export default function ChatFormSideButton(
    { title, icon, color, func, inputTextValue, setInputTextValue, scrollToBottom }: ChatFormButtonData & SideButtonFunctions) {

    const handleSideButton = async () => {
        try {
            const newInputValue = await func(inputTextValue, showCautionToast);
            setInputTextValue(newInputValue);
            await scrollToBottom(newInputValue);
        } catch (e) {
            const error = e as Error;
            showErrorToast(error.message);
            console.error(error);
        }
    }

    return (
        <button
            className={`rounded hover:bg-gray-300 border-white border bg-gray-200 px-2 py-1 md:text-lg ${color}`}
            title={title}
            onClick={handleSideButton}>
            {icon}
        </button>
    )

}