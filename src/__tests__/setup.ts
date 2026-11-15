import "@testing-library/jest-dom";

// Polyfill Web Speech API for Node test environment
if (typeof window !== "undefined") {
  (window as any).speechSynthesis = {
    speak: () => {},
    cancel: () => {},
  };
}
