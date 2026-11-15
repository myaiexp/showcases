// xaxis.labelalias: display text for category values, data left alone
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const ALIAS = { UK: 'United Kingdom', US: 'United States', Germany: 'Federal Republic of Germany', France: 'French Republic' };

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  await Plotly.newPlot(
    stage.div,
    [{ x: ['UK', 'US', 'Germany', 'France'], y: [8, 3, 10, 3], type: 'bar' }],
    { template: stage.template, xaxis: { labelalias: ALIAS } } as Partial<Layout>,
    stage.config,
  );
  const alias = (on: boolean): Promise<void> => relayout(stage.div, { 'xaxis.labelalias': on ? ALIAS : null });
  if (stage.bar) toggle(stage.bar, 'labelalias', true, (v) => void alias(v));
  if (stage.preview) stage.every(1500, (i) => void alias(i % 2 === 0));
  return () => stage.dispose();
};

export default mount;
