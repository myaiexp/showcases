// Appearance: switching the blendMode of the top rect
import { Leafer, Rect, type IBlendMode } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, pick } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Pick a blendMode for the green shape." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const s = size(stage) * 0.7;
  const x0 = (stage.width - s * 1.5) / 2;
  const y0 = (stage.height - s * 1.5) / 2 - 8;
  const rect1 = new Rect({ x: x0, y: y0, width: s, height: s, fill: '#FF4B4B', cornerRadius: s * 0.2 });
  const rect2 = new Rect({ x: x0 + s / 2, y: y0 + s / 2, width: s, height: s, fill: '#32cd79', cornerRadius: s * 0.5 });
  leafer.add([rect1, rect2]);
  const say = label(stage, '', true);
  const modes: IBlendMode[] = [
    'pass-through', 'normal', 'multiply', 'darken', 'color-burn', 'lighten', 'color-dodge', 'screen', 'overlay',
    'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity',
    'source-over', 'source-in', 'source-out', 'source-atop', 'destination-over', 'destination-in', 'destination-out',
    'destination-atop', 'xor', 'copy',
  ];
  pick(stage, 'blendMode', modes, (m) => {
    rect2.blendMode = m;
    say("rect2.blendMode = '" + m + "'");
  }, 1100, 'multiply');

  return stage.dispose;
};

export default mount;
