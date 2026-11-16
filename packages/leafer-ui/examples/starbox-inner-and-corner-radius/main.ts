// StarBox: innerRadius and cornerRadius together
import { Leafer, Ellipse } from 'leafer-ui';
import { StarBox } from '@leafer-in/box';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Deeper notches and rounder points.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const k = S / 100;
  const box = new StarBox({ ...mid(stage, S * 1.3), width: S, height: S, corners: 6, fill: '#FF4B4B' });
  const circle = new Ellipse({ x: 60 * k, y: 60 * k, width: 50 * k, height: 50 * k, fill: '#FEB027' });
  leafer.add(box);
  box.add(circle);

  if (stage.bar) {
    slider(stage.bar, 'innerRadius', 0.1, 0.9, 0.05, 0.5, (v) => (box.innerRadius = v));
    slider(stage.bar, 'cornerRadius', 0, 20, 1, 5, (v) => (box.cornerRadius = v));
    box.set({ innerRadius: 0.5, cornerRadius: 5 });
  } else {
    stage.loop((_dt, t) => {
      box.innerRadius = 0.5 + 0.3 * Math.sin(t * 1.2);
      box.cornerRadius = Math.round(8 + 8 * Math.sin(t * 0.8 + 1));
    });
  }

  return stage.dispose;
};

export default mount;
