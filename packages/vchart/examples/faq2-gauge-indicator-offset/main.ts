// FAQ: indicator.offsetY moves the gauge's centre text; title and content take their own styles
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const OFFSETS = ['0', '20%', '40%', '50%'];
interface S {
  offset: string;
}

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { offset: '40%' },
    previewMs: 1500,
    step: (s) => ({ offset: OFFSETS[(OFFSETS.indexOf(s.offset) + 1) % OFFSETS.length] as string }),
    controls: (bar, live) => {
      select(bar, 'offsetY', OFFSETS, (v) => live.set({ offset: v })).value = live.state.offset;
    },
    build: (s): ISpec =>
      ({
        type: 'gauge',
        data: [{ id: 'g', values: [{ type: 'Target A', value: 0.6 }] }],
        categoryField: 'type',
        valueField: 'value',
        outerRadius: 0.85,
        innerRadius: 0.7,
        startAngle: -225,
        endAngle: 45,
        indicator: [
          {
            visible: true,
            offsetY: s.offset,
            title: { style: { text: 'Normal', fill: '#ffffff', fontSize: ctx.preview ? 22 : 34, fontWeight: 800 } },
            content: [{ visible: true, style: { text: '60% of target', fill: '#9aa4ad', fontSize: ctx.preview ? 11 : 16 } }],
          },
        ],
      }) as unknown as ISpec,
  });

export default mount;
