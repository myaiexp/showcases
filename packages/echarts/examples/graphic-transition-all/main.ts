// Graphic component squares that rearrange with transition 'all' and separate enter, update and leave animations
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

const COUNT = 9;
const LAYOUTS = ['row', 'circle', 'grid', 'stairs'] as const;
type Layout = (typeof LAYOUTS)[number];
const TRANSITIONS = { all: 'all', 'x and y only': ['x', 'y'], none: [] } as const;

/** Colour as #rrggbb, because interpolating style.fill needs a colour zrender can parse. */
function hue(h: number): string {
  const f = (n: number): string => {
    const k = (n + h / 30) % 12;
    const c = 0.5 - 0.25 * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(c * 255).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/** Where square i goes: position, size, rotation and colour for each layout. */
function place(layout: Layout, i: number, w: number, h: number): { x: number; y: number; size: number; rotation: number; fill: string } {
  const cx = w / 2;
  const cy = h / 2;
  switch (layout) {
    case 'circle': {
      const a = (i / COUNT) * Math.PI * 2;
      const r = Math.min(w, h) * 0.32;
      return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a), size: 30, rotation: a + Math.PI / 2, fill: hue(200 + i * 18) };
    }
    case 'grid':
      return { x: cx + ((i % 3) - 1) * 60, y: cy + (Math.floor(i / 3) - 1) * 60, size: 46, rotation: 0, fill: hue(30 + i * 22) };
    case 'stairs':
      return { x: cx + (i - 4) * Math.min(40, w / 11), y: cy + (i - 4) * 14, size: 14 + i * 4, rotation: 0, fill: hue(120 + i * 12) };
    default:
      return { x: cx + (i - 4) * Math.min(44, w / 10), y: cy, size: 32, rotation: Math.PI / 4, fill: hue(280 + i * 10) };
  }
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 380 });
  let layout: Layout = 'row';
  let transition: keyof typeof TRANSITIONS = 'all';
  let updateMs = 900;
  let visible = COUNT;
  const present = new Set<number>(); // ids currently on the canvas

  const show = (): void => {
    const w = chart.getWidth();
    const h = chart.getHeight();
    const elements: Record<string, unknown>[] = [];
    for (let i = 0; i < COUNT; i++) {
      const id = `square-${i}`;
      if (i >= visible) {
        // Removing by id plays the leaveAnimation of that element.
        if (present.delete(i)) elements.push({ id, $action: 'remove' });
        continue;
      }
      const p = place(layout, i, w, h);
      present.add(i);
      elements.push({
        id,
        type: 'rect',
        x: p.x,
        y: p.y,
        rotation: p.rotation,
        shape: { x: -p.size / 2, y: -p.size / 2, width: p.size, height: p.size, r: 4 },
        style: { fill: p.fill },
        // transition: 'all' animates every changed property; an array limits it to those.
        transition: TRANSITIONS[transition],
        enterFrom: { x: w / 2, y: h / 2, scaleX: 0, scaleY: 0 },
        leaveTo: { scaleX: 0, scaleY: 0 },
        enterAnimation: { duration: 700, delay: i * 60, easing: 'backOut' },
        updateAnimation: { duration: updateMs, delay: i * 40, easing: 'cubicInOut' },
        leaveAnimation: { duration: 400, easing: 'cubicIn' },
      });
    }
    chart.setOption({ graphic: { elements } });
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    let n = 0;
    stop = every(2200, () => {
      n++;
      layout = LAYOUTS[n % LAYOUTS.length]!;
      visible = n % 3 === 2 ? 6 : COUNT;
      show();
    });
  } else {
    select(bar!, 'layout', LAYOUTS, (v) => {
      layout = v as Layout;
      show();
    });
    select(bar!, 'transition', Object.keys(TRANSITIONS), (v) => {
      transition = v as typeof transition;
      show();
    });
    slider(bar!, 'updateAnimation.duration', [100, 2000, 100], updateMs, (v) => {
      updateMs = v;
    });
    button(bar!, 'remove 3 squares', () => {
      visible = COUNT - 3;
      show();
    });
    button(bar!, 'bring them back', () => {
      visible = COUNT;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
