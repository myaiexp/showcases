// instances cardTemplate, a Liquid template with a dark-mode style block
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'cardTemplate': {
        charts: {
          table: { type: 'instances', 
            title: 'Cards',
            viewMode: 'cards',
            pageSize: 4,
            defaultHeight: 380,
            columns: ['topic', 'text', 'rating', 'words'],
            cardTemplate: `
              <div class="doc" style="padding: 12px">
                <style>
                  .doc { --fg: #0f172a; --muted: #64748b; --accent: #2563eb; }
                  .doc:is(.dark *) { --fg: #f1f5f9; --muted: #94a3b8; --accent: #60a5fa; }
                </style>
                <div style="font-weight: 600; color: var(--accent)">{{ topic | capitalize }}</div>
                <div style="color: var(--fg); margin: 4px 0">{{ text }}</div>
                <div style="color: var(--muted); font-size: 12px">{{ rating }} stars, {{ words }} words</div>
              </div>
            `,
           } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
