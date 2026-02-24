import { describe, it, expect, vi, beforeEach } from "vitest";
import { HttpClient } from "../http";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

beforeEach(() => {
  mockFetch.mockReset();
});

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("HttpClient", () => {
  it("sends a GET request to the correct URL", async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({ ok: true }));

    const client = new HttpClient({ baseUrl: "https://api.example.com" });
    await client.get("/test");

    expect(mockFetch).toHaveBeenCalledOnce();
    const [url] = mockFetch.mock.calls[0];
    expect(url).toBe("https://api.example.com/test");
  });

  it("appends query params", async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse([]));

    const client = new HttpClient({ baseUrl: "https://api.example.com" });
    await client.get("/search", { q: "park", limit: 10 });

    const [url] = mockFetch.mock.calls[0];
    const parsed = new URL(url);
    expect(parsed.searchParams.get("q")).toBe("park");
    expect(parsed.searchParams.get("limit")).toBe("10");
  });

  it("includes Authorization header when apiKey is set", async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({}));

    const client = new HttpClient({
      baseUrl: "https://api.example.com",
      apiKey: "test-key",
    });
    await client.get("/secure");

    const [, init] = mockFetch.mock.calls[0];
    expect(init.headers.Authorization).toBe("Bearer test-key");
  });

  it("omits Authorization header when no apiKey", async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({}));

    const client = new HttpClient({ baseUrl: "https://api.example.com" });
    await client.get("/public");

    const [, init] = mockFetch.mock.calls[0];
    expect(init.headers.Authorization).toBeUndefined();
  });

  it("throws on non-ok responses", async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({ error: "not found" }, 404));

    const client = new HttpClient({ baseUrl: "https://api.example.com" });

    await expect(client.get("/missing")).rejects.toThrow("HTTP error 404");
  });

  it("returns parsed JSON body", async () => {
    const data = { id: "1", name: "Test" };
    mockFetch.mockResolvedValueOnce(jsonResponse(data));

    const client = new HttpClient({ baseUrl: "https://api.example.com" });
    const result = await client.get("/item");

    expect(result).toEqual(data);
  });
});
