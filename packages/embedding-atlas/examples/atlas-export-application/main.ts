// onExportApplication: the archive hook, answered with a logging stub
import { EmbeddingAtlas } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { atlasSetup, dashboard, logPanel, topicChart, wordsChart } from '../../shared/atlas-kit.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, mosaic, table } = await atlasSetup(el, ctx, { height: 460, hint: 'Sidebar Import / Export, then "Download a self-contained static web application"' });
  if (stage.disposed) return stage.dispose;
  const log = logPanel(stage, 5);
  let calls = 0;
  // A real handler would bundle the data and this UI into an archive; this one only records the call.
  const onExportApplication = async (): Promise<void> => {
    log(`onExportApplication call ${++calls} at ${new Date().toLocaleTimeString()}: archive would be built here`);
  };

  const props = (withHook: boolean) => ({
    coordinator: mosaic.coordinator,
    data: { table, id: 'id', projection: { x: 'x', y: 'y' }, text: 'text' },
    colorScheme: 'dark' as const,
    initialState: dashboard({ topics: topicChart, words: wordsChart }),
    onExportApplication: withHook ? onExportApplication : null,
  });
  stage.variants('onExportApplication', ['callback set', 'null'], (name, host) => new EmbeddingAtlas(host, props(name === 'callback set')));
  if (stage.bar) button(stage.bar, 'Call it directly', () => void onExportApplication());
  else stage.every(2500, () => void onExportApplication());
  return stage.dispose;
};

export default mount;
