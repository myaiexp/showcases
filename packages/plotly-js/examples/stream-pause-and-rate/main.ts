// A random walk streamed with extendTraces; the tick rate and maxPoints are chosen at run time
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  let value = 0;
  let paused = false;
  let keep = 100;
  const step = (): number => (value += Math.random() - 0.5);

  await Plotly.newPlot(
    stage.div,
    [{ y: [0], mode: 'lines', line: { color: '#DF56F1' }, fill: 'tozeroy', fillcolor: 'rgba(223,86,241,0.15)' }],
    { template: stage.template },
    stage.config,
  );

  // The timer is created per rate and owned by the stage, so every change replaces it cleanly.
  let timer = 0;
  const run = (ms: number): void => {
    clearInterval(timer);
    timer = window.setInterval(() => {
      if (!paused) void Plotly.extendTraces(stage.div, { y: [[step()]] }, [0], keep).catch(() => {});
    }, ms);
  };
  stage.own(() => clearInterval(timer));
  run(stage.preview ? 200 : 100);

  if (stage.bar) {
    const bar = stage.bar;
    const pause = button(bar, 'Pause', () => {
      paused = !paused;
      pause.textContent = paused ? 'Resume' : 'Pause';
    });
    select(bar, 'tick', ['50 ms', '100 ms', '250 ms', '1000 ms'], '100 ms', (v) => run(parseInt(v, 10)));
    select(bar, 'keep', ['50', '100', '300', '1000'], '100', (v) => (keep = parseInt(v, 10)));
  }

  return () => stage.dispose();
};

export default mount;
