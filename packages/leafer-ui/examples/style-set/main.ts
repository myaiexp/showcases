// Basics: simple update with set()
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Several properties change in one set() call.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const rect = new Rect({
    x: u(100),
    y: u(50),
    width: u(120),
    height: u(120),
    stroke: GREEN,
    strokeWidth: 2,
    dashPattern: [6, 6],
  });
  leafer.add(rect);

  let changed = false;
  stage.every(1000, () => {
    changed = !changed;
    rect.set(changed ? { stroke: 'blue', strokeWidth: 4 } : { stroke: GREEN, strokeWidth: 2 });
  });

  return stage.dispose;
};

export default mount;
