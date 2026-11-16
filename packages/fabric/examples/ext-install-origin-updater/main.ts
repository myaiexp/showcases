// installOriginWrapperUpdater around a single loadFromJSON
import { BaseFabricObject, Canvas, FabricImage, Group, Rect } from 'fabric';
import { installOriginWrapperUpdater } from 'fabric/extensions';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { createStage } from '../../shared/stage.ts';

// A whole v6 canvas export saved without origins: every left/top is a top-left corner.
const OLD_CANVAS = {
  version: '6.0.0',
  objects: [
    { type: 'Rect', left: 20, top: 30, width: 60, height: 40, fill: '#cfe3ff', stroke: '#3b7dd8', strokeWidth: 2 },
    { type: 'Circle', left: 100, top: 25, radius: 25, fill: '#ffd9d4', stroke: '#e94b3c', strokeWidth: 2 },
    { type: 'Triangle', left: 30, top: 100, width: 60, height: 50, fill: '#d6f0e0', stroke: '#2e9e5b', strokeWidth: 2 },
    { type: 'Rect', left: 110, top: 95, width: 60, height: 50, angle: 25, fill: '#ffe9a8', stroke: '#d99a1c', strokeWidth: 2 },
  ],
};

// Where the install writes: restored after the call so nothing else on the page sees the wrapper.
const TARGETS: [Record<string, unknown>, string][] = [
  [BaseFabricObject as unknown as Record<string, unknown>, '_fromObject'],
  [FabricImage as unknown as Record<string, unknown>, 'fromObject'],
  [Group as unknown as Record<string, unknown>, 'fromObject'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['loadFromJSON(old)', 'after installOriginWrapperUpdater()'],
    scene: [200, 180],
    hint: 'The same v6 canvas JSON loaded twice. The install call replaces fromObject on BaseFabricObject, FabricImage and Group for the whole page, so the example puts the originals back right after starting the second load (the wrapped functions are already captured by then).',
  });
  const [pa, pb] = stage.panes as [(typeof stage.panes)[0], (typeof stage.panes)[0]];
  const plain = stage.own(new Canvas(pa.el, { selection: false, skipTargetFind: true }), pa);
  const fixed = stage.own(new Canvas(pb.el, { selection: false, skipTargetFind: true }), pb);
  const say = briefStatus(stage, pb);
  const fresh = (): typeof OLD_CANVAS => structuredClone(OLD_CANVAS); // the wrapper edits the objects it is given

  // dashed outlines of the corners the old data meant, drawn the same in both panes
  const marks = (c: Canvas): void => {
    for (const o of OLD_CANVAS.objects) {
      if (o.type !== 'Rect' || o.angle) continue;
      c.add(new Rect({ originX: 'left', originY: 'top', left: o.left, top: o.top, width: o.width, height: o.height, fill: '', stroke: '#999', strokeWidth: 1, strokeDashArray: [3, 3], selectable: false, evented: false }));
    }
  };

  const run = async (): Promise<void> => {
    await plain.loadFromJSON(fresh());
    if (stage.disposed) return;
    const saved = TARGETS.map(([k, name]) => k[name]);
    let pending: Promise<unknown>;
    installOriginWrapperUpdater();
    try {
      pending = fixed.loadFromJSON(fresh());
    } finally {
      TARGETS.forEach(([k, name], i) => (k[name] = saved[i]));
    }
    await pending;
    if (stage.disposed) return;
    for (const c of [plain, fixed]) {
      marks(c);
      c.requestRenderAll();
    }
    say(`${fixed.getObjects().length - 1} objects\nrestored the page`);
  };
  void run();
  return stage.dispose;
};

export default mount;
