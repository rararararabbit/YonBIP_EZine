import React, { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, Clock, Tag, Moon, Sun } from "lucide-react";
import type { EcoArticleView } from "../ecoTypes";
import { rewriteArticleImages } from "../../lib/imageProxy";

interface ArticleReaderViewProps {
  article: EcoArticleView;
  onBack: () => void;
}

const FONT_SIZES = [
  { id: "sm" as const, label: "小" },
  { id: "base" as const, label: "标准" },
  { id: "lg" as const, label: "大" },
  { id: "xl" as const, label: "特大" },
];

export function ArticleReaderView({ article, onBack }: ArticleReaderViewProps) {
  const [theme, setTheme] = useState<"light" | "sepia">("light");
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg" | "xl">("base");
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (article.htmlContent?.trim()) {
      setHtml(rewriteArticleImages(article.htmlContent));
      setLoading(false);
      return;
    }

    if (!article.sourceUrl) {
      setHtml("<p>暂无正文内容。</p>");
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`${import.meta.env.BASE_URL}api/fetch-article-content`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: article.sourceUrl }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.json() as Promise<{ content?: string }>;
      })
      .then((data) => {
        if (!cancelled) {
          setHtml(rewriteArticleImages(data.content || "<p>暂无正文内容。</p>"));
        }
      })
      .catch(() => {
        if (!cancelled) setHtml("<p>正文加载失败，请稍后重试。</p>");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [article]);

  const shellBg = theme === "sepia" ? "bg-[#f3efe6] text-[#3d3429]" : "bg-[#f2f1ed] text-[#222524]";
  const paperBg = theme === "sepia" ? "bg-[#faf6ee]" : "bg-white";
  const fontClass =
    fontSize === "sm"
      ? "text-sm"
      : fontSize === "lg"
        ? "text-lg"
        : fontSize === "xl"
          ? "text-xl"
          : "text-base";

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${shellBg}`}>
      <div className="sticky top-0 z-20 border-b border-[#d8dbd7] bg-[#f2f1ed]/95 backdrop-blur-md">
        <div className="max-w-[90rem] mx-auto px-3 sm:px-4 lg:px-6 h-14 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4e5d53] hover:text-[#222524] shrink-0"
          >
            <ArrowLeft className="w-4 h-4" /> 返回目录
          </button>

          <div className="flex items-center gap-2 min-w-0">
            <div
              className="inline-flex items-center rounded-lg border border-[#d1d5d1] bg-white p-0.5 shadow-xs"
              role="group"
              aria-label="字号"
            >
              {FONT_SIZES.map((opt) => {
                const active = fontSize === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFontSize(opt.id)}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-md text-[11px] font-bold transition ${
                      active
                        ? "bg-[#4e5d53] text-white shadow-xs"
                        : "text-[#5a5e5c] hover:text-[#222524] hover:bg-[#e6e9e7]/80"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setTheme((t) => (t === "light" ? "sepia" : "light"))}
              className="p-2 rounded-lg border border-[#d1d5d1] bg-white text-[#4e5d53] shrink-0"
              title={theme === "light" ? "护眼模式" : "浅色模式"}
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <article className={`max-w-[90rem] mx-auto px-3 sm:px-4 lg:px-6 py-8 ${fontClass}`}>
        <div className={`${paperBg} border border-[#d8dbd7] rounded-2xl p-6 sm:p-8 shadow-xs space-y-5`}>
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="px-2.5 py-1 rounded-md bg-[#4e5d53] text-white font-bold">{article.moduleName}</span>
            <span className="px-2.5 py-1 rounded-md bg-[#e6e9e7] text-[#4e5d53] border border-[#c4cdc7] font-semibold inline-flex items-center gap-1">
              <Tag className="w-3 h-3" /> {article.columnTag}
            </span>
            <span className="text-[#6e7370] inline-flex items-center gap-1 ml-auto">
              <Clock className="w-3 h-3" /> {article.readTime} · {article.date}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#222524] leading-snug">
            {article.title}
          </h1>
          <p className="text-sm text-[#6e7370] leading-relaxed">{article.excerpt}</p>

          {article.sourceUrl && (
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#4e5d53] hover:underline"
            >
              跳转到原链接 <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          <div className="border-t border-[#d8dbd7] pt-6">
            {loading ? (
              <p className="text-sm text-[#6e7370]">正文加载中…</p>
            ) : (
              <div
                className="xiumi-article-content prose-ecosystem"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
