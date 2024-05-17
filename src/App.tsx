
import useAIChatView from './components/AIChatView'
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

  const { AIChatView } = useAIChatView({ systemPrompt, fetchAIChatAPI, handleGetSelectionButton })

  return (
    <div>
      <AIChatView />
    </div>
  )
}

export default App
