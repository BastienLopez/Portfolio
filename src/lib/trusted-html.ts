export type SanitizedHtml = string | TrustedHTML;

type TrustedHtmlPolicy = {
  createHTML: (value: string) => SanitizedHtml;
};

type TrustedTypesFactory = {
  defaultPolicy?: TrustedHtmlPolicy | null;
  createPolicy: (
    name: string,
    rules: {
      createHTML: (value: string) => string;
      createScript?: (value: string) => string;
    },
  ) => TrustedHtmlPolicy;
};

let cachedPolicy: TrustedHtmlPolicy | null | undefined;

/**
 * React clears a pre-rendered root with innerHTML="" before mounting its
 * client tree. Keep that internal operation compatible with Trusted Types
 * without creating a general string-to-HTML escape hatch.
 */
export const installTrustedTypesDefaultPolicy = () => {
  if (typeof window === "undefined") return;

  const trustedTypes = (window as Window & { trustedTypes?: TrustedTypesFactory }).trustedTypes;
  if (!trustedTypes || trustedTypes.defaultPolicy) return;

  try {
    trustedTypes.createPolicy("default", {
      createHTML: (value) => {
        if (value !== "" && value !== "<script></script>") {
          throw new TypeError("Only React's empty root and inert JSON-LD script cleanup are allowed by the default Trusted Types policy.");
        }
        return value;
      },
      createScript: (value) => {
        if (/[<>]/.test(value)) {
          throw new TypeError("Only JSON-LD script text is allowed by the default Trusted Types policy.");
        }

        try {
          JSON.parse(value);
        } catch {
          throw new TypeError("Only valid JSON-LD script text is allowed by the default Trusted Types policy.");
        }

        return value;
      },
    });
  } catch {
    // Browsers without policy support, or a host policy already installed,
    // continue without changing the normal non-enforced runtime.
  }
};

const getTrustedHtmlPolicy = (
  sanitize: (value: string) => string,
): TrustedHtmlPolicy | null => {
  if (cachedPolicy !== undefined) return cachedPolicy;

  if (typeof window === "undefined") {
    cachedPolicy = null;
    return cachedPolicy;
  }

  const trustedTypes = (window as Window & { trustedTypes?: TrustedTypesFactory }).trustedTypes;
  if (!trustedTypes) {
    cachedPolicy = null;
    return cachedPolicy;
  }

  try {
    cachedPolicy = trustedTypes.createPolicy("portfolio-html", {
      createHTML: sanitize,
    });
  } catch {
    // A restrictive browser policy may reject duplicate or unexpected policy
    // creation. DOMPurify remains the safe fallback in that case.
    cachedPolicy = null;
  }

  return cachedPolicy;
};

export const sanitizeHtml = (
  value: string,
  sanitize: (value: string) => string,
): SanitizedHtml => {
  const policy = getTrustedHtmlPolicy(sanitize);
  return policy ? policy.createHTML(value) : sanitize(value);
};

export const asHtmlString = (value: SanitizedHtml): string =>
  value as unknown as string;
