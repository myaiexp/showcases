// Image r option: portraits clipped to circles, preserveAspectRatio picks the crop
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv, type Row } from '../../shared/data.ts';
import { portrait } from '../../shared/image-portraits.ts';
import { mountPlot } from '../../shared/plot.ts';

const ASPECTS = ['xMidYMin slice', 'xMidYMid slice', 'xMidYMax slice', 'xMidYMid meet'] as const;

const mount: Mount = async (el, ctx) => {
  const presidents = (await csv('us-president-favorability.csv')).map((d) => ({ ...d, portrait: portrait(d.Name) }));
  return mountPlot<{ aspect: (typeof ASPECTS)[number] }>(el, ctx, {
    initial: { aspect: 'xMidYMin slice' },
    render: ({ aspect }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        x: { inset: 20, label: 'First inauguration date' },
        y: { insetTop: 4, grid: true, label: 'Any opinion (%)', tickFormat: '+f' },
        marks: [
          Plot.ruleY([0]),
          Plot.image(presidents, {
            x: 'First Inauguration Date',
            y: (d: Row) => d['Very Favorable %'] + d['Somewhat Favorable %'] + d['Very Unfavorable %'] + d['Somewhat Unfavorable %'],
            src: 'portrait',
            r: preview ? 10 : 20,
            preserveAspectRatio: aspect,
            title: 'Name',
          }),
        ],
      }),
    step: ({ aspect }) => ({ aspect: ASPECTS[(ASPECTS.indexOf(aspect) + 1) % ASPECTS.length] }),
    controls: (bar, live) => select(bar, 'preserveAspectRatio', ASPECTS, live.state.aspect, (aspect) => live.set({ aspect })),
  });
};

export default mount;
