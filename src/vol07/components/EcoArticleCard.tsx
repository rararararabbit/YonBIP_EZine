import type { ReactElement } from "react";
import { ArrowRight, ExternalLink, Tag, Clock, Image as ImageIcon } from "lucide-react";
import type { EcoArticleView } from "../ecoTypes";
import { proxyImageUrl } from "../../lib/imageProxy";

type CardProps = {
  article: EcoArticleView;
  onReadArticle: (article: EcoArticleView) => void;
};

export function EcoArticleCard(props: CardProps): ReactElement {
  const { article, onReadArticle } = props;
  const cover = article.coverImage ? proxyImageUrl(article.coverImage) : "";

  return (
    <article className="group bg-white border border-[#d8dbd7] hover:border-[#4e5d53] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-[16/9] overflow-hidden bg-[#e4e3df] flex-shrink-0">
        {cover ? (
          <img
            src={cover}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#4e5d53]/40">
            <ImageIcon className="w-10 h-10" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      <div className="p-5 flex flex-col flex-1 min-h-0">
        <div className="space-y-3 flex-1">
          <h2
            onClick={() => onReadArticle(article)}
            className="text-lg sm:text-xl font-serif font-bold text-[#222524] group-hover:text-[#4e5d53] transition-colors cursor-pointer leading-snug"
          >
            {article.title}
          </h2>
          <p
            className="text-xs sm:text-sm text-[#6e7370] leading-relaxed line-clamp-3 font-sans cursor-default"
            title={article.excerpt}
          >
            {article.excerpt}
          </p>
        </div>

        <div className="mt-auto pt-3 flex flex-col gap-3">
          <div className="pt-2 flex items-center justify-between gap-2 border-t border-[#d8dbd7] text-xs text-[#6e7370]">
            <div className="flex items-center flex-wrap gap-2 min-w-0">
              <span className="px-2.5 py-1 bg-[#4e5d53] text-white rounded-md text-[11px] font-bold tracking-wide shadow-xs shrink-0">
                {article.moduleName}
              </span>
              <span className="px-2.5 py-1 bg-[#e6e9e7] text-[#4e5d53] border border-[#d1d5d1] rounded-md text-[11px] font-semibold shadow-xs flex items-center gap-1 shrink-0">
                <Tag className="w-3 h-3" />
                {article.columnTag}
              </span>
            </div>
            <span className="flex items-center gap-1 shrink-0">
              <Clock className="w-3 h-3" /> {article.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onReadArticle(article)}
              className="flex-1 min-w-0 py-2.5 px-4 bg-[#eae8e3] hover:bg-[#4e5d53] text-[#222524] hover:text-white font-bold text-xs rounded-xl border border-[#d1d5d1] hover:border-[#3d4b42] transition-all duration-200 flex items-center justify-center space-x-2 shadow-xs group/btn"
            >
              <span>查看全文</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
            {article.sourceUrl && (
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="跳转到原链接"
                aria-label="跳转到原链接"
                onClick={(e) => e.stopPropagation()}
                className="shrink-0 p-2.5 rounded-xl border border-[#d1d5d1] bg-transparent text-[#9aa19c] hover:border-[#4e5d53] hover:text-[#4e5d53] transition-all duration-200"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
