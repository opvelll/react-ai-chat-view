import { Fragment } from "react/jsx-runtime";
import ChatFormSideButton, { ChatFormButtonData } from "./ChatFormSideButton";

export type ButtonListProps = {
    buttonDataList?: ChatFormButtonData[];
};

export default function ButtonList({ buttonDataList }: ButtonListProps) {
    return (
        <>
            {buttonDataList &&
                (<div className="flex flex-wrap mt-2 mb-1 space-x-2">
                    {buttonDataList.map((buttonData, index) => (
                        <Fragment key={index}>
                            <ChatFormSideButton
                                {...buttonData}
                            />
                        </Fragment>
                    ))}
                </div>)}
        </>
    )

}