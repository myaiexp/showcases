// originUpdaterWrapper: load v6 data at its drawn position
import { Canvas, Rect } from 'fabric';
import { originUpdaterWrapper } from 'fabric/extensions';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

// What a v6 export looks like when it left the default origin out: left/top meant the TOP-LEFT corner.
const oldData = (angle: number): Record<string, unknown> => ({
  type: 'Rect', version: '6.0.0', left: 30, top: 40, width: 100, height: 60, angle,
  fill: '#cfe3ff', stroke: '#3b7dd8', strokeWidth: 3,
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['Rect.fromObject(old)', 'originUpdaterWrapper(Rect.fromObject)'],
    scene: [200, 180],
    hint: 'Old data says left: 30, top: 40 and leaves the origin out, because in v6 it was always the top-left corner. v7 reads it as the centre, so the plain load lands in the wrong place. The wrapper takes the old default (left, top), loads, then moves the object so its corner is where the dashed outline is.',
  });
  const [pa, pb] = stage.panes as [(typeof stage.panes)[0], (typeof stage.panes)[0]];
  const plain = stage.own(new Canvas(pa.el, { selection: false, skipTargetFind: true }), pa);
  const fixed = stage.own(new Canvas(pb.el, { selection: false, skipTargetFind: true }), pb);
  const say = briefStatus(stage, pb);

  // The wrapper is a plain function: nothing page-wide is changed. Call it with the class as `this`.
  const fromObject = Rect.fromObject as unknown as (data: object) => Promise<Rect>; // typed wider than Rect
  const fromOld = originUpdaterWrapper<Rect>(fromObject, 'left', 'top');

  // where the old library drew it: top-left corner at (30, 40), turned about that corner
  const target = (angle: number): Rect => new Rect({ angle, originX: 'left', originY: 'top', left: 30, top: 40, width: 100, height: 60, fill: '', stroke: '#e94b3c', strokeWidth: 1, strokeDashArray: [4, 3], selectable: false, evented: false });

  let token = 0;
  const load = async (angle: number): Promise<void> => {
    const mine = ++token;
    const [a, b] = await Promise.all([fromObject.call(Rect, oldData(angle)), fromOld.call(Rect, oldData(angle))]);
    if (stage.disposed || mine !== token) return;
    for (const [c, r] of [[plain, a], [fixed, b]] as const) {
      c.clear();
      c.add(target(angle), r);
      c.requestRenderAll();
    }
    say(`origin ${b.originX}/${b.originY}\nleft ${Math.round(b.left)} top ${Math.round(b.top)}`);
  };
  void load(0);

  if (stage.bar) slider(stage.bar, 'angle in the data', -90, 90, 5, 0, (v) => void load(v), (v) => `${v}°`);
  else {
    let i = 0;
    stage.every(1300, () => void load([0, 20, -20, 40][++i % 4]!));
  }
  return stage.dispose;
};

export default mount;
