// the messages renderer on OpenAI-format message lists
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';
import { formatColumns } from '../../shared/chart-formats.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'renderer: messages': {
        charts: {
          table: { type: 'instances', title: 'Conversations', columns: ['topic', 'chat'], pageSize: 3, defaultHeight: 380 } satisfies BuiltinChartSpec,
        },
        columnStyles: { chat: { renderer: 'messages' } },
      },
    },
    {
      extra: formatColumns,
      height: 440,
      // The list of structs is built in SQL: a list of objects passed through Arrow from JS garbles its strings.
      setup: async (m, t) => {
        await m.exec(`ALTER TABLE ${t} ADD COLUMN chat STRUCT(role VARCHAR, content VARCHAR)[]`);
        await m.exec(`UPDATE ${t} SET chat = [
          {'role': 'system', 'content': 'You answer questions about ' || topic || '.'},
          {'role': 'user', 'content': 'Tell me one thing about ' || topic || ' (#' || id || ').'},
          {'role': 'assistant', 'content': '**' || upper(topic[1]) || topic[2:] || '** has a lot to explore.'}
        ]`);
      },
    },
  );
  return stage.dispose;
};

export default mount;
