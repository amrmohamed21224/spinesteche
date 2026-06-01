import { env } from "../../config/env";

export class ApiError extends Error {
  public status: number;
  public statusText: string;
  public details: unknown;

  constructor(status: number, statusText: string, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
    this.details = details;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export interface RequestOptions extends RequestInit {
  timeout?: number;
}

class ApiClient {
  private baseUrl: string;
  private defaultTimeout: number;

  constructor(baseUrl: string = env.API_URL, defaultTimeout = 10000) {
    this.baseUrl = baseUrl;
    this.defaultTimeout = defaultTimeout;
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { timeout = this.defaultTimeout, ...fetchOptions } = options;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const separator = path.startsWith("/") ? "" : "/";
    const url = `${this.baseUrl}${separator}${path}`;

    const isFormData = typeof FormData !== "undefined" && fetchOptions.body instanceof FormData;

    const headers: HeadersInit = {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...fetchOptions.headers,
    };

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
        signal: controller.signal,
      });

      clearTimeout(id);

      if (!response.ok) {
        let errorData: unknown;
        try {
          errorData = await response.json();
        } catch {
          errorData = await response.text();
        }

        throw new ApiError(
          response.status,
          response.statusText,
          `Request to ${path} failed: [${response.status}] ${response.statusText}`,
          errorData,
        );
      }

      const text = await response.text();
      if (!text) {
        return {} as T;
      }

      try {
        return JSON.parse(text) as T;
      } catch (jsonErr) {
        throw new Error(`Failed to parse JSON response: ${(jsonErr as Error).message}`);
      }
    } catch (err) {
      clearTimeout(id);
      if ((err as Error).name === "AbortError") {
        throw new ApiError(
          408,
          "Request Timeout",
          `Request to ${path} exceeded timeout of ${timeout}ms`,
        );
      }
      throw err;
    }
  }

  public async get<T>(path: string, options: RequestOptions = {}): Promise<T> {
    if (env.USE_MOCKS) {
      await this.delay(600);
    }
    return this.request<T>(path, { ...options, method: "GET" });
  }

  public async post<T, U = unknown>(
    path: string,
    body: U,
    options: RequestOptions = {},
  ): Promise<T> {
    if (env.USE_MOCKS) {
      await this.delay(800);
    }

    const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

    return this.request<T>(path, {
      ...options,
      method: "POST",
      body: isFormData ? body : JSON.stringify(body),
    });
  }
}

export const cmsClient = new ApiClient();
export default cmsClient;
