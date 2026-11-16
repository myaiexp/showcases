// Interaction: hoverStyle with a fill, a shadow and a transition
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/state';
import '@leafer-in/animate';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { hoverLoop } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Hover the rect." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.8;
  const p = mid(stage, S);
  const rect = new Rect({
    ...p,
    width: S,
    height: S,
    fill: 'rgba(50,205,121, 0.7)',
    cornerRadius: 30,
    transition: 0.25,
    hoverStyle: { fill: 'rgba(50,205,121, 1)', shadow: { x: 0, y: 8, blur: 16, color: '#00000066' } },
  });
  leafer.add(rect);
  if (stage.preview) hoverLoop(stage, leafer, { x: p.x + S / 2, y: p.y + S / 2 }, 1100);

  return stage.dispose;
};

export default mount;
