import { useState, useEffect } from "react";
import { Sparkles, Image as ImageIcon, RotateCw } from "lucide-react";
import { proxyImageUrl } from "../lib/imageProxy";

interface ArticleCoverImageProps {
  title: string;
  category: string;
  articleId: string;
  coverImage?: string;
}

function resolveCoverSrc(url: string): string {
  return proxyImageUrl(url);
}

export default function ArticleCoverImage({
  title,
  category,
  articleId,
  coverImage,
}: ArticleCoverImageProps) {
  const resolvedCover = coverImage ? resolveCoverSrc(coverImage) : null;
  const [imageUrl, setImageUrl] = useState<string | null>(resolvedCover);
  const [loading, setLoading] = useState(!coverImage);
  const [error, setError] = useState(false);

  const fetchCover = async () => {
    if (coverImage) {
      setImageUrl(resolveCoverSrc(coverImage));
      setLoading(false);
      setError(false);
      return;
    }

    setLoading(true);
    setError(false);
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category }),
      });
      if (!response.ok) throw new Error("Generation failed");
      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (err) {
      console.error("Failed to generate cover for", title, err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coverImage) {
      setImageUrl(resolveCoverSrc(coverImage));
      setLoading(false);
      setError(false);
      return;
    }
    fetchCover();
  }, [title, category, articleId, coverImage]);

  if (loading) {
    return (
      <div className="relative w-full aspect-[16/9] bg-[#1A1A1A] flex flex-col items-center justify-center overflow-hidden border-b-2 border-[#1A1A1A]">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D9432E]"></div>
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#D9432E]"></div>
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#D9432E]"></div>
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D9432E]"></div>
        <div className="relative z-10 flex flex-col items-center p-4 text-center">
          <RotateCw size={24} className="animate-spin text-[#D9432E] mb-3 stroke-[2.5]" />
          <p className="text-[10px] text-white font-mono font-bold tracking-widest uppercase mb-1">
            LOBSTER ILLUSTRES
          </p>
          <span className="text-xs text-white/80 font-serif font-semibold">
            正在加载封面...
          </span>
        </div>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className="relative w-full aspect-[16/9] bg-[#FDFCF8] flex flex-col items-center justify-center p-6 text-center border-b-2 border-[#1A1A1A]">
        <ImageIcon size={32} className="text-[#D9432E]/30 mb-3" />
        <p className="text-xs font-serif text-[#1A1A1A] font-black max-w-xs truncate mb-1">{title}</p>
        <span className="text-[9px] text-[#D9432E] font-mono uppercase tracking-widest font-black block mb-3">
          MODULE CATEGORY: {category}
        </span>
        {!coverImage && (
          <button
            onClick={fetchCover}
            className="px-4 py-2 bg-white border-2 border-[#1A1A1A] text-xs font-bold hover:bg-[#D9432E] hover:text-white transition-all tracking-wider flex items-center gap-1.5 mx-auto shadow-[2px_2px_0px_rgba(26,26,26,1)]"
          >
            <Sparkles size={11} /> 重新获取 AI 绘图
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#1A1A1A] border-b-2 border-[#1A1A1A]">
      <img
        src={imageUrl}
        alt={`Cover for ${title}`}
        className="w-full h-full object-cover select-none pointer-events-none hover:scale-105 transition-transform duration-700 ease-out"
        onError={() => setError(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
}
