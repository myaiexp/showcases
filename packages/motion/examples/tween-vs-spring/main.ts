// The same slide as a tween (keyframes + duration + easing) and as a spring, with each one's motion drawn as a graph
import { animate, delay, motionValue, scopeMotion } from 'motion';
import type { MotionValue } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const SVG = 'http://www.w3.org/2000/svg';
const WINDOW = 1.6; // seconds drawn across the graph

interface Lane {
  x: MotionValue<number>;
  box: HTMLElement;
  line: SVGPolylineElement;
  took: HTMLElement;
  start: number;
  pts: string[];
  run: number;
}

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `<div class="lanes"></div>`;
  el.classList.toggle('is-full', !preview);
  const lanes = el.querySelector<HTMLElement>('.lanes')!;

  const make = (title: string, code: string): Lane => {
    const lane = document.createElement('section');
    lane.innerHTML = '<header><b></b><code></code><span class="took"></span></header><div class="track"><i class="box"></i></div>';
    lane.querySelector('b')!.textContent = title;
    lane.querySelector('code')!.textContent = code;
    const svg = document.createElementNS(SVG, 'svg');
    svg.setAttribute('viewBox', '0 0 160 44');
    svg.setAttribute('preserveAspectRatio', 'none');
    const base = document.createElementNS(SVG, 'path');
    base.setAttribute('d', 'M0 6 H160 M0 38 H160');
    base.setAttribute('class', 'rule');
    const line = document.createElementNS(SVG, 'polyline');
    svg.append(base, line);
    lane.append(svg);
    lanes.append(lane);
    return { x: motionValue(0), box: lane.querySelector('.box')!, line, took: lane.querySelector('.took')!, start: 0, pts: [], run: 0 };
  };
  const tween = make('Tween', "{ duration: 0.6, ease: 'easeInOut' }");
  const sprung = make('Spring', "{ type: 'spring', visualDuration: 0.6, bounce: 0.35 }");

  let duration = 0.6;
  let bounce = 0.35;
  let ease: 'easeInOut' | 'linear' | 'circOut' = 'easeInOut';
  let target = 0;

  // Whatever moves the value, the box and the graph just follow it.
  const offs = [tween, sprung].map((lane) =>
    lane.x.on('change', (v) => {
      const track = lane.box.parentElement!;
      lane.box.style.transform = `translateX(${v * (track.clientWidth - lane.box.offsetWidth)}px)`;
      const t = (performance.now() - lane.start) / 1000;
      lane.pts.push(`${((t / WINDOW) * 160).toFixed(1)},${(38 - v * 32).toFixed(1)}`);
      lane.line.setAttribute('points', lane.pts.join(' '));
    }),
  );

  const scope = scopeMotion(el, () => {
    const go = (): void => {
      target = target ? 0 : 1;
      for (const lane of [tween, sprung]) {
        lane.start = performance.now();
        lane.pts = [`0,${(38 - lane.x.get() * 32).toFixed(1)}`];
        const run = ++lane.run;
        lane.took.textContent = '';
        const done = (): void => {
          if (run === lane.run) lane.took.textContent = `${((performance.now() - lane.start) / 1000).toFixed(2)}s`;
        };
        // The tween is told its duration and easing. The spring is told a feel, and its length falls out of the physics.
        // Both reuse the same motion value, so an interrupt starts from where it is: the spring also keeps its speed.
        if (lane === tween) animate(lane.x, target, { duration, ease }).then(done);
        else animate(lane.x, target, { type: 'spring', visualDuration: duration, bounce }).then(done);
      }
    };

    if (preview) {
      const tick = (): void => {
        go();
        delay(tick, 2.2);
      };
      delay(tick, 0.5);
    } else {
      lanes.addEventListener('click', go);
      lanes.style.cursor = 'pointer';
    }
  });

  let ui: ReturnType<typeof panel> | undefined;
  if (!preview) {
    ui = panel(el);
    ui.button('Slide', () => lanes.click());
    ui.slider('duration (s)', { min: 0.2, max: 1.5, step: 0.05, value: duration }, (v) => (duration = v));
    ui.slider('spring bounce', { min: 0, max: 0.8, step: 0.05, value: bounce }, (v) => (bounce = v));
    ui.select('tween ease', ['easeInOut', 'linear', 'circOut'] as const, ease, (v) => (ease = v));
    hint(el, 'Press Slide, then press it again halfway. The tween restarts its curve from rest (a kink in its line); the spring carries its speed on, so its line stays smooth.');
  }

  return () => {
    scope.cancel();
    for (const off of offs) off();
    ui?.dispose();
  };
};

export default mount;
