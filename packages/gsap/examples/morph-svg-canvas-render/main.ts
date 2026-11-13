// MorphSVG to canvas: one morph timeline draws an SVG path and a canvas through render, defaultRender, defaultType and defaultUpdateTarget
import { gsap } from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { btn, check, h } from '../../shared/ui.ts';
import { SHAPES, tracePath, type RawPathLike } from './shapes.ts';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(MorphSVGPlugin);

const NS = 'http://www.w3.org/2000/svg';
const ORDER = [SHAPES.diamond, SHAPES.tablet, SHAPES.bolt] as const;

const mount: Mount = (el, { preview }) => {
  const SIZE = preview ? 110 : 190;
  const row = h('div', 'row', '', el);

  // SVG side: a circle element, converted to a <path> so it can morph
  const svgBox = h('div', 'box', '', row);
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('width', String(SIZE));
  svg.setAttribute('height', String(SIZE));
  const circle = document.createElementNS(NS, 'circle');
  for (const [k, v] of Object.entries(SHAPES.circle)) circle.setAttribute(k, String(v));
  circle.setAttribute('class', 'fill');
  svg.append(circle);
  svgBox.append(svg);
  // convertToPath swaps a <path> into the DOM where the circle was
  const shape = MorphSVGPlugin.convertToPath(circle)[0]!;
  const startD = shape.getAttribute('d') ?? '';
  if (!preview) h('span', 'cap', 'SVG path', svgBox);

  // Canvas side
  const canvasBox = h('div', 'box', '', row);
  const canvas = h('canvas', 'cv', '', canvasBox);
  const ratio = window.devicePixelRatio || 1;
  canvas.width = SIZE * ratio;
  canvas.height = SIZE * ratio;
  canvas.style.width = `${SIZE}px`;
  canvas.style.height = `${SIZE}px`;
  const c2d = canvas.getContext('2d')!;
  const scale = (SIZE * ratio) / 100;
  const grad = c2d.createLinearGradient(0, 0, 100 * scale, 100 * scale);
  grad.addColorStop(0.2, 'rgb(255, 135, 9)');
  grad.addColorStop(0.7, 'rgb(247, 189, 248)');
  if (!preview) h('span', 'cap', 'canvas', canvasBox);
  const info = preview ? undefined : h('pre', 'readout', '', el);

  // The render function receives the live RawPath and the tween target on every update.
  const draw = (rawPath: RawPathLike): void => {
    c2d.setTransform(1, 0, 0, 1, 0, 0);
    c2d.clearRect(0, 0, canvas.width, canvas.height);
    c2d.setTransform(scale, 0, 0, scale, 0, 0);
    c2d.fillStyle = grad;
    c2d.beginPath();
    tracePath(c2d, rawPath);
    c2d.fill('evenodd');
    if (info) {
      const d = MorphSVGPlugin.rawPathToString(rawPath);
      info.textContent = `render(rawPath): ${rawPath.length} segment, ${((rawPath[0]?.length ?? 2) - 2) / 6} curves\nrawPathToString: ${d.length > 72 ? `${d.slice(0, 72)}...` : d}`;
    }
  };
  // first frame, before the timeline has rendered: stringToRawPath turns the circle's d into a RawPath
  draw(MorphSVGPlugin.stringToRawPath(startD) as unknown as RawPathLike);

  // The statics are global to the page: keep the old values and restore them on cleanup.
  const saved = { render: MorphSVGPlugin.defaultRender, type: MorphSVGPlugin.defaultType, update: MorphSVGPlugin.defaultUpdateTarget };
  const cfg = { type: 'linear' as 'linear' | 'rotational', updateTarget: true };

  let tl: gsap.core.Timeline | undefined;
  const build = (): void => {
    tl?.kill();
    shape.setAttribute('d', startD);
    const opts = { ease: 'power2.inOut', duration: 1.4 };
    // In the card the options go on each tween; the full view uses the page-wide defaults instead.
    const per = preview ? { render: draw } : {};
    if (!preview) {
      MorphSVGPlugin.defaultRender = draw;
      MorphSVGPlugin.defaultType = cfg.type;
      MorphSVGPlugin.defaultUpdateTarget = cfg.updateTarget;
    }
    tl = gsap.timeline({ repeat: -1, defaults: opts });
    for (const [i, d] of [...ORDER, startD].entries()) tl.to(shape, { morphSVG: { shape: d, ...per } }, i ? '+=0.4' : 0);
    tl.progress(0.0001); // force a first render
  };
  build();

  if (!preview) {
    const bar = h('div', 'controls', '', el);
    const rot = check('defaultType = "rotational"', (on) => { cfg.type = on ? 'rotational' : 'linear'; build(); }, bar);
    rot.checked = false;
    const upd = check('defaultUpdateTarget = true', (on) => { cfg.updateTarget = on; build(); }, bar);
    upd.checked = true;
    btn('Restart', () => tl?.restart(), bar);
    h('p', 'note', 'Both panels are driven by one tween target. defaultRender sends every update to the canvas. Untick defaultUpdateTarget and the SVG path stops updating while the canvas keeps going. Rebuilding the timeline applies a changed default.', el);
  }

  return () => {
    tl?.kill();
    MorphSVGPlugin.defaultRender = saved.render;
    MorphSVGPlugin.defaultType = saved.type;
    MorphSVGPlugin.defaultUpdateTarget = saved.update;
  };
};

export default mount;
