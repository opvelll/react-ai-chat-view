
import { FaRegCopy } from 'react-icons/fa';
import AIChatView from './components/AIChatView'
import { ChatContextType } from './components/ChatContextType'
import { ChatFormButtonData } from './components/ChatForm/ChatFormSideButton';
import { MdOutlineSubtitles } from 'react-icons/md';
import { SiPagekit } from "react-icons/si";
function App() {

  const systemPrompt = "hello"
  const fetchAIChatAPI = async (modelName: string, context: ChatContextType): Promise<string> => {
    console.log(modelName, context);
    // contextの最後のcontentをコピーして返す
    return context[context.length - 1].content
  }
  const modelName = "gpt-3.5-turbo-0125"
  const modelList = ["gpt-3.5-turbo-0125", "gpt-3.5-turbo-0126", "gpt-3.5-turbo-0127"];
  const handleGetSelectionButton = async (inputTextValue: string, setInputTextValue: (value: string) => void) => {
    console.log(inputTextValue);
    setInputTextValue(inputTextValue);
  }
  const handleGetSubtitlesButton = async (inputTextValue: string, setInputTextValue: (value: string) => void) => {
    console.log(inputTextValue);
    setInputTextValue(inputTextValue);
  }
  const handleGetAllPageButton = async (inputTextValue: string, setInputTextValue: (value: string) => void) => {
    console.log(inputTextValue);
    setInputTextValue(inputTextValue);
  }

  const buttonDataList: ChatFormButtonData[] = [
    {
      title: "get selection", icon: <FaRegCopy />, func: handleGetSelectionButton, color: "text-orange-300",
    },
    {
      title: "subtitles", icon: <MdOutlineSubtitles />, func: handleGetSubtitlesButton, color: "text-red-400",
    },
    {
      title: "all page", icon: <SiPagekit />, func: handleGetAllPageButton, color: "text-gray-500",
    }
  ]

  return (
    <div>
      <AIChatView {...{
        systemPrompt,
        fetchAIChatAPI,
        modelName,
        modelList,
        buttonDataList
      }} />
    </div>
  )
}

export default App
