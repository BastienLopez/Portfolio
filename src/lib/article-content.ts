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

export const renderArticleContent = (content: string) => removeDecorativeEmoji(content).replace(
  /```([\w+-]+)?\r?\n([\s\S]*?)```/g,
  (_match, language = "", code: string) => `<pre><code${language ? ` class="language-${language}"` : ""}>${escapeHtml(code.trim())}</code></pre>`,
);
