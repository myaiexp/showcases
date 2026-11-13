// An ease curve with a crosshair: pick an eased value and easeToLinear() finds the progress where it is hit
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { h, slider } from '../../shared/ui.ts';
import { easeToLinear } from './easeToLinear.ts';
import './style.css';

const NS = 'http://www.w3.org/2000/svg';
const X0 = 20, W = 260, Y0 = 170, H = 140;
const EASES = ['power2.out', 'power2.in', 'power4.out', 'sine.inOut', 'expo.out', 'circ.in'];
const FROM = 100, TO = 500;

const mount: Mount = (el, { preview }) => {
  const root = h('div', preview ? 'root compact' : 'root', '', el);
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 300 190');
  svg.classList.add('graph');
  root.append(svg);
  const node = (tag: string, cls: string, attrs: Record<string, string> = {}): SVGElement => {
    const n = document.createElementNS(NS, tag);
    n.setAttribute('class', cls);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
    svg.append(n);
    return n;
  };
  node('rect', 'frame', { x: String(X0), y: String(Y0 - H), width: String(W), height: String(H) });
  const curve = node('path', 'curve');
  const hLine = node('line', 'cross', { x1: String(X0) });
  const vLine = node('line', 'cross', { y2: String(Y0) });
  const hit = node('circle', 'hit', { r: '6' });
  const readout = h('p', 'readout', '', root);

  const state = { ease: 'power2.out', ratio: 0.7 };
  const render = (): void => {
    const progress = easeToLinear(state.ease, state.ratio, 0.00001);
    const y = Y0 - state.ratio * H;
    const x = X0 + progress * W;
    hLine.setAttribute('x2', String(x));
    hLine.setAttribute('y1', String(y));
    hLine.setAttribute('y2', String(y));
    vLine.setAttribute('x1', String(x));
    vLine.setAttribute('x2', String(x));
    vLine.setAttribute('y1', String(y));
    hit.setAttribute('cx', String(x));
    hit.setAttribute('cy', String(y));
    const value = FROM + state.ratio * (TO - FROM);
    readout.textContent = `${state.ease}: ${FROM} to ${TO} reaches ${value.toFixed(0)} (ratio ${state.ratio.toFixed(2)}) at linear progress ${progress.toFixed(3)}`;
  };
  const draw = (): void => {
    const fn = gsap.parseEase(state.ease);
    let d = '';
    for (let i = 0; i <= 80; i++) d += `${i ? 'L' : 'M'}${(X0 + (i / 80) * W).toFixed(1)} ${(Y0 - fn(i / 80) * H).toFixed(1)}`;
    curve.setAttribute('d', d);
    render();
  };
  draw();

  const cleanups: Array<() => void> = [];
  const ctx = gsap.context(() => {
    if (!preview) return;
    // the card sweeps the target ratio up and down by itself
    gsap.fromTo(state, { ratio: 0.05 }, { ratio: 0.95, duration: 2.6, ease: 'sine.inOut', repeat: -1, yoyo: true, onUpdate: render });
  }, el);

  if (!preview) {
    const bar = h('div', 'controls', '', root);
    const l = h('label', 'chk', 'ease ', bar);
    const sel = h('select', '', '', l);
    for (const e of EASES) sel.append(new Option(e, e));
    sel.addEventListener('change', () => { state.ease = sel.value; draw(); });
    slider('eased value ', 0.01, 0.99, 0.01, state.ratio, (v) => { state.ratio = v; render(); }, bar);
  } else readout.remove();

  return () => {
    for (const fn of cleanups) fn();
    ctx.revert();
  };
};

export default mount;
