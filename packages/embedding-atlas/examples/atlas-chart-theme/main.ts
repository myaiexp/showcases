// chartTheme: mark colours, labels and grid, with light and dark blocks
import { EmbeddingAtlas, type EmbeddingAtlasProps } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { atlasSetup, dashboard, infoPanel, topicChart, wordsChart } from '../../shared/atlas-kit.ts';
import { select } from '../../shared/controls.ts';

type Theme = NonNullable<EmbeddingAtlasProps['chartTheme']>;

const THEMES: Record<string, Theme> = {
  default: {},
  'markColor + markColorFade': { markColor: '#f59e0b', markColorFade: '#5b4a1a' },
  'labels and grid': { labelColor: '#e2e8f0', labelFontFamily: 'ui-monospace, monospace', labelFontSize: 13, gridColor: '#334155', brushFill: 'rgba(250,204,21,0.25)' },
  'light / dark blocks': {
    markColor: '#8b5cf6',
    light: { markColorFade: '#ede9fe', labelColor: '#6d28d9' },
    dark: { markColorFade: '#4c3a8c', labelColor: '#c4b5fd' },
  },
};

const mount: Mount = async (el, ctx) => {
  const { stage, mosaic, table } = await atlasSetup(el, ctx, { height: 440 });
  if (stage.disposed) return stage.dispose;
  const info = infoPanel(stage);
  let scheme: 'light' | 'dark' = 'dark';
  let atlas: EmbeddingAtlas | null = null;
  let name = 'default';
  const make = (host: HTMLElement): EmbeddingAtlas => {
    const chartTheme = THEMES[name]!;
    info.textContent = `colorScheme: ${scheme}\nchartTheme: ${JSON.stringify(chartTheme)}`;
    return (atlas = new EmbeddingAtlas(host, {
      coordinator: mosaic.coordinator,
      data: { table, id: 'id', text: 'text' },
      colorScheme: scheme,
      chartTheme,
      // A saved brush on `words`, so both the full and the faded mark colours show.
      initialState: { ...dashboard({ topics: topicChart, words: wordsChart }), chartStates: { words: { brush: { x: [100, 400] } } } },
    }));
  };
  stage.variants('chartTheme', Object.keys(THEMES), (n, host) => ((name = n), make(host)));
  if (stage.bar) {
    // The chart theme is read with the colour scheme, so the light and dark blocks pick up on update().
    select(stage.bar, 'colorScheme', ['dark', 'light'] as const, (s) => {
      scheme = s;
      atlas?.update({ colorScheme: s });
      info.textContent = `colorScheme: ${scheme}\nchartTheme: ${JSON.stringify(THEMES[name])}`;
    });
  }
  return stage.dispose;
};

export default mount;
