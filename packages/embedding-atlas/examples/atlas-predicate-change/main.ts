// onPredicateChange: the SQL predicate of the selection as it changes
import { EmbeddingAtlas } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { atlasSetup, dashboard, infoPanel, topicChart, wordsChart } from '../../shared/atlas-kit.ts';
import { countRowsWhere } from '../../shared/atlas-sql.ts';

// Cards cannot brush, so each variant starts from a saved chart state and the predicate fires on mount.
const STATES: Record<string, Record<string, unknown>> = {
  'words brushed 0-200': { words: { brush: { x: [0, 200] } } },
  'topic clicked: music': { topics: { selection: ['music'] } },
  'both': { words: { brush: { x: [100, 400] } }, topics: { selection: ['sailing', 'chess'] } },
};

const mount: Mount = async (el, ctx) => {
  const { stage, mosaic, table } = await atlasSetup(el, ctx, { height: 460, hint: 'Brush the words chart or click a topic: the predicate prints below' });
  if (stage.disposed) return stage.dispose;
  const info = infoPanel(stage, 'predicate: null');
  const total = await countRowsWhere(mosaic.coordinator, table, null);

  stage.variants('Start from', Object.keys(STATES), (name, host) => {
    return new EmbeddingAtlas(host, {
      coordinator: mosaic.coordinator,
      data: { table, id: 'id', projection: { x: 'x', y: 'y' }, text: 'text' },
      colorScheme: 'dark',
      initialState: { ...dashboard({ topics: topicChart, words: wordsChart }), chartStates: STATES[name] },
      onPredicateChange: (predicate) => {
        // It is a SQL WHERE expression over the table: run it to count the rows it keeps.
        info.textContent = `predicate: ${predicate ?? 'null'}`;
        if (predicate == null) return;
        void countRowsWhere(mosaic.coordinator, table, predicate).then((n) => {
          if (!stage.disposed) info.textContent = `predicate: ${predicate}\n→ ${n} of ${total} rows`;
        });
      },
    });
  });
  return stage.dispose;
};

export default mount;
