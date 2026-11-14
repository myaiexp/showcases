// An ease-in and the two easings made from it with reverseEasing and mirrorEasing, plotted and run side by side
import { animate, backIn, circIn, easeIn, mirrorEasing, reverseEasing, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

type Fn = (p: number) => number;
const BASES: Record<string, Fn> = {
  'p * p': (p) => p * p,
  'p ** 4': (p) => p ** 4,
  easeIn,
  circIn,
  backIn,
};
const SVG = 'http://www.w3.org/2000/svg';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = '<div class="trio"></div>';
  el.querySelector('.trio')!.classList.toggle('full', !preview);
  const trio = el.querySelector<HTMLElement>('.trio')!;
  let base = 'p * p';
  const duration = 2.4;

  let running: Array<{ stop: () => void }> = [];
  const scope = scopeMotion(el, () => build());
  function build(): void {
    running.forEach((a) => a.stop());
    running = [];
    trio.replaceChildren();
    const powerIn = BASES[base]!;
    // reverseEasing flips an ease-in into an ease-out; mirrorEasing makes an ease-in into an ease-in-out.
    const columns: Array<[label: string, fn: Fn]> = [
      [base === 'p * p' || base === 'p ** 4' ? 'your ease-in' : base, powerIn],
      ['reverseEasing', reverseEasing(powerIn)],
      ['mirrorEasing', mirrorEasing(powerIn)],
    ];
    const dots: Array<[SVGElement, Fn]> = [];
    for (const [label, fn] of columns) {
      const col = document.createElement('div');
      col.className = 'col';
      const title = document.createElement('code');
      title.textContent = label;
      const svg = document.createElementNS(SVG, 'svg');
      svg.setAttribute('viewBox', '-6 -6 112 112');
      const frame = document.createElementNS(SVG, 'rect');
      frame.setAttribute('width', '100');
      frame.setAttribute('height', '100');
      const path = document.createElementNS(SVG, 'path');
      let d = '';
      for (let i = 0; i <= 60; i++) d += `${i ? 'L' : 'M'}${(i / 60) * 100} ${100 - fn(i / 60) * 100}`;
      path.setAttribute('d', d);
      const dot = document.createElementNS(SVG, 'circle');
      dot.setAttribute('r', '5');
      svg.append(frame, path, dot);
      dots.push([dot, fn]);
      const track = document.createElement('div');
      track.className = 'track';
      const runner = document.createElement('i');
      track.append(runner);
      col.append(title, svg, track);
      trio.append(col);
      // The runner's own animation takes the derived function straight as its ease.
      const distance = track.clientWidth - runner.offsetWidth;
      running.push(animate(runner, { x: [0, distance] }, { duration, ease: fn, repeat: Infinity, repeatDelay: 0.7 }));
    }
    // A linear clock t, and each dot sits at (t, ease(t)): the point travelling along its own curve.
    running.push(animate(0, 1, {
      duration,
      ease: 'linear',
      repeat: Infinity,
      repeatDelay: 0.7,
      onUpdate: (t) => {
        for (const [dot, fn] of dots) {
          dot.setAttribute('cx', String(t * 100));
          dot.setAttribute('cy', String(100 - fn(t) * 100));
        }
      },
    }));
  }

  const controls = !preview ? panel(el) : undefined;
  controls?.select('ease-in to start from', Object.keys(BASES), base, (v) => {
    base = v;
    scope.run(() => {
      build();
    });
  });
  if (!preview) hint(el, 'The left plot is an ease-in you could write by hand. reverseEasing(f) returns the same curve turned into an ease-out, and mirrorEasing(f) an ease-in-out. The dots follow the curves; the bars below move with each function as their ease.');

  return () => {
    scope.cancel();
    controls?.dispose();
  };
};

export default mount;
