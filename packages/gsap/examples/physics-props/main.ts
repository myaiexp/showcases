// PhysicsPropsPlugin: balls driven by velocity, acceleration and friction instead of end values, then reversed
import { gsap } from 'gsap';
import { PhysicsPropsPlugin } from 'gsap/PhysicsPropsPlugin';
import { btn, h, slider } from '../../shared/ui.ts';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(PhysicsPropsPlugin);

const mount: Mount = (el, { preview }) => {
  const stage = h('div', preview ? 'stage small' : 'stage');
  const lane = (label: string, tall = false): HTMLElement => {
    const row = h('div', tall ? 'lane tall' : 'lane', '', stage);
    h('span', 'tag', label, row);
    return h('div', 'ball', '', row);
  };
  const cfg = { friction: 0.08, velocity: 150 };
  const a = lane('velocity');
  const b = lane('velocity + acceleration');
  const c = lane('velocity + friction');
  const d = lane('x velocity, y velocity + acceleration', true);
  el.append(stage);

  const k = preview ? 0.5 : 1; // the card's lanes are shorter
  let tl: gsap.core.Timeline | undefined;
  const rebuild = (): void => {
    tl?.kill();
    gsap.set([a, b, c, d], { x: 0, y: 0 });
    // Created from a plain function (not in a context) and killed by handle.
    // yoyo + repeat: because physics tweens are reversible, the balls retrace their steps.
    tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.4, defaults: { duration: 2 } });
    // x grows by velocity * time. Easing is ignored for physicsProps.
    tl.to(a, { physicsProps: { x: { velocity: cfg.velocity } } }, 0);
    tl.to(b, { physicsProps: { x: { velocity: 60, acceleration: 120 } } }, 0);
    // friction between 0 and 1 slows the motion each step
    tl.to(c, { physicsProps: { x: { velocity: cfg.velocity * 4.5, friction: cfg.friction } } }, 0);
    // upward velocity with downward acceleration draws an arc
    tl.to(d, { physicsProps: { x: { velocity: 120 }, y: { velocity: -240 * k, acceleration: 240 * k } } }, 0);
  };
  rebuild();

  if (!preview) {
    const controls = h('div', 'controls');
    slider('velocity', 50, 200, 5, cfg.velocity, (v) => { cfg.velocity = v; rebuild(); }, controls);
    slider('friction', 0.01, 0.2, 0.01, cfg.friction, (v) => { cfg.friction = v; rebuild(); }, controls);
    btn('Reverse now', () => tl?.reversed(!tl.reversed()), controls);
    el.append(controls);
  }

  return () => {
    tl?.kill();
  };
};

export default mount;
