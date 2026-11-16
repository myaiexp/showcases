// Animation: util.animateColor blends two colours, one rgba string a frame
import { Canvas, Circle, Color, Rect, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { color } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'animateColor needs no object. Here its onChange paints a swatch and, at 25% alpha, the canvas background; pick the colour to go to.',
  });
  const canvas = stage.own(new Canvas(stage.el, { backgroundColor: 'rgba(255,209,102,0.25)' }));
  const say = status(stage, '');

  const swatch = new Circle({ left: 180, top: 120, radius: 60, fill: '#ffd166', stroke: '#2b2b2b', strokeWidth: 4 });
  const strip = new Rect({ left: 180, top: 212, width: 280, height: 12, fill: '#2b2b2b' });
  canvas.add(swatch, strip);

  let at = '#ffd166';
  let current: ReturnType<typeof util.animateColor> | undefined;
  const go = (to: string): void => {
    current?.abort();
    current = util.animateColor({
      startValue: at,
      endValue: to,
      duration: 1200,
      onChange: (rgba, _valueProgress, time) => {
        at = rgba;
        canvas.backgroundColor = new Color(rgba).setAlpha(0.25).toRgba(); // rgba is a string like 'rgba(255,209,102,1)'
        swatch.set('fill', rgba);
        strip.set('width', 280 * time);
        canvas.requestRenderAll();
        say(rgba);
      },
    });
  };

  const goals = ['#06d6a0', '#ef476f', '#118ab2', '#ffd166'];
  let i = 0;
  go(goals[i]!);
  if (stage.preview) stage.every(1600, () => go(goals[++i % goals.length]!));
  else color(stage.bar!, 'go to', '#06d6a0', go);
  stage.onDispose(() => current?.abort());

  return stage.dispose;
};

export default mount;
