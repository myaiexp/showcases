// A character ruler: one cell per letter, a shaded window, the expected spot and the match
export interface RulerState {
  /** First and last cell inside the window, inclusive. */
  window: [number, number];
  /** The expected position (the `location` option). */
  location: number;
  /** Cells where the searched word really is. */
  word: [number, number] | null;
  /** Cells Fuse reported as matched. */
  matched: readonly (readonly number[])[];
}

export interface Ruler {
  el: HTMLElement;
  draw(state: RulerState): void;
}

export function ruler(parent: HTMLElement, text: string): Ruler {
  const el = document.createElement('div');
  el.className = 'rl';
  const cells = [...text].map((ch, i) => {
    const c = document.createElement('span');
    c.className = 'rl-c';
    c.textContent = ch === ' ' ? ' ' : ch;
    if (i % 10 === 0) c.dataset['tick'] = String(i);
    el.append(c);
    return c;
  });
  parent.append(el);
  return {
    el,
    draw({ window, location, word, matched }) {
      const hit = new Set<number>();
      for (const [a = 0, b = a] of matched) for (let i = a; i <= b; i++) hit.add(i);
      cells.forEach((c, i) => {
        c.classList.toggle('in', i >= window[0] && i <= window[1]);
        c.classList.toggle('loc', i === Math.min(location, cells.length - 1));
        c.classList.toggle('word', word !== null && i >= word[0] && i <= word[1]);
        c.classList.toggle('hit', hit.has(i));
      });
    },
  };
}
