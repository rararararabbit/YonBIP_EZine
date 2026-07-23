import { Layers, PenTool } from "lucide-react";
import type { EcoMagazineMeta, EcoModuleId } from "../ecoTypes";

interface HeaderProps {
  meta: EcoMagazineMeta;
  onSelectModule: (module: EcoModuleId) => void;
  /** Click brand to return to cover splash (like June issue). */
  onBrandClick?: () => void;
}

export function Header({ meta, onSelectModule, onBrandClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#f2f1ed]/95 backdrop-blur-md text-[#222524] border-b border-[#d8dbd7] shadow-xs">
      <div className="max-w-[90rem] mx-auto px-3 sm:px-4 lg:px-6 h-16 flex items-center justify-between gap-3">
        <div
          className="flex items-center gap-3 cursor-pointer min-w-0"
          onClick={() => {
            if (onBrandClick) onBrandClick();
            else onSelectModule("all");
          }}
        >
          <div className="w-10 h-10 rounded-lg bg-[#4e5d53] flex items-center justify-center shadow-xs border border-[#3d4b42] flex-shrink-0">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-start gap-2 min-w-0">
            <span className="font-serif font-bold text-lg leading-7 tracking-wider text-[#4e5d53] truncate">
              {meta.brandName}
            </span>
            <span
              className="text-[10px] leading-none tracking-widest px-1.5 py-0.5 rounded bg-[#e6e9e7] text-[#4e5d53] border border-[#c4cdc7] font-bold flex-shrink-0"
              style={{ marginTop: "8px" }}
            >
              {meta.volNumber}
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs text-[#5a5e5c] min-w-0 max-w-xs">
          <PenTool className="w-3.5 h-3.5 text-[#4e5d53] flex-shrink-0" />
          <span className="truncate font-medium">{meta.editor}</span>
        </div>
      </div>
    </header>
  );
}
