type LocalStorageType = "token" | "profile";

export const lsProvider = {
  get(key: LocalStorageType) {
    try {
      return JSON.parse(localStorage.getItem(key) as any);
    } catch (e: any) {
      return localStorage.getItem(key);
    }
  },
  set(key: LocalStorageType, value: string | any): void {
    if (typeof value === "string") {
      localStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },
  remove(key: LocalStorageType): void {
    localStorage.removeItem(key);
  },
};
