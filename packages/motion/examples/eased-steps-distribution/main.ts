// A segmented loading meter whose segments fill in bursts: steps(10) fed through circInOut first
import { animate, circInOut, circOut, easeIn, scopeMotion, steps } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const CURVES = { 'none (plain steps)': (p: number) => p, circInOut, circOut, easeIn } as const;
type Curve = keyof typeof CURVES;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="meters">
      <div class="meter"><code class="a"></code><div class="bar"><i class="plain"></i></div></div>
      <div class="meter"><code class="b"></code><div class="bar"><i class="shaped"></i></div></div>
    </div>`;
  el.querySelector('.meters')!.classList.toggle('full', !preview);
  const q = (s: string): HTMLElement => el.querySelector<HTMLElement>(s)!;

  let count = 10;
  let curve: Curve = 'circInOut';
  let seconds = 4;
  const scope = scopeMotion(el, () => start());
  function start(): void {
    const shape = CURVES[curve];
    // The segment gaps come from a repeating gradient sized to the step count.
    for (const bar of el.querySelectorAll<HTMLElement>('.bar')) bar.style.setProperty('--n', String(count));
    q('.a').textContent = `ease: steps(${count})`;
    q('.b').textContent = `ease: (p) => steps(${count})(${curve === 'none (plain steps)' ? 'p' : `${curve}(p)`})`;
    const loop = { duration: seconds, repeat: Infinity, repeatDelay: 0.8 };
    // Same duration, same number of steps. The second one first bends progress, then quantises it.
    animate('.plain', { scaleX: [0, 1] }, { ...loop, ease: steps(count) });
    animate('.shaped', { scaleX: [0, 1] }, { ...loop, ease: (p) => steps(count)(shape(p)) });
  }
  const restart = (): void => scope.run(start);

  const controls = !preview ? panel(el) : undefined;
  controls?.select('bend progress with', Object.keys(CURVES) as Curve[], curve, (v) => {
    curve = v;
    restart();
  });
  controls?.slider('steps', { min: 3, max: 20, step: 1, value: count }, (v) => {
    count = v;
    restart();
  });
  controls?.slider('seconds', { min: 2, max: 8, step: 1, value: seconds }, (v) => {
    seconds = v;
    restart();
  });
  if (!preview) hint(el, 'Both meters have the same ten segments and the same time. The top fills at an even pace; the bottom passes progress through another easing first, so the segments come slowly, then in a rush, then slowly again, like real downloads do.');

  return () => {
    scope.cancel();
    controls?.dispose();
  };
};

export default mount;
