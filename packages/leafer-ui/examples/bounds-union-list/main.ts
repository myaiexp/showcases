// Bounds: the union of several boxes
import { Bounds, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox } from '../../shared/controls.ts';
import { label } from '../../shared/basics.ts';
import { cornersOf, f1, outlineOf } from '../../shared/math-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tick or untick rects: the union Bounds is rebuilt with setList() and drawn dashed.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const { width: w, height: h } = stage;
  const boxes = [
    { x: w * 0.1, y: h * 0.2, width: w * 0.2, height: h * 0.25 },
    { x: w * 0.4, y: h * 0.45, width: w * 0.18, height: h * 0.3 },
    { x: w * 0.62, y: h * 0.15, width: w * 0.2, height: h * 0.2 },
    { x: w * 0.25, y: h * 0.68, width: w * 0.15, height: h * 0.15 },
  ];
  const colors = ['#32cd79', '#4B8BFF', '#feb027', '#ff4b4b'];
  const rects = boxes.map((b, i) => new Rect({ ...b, fill: colors[i], cornerRadius: 6, hittable: false }));
  leafer.add(rects);
  const frame = outlineOf(leafer, '#444');
  const say = label(stage, '', true);

  const on = [true, true, true, false];
  const run = (): void => {
    const list = boxes.filter((_, i) => on[i]);
    rects.forEach((r, i) => (r.opacity = on[i] ? 1 : 0.25));
    if (!list.length) return say('empty list');
    const union = new Bounds().setList(list);
    frame.set(cornersOf(union));
    say(`new Bounds().setList([${list.length} boxes])  ->  ${f1(union.width)} x ${f1(union.height)}`);
  };
  run();
  if (stage.bar) boxes.forEach((_, i) => checkbox(stage.bar!, `rect ${i + 1}`, on[i]!, (v) => ((on[i] = v), run())));
  else {
    let i = 0;
    stage.every(1100, () => {
      on[i % 4] = !on[i % 4];
      if (!on.some(Boolean)) on[0] = true;
      i++;
      run();
    });
  }
  return stage.dispose;
};

export default mount;
