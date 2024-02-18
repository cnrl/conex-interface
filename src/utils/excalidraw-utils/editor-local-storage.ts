const EDITOR_LS_KEYS = {
  OAI_API_KEY: 'excalidraw-oai-api-key',
  // legacy naming (non)scheme
  MERMAID_TO_EXCALIDRAW: 'mermaid-to-excalidraw',
  PUBLISH_LIBRARY: 'publish-library-data',
} as const;

type JSONValue = string | number | boolean | null | object;

export class EditorLocalStorage {
  static has(key: (typeof EDITOR_LS_KEYS)[keyof typeof EDITOR_LS_KEYS]) {
    try {
      return !!window.localStorage.getItem(key);
    } catch (error: any) {
      console.warn(`localStorage.getItem error: ${error.message}`);
      return false;
    }
  }

  static get<T extends JSONValue>(key: (typeof EDITOR_LS_KEYS)[keyof typeof EDITOR_LS_KEYS]) {
    try {
      const value = window.localStorage.getItem(key);
      if (value) {
        return JSON.parse(value) as T;
      }
      return null;
    } catch (error: any) {
      console.warn(`localStorage.getItem error: ${error.message}`);
      return null;
    }
  }

  static set = (key: (typeof EDITOR_LS_KEYS)[keyof typeof EDITOR_LS_KEYS], value: JSONValue) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error: any) {
      console.warn(`localStorage.setItem error: ${error.message}`);
      return false;
    }
  };

  static delete = (name: (typeof EDITOR_LS_KEYS)[keyof typeof EDITOR_LS_KEYS]) => {
    try {
      window.localStorage.removeItem(name);
    } catch (error: any) {
      console.warn(`localStorage.removeItem error: ${error.message}`);
    }
  };
}
