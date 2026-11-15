// the liquid-template renderer with its template option
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';
import { formatColumns } from '../../shared/chart-formats.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'default template': {
        charts: {
          table: { type: 'instances', title: 'Documents', columns: ['topic', 'stars'], pageSize: 6, defaultHeight: 380 } satisfies BuiltinChartSpec,
        },
        columnStyles: { stars: { renderer: 'liquid-template' } },
      },
      'stars glyphs': {
        charts: {
          table: { type: 'instances', title: 'Documents', columns: ['topic', 'stars'], pageSize: 6, defaultHeight: 380 } satisfies BuiltinChartSpec,
        },
        columnStyles: { stars: { renderer: 'liquid-template', options: { template: '{% for i in (1..value) %}<span style="color:#f59e0b">★</span>{% endfor %}' } } },
      },
      'badge': {
        charts: {
          table: { type: 'instances', title: 'Documents', columns: ['topic', 'stars'], pageSize: 6, defaultHeight: 380 } satisfies BuiltinChartSpec,
        },
        columnStyles: { stars: { renderer: 'liquid-template', options: { template: '{% if value >= 4 %}<b style="color:#10b981">great ({{ value }})</b>{% elsif value >= 3 %}<b style="color:#f59e0b">fine ({{ value }})</b>{% else %}<b style="color:#ef4444">poor ({{ value }})</b>{% endif %}' } } },
      },
    },
    { extra: formatColumns, height: 440 },
  );
  return stage.dispose;
};

export default mount;
