// Sequence link series: straight or curved links, with or without arrows
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, fit, frame, dotLinkSeries, timeAxis, trace } from '../../shared/sequence-data.ts';

type S = { linkType: string; arrows: boolean };
const STEPS: S[] = [
  { linkType: 'line', arrows: true },
  { linkType: 'curve', arrows: true },
  { linkType: 'curve', arrows: false },
  { linkType: 'line', arrows: false },
];
const full = trace();

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: STEPS[0] as S,
    mode: 'rebuild',
    chart: { height: 330 },
    build: ({ linkType, arrows }, preview) => {
      const { rows, links } = fit(full, preview);
      return asSpec({
        type: 'sequence',
        ...frame(preview),
        series: dotLinkSeries({
          link: {
            linkType,
            arrow: { style: { visible: arrows } },
            link: { style: { lineWidth: 2 } },
          },
        }, preview),
        axes: [timeAxis()],
        data: [
          { id: 'dots', values: rows },
          { id: 'links', values: links },
        ],
      });
    },
    controls: (bar, live) => {
      select(bar, 'linkType', ['line', 'curve'], (v) => live.set({ linkType: v }));
      button(bar, 'toggle arrows', () => live.set({ arrows: !live.state.arrows }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as S,
    previewMs: 1800,
  });

export default mount;
