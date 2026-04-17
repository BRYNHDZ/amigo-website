import type { Handler } from "@netlify/functions";

type SchedulingStatus = {
  weeklySlotsLeft: number | null;
  projectWeek: string;
  lastUpdated: string;
};

type CacheEntry = {
  data: SchedulingStatus;
  expiresAt: number;
};

let cache: CacheEntry | null = null;
const CACHE_TTL_MS = 60_000;

const NOTION_API_URL = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

export const handler: Handler = async () => {
  const token = process.env.NOTION_SCHEDULING_TOKEN;
  const dbId = process.env.NOTION_SCHEDULING_DB_ID;

  if (!token || !dbId) {
    return jsonResponse(502, { error: "unavailable" });
  }

  if (cache && Date.now() < cache.expiresAt) {
    return jsonResponse(200, cache.data);
  }

  try {
    const response = await fetch(`${NOTION_API_URL}/databases/${dbId}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page_size: 1 }),
    });

    if (!response.ok) {
      return jsonResponse(502, { error: "unavailable" });
    }

    const payload = (await response.json()) as NotionQueryResponse;
    const row = payload.results?.[0];
    if (!row) {
      return jsonResponse(502, { error: "unavailable" });
    }

    const data: SchedulingStatus = {
      weeklySlotsLeft:
        row.properties["Weekly Route Slots Left"]?.number ?? null,
      projectWeek:
        row.properties["Project Scheduling Week"]?.title?.[0]?.plain_text ?? "",
      lastUpdated: row.last_edited_time,
    };

    cache = { data, expiresAt: Date.now() + CACHE_TTL_MS };
    return jsonResponse(200, data);
  } catch {
    return jsonResponse(502, { error: "unavailable" });
  }
};

function jsonResponse(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=60",
    },
    body: JSON.stringify(body),
  };
}

type NotionQueryResponse = {
  results?: Array<{
    last_edited_time: string;
    properties: {
      "Weekly Route Slots Left"?: { number: number | null };
      "Project Scheduling Week"?: {
        title?: Array<{ plain_text: string }>;
      };
    };
  }>;
};
