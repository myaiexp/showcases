// A spring visualiser: spring() returns a generator, sampled with next(ms) into a curve and a moving ball
import { animate, delay, scopeMotion, spring } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

interface Opts { stiffness?: number; damping?: number; mass?: number; bounce?: number; visualDuration?: number }

const PRESETS: [string, Opts][] = [
  ['bouncy: bounce 0.6, 0.6s', { bounce: 0.6, visualDuration: 0.6 }],
  ['snappy: bounce 0, 0.3s', { bounce: 0, visualDuration: 0.3 }],
  ['heavy: stiffness 120, damping 8, mass 2', { stiffness: 120, damping: 8, mass: 2 }],
  ['slow settle: bounce -0.6, 0.8s', { bounce: -0.6, visualDuration: 0.8 }],
];

const W = 240;
const H = 110;

// Runs the generator in time order until it reports done, as the docs describe.
function sample(opts: Opts): number[] {
  const generator = spring({ keyframes: [0, 100], ...opts });
  const values: number[] = [];
  for (let t = 0; t < 12000; t += 16) {
    const { value, done } = generator.next(t);
    values.push(value);
    if (done) break;
  }
  return values;
}

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="viz${preview ? '' : ' full'}">
      <svg viewBox="0 0 ${W} ${H}"><line class="goal"/><path class="curve"/><circle class="dot" r="4"/></svg>
      <div class="rail"><i class="ball"></i></div>
      <code class="cap"></code>
    </div>`;
  const svg = el.querySelector<SVGElement>('svg')!;
  const goal = svg.querySelector<SVGLineElement>('.goal')!;
  const curve = svg.querySelector<SVGPathElement>('.curve')!;
  const dot = svg.querySelector<SVGCircleElement>('.dot')!;
  const ball = el.querySelector<HTMLElement>('.ball')!;
  const cap = el.querySelector<HTMLElement>('.cap')!;
  let opts: Opts = { stiffness: 100, damping: 10, mass: 1 };
  let mode: 'physics' | 'time' = 'physics';
  let p: ReturnType<typeof panel> | undefined;
  let stats: ((v: string | number) => void) | undefined;
  let values: number[] = [];
  let player: { stop(): void } | undefined;
  const railWidth = (): number => (el.querySelector<HTMLElement>('.rail')?.clientWidth ?? 200) - 16;

  const draw = (label: string): void => {
    values = sample(opts);
    const top = Math.max(110, ...values);
    const bottom = Math.min(0, ...values);
    const y = (v: number): number => H - 6 - ((v - bottom) / (top - bottom)) * (H - 14);
    const x = (i: number): number => 4 + (i / Math.max(1, values.length - 1)) * (W - 8);
    curve.setAttribute('d', values.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' '));
    goal.setAttribute('x1', '0'); goal.setAttribute('x2', String(W));
    goal.setAttribute('y1', String(y(100))); goal.setAttribute('y2', String(y(100)));
    cap.textContent = label;
    svg.dataset.top = String(top);
    stats?.(`${(values.length * 16 / 1000).toFixed(2)}s, overshoot ${Math.max(0, Math.max(...values) - 100).toFixed(0)}%`);
    play(y, x);
  };

  // One linear clock reads the same samples twice: the dot rides the curve, the ball rides the rail.
  // Replays start from slider events, outside the scope's setup, so they go through scope.run.
  let run: <R>(cb: () => R) => R = (cb) => cb();
  const play = (y: (v: number) => number, x: (i: number) => number): void => {
    player?.stop();
    const seconds = (values.length * 16) / 1000;
    run(() => {
      player = animate(0, seconds, {
        duration: seconds,
        ease: 'linear',
        onUpdate: (t) => {
          const i = Math.min(values.length - 1, Math.floor((t * 1000) / 16));
          const v = values[i]!;
          dot.setAttribute('cx', String(x(i)));
          dot.setAttribute('cy', String(y(v)));
          ball.style.transform = `translateX(${(v / 100) * railWidth()}px)`;
        },
      });
    });
  };

  const scope = scopeMotion(el, (scopeRun) => {
    run = scopeRun.run;
    if (preview) {
      let n = 0;
      const tick = (): void => {
        const [label, o] = PRESETS[n++ % PRESETS.length]!;
        opts = o;
        draw(label);
        delay(tick, 2.6);
      };
      tick();
    } else {
      hint(el, 'Change the physics, or switch to bounce and visual duration. The curve is spring() sampled every 16 ms with generator.next(t); the ball replays the same samples.');
      p = panel(el);
      const redraw = (): void => draw(describe());
      const describe = (): string => (mode === 'physics' ? `stiffness ${opts.stiffness}, damping ${opts.damping}, mass ${opts.mass}` : `bounce ${opts.bounce}, visualDuration ${opts.visualDuration}s`);
      p.select('options', ['physics', 'time'] as const, mode, (v) => {
        mode = v;
        opts = v === 'physics' ? { stiffness: 100, damping: 10, mass: 1 } : { bounce: 0.25, visualDuration: 0.6 };
        redraw();
      });
      p.slider('stiffness (physics)', { min: 10, max: 600, step: 10, value: 100 }, (v) => { mode = 'physics'; opts = { ...opts, bounce: undefined, visualDuration: undefined, stiffness: v }; redraw(); });
      p.slider('damping (physics)', { min: 1, max: 60, step: 1, value: 10 }, (v) => { mode = 'physics'; opts = { ...opts, bounce: undefined, visualDuration: undefined, damping: v }; redraw(); });
      p.slider('mass (physics)', { min: 0.2, max: 5, step: 0.1, value: 1 }, (v) => { mode = 'physics'; opts = { ...opts, bounce: undefined, visualDuration: undefined, mass: v }; redraw(); });
      p.slider('bounce (time)', { min: -1, max: 1, step: 0.05, value: 0.25 }, (v) => { mode = 'time'; opts = { bounce: v, visualDuration: opts.visualDuration ?? 0.6 }; redraw(); });
      p.slider('visual duration (time)', { min: 0.1, max: 2, step: 0.05, value: 0.6 }, (v) => { mode = 'time'; opts = { bounce: opts.bounce ?? 0.25, visualDuration: v }; redraw(); });
      p.button('Replay', redraw);
      stats = p.readout('settles in', '');
      redraw();
    }
  });
  return () => { scope.cancel(); player?.stop(); p?.dispose(); };
};

export default mount;
