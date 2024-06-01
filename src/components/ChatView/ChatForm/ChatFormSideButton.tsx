import { Id } from "react-toastify";

export type ChatFormButtonData = {
    title?: string;
    icon?: JSX.Element;
    func: SideButtonFunc;
    color?: string;
};

export type SideButtonFunctions = {
    handleSideButton: (func: SideButtonFunc) => () => Promise<void>;
}

export type SideButtonFunc = (inputTextValue: string, images: string[], showCautionToast: (cautionMessage: string) => Id) => Promise<SideButtonFuncResponse>;

export type SideButtonFuncResponse = {
    newText: string;
    newImages?: string[];
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