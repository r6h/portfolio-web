const modelPromises = new Map<string, Promise<unknown>>();

export const useModelPreloader = () => {
  const preloadModel = <T>(key: string, load: () => Promise<T>) => {
    const existing = modelPromises.get(key);
    if (existing) {
      return existing as Promise<T>;
    }

    const promise = load();
    modelPromises.set(key, promise);
    return promise;
  };

  return {
    preloadModel,
  };
};
