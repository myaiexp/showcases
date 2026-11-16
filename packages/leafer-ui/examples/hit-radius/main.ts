// Interaction: hitRadius on a thin Line makes it easier to hover
import { Leafer, Line, PointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { label, GREEN } from '../../shared/basics.ts';
import { slider } from '../../shared/controls.ts';
import { tour } from '../../shared/interaction-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Move near the line (not on it) and raise hitRadius until it turns red." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const W = stage.width * 0.7;
  const y = stage.height / 2 - 12;
  const line = new Line({ x: (stage.width - W) / 2, y, width: W, stroke: GREEN, strokeWidth: 3, hitRadius: 0 });
  leafer.add(line);
  const say = label(stage, '', true);
  const show = (): void => say('hitRadius = ' + line.hitRadius + '\nhover: ' + (line.stroke !== GREEN ? 'yes' : 'no'));
  line.on(PointerEvent.ENTER, () => ((line.stroke = '#FF4B4B'), show()));
  line.on(PointerEvent.LEAVE, () => ((line.stroke = GREEN), show()));
  const setRadius = (r: number): void => {
    line.hitRadius = r;
    show();
  };
  setRadius(0);
  if (stage.bar) slider(stage.bar, 'hitRadius', 0, 40, 1, 0, setRadius);
  else {
    const ghost = stage.ghost(leafer);
    const at = { x: stage.width / 2, y: y + 14 };
    tour(stage, [0, 24], async (r) => {
      setRadius(r);
      ghost.leave();
      await stage.wait(500);
      await ghost.glide(at.x, at.y, 500);
      await stage.wait(1100);
      show();
      await stage.wait(500);
    });
  }

  return stage.dispose;
};

export default mount;
