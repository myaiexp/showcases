// An overlaying axis puts its ticks where the base axis has them (tickmode 'sync')
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ["default ('sync')", "'auto' (v3)"] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const x = Array.from({ length: 24 }, (_, i) => i);

  const draw = (mode: (typeof MODES)[number]): Promise<unknown> =>
    Plotly.react(
      stage.div,
      [
        { x, y: x.map((v) => 2 + Math.sin(v / 3) * 1.5), name: 'A' },
        { x, y: x.map((v) => 137 + v * 11 + Math.cos(v / 2) * 40), name: 'B', yaxis: 'y2' },
      ],
      {
        template: stage.template,
        showlegend: false,
        margin: stage.preview ? { r: 40, t: 22 } : { r: 70 },
        title: { text: mode },
        yaxis: { title: { text: 'A' }, gridcolor: 'rgba(96,165,250,0.35)' },
        yaxis2: {
          overlaying: 'y',
          side: 'right',
          title: { text: 'B' },
          showgrid: true,
          gridcolor: 'rgba(245,158,11,0.35)',
          tickmode: mode === MODES[0] ? undefined : 'auto',
        },
      },
      stage.config,
    );
  await draw(MODES[0]);

  if (stage.bar) select(stage.bar, 'yaxis2.tickmode', MODES, MODES[0], (m) => void draw(m));
  if (stage.preview) stage.every(2200, (i) => void draw(MODES[i % 2]!));

  return () => stage.dispose();
};

export default mount;
