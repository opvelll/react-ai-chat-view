
import { MdOutlineSubtitles } from 'react-icons/md';
import { SiPagekit } from "react-icons/si";
import { FaRegCopy } from 'react-icons/fa';
import { AIChatView } from '.';
import type { AIModelData, ChatContextType, ChatFormButtonData, AIChatResponse } from '.';
import { testModelList } from './components/Type/ModelDataList';
import sampleAudio from "./assets/konnnitiwa.wav";

function App() {

  const systemPrompt = "hello";
  const fetchAIChatAPI = async (modelData: AIModelData, context: ChatContextType): Promise<AIChatResponse> => {
    console.log("modelData", modelData);
    console.log("context", context);
    await new Promise(resolve => setTimeout(resolve, 3000));
    // contextの最後のcontentをコピーして返す
    const last = context[context.length - 1].content;
    return {
      content: typeof last === "string" ? last : (last[0].type === "text" ? last[0].text : last[0].image_url.url),
      tokenCount: 10,
      totalTokenCount: 100
    }
  }
  const handleGetSelectionButton = async (inputTextValue: string) => {
    console.log(inputTextValue);
    return { newText: inputTextValue, newImages: [] };
  }
  const handleGetSubtitlesButton = async (inputTextValue: string, images: string[], showCaution: (value: string) => void) => {
    console.log(inputTextValue);
    await new Promise(resolve => setTimeout(resolve, 5000));
    showCaution(inputTextValue);
    return { newText: inputTextValue, newImages: images };
  }
  const handleGetAllPageButton = async (inputTextValue: string) => {
    console.log(inputTextValue);
    throw new Error("error");
    return { newText: inputTextValue, newImages: [] };
  }

  const topButtonDataList: ChatFormButtonData[] = [
    {
      title: "get selection",
      icon: <FaRegCopy />,
      func: handleGetSelectionButton,
      color: "text-orange-300",
    },
    {
      title: "subtitles",
      icon: <MdOutlineSubtitles />,
      func: handleGetSubtitlesButton,
      color: "text-red-400",
    },
    {
      title: "all page",
      icon: <SiPagekit />,
      func: handleGetAllPageButton,
      color: "text-gray-500",
    }
  ]

  const bottomButtonDataList: ChatFormButtonData[] = [
    {
      title: "概要",
      icon: <div>1</div>,
      func: async (inputTextValue: string) => {
        return { newText: inputTextValue + "\n概要", newImages: [] };
      },
      color: "text-blue-500",
    }
  ]

  const fetchVoiceAPI = async (text: string) => {
    console.log(text);
    return sampleAudio;
  }

  return (
    <div>
      <AIChatView {...{
        systemPrompt,
        fetchAIChatAPI,
        fetchVoiceAPI,
        modelList: testModelList,
        topButtonDataList,
        bottomButtonDataList
      }} />
    </div>
  )
}

export default App
