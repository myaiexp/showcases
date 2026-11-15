// additionalTables with relation: a second table that filters and is filtered
import { EmbeddingAtlas } from 'embedding-atlas';
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { TOPICS } from '../../shared/data.ts';
import { atlasSetup, dashboard, infoPanel, topicChart } from '../../shared/atlas-kit.ts';

// One row per tag word in the docs table: which kind of word it is, and how long.
const KINDS = ['noun', 'verb-like', 'place', 'tool'];

const mount: Mount = async (el, ctx) => {
  const { stage, mosaic, table } = await atlasSetup(el, ctx, { height: 480 });
  if (stage.disposed) return stage.dispose;

  const words = TOPICS.flatMap((t) => t.words.slice(0, 4));
  const tagTable = await mosaic.table('tag_info', {
    tag: words,
    kind: words.map((_, i) => KINDS[Math.floor(i / 3) % KINDS.length]!),
    letters: Int32Array.from(words, (w) => w.length),
  });
  if (stage.disposed) return stage.dispose;

  const kinds = {
    title: 'tag_info: kind (additional table)',
    layers: [
      { from: tagTable, mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'kind' }, y: { aggregate: 'count' } } },
      { from: tagTable, mark: 'bar', filter: '$filter', encoding: { x: { field: 'kind' }, y: { aggregate: 'count' } } },
    ],
    selection: { click: { encoding: 'x' } },
  } satisfies BuiltinChartSpec;

  const info = infoPanel(stage);
  const SELECTIONS: Record<string, string[]> = { 'nothing selected': [], 'topic: music': ['music'], 'topic: sailing + chess': ['sailing', 'chess'] };
  stage.variants('Selected on the main table', Object.keys(SELECTIONS), (name, host) => {
    info.textContent = `additionalTables: { ${tagTable}: { id: "tag", relation: { mainKey: "UNNEST(tags)" } } }\nThe kind chart reads ${tagTable}; selecting topics in the main table narrows it.`;
    return new EmbeddingAtlas(host, {
      coordinator: mosaic.coordinator,
      data: { table, id: 'id', projection: { x: 'x', y: 'y' }, text: 'text' },
      colorScheme: 'dark',
      additionalTables: {
        // `tags` is a list column: UNNEST makes the join many-to-many. `key` defaults to this table's id.
        [tagTable]: { id: 'tag', relation: { mainKey: 'UNNEST(tags)' } },
      },
      initialState: { ...dashboard({ topics: topicChart, kinds }), chartStates: { topics: { selection: SELECTIONS[name] } } },
    });
  });
  return stage.dispose;
};

export default mount;
