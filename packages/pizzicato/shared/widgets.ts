// Visual widgets for Pizzicato examples: big text, piano keys, event lights, pads
const MONO = 'ui-monospace,monospace';

/** A large centred line of text; set `.textContent` to update it. */
export function bigText(parent: HTMLElement, size = 18): HTMLDivElement {
  const div = document.createElement('div');
  div.style.cssText = `font:700 ${size}px/1.25 ${MONO};color:var(--fg-1);text-align:center;padding:2px 4px`;
  parent.append(div);
  return div;
}

/** A small centred line of muted text, for a second line under bigText(). */
export function smallText(parent: HTMLElement, text = ''): HTMLDivElement {
  const div = document.createElement('div');
  div.style.cssText = `font:12px/1.3 ${MONO};color:var(--fg-2);text-align:center;padding:0 4px`;
  div.textContent = text;
  parent.append(div);
  return div;
}

/** Frequency in Hz of a MIDI note number (69 is A4, 440 Hz). */
export const hz = (midi: number): number => 440 * 2 ** ((midi - 69) / 12);

const NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
/** "C4"-style name of a MIDI note number. */
export const noteName = (midi: number): string => `${NAMES[midi % 12]}${Math.floor(midi / 12) - 1}`;

export interface Keys {
  readonly el: HTMLElement;
  /** Lights a key (true) or lets it go (false). */
  set(midi: number, down: boolean): void;
  /** Called with the note when a key is pressed with a pointer (full view). */
  onPress(fn: (midi: number) => void, release?: (midi: number) => void): void;
}

/** A row of piano keys from `low` to `high` (MIDI numbers), white and black. */
export function keys(parent: HTMLElement, low: number, high: number): Keys {
  const el = document.createElement('div');
  el.style.cssText = 'position:relative;display:flex;height:100%;min-height:48px;width:100%;user-select:none;touch-action:none';
  const byNote = new Map<number, HTMLElement>();
  const whites = [];
  for (let m = low; m <= high; m++) if (!NAMES[m % 12]!.includes('#')) whites.push(m);
  const w = 100 / whites.length;
  let wi = 0;
  for (let m = low; m <= high; m++) {
    const k = document.createElement('div');
    const black = NAMES[m % 12]!.includes('#');
    k.dataset.base = black ? '#20232c' : '#e8ecf2';
    k.style.cssText = black
      ? `position:absolute;top:0;height:60%;width:${w * 0.6}%;left:${wi * w - w * 0.3}%;z-index:1;border-radius:0 0 3px 3px`
      : `flex:1 1 0;border:1px solid #0b0d12;border-radius:0 0 4px 4px`;
    k.style.background = k.dataset.base;
    if (!black) wi++;
    byNote.set(m, k);
    el.append(k);
  }
  parent.append(el);
  return {
    el,
    set(midi, down) {
      const k = byNote.get(midi);
      if (k) k.style.background = down ? '#7aa2ff' : k.dataset.base!;
    },
    onPress(fn, release) {
      for (const [m, k] of byNote) {
        k.style.cursor = 'pointer';
        k.addEventListener('pointerdown', (e) => {
          e.preventDefault();
          fn(m);
        });
        if (release) for (const type of ['pointerup', 'pointerleave'] as const) k.addEventListener(type, () => release(m));
      }
    },
  };
}

export interface Lights {
  /** Turns a light on or off. */
  set(name: string, on: boolean): void;
  /** Lights one briefly. */
  flash(name: string): void;
}

/** A row of labelled lamps, e.g. one per event name. */
export function lights(parent: HTMLElement, names: readonly string[]): Lights {
  const row = document.createElement('div');
  row.style.cssText = `display:flex;flex-wrap:wrap;gap:6px;justify-content:center;font:600 12px/1 ${MONO}`;
  const lamps = new Map<string, HTMLElement>();
  const timers = new Map<string, number>();
  for (const n of names) {
    const lamp = document.createElement('div');
    lamp.textContent = n;
    lamp.style.cssText =
      'padding:6px 10px;border-radius:999px;border:1px solid var(--border);color:var(--fg-3);background:var(--bg-surface);transition:all .12s';
    lamps.set(n, lamp);
    row.append(lamp);
  }
  parent.append(row);
  const set = (name: string, on: boolean): void => {
    const lamp = lamps.get(name);
    if (!lamp) return;
    lamp.style.background = on ? '#7aa2ff' : 'var(--bg-surface)';
    lamp.style.color = on ? '#0b0d12' : 'var(--fg-3)';
    lamp.style.borderColor = on ? '#7aa2ff' : 'var(--border)';
  };
  return {
    set,
    flash(name) {
      set(name, true);
      clearTimeout(timers.get(name));
      timers.set(name, window.setTimeout(() => set(name, false), 350));
    },
  };
}

export interface Pads {
  /** Lights a pad briefly, as if it were hit. */
  hit(name: string): void;
  /** Called with the pad's name when it is pressed with a pointer (full view). */
  onPress(fn: (name: string) => void): void;
}

/** A grid of labelled pads, like a sound board. */
export function pads(parent: HTMLElement, names: readonly string[], columns = names.length): Pads {
  const grid = document.createElement('div');
  grid.style.cssText = `display:grid;grid-template-columns:repeat(${columns},1fr);gap:6px;width:100%;flex:1 1 auto;min-height:0`;
  const byName = new Map<string, HTMLElement>();
  for (const n of names) {
    const pad = document.createElement('button');
    pad.type = 'button';
    pad.textContent = n;
    pad.style.cssText = `font:600 12px/1.2 ${MONO};color:var(--fg-1);background:var(--bg-surface);border:1px solid var(--border);border-radius:8px;min-height:36px;transition:background .1s`;
    byName.set(n, pad);
    grid.append(pad);
  }
  parent.append(grid);
  return {
    hit(name) {
      const pad = byName.get(name);
      if (!pad) return;
      pad.style.background = '#7aa2ff';
      pad.style.color = '#0b0d12';
      window.setTimeout(() => {
        pad.style.background = 'var(--bg-surface)';
        pad.style.color = 'var(--fg-1)';
      }, 180);
    },
    onPress(fn) {
      for (const [n, pad] of byName) pad.addEventListener('click', () => fn(n));
    },
  };
}
