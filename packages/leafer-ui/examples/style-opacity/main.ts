// Basics: element opacity
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer } from '../../shared/basics.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the opacity slider.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const rect = new Rect({ x: u(100), y: u(50), width: u(120), height: u(120), fill: GREEN });
  leafer.add(rect);

  if (stage.preview) stage.loop((_dt, t) => (rect.opacity = 0.55 + Math.sin(t * 2.5) * 0.45));
  else slider(stage.bar!, 'opacity', 0, 1, 0.05, 1, (v) => (rect.opacity = v));

  return stage.dispose;
};

export default mount;
