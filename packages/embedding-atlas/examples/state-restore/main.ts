// Save the state from onStateChange as JSON and rebuild the atlas from it
import { EmbeddingAtlas, type EmbeddingAtlasState } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { docsTable } from '../../shared/table.ts';

// A state that was saved earlier: two charts, a dashboard and a brush.
const FIRST = JSON.stringify({
  charts: {
    words: {
      title: 'words',
      layers: [
        { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
        { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
      ],
      selection: { brush: { encoding: 'x' } },
    },
    topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' },
  },
  chartStates: { words: { brush: { x: [100, 300] } } },
  layouts: {
    main: {
      type: 'dashboard',
      name: 'Saved',
      chartIds: ['words', 'topics'],
      grids: { '24x18': { placements: { words: { x: 0, y: 0, width: 14, height: 18 }, topics: { x: 14, y: 0, width: 10, height: 18 } } } },
    },
  },
  layoutOrder: ['main'],
  currentLayout: 'main',
});

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420, cardZoom: 0.5 });
  const mosaic = await stage.mosaic();
  const { table } = await docsTable(mosaic, { count: ctx.preview ? 1500 : 3000 });
  if (stage.disposed) return stage.dispose;

  let saved = FIRST;
  let latest: EmbeddingAtlasState | null = null;
  let atlas: EmbeddingAtlas | null = null;
  const status = stage.bar ? readout(stage.box, 'Started from the first saved state.') : null;

  const open = (json: string): void => {
    atlas?.destroy();
    atlas = new EmbeddingAtlas(stage.view, {
      coordinator: mosaic.coordinator,
      data: { table, id: 'id' },
      colorScheme: 'dark',
      initialState: JSON.parse(json) as EmbeddingAtlasState,
      onStateChange: (state) => {
        latest = state;
      },
    });
  };
  open(saved);
  stage.onDispose(() => atlas?.destroy());
  if (stage.preview) {
    // No pointer in cards: alternate two saved states so the restore is visible.
    const other = JSON.stringify({ ...JSON.parse(FIRST), chartStates: { words: { brush: { x: [400, 800] } } } });
    let flip = false;
    stage.every(4500, () => open((flip = !flip) ? other : FIRST));
  }

  if (stage.bar) {
    button(stage.bar, 'Save', () => {
      if (!latest) return;
      saved = JSON.stringify(latest);
      status!.textContent = `Saved ${saved.length} characters of state.`;
    });
    button(stage.bar, 'Restore', () => {
      open(saved);
      status!.textContent = 'Rebuilt from the saved string.';
    });
    button(stage.bar, 'Reset', () => {
      saved = FIRST;
      open(FIRST);
      status!.textContent = 'Back to the first saved state.';
    });
  }
  return stage.dispose;
};

export default mount;
