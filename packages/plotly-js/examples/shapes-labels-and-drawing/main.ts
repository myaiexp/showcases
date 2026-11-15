// shapes[].label, newshape.label and the drawing tools of the mode bar
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const POSITIONS = ['top center', 'top left', 'top right', 'middle center', 'bottom center'] as const;
const day = (d: number): string => `2015-02-${String(d).padStart(2, '0')}`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });
  const y = [14, 17, 8, 4, 7, 10, 12, 14, 12, 11, 10, 9, 18, 14, 14, 16, 13, 8, 8, 7, 7, 3, 9, 9, 4, 13, 9, 6];

  await Plotly.newPlot(
    stage.div,
    [{ x: Array.from({ length: 28 }, (_, i) => day(i + 1)), y, mode: 'lines' }],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Product price changes and revenue growth' },
      xaxis: { title: { text: stage.preview ? '' : 'Date' } },
      yaxis: { title: { text: stage.preview ? '' : 'Revenue Growth' } },
      dragmode: stage.preview ? false : 'drawline',
      shapes: [
        { type: 'rect', xref: 'x', yref: 'paper', x0: day(2), y0: 0, x1: day(8), y1: 1, fillcolor: '#9ca3af', opacity: 0.25, editable: true, line: { width: 0 }, label: { text: 'Price drop', font: { size: stage.preview ? 8 : 12, color: '#4ade80' }, textposition: 'top center' } },
        { type: 'line', x0: day(1), y0: 8, x1: day(28), y1: 8, opacity: 0.9, editable: true, label: { text: 'January average', yanchor: 'top', font: { size: stage.preview ? 8 : 12 } } },
      ],
      newshape: { label: { text: 'New shape text' } },
    } as Partial<Layout>,
    { ...stage.config, modeBarButtonsToAdd: ['drawline', 'drawopenpath', 'drawclosedpath', 'drawcircle', 'drawrect', 'eraseshape'] },
  );
  if (stage.bar) {
    select(stage.bar, 'first label textposition', POSITIONS, 'top center', (v) => void relayout(stage.div, { 'shapes[0].label.textposition': v }));
    slider(stage.bar, 'average line y1', [2, 16, 0.5], 8, (v) => void relayout(stage.div, { 'shapes[1].y0': v, 'shapes[1].y1': v }));
    select(stage.bar, 'dragmode', ['drawline', 'drawrect', 'drawcircle', 'drawclosedpath', 'zoom'] as const, 'drawline', (v) => void relayout(stage.div, { dragmode: v }));
  }
  if (stage.preview) stage.every(1200, (i) => void relayout(stage.div, { 'shapes[0].label.textposition': POSITIONS[i % POSITIONS.length], 'shapes[1].y0': 6 + (i % 4) * 2, 'shapes[1].y1': 6 + (i % 4) * 2 }));
  return () => stage.dispose();
};

export default mount;
