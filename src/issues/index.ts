import type { Issue, PastIssueLink } from "../types";
import { vol06Issue } from "./vol-06/issue";
import { vol07Issue } from "./vol-07/issue";

/** Default landing issue (edit this when starting a new month). */
export const CURRENT_ISSUE_ID = "vol-07";

const ISSUES: Record<string, Issue> = {
  [vol06Issue.id]: vol06Issue,
  [vol07Issue.id]: vol07Issue,
};

export function getIssueById(id: string | null | undefined): Issue {
  if (id && ISSUES[id]) return ISSUES[id];
  return ISSUES[CURRENT_ISSUE_ID];
}

export function resolveIssueFromLocation(
  search = typeof window !== "undefined" ? window.location.search : ""
): Issue {
  const params = new URLSearchParams(search);
  return getIssueById(params.get("issue"));
}

export function issueStorageKey(issueId: string, kind: "articles" | "likes" | "bookmarks"): string {
  return `lobster_magazine_${kind}_v4_${issueId}`;
}

/** Archive / external past issues shown in 往期友情链接 */
export function getPastIssueLinks(currentIssueId: string): PastIssueLink[] {
  const base = import.meta.env.BASE_URL || "/";
  const links: PastIssueLink[] = [];

  if (currentIssueId !== vol06Issue.id) {
    links.push({
      title: "BIP 技术与架构 (6月刊)",
      desc: "6月刊 · 架构殿堂 / AI天空 / 技术茶馆",
      url: `${base}?issue=${vol06Issue.id}`,
    });
  }

  links.push({
    title: "BIP 技术与架构 (5月刊)",
    desc: "5月刊 · 智启新程",
    url: "https://design.yonyoucloud.com/static/techzine-index.html",
  });

  return links;
}

export { vol06Issue, vol07Issue };
