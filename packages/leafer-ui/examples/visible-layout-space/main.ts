// Appearance: visible false versus visible 0 inside a Flow
import { Leafer, Box } from 'leafer-ui';
import { Flow } from '@leafer-in/flow'; // auto layout, so space is visible
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { pick, size } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Switch the middle box between true, false and 0." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const s = size(stage) * 0.4;
  const colors = ['#FF4B4B', '#FEB027', '#79CB4D'];
  const boxes = colors.map((fill) => new Box({ width: s, height: s, fill, cornerRadius: 8 }));
  const flow = new Flow({
    x: stage.width / 2 - (s * 3 + 24) / 2,
    y: stage.height / 2 - s / 2 - 10,
    flow: 'x',
    gap: 12,
    children: boxes,
  });
  leafer.add(flow);

  const say = label(stage, '', true);
  pick(stage, 'visible', ['true', 'false', '0'], (v) => {
    boxes[1]!.visible = v === 'true' ? true : v === 'false' ? false : 0;
    say('middle box.visible = ' + v);
  }, 1800);

  return stage.dispose;
};

export default mount;
