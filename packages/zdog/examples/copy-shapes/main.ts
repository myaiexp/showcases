// Copy shapes: one fence picket, copied with new positions and colours
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select, slider } from '../../shared/controls.ts';

const PATTERNS = ['all white', 'alternating', 'rainbow'] as const;
type Pattern = (typeof PATTERNS)[number];
const RAINBOW = ['#C25', '#E62', '#EA0', '#3c6', '#6cf', '#a35ac9'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to look around. Only the first picket is built by hand.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 0.95,
    rotate: { x: -0.2, y: -0.5 },
    dragRotate: true,
  });
  const fence = new Zdog.Anchor({ addTo: illo, translate: { y: 35 } });

  let count = 8;
  let pattern: Pattern = 'rainbow';
  let rail: Zdog.Shape | null = null;
  let copies: Zdog.Shape[] = [];
  const GAP = 24;

  // the original picket, a pointed board
  const picket = new Zdog.Shape({
    addTo: fence,
    path: [{ x: -7, y: 0 }, { x: -7, y: -62 }, { x: 0, y: -74 }, { x: 7, y: -62 }, { x: 7, y: 0 }],
    closed: true,
    fill: true,
    stroke: 4,
    color: '#fff',
  });

  const colorAt = (i: number): string => {
    if (pattern === 'all white') return '#fff';
    if (pattern === 'alternating') return i % 2 ? '#FDB' : '#fff';
    return RAINBOW[i % RAINBOW.length]!;
  };

  const rebuild = (): void => {
    for (const c of copies) c.remove();
    rail?.remove();
    const left = (-(count - 1) * GAP) / 2;
    picket.translate.x = left;
    picket.color = colorAt(0);
    // copy() takes the picket's options, and whatever you pass replaces them
    copies = [];
    for (let i = 1; i < count; i++) {
      copies.push(picket.copy({ translate: { x: left + i * GAP }, color: colorAt(i) }));
    }
    rail = new Zdog.Shape({
      addTo: fence,
      path: [{ x: left }, { x: left + (count - 1) * GAP }],
      translate: { y: -14, z: -8 },
      stroke: 5,
      color: '#a5622a',
    });
  };
  rebuild();

  if (stage.bar) {
    slider(stage.bar, 'pickets', 2, 10, 1, count, (v) => { count = v; rebuild(); });
    select(stage.bar, 'colours', PATTERNS, (v) => { pattern = v; rebuild(); }, pattern);
  } else {
    let i = 2;
    stage.every(1800, () => {
      pattern = PATTERNS[++i % PATTERNS.length]!;
      rebuild();
    });
  }

  stage.loop((_dt, t) => {
    if (stage.preview) illo.rotate.y = -0.5 + 0.6 * Math.sin(t * 0.7);
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
