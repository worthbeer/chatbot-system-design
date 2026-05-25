"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "anthropic_api_key";

type UseApiKeyReturn = {
  apiKey: string | null;
  loading: boolean;
  saveKey: (key: string) => void;
  clearKey: () => void;
};

export function useApiKey(): UseApiKeyReturn {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setApiKey(localStorage.getItem(STORAGE_KEY));
    setLoading(false);
  }, []);

  const saveKey = (key: string) => {
    localStorage.setItem(STORAGE_KEY, key);
    setApiKey(key);
  };

  const clearKey = () => {
    localStorage.removeItem(STORAGE_KEY);
    setApiKey(null);
  };

  return { apiKey, loading, saveKey, clearKey };
}
