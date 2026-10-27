import { expect, test } from "@playwright/test";

test("la timeline suit la progression réelle et les sections de chaque page", async ({ page }) => {
  await page.goto("/");
  const scrollToFraction = async (fraction: number) => {
    await page.evaluate((value) => {
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, (root.scrollHeight - window.innerHeight) * value);
      root.style.scrollBehavior = previousScrollBehavior;
    }, fraction);
    await page.waitForTimeout(100);
  };

  await expect(page.locator(".section-timeline")).toBeVisible();
  await expect(page.locator(".section-timeline-link")).toHaveCount(50);
  await expect(page.locator(".section-timeline-current")).toHaveText("Accueil");

  const timelineMetrics = await page.locator(".section-timeline").evaluate((element) => {
    const first = element.querySelector<HTMLElement>('[data-point-index="0"]')?.getBoundingClientRect();
    const last = element.querySelector<HTMLElement>('[data-point-index="49"]')?.getBoundingClientRect();
    return {
      firstTop: first?.top ?? 0,
      lastTop: last?.top ?? 0,
      rightGap: window.innerWidth - (first?.right ?? window.innerWidth),
      viewportHeight: window.innerHeight,
      progress: Number(element.getAttribute("data-scroll-progress") ?? "-1"),
    };
  });
  expect(timelineMetrics.firstTop).toBeGreaterThan(0);
  expect(timelineMetrics.lastTop).toBeLessThan(timelineMetrics.viewportHeight);
  expect(timelineMetrics.lastTop - timelineMetrics.firstTop).toBeGreaterThan(timelineMetrics.viewportHeight - 160);
  expect(timelineMetrics.rightGap).toBeGreaterThanOrEqual(8);
  expect(timelineMetrics.rightGap).toBeLessThanOrEqual(12);
  expect(timelineMetrics.progress).toBeLessThan(0.02);
  await expect(page.locator(".section-timeline-spine")).toHaveCount(0);

  const topPassedPoints = await page.locator(".section-timeline-link.is-passed").count();
  expect(topPassedPoints).toBeLessThanOrEqual(2);
  await expect(page.locator(".section-timeline-link.is-section-active .section-timeline-mark")).toHaveCount(1);

  const topActiveLineWidth = await page
    .locator(".section-timeline-link.is-section-active .section-timeline-mark")
    .evaluate((element) => element.getBoundingClientRect().width);
  expect(topActiveLineWidth).toBeGreaterThanOrEqual(22);
  expect(topActiveLineWidth).toBeLessThanOrEqual(26);

  const sectionMarkerMetrics = await page.locator(".section-timeline-link[data-section-id]").evaluateAll((elements) =>
    elements.map((element) => ({
      markerWidth: element.querySelector<HTMLElement>(".section-timeline-mark")?.getBoundingClientRect().width ?? 0,
      labelOpacity: Number.parseFloat(getComputedStyle(element.querySelector<HTMLElement>(".section-timeline-link-label")!).opacity),
      labelTextAlign: getComputedStyle(element.querySelector<HTMLElement>(".section-timeline-link-label")!).textAlign,
    })),
  );
  expect(sectionMarkerMetrics.length).toBeGreaterThan(1);
  expect(sectionMarkerMetrics.every(({ markerWidth }) => markerWidth >= 22 && markerWidth <= 26)).toBe(true);
  expect(sectionMarkerMetrics.every(({ labelOpacity }) => labelOpacity > 0)).toBe(true);
  expect(sectionMarkerMetrics.every(({ labelTextAlign }) => labelTextAlign === "center")).toBe(true);

  const sectionTargetSizes = await page.locator(".section-timeline-link[data-section-id]").evaluateAll((elements) =>
    elements.map((element) => {
      const { width, height } = element.getBoundingClientRect();
      return { width, height };
    }),
  );
  expect(sectionTargetSizes.every(({ width, height }) => width >= 24 && height >= 24)).toBe(true);
  await expect(page.locator('.section-timeline-link:not([data-section-id])').first()).toHaveAttribute("aria-hidden", "true");
  expect(await page.locator(".section-timeline-link.is-two-before-section .section-timeline-mark").count()).toBeGreaterThan(0);
  expect(await page.locator(".section-timeline-link.is-before-section .section-timeline-mark").count()).toBeGreaterThan(0);
  expect(await page.locator(".section-timeline-link.is-after-section .section-timeline-mark").count()).toBeGreaterThan(0);
  expect(await page.locator(".section-timeline-link.is-two-after-section .section-timeline-mark").count()).toBeGreaterThan(0);

  await page.waitForFunction(() => {
    const timeline = document.querySelector<HTMLElement>(".section-timeline");
    if (!timeline) return false;

    const getWidth = (selector: string) =>
      timeline.querySelector<HTMLElement>(selector)?.getBoundingClientRect().width ?? 0;
    const small = getWidth(".is-two-before-section .section-timeline-mark");
    const medium = getWidth(".is-before-section .section-timeline-mark");
    const section = getWidth(".section-timeline-link[data-section-id] .section-timeline-mark");

    return (
      small > 0 &&
      medium > small * 1.8 &&
      medium < small * 2.2 &&
      section > medium * 1.8 &&
      section < medium * 2.2
    );
  });

  const markerLengths = await page.locator(".section-timeline-link[data-section-id]").first().evaluate((element) => {
    const timeline = element.closest(".section-timeline");
    const getWidth = (selector: string) =>
      timeline?.querySelector<HTMLElement>(selector)?.getBoundingClientRect().width ?? 0;

    return {
      small: getWidth(".is-two-before-section .section-timeline-mark"),
      medium: getWidth(".is-before-section .section-timeline-mark"),
      section: getWidth(".section-timeline-link[data-section-id] .section-timeline-mark"),
    };
  });
  expect(markerLengths.medium).toBeGreaterThan(markerLengths.small * 1.8);
  expect(markerLengths.medium).toBeLessThan(markerLengths.small * 2.2);
  expect(markerLengths.section).toBeGreaterThan(markerLengths.medium * 1.8);
  expect(markerLengths.section).toBeLessThan(markerLengths.medium * 2.2);

  const genericPoint = page.locator(".section-timeline-link:not([data-section-id])").first();
  const genericPointProgress = Number(await genericPoint.getAttribute("data-point-progress"));
  await genericPoint.click();
  await page.waitForTimeout(100);
  const progressAfterPointClick = Number(await page.locator(".section-timeline").getAttribute("data-scroll-progress"));
  expect(Math.abs(progressAfterPointClick - genericPointProgress)).toBeLessThan(0.08);

  await scrollToFraction(0.5);
  const progressAtMiddle = Number(await page.locator(".section-timeline").getAttribute("data-scroll-progress"));
  expect(progressAtMiddle).toBeGreaterThan(0.35);
  expect(progressAtMiddle).toBeLessThan(0.65);
  const middlePassedPoints = await page.locator(".section-timeline-link.is-passed").count();
  expect(middlePassedPoints).toBeGreaterThan(15);
  expect(middlePassedPoints).toBeLessThan(35);

  await scrollToFraction(1);
  const progressAtBottom = Number(await page.locator(".section-timeline").getAttribute("data-scroll-progress"));
  expect(progressAtBottom).toBeGreaterThan(0.98);
  await expect(page.locator(".section-timeline-link.is-passed")).toHaveCount(50);

  await scrollToFraction(0);
  await expect(page.locator(".section-timeline-link.is-passed")).toHaveCount(1);

  await page.locator('[data-section-id="projects"]').click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator('.section-timeline-link.is-active[data-section-id="projects"]')).toBeVisible();

  await page.goto("/freelance");
  await expect(page.locator(".section-timeline-link")).toHaveCount(50);
  await expect(page.locator('.section-timeline-link[data-section-id="projects"]')).toHaveAttribute("aria-label", "Réalisations");
  await page.locator('.section-timeline-link[data-section-id="freelance-faq"]').click();
  await expect(page.locator('.section-timeline-link.is-active[data-section-id="freelance-faq"]')).toBeVisible();
  await expect(page.locator('.section-timeline-link[data-section-id="freelance-faq"] .section-timeline-link-label')).toHaveText("Des questions ? ");

  await page.goto("/services/applications-metier");
  await expect(page.locator(".section-timeline-link")).toHaveCount(50);
  await expect(page.locator(".section-timeline-current")).toHaveText("Application métier sur mesure pour PME");

  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);

  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");
  await expect(page.locator(".section-timeline")).toBeHidden();
});
