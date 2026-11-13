// A curve through five anchors is drawn point by point: anchorsToProgress() gives each anchor's progress for DrawSVG
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import { anchorsToProgress } from './anchorsToProgress.ts';
import './style.css';

gsap.registerPlugin(MotionPathPlugin, DrawSVGPlugin);

const NS = 'http://www.w3.org/2000/svg';
const ANCHORS = [{ x: 50, y: 130 }, { x: 300, y: 10 }, { x: 500, y: 70 }, { x: 700, y: 190 }, { x: 850, y: 100 }];

const mount: Mount = (el, { preview }) => {
  const root = h('div', preview ? 'root compact' : 'root', '', el);
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 -10 900 220');
  svg.classList.add('graph');
  root.append(svg);
  const node = (tag: string, attrs: Record<string, string>, cls = ''): SVGElement => {
    const n = document.createElementNS(NS, tag);
    if (cls) n.setAttribute('class', cls);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
    svg.append(n);
    return n;
  };

  const rawPath = MotionPathPlugin.arrayToRawPath(ANCHORS, { curviness: 0.5 });
  const d = MotionPathPlugin.rawPathToString(rawPath);
  node('path', { d }, 'template');
  const path = node('path', { d }, 'drawn');
  const dots = ANCHORS.map((a) => node('circle', { cx: String(a.x), cy: String(a.y), r: '9' }, 'anchor'));
  const readout = h('p', 'readout', '', root);

  // progress value (0-1) of each anchor along the path
  const progressArray = anchorsToProgress(rawPath);

  let index = 0;
  let go: (i: number) => void = () => {};
  const proxy = { p: 0 };
  const ctx = gsap.context(() => {
    // paused tween that draws the path; its progress is what moves between anchors
    const drawPath = gsap.from(path, { ease: 'none', drawSVG: false, paused: true, duration: 5 });
    const show = (): void => {
      drawPath.progress(proxy.p);
      dots.forEach((dot, i) => dot.classList.toggle('on', proxy.p >= (progressArray[i] as number) - 0.001));
    };
    // one retargetable tween (quickTo) instead of a new tween per click, so go() needs no ctx.add
    const toProgress = gsap.quickTo(proxy, 'p', { duration: preview ? 1.1 : 1.6, ease: 'power2.inOut', onUpdate: show });
    go = (i: number): void => {
      index = i;
      toProgress(progressArray[i] as number);
      readout.textContent = `anchor ${i}: progress ${(progressArray[i] as number).toFixed(3)}  (all: ${progressArray.map((p) => p.toFixed(2)).join(', ')})`;
    };
    show();
    go(1);
  }, el);

  let timer: number | undefined;
  if (preview) {
    readout.remove();
    let step = 1;
    timer = window.setInterval(() => {
      step = (step + 1) % ANCHORS.length;
      go(step);
    }, 1400);
  } else {
    const bar = h('div', 'controls', '', root);
    btn('previous', () => { if (index > 0) go(index - 1); }, bar);
    btn('next', () => { if (index < ANCHORS.length - 1) go(index + 1); }, bar);
  }

  return () => {
    if (timer) window.clearInterval(timer);
    ctx.revert();
  };
};

export default mount;
