// A download meter built with pipe(): bytes become progress, are clamped, then turned into "73%"
import { animate, clamp, motionValue, pipe, progress, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const TOTAL = 480; // MB

// Three small steps, run left to right. pipe(a, b, c)(x) is c(b(a(x))).
const toProgress = (mb: number): number => progress(0, TOTAL, mb);
const keepInRange = (p: number): number => clamp(0, 1, p);
const toPercent = (p: number): number => Math.round(p * 100);

const PIPES = {
  'progress, clamp, percent': pipe(toProgress, keepInRange, toPercent),
  'progress, percent (no clamp)': pipe(toProgress, toPercent),
} as const;
type PipeName = keyof typeof PIPES;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="meter${preview ? '' : ' full'}">
      <div class="file"><b>holiday-video.mp4</b><span class="size"></span></div>
      <div class="track"><div class="fill"></div></div>
      <div class="big"></div>
      <ol class="steps"><li><span>bytes in</span><code class="s0"></code></li><li><span>progress()</span><code class="s1"></code></li><li><span>clamp()</span><code class="s2"></code></li><li><span>round</span><code class="s3"></code></li></ol>
    </div>`;
  const q = <T extends HTMLElement>(s: string): T => el.querySelector<T>(s)!;
  const fill = q('.fill');
  const big = q('.big');
  let which: PipeName = 'progress, clamp, percent';
  let p: ReturnType<typeof panel> | undefined;
  const cancels: VoidFunction[] = [];

  const draw = (mb: number): void => {
    const percent = PIPES[which](mb);
    big.textContent = `${percent}%`;
    fill.style.width = `${Math.max(0, Math.min(percent, 100))}%`;
    fill.dataset.over = percent > 100 ? 'yes' : 'no';
    q('.size').textContent = `${Math.round(mb)} / ${TOTAL} MB`;
    // The same steps one at a time, to see what each hands to the next.
    const raw = toProgress(mb);
    q('.s0').textContent = `${Math.round(mb)} MB`;
    q('.s1').textContent = raw.toFixed(3);
    q('.s2').textContent = which.includes('no clamp') ? 'skipped' : keepInRange(raw).toFixed(3);
    q('.s3').textContent = `${percent}%`;
  };

  const scope = scopeMotion(el, () => {
    const mb = motionValue(0);
    cancels.push(mb.on('change', draw));
    if (preview) {
      // The counter overshoots the file size, as a resumed transfer can.
      animate(mb, [0, TOTAL * 1.15], { duration: 4.5, repeat: Infinity, repeatDelay: 0.6, ease: 'linear' });
    } else {
      draw(0);
      hint(el, 'Drag the downloaded amount past the file size. With clamp in the pipe the meter stops at 100%; take the clamp out and it reads 110% or more.');
      p = panel(el);
      p.slider('downloaded (MB)', { min: -40, max: 600, step: 1, value: 0 }, (v) => mb.set(v));
      p.select('pipe', Object.keys(PIPES) as PipeName[], which, (v) => { which = v; draw(mb.get()); });
    }
  });
  return () => { scope.cancel(); cancels.forEach((c) => c()); p?.dispose(); };
};

export default mount;
