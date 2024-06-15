export const setLocalStorageItem = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(Array.from(value.entries())));
  } catch (error) {
    console.error("Error setLocalStorageItemm:", error);
  }
};

export const getLocalStorageItem = (key: string) => {
  try {
    const storedValue = localStorage.getItem(key);
    const parsedValue = storedValue ? JSON.parse(storedValue) : [];

    if (!Array.isArray(parsedValue)) {
      return new Map();
    }

    return new Map(parsedValue);
  } catch (error) {
    console.error("Error getLocalStorageItem:", error);

    return new Map();
  }
};
