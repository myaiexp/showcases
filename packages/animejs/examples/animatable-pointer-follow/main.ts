// An animatable circle follows the pointer (or a scripted path in cards); getters feed the readout
import { createAnimatable, utils } from 'animejs';
import type { AnimatableObject, AnimatableProperty } from 'animejs';
import type { Mount } from '@/types.ts';
import { buildArena } from './arena.ts';
import './style.css';

type Mover = AnimatableObject & { x: AnimatableProperty; y: AnimatableProperty; backgroundColor: AnimatableProperty };

const mount: Mount = (el, { preview }) => {
  const { area, circle: $circle, xOut, yOut } = buildArena(el, preview);
  const rgb = [164, 255, 79];

  const circle = createAnimatable($circle, {
    x: 500,
    y: 500,
    backgroundColor: 250,
    ease: 'outExpo',
  }) as Mover;

  // Getters: read the current values on every render of the x animation.
  circle.animations.x!.onRender = () => {
    xOut.textContent = utils.roundPad(circle.x() as number, 2);
    yOut.textContent = utils.roundPad(circle.y() as number, 2);
  };

  // Setters: animate towards a new position and colour. Chained like the docs show.
  const aim = (x: number, y: number, half: { w: number; h: number }): void => {
    rgb[0] = utils.mapRange(x, -half.w, half.w, 0, 164);
    rgb[2] = utils.mapRange(x, -half.w, half.w, 79, 255);
    circle.x(x);
    circle.y(y);
    circle.backgroundColor(rgb);
  };

  const getHalf = (): { w: number; h: number } => {
    const r = area.getBoundingClientRect();
    return { w: r.width / 2 - 20, h: r.height / 2 - 20 };
  };

  const onMove = (e: PointerEvent): void => {
    const r = area.getBoundingClientRect();
    const h = getHalf();
    aim(
      utils.clamp(e.clientX - r.left - r.width / 2, -h.w, h.w),
      utils.clamp(e.clientY - r.top - r.height / 2, -h.h, h.h),
      h,
    );
  };

  // Scripted path for cards (no pointer input there): a new target every 700ms.
  let step = 0;
  const timer = window.setInterval(() => {
    const h = getHalf();
    step += 1;
    aim(Math.cos(step * 1.3) * h.w, Math.sin(step * 2.1) * h.h, h);
  }, 700);
  if (preview) {
    aim(0, 0, getHalf());
  } else {
    area.addEventListener('pointermove', onMove);
    area.addEventListener('pointermove', () => window.clearInterval(timer), { once: true });
  }

  return () => {
    window.clearInterval(timer);
    area.removeEventListener('pointermove', onMove);
    circle.revert();
  };
};

export default mount;
