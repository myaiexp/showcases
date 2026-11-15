// sunburst ids keep repeated labels apart; trace.level zooms into a node
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { pick, restyle } from '../../shared/basic-util.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });

  const ids = [
    'North America', 'Europe', 'Australia', 'North America - Football', 'Soccer', 'North America - Rugby', 'Europe - Football', 'Rugby',
    'Europe - American Football', 'Australia - Football', 'Association', 'Australian Rules', 'Autstralia - American Football', 'Australia - Rugby', 'Rugby League', 'Rugby Union',
  ];
  const data: Data[] = [{
    type: 'sunburst',
    ids,
    labels: ['North<br>America', 'Europe', 'Australia', 'Football', 'Soccer', 'Rugby', 'Football', 'Rugby', 'American<br>Football', 'Football', 'Association', 'Australian<br>Rules', 'American<br>Football', 'Rugby', 'Rugby<br>League', 'Rugby<br>Union'],
    parents: ['', '', '', 'North America', 'North America', 'North America', 'Europe', 'Europe', 'Europe', 'Australia', 'Australia - Football', 'Australia - Football', 'Australia - Football', 'Australia - Football', 'Australia - Rugby', 'Australia - Rugby'],
    outsidetextfont: { size: 20, color: '#377eb8' },
    marker: { line: { width: 2 } },
  }];

  await Plotly.newPlot(
    stage.div,
    data,
    { template: stage.template, margin: { l: 0, r: 0, b: 0, t: 0 }, sunburstcolorway: ['#636efa', '#ef553b', '#00cc96'] },
    stage.config,
  );

  const levels = ['', 'North America', 'Europe', 'Australia', 'Australia - Football'];
  const apply = (l: string): void => void restyle(stage.div, { level: l });
  if (stage.bar) select(stage.bar, 'level (zoom into)', levels.map((l) => l || '(root)'), '(root)', (l) => apply(l === '(root)' ? '' : l));
  if (stage.preview) stage.every(1500, (i) => {
    const l = pick(levels, i);
    apply(l);
  });

  return () => stage.dispose();
};

export default mount;
