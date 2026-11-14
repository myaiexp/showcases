// A global scale used in a mark style with changeDomain none | replace | expand
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { rng } from '../../shared/components-data.ts';

const MODES = ['none', 'replace', 'expand'];
const r = rng(15);
// v runs from 20 to 160, but the global scale only declares the domain [0, 100].
const values = Array.from({ length: 12 }, (_, i) => ({ x: i + 1, y: Math.round(20 + r() * 60), v: 20 + i * 13 }));

const mount: Mount = (el, ctx) =>
  mountLive<{ mode: string }>(el, ctx, {
    initial: { mode: 'none' },
    mode: 'rebuild',
    previewMs: 1500,
    step: (_s, i) => ({ mode: MODES[i % MODES.length] ?? 'none' }),
    build: ({ mode }, preview) =>
      ({
        type: 'scatter',
        data: [{ id: 'd', values }],
        scales: [{ id: 'sizeScale', type: 'linear', domain: [0, 100], range: [6, 30] }],
        xField: 'x',
        yField: 'y',
        point: {
          style: {
            fill: '#4d7cff',
            fillOpacity: 0.7,
            size: { scale: 'sizeScale', field: 'v', changeDomain: mode },
          },
        },
        title: preview ? undefined : { visible: true, text: `changeDomain: '${mode}'`, textStyle: { fontSize: 13 } },
        tooltip: { visible: false },
      }) as unknown as ISpec,
    controls: (bar, live) => {
      select(bar, 'changeDomain', MODES, (v) => live.set({ mode: v }));
    },
  });

export default mount;
