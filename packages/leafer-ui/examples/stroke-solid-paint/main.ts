// Appearance: stroke with a solid paint object and strokeWidth
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';
import { color } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Pick a stroke colour and width." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.12 });
  leafer.add(rect);
  const paint = { color: '#32cd79' };
  let width = 8;
  const apply = (): void => {
    rect.stroke = { type: 'solid', color: paint.color };
    rect.strokeWidth = width;
  };
  if (stage.bar) color(stage.bar, 'color', paint.color, (v) => ((paint.color = v), apply()));
  else stage.loop((_dt, t) => ((paint.color = 'hsl(' + Math.round((t * 40 + 150) % 360) + ', 70%, 45%)'), apply()));
  drive(stage, 'strokeWidth', [1, 24, 1], 8, (v) => ((width = v), apply()), 5);

  return stage.dispose;
};

export default mount;
