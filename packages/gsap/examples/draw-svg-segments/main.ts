// DrawSVG: animate a path's stroke to different segments given as percentages or lengths
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(DrawSVGPlugin);

const NS = 'http://www.w3.org/2000/svg';
const PATH_D =
  'M9.13,99.99c0,0,18.53-41.58,49.91-65.11c30-22.5,65.81-24.88,77.39-24.88c33.87,0,57.55,11.71,77.05,28.47c23.09,19.85,40.33,46.79,61.71,69.77c24.09,25.89,53.44,46.75,102.37,46.75c22.23,0,40.62-2.83,55.84-7.43c27.97-8.45,44.21-22.88,54.78-36.7c14.35-18.75,16.43-36.37,16.43-36.37';
const VALUES = ['100%', '40% 60%', '20 350', '50% 50%', 'true', '10%'];
const DASH = 'dash';

const mount: Mount = (el, { preview }) => {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 516.3 190');
  svg.classList.add('stage');
  const template = document.createElementNS(NS, 'path');
  template.setAttribute('d', PATH_D);
  template.classList.add('template');
  const path = document.createElementNS(NS, 'path');
  path.setAttribute('d', PATH_D);
  path.classList.add('stroke');
  svg.append(template, path);
  el.append(svg);

  const readout = document.createElement('p');
  readout.className = 'readout';
  let current: gsap.core.Animation | undefined;

  const ctx = gsap.context(() => {
    gsap.set(path, { drawSVG: '0%' });
  }, el);

  const show = (value: string): void => {
    // Created outside the context (ignore) so repeated shows don't pile up in ctx.data
    ctx.ignore(() => {
      current?.kill();
      if (value === DASH) {
        // A dash of constant size travelling from one end to the other.
        readout.textContent = 'drawSVG: "0 5%" to "95% 100%"';
        current = gsap.fromTo(path, { drawSVG: '0 5%' }, { drawSVG: '95% 100%', duration: 1.5, ease: 'power1.inOut' });
      } else {
        readout.textContent = `drawSVG: "${value}"`;
        current = gsap.to(path, { drawSVG: value, duration: 1, ease: 'power1.inOut' });
      }
    });
  };

  let timer = 0;
  if (preview) {
    const seq = ['100%', '40% 60%', DASH, '50% 50%', '100%'];
    let i = 0;
    show(seq[0] ?? '100%');
    timer = window.setInterval(() => show(seq[++i % seq.length] ?? '100%'), 1600);
  } else {
    const bar = document.createElement('div');
    bar.className = 'bar';
    for (const v of [...VALUES, DASH]) {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = v === DASH ? 'moving dash' : v;
      b.addEventListener('click', () => show(v));
      bar.append(b);
    }
    el.append(bar, readout);
    show('100%');
  }

  return () => {
    window.clearInterval(timer);
    ctx.revert();
    current?.kill();
  };
};

export default mount;
