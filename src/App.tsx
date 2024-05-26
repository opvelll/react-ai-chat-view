import AIChatView from './components/AIChatView'
import { ChatContextType } from './components/ChatView/ChatContextType'
import { ChatFormButtonData } from './components/ChatView/ChatForm/ChatFormSideButton';
import { MdOutlineSubtitles } from 'react-icons/md';
import { SiPagekit } from "react-icons/si";
import { FaRegCopy } from 'react-icons/fa';
import { AIChatResponse } from './components/ChatView/useChat';

function App() {

  const systemPrompt = "hello";
  const fetchAIChatAPI = async (modelName: string, context: ChatContextType): Promise<AIChatResponse> => {
    console.log(modelName, context);
    // contextの最後のcontentをコピーして返す
    return { content: context[context.length - 1].content, tokenCount: 10 }
  }
  const modelList = [{ modelName: "gpt-3.5-turbo-0125", contextWindow: 1000 }, { modelName: "model2", contextWindow: 20000 }];
  const handleGetSelectionButton = async (inputTextValue: string) => {
    console.log(inputTextValue);
    return inputTextValue;
  }
  const handleGetSubtitlesButton = async (inputTextValue: string, showCaution: (value: string) => void) => {
    console.log(inputTextValue);
    await new Promise(resolve => setTimeout(resolve, 5000));
    showCaution(inputTextValue);
    return inputTextValue;
  }
  const handleGetAllPageButton = async (inputTextValue: string) => {
    console.log(inputTextValue);
    throw new Error("error");
    return inputTextValue;
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
        return inputTextValue + "\n概要";
      },
      color: "text-blue-500",
    }
  ]

  return (
    <div>
      <AIChatView {...{
        systemPrompt,
        fetchAIChatAPI,
        modelList,
        topButtonDataList,
        bottomButtonDataList
      }} />
    </div>
  )
}

export default App
