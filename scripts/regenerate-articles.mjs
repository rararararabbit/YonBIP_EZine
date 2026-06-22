import { writeFileSync } from "fs";

const PROXY_HOSTS = new Set([
  "img.xiumi.us",
  "c2.yonyoucloud.com",
  "ykj-esn-upload.yonyoucloud.com",
  "docs.yonyoucloud.com",
]);
const PROXY_HOST_SUFFIXES = [".yonyoucloud.com", ".xiumius.cn"];

function normalizeImageUrl(rawUrl) {
  const trimmed = rawUrl.trim();
  if (trimmed.startsWith("//")) return `https:${trimmed}`;
  return trimmed;
}

function shouldProxyImageUrl(rawUrl) {
  try {
    const parsed = new URL(normalizeImageUrl(rawUrl));
    if (parsed.protocol !== "https:") return false;
    if (PROXY_HOSTS.has(parsed.hostname)) return true;
    return PROXY_HOST_SUFFIXES.some((suffix) => parsed.hostname.endsWith(suffix));
  } catch {
    return false;
  }
}

function proxyImageUrl(rawUrl) {
  if (!shouldProxyImageUrl(rawUrl)) return rawUrl;
  return `/api/proxy-image?url=${encodeURIComponent(normalizeImageUrl(rawUrl))}`;
}

function rewriteArticleImages(html) {
  let result = html
    .replace(/(\s(?:src|data-src|data-original)=)(["'])(.*?)\2/gi, (_m, prefix, quote, url) => {
      return `${prefix}${quote}${proxyImageUrl(normalizeImageUrl(url))}${quote}`;
    })
    .replace(/(<img\b[^>]*?\ssrc=)(["'])(.*?)\2/gi, (_m, prefix, quote, url) => {
      return `${prefix}${quote}${proxyImageUrl(normalizeImageUrl(url))}${quote}`;
    });

  return result.replace(/\burl\((['"]?)(.*?)\1\)/gi, (match, quote, url) => {
    const trimmed = url.trim();
    if (!trimmed || trimmed.startsWith("data:") || trimmed === "initial") return match;
    return `url(${quote}${proxyImageUrl(normalizeImageUrl(trimmed))}${quote})`;
  });
}

function collectRaHtmlBlocks(obj, out = []) {
  if (!obj || typeof obj !== "object") return out;
  if (Array.isArray(obj)) {
    for (const item of obj) collectRaHtmlBlocks(item, out);
    return out;
  }
  if (typeof obj._$raHTML === "string" && obj._$raHTML.trim()) out.push(obj._$raHTML);
  for (const value of Object.values(obj)) collectRaHtmlBlocks(value, out);
  return out;
}

function extractCellContentFromRaHtml(html) {
  const parts = [];
  const regex = /class="tn-cell tn-cell-(?:text|image)[^"]*"[^>]*>([\s\S]*?)<\/div>/g;
  let match;
  while ((match = regex.exec(html)) !== null) parts.push(match[1]);
  return parts.join("");
}

function normalizeArticleHtml(html) {
  return rewriteArticleImages(
    html
      .replace(/(\s(?:src|data-src|data-original)=["'])\/\//g, '$1https://')
      .replace(/src="\/\//g, 'src="https://')
      .replace(/href="\/\//g, 'href="https://')
  );
}

async function fetchXiumiArticleHtml(sourceUrl) {
  const pageRes = await fetch(sourceUrl, {
    headers: { "User-Agent": "Mozilla/5.0", "Accept-Encoding": "gzip" },
  });
  if (!pageRes.ok) throw new Error(`page ${pageRes.status}`);
  const pageHtml = await pageRes.text();
  const showInfoMatch = pageHtml.match(
    /injectedData\.showInfo\s*=\s*JSON\.parse\(decodeURIComponent\("([^"]+)"\)\)/
  );
  if (!showInfoMatch) throw new Error("no showInfo");
  const showInfo = JSON.parse(decodeURIComponent(showInfoMatch[1]));
  let showDataUrl = showInfo.show_data_url ?? "";
  if (showDataUrl.startsWith("//")) showDataUrl = `https:${showDataUrl}`;
  const jsonRes = await fetch(showDataUrl, {
    headers: { "User-Agent": "Mozilla/5.0", "Accept-Encoding": "gzip" },
  });
  if (!jsonRes.ok) throw new Error(`json ${jsonRes.status}`);
  const data = await jsonRes.json();
  const raHtmlBlocks = collectRaHtmlBlocks(data);
  const largestBlock = raHtmlBlocks.sort((a, b) => b.length - a.length)[0];
  return normalizeArticleHtml(extractCellContentFromRaHtml(largestBlock) || largestBlock);
}

const articles = [
  ["article-01", "https://b.xiumius.cn/board/v5/3x9y0/707025541"],
  ["article-02", "https://d.xiumius.cn/board/v5/3x9y0/706475533"],
  ["article-03", "https://v.xiumius.cn/board/v5/3x9y0/707994217"],
  ["article-04", "https://d.xiumius.cn/board/v5/3x9y0/706592828"],
  ["article-05", "https://a.xiumius.cn/board/v5/3x9y0/706815260"],
  ["article-06", "https://d.xiumius.cn/board/v5/3x9y0/707439423"],
  ["article-07", "https://d.xiumius.cn/board/v5/3x9y0/706608733"],
  ["article-08", "https://c.xiumius.cn/board/v5/3x9y0/708486432"],
  ["article-09", "https://c.xiumius.cn/board/v5/3x9y0/709802397"],
  ["article-10", "https://a.xiumius.cn/board/v5/3x9y0/709289735"],
];

const report = [];
for (const [id, url] of articles) {
  process.stderr.write(`Fetching ${id}...\n`);
  const content = await fetchXiumiArticleHtml(url);
  writeFileSync(`./src/article-contents/${id}.html`, content, "utf8");
  const imgs = (content.match(/<img\b/gi) || []).length;
  const proxied = (content.match(/\/api\/proxy-image/g) || []).length;
  report.push({ id, chars: content.length, imgs, proxied });
}
console.log(JSON.stringify(report, null, 2));
