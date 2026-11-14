// A wheel spun by an inertia animation on a plain { angle } object
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const PRIZES = ['Free coffee', 'Sticker', '10% off', 'Try again', 'Mug', '5% off', 'Try again', 'T-shirt'];
const COLOURS = ['#ff6b6b', '#ffd166', '#06d6a0', '#4d96ff', '#b66bff', '#ff9f68', '#2ec4b6', '#ef6fa8'];
const SLICE = 360 / PRIZES.length;

function wheelSvg(): string {
  const point = (deg: number, r: number): string => {
    const a = ((deg - 90) * Math.PI) / 180;
    return `${(100 + r * Math.cos(a)).toFixed(2)} ${(100 + r * Math.sin(a)).toFixed(2)}`;
  };
  return PRIZES.map((_, i) => {
    const a0 = i * SLICE;
    const a1 = a0 + SLICE;
    return `<path d="M100 100 L${point(a0, 96)} A96 96 0 0 1 ${point(a1, 96)} Z" fill="${COLOURS[i]}"/>`;
  }).join('');
}

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="wheel-wrap">
      <div class="pointer"></div>
      <svg class="wheel" viewBox="0 0 200 200">${wheelSvg()}<circle cx="100" cy="100" r="12" fill="#fff"/></svg>
    </div>
    <output class="prize"> </output>`;
  const wheelEl = el.querySelector('.wheel') as SVGElement;
  const prize = el.querySelector('.prize') as HTMLElement;

  // The wheel is just a number. animate() moves it; we turn the SVG to match.
  const wheel = { angle: 0 };
  const render = (): void => {
    wheelEl.style.transform = `rotate(${wheel.angle}deg)`;
  };
  const prizeAtPointer = (): string => {
    const wheelFrame = (((-wheel.angle % 360) + 360) % 360);
    return PRIZES[Math.floor(wheelFrame / SLICE) % PRIZES.length] as string;
  };

  const opts = { velocity: 900, power: 0.8, timeConstant: 700, snap: true };

  const scope = scopeMotion(el, () => {
    const spin = (velocity: number): void => {
      prize.textContent = ' ';
      // Inertia works out its own destination from the velocity; the target only has to differ
      // from where the wheel is, or Motion skips the animation as already finished.
      animate(wheel, { angle: wheel.angle + 1 }, {
        type: 'inertia',
        velocity,
        power: opts.power,
        timeConstant: opts.timeConstant,
        // Land mid-slice: round the predicted stopping angle to a slice centre.
        modifyTarget: opts.snap ? (v: number) => Math.round((v - SLICE / 2) / SLICE) * SLICE + SLICE / 2 : undefined,
        onUpdate: () => {
          render();
          prize.textContent = prizeAtPointer();
        },
      });
    };

    if (preview) {
      const tick = (): void => {
        spin(500 + Math.random() * 700);
        delay(tick, 6);
      };
      delay(tick, 0.6);
      return;
    }
    const p = panel(el);
    p.slider('start speed (deg/s)', { min: 200, max: 2500, step: 50, value: opts.velocity }, (v) => { opts.velocity = v; });
    p.slider('power', { min: 0.2, max: 2, step: 0.1, value: opts.power }, (v) => { opts.power = v; });
    p.slider('timeConstant', { min: 100, max: 2000, step: 50, value: opts.timeConstant }, (v) => { opts.timeConstant = v; });
    p.toggle('snap to slice', true, (v) => { opts.snap = v; });
    p.button('Spin', () => spin(opts.velocity));
    hint(el, 'Spin, then spin again before it stops: the new spin starts from the wheel as it is. Power is how far it travels, timeConstant how long the slowdown takes.');
    return () => p.dispose();
  });

  return () => scope.cancel();
};

export default mount;
