// Animate: rect.animate with a style and options, easing from a list
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { pick } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { GREEN } from '../../shared/event-kit.ts';

const EASINGS = ['ease', 'linear', 'ease-in-out', 'back-out', 'elastic-out', 'bounce-out'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick an easing: the rect swings across and back with rect.animate(style, { easing, swing }).' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const s = stage.preview ? 56 : 80;
  const rect = new Rect({ x: 20, y: (stage.height - s) / 2, width: s, height: s, cornerRadius: 12, fill: GREEN });
  leafer.add(rect);
  const say = label(stage, '', true);

  pick(stage, 'easing', EASINGS, (easing) => {
    rect.killAnimate();
    rect.x = 20;
    rect.animate({ x: stage.width - s - 20, fill: '#feb027' }, { easing, duration: 1.4, swing: true });
    say(`rect.animate({ x, fill }, { easing: '${easing}', swing: true })`);
  }, 3200);
  return stage.dispose;
};

export default mount;
