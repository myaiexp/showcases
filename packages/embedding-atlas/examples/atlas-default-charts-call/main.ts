// defaultCharts(): the specs Atlas builds, called directly and edited
import { defaultCharts, EmbeddingAtlas, type BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { atlasSetup, infoPanel } from '../../shared/atlas-kit.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, mosaic, table } = await atlasSetup(el, ctx, { height: 520 });
  if (stage.disposed) return stage.dispose;

  const specs = await defaultCharts({
    coordinator: mosaic.coordinator,
    table,
    id: 'id',
    projection: { x: 'x', y: 'y', text: 'text' },
    config: { include: ['topic', 'source', 'rating', 'words'] },
  });
  if (stage.disposed) return stage.dispose;

  // The list is plain data: here the count plots are capped to four bars before use.
  const edited = specs.map((s): BuiltinChartSpec => ('type' in s && s.type === 'count-plot' ? { ...s, limit: 4, labels: '#' } : s));
  const info = infoPanel(stage);
  info.textContent = `${specs.length} specs: ${specs.map((s) => `${'type' in s ? s.type : 'chart'}${'title' in s && s.title ? ` "${s.title}"` : ''}`).join(', ')}`;
  const dump = stage.preview ? null : infoPanel(stage);
  const toggle = (): void => {
    if (dump) dump.textContent = dump.textContent ? '' : JSON.stringify(specs, null, 1);
  };
  if (stage.bar) button(stage.bar, 'Show or hide the JSON', toggle);

  stage.own(
    new EmbeddingAtlas(stage.view, {
      coordinator: mosaic.coordinator,
      data: { table, id: 'id', projection: { x: 'x', y: 'y' }, text: 'text' },
      colorScheme: 'dark',
      initialState: { charts: Object.fromEntries(edited.map((s, i) => [`default-${i}`, s])) },
    }),
  );
  return stage.dispose;
};

export default mount;
