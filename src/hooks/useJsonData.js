import { useEffect, useState } from "react";

const REMOTE_BASE = (import.meta.env.VITE_DATA_BASE_URL || "").replace(
  /\/+$/,
  "",
);
const LOCAL_BASE = `${import.meta.env.BASE_URL}data`.replace(/\/{2,}/g, "/");

async function fetchJson(url, signal) {
  const res = await fetch(url, { signal, cache: "no-cache" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export default function useJsonData(name) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      const sources = [];
      if (REMOTE_BASE) sources.push(`${REMOTE_BASE}/${name}.json`);
      sources.push(`${LOCAL_BASE}/${name}.json`);

      let lastError = null;
      for (const url of sources) {
        try {
          const data = await fetchJson(url, controller.signal);
          setState({ data, loading: false, error: null });
          return;
        } catch (err) {
          if (err.name === "AbortError") return;
          lastError = err;
        }
      }
      setState({ data: null, loading: false, error: lastError });
    }

    load();
    return () => controller.abort();
  }, [name]);

  return state;
}
