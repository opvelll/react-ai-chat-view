import { Id } from "react-toastify";
import useContextChatStore from "../../Store/useContextStore";
import { showCautionToast, showErrorToast } from "../../Toast";

export type ChatFormButtonData = {
    title?: string;
    icon?: JSX.Element;
    func: SideButtonFunc;
    color?: string;
};


export type SideButtonFunc = (inputTextValue: string,
    images: string[],
    showCautionToast: (cautionMessage: string) => Id) => Promise<SideButtonFuncResponse>;

export type SideButtonFuncResponse = {
    newText: string;
    newImages?: string[];
}

export default function ChatFormSideButton(
    { title, icon, color, func }: ChatFormButtonData) {
    const store = useContextChatStore();
    const {
        inputTextValue,
        setInputTextValue,
        images,
        setImages,
        scrollToBottomInForm,
        setIsLoading } = store();

    const handleSideButton =
        (func: SideButtonFunc) => {
            return async () => {
                try {
                    setIsLoading(true);
                    const { newText, newImages } = await func(inputTextValue, images, showCautionToast);
                    setInputTextValue(newText);
                    if (newImages) setImages(newImages);
                    scrollToBottomInForm(newText);
                    setIsLoading(false);
                } catch (e) {
                    const error = e as Error;
                    showErrorToast(error.message);
                    console.error(error.message);
                    setIsLoading(false);
                }
            }
        }

    return (
        <button
            className={`rounded hover:bg-gray-300 border-white border bg-gray-200 px-2 py-1 md:text-lg ${color}`}
            title={title}
            onClick={handleSideButton(func)}>
            {icon}
        </button>
    )

}