import React, { useState, useEffect, useMemo } from "react";
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  X, 
  ChevronRight, 
  Moon, 
  Bookmark, 
  PenTool, 
  Calendar, 
  Clock, 
  Heart, 
  RefreshCw, 
  Eye,
  BookMarked,
  Sun
} from "lucide-react";
import { Article, ModuleName } from "./types";
import { initialArticles } from "./data";
import ArticleCoverImage from "./components/ArticleCoverImage";

function LobsterWatermark({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 120" 
      className={className}
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {/* Antennae */}
      <path d="M47,40 Q38,12 20,8" />
      <path d="M53,40 Q62,12 80,8" />
      <path d="M48,38 Q42,22 30,18" />
      <path d="M52,38 Q58,22 70,18" />

      {/* Body/Carapace */}
      <path d="M50,38 C56,38 59,44 59,54 C59,64 56,74 50,78 C44,78 41,64 41,54 C41,44 44,38 50,38 Z" />
      
      {/* Head Details/Eyes */}
      <circle cx="46" cy="42" r="1" fill="currentColor" />
      <circle cx="54" cy="42" r="1" fill="currentColor" />
      <path d="M50,33 L50,38" />
      
      {/* Claws */}
      {/* Left Claw */}
      <path d="M41,48 Q22,46 22,34" />
      <path d="M22,34 C18,34 12,26 14,18 C16,9 23,7 28,15 C31,20 28,28 22,34 Z" />
      <path d="M14,18 C15,23 21,22 22,34" />
      
      {/* Right Claw */}
      <path d="M59,48 Q78,46 78,34" />
      <path d="M78,34 C82,34 88,26 86,18 C84,9 77,7 72,15 C69,20 72,28 78,34 Z" />
      <path d="M86,18 C85,23 79,22 78,34" />

      {/* Tail Segments */}
      <path d="M43,78 L57,78 L55,83 L45,83 Z" />
      <path d="M44,83 L56,83 L54,88 L46,88 Z" />
      <path d="M45,88 L55,88 L53,93 L47,93 Z" />
      <path d="M46,93 L54,93 L52,98 L48,98 Z" />
      
      {/* Tail Fan */}
      <path d="M50,98 L42,108 C45,110 50,111 50,111 C50,111 55,110 58,108 Z" />
      <path d="M47,98 L38,105 C41,107 44,108 44,108 Z" />
      <path d="M53,98 L62,105 C59,107 56,108 56,108 Z" />

      {/* Walking Legs */}
      {/* Left Legs */}
      <path d="M41,54 Q28,57 24,64" />
      <path d="M41,60 Q28,64 26,71" />
      <path d="M41,66 Q28,71 28,79" />
      
      {/* Right Legs */}
      <path d="M59,54 Q72,57 76,64" />
      <path d="M59,60 Q72,64 74,71" />
      <path d="M59,66 Q72,71 72,79" />
    </svg>
  );
}

const pastIssueLinks = [
  {
    title: "BIP 技术与架构 (5月刊)",
    desc: "5月刊 · 智启新程",
    url: "https://design.yonyoucloud.com/static/techzine-index.html",
  },
] as { title: string; desc: string; url: string; tag?: string }[];

function PastIssueLinksSection({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <h3 className="text-xs uppercase tracking-[0.2em] font-black text-[#D9432E] mb-4 flex items-center gap-2">
        <SolidLobsterIcon className="w-3.5 h-3.5 text-[#D9432E] flex-shrink-0" />
        往期友情链接
      </h3>
      <ul className="space-y-3">
        {pastIssueLinks.map((link, idx) => (
          <li key={idx} className="group">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2.5 border-2 border-transparent bg-[#FDFCF8]/90 hover:bg-[#D9432E]/5 hover:border-[#1A1A1A] transition-all cursor-pointer shadow-[2px_2px_0px_rgba(26,26,26,0.05)] hover:shadow-[3px_3px_0px_rgba(217,67,46,1)]"
            >
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs font-black text-[#1A1A1A] group-hover:text-[#D9432E] transition-all line-clamp-1 font-sans">
                  {link.title}
                </span>
                {link.tag && (
                  <span className="text-[7px] font-mono font-black border border-[#D9432E] text-[#D9432E] bg-white px-1 py-0.5 leading-none scale-90 origin-right flex-shrink-0">
                    {link.tag}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 font-mono leading-none">
                <span className="line-clamp-1">{link.desc}</span>
                <ChevronRight size={10} className="text-[#D9432E]/75 group-hover:text-[#D9432E] transition-all transform group-hover:translate-x-0.5" />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SolidLobsterIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className}
      fill="currentColor"
    >
      {/* Solid filled lobster icon */}
      {/* Antennae */}
      <path d="M11 6.5C10 4.5 8 3.5 6 3.5C5.5 3.5 5 3.7 5 4C5 4.3 5.5 4.5 6 4.5C7.5 4.5 9 5.5 10 7C10.5 7.7 11 8.5 11 9.5H12C12 8.5 11.5 7.5 11 6.5Z" />
      <path d="M13 6.5C14 4.5 16 3.5 18 3.5C18.5 3.5 19 3.7 19 4C19 4.3 18.5 4.5 18 4.5C16.5 4.5 15 5.5 14 7C13.5 7.7 13 8.5 13 9.5H12C12 8.5 12.5 7.5 13 6.5Z" />
      
      {/* Left Claw */}
      <path d="M6 8C4.5 8 3 6.5 3 4.5C3 2.5 4.5 2 6.5 3C8 3.8 8.5 5.5 8.5 6.5C8.5 7.2 8 8 6 8Z" />
      <path d="M8 6.8C7.5 7.5 7 8.5 8 9C9 9.5 10 7.8 9.8 7C9.5 6.2 8.8 6 8 6.8Z" />

      {/* Right Claw */}
      <path d="M18 8C19.5 8 21 6.5 21 4.5C21 2.5 19.5 2 17.5 3C16 3.8 15.5 5.5 15.5 6.5C15.5 7.2 16 8 18 8Z" />
      <path d="M16 6.8C16.5 7.5 17 8.5 16 9C15 9.5 14 7.8 14.2 7C14.5 6.2 15.2 6 16 6.8Z" />

      {/* Main Body (carapace) */}
      <path d="M12 9C9.8 9 9.8 11.5 9.8 14C9.8 16.5 10.3 17 12 17.5C13.7 17 14.2 16.5 14.2 14C14.2 11.5 14.2 9 12 9Z" />

      {/* Tail segments */}
      <path d="M10.5 17.6H13.5L13.2 19H10.8L10.5 17.6Z" />
      <path d="M10.8 19H13.2L12.9 20.2H11.1L10.8 19Z" />
      <path d="M11.1 20.2H12.9L13.2 21.5L12 22.5L10.8 21.5L11.1 20.2Z" />

      {/* Simple Walking Legs */}
      <path d="M9.8 11.5C8.5 11.5 7.8 12.5 7.3 13.5C7.1 13.9 7.5 14.1 7.8 13.7C8.3 13 8.8 12.5 9.8 12.5V11.5Z" />
      <path d="M9.8 13C8.3 13.3 7.6 14.5 7.1 15.5C6.9 15.9 7.3 16.1 7.6 15.7C8.1 14.8 8.6 14 9.8 14V13Z" />
      <path d="M9.8 14.5C8.3 15 7.6 16.5 7.1 17.5C6.9 17.9 7.3 18.1 7.6 17.7C8.1 16.6 8.6 15.5 9.8 15.5V14.5Z" />

      <path d="M14.2 11.5C15.5 11.5 16.2 12.5 16.7 13.5C16.9 13.9 16.5 14.1 16.2 13.7C15.7 13 15.2 12.5 14.2 12.5V11.5Z" />
      <path d="M14.2 13C15.7 13.3 16.4 14.5 16.9 15.5C17.1 15.9 16.7 16.1 16.4 15.7C15.9 14.8 15.4 14 14.2 14V13Z" />
      <path d="M14.2 14.5C15.7 15 16.4 16.5 16.9 17.5C17.1 17.9 16.7 18.1 16.4 17.7C15.9 16.6 15.4 15.5 14.2 15.5V14.5Z" />
    </svg>
  );
}

export default function App() {
  // Articles state with localStorage persistence
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem("lobster_magazine_articles_v2");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved articles", e);
      }
    }
    return initialArticles;
  });

  useEffect(() => {
    localStorage.setItem("lobster_magazine_articles_v2", JSON.stringify(articles));
  }, [articles]);

  // Current interface states
  const [currentModule, setCurrentModule] = useState<ModuleName | "全部">("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const [isCoverPage, setIsCoverPage] = useState(true); // WeChat starts with an elegant cover splash

  // Reader configuration states
  const [readerFontSize, setReaderFontSize] = useState<"sm" | "base" | "lg" | "xl">("base");
  const [readerTheme, setReaderTheme] = useState<"parchment" | "abyss">("parchment");

  // Interaction likes and bookmarks states with local storage
  const [likedArticles, setLikedArticles] = useState<string[]>(() => {
    const saved = localStorage.getItem("lobster_magazine_likes");
    return saved ? JSON.parse(saved) : [];
  });
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>(() => {
    const saved = localStorage.getItem("lobster_magazine_bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("lobster_magazine_likes", JSON.stringify(likedArticles));
  }, [likedArticles]);

  useEffect(() => {
    localStorage.setItem("lobster_magazine_bookmarks", JSON.stringify(bookmarkedArticles));
  }, [bookmarkedArticles]);

  // Form states for adding new articles
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newModule, setNewModule] = useState<ModuleName>("架构殿堂");
  const [newIntro, setNewIntro] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [readerContent, setReaderContent] = useState("");
  const [readerContentLoading, setReaderContentLoading] = useState(false);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  useEffect(() => {
    if (!activeArticle) {
      setReaderContent("");
      setReaderContentLoading(false);
      return;
    }

    if (!activeArticle.sourceUrl) {
      setReaderContent(activeArticle.content);
      setReaderContentLoading(false);
      return;
    }

    let cancelled = false;
    setReaderContentLoading(true);
    setReaderContent("");

    fetch("/api/fetch-article-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: activeArticle.sourceUrl }),
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Failed to load article content");
        return response.json() as Promise<{ content?: string }>;
      })
      .then((data) => {
        if (!cancelled) {
          setReaderContent(data.content || "<p>暂无正文内容。</p>");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setReaderContent("<p>正文加载失败，请稍后重试。</p>");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setReaderContentLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [activeArticle]);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchModule = currentModule === "全部" || article.module === currentModule;
      const matchSearch = 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.intro.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchModule && matchSearch;
    });
  }, [articles, currentModule, searchQuery]);

  // Module counts
  const moduleCounts = useMemo(() => {
    return {
      "全部": articles.length,
      "架构殿堂": articles.filter(a => a.module === "架构殿堂").length,
      "AI天空": articles.filter(a => a.module === "AI天空").length,
      "技术茶馆": articles.filter(a => a.module === "技术茶馆").length
    };
  }, [articles]);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedArticles(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedArticles(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Submit dynamic article draft
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newCategory || !newIntro || !newContent) {
      alert("请完整填写所有稿件字段。");
      return;
    }
    
    setIsSubmitting(true);
    const newId = `custom-${Date.now()}`;
    const draft: Article = {
      id: newId,
      title: `《${newTitle.replace(/《|》/g, "")}》`,
      category: newCategory,
      module: newModule,
      intro: newIntro,
      content: newContent.split("\n\n").map(para => `<p>${para}</p>`).join("\n"),
      date: new Date().toISOString().split("T")[0],
      readTime: `${Math.max(3, Math.ceil(newContent.length / 400))} 分钟`,
    };

    setArticles(prev => [draft, ...prev]);
    setIsSubmitting(false);
    setShowAuthorModal(false);
    
    // Reset fields
    setNewTitle("");
    setNewCategory("");
    setNewIntro("");
    setNewContent("");

    // Scroll down to view the newly created article
    setTimeout(() => {
      const element = document.getElementById("catalog-anchor");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  // Reset default catalog data
  const handleResetCatalog = () => {
    if (confirm("是否恢复出厂设置？这将重置内置文章和您的自定义稿件。")) {
      setArticles(initialArticles);
      setLikedArticles([]);
      setBookmarkedArticles([]);
      localStorage.removeItem("lobster_magazine_articles_v2");
      localStorage.removeItem("lobster_magazine_likes");
      localStorage.removeItem("lobster_magazine_bookmarks");
    }
  };

  return (
    <div id="lobster-app-wrapper" className="min-h-screen bg-[#FDFCF8] text-[#1A1A1A] font-sans antialiased pb-4">
      
      {/* 1. WeChat Splash elegant cover view */}
      {isCoverPage ? (
        <div className="relative min-h-screen w-full flex flex-col justify-center p-8 overflow-hidden md:p-16 bg-[#FDFCF8] border-12 border-[#D9432E]">
          {/* Subtle line motif background */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,#D9432E_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

          {/* Large Elegant Lobster Watermark Background (龙虾暗纹) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] z-0">
            <LobsterWatermark className="w-[45vw] h-[45vw] min-w-[320px] min-h-[320px] max-w-[600px] max-h-[600px] text-[#D9432E]" />
          </div>

          {/* Central graphic elements representing the heavy-claw Lobster design */}
          <div className="my-auto text-center flex flex-col items-center z-10 max-w-2xl mx-auto py-12">
            {/* Display Big Bold Typography Headers */}
            <h1 className="font-sans text-4xl sm:text-6xl font-black tracking-tight text-[#1A1A1A] mb-4 leading-tight">
              BIP 技术与架构 (6月刊)
            </h1>
            
            <p className="font-serif text-[#D9432E] text-xs sm:text-sm tracking-[0.1em] font-extrabold mb-6">
              主编：BIP 技术与产品中心 · 总体设计部
            </p>
            
            <div className="h-2 w-32 bg-[#D9432E] my-3"></div>
            
            {/* Issue Description */}
            <p className="text-sm text-[#1A1A1A]/80 font-sans tracking-wide leading-relaxed max-w-lg mt-4 px-4 font-medium">
              “融合高负载系统架构、AI智能天空与技术生活茶馆之美。在这里，技术广度与极客深度如摩天架构筑基般历久弥新。”
            </p>
          </div>

          {/* Action Trigger Button and WeChat metadata info */}
          <div className="flex flex-col items-center gap-6 z-10 mb-8">
            <button
              onClick={() => setIsCoverPage(false)}
              className="group relative px-10 py-4 bg-[#D9432E] text-white border-2 border-[#1A1A1A] font-bold tracking-widest text-xs hover:bg-[#1A1A1A] hover:text-[#FDFCF8] transition-all duration-300 hover:scale-105 active:scale-95 shadow-[4px_4px_0px_rgba(26,26,26,1)] cursor-pointer"
            >
              <span className="flex items-center gap-3">
                翻开技术首卷 ENTER MAGAZINE <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      ) : (
        /* 2. Main interface - Multi-view Catalog navigation with Bold Typography theme */
        <div className="relative max-w-6xl mx-auto px-4 pt-2 pb-4 md:px-12 md:pt-4 overflow-hidden">
          {/* Subtle line motif background */}
          <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(circle,#D9432E_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>

          {/* Elegant Floating Lobster Watermark Background for Catalog Page (龙虾暗纹) */}
          <div className="absolute -right-16 -bottom-16 pointer-events-none opacity-[0.025] z-0">
            <LobsterWatermark className="w-[32vw] h-[32vw] min-w-[220px] min-h-[220px] max-w-[420px] max-h-[420px] text-[#D9432E]" />
          </div>
          <div className="absolute -left-20 bottom-[12%] pointer-events-none opacity-[0.015] z-0">
            <LobsterWatermark className="w-[25vw] h-[25vw] min-w-[180px] min-h-[180px] max-w-[320px] max-h-[320px] text-[#D9432E]" />
          </div>
          
          {/* Header Navigation strictly matching the user constraints and Bold Typography theme */}
          <header className="relative flex flex-col md:flex-row justify-between items-center py-4 border-b-2 border-[#D9432E] mb-8 gap-4 bg-[#FDFCF8]/90 backdrop-blur-sm w-full z-10">
            <div className="flex flex-col items-center md:items-start gap-1 cursor-pointer" onClick={() => setIsCoverPage(true)}>
              <span className="text-3xl md:text-4xl font-black tracking-tight text-[#D9432E] hover:opacity-90">
                BIP 技术与架构 (6月刊)
              </span>
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-40 ml-0 md:ml-2">BIP Technology & Architecture Journal</span>
            </div>
            
            <div className="text-center md:text-right">
              <span className="text-xs font-bold text-[#1A1A1A] bg-[#D9432E]/5 border-2 border-[#1A1A1A] px-4 py-2 block italic shadow-[2px_2px_0px_rgba(26,26,26,1)]">
                主编：BIP 技术与产品中心 · 总体设计部
              </span>
            </div>
          </header>

          <main className="relative flex flex-col lg:flex-row gap-8 z-10">
            
            {/* Sidebar with Table of Contents */}
            <aside className="w-full lg:w-1/4 lg:border-r border-[#D9432E]/20 pr-0 lg:pr-8 py-2 flex flex-col justify-between gap-8">
              <div>
                <h2 className="text-xs uppercase tracking-[0.3em] font-black text-[#D9432E] mb-6 flex items-center gap-2">
                  <SolidLobsterIcon className="w-4 h-4 text-[#D9432E] flex-shrink-0" />
                  Contents 目录
                </h2>
                
                <ul className="flex lg:flex-col overflow-x-auto gap-3 lg:gap-0 lg:space-y-4 pb-3 lg:pb-0 scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {(["全部", "架构殿堂", "AI天空", "技术茶馆"] as const).map((module, idx) => (
                    <li 
                      key={module}
                      onClick={() => setCurrentModule(module)}
                      className={`group cursor-pointer p-3 border-l-4 transition-all shrink-0 lg:shrink whitespace-nowrap lg:whitespace-normal min-w-[130px] lg:min-w-0 ${
                        currentModule === module 
                          ? "border-[#D9432E] bg-[#D9432E]/5" 
                          : "border-transparent hover:border-[#1A1A1A] hover:bg-slate-50"
                      }`}
                    >
                      <span className="block text-[10px] text-[#D9432E] font-bold opacity-70">
                        {idx === 0 ? "ALL ARCHIVES" : `MODULE 0${idx}`}
                      </span>
                      <div className="flex justify-between items-center gap-3">
                        <span className="text-sm lg:text-lg font-bold text-[#1A1A1A]">{module}</span>
                        <span className="text-[10px] lg:text-xs font-mono font-bold px-1.5 py-0.5 bg-[#1A1A1A] text-white rounded">
                          {moduleCounts[module]}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Previous Issues & Links — desktop sidebar only */}
              <PastIssueLinksSection className="hidden lg:block border-t border-[#D9432E]/20 pt-6 mt-2" />

            </aside>

            {/* Articles Column / Grid */}
            <section id="catalog-anchor" className="flex-1">
              
              {/* Active Category Display Ribbon */}
              <div className="bg-[#1A1A1A] text-white px-4 py-2.5 flex justify-between items-center mb-6">
                <span className="text-xs uppercase tracking-widest font-black flex items-center gap-2">
                  <BookOpen size={14} className="text-[#D9432E]" /> 当前浏览栏目: {currentModule}
                </span>
                <span className="text-[10px] font-mono opacity-80">共有 {filteredArticles.length} 篇相关精选</span>
              </div>

              {filteredArticles.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-[#1A1A1A]/13 p-16 text-center shadow-md">
                  <p className="text-base font-serif text-[#D9432E] font-bold mb-2">未搜查到相关的技术稿件</p>
                  <p className="text-xs text-slate-500">您可以尝试清空顶部搜索框，或者点击侧栏切换不同本期专栏模块。</p>
                </div>
              ) : (
                /* Multi-column grid optimized for wide layout, stacked beautifully in mobile WeChat */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredArticles.map((article) => {
                    const isLiked = likedArticles.includes(article.id);
                    const isBookmarked = bookmarkedArticles.includes(article.id);

                    return (
                      <article
                        key={article.id}
                        onClick={() => setActiveArticle(article)}
                        className="group flex flex-col bg-white border-2 border-[#1A1A1A] hover:border-[#D9432E] transition-all duration-300 cursor-pointer shadow-[4px_4px_0px_rgba(26,26,26,1)] hover:shadow-[6px_6px_0px_rgba(217,67,46,1)]"
                      >
                        {/* Dynamic AI Cover on top of each article card */}
                        <div className="w-full relative aspect-video bg-[#1a1a1a]">
                          <ArticleCoverImage 
                            title={article.title} 
                            category={article.category} 
                            articleId={article.id}
                            coverImage={article.coverImage}
                          />
                          {/* Floating Column Module Label exactly matching the Design HTML */}
                          <div className="absolute bottom-4 left-4 bg-[#D9432E] text-white text-[10px] font-black uppercase px-2 py-1 tracking-wider border border-[#1A1A1A]">
                            {article.module}
                          </div>
                        </div>

                        {/* Article Card Contents */}
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            {/* Metadata tags */}
                            <div className="flex justify-between items-center mb-3 text-[10px] uppercase font-bold text-[#D9432E]">
                              <span>#{article.category}</span>
                              <div className="flex items-center gap-1 opacity-70">
                                <Calendar size={11} />
                                <span>{article.date}</span>
                              </div>
                            </div>

                            {/* Headline */}
                            <h3 className="font-serif font-bold text-xl leading-snug text-[#1A1A1A] group-hover:text-[#D9432E] transition-colors mb-3">
                              {article.title}
                            </h3>

                            {/* Short Excerpt */}
                            <p className="text-xs text-[#1A1A1A]/70 leading-relaxed line-clamp-3 mb-6">
                              {article.intro}
                            </p>
                          </div>

                          {/* Footer and interactive buttons */}
                          <div className="pt-4 border-t border-[#D9432E]/20 mt-auto flex justify-end items-center">
                            {/* Big Bold custom detail click border button exactly matching target design specification */}
                            <span className="px-4 py-2 border-2 border-[#1A1A1A] font-bold text-[10px] uppercase tracking-widest text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white transition-all">
                              View Article • 详情
                            </span>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

            </section>

          </main>

          {/* Previous Issues & Links — mobile/tablet bottom placement */}
          <PastIssueLinksSection className="lg:hidden border-t border-[#D9432E]/20 pt-6 mt-8 mb-2" />

          {/* Footer Bar exactly matching Design HTML */}
          <footer className="mt-8 border-t-2 border-[#D9432E] pt-4 pb-2 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-[11px] font-bold tracking-wide text-[#1A1A1A]/50">
              “在浪潮滚滚技术的海洋里，像深水龙虾一样拥有坚实保护甲壳，与持续进化的热插拔内核。”
            </div>
            <div className="text-[11px] font-black tracking-wider text-[#D9432E]/80 font-sans">
              BIP 技术与架构 (6月刊)
            </div>
          </footer>

        </div>
      )}

      {/* 4. Immersive Full-Screen Reader Panel - beautifully integrated with layout options */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center p-3 md:p-6 transition-all">
          
          <div 
            className={`w-[95%] max-w-[95%] h-[95vh] max-h-[95vh] relative shadow-[8px_8px_0px_rgba(26,26,26,1)] flex flex-col md:rounded-lg overflow-hidden border-4 border-[#1A1A1A] ${
              readerTheme === "parchment" 
                ? "bg-[#faf8f5] text-[#241a17]" 
                : "reader-theme-abyss bg-[#140b0c] text-[#fbf6f6]"
            }`}
          >
            
            {/* Control Bar */}
            <div className={`sticky top-0 z-20 flex justify-between items-center p-4 border-b-2 ${
              readerTheme === "parchment" 
                ? "bg-[#faf8f5]/95 border-[#1a1a1a]/10" 
                : "bg-[#140b0c]/95 border-rose-950/80"
            } backdrop-blur-md`}>
              
              <button
                onClick={() => setActiveArticle(null)}
                className="flex items-center gap-2 text-xs font-black uppercase tracking-widest px-4 py-2 bg-[#D9432E] text-[#fff5f5] border-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all cursor-pointer shadow-[2px_2px_0px_rgba(26,26,26,1)]"
              >
                <X size={13} /> 返回目录 CLOSE
              </button>

              {/* Adjustments */}
              <div className="flex items-center gap-3">
                {/* Font control slider indicator */}
                <div className={`flex items-center gap-1 text-xs border-2 border-[#1A1A1A] rounded p-0.5 bg-white text-[#1a1a1a]`}>
                  <button 
                    onClick={() => setReaderFontSize("sm")}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${readerFontSize === "sm" ? "bg-[#D9432E] text-white" : ""}`}
                  >
                    A-
                  </button>
                  <button 
                    onClick={() => setReaderFontSize("base")}
                    className={`px-1.5 py-0.5 rounded text-xs font-bold ${readerFontSize === "base" ? "bg-[#D9432E] text-white" : ""}`}
                  >
                    A
                  </button>
                  <button 
                    onClick={() => setReaderFontSize("lg")}
                    className={`px-1.5 py-0.5 rounded text-sm font-bold ${readerFontSize === "lg" ? "bg-[#D9432E] text-white" : ""}`}
                  >
                    A+
                  </button>
                  <button 
                    onClick={() => setReaderFontSize("xl")}
                    className={`px-1.5 py-0.5 rounded text-base font-bold ${readerFontSize === "xl" ? "bg-[#D9432E] text-white" : ""}`}
                  >
                    A++
                  </button>
                </div>

                {/* Theme selectors */}
                <div className="flex items-center rounded border-2 border-[#1A1A1A] p-0.5 bg-white">
                  <button
                    onClick={() => setReaderTheme("parchment")}
                    className={`p-1.5 rounded flex items-center ${
                      readerTheme === "parchment" ? "bg-[#faf8f5] text-[#D9432E] font-bold" : "text-gray-400"
                    }`}
                    title="Imperial Paper"
                  >
                    <Sun size={13} />
                  </button>
                  <button
                    onClick={() => setReaderTheme("abyss")}
                    className={`p-1.5 rounded flex items-center ${
                      readerTheme === "abyss" ? "bg-rose-950 text-white" : "text-gray-400"
                    }`}
                    title="Deep Abyss"
                  >
                    <Moon size={13} />
                  </button>
                </div>
              </div>

            </div>

            {/* Reading details canvas */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
              
              {/* Dynamic Design Image Cover */}
              <div className="w-full relative overflow-hidden rounded border-2 border-[#1A1A1A] select-none">
                <ArticleCoverImage 
                  title={activeArticle.title} 
                  category={activeArticle.category} 
                  articleId={activeArticle.id}
                  coverImage={activeArticle.coverImage}
                />
              </div>

              {/* Editorial meta block */}
              <div className="space-y-4 pb-6 border-b-2 border-[#D9432E]/20">
                <div className="flex gap-2 items-center">
                  <span className="text-xs uppercase font-extrabold px-3 py-1 bg-[#D9432E] text-white border border-[#1A1A1A]">
                    {activeArticle.module}
                  </span>
                  <span className={`text-xs font-serif px-3 py-1 border border-[#D9432E]/30 ${
                    readerTheme === "parchment"
                      ? "bg-amber-950/5 text-[#D9432E]"
                      : "bg-white/10 text-white"
                  }`}>
                    #{activeArticle.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-serif font-black text-2xl md:text-4xl tracking-tight leading-relaxed">
                  {activeArticle.title}
                </h2>


              </div>

              {/* Rendered HTML article body */}
              <div 
                className={`prose max-w-none leading-loose tracking-wide font-medium ${
                  readerFontSize === "sm" ? "text-sm" :
                  readerFontSize === "base" ? "text-base" :
                  readerFontSize === "lg" ? "text-lg" : "text-xl"
                }`}
              >
                {readerContentLoading ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
                    <RefreshCw size={24} className={`animate-spin ${readerTheme === "abyss" ? "text-white" : "text-[#D9432E]"}`} />
                    <p className={`text-sm font-serif font-bold ${readerTheme === "abyss" ? "text-white" : "text-[#D9432E]"}`}>正在加载正文内容...</p>
                  </div>
                ) : (
                  <div
                    className="space-y-6 xiumi-article-content"
                    dangerouslySetInnerHTML={{ __html: readerContent }}
                  />
                )}
              </div>

              {/* Bottom Spacer */}
              <div className="pt-12 pb-12"></div>

            </div>
          </div>
        </div>
      )}

      {/* 5. Author Manuscript Submission form Modal */}
      {showAuthorModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FDFCF8] border-4 border-[#1A1A1A] w-full max-w-xl overflow-hidden shadow-[8px_8px_0px_rgba(26,26,26,1)] flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="p-5 border-b-2 border-[#1a1a1a] flex justify-between items-center bg-[#D9432E] text-white">
              <div className="flex items-center gap-2">
                <PenTool size={16} />
                <h3 className="font-serif font-black text-sm uppercase tracking-wider">投递新稿件 Manuscript Console</h3>
              </div>
              <button 
                onClick={() => setShowAuthorModal(false)}
                className="p-1 rounded bg-[#1a1a1a] text-white hover:bg-white hover:text-black transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Submission Form Body */}
            <form onSubmit={handlePublish} className="p-6 overflow-y-auto space-y-4 flex-1">
              
              {/* Description notification block */}
              <div className="bg-orange-50 border-2 border-dashed border-[#D9432E]/30 p-4 text-xs text-[#1A1A1A]/90 leading-relaxed font-medium">
                📢 <strong>双向排版联动机制</strong>：当您成功投递高质技术稿件后，龙虾阁 <strong>Gemini 意境智能画师</strong> 会基于您撰写的文章标题，智能汲取其中潜藏的拓扑隐喻，自动生成一张完美的<strong>几何抽象艺术封面</strong>。
              </div>

              {/* Title input */}
              <div>
                <label className="block text-[10px] font-mono font-black text-[#D9432E] uppercase tracking-widest mb-1.5">
                  文章标题 (Title) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="例如: 检索系统的“声呐”触控网络架构"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs p-3 bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold focus:outline-none focus:border-[#D9432E] placeholder-slate-400"
                />
              </div>

              {/* Section Module selection & category tag */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-[10px] font-mono font-black text-[#D9432E] uppercase tracking-widest mb-1.5">
                    所属模块 (Subject Group) *
                  </label>
                  <select
                    value={newModule}
                    onChange={(e) => setNewModule(e.target.value as ModuleName)}
                    className="w-full text-xs p-3 bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold focus:outline-none focus:border-[#D9432E] uppercase font-mono tracking-wider"
                  >
                    <option value="架构殿堂">🏰 架构殿堂 (Architecture)</option>
                    <option value="AI天空">🌌 AI天空 (AI Sky)</option>
                    <option value="技术茶馆">🍵 技术茶馆 (Teahouse)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-black text-[#D9432E] uppercase tracking-widest mb-1.5">
                    分类标签 (Category Label) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如: 轻量检索 / 网络拓扑"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full text-xs p-3 bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold focus:outline-none focus:border-[#D9432E] placeholder-slate-400"
                  />
                </div>

              </div>

              {/* Introduction summary excerpt */}
              <div>
                <label className="block text-[10px] font-mono font-black text-[#D9432E] uppercase tracking-widest mb-1.5">
                  内容摘要简介 (Introduction Summary) *
                </label>
                <textarea
                  required
                  rows={2}
                  maxLength={160}
                  placeholder="简述文章的仿生隐喻和核心观点（限 150 字以内），将在公众号列表卡段默认展示..."
                  value={newIntro}
                  onChange={(e) => setNewIntro(e.target.value)}
                  className="w-full text-xs p-3 bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] font-medium focus:outline-none focus:border-[#D9432E] placeholder-slate-400 resize-none"
                />
              </div>

              {/* Full Article Content */}
              <div>
                <label className="block text-[10px] font-mono font-black text-[#D9432E] uppercase tracking-widest mb-1.5">
                  正文详细内容 (Full Article Context) *
                </label>
                <span className="text-[9px] text-slate-500 block mb-1">提示：使用双空行分段，文章将按段落排版展示。</span>
                <textarea
                  required
                  rows={6}
                  placeholder="输入您撰写的深度研究内容。文章将按双空行分割为独立的中文排气段落。支持完整的宣纸背景和大号中文字体精读..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full text-xs p-3 bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] font-medium focus:outline-none focus:border-[#D9432E] placeholder-slate-400"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAuthorModal(false)}
                  className="px-5 py-2.5 bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold text-xs hover:bg-[#1A1A1A] hover:text-white transition-all uppercase tracking-wider"
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#D9432E] hover:bg-[#1A1A1A] text-white transition-all border-2 border-[#1A1A1A] font-black uppercase text-xs tracking-wider flex items-center gap-1.5 shadow-[3px_3px_0px_rgba(26,26,26,1)] cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles size={13} className="animate-spin" />
                      智定封面并投递中 ...
                    </>
                  ) : (
                    <>
                      <Sparkles size={13} />
                      发表并启用 AI 绘画
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Premium minimal toast notification indicator */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-[#1A1A1A] border-2 border-[#D9432E] text-white px-6 py-3 font-bold text-xs uppercase tracking-widest shadow-[4px_4px_0px_rgba(217,67,46,1)] transition-all flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#D9432E] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
