// A "sound → effects → speakers" picture with a caption, for effect examples
export interface Flow {
  /** Writes the caption under the boxes. */
  caption(text: string): void;
  /** Lights or greys out effect box `index` (0 is the first effect), e.g. after removeEffect(). */
  active(index: number, on: boolean): void;
  /** Renames effect box `index`. */
  rename(index: number, name: string): void;
}

const ON = 'border-color:#7aa2ff;opacity:1;text-decoration:none';
const OFF = 'border-color:var(--border);opacity:0.35;text-decoration:line-through';

/**
 * Boxes for the source, each effect and the speakers, joined by arrows, plus a caption.
 * Effect boxes start lit; `active()` greys one out to show it is out of the chain.
 */
export function flow(parent: HTMLElement, from: string, effects: readonly string[], to = 'speakers'): Flow {
  const wrap = document.createElement('div');
  wrap.style.cssText =
    'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;flex:1 1 auto;min-height:0;padding:2px 6px';
  const row = document.createElement('div');
  row.style.cssText =
    'display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:4px 6px;font:600 12px/1.2 ui-monospace,monospace';
  const boxes: HTMLElement[] = [];
  [from, ...effects, to].forEach((name, i) => {
    if (i > 0) {
      const arrow = document.createElement('span');
      arrow.textContent = '→';
      arrow.style.color = 'var(--fg-3)';
      row.append(arrow);
    }
    const b = document.createElement('div');
    b.textContent = name;
    b.style.cssText =
      'padding:4px 8px;border-radius:6px;border:1px solid var(--border);background:var(--bg-surface);color:var(--fg-1);transition:opacity .15s';
    if (i > 0 && i <= effects.length) {
      b.style.cssText += `;${ON}`;
      boxes.push(b);
    }
    row.append(b);
  });
  const text = document.createElement('div');
  text.style.cssText = 'font:600 14px/1.3 ui-monospace,monospace;color:var(--fg-1);text-align:center;min-height:18px';
  wrap.append(row, text);
  parent.append(wrap);
  return {
    caption: (t) => {
      text.textContent = t;
    },
    active: (i, on) => {
      const b = boxes[i];
      if (b) b.style.cssText += `;${on ? ON : OFF}`;
    },
    rename: (i, name) => {
      const b = boxes[i];
      if (b) b.textContent = name;
    },
  };
}
