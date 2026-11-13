// gsap.utils.splitColor() turns colour strings into channel arrays; bars tween to each result
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const SAMPLES = ['red', '#6fb936', 'rgba(204, 153, 51, 0.5)', 'hsl(200, 80%, 50%)', 'rgb(10, 200, 180)', 'hsla(300, 60%, 40%, 0.6)', 'orange'];

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = preview ? 'demo compact' : 'demo';
  root.innerHTML = `
    <div class="top"><div class="swatch"><i></i></div><code class="in"></code></div>
    <div class="grid">
      <code class="k">splitColor(c)</code><code class="v rgb"></code>
      <code class="k">splitColor(c, true)</code><code class="v hsl"></code>
    </div>
    <div class="bars">
      <b class="r"></b><b class="g"></b><b class="b"></b><b class="h"></b><b class="s"></b><b class="l"></b>
    </div>`;
  const q = <T extends HTMLElement>(s: string): T => root.querySelector(s) as T;
  const swatch = q('.swatch i');
  const label = q('.in');
  const rgbOut = q('.rgb');
  const hslOut = q('.hsl');
  const bars = Array.from(root.querySelectorAll<HTMLElement>('.bars b'));
  let input: HTMLInputElement | undefined;
  el.append(root);

  const show = (color: string): void => {
    const rgb = gsap.utils.splitColor(color);
    const hsl = gsap.utils.splitColor(color, true);
    if (!rgb || rgb.length < 3 || rgb.some((n) => Number.isNaN(n))) return;
    swatch.style.background = color;
    label.textContent = `"${color}"`;
    rgbOut.textContent = `[${rgb.join(', ')}]`;
    hslOut.textContent = `[${hsl.join(', ')}]`;
    const pct = [rgb[0] / 2.55, rgb[1] / 2.55, rgb[2] / 2.55, hsl[0] / 3.6, hsl[1], hsl[2]];
    // Called from a handler or timer, outside any context: killed by target in the cleanup.
    gsap.to(bars, { width: (i: number) => `${pct[i]}%`, duration: 0.6, ease: 'power2.out', overwrite: true });
  };
  gsap.set(bars, { width: '0%' });
  show(SAMPLES[0] ?? 'red');

  let timer = 0;
  if (preview) {
    let i = 0;
    timer = window.setInterval(() => show(SAMPLES[++i % SAMPLES.length] ?? 'red'), 1600);
  } else {
    input = document.createElement('input');
    input.className = 'field';
    input.value = SAMPLES[0] ?? 'red';
    input.placeholder = 'a colour: red, #6fb936, hsl(...)';
    input.addEventListener('input', () => show((input as HTMLInputElement).value.trim()));
    const chips = document.createElement('div');
    chips.className = 'chips';
    for (const s of SAMPLES) {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = s;
      b.addEventListener('click', () => {
        (input as HTMLInputElement).value = s;
        show(s);
      });
      chips.append(b);
    }
    root.append(input, chips);
  }

  return () => {
    window.clearInterval(timer);
    gsap.killTweensOf(bars);
  };
};

export default mount;
