// the $markColor, $ruleColor and other $-prefixed theme colors in a style
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'fillColor: $markColor': {
        charts: {
          words: {
            title: 'fillColor: $markColor',
            layers: [{ mark: 'bar', style: { fillColor: '$markColor' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'fillColor: $markColorFade': {
        charts: {
          words: {
            title: 'fillColor: $markColorFade',
            layers: [{ mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'fillColor: $markColorGray': {
        charts: {
          words: {
            title: 'fillColor: $markColorGray',
            layers: [{ mark: 'bar', style: { fillColor: '$markColorGray' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'fillColor: $markColorGrayFade': {
        charts: {
          words: {
            title: 'fillColor: $markColorGrayFade',
            layers: [{ mark: 'bar', style: { fillColor: '$markColorGrayFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'fillColor: $ruleColor': {
        charts: {
          words: {
            title: 'fillColor: $ruleColor',
            layers: [{ mark: 'bar', style: { fillColor: '$ruleColor' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'fillColor: $gridColor': {
        charts: {
          words: {
            title: 'fillColor: $gridColor',
            layers: [{ mark: 'bar', style: { fillColor: '$gridColor' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'fillColor: $labelColor': {
        charts: {
          words: {
            title: 'fillColor: $labelColor',
            layers: [{ mark: 'bar', style: { fillColor: '$labelColor' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'fillColor: #e879f9': {
        charts: {
          words: {
            title: 'fillColor: #e879f9',
            layers: [{ mark: 'bar', style: { fillColor: '#e879f9' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
