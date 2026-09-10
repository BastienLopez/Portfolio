export const getProjectIdFromHash = (hash: string) => {
  if (!hash.startsWith("#project=")) return null;

  try {
    return decodeURIComponent(hash.slice("#project=".length));
  } catch {
    return null;
  }
};

export const getHistoryState = (): Record<string, unknown> => {
  const state = window.history.state;
  return state && typeof state === "object"
    ? (state as Record<string, unknown>)
    : {};
};
