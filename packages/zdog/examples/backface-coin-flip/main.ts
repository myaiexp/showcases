// Coin flip: a flat coin with a different colour and symbol on each side
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select, slider } from '../../shared/controls.ts';

const SIDES = ['silver (a colour)', 'false (hidden)', 'true (same colour)'] as const;
type Side = (typeof SIDES)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Heads is gold with a star, tails is silver with a ring.' });
  const illo = new Zdog.Illustration({ element: stage.element, zoom: stage.zoom * 1.1, rotate: { y: -0.3 } });

  const hand = new Zdog.Anchor({ addTo: illo });
  // a Group keeps the coin face under its symbols
  const coin = new Zdog.Group({ addTo: hand });
  const disc = new Zdog.Ellipse({ addTo: coin, diameter: 120, stroke: 12, fill: true, color: '#EA0', backface: '#b8c4d4' });
  // heads: a star that hides when the coin shows its back
  new Zdog.Shape({
    addTo: coin, translate: { z: 8 }, closed: true, fill: true, stroke: 3, color: '#C25', backface: false,
    path: Array.from({ length: 10 }, (_, i) => {
      const a = (i / 10) * Zdog.TAU;
      const r = i % 2 === 0 ? 36 : 16;
      return { x: Math.sin(a) * r, y: -Math.cos(a) * r };
    }),
  });
  // tails: a ring on the far side, turned round so its front faces away
  new Zdog.Ellipse({ addTo: coin, translate: { z: -8 }, rotate: { y: Math.PI }, diameter: 60, stroke: 8, color: '#5b6b82', backface: false });
  new Zdog.Shape({ addTo: coin, translate: { z: -8 }, rotate: { y: Math.PI }, stroke: 14, color: '#5b6b82', backface: false });

  let side: Side = SIDES[0];
  let speed = 3;
  const apply = (): void => {
    disc.backface = side === SIDES[0] ? '#b8c4d4' : side === SIDES[1] ? false : true;
  };
  if (stage.bar) {
    select(stage.bar, 'disc backface', SIDES, (v) => { side = v; apply(); }, side);
    slider(stage.bar, 'flip speed', 0.5, 8, 0.1, speed, (v) => { speed = v; }, (v) => `${v.toFixed(1)} rad/s`);
  }

  stage.loop((dt, t) => {
    coin.rotate.x += dt * speed;
    // toss it up and let it come back down once per two turns
    hand.translate.y = -45 * Math.abs(Math.sin((coin.rotate.x / 2) % Math.PI)) + 20;
    if (stage.preview) illo.rotate.y = -0.3 + 0.3 * Math.sin(t);
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
