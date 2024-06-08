# Simple React AI Chat View Component

AI試したいときにさっと試せるような、React用のAIチャットコンポーネント。
![view](doc/chatview1.gif)

### できること
* モデルの選択
* 会話の削除、再生成
* フォームへの画像のドラッグアンドドロップ

### できないこと
* 通信
* 履歴機能
* asistantや、funcモードへの対応
* 動画関連
* 音声関連

などなど

## サンプル

### インストール

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
