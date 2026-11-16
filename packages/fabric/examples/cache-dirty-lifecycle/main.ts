// Which set() calls mark an object dirty, and which only move it
import { Canvas, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus, codePanel } from '../../shared/code-panel.ts';
import { button, select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

// One new value per property; each is tried on a fresh Rect that never reaches a canvas.
const TRIES: Record<string, unknown> = {
  fill: '#e94b3c', stroke: '#2b2a33', strokeWidth: 8, width: 120, height: 70, rx: 18,
  paintFirst: 'stroke', backgroundColor: '#ffe9a8', strokeDashArray: [6, 4],
  left: 120, top: 90, angle: 30, scaleX: 1.4, skewX: 12, flipX: true, opacity: 0.5,
};

function dirtyAfterSet(prop: string): boolean {
  const probe = new Rect({ width: 80, height: 50 });
  probe.dirty = false; // as after a render
  probe.set(prop, TRIES[prop]);
  return probe.dirty;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['the object', 'does set(prop, value) set dirty?'],
    scene: [200, 200],
    hint: 'dirty means the cache is stale and is repainted at the next render. Only the properties in cacheProperties (what changes the picture inside the cache) flip it; position, angle and scale just move the cached bitmap.',
  });
  const [pa, pb] = stage.panes as [(typeof stage.panes)[0], (typeof stage.panes)[0]];
  const canvas = stage.own(new Canvas(pa.el, { selection: false, skipTargetFind: true }), pa);
  const table = codePanel(pb, stage.preview);
  const say = briefStatus(stage, pa);

  const rect = new Rect({ left: 100, top: 100, width: 80, height: 50, fill: '#cfe3ff', stroke: '#3b7dd8', strokeWidth: 3 });
  canvas.add(rect);

  const names = Object.keys(TRIES);
  const rows = names.map((k) => `${k.padEnd(16)}${dirtyAfterSet(k) ? 'dirty: true  (repaint)' : 'dirty: false (reuse)'}`);
  const show = (hot: number): void =>
    table(rows.map((r, i) => `${i === hot ? '> ' : '  '}${r}`).join('\n'));
  show(-1);

  // Apply one property to the visible rect and report dirty before and after the render.
  const apply = (prop: string): void => {
    rect.dirty = false;
    rect.set(prop, TRIES[prop]);
    const flagged = rect.dirty;
    canvas.renderAll();
    say(`set('${prop}') → dirty ${flagged}, after render ${rect.dirty}`);
  };
  const reset = (): void => {
    rect.set({ left: 100, top: 100, width: 80, height: 50, rx: 0, angle: 0, scaleX: 1, skewX: 0, flipX: false, opacity: 1, fill: '#cfe3ff', stroke: '#3b7dd8', strokeWidth: 3, paintFirst: 'fill', backgroundColor: '', strokeDashArray: null });
  };

  if (stage.bar) {
    const pick = select(stage.bar, 'property', names, () => undefined, 'fill');
    button(stage.bar, 'set it', () => {
      apply(pick.value);
      show(names.indexOf(pick.value));
    });
    button(stage.bar, 'reset', () => {
      reset();
      canvas.renderAll();
      show(-1);
    });
  } else {
    let i = 0;
    stage.every(1100, () => {
      if (i % names.length === 0) reset();
      const k = names[i++ % names.length]!;
      apply(k);
      show(names.indexOf(k));
    });
  }
  return stage.dispose;
};

export default mount;
