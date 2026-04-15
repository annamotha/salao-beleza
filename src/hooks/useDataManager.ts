import { useState, useCallback } from "react";

export interface UseDataManagerOptions<T> {
  initialData: T[];
  storageKey: string;
}

export function useDataManager<T extends { id: number }>({
  initialData,
  storageKey,
}: UseDataManagerOptions<T>) {
  const [data, setData] = useState<T[]>(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : initialData;
  });

  const saveToStorage = useCallback((newData: T[]) => {
    localStorage.setItem(storageKey, JSON.stringify(newData));
    setData(newData);
  }, [storageKey]);

  const add = useCallback((item: Omit<T, "id">) => {
    const newId = Math.max(...data.map(d => d.id), 0) + 1;
    const newItem = { ...item, id: newId } as T;
    const newData = [...data, newItem];
    saveToStorage(newData);
    return newItem;
  }, [data, saveToStorage]);

  const update = useCallback((id: number, item: Partial<T>) => {
    const newData = data.map(d => (d.id === id ? { ...d, ...item } : d));
    saveToStorage(newData);
  }, [data, saveToStorage]);

  const remove = useCallback((id: number) => {
    const newData = data.filter(d => d.id !== id);
    saveToStorage(newData);
  }, [data, saveToStorage]);

  const getById = useCallback((id: number) => {
    return data.find(d => d.id === id);
  }, [data]);

  const search = useCallback((query: string, fields: (keyof T)[]) => {
    const lowerQuery = query.toLowerCase();
    return data.filter(item =>
      fields.some(field => {
        const value = item[field];
        return value && String(value).toLowerCase().includes(lowerQuery);
      })
    );
  }, [data]);

  const getAll = useCallback(() => data, [data]);

  const reset = useCallback(() => {
    saveToStorage(initialData);
  }, [initialData, saveToStorage]);

  return {
    data,
    add,
    update,
    remove,
    getById,
    search,
    getAll,
    reset,
  };
}
