// Indicator autoFit, fitPercent and fitStrategy: text sized to the donut hole
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

interface S { inner: number; strategy: string }

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { inner: 0.6, strategy: 'default' },
    previewMs: 1300,
    step: (s, i) => ({ inner: [0.35, 0.55, 0.75][i % 3] as number, strategy: i % 6 < 3 ? 'default' : 'inscribed' }),
    build: (s) =>
      ({
        type: 'pie',
        data: [{ id: 'd', values: [{ k: 'Done', v: 62 }, { k: 'Doing', v: 25 }, { k: 'Todo', v: 13 }] }],
        categoryField: 'k',
        valueField: 'v',
        outerRadius: 0.9,
        innerRadius: s.inner,
        legends: { visible: false },
        indicator: {
          visible: true,
          fixed: true,
          trigger: 'none',
          title: { visible: true, autoFit: true, fitPercent: 0.6, fitStrategy: s.strategy, style: { text: '62%', fill: '#fbbf24', fontWeight: 'bold' } },
          content: [{ visible: true, autoFit: true, fitPercent: 0.7, fitStrategy: s.strategy, style: { text: 'tasks complete', fill: '#9aa3b2' } }],
        },
      }) as never,
    controls: (bar, live) => {
      slider(bar, 'innerRadius', [0.2, 0.85, 0.05], live.state.inner, (v) => live.set({ inner: v }));
      select(bar, 'fitStrategy', ['default', 'inscribed'], (v) => live.set({ strategy: v }));
    },
  });

export default mount;
