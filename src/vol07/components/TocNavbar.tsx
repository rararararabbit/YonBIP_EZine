import { useMemo } from "react";
import { Layers, Cpu, Coffee, Grid, Compass } from "lucide-react";
import type { EcoArticleView, EcoModuleId } from "../ecoTypes";

interface TocNavbarProps {
  selectedModule: EcoModuleId;
  onSelectModule: (moduleId: EcoModuleId) => void;
  articles: EcoArticleView[];
  /** horizontal: top bar (mobile); vertical: left sidebar (md+) */
  layout?: "horizontal" | "vertical";
  className?: string;
}

export function TocNavbar({
  selectedModule,
  onSelectModule,
  articles,
  layout = "horizontal",
  className = "",
}: TocNavbarProps) {
  const articleCounts = useMemo(
    () => ({
      all: articles.length,
      architecture: articles.filter((a) => a.moduleId === "architecture").length,
      ai_sky: articles.filter((a) => a.moduleId === "ai_sky").length,
      teahouse: articles.filter((a) => a.moduleId === "teahouse").length,
    }),
    [articles]
  );

  const modules = [
    { id: "all" as const, name: "全部目录", icon: Grid, count: articleCounts.all },
    { id: "architecture" as const, name: "架构殿堂", icon: Layers, count: articleCounts.architecture },
    { id: "ai_sky" as const, name: "AI天空", icon: Cpu, count: articleCounts.ai_sky },
    { id: "teahouse" as const, name: "技术茶馆", icon: Coffee, count: articleCounts.teahouse },
  ];

  if (layout === "vertical") {
    return (
      <nav className={className}>
        <div className="flex items-center gap-1.5 mb-3 text-xs font-serif font-bold text-[#4e5d53]">
          <Compass className="w-3.5 h-3.5 flex-shrink-0" />
          目录导航
        </div>
        <div className="flex flex-col gap-2">
          {modules.map((m) => {
            const Icon = m.icon;
            const isActive = selectedModule === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onSelectModule(m.id)}
                className={`flex items-center gap-2 w-full px-3 py-3.5 rounded-lg text-xs font-medium transition text-left ${
                  isActive
                    ? "bg-[#4e5d53] text-white font-semibold shadow-xs"
                    : "bg-white text-[#5a5e5c] hover:bg-[#e4e3df] hover:text-[#222524] border border-[#d1d5d1]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-white" : "text-[#4e5d53]"}`} />
                <span className="flex-1 truncate">{m.name}</span>
                <span
                  className={`px-1.5 rounded-full text-[10px] font-bold flex-shrink-0 ${
                    isActive ? "bg-white/20 text-white" : "bg-[#e4e3df] text-[#5a5e5c]"
                  }`}
                >
                  {m.count}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`sticky top-16 z-30 bg-[#f2f1ed]/95 backdrop-blur-md border-b border-[#d8dbd7] shadow-xs py-3 px-3 sm:px-4 ${className}`}
    >
      <div className="max-w-[90rem] mx-auto">
        <div className="flex items-center overflow-x-auto pb-1 scrollbar-none gap-2">
          <span className="text-xs font-serif font-bold text-[#4e5d53] inline-flex items-center gap-1 mr-2 border-r border-[#d8dbd7] pr-3 shrink-0">
            <Compass className="w-3.5 h-3.5" /> 目录导航
          </span>
          {modules.map((m) => {
            const Icon = m.icon;
            const isActive = selectedModule === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onSelectModule(m.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                  isActive
                    ? "bg-[#4e5d53] text-white font-semibold shadow-xs"
                    : "bg-white text-[#5a5e5c] hover:bg-[#e4e3df] hover:text-[#222524] border border-[#d1d5d1]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-[#4e5d53]"}`} />
                <span>{m.name}</span>
                <span
                  className={`px-1.5 rounded-full text-[10px] font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-[#e4e3df] text-[#5a5e5c]"
                  }`}
                >
                  {m.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
