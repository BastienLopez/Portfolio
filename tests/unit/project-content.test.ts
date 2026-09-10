import { describe, expect, it } from "vitest";
import {
  decorateDetailedContent,
  renderProjectMarkdown,
} from "@/lib/project-content";
import { getImageManifestEntry, getImageSrcSet } from "@/lib/image-variants";

describe("project content rendering", () => {
  it("renders the supported Markdown subset and escapes text", () => {
    const html = renderProjectMarkdown(
      "# A project\n\n## Context\nA <script>alert(1)</script> & **clear result**.\n\n* One step;\n* Another step",
    );

    expect(html).toContain('<h2 class="project-title">A project</h2>');
    expect(html).toContain('<div class="section"><h3 class="section-title">Context</h3>');
    expect(html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(html).toContain("<strong>clear result</strong>");
    expect(html).toContain('<li class="feature-item">One step</li>');
    expect(html).not.toContain("<script>");
  });

  it("normalizes detailed headings and removes decorative emoji", () => {
    const html = decorateDetailedContent(
      '<h1>🎯 Main title</h1><h5>Context</h5><h6>Tools</h6>',
    );

    expect(html).toBe("<h2>Main title</h2><h3>Context</h3><h4>Tools</h4>");
  });

  it("adds responsive sources to inline project screenshots", () => {
    const html = decorateDetailedContent(
      '<img src="img_projects/creche.png" alt="ERP" />',
    );

    expect(html).toContain('srcset="img_optimized/creche-480.webp 480w');
    expect(html).toContain('width="1536" height="1024"');
  });
});

describe("responsive project image manifest", () => {
  it("exposes the generated variants for referenced images", () => {
    const entry = getImageManifestEntry("/img_projects/creche.png");
    const srcSet = getImageSrcSet("/img_projects/creche.png", (path) => path ?? "");

    expect(entry?.width).toBe(1536);
    expect(srcSet).toContain("/img_optimized/creche-480.webp 480w");
    expect(srcSet).toContain("/img_optimized/creche-1536.webp 1536w");
    expect(getImageManifestEntry("img_projects/unknown.png")).toBeUndefined();
  });
});
