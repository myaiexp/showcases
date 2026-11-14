// Two gears rotated by svgEffect: the automatic fill-box transform origin against a forced view-box one
import { animate, motionValue, scopeMotion, svgEffect, transformValue } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

/** A gear outline as a path: `teeth` trapezoids between an inner and outer radius. */
function gear(cx: number, cy: number, teeth: number, inner: number, outer: number): string {
  const pts: string[] = [];
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    for (const [a, r] of [[0.0, inner], [0.2, outer], [0.5, outer], [0.7, inner]] as const) {
      const ang = (i + a) * step;
      pts.push(`${(cx + Math.cos(ang) * r).toFixed(1)} ${(cy + Math.sin(ang) * r).toFixed(1)}`);
    }
  }
  return `M${pts.join('L')}Z M${cx + inner * 0.35} ${cy}a${inner * 0.35} ${inner * 0.35} 0 1 0 ${-inner * 0.7} 0a${inner * 0.35} ${inner * 0.35} 0 1 0 ${inner * 0.7} 0Z`;
}

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <svg viewBox="0 0 200 130" class="${preview ? '' : 'big'}">
      <path class="a" fill-rule="evenodd" d="${gear(70, 62, 12, 34, 42)}"/>
      <path class="b" fill-rule="evenodd" d="${gear(139, 91, 8, 21, 28.5)}"/>
    </svg>`;
  const angle = motionValue(0);
  const secondAngle = transformValue(() => -angle.get() * 1.5 + 22.5); // 12:8 teeth, offset to mesh
  const box = motionValue<string>('fill-box');
  let cancel: VoidFunction[] = [];
  let p: ReturnType<typeof panel> | undefined;

  const scope = scopeMotion(el, () => {
    // svgEffect adds transform-box: fill-box by itself whenever it writes a transform.
    cancel = [
      svgEffect('.a', { rotate: angle, transformBox: box }),
      svgEffect('.b', { rotate: secondAngle, transformBox: box }),
    ];
    animate(angle, [0, 360], { duration: 8, ease: 'linear', repeat: Infinity });
    if (!preview) {
      hint(el, 'Switch the box to view-box and the origin becomes the middle of the whole drawing, so the gears swing around that point instead of their own centres. fill-box is what svgEffect picks for you.');
      p = panel(el);
      p.select('transform-box', ['fill-box', 'view-box'] as const, 'fill-box', (v) => box.set(v));
    }
  });
  return () => { scope.cancel(); cancel.forEach((c) => c()); p?.dispose(); };
};

export default mount;
