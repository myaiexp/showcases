// Basics: a Line with a width, stroke and strokeWidth
import { Leafer, Line } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A 100 px line, 5 px thick.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const line = new Line({
    x: u(60),
    y: u(100),
    width: u(140),
    strokeWidth: 5,
    stroke: GREEN,
  });
  leafer.add(line);

  if (stage.preview) stage.loop((_dt, t) => (line.rotation = Math.sin(t * 1.5) * 25));

  return stage.dispose;
};

export default mount;
