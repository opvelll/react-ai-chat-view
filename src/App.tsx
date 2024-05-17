
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

  return (
    <div>
      <AIChatView {...{ systemPrompt, fetchAIChatAPI, handleGetSelectionButton }} />
    </div>
  )
}

export default App
