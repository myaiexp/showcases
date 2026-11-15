// plotly_click recolours one marker through restyle, plotly_doubleclick resets them all
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { asEv } from '../../shared/events-kit.ts';
import { restyle } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const BASE = '#60a5fa';
const HOT = '#C54C82';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const colors = [1, 2, 3, 4, 5, 6].map(() => BASE);

  await Plotly.newPlot(
    stage.div,
    [{ x: [1, 2, 3, 4, 5, 6], y: [1, 2, 3, 2, 3, 4], type: 'scatter', mode: 'markers', marker: { size: 16, color: [...colors] } }],
    {
      template: stage.template,
      hovermode: 'closest',
      title: stage.preview ? undefined : { text: 'Click on a Point to Change Color<br>Double Click (anywhere) to Change it Back' },
    },
    stage.config,
  );

  const paint = (pointNumber: number): void => {
    colors[pointNumber] = HOT;
    void restyle(stage.div, { marker: { color: [...colors], size: 16 } }, [0]);
  };
  const reset = (): void => {
    colors.fill(BASE);
    void restyle(stage.div, { marker: { color: [...colors], size: 16 } });
  };
  stage.div.on('plotly_click', (e) => paint(asEv(e).points[0]?.pointNumber ?? 0));
  stage.div.on('plotly_doubleclick', reset);

  // Card: the same two handlers, driven in the order a reader would use them.
  if (stage.preview) stage.every(650, (i) => (i % 7 === 0 ? reset() : paint((i * 5) % 6)));

  return () => stage.dispose();
};

export default mount;
