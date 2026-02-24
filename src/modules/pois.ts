import { HttpClient } from "../http";
import { POI } from "../types";

export class POIModule {
  constructor(private http: HttpClient) {}

  async nearby(params: {
    latitude: number;
    longitude: number;
    radius?: number;
  }): Promise<POI[]> {
    return this.http.get("/pois/nearby", params);
  }

  async get(id: string): Promise<POI> {
    return this.http.get(`/pois/${id}`);
  }
}
