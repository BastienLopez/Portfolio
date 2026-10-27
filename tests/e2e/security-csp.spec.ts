import { expect, test, type Page } from "@playwright/test";

const strictCsp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self'",
  "script-src-attr 'none'",
  "style-src 'self'",
  "style-src-attr 'none'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "trusted-types default portfolio-html dompurify",
  "require-trusted-types-for 'script'",
].join("; ");

const routes = [
  { path: "/", selector: "#hero h1" },
  { path: "/freelance", selector: "#freelance h1" },
  { path: "/projets/cledevoute", selector: "[data-project-detail]" },
  { path: "/notes/architecture-hexagonale", selector: "main" },
];

const installPolicyHeader = async (page: Page, headerName: string) => {
  await page.route("**/*", async (route) => {
    const response = await route.fetch();
    const headers = {
      ...response.headers(),
      [headerName]: strictCsp,
      "cross-origin-opener-policy": "same-origin",
    };

    await route.fulfill({ response, headers });
  });
};

const visitProtectedRoutes = async (page: Page) => {
  for (const route of routes) {
    const response = await page.goto(route.path, { waitUntil: "domcontentloaded" });
    expect(response?.ok(), `Expected ${route.path} to load successfully`).toBe(true);
    await expect(page.locator(route.selector).first()).toBeVisible();
    await page.waitForTimeout(250);
  }
};

const collectSecurityErrors = (page: Page) => {
  const errors: string[] = [];

  page.on("console", (message) => {
    if (
      message.type() === "error" ||
      /Content Security Policy|Trusted Types|Refused to|violates the following/i.test(message.text())
    ) {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));

  return errors;
};

test.describe("strict security policy", () => {
  test("passes Trusted Types and CSP in report-only observation", async ({ page }) => {
    await installPolicyHeader(page, "content-security-policy-report-only");
    const errors = collectSecurityErrors(page);

    await visitProtectedRoutes(page);

    expect(errors).toEqual([]);
  });

  test("passes Trusted Types and CSP in enforcement", async ({ page }) => {
    await installPolicyHeader(page, "content-security-policy");
    const errors = collectSecurityErrors(page);

    await visitProtectedRoutes(page);

    expect(errors).toEqual([]);
  });
});
