// DOM scaffolding: a scrollable container with a square and a looping programmatic scroll
export interface Stage {
  scroller: HTMLElement;
  square: HTMLElement;
}

const div = (cls: string, text?: string): HTMLElement => {
  const d = document.createElement('div');
  d.className = cls;
  if (text) d.textContent = text;
  return d;
};

/** Three stacked sections inside a scroller: a hint, the square's row, and empty space. */
export function buildStage(parent: HTMLElement, preview: boolean): Stage {
  const scroller = div(preview ? 'scroller is-preview' : 'scroller');
  const content = div('content');
  const square = div('square');
  const row = div('section');
  row.append(square);
  content.append(div('section hint', 'scroll down'), row, div('section'));
  scroller.append(content);
  parent.append(scroller);
  return { scroller, square };
}

/** Scrolls the container back and forth along one axis; returns a stop function. */
export function autoScroll(scroller: HTMLElement, periodMs = 7000): () => void {
  let raf = 0;
  const start = performance.now();
  const tick = (now: number): void => {
    const max = scroller.scrollHeight - scroller.clientHeight;
    scroller.scrollTop = ((1 - Math.cos(((now - start) / periodMs) * Math.PI * 2)) / 2) * max;
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}
