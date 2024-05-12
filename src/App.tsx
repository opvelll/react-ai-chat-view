
import AIChatView from './components/AIChatView'
import { ChatContextType } from './components/ChatContextType'

function App() {

  const prompt = "hello"
  const fetchAIChatAPI = async (context: ChatContextType) => {
    console.log(context)
    return "hello"
  }

  return (
    <div>
      <AIChatView systemPrompt={prompt} fetchAIChatAPI={fetchAIChatAPI} />
    </div>
  )
}

export default App
