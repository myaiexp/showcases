// App & engine config: the engine background colour
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer } from '../../shared/basics.ts';
import { color } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a background colour.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      fill: '#333',
    }),
  );
  leafer.add(Rect.one({ fill: GREEN, cornerRadius: 12 }, u(80), u(60), u(110), u(90)));

  if (stage.preview) stage.loop((_dt, t) => (leafer.fill = `hsl(${(t * 40) % 360}, 35%, 25%)`));
  else color(stage.bar!, 'fill', '#333333', (v) => (leafer.fill = v));

  return stage.dispose;
};

export default mount;
