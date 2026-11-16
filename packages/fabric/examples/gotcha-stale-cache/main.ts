// A direct fill assignment does not repaint a cached object
import { Canvas, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { caption } from '../../shared/custom.ts';

const COLORS = ['#e94b3c', '#3b7dd8', '#2e9e5b', '#d99a1c'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [320, 200],
    hint: 'Each tick all three rectangles get a new colour. set("fill") knows the property is in cacheProperties and marks the object dirty. A plain assignment does not, so the cached bitmap is drawn again unchanged. The third one assigns and sets dirty = true by hand; turn objectCaching off and the plain assignment works too.',
  });
  const canvas = stage.own(new Canvas(stage.el, { selection: false, skipTargetFind: true }));
  const mk = (x: number): Rect => new Rect({ left: x, top: 90, width: 70, height: 70, fill: '#bbbbbb', stroke: '#2b2a33', strokeWidth: 2 });
  const [viaSet, assigned, withDirty] = [mk(60), mk(160), mk(260)] as const;
  canvas.add(
    viaSet, assigned, withDirty,
    caption("set('fill')", 60, 150, 11),
    caption('fill =', 160, 150, 11),
    caption('fill = + dirty', 260, 150, 11),
  );

  let i = 0;
  const recolour = (): void => {
    const c = COLORS[i++ % COLORS.length]!;
    viaSet.set('fill', c);
    assigned.fill = c;
    withDirty.fill = c;
    withDirty.dirty = true;
    canvas.requestRenderAll();
  };
  recolour();
  stage.every(1300, recolour);

  if (stage.bar) {
    checkbox(stage.bar, 'objectCaching', true, (v) => {
      for (const r of [viaSet, assigned, withDirty]) r.set('objectCaching', v);
      canvas.requestRenderAll();
    });
  }
  return stage.dispose;
};

export default mount;
