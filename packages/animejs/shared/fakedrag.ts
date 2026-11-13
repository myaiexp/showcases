// Replays a mouse gesture (down, moves, up) on an element so a draggable can be "dragged" without a pointer
export const fakeDrag = (target: HTMLElement, dx: number, dy: number, ms: number, onDone?: () => void): (() => void) => {
  const r = target.getBoundingClientRect();
  const x0 = r.left + r.width / 2;
  const y0 = r.top + r.height / 2;
  let cx = x0;
  let cy = y0;
  const fire = (type: string, on: EventTarget): void => {
    on.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, button: 0, clientX: cx, clientY: cy }));
  };
  fire('mousedown', target);
  const start = performance.now();
  let raf = 0;
  let finished = false;
  const end = (): void => {
    if (finished) return;
    finished = true;
    cancelAnimationFrame(raf);
    fire('mouseup', document);
    onDone?.();
  };
  const step = (now: number): void => {
    const t = Math.min(1, (now - start) / ms);
    cx = x0 + dx * t;
    cy = y0 + dy * t;
    fire('mousemove', document);
    if (t < 1) raf = requestAnimationFrame(step);
    else end();
  };
  raf = requestAnimationFrame(step);
  return end; // calling it early releases the pointer where it is
};
