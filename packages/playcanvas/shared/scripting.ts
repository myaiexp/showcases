// Scripting chapter: a lifecycle log panel and a coloured-box helper
import * as pc from 'playcanvas';
import type { MountContext } from '@/types.ts';
import { addShape, material } from './components.ts';

export interface Log {
  /** Appends a line; the oldest scrolls off after `lines` entries. No-op in a card. */
  log(text: string): void;
  clear(): void;
}

/** A monospace log under the canvas for the full view; in a card it does nothing. */
export function createLog(el: HTMLElement, { preview }: MountContext, lines = 9): Log {
  if (preview) return { log() {}, clear() {} };
  const box = document.createElement('div');
  Object.assign(box.style, {
    width: '100%',
    boxSizing: 'border-box',
    height: `${lines * 1.35 + 1}em`,
    overflow: 'hidden',
    padding: 'var(--space-2) var(--space-3)',
    background: 'var(--bg)',
    color: 'var(--fg-2)',
    fontFamily: 'ui-monospace, monospace',
    fontSize: '0.78rem',
    lineHeight: '1.35',
    whiteSpace: 'pre',
  });
  el.append(box);
  return {
    log(text) {
      const row = document.createElement('div');
      row.textContent = text;
      box.append(row);
      while (box.childElementCount > lines) box.firstElementChild!.remove();
    },
    clear() {
      box.replaceChildren();
    },
  };
}

/** A coloured box entity added to `parent`, named after what it shows. */
export function addBox(parent: pc.GraphNode, name: string, colour: string, position: [number, number, number], size = 1): pc.Entity {
  return addShape(parent, 'box', material(colour), position, size, name);
}

/** Sets a box's diffuse colour from a CSS string or Color; the material is the entity's own. */
export function tint(entity: pc.Entity, colour: string | pc.Color): void {
  const mat = entity.render!.meshInstances[0]!.material as pc.StandardMaterial;
  mat.diffuse = typeof colour === 'string' ? new pc.Color().fromString(colour) : colour.clone();
  mat.update();
}
