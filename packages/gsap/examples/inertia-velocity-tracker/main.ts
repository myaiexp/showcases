// InertiaPlugin velocity tracking: track a ball's x and y, read its velocity as an arrow, then throw it with velocity "auto"
import { gsap } from 'gsap';
import { InertiaPlugin, VelocityTracker } from 'gsap/InertiaPlugin';
import { check, h } from '../../shared/ui.ts';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(InertiaPlugin);

const BALL = 30;

const mount: Mount = (el, { preview }) => {
  const W = preview ? 250 : 420;
  const H = preview ? 160 : 230;
  const arena = h('div', 'arena', '', el);
  arena.style.width = `${W}px`;
  arena.style.height = `${H}px`;
  const arrow = h('div', 'arrow', '', arena);
  const ball = h('div', 'ball', '', arena);
  const out = h('p', 'readout', '', el);

  gsap.set(ball, { x: 30, y: H - 60 });

  // track() starts recording; it returns one VelocityTracker per target.
  // Use only the instance methods that exist at runtime (get, isTracking, add, remove).
  let tracker = InertiaPlugin.track(ball, 'x,y')[0];
  const setX = gsap.quickSetter(ball, 'x', 'px');
  const setY = gsap.quickSetter(ball, 'y', 'px');

  // Per frame: read the velocities, draw them as an arrow from the ball, update the readout.
  const read = (): void => {
    const vx = InertiaPlugin.getVelocity(ball, 'x');
    const vy = InertiaPlugin.getVelocity(ball, 'y');
    const speed = Math.hypot(vx, vy);
    const angle = (Math.atan2(vy, vx) * 180) / Math.PI;
    const bx = Number(gsap.getProperty(ball, 'x')) + BALL / 2;
    const by = Number(gsap.getProperty(ball, 'y')) + BALL / 2;
    arrow.style.transform = `translate(${bx}px, ${by}px) rotate(${angle}deg) scaleX(${Math.min(speed / 12, 120)})`;
    arrow.style.opacity = speed > 20 ? '1' : '0';
    if (!preview) {
      out.textContent = [
        `getVelocity x ${Math.round(vx)}  y ${Math.round(vy)} px/s`,
        `isTracking(ball) ${InertiaPlugin.isTracking(ball)}   x ${InertiaPlugin.isTracking(ball, 'x')}   y ${InertiaPlugin.isTracking(ball, 'y')}`,
        `tracker.get("x") ${Math.round(tracker?.get('x') ?? 0)}   getByTarget(ball) is tracker: ${VelocityTracker.getByTarget(ball) === tracker}`,
      ].join('\n');
    }
  };
  gsap.ticker.add(read);

  let moving: gsap.core.Tween | undefined;
  // A throw is a new tween each time: kept out of the context and killed by handle.
  const throwBall = (): void => {
    moving?.kill();
    const axis = (prop: string, max: number): gsap.InertiaObject => ({
      // "auto" takes the velocity from the tracker, so only tracked properties can use it
      velocity: InertiaPlugin.isTracking(ball, prop) ? 'auto' : 0,
      min: 0,
      max,
    });
    moving = gsap.to(ball, { inertia: { x: axis('x', W - BALL), y: axis('y', H - BALL) } });
  };

  const cleanups: Array<() => void> = [];
  const ctx = gsap.context((self) => {
    if (preview) {
      // Fling the ball again and again: a quick tween builds up velocity, then inertia continues it.
      const cycle = (): void => {
        moving?.kill();
        gsap.set(ball, { x: 30, y: H - 60 });
        moving = gsap.to(ball, {
          x: W * 0.55,
          y: H * 0.25,
          duration: 0.8,
          ease: 'power2.in',
          onComplete: () => self.ignore(throwBall),
        });
      };
      self.ignore(cycle);
      const t = window.setInterval(() => self.ignore(cycle), 3200);
      cleanups.push(() => window.clearInterval(t));
    }
  }, el);

  if (!preview) {
    const bar = h('div', 'controls', '', el);
    const c1 = check('track x', (on) => {
      if (on) tracker = InertiaPlugin.track(ball, 'x')[0] ?? tracker;
      else InertiaPlugin.untrack(ball, 'x');
    }, bar);
    const c2 = check('track y', (on) => {
      if (on) tracker = InertiaPlugin.track(ball, 'y')[0] ?? tracker;
      else InertiaPlugin.untrack(ball, 'y');
    }, bar);
    c1.checked = c2.checked = true;
    h('p', 'note', 'Move the pointer over the arena while pressing to carry the ball, then let go: the ball is thrown with the tracked velocity ("auto"). Untrack an axis and that axis stops dead on release.', el);

    let down = false;
    const to = (e: PointerEvent): void => {
      const r = arena.getBoundingClientRect();
      const x = Math.min(Math.max(e.clientX - r.left - BALL / 2, 0), W - BALL);
      const y = Math.min(Math.max(e.clientY - r.top - BALL / 2, 0), H - BALL);
      setX(x);
      setY(y);
    };
    const onDown = (e: PointerEvent): void => {
      down = true;
      moving?.kill();
      arena.setPointerCapture(e.pointerId);
      to(e);
    };
    const onMove = (e: PointerEvent): void => {
      if (down) to(e);
    };
    const onUp = (): void => {
      if (!down) return;
      down = false;
      throwBall();
    };
    arena.addEventListener('pointerdown', onDown);
    arena.addEventListener('pointermove', onMove);
    arena.addEventListener('pointerup', onUp);
    arena.addEventListener('pointercancel', onUp);
    cleanups.push(() => {
      arena.removeEventListener('pointerdown', onDown);
      arena.removeEventListener('pointermove', onMove);
      arena.removeEventListener('pointerup', onUp);
      arena.removeEventListener('pointercancel', onUp);
    });
  }

  return () => {
    gsap.ticker.remove(read);
    for (const fn of cleanups) fn();
    moving?.kill();
    // untrack() with no property list stops tracking everything on the ball
    InertiaPlugin.untrack(ball);
    ctx.revert();
  };
};

export default mount;
