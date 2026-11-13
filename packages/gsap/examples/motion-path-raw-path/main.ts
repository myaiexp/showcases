// MotionPath RawPath utilities: parse a path, slice it, measure it, find positions on it, and plot a curve through points
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { h, slider } from '../../shared/ui.ts';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(MotionPathPlugin);

const NS = 'http://www.w3.org/2000/svg';
const BASE_D = 'M20,120 C60,20 140,20 180,100 S280,190 330,110 S420,30 480,110';
const THRU = [20, 235, 110, 205, 200, 248, 300, 208, 400, 244, 480, 205];

const svgEl = <K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string>, parent?: Element): SVGElementTagNameMap[K] => {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  parent?.append(e);
  return e;
};

const mount: Mount = (el, { preview }) => {
  const svg = svgEl('svg', { viewBox: '0 0 500 262', class: 'stage' });
  const base = svgEl('path', { d: BASE_D, class: 'base', id: 'rawpath-base' }, svg);
  const slice = svgEl('path', { class: 'slice' }, svg);
  const thru = svgEl('path', { class: 'thru' }, svg);
  if (!preview) for (let i = 0; i < THRU.length; i += 2) svgEl('circle', { cx: String(THRU[i]), cy: String(THRU[i + 1]), r: '3', class: 'anchor' }, svg);
  const circle = svgEl('circle', { cx: '440', cy: '42', r: '20', class: 'shape' }, svg);
  const dot = svgEl('circle', { r: '7', class: 'dot' }, svg);
  const tick = svgEl('line', { x1: '0', y1: '0', x2: '26', y2: '0', class: 'tangent' }, svg);
  svg.append(dot);
  el.append(svg);
  const out = h('pre', 'readout', '');
  if (!preview) el.append(out);

  // stringToRawPath: the d string as arrays of cubic bezier coordinates
  const raw = MotionPathPlugin.stringToRawPath(BASE_D);
  // getRawPath accepts a path element, a selector or a d string. cacheRawPathMeasurements is needed
  // before getPositionOnPath can be used.
  const fromElement = MotionPathPlugin.getRawPath(base);
  MotionPathPlugin.cacheRawPathMeasurements(raw);

  // convertToPath with swap false: get a <path> for the circle without replacing it
  const circlePath = MotionPathPlugin.convertToPath(circle, false)[0]!;
  circlePath.setAttribute('class', 'converted');
  svg.append(circlePath);

  const cfg = { start: 0.15, end: 0.65, at: 0.5, curviness: 1 };
  const update = (): void => {
    // sliceRawPath returns a new RawPath for the piece between two positions
    const part = MotionPathPlugin.sliceRawPath(raw, cfg.start, cfg.end);
    const partD = MotionPathPlugin.rawPathToString(part);
    slice.setAttribute('d', partD);
    // getPositionOnPath: x, y and (with true) the angle at a progress value
    const pos = MotionPathPlugin.getPositionOnPath(raw, cfg.at, true) as gsap.plugins.getRelativePositionObject;
    dot.setAttribute('cx', String(pos.x));
    dot.setAttribute('cy', String(pos.y));
    tick.setAttribute('transform', `translate(${pos.x} ${pos.y}) rotate(${pos.angle})`);
    // pointsToSegment: a curve through the points, wrapped in a RawPath to draw it
    const seg = MotionPathPlugin.pointsToSegment(THRU, cfg.curviness);
    thru.setAttribute('d', MotionPathPlugin.rawPathToString([seg]));
    if (preview) return;
    const first = raw[0] ?? [];
    const curves = (first.length - 2) / 6;
    out.textContent = [
      `stringToRawPath: ${raw.length} segment, ${curves} cubic curves, first curve [${first.slice(0, 8).map((n) => Math.round(n)).join(', ')}]`,
      `getRawPath(element) has the same data: ${JSON.stringify(fromElement) === JSON.stringify(raw)}`,
      `getLength(rawPath) ${MotionPathPlugin.getLength(raw).toFixed(1)}   getLength(path element) ${MotionPathPlugin.getLength(base).toFixed(1)}`,
      `sliceRawPath(raw, ${cfg.start}, ${cfg.end}): length ${MotionPathPlugin.getLength(part).toFixed(1)}`,
      `getPositionOnPath(raw, ${cfg.at}, true): x ${pos.x.toFixed(0)} y ${pos.y.toFixed(0)} angle ${pos.angle.toFixed(0)}`,
      `convertToPath(circle, false): length ${MotionPathPlugin.getLength(circlePath).toFixed(1)}`,
      `pointsToSegment(points, ${cfg.curviness}): ${(seg.length - 2) / 6} cubic curves`,
    ].join('\n');
  };
  update();

  const ctx = gsap.context(() => {
    if (preview) {
      // slide the slice window and the marker along the path
      const d = { t: 0 };
      gsap.to(d, {
        t: 1,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        onUpdate: () => {
          cfg.start = d.t * 0.5;
          cfg.end = 0.3 + d.t * 0.7;
          cfg.at = d.t;
          update();
        },
      });
    }
  }, el);

  if (!preview) {
    const bar = h('div', 'controls', '', el);
    slider('slice start', 0, 1, 0.01, cfg.start, (v) => { cfg.start = v; update(); }, bar);
    slider('slice end', 0, 1, 0.01, cfg.end, (v) => { cfg.end = v; update(); }, bar);
    slider('position at', 0, 1, 0.01, cfg.at, (v) => { cfg.at = v; update(); }, bar);
    slider('curviness', 0, 2, 0.1, cfg.curviness, (v) => { cfg.curviness = v; update(); }, bar);
  }

  return () => {
    ctx.revert();
    circlePath.remove();
  };
};

export default mount;
