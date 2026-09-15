import { useEffect, useMemo, useRef } from "react";
import DOMPurify from "dompurify";
import { renderArticleContent } from "@/lib/article-content";

let mermaidRenderId = 0;

type RenderedArticleContentProps = {
  content: string;
  className: string;
};

const RenderedArticleContent = ({ content, className }: RenderedArticleContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const html = useMemo(
    () => DOMPurify.sanitize(renderArticleContent(content)),
    [content],
  );

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const mermaidBlocks = Array.from(
      container.querySelectorAll<HTMLElement>("pre > code.language-mermaid"),
    );
    if (mermaidBlocks.length === 0) return;

    let cancelled = false;

    void import("mermaid").then(async ({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "dark",
        fontFamily: "inherit",
        flowchart: { useMaxWidth: true, htmlLabels: false },
      });

      await Promise.all(mermaidBlocks.map(async (block) => {
        const source = block.textContent?.trim();
        const pre = block.closest("pre");
        if (!source || !pre || cancelled) return;

        try {
          const rendered = await mermaid.render(`devnote-mermaid-${++mermaidRenderId}`, source);
          if (cancelled) return;

          const wrapper = document.createElement("div");
          wrapper.className = "devnotes-mermaid";
          wrapper.setAttribute("role", "img");
          wrapper.setAttribute("aria-label", "Diagramme Mermaid");
          wrapper.innerHTML = rendered.svg;
          pre.replaceWith(wrapper);
          rendered.bindFunctions?.(wrapper);
        } catch {
          // Keep the sanitized code block visible when Mermaid cannot parse a diagram.
        }
      }));
    }).catch(() => {
      // Mermaid is optional at runtime; the source remains available as a code block.
    });

    return () => {
      cancelled = true;
    };
  }, [html]);

  return <div ref={contentRef} className={className} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default RenderedArticleContent;
