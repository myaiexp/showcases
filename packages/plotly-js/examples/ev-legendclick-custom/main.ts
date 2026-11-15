// A plotly_legendclick handler that returns false replaces the default of hiding the trace
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { asEv } from '../../shared/events-kit.ts';
import { restyle } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const BASE = ['#8aa0c8', '#5eead4'];
const HOT = '#C54C82';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const colors = BASE.map((c) => Array.from({ length: 6 }, () => c));

  await Plotly.newPlot(
    stage.div,
    [
      { x: [1, 2, 3, 4, 5, 6], y: [1, 2, 3, 2, 3, 4], type: 'scatter', mode: 'lines+markers', name: 'trace 0', line: { color: BASE[0] }, marker: { size: 16, color: [...colors[0]!] } },
      { x: [1, 2, 3, 4, 5, 6], y: [1, 4, 7, 6, 1, 5], type: 'scatter', mode: 'lines+markers', name: 'trace 1', line: { color: BASE[1] }, marker: { size: 16, color: [...colors[1]!] } },
    ],
    {
      template: stage.template,
      hovermode: 'closest',
      showlegend: true,
      title: stage.preview ? undefined : { text: 'Click on a Point to Change Color<br>Click on a Trace in the Legend to Change Back One Trace Only' },
    },
    stage.config,
  );

  const paint = (curve: number, point: number): void => {
    colors[curve]![point] = HOT;
    void restyle(stage.div, { marker: { color: [[...colors[curve]!]], size: 16 } }, [curve]);
  };
  const restore = (curve: number): void => {
    colors[curve] = colors[curve]!.map(() => BASE[curve]!);
    void restyle(stage.div, { marker: { color: [[...colors[curve]!]], size: 16 } }, [curve]);
  };
  stage.div.on('plotly_click', (e) => {
    const p = asEv(e).points[0];
    if (p) paint(p.curveNumber, p.pointNumber);
  });
  // Returning false cancels the built-in action (hiding the trace).
  stage.div.on('plotly_legendclick', ((e: unknown) => {
    restore((e as { curveNumber: number }).curveNumber);
    return false;
  }) as never);

  if (stage.preview) {
    stage.every(600, (i) => {
      if (i % 6 === 0) restore((i / 6) % 2);
      else paint(i % 2, (i * 3) % 6);
    });
  }

  return () => stage.dispose();
};

export default mount;
