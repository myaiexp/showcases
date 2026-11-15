// The tooltip prop with an id: open a row's tooltip without knowing where it is
import { EmbeddingViewMosaic } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, readout } from '../../shared/controls.ts';
import { rng } from '../../shared/data.ts';
import { pointsTable } from '../../shared/table.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const mosaic = await stage.mosaic();
  const count = stage.preview ? 8000 : 50000;
  const { table } = await pointsTable(mosaic, { count });
  if (stage.disposed) return stage.dispose;
  const status = stage.preview ? null : readout(stage.box);

  // With an identifier column, tooltip can be just the id: the view fetches x, y and text itself.
  const view = new EmbeddingViewMosaic(stage.view, {
    coordinator: mosaic.coordinator,
    table,
    x: 'x',
    y: 'y',
    category: 'topic_id',
    text: 'text',
    identifier: 'id',
    tooltip: 0,
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
    onTooltip: (p) => {
      if (status) status.textContent = p ? `onTooltip: id ${p.identifier} at (${p.x.toFixed(2)}, ${p.y.toFixed(2)})` : 'onTooltip: null';
    },
  });
  stage.own(view);

  const r = rng(12);
  const next = (): void => view.update({ tooltip: Math.floor(r() * count) });
  if (stage.bar) button(stage.bar, 'random id', next);
  if (stage.preview) stage.every(1600, next);
  return stage.dispose;
};

export default mount;
