[日本語](#日本語) | [English](#english)

#### english
# Simple React AI Chat View Component

A React AI chat component that can be quickly tested when you want to try AI.

![view](doc/chatview1.gif)


### Features
* Model selection
* Delete and regenerate conversations
* Drag and drop images into the form

### Limitations
* No communication
* No history functionality
* No support for assistant or func modes
* No video-related features
* No audio-related features

and more...

## Sample

### Installation
```
pnpm add react-ai-chat-view
```

### Basic Usage

```typescript
import { AIChatView } from 'react-ai-chat-view';
import type { AIModelData, ChatContextType, ChatFormButtonData, AIChatResponse } from 'react-ai-chat-view';

function App() {

  const systemPrompt = "hello";
  const fetchAIChatAPI = async (modelData: AIModelData, context: ChatContextType): Promise<AIChatResponse> => {
        // The name of the selected model will be in modelData.modelName.
    ... // For example, communicate with the OpenAI API.
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

### Change the Model List

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

## Link
https://www.npmjs.com/package/react-ai-chat-view

## LICENSE
MIT



#### 日本語
# Simple React AI Chat View Component

AI試したいときにさっと試せるような、React用のAIチャットコンポーネント。

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

```
pnpm add react-ai-chat-view
```
### 基本

```typescript
import { AIChatView } from 'react-ai-chat-view';
import type { AIModelData, ChatContextType, ChatFormButtonData, AIChatResponse } from 'react-ai-chat-view';

function App() {

  const systemPrompt = "hello";
  const fetchAIChatAPI = async (modelData: AIModelData, context: ChatContextType): Promise<AIChatResponse> => {
        //modlData.modelNameに選択したmodelの名前が入る。
    ... //例えばopenai apiと通信する. 
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

## Link
https://www.npmjs.com/package/react-ai-chat-view

## LICENSE
MIT