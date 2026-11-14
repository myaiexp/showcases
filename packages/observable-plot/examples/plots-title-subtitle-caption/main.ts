// Title, subtitle, caption and figure: svg versus figure output
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

interface State {
  title: boolean;
  subtitle: boolean;
  caption: boolean;
  figure: boolean;
}

const TEXT =
  'Titles, subtitles, captions, and annotations assist interpretation by telling the reader what’s interesting. Don’t make the reader work to find what you already know.';

const mount: Mount = (el, ctx) =>
  mountPlot<State>(el, ctx, {
    initial: { title: true, subtitle: true, caption: true, figure: false },
    render: ({ title, subtitle, caption, figure }, { width, height }) =>
      Plot.plot({
        width,
        // The card's 200px has to hold the title and subtitle too.
        height: height && 120,
        title: title ? 'For charts, an informative title' : undefined,
        subtitle: subtitle ? 'Subtitle to follow with additional context' : undefined,
        caption: caption && !height ? 'Figure 1. A chart with a title, subtitle, and caption.' : undefined,
        figure: figure || undefined,
        marks: [Plot.frame(), Plot.text([TEXT], { lineWidth: height ? 40 : 30, frameAnchor: 'middle' })],
      }),
    step: (_s, i) => ({ title: i % 2 === 0, subtitle: i % 4 < 2 }),
    previewMs: 2000,
    controls: (bar, live) => {
      for (const key of ['title', 'subtitle', 'caption', 'figure'] as const) {
        toggle(bar, key, live.state[key], (v) => live.set({ [key]: v }));
      }
    },
  });

export default mount;
