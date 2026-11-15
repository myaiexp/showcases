// colorScheme light or dark, switched on a live Atlas with update()
import { EmbeddingAtlas } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { atlasSetup, dashboard, topicChart, wordsChart } from '../../shared/atlas-kit.ts';
import { select } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, mosaic, table } = await atlasSetup(el, ctx, { hint: 'The select calls atlas.update({ colorScheme })' });
  if (stage.disposed) return stage.dispose;

  const atlas = stage.own(
    new EmbeddingAtlas(stage.view, {
      coordinator: mosaic.coordinator,
      data: { table, id: 'id', projection: { x: 'x', y: 'y' }, text: 'text' },
      colorScheme: 'light',
      initialState: dashboard({ topics: topicChart, words: wordsChart }),
    }),
  );

  if (stage.bar) {
    select(stage.bar, 'colorScheme', ['light', 'dark'] as const, (colorScheme) => atlas.update({ colorScheme }));
  } else {
    // Cards flip the scheme on a timer, the same call the select makes.
    let dark = false;
    stage.every(2500, () => atlas.update({ colorScheme: (dark = !dark) ? 'dark' : 'light' }));
  }
  return stage.dispose;
};

export default mount;
