import { HttpClient } from "../http";
import { POI } from "../types";

export class POIModule {
  constructor(private http: HttpClient) {}

  async nearby(params: {
    lat: number;
    lng: number;
    radius?: number;
  }): Promise<POI[]> {
    return this.http.get("/v1/search", params);
  }

  async get(id: string): Promise<POI> {
    return this.http.get(`/pois/${id}`);
  }
}
