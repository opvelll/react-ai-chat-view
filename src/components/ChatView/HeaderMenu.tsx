import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { IoReload } from "react-icons/io5";
import useChatStore from "./useChatStore";

export type HeaderMenuProps = {
    resetChat: () => void;
    isOudio: boolean;
} & ModelList;

export type ModelList = {
    modelList: ModelData[];
}

export type ModelData = {
    modelName: string;
    contextWindow: number;
}

export default function HeaderMenu({ resetChat, isOudio, modelList }: HeaderMenuProps) {
    const isRunAudio = useChatStore((state) => state.isRunAudio);
    const toggleAudio = useChatStore((state) => state.toggleAudio);
    const modelName = useChatStore((state) => state.modelName);
    const setModel = useChatStore((state) => state.setModel);
    const setModelContextWindow = useChatStore((state) => state.setModelContextWindow);

    const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setModel(event.target.value);
        const modelData = modelList.find((model) => model.modelName === event.target.value);
        if (modelData) {
            setModelContextWindow(modelData.contextWindow);
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full bg-white">
            <div className=" w-full p-2 flex flex-col border-b">
                <div className="flex w-full text-lg gap-x-0.5 flex-row-reverse">
                    <button
                        onClick={resetChat}
                        className=" bg-white hover:bg-slate-300 font-bold py-1 px-3 rounded-full border"
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
                            onChange={handleModelChange}
                            title="Select Model"
                        >
                            {modelList.map(({ modelName, contextWindow }, i) => (
                                <option key={i} value={modelName}>
                                    {modelName} ({contextWindow})
                                </option>
                            ))}
                        </select>

                    </div>

                </div>

            </div>
            {/* <div className="w-full bg-gray-200 h-0.5 dark:bg-gray-700">
                <div className="bg-blue-400 h-0.5 dark:bg-blue-500" style={{ width: "40%" }}></div>
            </div> */}
        </header>
    )
}