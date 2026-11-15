// Tooltip and selection as Mosaic Selections: hover and click predicates
import { EmbeddingViewMosaic } from 'embedding-atlas';
import { Selection } from '@uwdata/mosaic-core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout } from '../../shared/controls.ts';
import { rng } from '../../shared/data.ts';
import { pointsTable } from '../../shared/table.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover and click points: each writes its own clause.' });
  const mosaic = await stage.mosaic();
  const count = stage.preview ? 6000 : 40000;
  const { table } = await pointsTable(mosaic, { count });
  if (stage.disposed) return stage.dispose;

  // "If a Mosaic Selection is used, the selection will be updated when tooltip is triggered."
  const hover = Selection.single();
  const picked = Selection.single();
  const lines = stage.preview ? null : [readout(stage.box, 'tooltip → (nothing yet)'), readout(stage.box, 'selection → (nothing yet)')];
  hover.addEventListener('value', () => {
    if (lines) lines[0]!.textContent = `tooltip → WHERE ${String(hover.predicate(null)) || '(none)'}`;
  });
  picked.addEventListener('value', () => {
    if (lines) lines[1]!.textContent = `selection → WHERE ${String(picked.predicate(null)) || '(none)'}`;
  });

  const view = new EmbeddingViewMosaic(stage.view, {
    coordinator: mosaic.coordinator,
    table,
    x: 'x',
    y: 'y',
    category: 'topic_id',
    identifier: 'id',
    text: 'text',
    tooltip: hover,
    selection: picked,
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
  });
  stage.own(view);

  // Cards have no pointer: with a Selection bound, an id still opens the tooltip on the next update.
  const r = rng(3);
  if (stage.preview) stage.every(1500, () => view.update({ tooltip: Math.floor(r() * count) }));
  return stage.dispose;
};

export default mount;
