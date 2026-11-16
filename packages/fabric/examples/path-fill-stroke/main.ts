// A Path takes fill and stroke like any shape
import { Canvas, Path } from 'fabric';
import type { Mount } from '@/types.ts';
import { color, select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 220], hint: 'The pentagram crosses itself, so the middle is where the two fill rules disagree: nonzero fills it, evenodd leaves a hole.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const star = new Path('M 100 0 L 38 190 L 188 70 L 12 70 L 162 190 Z', { left: 150, top: 110, fill: '#f2b134', stroke: '#3b2a8c', strokeWidth: 4, strokeLineJoin: 'round', opacity: 1 });
  canvas.add(star);

  const apply = (p: Partial<Pick<Path, 'fill' | 'stroke' | 'strokeWidth' | 'opacity' | 'fillRule'>>): void => {
    star.set(p);
    say(`fillRule ${star.fillRule}\nstrokeWidth ${star.strokeWidth.toFixed(0)} · opacity ${star.opacity.toFixed(2)}`);
    canvas.requestRenderAll();
  };
  apply({});
  if (stage.bar) {
    color(stage.bar, 'fill', '#f2b134', (fill) => apply({ fill }));
    color(stage.bar, 'stroke', '#3b2a8c', (stroke) => apply({ stroke }));
    slider(stage.bar, 'strokeWidth', 0, 16, 1, 4, (strokeWidth) => apply({ strokeWidth }));
    slider(stage.bar, 'opacity', 0.1, 1, 0.05, 1, (opacity) => apply({ opacity }), (v) => v.toFixed(2));
    select(stage.bar, 'fillRule', ['nonzero', 'evenodd'], (fillRule) => apply({ fillRule }));
  } else {
    stage.loop((_dt, t) => apply({ fillRule: Math.sin(t * 0.9) > 0 ? 'evenodd' : 'nonzero', strokeWidth: 8 + 6 * Math.sin(t * 1.6), opacity: 0.7 + 0.3 * Math.sin(t * 2) }));
  }

  return stage.dispose;
};

export default mount;
