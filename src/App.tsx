
import AIChatView from './components/AIChatView'
import { ChatContextType } from './components/ChatContextType'

function App() {

  const systemPrompt = "hello"
  const fetchAIChatAPI = async (modelName: string, context: ChatContextType) => {
    console.log(modelName, context);
    return "hello"
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

  return (
    <div>
      <AIChatView {...{
        systemPrompt,
        fetchAIChatAPI,
        modelName,
        modelList,
        handleGetSelectionButton,
        handleGetSubtitlesButton,
        handleGetAllPageButton,
      }} />
    </div>
  )
}

export default App
