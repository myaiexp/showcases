// imageCloud grid layout: cellType and placement
import { registerImageCloudChart } from '@visactor/vchart-extension';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { iconRows } from '../../shared/opts-images.ts';

let registered = false;
const CELLS = ['rect', 'circle', 'hexagonal'];
const PLACEMENTS = ['default', 'masked', 'edge'];

const mount: Mount = (el, ctx) => {
  if (!registered) {
    registered = true;
    registerImageCloudChart();
  }
  const rows = iconRows(ctx.preview ? 30 : 80, 3);
  return mountLive<{ cell: string; placement: string }>(el, ctx, {
    initial: { cell: 'hexagonal', placement: 'default' },
    mode: 'rebuild',
    previewMs: 2200,
    step: (_s, i) => ({ cell: CELLS[i % 3] as string, placement: PLACEMENTS[Math.floor(i / 3) % 3] as string }),
    build: (s, preview) =>
      ({
        type: 'imageCloud',
        data: [{ id: 'icons', values: rows }],
        urlField: 'url',
        valueField: 'value',
        maskShape: { type: 'geometric', shape: 'star' },
        imageSizeRange: preview ? [16, 16] : [28, 28],
        layoutConfig: { layoutMode: 'grid', cellType: s.cell, placement: s.placement },
      }) as never,
    controls: (bar, live) => {
      select(bar, 'cellType', CELLS, (v) => live.set({ cell: v })).value = 'hexagonal';
      select(bar, 'placement', PLACEMENTS, (v) => live.set({ placement: v }));
    },
  });
};

export default mount;
