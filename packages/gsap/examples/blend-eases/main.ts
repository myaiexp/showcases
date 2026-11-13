// Graph of two eases and their blend, with a ball that moves using the blended ease
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { h } from '../../shared/ui.ts';
import { blendEases } from './blendEases.ts';
import './style.css';

const EASES = ['none', 'power2.in', 'power2.out', 'power3.inOut', 'back.in(1.2)', 'back', 'bounce', 'elastic', 'sine.inOut', 'steps(6)', 'expo.out'];
const NS = 'http://www.w3.org/2000/svg';
// the graph: x runs 20..280, an ease value of 0 sits at y=170 and 1 at y=30
const X0 = 20, W = 260, Y0 = 170, H = 140;

const curve = (ease: (p: number) => number): string => {
  let d = '';
  for (let i = 0; i <= 80; i++) d += `${i ? 'L' : 'M'}${(X0 + (i / 80) * W).toFixed(1)} ${(Y0 - ease(i / 80) * H).toFixed(1)}`;
  return d;
};

const mount: Mount = (el, { preview }) => {
  const root = h('div', preview ? 'root compact' : 'root', '', el);
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 -30 310 240');
  svg.classList.add('graph');
  const mk = (tag: string, cls: string, attrs: Record<string, string> = {}): SVGElement => {
    const n = document.createElementNS(NS, tag);
    n.setAttribute('class', cls);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
    svg.append(n);
    return n;
  };
  mk('line', 'guide', { x1: '0', x2: '300', y1: String(Y0), y2: String(Y0) });
  mk('line', 'guide', { x1: '0', x2: '300', y1: String(Y0 - H), y2: String(Y0 - H) });
  const startPath = mk('path', 'p-start');
  const endPath = mk('path', 'p-end');
  const blendPath = mk('path', 'p-blend');
  const ball = mk('circle', 'ball', { r: '9', cx: '296', cy: String(Y0) });
  root.append(svg);

  const state = { start: 'back.in(1.2)', end: 'bounce', blender: 'power3.inOut' };
  let tween: gsap.core.Tween | undefined;
  let ctxRef: gsap.Context | undefined;

  const build = (): void => {
    const blended = blendEases(state.start, state.end, state.blender);
    startPath.setAttribute('d', curve(gsap.parseEase(state.start)));
    endPath.setAttribute('d', curve(gsap.parseEase(state.end)));
    blendPath.setAttribute('d', curve(blended));
    tween?.kill();
    gsap.set(ball, { y: 0 });
    // the same function that is drawn is the ease, so the ball rides the green line's height
    tween = gsap.to(ball, { y: -H, duration: 2, ease: blended, repeat: -1, repeatDelay: 0.6 });
  };

  const ctx = gsap.context(() => {
    build();
  }, el);
  ctxRef = ctx;

  if (!preview) {
    const controls = h('div', 'controls', '', root);
    const pick = (label: string, key: keyof typeof state, list: string[]): void => {
      const l = h('label', 'chk', label, controls);
      const sel = h('select', '', '', l);
      for (const e of list) sel.append(new Option(e, e));
      sel.value = state[key];
      sel.addEventListener('change', () => {
        state[key] = sel.value;
        ctxRef?.add(build);
      });
    };
    pick('start (blue)', 'start', EASES);
    pick('end (orange)', 'end', EASES);
    pick('blender', 'blender', EASES.filter((e) => e !== 'steps(6)'));
    h('p', 'readout', 'blendEases(start, end, blender): green = start * (1 - b) + end * b, where b is the blender ease at the same progress.', root);
  }

  return () => ctx.revert();
};

export default mount;
