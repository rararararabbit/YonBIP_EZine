const PROXY_HOSTS = new Set([
  "img.xiumi.us",
  "c2.yonyoucloud.com",
  "ykj-esn-upload.yonyoucloud.com",
  "docs.yonyoucloud.com",
]);

const PROXY_HOST_SUFFIXES = [".yonyoucloud.com", ".xiumius.cn"];

/** Public URL prefix for API calls (Vite client or Node server). */
export function getPublicBaseUrl(): string {
  try {
    const viteBase = import.meta.env?.BASE_URL;
    if (typeof viteBase === "string" && viteBase.length > 0) {
      return viteBase.endsWith("/") ? viteBase : `${viteBase}/`;
    }
  } catch {
    // Node / esbuild bundle may not have Vite-injected import.meta.env
  }
  const base = process.env.VITE_BASE_PATH || process.env.BASE_PATH || "/YonBIP_EZine/";
  return base.endsWith("/") ? base : `${base}/`;
}

export function apiUrl(path: string): string {
  const normalized = path.replace(/^\//, "");
  return `${getPublicBaseUrl()}${normalized}`;
}

export function normalizeImageUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (trimmed.startsWith("//")) {
    return `https:${trimmed}`;
  }
  return trimmed;
}

/** Strip Xiumi/OSS compression query (e.g. ?x-oss-process=style/xmwebp) to fetch originals. */
export function unwrapOriginalImageUrl(rawUrl: string): string {
  const normalized = normalizeImageUrl(rawUrl);
  try {
    const parsed = new URL(normalized);
    const isXiumiHost =
      parsed.hostname === "img.xiumi.us" ||
      parsed.hostname.endsWith(".xiumius.cn") ||
      parsed.hostname === "xiumius.cn";
    const hasOssProcess =
      parsed.searchParams.has("x-oss-process") ||
      /(?:^|[?&])x-oss-process=/i.test(parsed.search);

    if (!isXiumiHost && !hasOssProcess) {
      return normalized;
    }

    parsed.search = "";
    parsed.hash = "";
    return parsed.toString();
  } catch {
    const noHash = normalized.split("#")[0];
    const qIndex = noHash.indexOf("?");
    if (qIndex === -1) return noHash;
    const base = noHash.slice(0, qIndex);
    const query = noHash.slice(qIndex + 1);
    if (!/x-oss-process=/i.test(query) && !/img\.xiumi\.us|xiumius\.cn/i.test(base)) {
      return noHash;
    }
    return base;
  }
}

function extractImageUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  const proxyMatch = trimmed.match(
    /^(?:https?:\/\/[^/?#]+)?(?:\/YonBIP_EZine(?:-test)?)?\/api\/(?:proxy-image|proxy-cover)\?url=([^&#]+)/i
  );
  if (proxyMatch) {
    try {
      return unwrapOriginalImageUrl(decodeURIComponent(proxyMatch[1]));
    } catch {
      return unwrapOriginalImageUrl(proxyMatch[1]);
    }
  }
  return unwrapOriginalImageUrl(trimmed);
}

export function shouldProxyImageUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(normalizeImageUrl(rawUrl));
    if (parsed.protocol !== "https:") return false;
    if (PROXY_HOSTS.has(parsed.hostname)) return true;
    return PROXY_HOST_SUFFIXES.some((suffix) => parsed.hostname.endsWith(suffix));
  } catch {
    return false;
  }
}

export function proxyImageUrl(rawUrl: string): string {
  const imageUrl = extractImageUrl(rawUrl);

  if (!shouldProxyImageUrl(imageUrl)) {
    return imageUrl;
  }

  return apiUrl(`api/proxy-image?url=${encodeURIComponent(imageUrl)}`);
}

function plainParagraphText(innerHtml: string): string {
  return innerHtml
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function withFigureCaptionAttrs(attrs: string): string {
  let next = attrs;
  if (!/text-align:\s*center/i.test(next)) {
    next = /style\s*=\s*"/i.test(next)
      ? next.replace(/style\s*=\s*"/i, 'style="text-align: center; ')
      : `${next} style="text-align: center;"`;
  }
  if (!/\bfigure-caption\b/.test(next)) {
    next = /\bclass\s*=\s*"/i.test(next)
      ? next.replace(/\bclass\s*=\s*"/i, 'class="figure-caption ')
      : `${next} class="figure-caption"`;
  }
  return next;
}

export function normalizeArticleTypography(html: string): string {
  let result = html;

  // 图片与图注之间的空行段落
  result = result.replace(
    /(<img\b[^>]*>)\s*<p[^>]*>\s*<br\s*\/?>\s*<\/p>\s*(?=<p\b)/gi,
    "$1"
  );

  // 标记「▲ …」与居中「图 N」图注：强制居中并统一 figure-caption 样式
  result = result.replace(/<p([^>]*)>((?:(?!<\/p>)[\s\S])*?)<\/p>/gi, (match, attrs: string, inner: string) => {
    const plain = plainParagraphText(inner);
    const isTriangleCaption = /^▲/.test(plain);
    const isNumberedCaption = /^图\s*[\d.]/.test(plain);
    if (!isTriangleCaption && !isNumberedCaption) return match;
    if (isNumberedCaption && !isTriangleCaption && !/text-align:\s*center/i.test(attrs)) {
      return match;
    }
    return `<p${withFigureCaptionAttrs(attrs)}>${inner}</p>`;
  });

  return result;
}

export function rewriteArticleImages(html: string): string {
  let result = html
    .replace(/(\s(?:src|data-src|data-original)=)(["'])(.*?)\2/gi, (_match, prefix: string, quote: string, url: string) => {
      return `${prefix}${quote}${proxyImageUrl(url)}${quote}`;
    })
    .replace(
      /(<img\b[^>]*?\ssrc=)(["'])(.*?)\2/gi,
      (_match, prefix: string, quote: string, url: string) =>
        `${prefix}${quote}${proxyImageUrl(url)}${quote}`
    );

  result = result.replace(/\burl\((['"]?)(.*?)\1\)/gi, (match, quote: string, url: string) => {
    const trimmed = url.trim();
    if (!trimmed || trimmed.startsWith("data:") || trimmed === "initial") {
      return match;
    }
    return `url(${quote}${proxyImageUrl(trimmed)}${quote})`;
  });

  return normalizeArticleTypography(result);
}

export function getProxyReferer(hostname: string): string | undefined {
  if (hostname.includes("xiumi")) {
    return "https://xiumius.cn/";
  }
  if (hostname.includes("yonyou")) {
    return "https://www.yonyou.com/";
  }
  return undefined;
}
