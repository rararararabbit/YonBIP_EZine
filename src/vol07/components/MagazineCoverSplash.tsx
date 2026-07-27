import { useEffect } from "react";
import { ChevronRight, Layers } from "lucide-react";

interface MagazineCoverSplashProps {
  title: string;
  editor: string;
  tagline: string;
  onOpen: () => void;
}

export function MagazineCoverSplash({
  title,
  editor,
  tagline,
  onOpen,
}: MagazineCoverSplashProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-[#f2f1ed] text-[#222524] border-[10px] border-[#4e5d53]">
      {/* Soft sage dot grid */}
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none bg-[radial-gradient(#4e5d53_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* Warm wash */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(78,93,83,0.08)_0%,transparent_65%)]" />

      {/* Layers watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.06]">
        <Layers className="w-[42vw] h-[42vw] min-w-[280px] min-h-[280px] max-w-[520px] max-h-[520px] text-[#4e5d53]" strokeWidth={1} />
      </div>

      <div className="my-auto text-center flex flex-col items-center z-10 max-w-2xl mx-auto px-6 py-12 -translate-y-4">
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#222524] mb-4 leading-tight">
          {title}
        </h1>

        <p className="font-serif text-[#4e5d53] text-xs sm:text-sm tracking-[0.12em] font-semibold mb-5">
          {editor}
        </p>

        <div className="h-1 w-24 bg-[#4e5d53] rounded-full my-2" />

        <div className="mt-6 text-sm text-[#222524]/80 font-sans tracking-wide leading-relaxed max-w-lg px-2 font-medium space-y-2">
          {tagline
            .replace(/^“|”$/g, "")
            .split(/。/)
            .map((s) => s.trim())
            .filter(Boolean)
            .map((sentence) => (
              <p key={sentence}>{sentence}</p>
            ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 z-10 mb-10 px-6 -translate-y-[152px]">
        <button
          type="button"
          onClick={onOpen}
          className="group relative px-10 py-4 bg-[#4e5d53] text-white rounded-xl font-bold tracking-widest text-xs hover:bg-[#3d4b42] transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-xs border border-[#3d4b42] cursor-pointer"
        >
          <span className="flex items-center gap-3">
            翻开本期特刊
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  );
}
