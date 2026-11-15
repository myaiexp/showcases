// Node styling: nodeLabel is the hover tooltip, as plain text or an HTML string
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { team, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { hoverTour } from '../../shared/tour.ts';

const TEAMS = ['', 'Platform', 'Product', 'Data'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a person. With HTML on, the label is a string of markup.' });
  const data = team();

  const graph = stage
    .own(new ForceGraph<SampleNode>(stage.container))
    .graphData(data)
    .nodeAutoColorBy('group')
    .nodeRelSize(5)
    .nodeLabel('name');

  const html = (on: boolean): void => {
    graph.nodeLabel(
      on
        ? (n) => `<div style="line-height:1.35"><b style="font-size:1.1em">${n.name}</b><br/><span style="opacity:.75">team ${TEAMS[n.group ?? 1]}</span><br/><i>${n.val && n.val > 1 ? 'lead' : 'member'}</i></div>`
        : 'name',
    );
  };

  if (stage.preview) {
    html(true);
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 22));
    const by = (name: string): SampleNode | undefined => data.nodes.find((n) => n.id === name);
    hoverTour(stage, stage.ghost(graph), () => ['Ada', 'Hana', 'Kai', 'Cleo', 'Fay'].map(by), { every: 2000 });
  } else if (stage.bar) {
    html(true);
    checkbox(stage.bar, 'HTML label', true, html);
  }

  return stage.dispose;
};

export default mount;
