import { vol07Articles } from "./articles";
import type { Issue } from "../../types";

/**
 * Current working issue: BIP 技术与架构 · 7月刊
 * UI theme follows 《生态纪》微信电子杂志 (sage / warm-gray magazine style).
 */
export const vol07Issue: Issue = {
  id: "vol-07",
  label: "7月刊",
  title: "BIP 技术与架构 (7月刊)",
  subtitle: "从平台工程到开放生态的技术图谱",
  editor: "主编：BIP 技术与产品中心 · 总体设计部",
  tagline:
    "从单体系统到万物互联的架构图谱。真正的平台不是掌控一切的帝国，而是滋养万物生长的热带雨林。本期将带您探寻 YonBIP 平台工程、AI 协作与技术人文的深层律动。",
  theme: "ecosystem",
  ecoMeta: {
    brandName: "BIP 技术与架构",
    volNumber: "七月刊",
    themeTitle: "平台·生态",
    themeSubtitle: "从单体系统到万物互联的架构图谱",
    publishMonth: "2026年7月刊",
    editorialQuote:
      "真正的平台不是掌控一切的帝国，而是滋养万物生长的热带雨林。从基础设施的云原生重构，到大模型时代的模型生态协作，本期将带您探寻技术平台与业务生态的深层律动。",
    coverImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
  },
  articles: vol07Articles,
};
