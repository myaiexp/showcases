// Event log, palette and named sample shapes for interaction examples
import { Circle, Rect, Triangle, type FabricObject, type Point } from 'fabric';
import type { Pane, Stage } from './stage.ts';

export const RED = '#e94b3c';
export const BLUE = '#3b7dd8';
export const GREEN = '#2e9e5b';
export const GOLD = '#d99a1c';
export const INK = '#2b2a33';

const names = new WeakMap<FabricObject, string>();

/** Gives an object a short name that `who()` prints in logs. */
export function nameIt<T extends FabricObject>(obj: T, name: string): T {
  names.set(obj, name);
  return obj;
}

/** The object's name from `nameIt`, else its type; "none" for undefined. */
export function who(obj: FabricObject | undefined | null): string {
  return obj ? (names.get(obj) ?? obj.type.toLowerCase()) : 'none';
}

/** "(12, 34)" for a point. */
export function xy(p: Point | undefined): string {
  return p ? `(${Math.round(p.x)}, ${Math.round(p.y)})` : '(?)';
}

export interface EventLog {
  /** Adds a line; the same name twice in a row is folded into one line with a count. */
  add(name: string, detail?: string): void;
  clear(): void;
}

/**
 * A log of events, newest on top. A panel under the canvas in the full view; in a card a small
 * badge over the pane showing the last few lines.
 */
export function eventLog(stage: Stage, lines = 9, pane: Pane = stage): EventLog {
  const entries: { name: string; detail: string; n: number }[] = [];
  const max = stage.preview ? 3 : lines;
  const box = document.createElement('div');
  if (stage.preview) {
    box.style.cssText =
      'position:absolute;left:5px;right:5px;bottom:4px;padding:3px 6px;border-radius:4px;background:rgba(255,255,255,0.88);color:#333;font:10px/1.35 ui-monospace,monospace;pointer-events:none;overflow:hidden;white-space:nowrap;z-index:4';
    pane.frame.append(box);
  } else {
    box.style.cssText = `width:100%;max-width:700px;box-sizing:border-box;height:${max * 17 + 14}px;padding:6px 10px;overflow:hidden;border-radius:6px;background:rgba(127,127,127,0.12);font:12px/17px ui-monospace,monospace;white-space:nowrap`;
    stage.box.insertBefore(box, stage.bar);
  }
  const render = (): void => {
    box.replaceChildren();
    if (!entries.length) {
      box.textContent = 'no events yet';
      box.style.opacity = '0.6';
      return;
    }
    box.style.opacity = '1';
    for (const e of entries) {
      const row = document.createElement('div');
      row.style.cssText = 'overflow:hidden;text-overflow:ellipsis';
      const name = document.createElement('b');
      name.textContent = e.n > 1 ? `${e.name} ×${e.n}` : e.name;
      row.append(name, ` ${e.detail}`);
      box.append(row);
    }
  };
  render();
  return {
    add(name, detail = '') {
      const top = entries[0];
      if (top && top.name === name) {
        top.n++;
        top.detail = detail;
      } else {
        entries.unshift({ name, detail, n: 1 });
        entries.length = Math.min(entries.length, max);
      }
      render();
    },
    clear() {
      entries.length = 0;
      render();
    },
  };
}

/** A red rectangle, blue circle and green triangle named red/blue/green, for a 360×240 scene. */
export function trio(): { red: Rect; blue: Circle; green: Triangle; all: FabricObject[] } {
  const red = nameIt(new Rect({ left: 80, top: 110, width: 76, height: 76, fill: RED }), 'red');
  const blue = nameIt(new Circle({ left: 180, top: 110, radius: 40, fill: BLUE }), 'blue');
  const green = nameIt(new Triangle({ left: 280, top: 110, width: 80, height: 76, fill: GREEN }), 'green');
  return { red, blue, green, all: [red, blue, green] };
}
