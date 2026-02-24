import { describe, it, expect, vi } from "vitest";
import { POIModule } from "../modules/pois";
import { HttpClient } from "../http";
import { POI } from "../types";

function createMockHttp() {
  return {
    get: vi.fn(),
  } as unknown as HttpClient;
}

const fakePoi: POI = {
  Id: "poi-1",
  Name: "Central Park",
  Latitude: 40.7829,
  Longitude: -73.9654,
  Category: "park",
  Source: "test-source",
};

describe("POIModule", () => {
  describe("nearby", () => {
    it("calls GET /pois/nearby with coordinates", async () => {
      const http = createMockHttp();
      vi.mocked(http.get).mockResolvedValueOnce([fakePoi]);

      const pois = new POIModule(http);
      const result = await pois.nearby({
        latitude: 40.7829,
        longitude: -73.9654,
      });

      expect(http.get).toHaveBeenCalledWith("/pois/nearby", {
        latitude: 40.7829,
        longitude: -73.9654,
      });
      expect(result).toEqual([fakePoi]);
    });

    it("passes optional radius param", async () => {
      const http = createMockHttp();
      vi.mocked(http.get).mockResolvedValueOnce([]);

      const pois = new POIModule(http);
      await pois.nearby({ latitude: 0, longitude: 0, radius: 500 });

      expect(http.get).toHaveBeenCalledWith("/pois/nearby", {
        latitude: 0,
        longitude: 0,
        radius: 500,
      });
    });
  });

  describe("get", () => {
    it("calls GET /pois/:id", async () => {
      const http = createMockHttp();
      vi.mocked(http.get).mockResolvedValueOnce(fakePoi);

      const pois = new POIModule(http);
      const result = await pois.get("poi-1");

      expect(http.get).toHaveBeenCalledWith("/pois/poi-1");
      expect(result).toEqual(fakePoi);
    });
  });
});
