import { getImageManifestEntry, getImageSrcSet } from "@/lib/image-variants";

const removeDecorativeEmoji = (content: string) =>
  content.replace(/[\p{Extended_Pictographic}\uFE0F]+\s*/gu, "");

const addResponsiveImageSources = (content: string) =>
  content.replace(
    /<img\b([^>]*?)\bsrc=(['"])(img_projects\/[A-Za-z0-9_.-]+\.(?:png|jpe?g))\2([^>]*)>/gi,
    (_match, before, quote, source, after) => {
      const attributes = `${before}src=${quote}${source}${quote}${after}`;
      if (/\bsrcset\s*=/i.test(attributes)) return `<img${attributes}>`;

      const srcSet = getImageSrcSet(source, (path) =>
        path?.replace(/^\/+/, "") ?? "",
      );
      const dimensions = getImageManifestEntry(source);
      if (!srcSet) return `<img${attributes}>`;

      const dimensionAttributes = dimensions
        ? ` width="${dimensions.width}" height="${dimensions.height}"`
        : "";
      return `<img${before}src=${quote}${source}${quote} srcset="${srcSet}"${dimensionAttributes}${after}>`;
    },
  );

const normalizeDetailedHeadingLevels = (content: string) => {
  let previousLevel = 1;

  return content.replace(
    /<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (_match, level, attributes, title) => {
      const requestedLevel = Number(level);
      const normalizedLevel = Math.min(
        Math.max(requestedLevel, 2),
        previousLevel + 1,
        4,
      );
      previousLevel = normalizedLevel;
      return `<h${normalizedLevel}${attributes}>${title}</h${normalizedLevel}>`;
    },
  );
};

const getSectionMarker = (title: string) => {
  const normalizedTitle = title
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("fr-FR");

  if (/contexte|context|presentation/.test(normalizedTitle)) return true;
  if (/contribution|mon role|ma contribution|role/.test(normalizedTitle))
    return true;
  if (/technologie|standards|outils/.test(normalizedTitle)) return true;
  if (/architecture|multi.?creche|multi.?site/.test(normalizedTitle)) return true;
  if (/resultat|objectif|suivi/.test(normalizedTitle)) return true;

  return null;
};

export const decorateDetailedContent = (content: string) => {
  const decoratedContent = addResponsiveImageSources(removeDecorativeEmoji(content)).replace(
    /<h3([^>]*)class="([^"]*\bsection-title\b[^"]*)"([^>]*)>([\s\S]*?)<\/h3>/gi,
    (_match, beforeClass, classNames, afterClass, title) => {
      const marker = getSectionMarker(title.replace(/<[^>]+>/g, ""));

      if (!marker) {
        return `<h3${beforeClass}class="${classNames}"${afterClass}>${title}</h3>`;
      }
      return `<h3${beforeClass}class="${classNames}"${afterClass}><span class="section-marker" aria-hidden="true"></span>${title}</h3>`;
    },
  );

  return normalizeDetailedHeadingLevels(decoratedContent);
};

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const formatMarkdownInline = (value: string) =>
  escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

export const renderProjectMarkdown = (content: string) => {
  const lines = content.trim().split(/\r?\n/);
  const html: string[] = ['<div class="project-detail">'];
  let paragraph: string[] = [];
  let isListOpen = false;
  let isSectionOpen = false;
  let isSubsectionOpen = false;
  let hasTitle = false;
  let hasFirstSection = false;

  const closeList = () => {
    if (isListOpen) {
      html.push("</ul>");
      isListOpen = false;
    }
  };

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      html.push(
        `<p class="description">${formatMarkdownInline(paragraph.join(" "))}</p>`,
      );
      paragraph = [];
    }
  };

  const closeSubsection = () => {
    flushParagraph();
    closeList();
    if (isSubsectionOpen) {
      html.push("</div>");
      isSubsectionOpen = false;
    }
  };

  const closeSection = () => {
    closeSubsection();
    if (isSectionOpen) {
      html.push("</div>");
      isSectionOpen = false;
    }
  };

  const openSection = (title: string) => {
    closeSection();
    html.push(
      `<div class="section"><h3 class="section-title">${formatMarkdownInline(title)}</h3>`,
    );
    isSectionOpen = true;
    hasFirstSection = true;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line || line === "---") {
      flushParagraph();
      closeList();
      continue;
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(line);
    if (heading) {
      const [, level, title] = heading;

      if (!hasTitle) {
        html.push(
          `<h2 class="project-title">${formatMarkdownInline(title)}</h2>`,
        );
        hasTitle = true;
      } else if (level === "#" || !hasFirstSection) {
        openSection(title);
      } else {
        closeSubsection();
        html.push(
          `<div class="workflow-step"><h4>${formatMarkdownInline(title)}</h4>`,
        );
        isSubsectionOpen = true;
      }
      continue;
    }

    const listItem = /^\*\s+(.+)$/.exec(line);
    if (listItem) {
      flushParagraph();
      if (!isListOpen) {
        html.push('<ul class="features-list">');
        isListOpen = true;
      }
      html.push(
        `<li class="feature-item">${formatMarkdownInline(listItem[1].replace(/;\s*$/, ""))}</li>`,
      );
      continue;
    }

    paragraph.push(line);
  }

  closeSection();
  html.push("</div>");
  return html.join("");
};
