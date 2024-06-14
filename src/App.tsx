import { AIChatView } from '.';
import type { AIModelData, ChatContextType, AIChatResponse } from '.';

function App() {

    const systemPrompt = "hello";
    const fetchAIChatAPI = async (modelData: AIModelData, context: ChatContextType): Promise<AIChatResponse> => {
        // The name of the selected model will be in modelData.modelName.
        //...  For example, communicate with the OpenAI API.
        console.log("modelData", modelData);
        console.log("context", context);
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