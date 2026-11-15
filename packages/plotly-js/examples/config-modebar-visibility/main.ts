// config.displayModeBar: show the mode bar on hover, always, or never
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ['hover', 'always', 'never'] as const;
type Mode = (typeof MODES)[number];
const VALUE: Record<Mode, boolean | 'hover'> = { hover: 'hover', always: true, never: false };

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const data: Plotly.Data[] = [
    { type: 'bar', x: ['Zebras', 'Lions', 'Pelicans'], y: [90, 40, 60], name: 'New York Zoo' },
    { type: 'bar', x: ['Zebras', 'Lions', 'Pelicans'], y: [10, 80, 45], name: 'San Francisco Zoo' },
  ];
  const draw = (mode: Mode): Promise<unknown> =>
    // displayModeBar is config, not layout, so changing it means drawing again.
    Plotly.newPlot(
      stage.div,
      data,
      { template: stage.template, title: { text: stage.preview ? '' : 'The modebar: hover, always or never' }, showlegend: !stage.preview },
      { ...stage.config, displayModeBar: VALUE[mode] },
    );
  await draw('always');

  if (stage.bar) select(stage.bar, 'displayModeBar', MODES, 'always', (m) => void draw(m));
  // Cards have no pointer, so the mode bar is shown and hidden in turn.
  if (stage.preview) stage.every(1800, (i) => void draw(i % 2 ? 'never' : 'always'));
  return () => stage.dispose();
};

export default mount;
