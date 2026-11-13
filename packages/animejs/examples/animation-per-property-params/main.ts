// Tween parameters set per property: x, rotate and scale each get their own delay, duration and ease
import { animate, type JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import { h, slider } from './dom.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const stage = h('div', 'stage', '', el);
  const lane = h('div', 'lane', '', stage);
  const sq = h('div', 'sq', '', lane);
  const legend = h('pre', 'legend', '', stage);

  const cfg = { rotateDelay: 1000, rotateDuration: 1500 };
  let anim: JSAnimation | undefined;

  const build = (): void => {
    anim?.revert();
    legend.textContent =
      `global: delay 500, duration 3000\n` +
      `x: inherits both, ease 'outCubic'\n` +
      `rotate: delay ${cfg.rotateDelay}, duration ${cfg.rotateDuration}, ease 'inOutQuad'\n` +
      `scale: duration 800, ease 'outElastic'`;
    anim = animate(sq, {
      x: { to: 280, ease: 'outCubic' },
      rotate: { to: 360, delay: cfg.rotateDelay, duration: cfg.rotateDuration, ease: 'inOutQuad' },
      scale: { to: 1.5, duration: 800, ease: 'outElastic' },
      delay: 500,
      duration: 3000,
      loop: true,
      alternate: true,
    });
  };
  build();

  if (!preview) {
    const controls = h('div', 'controls', '', stage);
    slider(controls, 'rotate delay', 0, 2000, cfg.rotateDelay, 50, (v) => {
      cfg.rotateDelay = v;
      build();
    });
    slider(controls, 'rotate duration', 200, 3000, cfg.rotateDuration, 100, (v) => {
      cfg.rotateDuration = v;
      build();
    });
  }

  return () => anim?.revert();
};

export default mount;
