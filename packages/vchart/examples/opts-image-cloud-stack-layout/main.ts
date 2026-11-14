// imageCloud stack layout: overlapping tilted images, maxAngle and placement
import { registerImageCloudChart } from '@visactor/vchart-extension';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { iconRows } from '../../shared/opts-images.ts';

let registered = false;
const PLACEMENTS = ['default', 'masked', 'edge'];

const mount: Mount = (el, ctx) => {
  if (!registered) {
    registered = true;
    registerImageCloudChart();
  }
  const rows = iconRows(ctx.preview ? 24 : 50, 11);
  return mountLive<{ angle: number; placement: string }>(el, ctx, {
    initial: { angle: 1.22, placement: 'default' },
    mode: 'rebuild',
    previewMs: 2000,
    step: (_s, i) => ({ angle: [0, 0.6, 1.22][i % 3] as number, placement: 'default' }),
    build: (s, preview) =>
      ({
        type: 'imageCloud',
        data: [{ id: 'icons', values: rows }],
        urlField: 'url',
        valueField: 'value',
        maskShape: { type: 'geometric', shape: 'circle' },
        imageSizeRange: preview ? [20, 36] : [24, 54],
        layoutConfig: { layoutMode: 'stack', maxAngle: s.angle, placement: s.placement },
      }) as never,
    controls: (bar, live) => {
      slider(bar, 'maxAngle', [0, 1.57, 0.01], live.state.angle, (v) => live.set({ angle: v }));
      select(bar, 'placement', PLACEMENTS, (v) => live.set({ placement: v }));
    },
  });
};

export default mount;
