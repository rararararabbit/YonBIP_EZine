import { vol06Articles } from "./articles";
import type { Issue } from "../../types";

/** Fixed archive: BIP 技术与架构 · 6月刊 (2026-06) */
export const vol06Issue: Issue = {
  id: "vol-06",
  label: "6月刊",
  title: "BIP 技术与架构 (6月刊)",
  subtitle: "BIP Technology & Architecture Journal",
  editor: "主编：BIP 技术与产品中心 · 总体设计部",
  tagline:
    "“融合高负载系统架构、AI智能天空与技术生活茶馆之美。在这里，技术广度与极客深度如摩天架构筑基般历久弥新。”",
  theme: "classic",
  articles: vol06Articles,
};
