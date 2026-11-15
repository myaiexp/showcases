// a markdown chart spec with content
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'markdown': {
        charts: {
          note: {
            type: 'markdown',
            title: 'Notes',
            content: [
              '## Reading this dashboard',
              '',
              'The **count plot** shows documents per *topic*.',
              '',
              '- click a bar to filter',
              '- the table below lists the rows',
              '',
              '| source | meaning |',
              '| --- | --- |',
              '| forum | short posts |',
              '| paper | long reads |',
              '',
              'Use `$filter` in SQL.',
            ].join('\n'),
          } satisfies BuiltinChartSpec,
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
