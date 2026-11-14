// imageCloud: weighted images packed into a maskShape by the spiral layout
import { registerImageCloudChart } from '@visactor/vchart-extension';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { iconRows } from '../../shared/opts-images.ts';

let registered = false;
const SHAPES = ['circle', 'star', 'cardioid', 'triangle', 'diamond', 'pentagon'];

const mount: Mount = (el, ctx) => {
  if (!registered) {
    registered = true;
    registerImageCloudChart();
  }
  const rows = iconRows(ctx.preview ? 30 : 60, 7);
  return mountLive<{ shape: string }>(el, ctx, {
    initial: { shape: 'cardioid' },
    mode: 'rebuild',
    previewMs: 2200,
    step: (s) => ({ shape: SHAPES[(SHAPES.indexOf(s.shape) + 1) % SHAPES.length] as string }),
    build: (s, preview) =>
      ({
        type: 'imageCloud',
        data: [{ id: 'icons', values: rows }],
        urlField: 'url',
        nameField: 'name',
        valueField: 'value',
        // A built-in name goes through the geometric object form; a bare string is read as an image URL.
        maskShape: { type: 'geometric', shape: s.shape },
        layoutConfig: { layoutMode: 'spiral', spiralType: 'archimedean' },
        image: { padding: 2 },
        imageSizeRange: preview ? [14, 30] : [22, 52],
      }) as never,
    controls: (bar, live) => {
      select(bar, 'maskShape.shape', SHAPES, (v) => live.set({ shape: v })).value = 'cardioid';
    },
  });
};

export default mount;
