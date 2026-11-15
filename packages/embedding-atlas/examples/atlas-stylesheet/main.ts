// stylesheet: your own CSS added to the shadow root next to Atlas's own
import { EmbeddingAtlas } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { atlasSetup, dashboard, infoPanel, topicChart, wordsChart } from '../../shared/atlas-kit.ts';

// Atlas lives in a shadow root, so page CSS never reaches it; this sheet is adopted inside it.
const SHEETS: Record<string, string> = {
  'none': '',
  'serif text, round buttons': `* { font-family: Georgia, 'Times New Roman', serif !important; } button { border-radius: 999px !important; }`,
  'monospace text': `* { font-family: ui-monospace, monospace !important; letter-spacing: -0.02em; }`,
  'tinted background': `:host, div { --tint: rgba(250, 204, 21, 0.06); } div { background-image: linear-gradient(var(--tint), var(--tint)); }`,
};

const mount: Mount = async (el, ctx) => {
  const { stage, mosaic, table } = await atlasSetup(el, ctx, { height: 460 });
  if (stage.disposed) return stage.dispose;
  const info = infoPanel(stage);

  stage.variants('stylesheet', Object.keys(SHEETS), (name, host) => {
    const stylesheet = SHEETS[name]!;
    info.textContent = `stylesheet: ${JSON.stringify(stylesheet)}`;
    return new EmbeddingAtlas(host, {
      coordinator: mosaic.coordinator,
      data: { table, id: 'id', projection: { x: 'x', y: 'y' }, text: 'text' },
      colorScheme: 'dark',
      stylesheet,
      initialState: dashboard({ topics: topicChart, words: wordsChart }),
    });
  });
  return stage.dispose;
};

export default mount;
