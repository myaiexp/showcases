// clone() returns a Promise in v7, and there is no util.object.clone any more
import { Canvas, Rect, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { codePanel } from '../../shared/code-panel.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['canvas', 'what clone() gives back'],
    scene: [200, 160],
    hint: 'The old guide pairs Object.clone with a static util.object.clone for plain objects. In v7 clone() is asynchronous (it can load images and patterns), so the value without await is a Promise, and util has no object namespace: copy plain data with structuredClone().',
  });
  const [pa, pb] = stage.panes as [(typeof stage.panes)[0], (typeof stage.panes)[0]];
  const canvas = stage.own(new Canvas(pa.el, { selection: false, skipTargetFind: true }), pa);
  const log = codePanel(pb, stage.preview);
  const rect = new Rect({ left: 70, top: 70, width: 70, height: 50, fill: '#cfe3ff', stroke: '#3b7dd8', strokeWidth: 3, angle: 10 });
  canvas.add(rect);
  const copies: Rect[] = [];

  const run = async (): Promise<void> => {
    const early = rect.clone(); // forgot await
    const lines = [
      'const copy = rect.clone()',
      `copy instanceof Rect      ${early instanceof Rect}`,
      `copy instanceof Promise   ${early instanceof Promise}`,
      `typeof copy.set           ${typeof (early as unknown as Rect).set}`,
      '',
      'const copy = await rect.clone()',
    ];
    log(lines.join('\n'));
    const copy = (await early) as Rect;
    if (stage.disposed || canvas.disposed) return;
    copy.set({ left: rect.left + 40 + copies.length * 14, top: rect.top + 25 + copies.length * 8, fill: '#ffd9d4', stroke: '#e94b3c' });
    canvas.add(copy);
    copies.push(copy);
    if (copies.length > 3) canvas.remove(copies.shift()!);
    canvas.requestRenderAll();
    log([...lines, `copy instanceof Rect      ${copy instanceof Rect}`, '', `util.object                ${typeof (util as unknown as Record<string, unknown>).object}`, `structuredClone({a:[1]})   ${JSON.stringify(structuredClone({ a: [1] }))}`].join('\n'));
  };
  void run();

  if (stage.bar) button(stage.bar, 'clone it', () => void run());
  else stage.every(1800, () => void run());
  return stage.dispose;
};

export default mount;
