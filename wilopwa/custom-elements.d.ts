import type { DetailedHTMLProps, HTMLAttributes } from "react";

// The Denser AI chatbot widget is a custom element embedded verbatim from the
// source page. It isn't a standard HTML element, so TypeScript's JSX types
// don't know about it by default. React 19's JSX namespace lives on the
// "react" module itself, so augment it there.
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "denser-chatbot": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export {};
