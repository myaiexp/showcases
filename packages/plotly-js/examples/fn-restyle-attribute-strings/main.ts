// restyle: 'marker.color' changes one attribute, marker: {...} replaces the object
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const START = { color: '#60a5fa', size: 22, symbol: 'diamond', line: { color: '#e6e8ee', width: 2 } };

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const log = stage.preview ? null : readout(el);

  await Plotly.newPlot(
    stage.div,
    [{ x: [1, 2, 3, 4, 5], y: [2, 4, 3, 5, 4], mode: 'markers', marker: structuredClone(START) }],
    { template: stage.template, xaxis: { range: [0, 6] }, yaxis: { range: [1, 6] } },
    stage.config,
  );

  const show = (): void => {
    if (log) log.textContent = `graphDiv.data[0].marker = ${JSON.stringify((stage.div.data[0] as { marker?: unknown } | undefined)?.marker)}`;
  };
  const steps = [
    // update only this attribute: size, symbol and outline stay
    () => Plotly.restyle(stage.div, { 'marker.color': 'red' }, [0]),
    // replace the entire marker object with the one provided
    () => Plotly.restyle(stage.div, { marker: { color: 'red' } }, [0]),
    () => Plotly.restyle(stage.div, { marker: structuredClone(START) }, [0]),
  ];

  if (stage.bar) {
    button(stage.bar, "{'marker.color': 'red'}", () => void steps[0]!().then(show));
    button(stage.bar, "{marker: {color: 'red'}}", () => void steps[1]!().then(show));
    button(stage.bar, 'reset', () => void steps[2]!().then(show));
    show();
  }
  if (stage.preview) stage.every(1400, (i) => void steps[i % 3]!());

  return () => stage.dispose();
};

export default mount;
