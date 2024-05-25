import AIChatView from './components/AIChatView'
import { ChatContextType } from './components/ChatContextType'
import { ChatFormButtonData } from './components/ChatForm/ChatFormSideButton';
import { MdOutlineSubtitles } from 'react-icons/md';
import { SiPagekit } from "react-icons/si";
import { FaRegCopy } from 'react-icons/fa';

function App() {

  const systemPrompt = "hello"
  const fetchAIChatAPI = async (modelName: string, context: ChatContextType): Promise<string> => {
    console.log(modelName, context);
    // contextの最後のcontentをコピーして返す
    return context[context.length - 1].content
  }
  const modelList = ["gpt-3.5-turbo-0125", "gpt-3.5-turbo-0126", "gpt-3.5-turbo-0127"];
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

  return (
    <div>
      <AIChatView {...{
        systemPrompt,
        fetchAIChatAPI,
        modelList,
        topButtonDataList,
      }} />
    </div>
  )
}

export default App
