// instances columnStyles overriding the global styles
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';
import { formatColumns } from '../../shared/chart-formats.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'chart-level override': {
        charts: {
          table: { type: 'instances', title: 'Documents', columns: ['topic', 'stars', 'note'], pageSize: 6, defaultHeight: 380,
            columnStyles: { stars: { renderer: 'liquid-template', options: { template: '{% for i in (1..value) %}★{% endfor %} ({{ value }})' } } } } satisfies BuiltinChartSpec,
        },
        columnStyles: { stars: { renderer: 'markdown' }, note: { renderer: 'markdown' } },
      },
    },
    { extra: formatColumns, height: 440 },
  );
  return stage.dispose;
};

export default mount;
