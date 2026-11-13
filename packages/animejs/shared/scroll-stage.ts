// DOM scaffolding: an inner scroll container with a hint, a row of squares and empty space, plus a looping auto-scroll
export interface Stage {
  scroller: HTMLElement;
  squares: HTMLElement[];
  row: HTMLElement;
}

const div = (cls: string, text?: string): HTMLElement => {
  const d = document.createElement('div');
  d.className = cls;
  if (text) d.textContent = text;
  return d;
};

/** Three stacked sections inside a scroller: a hint, the squares' row, and empty space. */
export function buildStage(parent: HTMLElement, preview: boolean, squareCount = 1): Stage {
  const scroller = div(preview ? 'scroller is-preview' : 'scroller');
  const content = div('content');
  const squares = Array.from({ length: squareCount }, (_, i) => div(`square s${i}`));
  const row = div('section row');
  row.append(...squares);
  content.append(div('section hint', 'scroll down'), row, div('section'));
  scroller.append(content);
  parent.append(scroller);
  return { scroller, squares, row };
}

/** Scrolls the container back and forth along y; returns a stop function. */
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
