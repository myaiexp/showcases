// cache: a Map-backed Cache that logs every get and set across two mounts
import { EmbeddingAtlas, type EmbeddingAtlasProps } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { atlasSetup, dashboard, logPanel, topicChart } from '../../shared/atlas-kit.ts';

type Cache = NonNullable<EmbeddingAtlasProps['cache']>;

const mount: Mount = async (el, ctx) => {
  const { stage, mosaic, table } = await atlasSetup(el, ctx, { height: 460, hint: 'Remount with the same cache to see gets turn into hits' });
  if (stage.disposed) return stage.dispose;
  const log = logPanel(stage, 8);
  log('no cache calls yet: Atlas asks while the embedding view works out its labels');

  // One Map outlives both mounts, so the second one finds what the first stored.
  const store = new Map<string, unknown>();
  let mounts = 0;
  const cache: Cache = {
    async get(key) {
      const hit = store.has(key);
      log(`mount ${mounts} get   ${hit ? 'HIT ' : 'miss'} ${key.slice(0, 48)}`);
      return hit ? store.get(key) : null;
    },
    async set(key, value) {
      store.set(key, value);
      log(`mount ${mounts} set   ${key.slice(0, 48)} (${store.size} entries)`);
    },
  };

  stage.variants('Mount', ['first mount, empty cache', 'second mount, same cache'], (_name, host) => {
    mounts++;
    return new EmbeddingAtlas(host, {
      coordinator: mosaic.coordinator,
      data: { table, id: 'id', projection: { x: 'x', y: 'y' }, text: 'text' },
      colorScheme: 'dark',
      cache,
      initialState: dashboard({ embedding: { type: 'embedding', title: 'Embedding', data: { x: 'x', y: 'y', text: 'text' } }, topics: topicChart }),
    });
  });
  return stage.dispose;
};

export default mount;
