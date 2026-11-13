// One ease weighted five ways: each dot traces its own curve, the ratio in parentheses bends it
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { h } from '../../shared/ui.ts';
import { addWeightedEases } from './addWeightedEases.ts';
import './style.css';

const NS = 'http://www.w3.org/2000/svg';
const X0 = 20, W = 260, Y0 = 170, H = 140;
const RATIOS = [-1, -0.5, 0, 0.5, 1];
const COLORS = ['var(--red)', 'var(--orange)', 'var(--fg-1)', 'var(--cyan)', 'var(--green)'];
const BASES = ['power1.in', 'power2.out', 'power2.inOut', 'power4.inOut', 'sine.inOut', 'expo.inOut', 'circ.inOut'];

const mount: Mount = (el, { preview }) => {
  // The helper decorates gsap's shared ease table once; calling it again is harmless.
  addWeightedEases();
  const root = h('div', preview ? 'root compact' : 'root', '', el);
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 -10 300 200');
  svg.classList.add('graph');
  root.append(svg);
  const node = (tag: string, attrs: Record<string, string>): SVGElement => {
    const n = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
    svg.append(n);
    return n;
  };
  node('line', { class: 'guide', x1: '0', x2: '300', y1: String(Y0), y2: String(Y0) });
  node('line', { class: 'guide', x1: '0', x2: '300', y1: String(Y0 - H), y2: String(Y0 - H) });
  const paths = RATIOS.map((_, i) => node('path', { class: 'curve', stroke: COLORS[i] as string }));
  const dots = RATIOS.map((_, i) => node('circle', { r: '6', cx: String(X0), cy: String(Y0), fill: COLORS[i] as string }));

  const legend = h('div', 'legend', '', root);
  const base = { name: 'power2.inOut' };
  let timeline: gsap.core.Timeline | undefined;

  const build = (): void => {
    timeline?.kill();
    timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.7 });
    RATIOS.forEach((r, i) => {
      const ease = `${base.name}(${r})`;
      const fn = gsap.parseEase(ease);
      let d = '';
      for (let k = 0; k <= 80; k++) d += `${k ? 'L' : 'M'}${(X0 + (k / 80) * W).toFixed(1)} ${(Y0 - fn(k / 80) * H).toFixed(1)}`;
      (paths[i] as SVGElement).setAttribute('d', d);
      const dot = dots[i] as SVGElement;
      // x is linear and y uses the weighted ease, so the dot walks along the curve itself
      gsap.set(dot, { x: 0, y: 0 });
      timeline?.to(dot, { x: W, duration: 2.2, ease: 'none' }, 0).to(dot, { y: -H, duration: 2.2, ease }, 0);
    });
    legend.replaceChildren();
    RATIOS.forEach((r, i) => {
      const s = h('span', 'tag', `${base.name}(${r})`, legend);
      s.style.color = COLORS[i] as string;
    });
  };

  const ctx = gsap.context(() => build(), el);

  if (!preview) {
    const controls = h('div', 'controls', '', root);
    const l = h('label', 'chk', 'base ease ', controls);
    const sel = h('select', '', '', l);
    for (const b of BASES) sel.append(new Option(b, b));
    sel.value = base.name;
    sel.addEventListener('change', () => {
      base.name = sel.value;
      ctx.add(build);
    });
  } else legend.remove();

  return () => ctx.revert();
};

export default mount;
