// Point: measuring from one point to another
import { Leafer, Point } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { pin, seg, xy } from '../../shared/math-kit.ts';
import { probe } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The blue point is fixed. Move the pointer: the numbers are what the Point methods return for it.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const a = new Point(stage.width * 0.3, stage.height * 0.5);
  const base = seg(leafer, '#4B8BFF', 2);
  const ref = seg(leafer, '#ccc', 1.5, [4, 4]);
  const pa = pin(leafer, '#4B8BFF', 6);
  const mid = pin(leafer, '#32cd79', 5);
  const say = label(stage, '', true);
  pa.set(a, 'a');

  probe(stage, leafer, (b) => {
    base.set(a, b);
    ref.set(a, { x: a.x + stage.width * 0.4, y: a.y });
    const center = a.getCenter(b);
    mid.set(center, 'center');
    say(
      [
        `a.getAngle(b)       ${a.getAngle(b).toFixed(1)}`,
        `a.getAtan2(b)       ${a.getAtan2(b).toFixed(3)} rad`,
        `a.getRotation(a, b) ${a.getRotation(a, b).toFixed(1)}`,
        `a.getDistance(b)    ${a.getDistance(b).toFixed(1)}`,
        `a.getCenter(b)      ${xy(center)}`,
      ].join('\n'),
    );
  });
  return stage.dispose;
};

export default mount;
