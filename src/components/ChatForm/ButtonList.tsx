import { Fragment } from "react/jsx-runtime";
import ChatFormSideButton, { ChatFormButtonData, SideButtonFunctions } from "./ChatFormSideButton";

export type ButtonListProps = {
    buttonDataList?: ChatFormButtonData[];
} & SideButtonFunctions;

export default function ButtonList({ buttonDataList, inputTextValue, setInputTextValue, scrollToBottom }: ButtonListProps) {
    return (
        <>
            {buttonDataList &&
                (<div className="flex mt-2 mb-1 space-x-2">
                    {buttonDataList.map((buttonData, index) => (
                        <Fragment key={index}>
                            <ChatFormSideButton
                                {...buttonData}
                                inputTextValue={inputTextValue}
                                setInputTextValue={setInputTextValue}
                                scrollToBottom={scrollToBottom}
                            />
                        </Fragment>
                    ))}
                </div>)}
        </>
    )

}