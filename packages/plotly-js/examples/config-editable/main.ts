// config.editable: click the title, axis titles and legend names to rewrite them
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const TITLES = ['Click Here<br>to Edit Chart Title', 'Edit me<br>I am a title', 'Legend names<br>edit too'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const draw = (editable: boolean): Promise<unknown> =>
    Plotly.newPlot(
      stage.div,
      [
        { x: [0, 1, 2, 3, 4], y: [1, 5, 3, 7, 5], mode: 'lines+markers', type: 'scatter' },
        { x: [1, 2, 3, 4, 5], y: [4, 0, 4, 6, 8], mode: 'lines+markers', type: 'scatter' },
      ],
      { template: stage.template, title: { text: TITLES[0] }, showlegend: true },
      { ...stage.config, editable },
    );
  await draw(true);

  if (stage.bar) toggle(stage.bar, 'editable', true, (v) => void draw(v));
  // The card types into the title, then renames a trace, as a reader would.
  if (stage.preview) {
    stage.every(1300, (i) => {
      void Plotly.relayout(stage.div, { 'title.text': TITLES[i % TITLES.length] });
      void Plotly.restyle(stage.div, { name: ['trace 0', 'renamed ' + i] } as unknown as Plotly.DataUpdate);
    });
  }
  return () => stage.dispose();
};

export default mount;
