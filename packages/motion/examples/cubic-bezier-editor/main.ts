// A curve editor: drag two handles to shape a cubic-bezier easing and watch a ball move with it
import { animate, drag, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

type Curve = [number, number, number, number];
const START: Curve = [0.25, 0.1, 0.25, 1]; // the CSS "ease" curve
const PRESETS: Record<string, Curve> = {
  'ease': START,
  'ease in-out': [0.42, 0, 0.58, 1],
  'snappy out': [0.1, 0.9, 0.2, 1],
  'overshoot': [0.3, 1.6, 0.5, 1],
  'wind-up': [0.6, -0.5, 0.7, 1],
};

const MARGIN = 0.35; // extra room above and below the unit square, so y values can leave 0..1

const mount: Mount = (el, { preview, signal }) => {
  const size = preview ? 100 : 200;
  const fieldH = size * (1 + 2 * MARGIN);
  el.innerHTML = `
    <div class="editor">
      <div class="row">
        <div class="field">
          <svg><rect class="unit"/><path class="diag"/><path class="guide g1"/><path class="guide g2"/><path class="curve"/></svg>
          <div class="handle h1"></div><div class="handle h2"></div>
        </div>
        <div class="rail"><div class="base"></div><div class="ball"></div></div>
      </div>
      <code class="nums"></code>
    </div>`;
  el.querySelector('.editor')!.classList.toggle('full', !preview);
  const q = <T extends Element>(s: string): T => el.querySelector<T>(s)!;
  const field = q<HTMLElement>('.field');
  const rail = q<HTMLElement>('.rail');
  const h = [q<HTMLElement>('.h1'), q<HTMLElement>('.h2')] as const;
  Object.assign(field.style, { width: `${size}px`, height: `${fieldH}px` });
  rail.style.height = `${fieldH}px`;
  const svg = q<SVGElement>('svg');
  svg.setAttribute('viewBox', `0 0 ${size} ${fieldH}`);
  const unit = q<SVGRectElement>('.unit');
  unit.setAttribute('x', '0');
  unit.setAttribute('y', String(MARGIN * size));
  unit.setAttribute('width', String(size));
  unit.setAttribute('height', String(size));
  const px = (x: number): number => x * size;
  const py = (y: number): number => (MARGIN + 1 - y) * size;
  q('.diag').setAttribute('d', `M0 ${py(0)} L${size} ${py(1)}`);

  // Handles sit at the starting curve through CSS; dragging adds an x/y transform on top.
  const place = (i: 0 | 1): void => {
    h[i].style.left = `${px(START[i * 2]!)}px`;
    h[i].style.top = `${py(START[i * 2 + 1]!)}px`;
  };
  place(0);
  place(1);

  const curve: Curve = [...START];
  let ball: ReturnType<typeof animate> | undefined;
  const nums = q<HTMLElement>('.nums');
  const read = (): Curve => {
    const f = field.getBoundingClientRect();
    const at = (e: HTMLElement): [number, number] => {
      const r = e.getBoundingClientRect();
      return [(r.left + r.width / 2 - f.left) / size, 1 + MARGIN - (r.top + r.height / 2 - f.top) / size];
    };
    const [x1, y1] = at(h[0]);
    const [x2, y2] = at(h[1]);
    return [x1, y1, x2, y2];
  };
  const draw = (): void => {
    const [x1, y1, x2, y2] = curve;
    q('.curve').setAttribute('d', `M0 ${py(0)} C${px(x1)} ${py(y1)} ${px(x2)} ${py(y2)} ${size} ${py(1)}`);
    q('.g1').setAttribute('d', `M0 ${py(0)} L${px(x1)} ${py(y1)}`);
    q('.g2').setAttribute('d', `M${size} ${py(1)} L${px(x2)} ${py(y2)}`);
    nums.textContent = `ease: [${curve.map((n) => +n.toFixed(2)).join(', ')}]`;
  };
  const restartBall = (): void => {
    ball?.stop();
    // The curve is handed to animate() as four numbers: the same array the readout shows.
    ball = animate('.ball', { y: [0, -size] }, { duration: 1.6, ease: curve, repeat: Infinity, repeatDelay: 0.5 });
  };

  let frameId = 0;
  const watch = (): void => {
    const next = read();
    if (next.some((n, i) => Math.abs(n - curve[i]!) > 0.004)) {
      next.forEach((n, i) => (curve[i] = Math.min(i % 2 === 0 ? 1 : 2, Math.max(i % 2 === 0 ? 0 : -1, n))));
      draw();
      scope.run(restartBall);
    }
    frameId = requestAnimationFrame(watch);
  };

  const scope = scopeMotion(el, () => {
    // constraints: the field. x stays inside 0..1 because the field is exactly as wide as the unit square.
    for (const handle of h) drag(handle, { constraints: field, elastic: 0, momentum: false });
    draw();
    restartBall();
    frameId = requestAnimationFrame(watch);
  });

  /** Moves a handle to a curve coordinate with a short animation (it shares x/y with drag). */
  const moveTo = (i: 0 | 1, x: number, y: number): void => {
    animate(h[i], { x: px(x) - px(START[i * 2]!), y: py(y) - py(START[i * 2 + 1]!) }, { duration: 0.35 });
  };

  let controls: ReturnType<typeof panel> | undefined;
  if (preview) {
    // A card has no pointer: scripted drags pull each handle, then both settle back.
    const frame = q<HTMLElement>('.row');
    const centre = (e: HTMLElement): { x: number; y: number } => {
      const f = frame.getBoundingClientRect();
      const r = e.getBoundingClientRect();
      return { x: r.left + r.width / 2 - f.left, y: r.top + r.height / 2 - f.top };
    };
    loopGesture(frame, signal, async (p) => {
      const a = centre(h[0]);
      await p.drag(h[0], a, { x: a.x + size * 0.1, y: a.y - size * 0.55 }, 1.2);
      const b = centre(h[1]);
      await p.drag(h[1], b, { x: b.x - size * 0.2, y: b.y + size * 0.65 }, 1.2);
      await p.wait(1.5);
      scope.run(() => {
        moveTo(0, START[0], START[1]);
        moveTo(1, START[2], START[3]);
      });
      await p.wait(0.8);
    }, 0.3);
  } else {
    controls = panel(el);
    controls.select('start from', Object.keys(PRESETS), 'ease', (name) => {
      const c = PRESETS[name]!;
      scope.run(() => {
        moveTo(0, c[0], c[1]);
        moveTo(1, c[2], c[3]);
      });
    });
    hint(el, 'Drag the two round handles. The ball on the right travels with the curve you have made, and the line below is the array to paste into ease. A curve that goes above 1 overshoots; below 0 it pulls back first.');
  }

  return () => {
    cancelAnimationFrame(frameId);
    scope.cancel();
    controls?.dispose();
  };
};

export default mount;
