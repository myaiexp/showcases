// wordCloudConfig.layoutMode: three layout algorithms for the same words
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { readout, select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { wordRows } from '../../shared/wordcloud-data.ts';

const MODES = ['default', 'grid', 'fast'];
const rows = wordRows(8);

const mount: Mount = (el, ctx) => {
  const log = ctx.preview ? null : readout(el);
  const times: Record<string, number> = {};
  return mountLive<{ mode: string }>(el, ctx, {
    initial: { mode: 'default' },
    mode: 'rebuild',
    previewMs: 2200,
    chart: { height: 460 },
    build: ({ mode }) => {
      const t0 = performance.now();
      // The constructor lays the cloud out while it renders, so the time to build the spec
      // and render is dominated by the layout mode; it is a rough measure only.
      queueMicrotask(() => {
        times[mode] = Math.round(performance.now() - t0);
        if (log) log.textContent = Object.entries(times).map(([m, t]) => `${m}: ~${t} ms to build and render`).join('\n');
      });
      return {
        type: 'wordCloud',
        nameField: 'word',
        valueField: 'count',
        seriesField: 'word',
        fontSizeRange: [10, 48],
        wordCloudConfig: { layoutMode: mode },
        data: [{ id: 'words', values: rows }],
        legends: { visible: false },
        title: { visible: !ctx.preview, text: `layoutMode: '${mode}'` },
      } as unknown as ISpec;
    },
    step: (_s, i) => ({ mode: MODES[i % MODES.length] ?? 'default' }),
    controls: (bar, live) => {
      select(bar, 'layoutMode', MODES, (mode) => live.set({ mode }));
    },
  });
};

export default mount;
