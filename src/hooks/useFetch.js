import { useCallback } from "react";
import { useState } from "react";

export const useFetch = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);
  const superFetch = useCallback(async (url, config = {}) => {
    setCargando(true);
    setError(false);
    try {
      const resp = await fetch(url, config);
      if (!resp.ok) {
        throw new Error();
      }
      const datosAPI = await resp.json();
      setError(false);
      return datosAPI;
    } catch (e) {
      setError(true);
      throw e;
    } finally {
      setCargando(false);
    }
  }, []);
  return {
    cargando,
    error,
    superFetch,
  };
};
