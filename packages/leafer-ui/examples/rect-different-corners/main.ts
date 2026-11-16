// Rect: a radius per corner
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each slider sets one entry of the cornerRadius array.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const radius = [0, 40, 20, 40];
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, fill: '#32cd79', cornerRadius: [...radius] });
  leafer.add(rect);
  const names = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'];
  if (stage.bar) {
    names.forEach((n, i) => slider(stage.bar!, n, 0, 100, 1, radius[i]!, (v) => {
      radius[i] = v;
      rect.cornerRadius = [...radius];
    }));
  } else {
    stage.loop((_dt, t) => {
      rect.cornerRadius = radius.map((r, i) => Math.round(r + 30 * Math.sin(t * 1.6 + i * 1.5) + 30));
    });
  }

  return stage.dispose;
};

export default mount;
