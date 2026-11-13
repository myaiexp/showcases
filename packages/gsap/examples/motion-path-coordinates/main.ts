// MotionPath coordinate helpers: move a dot between differently rotated and scaled containers, and track it with a global matrix
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { btn, check, h } from '../../shared/ui.ts';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(MotionPathPlugin);

const DOT = 16;
// The docs allow window as the "from" element (viewport coordinates); gsap's typings only list Element.
const viewport = window as unknown as Element;
// Matrix2D.apply() is documented and exists at runtime, but gsap's Matrix2D type only lists a to f.
const apply = (m: gsap.plugins.Matrix2D, p: gsap.Point2D): gsap.Point2D => (m as unknown as { apply(q: gsap.Point2D): gsap.Point2D }).apply(p);

const mount: Mount = (el, { preview }) => {
  const arena = h('div', preview ? 'arena small' : 'arena', '', el);
  // Two worlds with their own nested transforms: the target's, and the one the dot lives in.
  const worldA = h('div', 'world a', '', arena);
  const target = h('div', 'target', preview ? '' : 'target', worldA);
  const worldB = h('div', 'world b', '', arena);
  const dot = h('div', 'dot', '', worldB);
  const marker = h('div', 'marker', '', arena);
  const out = h('pre', 'readout', '', el);

  const ctx = gsap.context(() => {
    gsap.set(worldA, { rotation: -12, scale: 0.9 });
    gsap.set(target, { rotation: 20, scale: 0.85 });
    gsap.set(worldB, { rotation: 14, scale: 1.1 });
    gsap.set(dot, { x: 6, y: 6 });
  }, el);

  // Tweens below are made from timers and DOM handlers (outside the context) and killed by handle.
  let moving: gsap.core.Tween | undefined;
  let wobble: gsap.core.Tween | undefined;
  const go = (vars: gsap.TweenVars): void => {
    moving?.kill();
    moving = gsap.to(dot, { duration: 0.8, ease: 'power2.inOut', ...vars });
  };

  // getRelativePosition: the gap from the dot's centre to the target's centre, in the dot's parent space
  const toTargetCentre = (): void => {
    const d = MotionPathPlugin.getRelativePosition(dot, target, [0.5, 0.5], [0.5, 0.5]);
    go({ x: `+=${d.x}`, y: `+=${d.y}` });
  };
  // getAlignMatrix: a point in the target's own coordinates (its top-left is 0,0) turned into dot coordinates
  const toTargetPoint = (local: gsap.Point2D): void => {
    const m = MotionPathPlugin.getAlignMatrix(dot, target, [0.5, 0.5], [0, 0]);
    const p = apply(m, local);
    go({ x: `+=${p.x}`, y: `+=${p.y}` });
  };
  // convertCoordinates: viewport (window) coordinates into the dot container's local coordinates
  const toViewportPoint = (clientX: number, clientY: number): void => {
    const p = MotionPathPlugin.convertCoordinates(viewport, worldB, { x: clientX, y: clientY });
    go({ x: p.x - DOT / 2, y: p.y - DOT / 2 });
  };

  // getGlobalMatrix: where the dot really is on screen, whatever it is nested in. A ring follows it.
  const trackDot = (): void => {
    const m = MotionPathPlugin.getGlobalMatrix(dot);
    const c = apply(m, { x: DOT / 2, y: DOT / 2 });
    const r = arena.getBoundingClientRect();
    marker.style.transform = `translate(${c.x - r.left}px, ${c.y - r.top}px)`;
    if (!preview) {
      out.textContent = `getGlobalMatrix(dot): a ${m.a.toFixed(2)} b ${m.b.toFixed(2)} c ${m.c.toFixed(2)} d ${m.d.toFixed(2)} e ${m.e.toFixed(0)} f ${m.f.toFixed(0)}\ndot centre on screen: ${Math.round(c.x)}, ${Math.round(c.y)}`;
    }
  };
  gsap.ticker.add(trackDot);

  const cleanups: Array<() => void> = [];
  if (preview) {
    // visit the target centre, a point in the target, and home, on a timer
    const targetPoint = { x: 10, y: 10 };
    const steps = [toTargetCentre, () => toTargetPoint(targetPoint), () => go({ x: 6, y: 6 })];
    let i = 0;
    const tick = (): void => steps[i++ % steps.length]?.();
    tick();
    const t = window.setInterval(tick, 1400);
    cleanups.push(() => window.clearInterval(t));
    wobble = gsap.to(worldB, { rotation: 4, duration: 2.5, ease: 'sine.inOut', repeat: -1, yoyo: true });
  } else {
    const bar = h('div', 'controls', '', el);
    btn('getRelativePosition: centre to centre', toTargetCentre, bar);
    check('wobble the dot container', (on) => {
      wobble?.kill();
      wobble = on ? gsap.to(worldB, { rotation: 22, duration: 2, ease: 'sine.inOut', repeat: -1, yoyo: true }) : gsap.to(worldB, { rotation: 14, duration: 0.5 });
    }, bar);
    h('p', 'note', 'Click the target to send the dot to that exact spot in the target\'s own rotated, scaled space (convertCoordinates gives the click in target coordinates, getAlignMatrix converts to dot coordinates). Click anywhere else in the box and the dot goes to the click (convertCoordinates from window). The ring follows the dot with getGlobalMatrix.', el);

    const onClick = (e: MouseEvent): void => {
      if (target.contains(e.target as Node)) {
        const local = MotionPathPlugin.convertCoordinates(viewport, target, { x: e.clientX, y: e.clientY });
        toTargetPoint(local);
      } else {
        toViewportPoint(e.clientX, e.clientY);
      }
    };
    arena.addEventListener('click', onClick);
    cleanups.push(() => arena.removeEventListener('click', onClick));
  }
  trackDot();

  return () => {
    gsap.ticker.remove(trackDot);
    for (const fn of cleanups) fn();
    moving?.kill();
    wobble?.kill();
    ctx.revert();
  };
};

export default mount;
