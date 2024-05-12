# Simple React AI Chat View Component

React用のAIチャットコンポーネント。

## 使い方

```typescript

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

```


## 開発時

```
npm install -g pnpm
pnpm install
pnpm run build
```