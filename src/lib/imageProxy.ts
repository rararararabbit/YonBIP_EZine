const PROXY_HOSTS = new Set([
  "img.xiumi.us",
  "c2.yonyoucloud.com",
  "ykj-esn-upload.yonyoucloud.com",
  "docs.yonyoucloud.com",
]);

const PROXY_HOST_SUFFIXES = [".yonyoucloud.com", ".xiumius.cn"];

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
  if (!shouldProxyImageUrl(rawUrl)) {
    return rawUrl;
  }
  const normalized = normalizeImageUrl(rawUrl);
  return `/api/proxy-image?url=${encodeURIComponent(normalized)}`;
}

export function rewriteArticleImages(html: string): string {
  return html
    .replace(
      /(<img\b[^>]*?\ssrc=)(["'])(.*?)\2/gi,
      (_match, prefix: string, quote: string, url: string) =>
        `${prefix}${quote}${proxyImageUrl(url)}${quote}`
    )
    .replace(/\burl\((['"]?)(.*?)\1\)/gi, (match, quote: string, url: string) => {
      const trimmed = url.trim();
      if (!trimmed || trimmed.startsWith("data:")) {
        return match;
      }
      return `url(${quote}${proxyImageUrl(trimmed)}${quote})`;
    });
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
