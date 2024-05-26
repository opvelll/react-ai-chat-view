export type ModelData = {
  modelName: string;
  contextWindow: number;
};

export type ModelDataList = ModelData[];

export const getContextWindow = (
  modelName: string,
  modelDataList: ModelDataList
) => {
  const modelData = modelDataList.find(
    (modelData) => modelData.modelName === modelName
  );
  return modelData ? modelData.contextWindow : 0;
};
