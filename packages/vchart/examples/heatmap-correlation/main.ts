// Correlation heatmap: common chart, heatmap series, a linear color scale and a color legend
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { correlations, seeded } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const NAMES = ['Debt ratio', 'Equity', 'Capital', 'Turnover', 'Margin', 'Growth'];
const rand = seeded(10);
const next = () => correlations(rand, NAMES);

const mount: Mount = (el, ctx) =>
  mountData(el, ctx, {
    next,
    spec: {
      type: 'common',
      data: [{ id: 'data', values: next() }],
      series: [
        {
          type: 'heatmap',
          xField: 'var1',
          yField: 'var2',
          valueField: 'value',
          cell: { style: { fill: { field: 'value', scale: 'color' } } },
        },
      ],
      color: {
        type: 'linear',
        domain: [{ dataId: 'data', fields: ['value'] }],
        range: ['#2b6cb0', '#9bbbe0', '#f5f0e6', '#f0a35e', '#c0392b'],
      },
      axes: [
        { orient: 'bottom', type: 'band', grid: { visible: false }, domainLine: { visible: false }, bandPadding: 0, label: { visible: !ctx.preview } },
        { orient: 'left', type: 'band', grid: { visible: false }, domainLine: { visible: false }, bandPadding: 0, label: { visible: !ctx.preview } },
      ],
      legends: {
        visible: !ctx.preview,
        orient: 'right',
        type: 'color',
        field: 'value',
        title: { visible: true, text: 'Correlation' },
      },
    } as ISpec,
  });

export default mount;
