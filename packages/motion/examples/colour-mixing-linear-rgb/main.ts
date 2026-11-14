// mix() between two colours blends in linear RGB: a strip built from mix() beside a plain CSS gradient
import { animate, mix, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const PAIRS = {
  'red to green': ['#ff0000', '#00ff00'],
  'blue to yellow': ['#0000ff', '#ffff00'],
  'magenta to cyan': ['#ff00ff', '#00ffff'],
} as const;
type PairName = keyof typeof PAIRS;
const SLICES = 40;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="mixing${preview ? '' : ' full'}">
      <div class="lane"><span>mix() in linear RGB</span><div class="strip motion"></div></div>
      <div class="lane"><span>CSS gradient in sRGB</span><div class="strip css"></div></div>
      <div class="pick"><div class="swatch"></div><code class="value"></code></div>
    </div>`;
  const motionStrip = el.querySelector<HTMLElement>('.strip.motion')!;
  const cssStrip = el.querySelector<HTMLElement>('.strip.css')!;
  const swatch = el.querySelector<HTMLElement>('.swatch')!;
  const value = el.querySelector<HTMLElement>('.value')!;
  let pair: PairName = 'red to green';
  let mixer = mix<string>(...(PAIRS[pair] as unknown as [string, string]));
  let p: ReturnType<typeof panel> | undefined;
  let pos = 0.5;

  const slices = Array.from({ length: SLICES }, () => {
    const s = document.createElement('i');
    motionStrip.append(s);
    return s;
  });

  const paint = (): void => {
    const [a, b] = PAIRS[pair];
    mixer = mix<string>(a, b);
    // Each slice asks the mixer for the colour at its own progress.
    slices.forEach((s, i) => { s.style.background = String(mixer(i / (SLICES - 1))); });
    cssStrip.style.background = `linear-gradient(to right, ${a}, ${b})`;
    show();
  };
  const show = (): void => {
    const c = String(mixer(pos));
    swatch.style.background = c;
    swatch.style.left = `${pos * 100}%`;
    value.textContent = `mix(a, b)(${pos.toFixed(2)}) = ${c}`;
  };
  const move = (v: number): void => { pos = v; show(); };

  const scope = scopeMotion(el, () => {
    paint();
    if (preview) {
      animate(0, 1, { duration: 3.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', onUpdate: move });
    } else {
      hint(el, 'Compare the two strips at the middle. The CSS gradient sinks into a dull brown or grey, mix() stays bright because it blends in linear RGB.');
      p = panel(el);
      p.slider('progress', { min: 0, max: 1, step: 0.01, value: pos }, move);
      p.select('colours', Object.keys(PAIRS) as PairName[], pair, (v) => { pair = v; paint(); });
    }
  });
  return () => { scope.cancel(); p?.dispose(); };
};

export default mount;
