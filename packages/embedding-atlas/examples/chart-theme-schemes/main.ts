// chartTheme light and dark entries chosen by colorScheme
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'colorScheme: dark': {
        charts: {
          chart: {
            title: 'words, dark',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
          } satisfies BuiltinChartSpec,
        },
        props: { colorScheme: 'dark', chartTheme: { light: { markColor: '#1e3a8a', markColorFade: '#c7d2fe' }, dark: { markColor: '#fb923c', markColorFade: '#5a3317' } } },
      },
      'colorScheme: light': {
        charts: {
          chart: {
            title: 'words, light',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
          } satisfies BuiltinChartSpec,
        },
        props: { colorScheme: 'light', chartTheme: { light: { markColor: '#1e3a8a', markColorFade: '#c7d2fe' }, dark: { markColor: '#fb923c', markColorFade: '#5a3317' } } },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
