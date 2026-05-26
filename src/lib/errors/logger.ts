/**
 * Central Error Logger Abstraction for SpinesTech.
 * Integrates with standard console in development, and can hook into Sentry/Datadog in production.
 */

export interface ErrorDetails {
  componentName?: string;
  route?: string;
  userId?: string;
  extra?: Record<string, unknown>;
}

class ErrorLogger {
  private isDev = process.env.NODE_ENV === "development";

  public log(error: Error, details: ErrorDetails = {}): void {
    const timestamp = new Date().toISOString();

    if (this.isDev) {
      console.group(`🚨 [Application Error logged at ${timestamp}]`);
      console.error("Error Object:", error);
      console.log("Metadata:", details);
      console.groupEnd();
    } else {
      // In production, send to external monitoring service (e.g. Sentry/LogRocket/Datadog)
      // fetch('https://monitoring.spinestech.sa/log', { method: 'POST', body: JSON.stringify({ error: error.message, stack: error.stack, ...details }) });
      console.error(`[ErrorLogger] Production logged error: ${error.message}`, details);
    }
  }

  public logWarning(message: string, details: Record<string, unknown> = {}): void {
    if (this.isDev) {
      console.warn(`⚠️ [Warning]: ${message}`, details);
    }
  }
}

export const errorLogger = new ErrorLogger();
