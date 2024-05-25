import { Id } from "react-toastify";

export type ChatFormButtonData = {
    title?: string;
    icon?: JSX.Element;
    func: (inputTextValue: string, showCaution: (cautionMessage: string) => Id) => Promise<string>;
    color?: string;
};

export type SideButtonFunctions = {
    handleSideButton: (func: (inputTextValue: string, showCautionToast: (cautionMessage: string) => Id) => Promise<string>) => () => Promise<void>;
}

export default function ChatFormSideButton(
    { title, icon, color, func, handleSideButton }: ChatFormButtonData & SideButtonFunctions) {

    return (
        <button
            className={`rounded hover:bg-gray-300 border-white border bg-gray-200 px-2 py-1 md:text-lg ${color}`}
            title={title}
            onClick={handleSideButton(func)}>
            {icon}
        </button>
    )

}