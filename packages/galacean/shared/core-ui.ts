// DOM overlays: text panels, an event log, world labels, a ghost cursor
import type { Camera } from '@galacean/engine';
import { Vector3 } from '@galacean/engine';
import type { Stage } from './stage.ts';

const PANEL =
  'position:absolute;pointer-events:none;white-space:pre;color:#cfd6e4;background:rgba(8,10,16,.62);border-radius:6px;padding:4px 8px;font-family:ui-monospace,monospace;line-height:1.4;';

const layers = new WeakMap<Stage, HTMLElement>();

/** A layer exactly the size of the canvas (not of the bar below it), for overlays; removed with the stage. */
export function overlayLayer(stage: Stage): HTMLElement {
  let layer = layers.get(stage);
  if (!layer) {
    const host = stage.canvas.parentElement!;
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    layer = document.createElement('div');
    const height = stage.bar.parentElement === host ? stage.canvas.style.height : '100%';
    layer.style.cssText = `position:absolute;left:0;top:0;width:100%;height:${height};pointer-events:none;overflow:hidden`;
    host.append(layer);
    layers.set(stage, layer);
    const own = layer;
    stage.own(() => own.remove());
  }
  return layer;
}

export interface Panel {
  el: HTMLDivElement;
  text(value: string): void;
}

/** A monospace text panel over the canvas (visible in cards too). */
export function panel(stage: Stage, corner: 'tl' | 'tr' | 'bl' | 'br' = 'tl'): Panel {
  const el = document.createElement('div');
  const pos = { tl: 'top:6px;left:6px', tr: 'top:6px;right:6px', bl: 'bottom:6px;left:6px', br: 'bottom:6px;right:6px' }[corner];
  el.style.cssText = `${PANEL}${pos};font-size:${stage.preview ? 10.5 : 12}px`;
  overlayLayer(stage).append(el);
  stage.own(() => el.remove());
  return { el, text: (value) => void (el.textContent = value) };
}

export interface EventLog {
  log(message: string): void;
  clear(): void;
}

/** A panel that keeps the last `lines` messages, newest at the bottom. */
export function eventLog(stage: Stage, lines = 8, corner: 'tl' | 'tr' | 'bl' | 'br' = 'tl'): EventLog {
  const p = panel(stage, corner);
  let buffer: string[] = [];
  return {
    log(message) {
      buffer.push(message);
      if (buffer.length > lines) buffer = buffer.slice(-lines);
      p.text(buffer.join('\n'));
    },
    clear() {
      buffer = [];
      p.text('');
    },
  };
}

export interface Label {
  el: HTMLDivElement;
  /** Moves the label above a world point, with its text. */
  at(point: Vector3, text?: string): void;
  hide(): void;
}

export interface Labels {
  add(text?: string, color?: string): Label;
}

/** Labels pinned to world points through `camera.worldToScreenPoint`. */
export function labels(stage: Stage, camera: Camera): Labels {
  const layer = overlayLayer(stage);
  const screen = new Vector3();
  return {
    add(text = '', color = '#cfd6e4') {
      const el = document.createElement('div');
      el.style.cssText = `position:absolute;left:0;top:0;white-space:pre;font:${stage.preview ? 10 : 12}px ui-monospace,monospace;color:${color};text-shadow:0 0 3px #000,0 0 3px #000;transform:translate(-50%,-130%)`;
      el.textContent = text;
      layer.append(el);
      return {
        el,
        at(point, value) {
          camera.worldToScreenPoint(point, screen);
          const ratio = stage.canvas.width / Math.max(1, stage.canvas.clientWidth);
          el.style.display = '';
          el.style.left = `${screen.x / ratio}px`;
          el.style.top = `${screen.y / ratio}px`;
          if (value !== undefined && el.textContent !== value) el.textContent = value;
        },
        hide: () => void (el.style.display = 'none'),
      };
    },
  };
}

export interface Ghost {
  /** Puts the cursor at a canvas-relative position (0 to 1 each way). */
  move(x: number, y: number): void;
  press(down: boolean): void;
}

/** A fake mouse cursor for cards, which have no pointer of their own. */
export function ghost(stage: Stage): Ghost {
  const el = document.createElement('div');
  el.style.cssText =
    'position:absolute;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;border:2px solid #fff;pointer-events:none;box-shadow:0 0 6px #000;transition:background .12s,transform .12s';
  overlayLayer(stage).append(el);
  stage.own(() => el.remove());
  return {
    move(x, y) {
      el.style.left = `${x * stage.canvas.clientWidth}px`;
      el.style.top = `${y * stage.canvas.clientHeight}px`;
    },
    press(down) {
      el.style.background = down ? 'rgba(255,255,255,.85)' : 'transparent';
      el.style.transform = down ? 'scale(.8)' : 'scale(1)';
    },
  };
}
