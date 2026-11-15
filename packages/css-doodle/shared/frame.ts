// A frame like stage.doodle()'s, for elements an example builds itself
export function framed(parent: HTMLElement, child: Element, label?: string, shape: 'square' | 'free' = 'square'): HTMLElement {
  const frame = document.createElement('figure');
  frame.className = `cd-frame cd-${shape}`;
  frame.append(child);
  if (label) {
    const cap = document.createElement('figcaption');
    cap.textContent = label;
    frame.append(cap);
  }
  parent.append(frame);
  return frame;
}

/** A monospace block for showing generated text (markup, a clip-path, JSON). */
export function codeBlock(parent: HTMLElement, preview: boolean, maxHeight = 240): HTMLPreElement {
  const pre = document.createElement('pre');
  pre.className = 'cd-readout';
  pre.style.cssText = `margin: 0; padding: 8px 10px; background: var(--bg-surface); border-radius: 6px; white-space: pre-wrap; word-break: break-all; overflow: auto; max-height: ${preview ? 150 : maxHeight}px; max-width: ${preview ? 120 : 420}px; font-size: ${preview ? 8 : 12}px`;
  parent.append(pre);
  return pre;
}

/**
 * A sandboxed iframe with no scripts showing `html`, so prerendered output paints on its own:
 * on this page the css-doodle runtime would take the element over and draw it again.
 */
export function scriptlessFrame(size: number): { el: HTMLIFrameElement; show(html: string): void } {
  const el = document.createElement('iframe');
  el.setAttribute('sandbox', '');
  el.style.cssText = `width: ${size}px; height: ${size}px; border: 0; background: transparent`;
  return {
    el,
    show(html) {
      el.srcdoc = `<!doctype html><style>html,body{margin:0;height:100%;background:transparent}</style>${html}`;
    },
  };
}
