import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Last line of defence for the public site.
 *
 * Without this mounted, a single render-time exception anywhere in the tree
 * unmounts the whole React root and the visitor is left with a blank white
 * page. Here we keep the Glloria voice, offer a recovery action and a direct
 * WhatsApp fallback, and only expose the raw stack in development.
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: unknown) {
    console.error("[ErrorBoundary]", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="app-error" dir="rtl">
        <span className="app-error-mark" aria-hidden="true">
          <AlertTriangle size={28} strokeWidth={1.4} />
        </span>
        <p className="app-error-eyebrow">GLL / ERROR</p>
        <h1>
          حدث خطأ غير متوقع.
          <br />
          <em>لنُعِد المحاولة.</em>
        </h1>
        <p className="app-error-body">
          نعتذر عن ذلك. أعِد تحميل الصفحة، وإن استمرت المشكلة تواصل معنا مباشرة
          على واتساب وسنساعدك فوراً.
        </p>
        <div className="app-error-actions">
          <button
            type="button"
            className="dark-button"
            onClick={() => window.location.reload()}
          >
            <RotateCcw size={16} /> إعادة تحميل الصفحة
          </button>
          <a className="text-link" href="/">
            العودة للرئيسية
          </a>
        </div>
        {import.meta.env.DEV && this.state.error?.stack && (
          <pre className="app-error-stack">{this.state.error.stack}</pre>
        )}
      </div>
    );
  }
}

export default ErrorBoundary;
