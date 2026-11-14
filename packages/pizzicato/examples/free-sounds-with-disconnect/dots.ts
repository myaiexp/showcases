// A grid of dots, one per sound made: lit while connected, a faint ring once freed
const COUNT = 30;

export interface Dots {
  /** Dot `index` is connected (true) or freed (false). */
  set(index: number, connected: boolean): void;
  /** Every dot back to empty. */
  reset(): void;
}

export function dots(parent: HTMLElement, size: number): Dots {
  const grid = document.createElement('div');
  grid.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px;justify-content:center;padding:2px 8px;flex:0 0 auto';
  const items: HTMLElement[] = [];
  for (let i = 0; i < COUNT; i++) {
    const d = document.createElement('div');
    d.style.cssText = `width:${size}px;height:${size}px;border-radius:50%;box-sizing:border-box;border:1px solid var(--border);transition:background .1s`;
    items.push(d);
    grid.append(d);
  }
  parent.append(grid);
  const reset = (): void => items.forEach((d) => (d.style.background = 'transparent'));
  return {
    reset,
    set(i, connected) {
      const d = items[i];
      if (d) d.style.background = connected ? '#ff8fb1' : 'transparent';
    },
  };
}
