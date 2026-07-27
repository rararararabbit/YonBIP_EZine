import { Article } from "../../types";
import content01 from "./article-contents/article-01.html?raw";
import content02 from "./article-contents/article-02.html?raw";
import content03 from "./article-contents/article-03.html?raw";
import content04 from "./article-contents/article-04.html?raw";
import content05 from "./article-contents/article-05.html?raw";
import content06 from "./article-contents/article-06.html?raw";
import content07 from "./article-contents/article-07.html?raw";
import content08 from "./article-contents/article-08.html?raw";
import content09 from "./article-contents/article-09.html?raw";
import content10 from "./article-contents/article-10.html?raw";

/** July 2026 issue catalog — from Excel 副本BIP技术与架构（7月刊）文章信息. */
export const vol07Articles: Article[] = [
  {
    id: "article-01",
    title: "BIP技能开发编码规范",
    category: "规范园地",
    module: "架构殿堂",
    date: "2026-07",
    readTime: "5 分钟",
    intro:
      "约定git项目命名与目录结构；脚本用Python3.12+并遵循PEP8，统一经yonbip-skill-utils调接口、输出日志与JSON返回值，规范错误处理、双横线参数、输入强制校验",
    content: content01,
    coverImage:
      "https://c2.yonyoucloud.com/yonbip-ec-link/iuap_file/yonbip-ec-minor/qyic8c7o/6897c191-f4c3-4615-af16-828433ddbd8f/6a5f3ad6c841d90a3ac2ad29.jpg",
    sourceUrl: "https://b.xiumius.cn/board/v5/3x9y0/713556201",
  },
  {
    id: "article-02",
    title: "BIP数据库通用设计原则",
    category: "数据基石",
    module: "架构殿堂",
    date: "2026-07",
    readTime: "6 分钟",
    intro:
      "规范MySQL数据类型、主键、索引、字符集、时区、事务等通用设计原则，全面约束业务表与列默认值",
    content: content02,
    coverImage:
      "https://c2.yonyoucloud.com/yonbip-ec-link/iuap_file/yonbip-ec-minor/qyic8c7o/641ae134-369a-4992-807c-eb35de020132/6a5f3ade954600201583456b.jpg",
    sourceUrl: "https://c.xiumius.cn/board/v5/3x9y0/713674897",
  },
  {
    id: "article-03",
    title: "BIP安全编码的输出管理",
    category: "安全哨所",
    module: "架构殿堂",
    date: "2026-07",
    readTime: "8 分钟",
    intro:
      "安全编码输出管理含4条规则：正确 Content-Type、统一安全响应头、输出校验防泄露、数据最小化返回，附8例",
    content: content03,
    coverImage:
      "https://c2.yonyoucloud.com/yonbip-ec-link/iuap_file/yonbip-ec-minor/qyic8c7o/7892361f-9736-448d-9ce9-88939740d7f8/6a5f3a984bf23d69ab5025f9.jpg",
    sourceUrl: "https://c.xiumius.cn/board/v5/3x9y0/713899152",
  },
  {
    id: "article-04",
    title: "YonBIP后端开发规范",
    category: "研发罗盘",
    module: "架构殿堂",
    date: "2026-07",
    readTime: "12 分钟",
    intro:
      "规定后端开发规范，涵盖代码总体规范、扫描规则、命名风格、常量定义、代码格式、OOP规约、集合处理、并发处理、控制语句及注释等编码要求",
    content: content04,
    coverImage:
      "https://c2.yonyoucloud.com/yonbip-ec-link/iuap_file/yonbip-ec-minor/qyic8c7o/450a3b48-f6c3-4b64-b2ea-4743a2c37901/6a5f3abec4480d3212c6e4e8.jpg",
    sourceUrl: "https://b.xiumius.cn/board/v5/3x9y0/714968826",
  },
  {
    id: "article-05",
    title: "Palantir到底强在哪里？",
    category: "本体解码",
    module: "AI天空",
    date: "2026-07",
    readTime: "10 分钟",
    intro:
      "Palantir是一套企业级AI操作系统，核心是Ontology本体层把数据映射为业务对象，并以FDE工程师驻场模式深度落地，实现数据、决策、执行的闭环",
    content: content05,
    coverImage:
      "https://c2.yonyoucloud.com/yonbip-ec-link/iuap_file/yonbip-ec-minor/qyic8c7o/888734c1-b986-4975-8311-207716630dd8/6a5f3ab69a28cf57817fd2c0.jpg",
    sourceUrl: "https://r.xiumius.cn/board/v5/3x9y0/713444499",
  },
  {
    id: "article-06",
    title: "分享四个skill把ppt做的炉火纯青",
    category: "Skill兵器谱",
    module: "AI天空",
    date: "2026-07",
    readTime: "6 分钟",
    intro:
      "评测四个开源AI PPT Skill，说明其在审美规则、精细控制、可编辑交付和模板复用方面的优势，帮助提升 PPT 生成质量",
    content: content06,
    coverImage:
      "https://c2.yonyoucloud.com/yonbip-ec-link/iuap_file/yonbip-ec-minor/qyic8c7o/54b61763-cb0c-49bf-b9e5-73627222bc98/6a5f3acc18e05025808ecd4a.jpg",
    sourceUrl: "https://b.xiumius.cn/board/v5/3x9y0/714017156",
  },
  {
    id: "article-07",
    title: "Loop-Engineering-实施手册",
    category: "前沿动态",
    module: "AI天空",
    date: "2026-07",
    readTime: "12 分钟",
    intro:
      "把工作从写 prompt 升级为设计可复用闭环系统，让 AI 协作从单次对话迈向自运转",
    content: content07,
    coverImage:
      "https://c2.yonyoucloud.com/yonbip-ec-link/iuap_file/yonbip-ec-minor/qyic8c7o/19a95a6d-acf8-477e-8586-380afe27d82c/6a5f3ab095460020158344c6.jpg",
    sourceUrl: "https://c.xiumius.cn/board/v5/3x9y0/715458732",
  },
  {
    id: "article-08",
    title: "走近应用平台总架王海文",
    category: "架构师访谈",
    module: "技术茶馆",
    date: "2026-07",
    readTime: "5 分钟",
    intro:
      "BIP应用与开发平台总架构师王海文，深耕用友二十余年，主导全球化能力体系建设与GDPR合规架构设计，推动平台走向国际化",
    content: content08,
    coverImage:
      "https://c2.yonyoucloud.com/yonbip-ec-link/iuap_file/yonbip-ec-minor/qyic8c7o/2f78956a-06ca-44f3-ac16-b3c34f46364f/6a5f3ae49a28cf57817fd360.jpg",
    sourceUrl: "https://b.xiumius.cn/board/v5/3x9y0/715126561",
  },
  {
    id: "article-09",
    title: "企业知识运营的新探索",
    category: "品茗论道",
    module: "技术茶馆",
    date: "2026-07",
    readTime: "8 分钟",
    intro:
      '本文以 AI 贯穿企业知识运营全链路（SKILL、KB/KG、AGENT、AI期刊化），构建"知识生成→管控→问答→运营"四环方案，已在企业技术与企业党建场景落地，可推广至各行业',
    content: content09,
    coverImage:
      "https://c2.yonyoucloud.com/yonbip-ec-link/iuap_file/yonbip-ec-minor/qyic8c7o/8ce0fda7-83c9-45a5-98f3-3d10c6e9fa88/6a66b30fabe59010a6d82738.jpg",
    sourceUrl: "https://v.xiumius.cn/board/v5/3x9y0/716689890",
  },
  {
    id: "article-10",
    title: "YonCode—企业级AICoding平台",
    category: "精品课程",
    module: "技术茶馆",
    date: "2026-07",
    readTime: "6 分钟",
    intro:
      'YonCode平台，以"应用场景+IDE/CLI+Harness+能力层+模型层"五层架构为核心，融合Skills/Tools/MCP三大能力与五大专业SubAgent，覆盖需求→架构→开发→部署全流程，输出可控、可复用的企业级AI资产。欢迎回看AI Coding专家郭永峰的分享',
    content: content10,
    coverImage:
      "https://c2.yonyoucloud.com/yonbip-ec-link/iuap_file/yonbip-ec-minor/qyic8c7o/b63f48ae-65aa-4504-9b9d-4d6932ac7ce0/6a5f3ac5a1c7b30d6eb58761.jpg",
    sourceUrl: "https://r.xiumius.cn/board/v5/3x9y0/715200759",
    videoUrl:
      "https://aiqa.yonyoucloud.com/techzine/7.16%E7%A7%80%E4%BA%A7%E5%93%81-%E4%BC%81%E4%B8%9A%E7%BA%A7AICoding%E5%B9%B3%E5%8F%B0-1-YonCode%E4%BB%8B%E7%BB%8D-%E9%83%AD%E6%B0%B8%E5%B3%B0.mp4",
  },
];
