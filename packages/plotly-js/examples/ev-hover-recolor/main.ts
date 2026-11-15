// plotly_hover and plotly_unhover paint the hovered marker and put it back
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { asEv } from '../../shared/events-kit.ts';
import { restyle } from '../../shared/basic-util.ts';
import { Fx } from '../../shared/fx.ts';
import { createStage } from '../../shared/stage.ts';

const BASE = '#60a5fa';
const HOT = '#C54C82';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const colors = Array.from({ length: 7 }, () => BASE);

  await Plotly.newPlot(
    stage.div,
    [{ x: [1, 2, 3, 4, 5, 6, 7], y: [1, 2, 3, 2, 3, 4, 3], type: 'scatter', mode: 'markers', marker: { size: 16, color: [...colors] } }],
    {
      template: stage.template,
      hovermode: 'closest',
      title: stage.preview ? undefined : { text: 'Hover on a Point<br>to Change Color' },
    },
    stage.config,
  );

  const setColor = (pointNumber: number, color: string): void => {
    colors[pointNumber] = color;
    void restyle(stage.div, { marker: { color: [...colors], size: 16 } }, [0]);
  };
  stage.div.on('plotly_hover', (e) => setColor(asEv(e).points[0]?.pointNumber ?? 0, HOT));
  stage.div.on('plotly_unhover', (e) => setColor(asEv(e).points[0]?.pointNumber ?? 0, BASE));

  if (stage.preview) {
    // Fx.hover raises the same plotly_hover; the previous point is released first.
    stage.every(700, (i) => {
      Fx.unhover(stage.div);
      Fx.hover(stage.div, { curveNumber: 0, pointNumber: i % 7 });
    });
  }

  return () => stage.dispose();
};

export default mount;
