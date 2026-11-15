// chartTheme brushFill, brushBorder and interpolate for heatmap color
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'interpolate: viridis': {
        charts: {
          heat: {
            title: 'count by words and score',
            layers: [{ mark: 'rect', encoding: { x: { field: 'words', bin: { desiredCount: 20 } }, y: { field: 'score', bin: { desiredCount: 20 } }, color: { aggregate: 'count' } } }],
            selection: { brush: { encoding: 'xy' } },
          } satisfies BuiltinChartSpec,
        },
        chartStates: { heat: { brush: { x: [150, 500], y: [30, 70] } } },
        props: { chartTheme: { interpolate: 'viridis', brushFill: 'rgba(250, 204, 21, 0.25)', brushBorder: '#facc15', brushBorderBack: '#000' } },
      },
      'interpolate: cividis': {
        charts: {
          heat: {
            title: 'count by words and score',
            layers: [{ mark: 'rect', encoding: { x: { field: 'words', bin: { desiredCount: 20 } }, y: { field: 'score', bin: { desiredCount: 20 } }, color: { aggregate: 'count' } } }],
            selection: { brush: { encoding: 'xy' } },
          } satisfies BuiltinChartSpec,
        },
        chartStates: { heat: { brush: { x: [150, 500], y: [30, 70] } } },
        props: { chartTheme: { interpolate: 'cividis', brushFill: 'rgba(244, 63, 94, 0.25)', brushBorder: '#f43f5e', brushBorderBack: '#000' } },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
