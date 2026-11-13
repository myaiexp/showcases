// Two clock hands on rad-unit animatables: one snapped by a modifier, one inverted, driven by one angle
import { createAnimatable, utils } from 'animejs';
import type { AnimatableObject, AnimatableProperty } from 'animejs';
import type { Mount } from '@/types.ts';
import { buildClocks } from './clocks.ts';
import './style.css';

const { PI } = Math;

type Rotating = AnimatableObject & { rotate: AnimatableProperty };

const mount: Mount = (el, { preview }) => {
  if (preview) el.classList.add('is-preview');
  const { area, clocks: faces } = buildClocks(el, preview);
  const clocks = faces as [HTMLElement, HTMLElement];

  // unit: 'rad' means the numbers we pass are radians. duration 0 applies them at once.
  const snapped = createAnimatable(clocks[0], {
    rotate: { unit: 'rad' },
    modifier: utils.snap(PI / 10),
    duration: 0,
  }) as Rotating;
  const inverted = createAnimatable(clocks[1], {
    rotate: { unit: 'rad' },
    modifier: (v: number) => -v,
    duration: 0,
  }) as Rotating;

  const aim = (angle: number): void => {
    snapped.rotate(angle);
    inverted.rotate(angle);
  };

  // Scripted sweep (the only input in cards); in the full view the pointer takes over.
  let t = 0;
  let pointerUntil = 0;
  const timer = window.setInterval(() => {
    if (performance.now() < pointerUntil) return;
    t += 0.05;
    aim(Math.sin(t) * PI * 0.9);
  }, 40);

  const onMove = (e: PointerEvent): void => {
    const r = clocks[0].getBoundingClientRect();
    pointerUntil = performance.now() + 2500;
    aim(Math.atan2(e.clientY - r.top - r.height / 2, e.clientX - r.left - r.width / 2) + PI / 2);
  };
  if (!preview) area.addEventListener('pointermove', onMove);

  return () => {
    window.clearInterval(timer);
    area.removeEventListener('pointermove', onMove);
    snapped.revert();
    inverted.revert();
  };
};

export default mount;
