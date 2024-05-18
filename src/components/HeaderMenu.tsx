import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { IoReload } from "react-icons/io5";
import useChatStore from "./useChatStore";

export type HeaderMenuProps = {
    resetChat: () => void;
    isOudio: boolean;
};

export default function HeaderMenu({ resetChat, isOudio }: HeaderMenuProps) {
    const isRunAudio = useChatStore((state) => state.isRunAudio);
    const toggleAudio = useChatStore((state) => state.toggleAudio);

    const modelName = useChatStore((state) => state.modelName);
    const setModel = useChatStore((state) => state.setModelName);
    const modelList = useChatStore((state) => state.modelList);

    return (
        <nav className="w-full px-2 py-2 flex items-center justify-end border-b">
            <div className="flex w-full text-lg gap-x-0.5 flex-row-reverse">
                <button
                    onClick={resetChat}
                    className=" bg-white hover:bg-slate-300 font-bold py-1 px-3 rounded-full"
                    title="Reset Chat"
                >
                    <IoReload />
                </button>

                {isOudio && <button
                    onClick={toggleAudio}
                    className=" bg-white hover:bg-slate-300 font-bold py-1 px-3 rounded-full"
                    title={isRunAudio ? "Mute Audio" : "Unmute Audio"}
                >
                    {isRunAudio ? <HiSpeakerWave /> : <HiSpeakerXMark />}
                </button>}
                <div className="flex-1"></div>
                <div className="inline-block text-sm ml-1">
                    <select
                        id="model-select"
                        className="form-select inline-block mt-1 border border-gray-300 ml-1"
                        value={modelName}
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