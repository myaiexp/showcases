// Animate: a grid of every documented easing name, each running
import { Ellipse, Leafer, Rect, Text } from 'leafer-ui';
import { AnimateEasing } from '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN } from '../../shared/event-kit.ts';
import { curvePath } from '../../shared/animate-kit.ts';

const NAMES = [
  'ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out',
  'sine-in', 'sine-out', 'sine-in-out',
  'quad-in', 'quad-out', 'quad-in-out',
  'cubic-in', 'cubic-out', 'cubic-in-out',
  'quart-in', 'quart-out', 'quart-in-out',
  'quint-in', 'quint-out', 'quint-in-out',
  'expo-in', 'expo-out', 'expo-in-out',
  'circ-in', 'circ-out', 'circ-in-out',
  'back-in', 'back-out', 'back-in-out',
  'elastic-in', 'elastic-out', 'elastic-in-out',
  'bounce-in', 'bounce-out', 'bounce-in-out',
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Every tile plots its easing; the dot rides the rail beside it with the same easing.', height: 520 });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const cols = stage.preview ? 7 : 6;
  const rows = Math.ceil(NAMES.length / cols);
  const cw = (stage.width - 8) / cols;
  const ch = (stage.height - 8) / rows;
  const lab = stage.preview ? 0 : 14; // a name under each plot in the full view
  NAMES.forEach((name, i) => {
    const x = 4 + (i % cols) * cw;
    const y = 4 + Math.floor(i / cols) * ch;
    const pw = cw - (stage.preview ? 14 : 30);
    const ph = ch - lab - (stage.preview ? 8 : 14);
    const fn = AnimateEasing.get(name) as (t: number) => number;
    leafer.add(new Rect({ x: x + 3, y: y + 3, width: pw, height: ph, stroke: 'rgba(0,0,0,0.15)', hittable: false }));
    // curve is drawn in the lower 60% of the box so overshoot stays inside the tile
    leafer.add({ tag: 'Path', path: curvePath(fn, x + 3, y + 3 + ph * 0.2, pw, ph * 0.6), stroke: GREEN, strokeWidth: 1.5, hittable: false });
    const rail = x + pw + 9;
    leafer.add(new Rect({ x: rail - 1, y: y + 3, width: 2, height: ph, fill: 'rgba(0,0,0,0.12)', hittable: false }));
    const dot = new Ellipse({ x: rail - 4, y: y + 3 + ph * 0.8 - 4, width: 8, height: 8, fill: '#ff4b4b', hittable: false });
    leafer.add(dot);
    dot.animate({ y: y + 3 + ph * 0.2 - 4 }, { easing: name, duration: 1.8, swing: true, loopDelay: 0.2 }); // the easing by name
    if (lab) leafer.add(new Text({ x, y: y + ch - lab - 2, width: cw, text: name, textAlign: 'center', fontSize: 10, fill: '#666', hittable: false }));
  });
  return stage.dispose;
};

export default mount;
