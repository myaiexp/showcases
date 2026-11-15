// scale.x.type: linear, log, symlog, time and band
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'type: linear': {
        charts: {
          words: {
            title: 'words, linear',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
            scale: { x: { type: 'linear' } },
          } satisfies BuiltinChartSpec,
        },
      },
      'type: log': {
        charts: {
          words: {
            title: 'words, log',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
            scale: { x: { type: 'log' } },
          } satisfies BuiltinChartSpec,
        },
      },
      'type: symlog': {
        charts: {
          words: {
            title: 'words, symlog',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
            scale: { x: { type: 'symlog', constant: 10 } },
          } satisfies BuiltinChartSpec,
        },
      },
      'type: time': {
        charts: {
          published: {
            title: 'published, time',
            layers: [{ mark: 'bar', encoding: { x: { field: 'published', bin: { desiredCount: 20 } }, y: { aggregate: 'count' } } }],
            scale: { x: { type: 'time' } },
          } satisfies BuiltinChartSpec,
        },
      },
      'type: band': {
        charts: {
          source: {
            title: 'source, band',
            layers: [{ mark: 'bar', encoding: { x: { field: 'source' }, y: { aggregate: 'count' } } }],
            scale: { x: { type: 'band' } },
          } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
