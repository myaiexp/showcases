// Frames defined once under names; updatemenus buttons animate to them by name
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { at } from '../../shared/events-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const names = ['sine', 'cosine', 'circle'];
  const frames = names.map((name) => ({ name, data: [{ x: [] as number[], y: [] as number[] }] }));
  const n = 100;
  for (let i = 0; i < n; i++) {
    const t = (i / (n - 1)) * 2 - 1;
    frames[0]!.data[0]!.x.push(t * Math.PI);
    frames[0]!.data[0]!.y.push(Math.sin(t * Math.PI));
    frames[1]!.data[0]!.x.push(t * Math.PI);
    frames[1]!.data[0]!.y.push(Math.cos(t * Math.PI));
    frames[2]!.data[0]!.x.push(Math.sin(t * Math.PI));
    frames[2]!.data[0]!.y.push(Math.cos(t * Math.PI));
  }

  await Plotly.newPlot(
    stage.div,
    [{ x: frames[0]!.data[0]!.x, y: frames[0]!.data[0]!.y, line: { simplify: false, width: 3 } }],
    {
      template: stage.template,
      xaxis: { range: [-Math.PI, Math.PI] },
      yaxis: { range: [-1.2, 1.2] },
      updatemenus: stage.preview ? [] : [{ buttons: names.map((name) => ({ method: 'animate', args: [[name]], label: name })) }],
    } as unknown as Partial<Layout>,
    stage.config,
  );
  await Plotly.addFrames(stage.div, frames);

  if (stage.preview) stage.every(1300, (i) => void Plotly.animate(stage.div, [at(names, i)], {}).catch(() => {}));

  return () => stage.dispose();
};

export default mount;
