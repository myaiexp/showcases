// The chartTheme prop: mark, category, grid and label colors
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'markColor': {
        charts: {
          chart: {
            title: 'words, markColor',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
          } satisfies BuiltinChartSpec,
        },
        props: { chartTheme: { markColor: '#f97316', markColorFade: '#5a3317' } },
      },
      'categoryColors': {
        charts: {
          chart: {
            title: 'words by topic, categoryColors',
            layers: [{ mark: 'bar', encoding: { x: { field: 'words', bin: { desiredCount: 12 } }, y: { aggregate: 'count' }, color: { field: 'topic' } } }],
          } satisfies BuiltinChartSpec,
        },
        props: { chartTheme: { categoryColors: ['#f43f5e', '#f59e0b', '#10b981', '#06b6d4', '#8b5cf6'], otherColor: '#e5e7eb' } },
      },
      'grid and labels': {
        charts: {
          chart: {
            title: 'words, grid and labels',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
          } satisfies BuiltinChartSpec,
        },
        props: { chartTheme: { gridColor: '#65a30d', labelColor: '#d9f99d', labelFontSize: 14, labelFontFamily: 'serif' } },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
