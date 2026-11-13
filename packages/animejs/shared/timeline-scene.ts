// DOM scaffolding: a stage with three shapes, plus button and readout helpers
export interface Scene {
  stage: HTMLElement;
  circle: HTMLElement;
  triangle: HTMLElement;
  square: HTMLElement;
  /** Aborts on cleanup: pass as the `signal` of every listener. */
  ac: AbortController;
  /** setTimeout / setInterval that dispose() clears. */
  later: (fn: () => void, ms: number) => void;
  every: (fn: () => void, ms: number) => void;
  /** Removes listeners and clears pending timeouts and intervals. */
  dispose: () => void;
  panel: () => HTMLElement;
  button: (parent: HTMLElement, label: string, fn: () => void) => HTMLButtonElement;
  readout: (parent: HTMLElement, label: string, initial?: string) => (v: string | number) => void;
}

export function makeScene(el: HTMLElement): Scene {
  const ac = new AbortController();
  const stage = document.createElement('div');
  stage.className = 'stage';
  const shape = (cls: string): HTMLElement => {
    const s = document.createElement('div');
    s.className = `shape ${cls}`;
    stage.append(s);
    return s;
  };
  const triangle = shape('triangle');
  const square = shape('square');
  const circle = shape('circle');
  el.append(stage);

  const timeouts = new Set<number>();
  const intervals = new Set<number>();
  const later = (fn: () => void, ms: number): void => {
    const id = window.setTimeout(() => {
      timeouts.delete(id);
      fn();
    }, ms);
    timeouts.add(id);
  };
  const every = (fn: () => void, ms: number): void => {
    intervals.add(window.setInterval(fn, ms));
  };
  const dispose = (): void => {
    ac.abort();
    timeouts.forEach((id) => window.clearTimeout(id));
    intervals.forEach((id) => window.clearInterval(id));
    timeouts.clear();
    intervals.clear();
  };
  const panel = (): HTMLElement => {
    const p = document.createElement('div');
    p.className = 'panel';
    el.append(p);
    return p;
  };
  const button = (parent: HTMLElement, label: string, fn: () => void): HTMLButtonElement => {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = label;
    b.addEventListener('click', fn, { signal: ac.signal });
    parent.append(b);
    return b;
  };
  const readout = (parent: HTMLElement, label: string, initial = '0'): ((v: string | number) => void) => {
    const wrap = document.createElement('span');
    wrap.className = 'readout';
    const l = document.createElement('span');
    l.className = 'label';
    l.textContent = label;
    const v = document.createElement('span');
    v.className = 'value';
    v.textContent = initial;
    wrap.append(l, v);
    parent.append(wrap);
    return (x) => {
      v.textContent = String(x);
    };
  };
  return { stage, circle, triangle, square, ac, later, every, dispose, panel, button, readout };
}
