import { AIChatResponse } from "./AIChatAPIType";
import { ChatContextType } from "./ChatContextType";
import { AIModelData } from "./ModelDataList";

export type AudioSource = string | Blob;

export type AIChatViewProp = {
  systemPrompt: string;
  fetchAIChatAPI: (
    modelData: AIModelData,
    context: ChatContextType
  ) => Promise<AIChatResponse>;
  fetchVoiceAPI?: (text: string) => Promise<AudioSource>;
};
