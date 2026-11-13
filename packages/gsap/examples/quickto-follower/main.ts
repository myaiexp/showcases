// A dot eases after a moving point with quickTo while a second dot snaps to it with quickSetter
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const arena = document.createElement('div');
  arena.className = 'arena';
  const mk = (cls: string): HTMLElement => {
    const d = document.createElement('div');
    d.className = `dot ${cls}`;
    arena.append(d);
    return d;
  };
  const target = mk('target');
  const follower = mk('follower');
  const hint = document.createElement('p');
  hint.className = 'readout';
  hint.textContent = preview
    ? ''
    : 'Move the pointer over the box. Orange follows through quickTo (0.6s power3), white is quickSetter. Otherwise a looping point drives both.';
  el.append(arena);
  if (!preview) el.append(hint);

  const cleanups: Array<() => void> = [];
  const ctx = gsap.context(() => {
    const W = preview ? 240 : 420;
    const H = preview ? 160 : 240;
    arena.style.width = `${W}px`;
    arena.style.height = `${H}px`;
    gsap.set([target, follower], { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(follower, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(follower, 'y', { duration: 0.6, ease: 'power3' });
    const xSet = gsap.quickSetter(target, 'x', 'px');
    const ySet = gsap.quickSetter(target, 'y', 'px');
    const move = (x: number, y: number): void => {
      xSet(x);
      ySet(y);
      xTo(x);
      yTo(y);
    };

    // A looping point stands in for the pointer: a plain number tweened forever.
    const driver = { t: 0 };
    let hovering = false;
    gsap.to(driver, {
      t: Math.PI * 2,
      duration: 4,
      ease: 'none',
      repeat: -1,
      onUpdate: () => {
        if (hovering) return;
        // jerky square-ish path so the smoothing is obvious
        const sx = Math.sign(Math.cos(driver.t * 2)) * 0.35;
        const sy = Math.sign(Math.sin(driver.t * 2)) * 0.3;
        move(W / 2 + sx * W + Math.cos(driver.t) * 10, H / 2 + sy * H);
      },
    });

    if (preview) return;
    const onMove = (e: PointerEvent): void => {
      hovering = true;
      const r = arena.getBoundingClientRect();
      move(e.clientX - r.left, e.clientY - r.top);
    };
    const onLeave = (): void => {
      hovering = false;
    };
    arena.addEventListener('pointermove', onMove);
    arena.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      arena.removeEventListener('pointermove', onMove);
      arena.removeEventListener('pointerleave', onLeave);
    });
  }, el);

  return () => {
    for (const fn of cleanups) fn();
    ctx.revert();
  };
};

export default mount;
