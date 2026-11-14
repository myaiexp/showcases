// The SVG transform-origin gotcha: a raw rotate swings round the viewBox corner, transform-box: fill-box fixes it
import { animate, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const star = (): string => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? 11 : 24;
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    pts.push(`${(64 + r * Math.cos(a)).toFixed(1)},${(58 + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(' ');
};

const mount: Mount = (el, { preview }) => {
  const frame = (cls: string, title: string, note: string): string => `
    <figure class="${cls}">
      <svg viewBox="0 0 100 100" aria-label="${title}">
        <circle class="origin" cx="0" cy="0" r="8"/>
        <polygon class="star" points="${star()}"/>
      </svg>
      <figcaption><b>${title}</b><small>${note}</small></figcaption>
    </figure>`;
  el.innerHTML = `<div class="trio">
    ${frame('bad', 'Raw rotate', 'turns round the corner')}
    ${frame('fixed', 'fill-box', 'turns round its centre')}
    ${frame('mo', 'Motion', 'adds fill-box itself')}
  </div>`;
  el.classList.toggle('is-full', !preview);
  const bad = el.querySelector<SVGElement>('.bad .star')!;
  const fixed = el.querySelector<SVGElement>('.fixed .star')!;
  const mo = el.querySelector<SVGElement>('.mo .star')!;

  let seconds = 3;
  const native: Animation[] = [];
  const spinNative = (): void => {
    for (const a of native.splice(0)) a.cancel();
    // The browser's own animate(): no help with SVG's transform origin at all.
    for (const s of [bad, fixed]) {
      native.push(s.animate({ transform: ['rotate(0deg)', 'rotate(360deg)'] }, { duration: seconds * 1000, iterations: Infinity }));
    }
  };
  spinNative();

  let ui: ReturnType<typeof panel> | undefined;
  const scope = scopeMotion(el, () => {
    // Motion sets transform-box: fill-box when it sees a rotate on an SVG shape, so only the origin is left to CSS.
    animate(mo, { rotate: 360 }, { duration: seconds, ease: 'linear', repeat: Infinity });
  });

  if (!preview) {
    ui = panel(el);
    ui.toggle('left spinner: transform-box: fill-box', false, (on) => {
      bad.style.transformBox = on ? 'fill-box' : '';
      bad.style.transformOrigin = on ? 'center' : '';
    });
    ui.slider('seconds per turn (raw ones)', { min: 1, max: 8, step: 0.5, value: seconds }, (v) => {
      seconds = v;
      spinNative();
    });
    hint(el, 'The red dot is where the SVG coordinate system starts. Tick the box to give the left star the same two CSS lines the middle one has, and it stops orbiting the dot.');
  }

  return () => {
    scope.cancel();
    for (const a of native) a.cancel();
    ui?.dispose();
  };
};

export default mount;
