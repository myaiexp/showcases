// Plotly.animate on an indicator: number, delta and gauge tween to new values
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });

  await Plotly.newPlot(
    stage.div,
    [{ type: 'indicator', mode: 'gauge+number+delta', value: 100, delta: { reference: 250 }, title: { text: 'Orders' }, gauge: { axis: { range: [0, 500] } }, domain: { x: [0, 1], y: [0, 1] } }],
    { template: stage.template },
    stage.config,
  );

  // animate takes a frame ({data, traces}) and transition options; indicators are animatable traces.
  const to = (value: number): void => {
    void Plotly.animate(stage.div, { data: [{ value }], traces: [0] }, { transition: { duration: 800, easing: 'cubic-in-out' }, frame: { duration: 800 } });
  };
  const rand = (): number => Math.round(20 + Math.random() * 460);
  if (stage.bar) button(stage.bar, 'Animate to a new value', () => to(rand()));
  else stage.every(1500, (i) => to([420, 90, 300, 480, 160][i % 5] ?? 100));

  return () => stage.dispose();
};

export default mount;
