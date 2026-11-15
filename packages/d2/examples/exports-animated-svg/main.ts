// Animated SVG: every board in one SVG, each held for animateInterval ms
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const source = `direction: right
build -> test

steps: {
  1: {
    test -> stage
  }
  2: {
    stage -> production
  }
  3: {
    production.style.fill: "#2e7d32"
  }
}`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200, target: '*' },
    interval: 6000,
    variants: [
      { label: 'animateInterval: 1200: each board stays 1.2 s', code: source, options: { animateInterval: 1200 } },
      { label: 'animateInterval: 400: the same boards, fast', code: source, options: { animateInterval: 400 } },
      { label: 'animateInterval: 3000: slow enough to read each step', code: source, options: { animateInterval: 3000 } },
    ],
  });
  return () => stage.dispose();
};

export default mount;
