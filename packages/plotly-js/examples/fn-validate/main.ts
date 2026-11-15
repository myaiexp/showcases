// Plotly.validate lists every attribute that the schema rejects
import Plotly from 'plotly.js';
import type { Data, Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { readout, select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

// Deliberately broken figures: each one carries values Plotly does not accept.
const CASES: Record<string, { data: Data[]; layout: Partial<Layout> }> = {
  "orientation: 'horizontal'": { data: [{ type: 'bar', y: [2, 1, 3, 2], orientation: 'horizontal' as 'h' }], layout: {} },
  'unknown keys': { data: [{ type: 'scatter', y: [1, 3, 2], colour: 'red' } as Data], layout: { titel: 'typo' } as Partial<Layout> },
  'wrong types': { data: [{ type: 'scatter', y: [1, 3, 2], mode: 'dots' as 'markers', opacity: 3 }], layout: { width: -10 } },
  valid: { data: [{ type: 'bar', y: [2, 1, 3, 2], orientation: 'h' }], layout: { title: { text: 'all good' } } },
};
const NAMES = Object.keys(CASES);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 300, previewHeight: 110 });
  const out = readout(el);

  const show = async (name: string): Promise<void> => {
    const { data, layout } = CASES[name]!;
    const messages = Plotly.validate(data, layout) ?? [];
    out.textContent = messages.length ? messages.map((m) => m.msg).join('\n') : 'Plotly.validate: no problems (undefined)';
    // Plotly still draws what it can: invalid values fall back to defaults.
    await Plotly.react(stage.div, data, { template: stage.template, ...layout, title: { text: name } }, stage.config);
  };

  if (stage.bar) select(stage.bar, 'figure', NAMES, NAMES[0]!, (n) => void show(n));
  await show(NAMES[0]!);
  if (stage.preview) stage.every(2200, (i) => void show(NAMES[i % NAMES.length]!));

  return () => {
    out.remove();
    stage.dispose();
  };
};

export default mount;
