import React, { useMemo, useState } from "react";
import { SearchX, Sparkles } from "lucide-react";
import type { Issue, PastIssueLink } from "../types";
import {
  buildEcoMeta,
  toEcoArticle,
  type EcoArticleView,
  type EcoModuleId,
} from "./ecoTypes";
import { Header } from "./components/Header";
import { TocNavbar } from "./components/TocNavbar";
import { EcoArticleCard } from "./components/EcoArticleCard";
import { PastIssueLinksSidebar } from "./components/PastIssueLinksSidebar";
import { ArticleReaderView } from "./components/ArticleReaderView";
import { MagazineCoverSplash } from "./components/MagazineCoverSplash";

interface Vol07MagazineProps {
  issue: Issue;
  pastLinks: PastIssueLink[];
}

export default function Vol07Magazine({ issue, pastLinks }: Vol07MagazineProps) {
  const meta = useMemo(() => buildEcoMeta(issue), [issue]);
  const articles = useMemo(
    () => issue.articles.map((a, i) => toEcoArticle(a, i === 0)),
    [issue.articles]
  );

  const [selectedModule, setSelectedModule] = useState<EcoModuleId>("all");
  const [activeArticle, setActiveArticle] = useState<EcoArticleView | null>(null);
  const [isCoverPage, setIsCoverPage] = useState(true);

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      if (selectedModule !== "all" && art.moduleId !== selectedModule) return false;
      return true;
    });
  }, [articles, selectedModule]);

  return (
    <div className="min-h-screen bg-[#f2f1ed] text-[#222524] font-sans selection:bg-[#4e5d53] selection:text-white flex flex-col justify-between">
      {isCoverPage ? (
        <MagazineCoverSplash
          title={issue.title}
          editor={issue.editor}
          tagline={issue.tagline}
          onOpen={() => setIsCoverPage(false)}
        />
      ) : (
      <>
      <div>
        <Header
          meta={meta}
          onSelectModule={setSelectedModule}
          onBrandClick={() => setIsCoverPage(true)}
        />

        <TocNavbar
          className="md:hidden"
          selectedModule={selectedModule}
          onSelectModule={setSelectedModule}
          articles={articles}
          layout="horizontal"
        />

        <main className="max-w-[90rem] mx-auto px-3 sm:px-4 lg:px-6 py-8">
          <div className="flex flex-col md:flex-row gap-8 md:items-start">
            <aside className="hidden md:flex w-56 xl:w-64 flex-shrink-0 flex-col order-2 md:order-1 sticky top-20 self-start">
              <div className="flex-shrink-0">
                {/* Match right-column title block height so TOC aligns with article grid */}
                <div
                  className="mb-6 pb-3 border-b border-transparent invisible pointer-events-none select-none"
                  aria-hidden="true"
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full" />
                    <span className="text-base sm:text-lg font-serif font-bold leading-normal">
                      {selectedModule === "all"
                        ? "特刊全部精彩内容"
                        : selectedModule === "architecture"
                          ? "架构殿堂 专栏文章"
                          : selectedModule === "ai_sky"
                            ? "AI 天空 专栏文章"
                            : "技术茶馆 专栏文章"}
                    </span>
                    <span className="text-xs">({filteredArticles.length} 篇)</span>
                  </div>
                </div>
                <TocNavbar
                  selectedModule={selectedModule}
                  onSelectModule={setSelectedModule}
                  articles={articles}
                  layout="vertical"
                />
              </div>
              <PastIssueLinksSidebar links={pastLinks} className="mt-10 flex-shrink-0" />
            </aside>

            <PastIssueLinksSidebar
              links={pastLinks}
              className="w-full md:hidden order-3"
            />

            <div className="flex-1 min-w-0 order-1 md:order-2 w-full">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-[#d8dbd7]">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4e5d53] animate-pulse" />
                  <h2 className="text-base sm:text-lg font-serif font-bold text-[#222524]">
                    {selectedModule === "all"
                      ? "特刊全部精彩内容"
                      : selectedModule === "architecture"
                        ? "架构殿堂 专栏文章"
                        : selectedModule === "ai_sky"
                          ? "AI 天空 专栏文章"
                          : "技术茶馆 专栏文章"}
                  </h2>
                  <span className="text-xs text-[#6e7370]">({filteredArticles.length} 篇)</span>
                </div>
              </div>

              {filteredArticles.length === 0 ? (
                <div className="text-center py-20 bg-white border border-[#d8dbd7] rounded-2xl space-y-3 shadow-xs">
                  <SearchX className="w-10 h-10 text-stone-400 mx-auto" />
                  <h3 className="font-serif font-bold text-[#222524] text-base">
                    {articles.length === 0 ? "7月刊内容筹备中" : "未找到符合条件的文章"}
                  </h3>
                  <p className="text-xs text-[#6e7370]">
                    {articles.length === 0
                      ? "请在 src/issues/vol-07/ 添加文章与正文后刷新预览。"
                      : "请尝试选择其他模块。"}
                  </p>
                  {articles.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedModule("all")}
                      className="mt-2 px-4 py-2 bg-[#4e5d53] text-white font-bold text-xs rounded-xl hover:bg-[#3d4b42] transition shadow-xs"
                    >
                      重置目录筛选
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredArticles.map((article) =>
                    React.createElement(EcoArticleCard, {
                      key: article.id,
                      article,
                      onReadArticle: setActiveArticle,
                    })
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <footer className="bg-[#e8e7e3] border-t border-[#d8dbd7] p-3">
        <div className="max-w-[90rem] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-[#6e7370]">
          <div className="flex items-center space-x-2 text-[#4e5d53] font-serif font-bold">
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            <span>
              《{meta.brandName}》· {meta.publishMonth}
            </span>
          </div>
          <p>版面设计：用户体验部</p>
        </div>
      </footer>

      {activeArticle && (
        <ArticleReaderView
          article={activeArticle}
          onBack={() => setActiveArticle(null)}
        />
      )}
      </>
      )}
    </div>
  );
}
