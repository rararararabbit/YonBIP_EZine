import { ChevronRight, BookMarked } from "lucide-react";
import type { PastIssueLink } from "../../types";

interface PastIssueLinksSidebarProps {
  links: PastIssueLink[];
  className?: string;
}

function openInNewTab(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export function PastIssueLinksSidebar({ links, className = "" }: PastIssueLinksSidebarProps) {
  if (links.length === 0) return null;

  return (
    <aside className={className}>
      <h3 className="text-xs uppercase tracking-[0.2em] font-serif font-bold text-[#4e5d53] mb-4 flex items-center gap-2">
        <BookMarked className="w-3.5 h-3.5 flex-shrink-0" />
        往期友情链接
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                openInNewTab(link.url);
              }}
              className="block p-3 rounded-xl bg-white border border-[#d8dbd7] hover:border-[#4e5d53] hover:bg-[#e6e9e7]/60 transition shadow-xs group"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold text-[#222524] group-hover:text-[#4e5d53] leading-snug">
                  {link.title}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-[#4e5d53]/70 flex-shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[10px] text-[#6e7370] mt-1.5 font-mono leading-none">{link.desc}</p>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
