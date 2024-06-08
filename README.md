# Simple React AI Chat View Component

React用のAIチャットコンポーネント。
![react ai chat view](doc/chatview.png)

## サンプル

### 基本

```typescript
import { AIChatView } from 'react-ai-chat-view';
import type { AIModelData, ChatContextType, ChatFormButtonData, AIChatResponse } from 'react-ai-chat-view';

function App() {

  const systemPrompt = "hello";
  const fetchAIChatAPI = async (modelName: string, context: ChatContextType): Promise<AIChatResponse> => {
    return { content: "hello", totalTokenCount: 100 }
  }

  return (
    <div>
      <AIChatView {...{
        systemPrompt,
        fetchAIChatAPI,
      }} />
    </div>
  )
}

export default App


```
### モデルのリストを変更する

```typescript
const testModelList: AIModelData[] = [
  {
    corporation: "OpenAI",
    modelName: "gpt-4o",
    contextWindow: 128000,
    isJsonMode: false,
    isVision: false,
    isFunctionCall: false,
  },
  {
    corporation: "Other",
    modelName: "test-model",
    contextWindow: 128000,
    isJsonMode: false,
    isVision: false,
    isFunctionCall: false,
  },
];

...

    <div>
      <AIChatView {...{
        systemPrompt,
        fetchAIChatAPI,
        modelList: testModelList,
      }} />
    </div>
```

## 開発時

```
npm install -g pnpm
pnpm install
pnpm run build
```