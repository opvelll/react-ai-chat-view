export type ModelDataList = AIModelData[];

export type AIModelData = {
  corporation: Corporation;
  modelName: string;
  contextWindow: number;
  trainingData: string;
};

export type Corporation = "OpenAI" | "Google" | "Other";

export const initModelData: AIModelData = {
  corporation: "Other",
  modelName: "",
  contextWindow: 0,
  trainingData: "",
};

export const testModelList: AIModelData[] = [
  {
    corporation: "OpenAI",
    modelName: "gpt-4o",
    contextWindow: 128000,
    trainingData: "2023-10",
  },
  {
    corporation: "Other",
    modelName: "test-model",
    contextWindow: 128000,
    trainingData: "2023-10",
  },
];

export const defaultModelList: AIModelData[] = [
  {
    corporation: "OpenAI",
    modelName: "gpt-4o",
    contextWindow: 128000,
    trainingData: "2023-10",
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-4o-2024-05-13",
    contextWindow: 128000,
    trainingData: "2023-10",
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-4o-mini",
    contextWindow: 128000,
    trainingData: "2023-10",
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-4o-mini-2024-07-18",
    contextWindow: 128000,
    trainingData: "2023-10",
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-4-turbo",
    contextWindow: 128000,
    trainingData: "2023-12",
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-4-turbo-2024-04-09",
    contextWindow: 128000,
    trainingData: "2023-12",
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-4-turbo-preview",
    contextWindow: 128000,
    trainingData: "2023-12",
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-4-0125-preview",
    contextWindow: 128000,
    trainingData: "2023-12",
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-4-1106-preview",
    contextWindow: 128000,
    trainingData: "2023-04",
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-4",
    contextWindow: 8192,
    trainingData: "2021-09",
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-4-0613",
    contextWindow: 8192,
    trainingData: "2021-09",
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-4-0314",
    contextWindow: 8192,
    trainingData: "2021-09",
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-3.5-turbo-0125",
    contextWindow: 16385,
    trainingData: "2021-09",
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-3.5-turbo",
    contextWindow: 16385,
    trainingData: "2021-09",
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-3.5-turbo-1106",
    contextWindow: 16385,
    trainingData: "2021-09",
  },
  {
    corporation: "OpenAI",
    modelName: "gpt-3.5-turbo-instruct",
    contextWindow: 4096,
    trainingData: "2021-09",
  },
];

export const getModelDataByModelName = (
  modelName: string,
  modelList: AIModelData[]
): AIModelData => {
  const modelData = modelList.find(
    (modelData) => modelData.modelName === modelName
  );
  return modelData ? modelData : initModelData;
};
