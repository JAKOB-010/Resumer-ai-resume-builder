import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default class TemplatePreviewErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      message: error?.message || 'Template failed to render.',
    };
  }

  componentDidCatch(error, info) {
    console.error('[TemplatePreview] Render error:', error, info);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false, message: '' });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-amber-200 bg-amber-50 p-8 text-center">
          <AlertTriangle className="mb-3 h-10 w-10 text-amber-600" />
          <p className="text-sm font-semibold text-amber-900">Preview unavailable</p>
          <p className="mt-2 max-w-sm text-xs text-amber-800">
            {this.state.message}
          </p>
          <p className="mt-3 text-xs text-amber-700">
            Your form data is safe — try another template or refresh the page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
