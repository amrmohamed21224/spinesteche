import React, { Component, ErrorInfo, ReactNode } from "react";
import { errorLogger } from "../../lib/errors/logger";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    errorLogger.log(error, {
      extra: {
        componentStack: errorInfo.componentStack,
      },
    });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.fallbackUI) {
        return this.fallbackUI;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8 bg-surface-container text-right dir-rtl">
          <div className="max-w-md w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 shadow-lg text-center">
            <span
              className="material-symbols-outlined text-error text-6xl mb-6 block"
              aria-hidden="true"
            >
              error
            </span>
            <h2 className="font-headline-xl text-headline-xl text-primary mb-4 font-bold">
              عذراً، حدث خطأ غير متوقع
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed">
              واجه النظام مشكلة أثناء تحميل هذا الجزء من الصفحة. لقد تم تسجيل المشكلة تلقائياً
              لحلها.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
              >
                إعادة المحاولة
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 border border-outline-variant text-primary font-label-md text-label-md rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
              >
                تحديث الصفحة
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }

  private get fallbackUI() {
    return this.props.fallback;
  }
}
export default ErrorBoundary;
