// config.modeBarButtonsToRemove: take whole groups of buttons off the mode bar
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const PRESETS = {
  'nothing removed': [],
  toImage: ['toImage'],
  'zoom and pan': ['zoom2d', 'pan2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d'],
  'selection tools': ['select2d', 'lasso2d'],
  'hover modes': ['hoverClosestCartesian', 'hoverCompareCartesian'],
} as const;
type Preset = keyof typeof PRESETS;
const NAMES = Object.keys(PRESETS) as Preset[];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const data: Plotly.Data[] = [{ type: 'bar', x: ['trees', 'flowers', 'hedges'], y: [90, 130, 40], marker: { color: '#34d399' } }];
  const draw = (preset: Preset): Promise<unknown> =>
    Plotly.newPlot(
      stage.div,
      data,
      { template: stage.template, title: { text: stage.preview ? '' : 'Remove modebar buttons' } },
      { ...stage.config, displayModeBar: true, modeBarButtonsToRemove: [...PRESETS[preset]] },
    );
  await draw('nothing removed');

  if (stage.bar) select(stage.bar, 'modeBarButtonsToRemove', NAMES, 'nothing removed', (p) => void draw(p));
  if (stage.preview) stage.every(1700, (i) => void draw(NAMES[i % NAMES.length]!));
  return () => stage.dispose();
};

export default mount;
