import { MetadataRoute } from "next";

export const dynamic = "force-static";

// AI / generative-engine crawlers we explicitly welcome so that assistants
// (ChatGPT, Claude, Perplexity, Google AI, Apple) can read and cite the site.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI training
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT live browsing
  "ClaudeBot", // Anthropic training
  "Claude-Web", // Claude live browsing
  "anthropic-ai", // Anthropic
  "PerplexityBot", // Perplexity index
  "Perplexity-User", // Perplexity live browsing
  "Google-Extended", // Google Gemini / AI Overviews
  "Applebot-Extended", // Apple Intelligence
  "CCBot", // Common Crawl (feeds many LLMs)
  "Bytespider", // ByteDance / Doubao
  "Amazonbot", // Amazon
  "Meta-ExternalAgent", // Meta AI
];

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://wb24.biz";

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
