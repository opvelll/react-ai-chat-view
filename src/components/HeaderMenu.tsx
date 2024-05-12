import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { IoReload } from "react-icons/io5";
import useChatStore from "./useChatStore";

export type HeaderMenuProps = {
    resetChat: () => void;
};
const modelList = [
    "gpt-3.5-turbo-0125",
    "gpt-3.5-turbo",
    "gpt-3.5-turbo-1106",
    "gpt-3.5-turbo-instruct",
    "gpt-3.5-turbo-16k",
    "gpt-3.5-turbo-0613",
    "gpt-3.5-turbo-16k-0613",
] as const;

export default function HeaderMenu({ resetChat }: HeaderMenuProps) {
    const isRunAudio = useChatStore((state) => state.isRunAudio);
    const toggleAudio = useChatStore((state) => state.toggleAudio);

    const model = useChatStore((state) => state.modelName);
    const setModel = useChatStore((state) => state.setModelName);

    return (
        <nav className="fixed top-0 left-0 z-50 w-full px-2 py-2 shadow bg-white flex items-center justify-end">
            <div className="flex text-lg gap-x-0.5 flex-row-reverse">
                <button
                    onClick={resetChat}
                    className=" bg-white hover:bg-slate-300 font-bold py-1 px-3 rounded-full"
                    title="Reset Chat"
                >
                    <IoReload />
                </button>

                <button
                    onClick={toggleAudio}
                    className=" bg-white hover:bg-slate-300 font-bold py-1 px-3 rounded-full"
                    title={isRunAudio ? "Mute Audio" : "Unmute Audio"}
                >
                    {isRunAudio ? <HiSpeakerWave /> : <HiSpeakerXMark />}
                </button>
                <div className="inline-block text-sm ml-1">
                    <label htmlFor="model-select">model:</label>
                    <select
                        id="model-select"
                        className="form-select inline-block mt-1 border border-gray-300 ml-1"
                        value={model}
                        onChange={(event) => setModel(event.target.value)}
                        title="Select Model"
                    >
                        {(modelList as unknown as string[]).map((value, i) => (
                            <option key={i} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>

                </div>

            </div>
        </nav>
    )
}