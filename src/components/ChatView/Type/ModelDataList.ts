export type ModelDataList = AIModelData[];

export type AIModelData = {
  corporation: string;
  modelName: string;
  contextWindow: number;
  isJsonMode: boolean;
  isVision: boolean;
  isFunctionCall: boolean;
};

export const allModelList: AIModelData[] = [
  {
    corporation: "OpenAI",
    modelName: "gpt-4o",
    contextWindow: 128000,
    isJsonMode: false,
    isVision: false,
    isFunctionCall: false,
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-4o-2024-05-13",
    contextWindow: 128000,
    isJsonMode: false,
    isVision: false,
    isFunctionCall: false,
  },

  {
    corporation: "OpenAI",
    modelName: "gpt-4-turbo",
    contextWindow: 128000,
    isJsonMode: true,
    isVision: true,
    isFunctionCall: true,
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-4-turbo-2024-04-09",
    contextWindow: 128000,
    isJsonMode: true,
    isVision: true,
    isFunctionCall: true,
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-4-turbo-preview",
    contextWindow: 128000,
    isJsonMode: false,
    isVision: false,
    isFunctionCall: false,
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-4-0125-preview",
    contextWindow: 128000,
    isJsonMode: false,
    isVision: false,
    isFunctionCall: false,
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-4-1106-preview",
    contextWindow: 128000,
    isJsonMode: true,
    isVision: false,
    isFunctionCall: true,
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-4-vision-preview",
    contextWindow: 128000,
    isJsonMode: true,
    isVision: true,
    isFunctionCall: true,
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-4-1106-vision-preview",
    contextWindow: 128000,
    isJsonMode: true,
    isVision: true,
    isFunctionCall: true,
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-4",
    contextWindow: 8192,
    isJsonMode: false,
    isVision: false,
    isFunctionCall: true,
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-4-0613",
    contextWindow: 8192,
    isJsonMode: false,
    isVision: false,
    isFunctionCall: true,
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-4-32k",
    contextWindow: 32768,
    isJsonMode: false,
    isVision: false,
    isFunctionCall: true,
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-4-32k-0613",
    contextWindow: 32768,
    isJsonMode: false,
    isVision: false,
    isFunctionCall: true,
  },

  {
    corporation: "OpenAI",
    modelName: "gpt-3.5-turbo-0125",
    contextWindow: 16385,
    isJsonMode: false,
    isVision: false,
    isFunctionCall: false,
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-3.5-turbo",
    contextWindow: 16385,
    isJsonMode: false,
    isVision: false,
    isFunctionCall: false,
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-3.5-turbo-1106",
    contextWindow: 16385,
    isJsonMode: true,
    isVision: false,
    isFunctionCall: true,
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-3.5-turbo-instruct",
    contextWindow: 4096,
    isJsonMode: false,
    isVision: false,
    isFunctionCall: false,
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-3.5-turbo-16k",
    contextWindow: 16385,
    isJsonMode: false,
    isVision: false,
    isFunctionCall: false,
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-3.5-turbo-0613",
    contextWindow: 4096,
    isJsonMode: false,
    isVision: false,
    isFunctionCall: false,
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-3.5-turbo-16k-0613",
    contextWindow: 16385,
    isJsonMode: false,
    isVision: false,
    isFunctionCall: false,
  },
];

export const getContextWindow = (
  modelName: string,
  modelDataList: ModelDataList
) => {
  const modelData = modelDataList.find(
    (modelData) => modelData.modelName === modelName
  );
  return modelData ? modelData.contextWindow : 0;
};
