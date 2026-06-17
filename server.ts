import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;

// Initialize GoogleGenAI client lazy-style
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// 1. Helper: Local fallback generator if Gemini is unavailable
function getLocalFallbackDesign(title: string, category: string) {
  let primaryColor = "#ca343a"; // Lobster red
  let secondaryColor = "#ff7e67"; // Soft coral
  let patternType = "grid";
  let shortEnglishConcept = "Deep LobTech";

  // Customize based on category
  if (category.includes("架构殿堂") || title.includes("架构") || title.includes("系统")) {
    primaryColor = "#5a0e13"; // Wine maroon
    secondaryColor = "#e07a5f"; // Clay / copper
    patternType = "grid";
    shortEnglishConcept = "Structural Architecture";
  } else if (category.includes("AI天空") || title.includes("AI") || title.includes("智能")) {
    primaryColor = "#14213d"; // Cyber midnight
    secondaryColor = "#ca343a"; // Vivid lobster red highlight
    patternType = "constellation";
    shortEnglishConcept = "AI Cognitive Systems";
  } else if (category.includes("技术茶馆") || title.includes("生活") || title.includes("茶")) {
    primaryColor = "#8d0801"; // Rich blood red
    secondaryColor = "#f4a261"; // Warm amber/orange
    patternType = "wave";
    shortEnglishConcept = "Philosophical Teahouse";
  }

  return {
    primaryColor,
    secondaryColor,
    patternType,
    accentIntensity: 0.6,
    shortEnglishConcept,
  };
}

// 2. Endpoint: Generate custom SVG image matching the article title and category
app.post("/api/generate-image", async (req, res) => {
  const { title = "无标题文章", category = "其它" } = req.body;

  let design = getLocalFallbackDesign(title, category);

  // Attempt to enrich with Gemini if available
  const ai = getGeminiClient();
  if (ai) {
    try {
      const prompt = `You are a deluxe visual designer editing an elite mobile-friendly tech magazine themed around "Cobalt and Vermilion Lobsters" (龙虾阁). 
Given the article title: "${title}"
Under the category: "${category}"

Design a beautiful, high-end abstract visual composition. Return a JSON object with:
1. "primaryColor": A hex color representing the dominant brand tone (suggest rich lobster reds, luxury carmines, deep sea wine/claret, e.g. #9e1b21, #5c0609)
2. "secondaryColor": A hex color that contrasts or accents elegantly (suggest coral, salmon, warm gold, copper, e.g. #ff7052, #dfa95c)
3. "patternType": Choose exactly one from ["wave", "grid", "constellation", "scale", "radial"]
4. "shortEnglishConcept": A 2-4 word English scientific/philosophical concept abstractly representing the title.

Respond STRICTLY in JSON format following this schema.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              primaryColor: { type: Type.STRING },
              secondaryColor: { type: Type.STRING },
              patternType: { type: Type.STRING },
              shortEnglishConcept: { type: Type.STRING },
            },
            required: ["primaryColor", "secondaryColor", "patternType", "shortEnglishConcept"],
          },
        },
      });

      if (response && response.text) {
        const enriched = JSON.parse(response.text.trim());
        if (enriched.primaryColor && enriched.secondaryColor) {
          design = {
            primaryColor: enriched.primaryColor,
            secondaryColor: enriched.secondaryColor,
            patternType: enriched.patternType || "grid",
            accentIntensity: 0.7,
            shortEnglishConcept: enriched.shortEnglishConcept || "Abstract Digitalism",
          };
        }
      }
    } catch (e) {
      console.warn("Failed to query Gemini for design, falling back to local formulas:", e);
    }
  }

  // Draw the SVG
  const { primaryColor, secondaryColor, patternType, shortEnglishConcept } = design;

  // Generate unique visual paths based on pattern type
  let graphicElements = "";
  
  if (patternType === "wave") {
    // Elegant waves (sine paths)
    for (let i = 0; i < 5; i++) {
      const yOffset = 180 + i * 40;
      const opacity = (0.05 + (i * 0.04)).toFixed(2);
      graphicElements += `
        <path d="M 0,${yOffset} Q 200,${yOffset - 60} 400,${yOffset} T 800,${yOffset}" 
              fill="none" stroke="${secondaryColor}" stroke-width="2.5" opacity="${opacity}" />
      `;
    }
  } else if (patternType === "constellation") {
    // Connected starry mesh nodes
    const nodes = [
      { x: 180, y: 150 }, { x: 300, y: 220 }, { x: 220, y: 350 }, { x: 500, y: 180 },
      { x: 450, y: 380 }, { x: 620, y: 250 }, { x: 380, y: 120 }, { x: 580, y: 400 }
    ];
    // connection lines
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (dist < 200) {
          graphicElements += `<line x1="${nodes[i].x}" y1="${nodes[i].y}" x2="${nodes[j].x}" y2="${nodes[j].y}" 
                                stroke="${secondaryColor}" stroke-dasharray="2,2" stroke-width="1" opacity="0.18" />`;
        }
      }
    }
    // circles
    nodes.forEach(n => {
      graphicElements += `
        <circle cx="${n.x}" cy="${n.y}" r="4" fill="${secondaryColor}" opacity="0.3" />
        <circle cx="${n.x}" cy="${n.y}" r="1.5" fill="#ffffff" />
      `;
    });
  } else if (patternType === "scale") {
    // Stylized lobster carapace shell scales
    for (let row = 0; row < 5; row++) {
      const yRange = 150 + row * 60;
      const xOffset = (row % 2) * 40;
      for (let col = 0; col < 10; col++) {
        const xPos = col * 80 + xOffset;
        graphicElements += `
          <path d="M ${xPos - 30},${yRange} C ${xPos - 15},${yRange - 30} ${xPos + 15},${yRange - 30} ${xPos + 30},${yRange} Z" 
                fill="none" stroke="${secondaryColor}" stroke-width="1.5" opacity="0.12" />
        `;
      }
    }
  } else if (patternType === "radial") {
    // Concentric orbit lines
    for (let r = 80; r < 320; r += 40) {
      graphicElements += `
        <circle cx="400" cy="280" r="${r}" fill="none" stroke="${secondaryColor}" stroke-width="1.2" opacity="0.1" stroke-dasharray="4,4" />
      `;
    }
    graphicElements += `
      <circle cx="400" cy="280" r="40" fill="none" stroke="${secondaryColor}" stroke-width="2" opacity="0.25" />
    `;
  } else {
    // Grid (the standard default)
    for (let x = 50; x < 800; x += 50) {
      graphicElements += `<line x1="${x}" y1="0" x2="${x}" y2="600" stroke="${secondaryColor}" stroke-width="0.5" opacity="0.06" />`;
    }
    for (let y = 50; y < 600; y += 50) {
      graphicElements += `<line x1="0" y1="${y}" x2="800" y2="${y}" stroke="${secondaryColor}" stroke-width="0.5" opacity="0.06" />`;
    }
  }

  // Draw a core ornamental geometric lobster-claw inspired frame element
  const coreOrnament = `
    <!-- Concentric frame ring -->
    <circle cx="400" cy="260" r="95" fill="none" stroke="${secondaryColor}" stroke-width="1" opacity="0.2" />
    <circle cx="400" cy="260" r="90" fill="none" stroke="${secondaryColor}" stroke-width="1" stroke-dasharray="3,3" opacity="0.3" />
    <circle cx="400" cy="260" r="80" fill="${primaryColor}" opacity="0.15" />
    
    <!-- Stylized crustacean crest graphics -->
    <g transform="translate(400, 260)" stroke="${secondaryColor}" stroke-width="2" fill="none" class="ornament">
      <!-- Top crest -->
      <path d="M 0,-60 L 0,-20 M -35,-45 L 35,-45 M -20,-55 L 20,-55" opacity="0.6" stroke-width="1.5"/>
      <!-- Symmetrical antennae curls -->
      <path d="M -5,-25 C -25,-15 -35,-5 -35,15 C -35,30 -25,45 0,45 C 25,45 35,30 35,15 C 35,-5 25,-15 5,-25" opacity="0.5"/>
      <!-- Claw pincers geometry -->
      <path d="M -25,-2 C -45,-30 -20,-50 -10,-40 C -15,-30 -5,-30 -8,-15" fill="${secondaryColor}" opacity="0.8" />
      <path d="M 25,-2 C 45,-30 20,-50 10,-40 C 15,-30 5,-30 8,-15" fill="${secondaryColor}" opacity="0.8" />
      <!-- Center dot -->
      <circle cx="0" cy="15" r="5" fill="${secondaryColor}" stroke="none" />
      <circle cx="0" cy="15" r="12" fill="none" stroke="${secondaryColor}" stroke-width="1" opacity="0.4" />
    </g>
  `;

  // Dynamic editorial layout SVG
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#140405" />
          <stop offset="50%" stop-color="${primaryColor}" />
          <stop offset="100%" stop-color="#050101" />
        </linearGradient>
        <radialGradient id="glow-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${secondaryColor}" stop-opacity="0.25" />
          <stop offset="100%" stop-color="${primaryColor}" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Background styling -->
      <rect width="800" height="600" fill="url(#bg-grad)" />
      <circle cx="400" cy="270" r="300" fill="url(#glow-grad)" />

      <!-- Sub-grid and decorative tech designs -->
      ${graphicElements}
      
      <!-- Tech crosshair corners -->
      <path d="M 30,30 L 70,30 M 30,30 L 30,70" fill="none" stroke="${secondaryColor}" stroke-width="1.5" opacity="0.3" />
      <path d="M 770,30 L 730,30 M 770,30 L 770,70" fill="none" stroke="${secondaryColor}" stroke-width="1.5" opacity="0.3" />
      <path d="M 30,570 L 70,570 M 30,570 L 30,530" fill="none" stroke="${secondaryColor}" stroke-width="1.5" opacity="0.3" />
      <path d="M 770,570 L 730,570 M 770,570 L 770,530" fill="none" stroke="${secondaryColor}" stroke-width="1.5" opacity="0.3" />

      <!-- Technical border numbers -->
      <text x="40" y="50" font-family="'Courier New', monospace" font-size="10" fill="${secondaryColor}" opacity="0.4" letter-spacing="1">LAT 24.8° N / LON 118.6° E</text>
      <text x="760" y="50" font-family="'Courier New', monospace" font-size="10" fill="${secondaryColor}" opacity="0.4" text-anchor="end" letter-spacing="1">LOB-TECH VER. 4.2</text>
      <text x="40" y="560" font-family="'Courier New', monospace" font-size="10" fill="${secondaryColor}" opacity="0.4" letter-spacing="1">ISSN 2096-7330</text>
      <text x="760" y="560" font-family="'Courier New', monospace" font-size="10" fill="${secondaryColor}" opacity="0.4" text-anchor="end" letter-spacing="1">COPYRIGHT © LOBSTER JOURNAL</text>

      <!-- Circular Central Ornament -->
      ${coreOrnament}

      <!-- Editorial Typography Headers -->
      <g transform="translate(400, 430)" text-anchor="middle">
        <!-- English Tech Concept label -->
        <text y="0" font-family="'Georgia', serif" font-size="13" font-style="italic" fill="${secondaryColor}" letter-spacing="3" opacity="0.95">${shortEnglishConcept.toUpperCase()}</text>
        
        <!-- Category Badge Border -->
        <rect x="-60" y="15" width="120" height="24" rx="12" fill="none" stroke="${secondaryColor}" stroke-width="1" opacity="0.4" />
        <text y="31" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="10" fill="${secondaryColor}" letter-spacing="2">${category.toUpperCase()}</text>
        
        <!-- Magazine Line Indicator -->
        <line x1="-150" y1="65" x2="150" y2="65" stroke="${secondaryColor}" stroke-width="1" opacity="0.25" />
        
        <!-- Bottom branding -->
        <text y="90" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="16" fill="#ffffff" letter-spacing="8" opacity="0.9">龙 虾 阁 . 技 术 简 报</text>
        <text y="112" font-family="'Courier New', monospace" font-size="10" fill="${secondaryColor}" letter-spacing="1" opacity="0.6">DIGITAL MONTHLY / ARCHIVE VOL. 04</text>
      </g>
    </svg>
  `;

  // Return Base64 data string
  const base64Data = Buffer.from(svg).toString("base64");
  const dataUri = `data:image/svg+xml;base64,${base64Data}`;

  return res.json({ imageUrl: dataUri });
});

function collectRaHtmlBlocks(obj: unknown, out: string[] = []): string[] {
  if (!obj || typeof obj !== "object") return out;
  if (Array.isArray(obj)) {
    for (const item of obj) collectRaHtmlBlocks(item, out);
    return out;
  }
  const record = obj as Record<string, unknown>;
  if (typeof record._$raHTML === "string" && record._$raHTML.trim()) {
    out.push(record._$raHTML);
  }
  for (const value of Object.values(record)) {
    collectRaHtmlBlocks(value, out);
  }
  return out;
}

function extractCellTextFromRaHtml(html: string): string {
  const parts: string[] = [];
  const regex = /class="tn-cell tn-cell-text[^"]*"[^>]*>([\s\S]*?)<\/div>/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    parts.push(match[1]);
  }
  return parts.join("");
}

function normalizeArticleHtml(html: string): string {
  return html
    .replace(/src="\/\//g, 'src="https://')
    .replace(/href="\/\//g, 'href="https://');
}

async function fetchXiumiArticleHtml(sourceUrl: string): Promise<string> {
  const pageRes = await fetch(sourceUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Accept-Encoding": "gzip",
    },
  });
  if (!pageRes.ok) {
    throw new Error(`Failed to fetch article page: ${pageRes.status}`);
  }

  const pageHtml = await pageRes.text();
  const showInfoMatch = pageHtml.match(
    /injectedData\.showInfo\s*=\s*JSON\.parse\(decodeURIComponent\("([^"]+)"\)\)/
  );
  if (!showInfoMatch) {
    throw new Error("Cannot parse xiumius showInfo");
  }

  const showInfo = JSON.parse(decodeURIComponent(showInfoMatch[1])) as {
    show_data_url?: string;
  };
  let showDataUrl = showInfo.show_data_url ?? "";
  if (showDataUrl.startsWith("//")) {
    showDataUrl = `https:${showDataUrl}`;
  }
  if (!showDataUrl) {
    throw new Error("Missing xiumius show_data_url");
  }

  const jsonRes = await fetch(showDataUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Accept-Encoding": "gzip",
    },
  });
  if (!jsonRes.ok) {
    throw new Error(`Failed to fetch article data: ${jsonRes.status}`);
  }

  const data = await jsonRes.json();
  const raHtmlBlocks = collectRaHtmlBlocks(data);
  if (raHtmlBlocks.length === 0) {
    throw new Error("No article content found");
  }

  const largestBlock = raHtmlBlocks.sort((a, b) => b.length - a.length)[0];
  const content = extractCellTextFromRaHtml(largestBlock) || largestBlock;
  return normalizeArticleHtml(content);
}

app.post("/api/fetch-article-content", async (req, res) => {
  const { url } = req.body as { url?: string };
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Missing url" });
  }

  try {
    const content = await fetchXiumiArticleHtml(url);
    return res.json({ content });
  } catch (error) {
    console.error("Failed to fetch article content:", error);
    return res.status(500).json({ error: "Failed to fetch article content" });
  }
});

// 3. Mount Vite middleware in development (Express passes static rendering to dist in production)
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server starting on http://0.0.0.0:${PORT}`);
  });
}

startServer();
