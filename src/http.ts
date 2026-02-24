export class HttpClient {
  baseUrl: string;
  apiKey?: string;

  constructor(config: { baseUrl: string; apiKey?: string }) {
    this.baseUrl = config.baseUrl;
    this.apiKey = config.apiKey;
  }

  async get<T>(path: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(`${this.baseUrl}${path}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) =>
        url.searchParams.append(key, String(value)),
      );
    }

    const res = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
        ...(this.apiKey && {
          Authorization: `Bearer ${this.apiKey}`,
        }),
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    return res.json() as Promise<T>;
  }
}
