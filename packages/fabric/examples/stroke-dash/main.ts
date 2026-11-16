// strokeDashArray cuts the outline into dashes, strokeDashOffset slides them
import { Canvas, Circle, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const PATTERNS = { '10, 6': [10, 6], '2, 6 (dots)': [2, 6], '18, 6, 3, 6': [18, 6, 3, 6], none: [] } as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: 'Dashes alternate drawn and gap lengths; strokeDashOffset shifts where the pattern starts. Tick "march" to animate it.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const props = { stroke: '#2e5fa8', strokeWidth: 5, fill: 'transparent', strokeLineCap: 'round' as const };
  const rect = new Rect({ left: 90, top: 100, width: 100, height: 100, strokeDashArray: [10, 6], ...props });
  const circle = new Circle({ left: 210, top: 100, radius: 50, strokeDashArray: [10, 6], ...props });
  canvas.add(rect, circle);

  const offset = (v: number): void => {
    rect.set('strokeDashOffset', v);
    circle.set('strokeDashOffset', v);
    say(`dash [${(rect.strokeDashArray ?? []).join(', ')}]\nstrokeDashOffset ${v.toFixed(1)}`);
    canvas.requestRenderAll();
  };
  let march = stage.preview;
  let off = 0;
  if (stage.bar) {
    select(stage.bar, 'strokeDashArray', Object.keys(PATTERNS) as (keyof typeof PATTERNS)[], (k) => {
      rect.set('strokeDashArray', [...PATTERNS[k]]);
      circle.set('strokeDashArray', [...PATTERNS[k]]);
      offset(off);
    });
    const range = slider(stage.bar, 'strokeDashOffset', 0, 40, 0.5, 0, (v) => offset((off = v)));
    checkbox(stage.bar, 'march', false, (v) => {
      march = v;
      if (!v) offset((off = Number(range.value)));
    });
  }
  offset(0);
  stage.loop((_dt, t) => {
    if (march) offset((off = (t * 30) % 40));
  });

  return stage.dispose;
};

export default mount;
