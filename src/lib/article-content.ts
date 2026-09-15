const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;",
})[character] ?? character);

const removeDecorativeEmoji = (content: string) =>
  content
    .replace(/[0-9#*]\uFE0F?\u20E3\s*/gu, "")
    .replace(/[\p{Extended_Pictographic}\uFE0F]+\s*/gu, "");

const normalizeCode = (code: string) => code
  .replace(/<br\s*\/?>/gi, "\n")
  .replace(/\r\n?/g, "\n")
  .trim();

const isBlockCode = (code: string) =>
  code.includes("\n") ||
  code.length > 160 ||
  /(?:^|\n)\s*(?:#|[-*]|\d+\.|[|├└│])/.test(code);

const codeMarkup = (code: string, language = "") => {
  const normalized = normalizeCode(code);
  const nestedMermaid = normalized.match(
    /^(?:\\?`){3}\s*mermaid[ \t]*\n([\s\S]*?)\n\s*(?:\\?`){3}$/i,
  );
  const resolvedLanguage = nestedMermaid ? "mermaid" : language;
  const resolvedCode = nestedMermaid?.[1] ?? normalized;

  return `<pre><code${resolvedLanguage ? ` class="language-${resolvedLanguage}"` : ""}>${escapeHtml(resolvedCode)}</code></pre>`;
};

export const estimateReadingMinutes = (content: string) => {
  const plainText = content
    .replace(/<[^>]*>/g, " ")
    .replace(/&(?:nbsp|amp|quot|lt|gt);/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  return Math.max(1, Math.ceil(plainText.split(" ").filter(Boolean).length / 200));
};

export const renderArticleContent = (content: string) => {
  const codeBlocks: string[] = [];
  const withCodeBlocks = removeDecorativeEmoji(content).replace(
    /<code(?:\s+class=["']([^"']*)["'])?\s*>([\s\S]*?)<\/code>/gi,
    (match, className = "", code: string) => {
      const normalized = normalizeCode(code);
      if (!isBlockCode(normalized)) return match;

      const languageMatch = String(className).match(/(?:language|lang)-([\w+-]+)/i);
      const language = languageMatch?.[1] ?? "";
      const token = `__ARTICLE_CODE_BLOCK_${codeBlocks.length}__`;
      codeBlocks.push(codeMarkup(normalized, language));
      return token;
    },
  );

  const withFencedCode = withCodeBlocks.replace(
    /(^|[\r\n])\s*```([\w+-]+)?[ \t]*\r?\n([\s\S]*?)\r?\n\s*```(?=\s*(?:$|[\r\n]))/g,
    (_match, prefix = "", language = "", code: string) => `${prefix}${codeMarkup(code, language)}`,
  );

  const withEscapedFencedCode = withFencedCode.replace(
    /(^|[\r\n])\s*(?:(?:\\`)){3}([\w+-]+)?[ \t]*\r?\n([\s\S]*?)\r?\n\s*(?:(?:\\`)){3}(?=\s*(?:$|[\r\n]))/g,
    (_match, prefix = "", language = "", code: string) => `${prefix}${codeMarkup(code, language)}`,
  );

  return withEscapedFencedCode.replace(/__ARTICLE_CODE_BLOCK_(\d+)__/g, (_match, index: string) => codeBlocks[Number(index)] ?? "");
};
