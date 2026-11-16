// Appearance: fill with a solid paint object, colour and opacity
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/color'; // opacity needs it when the colour is a string
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';
import { color } from '../../shared/controls.ts';
import { stripes } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Pick a colour and slide the paint opacity." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  stripes(leafer, stage);
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.12 });
  leafer.add(rect);
  const paint = { color: '#32cd79', opacity: 1 };
  const apply = (): void => {
    rect.fill = { type: 'solid', color: paint.color, opacity: paint.opacity };
  };
  if (stage.bar) color(stage.bar, 'color', paint.color, (v) => ((paint.color = v), apply()));
  else stage.loop((_dt, t) => ((paint.color = 'hsl(' + Math.round((t * 40 + 150) % 360) + ', 70%, 55%)'), apply()));
  drive(stage, 'opacity', [0, 1, 0.05], 1, (v) => ((paint.opacity = v), apply()), 5);

  return stage.dispose;
};

export default mount;
