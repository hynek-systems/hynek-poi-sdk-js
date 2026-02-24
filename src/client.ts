import { HttpClient } from "./http";
import { POIModule } from "./modules/pois";

export interface HynekPOIConfig {
  apiKey?: string;
  baseUrl?: string;
}

export class HynekPOIClient {
  http: HttpClient;
  pois: POIModule;

  constructor(config: HynekPOIConfig) {
    this.http = new HttpClient({
      apiKey: config.apiKey,
      baseUrl: config.baseUrl ?? "https://api.hynekpoi.com/",
    });

    this.pois = new POIModule(this.http);
  }
}
