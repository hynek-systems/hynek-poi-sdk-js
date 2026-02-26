import { describe, it, expect, vi } from "vitest";
import { POIModule } from "../modules/pois";
import { HttpClient } from "../http";
import { PaginatedPois, POI } from "../types";

function createMockHttp() {
  return {
    get: vi.fn(),
  } as unknown as HttpClient;
}

const fakePoi: POI = {
  id: "poi-1",
  name: "Central Park",
  latitude: 40.7829,
  longitude: -73.9654,
  category: "park",
  source: "test-source",
};

const fakePaginatedResponse: PaginatedPois = {
  data: [fakePoi],
  total: 1,
  page: 1,
  page_size: 10,
  total_pages: 1,
};

describe("POIModule", () => {
  describe("nearby", () => {
    it("calls GET /v1/search with coordinates", async () => {
      const http = createMockHttp();
      vi.mocked(http.get).mockResolvedValueOnce(fakePaginatedResponse);

      const pois = new POIModule(http);
      const result = await pois.nearby({
        lat: 40.7829,
        lng: -73.9654,
      });

      expect(http.get).toHaveBeenCalledWith("/v1/search", {
        lat: 40.7829,
        lng: -73.9654,
      });
      expect(result).toEqual(fakePaginatedResponse);
    });

    it("passes optional radius param", async () => {
      const http = createMockHttp();
      vi.mocked(http.get).mockResolvedValueOnce(fakePaginatedResponse);

      const pois = new POIModule(http);
      await pois.nearby({ lat: 0, lng: 0, radius: 500 });

      expect(http.get).toHaveBeenCalledWith("/v1/search", {
        lat: 0,
        lng: 0,
        radius: 500,
      });
    });
  });

  describe("get", () => {
    it("calls GET /v1/poi/:id", async () => {
      const http = createMockHttp();
      vi.mocked(http.get).mockResolvedValueOnce(fakePoi);

      const pois = new POIModule(http);
      const result = await pois.get("poi-1");

      expect(http.get).toHaveBeenCalledWith("/v1/poi/poi-1");
      expect(result).toEqual(fakePoi);
    });
  });
});
