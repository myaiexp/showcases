// bar.customShape: a path callback replaces the rectangle, drawn relative to the bar's top-left corner
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { weekdayRows } from '../../shared/anim-data.ts';

type Shape = 'pyramid' | 'wave' | 'arrow';
interface Path {
  moveTo(x: number, y: number): void;
  lineTo(x: number, y: number): void;
  quadraticCurveTo(cx: number, cy: number, x: number, y: number): void;
  closePath(): void;
}
interface Attrs {
  width: number;
  y: number;
  y1: number;
}

const SHAPES: Record<Shape, (attrs: Attrs, path: Path) => Path> = {
  pyramid: ({ width: w, y, y1 }, path) => {
    path.moveTo(0, y1 - y);
    path.lineTo(w / 2, 0);
    path.lineTo(w, y1 - y);
    path.closePath();
    return path;
  },
  // The wave is the callback from the option reference: a rounded peak with a flat base.
  wave: ({ width: w, y, y1 }, path) => {
    const h = y1 - y;
    path.moveTo(0, h);
    path.quadraticCurveTo(0.45 * w, 0.67 * h, 0.5 * w, 0);
    path.quadraticCurveTo(0.55 * w, 0.67 * h, w, h);
    path.lineTo(0, h);
    path.closePath();
    return path;
  },
  arrow: ({ width: w, y, y1 }, path) => {
    const h = y1 - y;
    const head = Math.min(h, w * 0.7);
    path.moveTo(0, h);
    path.lineTo(0, head);
    path.lineTo(w / 2, 0);
    path.lineTo(w, head);
    path.lineTo(w, h);
    path.closePath();
    return path;
  },
};

const SHAPE_NAMES = Object.keys(SHAPES) as Shape[];

const mount: Mount = (el, ctx) =>
  mountLive<{ shape: Shape; seed: number }>(el, ctx, {
    initial: { shape: 'pyramid', seed: 3 },
    mode: 'rebuild',
    previewMs: 1800,
    step: (s, i) => ({ shape: SHAPE_NAMES[i % SHAPE_NAMES.length] ?? 'pyramid', seed: s.seed + 1 }),
    build: ({ shape, seed }) =>
      ({
        type: 'bar',
        data: [{ id: 'sales', values: weekdayRows(seed) }],
        xField: 'day',
        yField: 'sales',
        legends: { visible: false },
        bar: {
          style: { fill: { gradient: 'linear', x0: 0, y0: 0, x1: 0, y1: 1, stops: [{ offset: 0, color: '#ffd93d' }, { offset: 1, color: '#e5534b' }] } },
          customShape: (_datum: unknown, attrs: Attrs, path: Path) => SHAPES[shape](attrs, path),
        },
      }) as unknown as ISpec,
    controls: (bar, live) => {
      select(bar, 'customShape', SHAPE_NAMES, (v) => live.set({ shape: v as Shape }));
    },
  });

export default mount;
