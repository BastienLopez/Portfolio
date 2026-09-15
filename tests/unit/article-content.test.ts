import { describe, expect, it } from "vitest";
import { renderArticleContent } from "@/lib/article-content";

describe("dev note content rendering", () => {
  it("turns multiline code tags into readable code boxes", () => {
    const html = renderArticleContent(
      '<h3>Installation locale</h3><code>\n## Installation\n\nnpm install\n</code>',
    );

    expect(html).toContain('<pre><code>## Installation\n\nnpm install</code></pre>');
    expect(html).not.toContain("<code>\n## Installation");
  });

  it("renders escaped Mermaid fences with a Mermaid language marker", () => {
    const html = renderArticleContent(
      "<h3>Architecture</h3>\n\\`\\`\\`mermaid\ngraph TD\n  A[Start] --> B[End]\n\\`\\`\\`",
    );

    expect(html).toContain('<pre><code class="language-mermaid">graph TD');
    expect(html).toContain("A[Start] --&gt; B[End]");
  });
});
