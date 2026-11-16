// Layout: getWorldBounds turns inner bounds into world bounds
import { Group, Leafer, Rect } from 'leafer-ui';
import type { IBoundsData } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, toggle } from '../../shared/shapes.ts';
import { box, outline } from '../../shared/layout-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The blue rect is inner bounds of the rotated, scaled group. getWorldBounds gives the axis-aligned box around it on the canvas (dashed).' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.45;
  const group = new Group({ x: stage.width / 2 - S * 0.5, y: 16, rotation: 20, scale: 1.2 });
  const inner = { x: 0, y: 0, width: S, height: S * 0.6 };
  group.add(new Rect({ ...inner, fill: '#4B8BFF', hittable: false }));
  leafer.add(group);
  const guide = outline(leafer);
  const show = label(stage, '', true);
  let change = false;
  const run = (): void => {
    const input: IBoundsData = { ...inner };
    const out = group.getWorldBounds(input, undefined, change);
    guide.show(out);
    show(`group.getWorldBounds(inner, undefined, ${change})\ninput after the call  ${box(input)}\nresult                 ${box(out)}`);
  };
  toggle(stage, 'change: modify the input', change, (v) => ((change = v), run()), 2400);
  run();

  return stage.dispose;
};

export default mount;
