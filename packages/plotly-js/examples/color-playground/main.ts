// Type a colour string: Plotly.js parses it, or falls back to the attribute's default
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const TRIES = ['rebeccapurple', 'hsl(120 50% 50%)', 'hsl(120, 50% 50%)', 'oklch(0.7 0.15 180)', '#f00a', 'rgba(255 0 0 / 0.5)', 'hwb(0 0% 0%)', 'notacolor'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 360 });
  const out = stage.preview ? null : readout(el);
  const apply = (color: string): void => {
    void Plotly.restyle(stage.div, { 'marker.color': color });
    if (out) out.textContent = `marker.color: ${JSON.stringify(color)}   (a string Plotly cannot parse falls back to the default colour; mixed separators like the third try are invalid)`;
  };
  await Plotly.newPlot(
    stage.div,
    [{ type: 'bar', x: ['a', 'b', 'c', 'd'], y: [4, 7, 3, 6], marker: { color: TRIES[0], line: { color: '#a6acb8', width: 1 } } }],
    { template: stage.template, title: { text: stage.preview ? '' : 'Try a colour string' } },
    stage.config,
  );

  if (stage.bar) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = TRIES[0]!;
    input.size = 28;
    input.addEventListener('input', () => apply(input.value));
    const label = document.createElement('label');
    label.append('marker.color ', input);
    stage.bar.append(label);
    const list = document.createElement('select');
    list.add(new Option('examples…', ''));
    for (const t of TRIES) list.add(new Option(t, t));
    list.addEventListener('change', () => {
      if (!list.value) return;
      input.value = list.value;
      apply(list.value);
    });
    stage.bar.append(list);
    apply(TRIES[0]!);
  } else {
    stage.every(1000, (i) => apply(TRIES[i % TRIES.length]!));
  }
  return () => {
    out?.remove();
    stage.dispose();
  };
};

export default mount;
