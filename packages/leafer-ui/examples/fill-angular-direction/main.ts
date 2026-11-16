// Appearance: angular gradient control points
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { knobs } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Move the centre of the sweep." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.12 });
  leafer.add(rect);
  const p = { x: 0.3, y: 0.3 };
  const paint = (): void => {
    rect.fill = {
      type: 'angular',
      from: { type: 'percent', x: p.x, y: p.y },
      to: 'center',
      stops: [{ offset: 0, color: '#FF4B4B' }, { offset: 0.5, color: '#FEB027' }, { offset: 1, color: '#FF4B4B' }],
    };
  };
  knobs(stage, [
    { label: 'from.x', range: [0, 1, 0.01], value: 0.4, set: (v) => ((p.x = v), paint()), swing: 0.3 },
    { label: 'from.y', range: [0, 1, 0.01], value: 0.4, set: (v) => ((p.y = v), paint()), swing: 0.3 },
  ]);

  return stage.dispose;
};

export default mount;
