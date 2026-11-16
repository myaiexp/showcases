// Appearance: image fit mode with padding, optionally repeated
import { Leafer, Rect } from 'leafer-ui';
import { photo } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive, toggle } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Change the padding and turn repeat on." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = Math.min(stage.width * 0.8, stage.height * 0.9);
  const rect = new Rect({ x: (stage.width - S) / 2, y: (stage.height - S) / 2 - 6, width: S, height: S, stroke: '#0003' });
  leafer.add(rect);
  let padding = 10;
  let repeat = false;
  const paint = (): void => {
    rect.fill = { type: 'image', url: photo(), mode: 'fit', padding, repeat };
  };
  drive(stage, 'padding', [0, S / 3, 1], 10, (v) => ((padding = v), paint()), 5);
  toggle(stage, 'repeat', false, (v) => ((repeat = v), paint()), 3000);

  return stage.dispose;
};

export default mount;
