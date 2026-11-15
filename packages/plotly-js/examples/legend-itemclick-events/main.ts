// legend.itemclick and itemdoubleclick, with the legend click events logged
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, toggle } from '../../shared/controls.ts';
import { relayout, restyle } from '../../shared/basic-util.ts';
import { readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const ACTIONS = ['toggle', 'toggleothers', 'false'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const x = [1, 2, 3, 4, 5];
  await Plotly.newPlot(
    stage.div,
    [
      { x, y: [1, 3, 2, 4, 3], name: 'Alpha', mode: 'lines+markers' },
      { x, y: [2, 2, 4, 3, 5], name: 'Beta', mode: 'lines+markers' },
      { x, y: [4, 3, 3, 1, 2], name: 'Gamma', mode: 'lines+markers' },
    ],
    { template: stage.template, legend: { itemclick: 'toggle', itemdoubleclick: 'toggleothers' } },
    stage.config,
  );
  const act = (v: string): unknown => (v === 'false' ? false : v);
  if (stage.bar) {
    const log = readout(el);
    log.textContent = 'Click or double-click a legend entry.';
    select(stage.bar, 'legend.itemclick', ACTIONS, 'toggle', (v) => void relayout(stage.div, { 'legend.itemclick': act(v) }));
    select(stage.bar, 'legend.itemdoubleclick', ACTIONS, 'toggleothers', (v) => void relayout(stage.div, { 'legend.itemdoubleclick': act(v) }));
    let veto = false;
    toggle(stage.bar, 'handler returns false (cancels the default)', false, (v) => (veto = v));
    stage.div.on('plotly_legendclick', (e) => {
      log.textContent = `plotly_legendclick: curveNumber ${e.curveNumber}, expandedIndex ${e.expandedIndex}`;
      return !veto;
    });
    stage.div.on('plotly_legenddoubleclick', (e) => {
      log.textContent = `plotly_legenddoubleclick: curveNumber ${e.curveNumber}`;
      return !veto;
    });
  }
  if (stage.preview) {
    stage.every(1200, (i) => {
      void restyle(stage.div, { visible: true }, [0, 1, 2]);
      const hidden = [[], [0], [0, 2], [1, 2]][i % 4] as number[];
      if (hidden.length) void restyle(stage.div, { visible: 'legendonly' }, hidden);
    });
  }
  return () => stage.dispose();
};

export default mount;
