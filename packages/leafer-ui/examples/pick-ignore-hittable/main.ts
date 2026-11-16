// pick: reaching an element that opted out of hit testing
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { toggle } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { probe } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The top square has hittable: false. Toggle ignoreHittable to let pick() see it anyway.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const w = stage.width;
  const h = stage.height;
  const s = Math.min(h * 0.6, w * 0.45);
  const below = new Rect({ name: 'below', x: w * 0.1, y: h * 0.14, width: s * 1.6, height: s * 1.3, fill: '#4B8BFF', cornerRadius: 8 });
  const ghost = new Rect({ name: 'ghost (hittable: false)', x: w * 0.3, y: h * 0.25, width: s * 1.5, height: s, fill: 'rgba(254,176,39,0.75)', cornerRadius: 8, hittable: false });
  leafer.add([below, ghost]);
  const say = label(stage, '', true);

  let ignore = false;
  let at = { x: w / 2, y: h / 2 };
  const check = (): void => {
    const hit = leafer.pick(at, { ignoreHittable: ignore });
    below.opacity = hit.target === below ? 1 : 0.5;
    ghost.opacity = hit.target === ghost ? 1 : 0.6;
    say(`pick(point, { ignoreHittable: ${ignore} }) -> ${hit.target?.name || 'nothing'}`);
  };
  probe(stage, leafer, (p) => ((at = p), check()));
  toggle(stage, 'ignoreHittable', false, (v) => ((ignore = v), check()), 2800);
  return stage.dispose;
};

export default mount;
