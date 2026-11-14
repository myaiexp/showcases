// Visual widgets for Tone.js examples: piano keys, drum pads, step grid, label
const ACCENT = '#7aa2ff';
const NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const FLAT: Record<string, string> = { Db: 'C#', Eb: 'D#', Gb: 'F#', Ab: 'G#', Bb: 'A#' };

/** MIDI number of a scientific pitch name like "C4", "F#3" or "Eb5". */
export function midiOf(note: string): number {
  const m = /^([A-G])(#|b)?(-?\d+)$/.exec(note);
  if (!m) throw new Error(`not a note name: ${note}`);
  const name = m[2] === 'b' ? FLAT[m[1]! + 'b']! : m[1]! + (m[2] ?? '');
  return NAMES.indexOf(name) + 12 * (Number(m[3]) + 1);
}

/** Lights `el` and fades it back over `seconds`, with no timer to clean up. */
export function flash(el: HTMLElement, seconds = 0.25, color = ACCENT): void {
  el.animate([{ backgroundColor: color, offset: 0 }, { backgroundColor: color, offset: 0.3 }, {}], {
    duration: seconds * 1000,
    easing: 'ease-out',
  });
}

function box(parent: HTMLElement, css: string): HTMLDivElement {
  const div = document.createElement('div');
  div.style.cssText = css;
  parent.append(div);
  return div;
}

export interface Keyboard {
  readonly el: HTMLElement;
  /** Lights a key for `seconds` (any spelling: "Eb4" and "D#4" are the same key). */
  press(note: string, seconds?: number): void;
  /** Calls `fn` with the note name when a key is pressed (full view). */
  onPress(fn: (note: string) => void): void;
}

/** A piano keyboard from `low` to `high` inclusive, white keys spelled with sharps. */
export function keyboard(parent: HTMLElement, low = 'C4', high = 'B4'): Keyboard {
  const el = box(parent, 'position:relative;display:flex;flex:1 1 auto;min-height:48px;width:100%;user-select:none');
  const keys = new Map<number, HTMLElement>();
  const lo = midiOf(low);
  const hi = midiOf(high);
  const whites = [];
  for (let m = lo; m <= hi; m++) if (!NAMES[m % 12]!.includes('#')) whites.push(m);
  const ww = 100 / whites.length;
  let wi = 0;
  for (let m = lo; m <= hi; m++) {
    const name = NAMES[m % 12]!;
    const black = name.includes('#');
    const k = document.createElement('div');
    k.dataset.note = `${name}${Math.floor(m / 12) - 1}`;
    k.style.cssText = black
      ? `position:absolute;top:0;height:60%;width:${ww * 0.6}%;left:${(wi - 0.3) * ww}%;background:#1c2230;border:1px solid #000;border-radius:0 0 3px 3px;z-index:1;cursor:pointer`
      : `flex:1 1 0;background:#e8ecf2;border:1px solid #556;border-radius:0 0 4px 4px;cursor:pointer`;
    if (!black) wi++;
    keys.set(m, k);
    el.append(k);
  }
  return {
    el,
    press(note, seconds = 0.3) {
      const k = keys.get(midiOf(note));
      if (k) flash(k, seconds);
    },
    onPress(fn) {
      for (const k of keys.values()) {
        k.addEventListener('pointerdown', (e) => {
          e.preventDefault();
          fn(k.dataset.note!);
          flash(k, 0.3);
        });
      }
    },
  };
}

export interface Pads {
  readonly el: HTMLElement;
  readonly pads: HTMLElement[];
  hit(index: number, seconds?: number): void;
  onHit(fn: (index: number) => void): void;
}

/** A row (or grid, with `columns`) of labelled pads that flash when hit. */
export function pads(parent: HTMLElement, labels: readonly string[], columns = labels.length): Pads {
  const el = box(
    parent,
    `display:grid;grid-template-columns:repeat(${columns},1fr);gap:6px;flex:1 1 auto;min-height:40px;width:100%`,
  );
  const list = labels.map((text) => {
    const p = box(
      el,
      'display:flex;align-items:center;justify-content:center;border-radius:8px;background:var(--bg-surface);border:1px solid var(--border);font:600 12px/1.2 ui-monospace,monospace;color:var(--fg-1);cursor:pointer;text-align:center;padding:4px;min-height:0',
    );
    p.textContent = text;
    return p;
  });
  return {
    el,
    pads: list,
    hit(i, seconds = 0.25) {
      const p = list[i];
      if (p) flash(p, seconds);
    },
    onHit(fn) {
      list.forEach((p, i) =>
        p.addEventListener('pointerdown', (e) => {
          e.preventDefault();
          fn(i);
          flash(p, 0.25);
        }),
      );
    },
  };
}

export interface Steps {
  readonly el: HTMLElement;
  /** on[row][col] */
  readonly on: boolean[][];
  set(row: number, col: number, value: boolean): void;
  /** Highlights column `col` as the playing step (-1 for none). */
  cursor(col: number): void;
  /** Full view: clicking a cell toggles it and calls `fn`. */
  onToggle(fn: (row: number, col: number, value: boolean) => void): void;
}

/** A step-sequencer grid: one row per label, `cols` steps. */
export function steps(parent: HTMLElement, rows: readonly string[], cols: number): Steps {
  const el = box(
    parent,
    `display:grid;grid-template-columns:auto repeat(${cols},1fr);grid-auto-rows:minmax(8px,1fr);gap:3px;flex:1 1 auto;min-height:0;width:100%;align-content:stretch`,
  );
  const on = rows.map(() => new Array<boolean>(cols).fill(false));
  const cells: HTMLElement[][] = [];
  let at = -1;
  const paint = (r: number, c: number): void => {
    const cell = cells[r]![c]!;
    cell.style.background = on[r]![c] ? ACCENT : 'var(--bg-surface)';
    cell.style.outline = c === at ? '2px solid #e8ecf2' : 'none';
  };
  rows.forEach((label, r) => {
    const l = box(el, 'font:11px/1 ui-monospace,monospace;color:var(--fg-2);align-self:center;padding-right:4px');
    l.textContent = label;
    cells.push(
      Array.from({ length: cols }, (_, c) => {
        const cell = box(el, 'border-radius:3px;border:1px solid var(--border);min-height:8px;cursor:pointer');
        cell.dataset.r = String(r);
        cell.dataset.c = String(c);
        return cell;
      }),
    );
  });
  const all = (): void => rows.forEach((_, r) => on[r]!.forEach((_, c) => paint(r, c)));
  all();
  return {
    el,
    on,
    set(r, c, value) {
      on[r]![c] = value;
      paint(r, c);
    },
    cursor(c) {
      at = c;
      all();
    },
    onToggle(fn) {
      el.addEventListener('click', (e) => {
        const t = (e.target as HTMLElement).dataset;
        if (t.r === undefined || t.c === undefined) return;
        const r = Number(t.r);
        const c = Number(t.c);
        on[r]![c] = !on[r]![c];
        paint(r, c);
        fn(r, c, on[r]![c]!);
      });
    },
  };
}

/** A large centred line of text for values and names; set `.textContent` to update it. */
export function bigLabel(parent: HTMLElement, text = ''): HTMLDivElement {
  const div = box(parent, 'font:600 20px/1.3 ui-monospace,monospace;color:var(--fg-1);text-align:center;white-space:pre-line');
  div.textContent = text;
  return div;
}
