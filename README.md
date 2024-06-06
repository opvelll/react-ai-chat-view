# Simple React AI Chat View Component

React用のAIチャットコンポーネント。
![react ai chat view](doc/chatview.png)

## サンプル

```typescript

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


## 開発時

```
npm install -g pnpm
pnpm install
pnpm run build
```