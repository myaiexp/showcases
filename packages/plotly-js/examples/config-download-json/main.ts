// The downloadJson mode bar button, added from config or from layout.modebar.add
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const WAYS = ['config.modeBarButtonsToAdd', 'layout.modebar.add'] as const;
type Way = (typeof WAYS)[number];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const data: Plotly.Data[] = [{ type: 'bar', x: ['trees', 'flowers', 'hedges'], y: [90, 130, 40], marker: { color: '#a78bfa' } }];
  const draw = (way: Way): Promise<unknown> =>
    Plotly.newPlot(
      stage.div,
      data,
      {
        template: stage.template,
        title: { text: stage.preview ? '' : 'Download this figure as JSON' },
        // The second way: the same button, asked for in the layout.
        ...(way === 'layout.modebar.add' ? { modebar: { add: ['downloadJson'] } } : {}),
      },
      {
        ...stage.config,
        displayModeBar: true,
        ...(way === 'config.modeBarButtonsToAdd' ? { modeBarButtonsToAdd: ['downloadJson' as const] } : {}),
      },
    );
  await draw('config.modeBarButtonsToAdd');

  if (stage.bar) select(stage.bar, 'add it from', WAYS, 'config.modeBarButtonsToAdd', (w) => void draw(w));
  if (stage.preview) {
    const h = [130, 60, 150, 90];
    stage.every(1400, (i) => void Plotly.restyle(stage.div, { y: [[h[i % 4]!, h[(i + 1) % 4]!, h[(i + 2) % 4]!]] }));
  }
  return () => stage.dispose();
};

export default mount;
