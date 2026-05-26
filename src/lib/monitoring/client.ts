import { errorLogger } from "../errors/logger";

export interface PerformanceMetric {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
}

class MonitoringClient {
  private isBrowser = typeof window !== "undefined";

  /**
   * Tracks custom performance measurements (e.g. Core Web Vitals, API request durations).
   */
  public logPerformanceMetric(metric: PerformanceMetric): void {
    if (process.env.NODE_ENV === "development") {
      console.log(`⏱️ [Performance Metric - ${metric.name}]: ${metric.value}ms (${metric.rating})`);
    }
    // In production, dispatch to backend telemetry receiver
  }

  /**
   * Captures and logs API failures, including status codes and response headers.
   */
  public logApiFailure(url: string, status: number, statusText: string): void {
    const error = new Error(`API Request Failed: [${status}] ${statusText}`);
    errorLogger.log(error, {
      extra: {
        apiUrl: url,
        status,
        statusText,
      },
    });
  }

  /**
   * Hooks into browser performance API to capture Core Web Vitals.
   */
  public initPerformanceMonitoring(): void {
    if (!this.isBrowser || !window.performance) return;

    // Listen for Web Vitals (FID, LCP, CLS) or Navigation Timing details
    window.addEventListener("load", () => {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

        if (pageLoadTime > 0) {
          this.logPerformanceMetric({
            name: "PageLoadTime",
            value: pageLoadTime,
            rating:
              pageLoadTime < 2000 ? "good" : pageLoadTime < 4000 ? "needs-improvement" : "poor",
          });
        }
      }, 0);
    });
  }
}

export const monitoringClient = new MonitoringClient();
