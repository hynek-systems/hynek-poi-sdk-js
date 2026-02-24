import { describe, it, expect } from "vitest";
import { HynekPOIClient } from "../client";

describe("HynekPOIClient", () => {
  it("uses default base URL", () => {
    const client = new HynekPOIClient({});
    expect(client.http.baseUrl).toBe("https://api.hynekpoi.com/");
  });

  it("allows overriding base URL", () => {
    const client = new HynekPOIClient({ baseUrl: "https://custom.api.com/" });
    expect(client.http.baseUrl).toBe("https://custom.api.com/");
  });

  it("passes API key to http client", () => {
    const client = new HynekPOIClient({ apiKey: "my-key" });
    expect(client.http.apiKey).toBe("my-key");
  });

  it("exposes pois module", () => {
    const client = new HynekPOIClient({});
    expect(client.pois).toBeDefined();
  });
});
