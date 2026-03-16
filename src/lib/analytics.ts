type EventParams = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string | number | boolean> }) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const isObject = (value: unknown): value is Record<string, string | number | boolean> => {
  return typeof value === "object" && value !== null;
};

const normalizeParams = (params?: EventParams) => {
  if (!params) {
    return {};
  }

  const entries = Object.entries(params).filter(([, value]) => value !== undefined && value !== null);
  return Object.fromEntries(entries) as Record<string, string | number | boolean>;
};

export const trackEvent = (eventName: string, params?: EventParams) => {
  if (typeof window === "undefined") {
    return;
  }

  const safeParams = normalizeParams(params);

  if (typeof window.plausible === "function") {
    window.plausible(eventName, { props: safeParams });
    return;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, safeParams);
    return;
  }

  if (!Array.isArray(window.dataLayer)) {
    window.dataLayer = [];
  }

  if (isObject(safeParams)) {
    window.dataLayer.push({ event: eventName, ...safeParams });
  }
};
