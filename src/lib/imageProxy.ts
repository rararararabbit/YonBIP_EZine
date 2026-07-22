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

/** Rewrite legacy `/api/proxy-*` (and any base-prefixed variant) to current public base. */
function rewriteExistingProxyPath(rawUrl: string): string | null {
  const trimmed = rawUrl.trim();
  const match = trimmed.match(
    /^(?:https?:\/\/[^/?#]+)?(?:\/YonBIP_EZine(?:-test)?)?\/api\/(proxy-image|proxy-cover)(\?[^#]*)?(?:#.*)?$/i
  );
  if (!match) return null;
  return apiUrl(`api/${match[1]}${match[2] || ""}`);
}

export function normalizeImageUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (trimmed.startsWith("//")) {
    return `https:${trimmed}`;
  }
  return trimmed;
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
  const existing = rewriteExistingProxyPath(rawUrl);
  if (existing) return existing;

  if (!shouldProxyImageUrl(rawUrl)) {
    return rawUrl;
  }
  const normalized = normalizeImageUrl(rawUrl);
  return apiUrl(`api/proxy-image?url=${encodeURIComponent(normalized)}`);
}

export function normalizeArticleTypography(html: string): string {
  let result = html;

  // 图片与图注之间的空行段落
  result = result.replace(
    /(<img\b[^>]*>)\s*<p[^>]*>\s*<br\s*\/?>\s*<\/p>\s*(?=<p[^>]*text-align:\s*center)/gi,
    "$1"
  );

  // 标记居中以「图」开头的图注段落
  result = result.replace(
    /<p([^>]*)>((?:\s*<(?:span|em|strong|b|i)[^>]*>)*\s*图\s*[\d.])/gi,
    (match, attrs, contentStart) => {
      if (!/text-align:\s*center/i.test(attrs)) return match;
      if (attrs.includes("figure-caption")) return match;
      const newAttrs = attrs.includes('class="')
        ? attrs.replace(/class="([^"]*)"/, 'class="$1 figure-caption"')
        : `${attrs} class="figure-caption"`;
      return `<p${newAttrs}>${contentStart}`;
    }
  );

  return result;
}

export function rewriteArticleImages(html: string): string {
  let result = html
    .replace(/(\s(?:src|data-src|data-original)=)(["'])(.*?)\2/gi, (_match, prefix: string, quote: string, url: string) => {
      const normalized = normalizeImageUrl(url);
      return `${prefix}${quote}${proxyImageUrl(normalized)}${quote}`;
    })
    .replace(
      /(<img\b[^>]*?\ssrc=)(["'])(.*?)\2/gi,
      (_match, prefix: string, quote: string, url: string) =>
        `${prefix}${quote}${proxyImageUrl(normalizeImageUrl(url))}${quote}`
    );

  result = result.replace(/\burl\((['"]?)(.*?)\1\)/gi, (match, quote: string, url: string) => {
    const trimmed = url.trim();
    if (!trimmed || trimmed.startsWith("data:") || trimmed === "initial") {
      return match;
    }
    return `url(${quote}${proxyImageUrl(normalizeImageUrl(trimmed))}${quote})`;
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
