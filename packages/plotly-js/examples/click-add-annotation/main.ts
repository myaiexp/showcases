// A plotly_click handler that pushes an annotation for each clicked point through relayout
import Plotly from 'plotly.js';
import type { Annotation } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { asEv, fakeEv, normals } from '../../shared/events-kit.ts';
import type { Ev } from '../../shared/events-kit.ts';
import { button } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const N = 100;
const x = Array.from({ length: N }, (_, i) => i);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const notes: Partial<Annotation>[] = [];

  await Plotly.newPlot(
    stage.div,
    [
      { x, y: normals(41, N), type: 'scatter', mode: 'lines', name: 'Jeff' },
      { x, y: normals(42, N, -2), type: 'scatter', mode: 'lines', name: 'Terren' },
      { x, y: normals(43, N, 2), type: 'scatter', mode: 'lines', name: 'Arthur' },
    ],
    {
      template: stage.template,
      hovermode: 'closest',
      title: stage.preview ? undefined : { text: 'Click on Points to add an Annotation on it' },
      showlegend: !stage.preview,
    },
    stage.config,
  );

  const annotate = (data: Ev): void => {
    for (const p of data.points) {
      const y = parseFloat(Number(p.y).toPrecision(4));
      notes.push({ text: `x = ${p.x}<br>y = ${y}`, x: p.x as number, y, font: { size: stage.preview ? 9 : 12 } });
    }
    void relayout(stage.div, { annotations: [...notes] });
  };
  stage.div.on('plotly_click', (e) => annotate(asEv(e)));

  if (stage.preview) {
    stage.every(800, (i) => {
      if (i % 6 === 0) {
        notes.length = 0;
        void relayout(stage.div, { annotations: [] });
      } else annotate(fakeEv(stage.div, [[i % 3, (i * 17) % N]]));
    });
  }
  if (stage.bar) {
    button(stage.bar, 'Clear annotations', () => {
      notes.length = 0;
      void relayout(stage.div, { annotations: [] });
    });
  }

  return () => stage.dispose();
};

export default mount;
