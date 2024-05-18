
import AIChatView from './components/AIChatView'
import { ChatContextType } from './components/ChatContextType'

function App() {

  const systemPrompt = "hello"
  const fetchAIChatAPI = async (modelName: string, context: ChatContextType) => {
    console.log(modelName, context);
    return "hello"
  }
  const handleGetSelectionButton = async (inputTextValue: string, setInputTextValue: (value: string) => void) => {
    console.log(inputTextValue);
    setInputTextValue(inputTextValue);
  }

  const initModelName = "gpt-3.5-turbo-0125"
  const modelList = ["gpt-3.5-turbo-0125", "gpt-3.5-turbo-0126", "gpt-3.5-turbo-0127"];

  return (
    <div>
      <AIChatView {...{ systemPrompt, fetchAIChatAPI, handleGetSelectionButton, initModelName, modelList }} />
    </div>
  )
}

export default App
