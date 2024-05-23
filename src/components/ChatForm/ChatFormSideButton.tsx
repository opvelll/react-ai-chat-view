
export type ChatFormButtonData = {
    title?: string;
    icon?: JSX.Element;
    func: (inputTextValue: string, setInputTextValue: (value: string) => void) => Promise<void>;
    color?: string;
};

export type SideButtonFunctions = {
    inputTextValue: string,
    setInputTextValue: (value: string) => void,
    scrollToBottom: (textValue: string) => void,
}

export default function ChatFormSideButton(
    { title, icon, color, func, inputTextValue, setInputTextValue, scrollToBottom }: ChatFormButtonData & SideButtonFunctions) {

    return (
        <button
            className={`rounded hover:bg-gray-300 border-white border bg-gray-200 px-2 py-1 md:text-lg ${color}`}
            title={title}
            onClick={async () => {
                await func(inputTextValue, setInputTextValue);
                await scrollToBottom(inputTextValue);
            }
            }>
            {icon}
        </button>
    )

}