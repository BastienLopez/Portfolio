import { describe, expect, it } from "vitest";
import { articlePageDefinitions } from "@/data/articles/pages";
import {
  getPublicServicePagePath,
  getServiceForProject,
  servicePageDefinitions,
  serviceRelatedArticleSlugs,
} from "@/data/site-pages";

const articlesBySlug = new Map(articlePageDefinitions.map((article) => [article.slug, article]));

describe("editorial service clusters", () => {
  it("keeps every commercial cluster between two and four notes", () => {
    for (const [serviceSlug, articleSlugs] of Object.entries(serviceRelatedArticleSlugs)) {
      expect(articleSlugs.length, serviceSlug).toBeGreaterThanOrEqual(2);
      expect(articleSlugs.length, serviceSlug).toBeLessThanOrEqual(4);
      expect(new Set(articleSlugs).size, serviceSlug).toBe(articleSlugs.length);
    }
  });

  it("gives each clustered note a valid service and at least one proof link", () => {
    for (const [serviceSlug, articleSlugs] of Object.entries(serviceRelatedArticleSlugs)) {
      for (const articleSlug of articleSlugs) {
        const article = articlesBySlug.get(articleSlug);
        expect(article, articleSlug).toBeDefined();
        expect(article?.relatedServiceSlug, articleSlug).toBe(serviceSlug);
        expect(article?.relatedProjectSlugs.length, articleSlug).toBeGreaterThan(0);
      }
    }
  });

  it("keeps service-to-proof relationships resolvable", () => {
    for (const service of servicePageDefinitions) {
      for (const projectId of service.relatedProjectSlugs) {
        expect(getServiceForProject(projectId)).toBeDefined();
      }
    }
  });

  it("uses the public local route for the website service", () => {
    expect(getPublicServicePagePath("sites-vitrines")).toBe("/creation-site-internet-reims");
    expect(getPublicServicePagePath("applications-metier")).toBe("/services/applications-metier");
  });
});
