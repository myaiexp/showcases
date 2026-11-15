// fillOpacity, strokeOpacity and opacity on overlapping bubbles
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'fillOpacity: 0.15': {
        charts: {
          bubbles: {
            title: 'fillOpacity: 0.15',
            layers: [{ mark: 'point', size: 1200, style: { fillColor: '$encoding', fillOpacity: 0.15, strokeColor: '$encoding' }, encoding: { x: { aggregate: 'mean', field: 'words' }, y: { aggregate: 'mean', field: 'score' }, color: { field: 'topic' }, group: { field: 'source' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'strokeOpacity: 0.2': {
        charts: {
          bubbles: {
            title: 'strokeOpacity: 0.2',
            layers: [{ mark: 'point', size: 1200, style: { fillColor: '$encoding', strokeColor: '#fff', strokeWidth: 3, strokeOpacity: 0.2 }, encoding: { x: { aggregate: 'mean', field: 'words' }, y: { aggregate: 'mean', field: 'score' }, color: { field: 'topic' }, group: { field: 'source' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'opacity: 0.4': {
        charts: {
          bubbles: {
            title: 'opacity: 0.4',
            layers: [{ mark: 'point', size: 1200, style: { fillColor: '$encoding', opacity: 0.4 }, encoding: { x: { aggregate: 'mean', field: 'words' }, y: { aggregate: 'mean', field: 'score' }, color: { field: 'topic' }, group: { field: 'source' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'fillColor: null': {
        charts: {
          bubbles: {
            title: 'fillColor: null',
            layers: [{ mark: 'point', size: 1200, style: { fillColor: null, strokeColor: '$encoding', strokeWidth: 2 }, encoding: { x: { aggregate: 'mean', field: 'words' }, y: { aggregate: 'mean', field: 'score' }, color: { field: 'topic' }, group: { field: 'source' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
