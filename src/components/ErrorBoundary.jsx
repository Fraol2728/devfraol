import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback !== undefined) return this.props.fallback;

      return (
        <div className="min-h-screen flex items-center justify-center text-center px-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-400 mb-6">
              An unexpected error occurred. Please refresh the page.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
