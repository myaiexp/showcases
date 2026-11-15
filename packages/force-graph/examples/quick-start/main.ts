// The README's quick start: new ForceGraph(element).graphData(data) on a random tree
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { randomTree } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag a node, scroll to zoom, drag the background to pan.' });

  const myData = randomTree(stage.preview ? 60 : 150);
  const myGraph = stage.own(new ForceGraph(stage.container)).graphData(myData);

  if (stage.preview) {
    // The layout settles in a few seconds; fit it to the card, then grow a new tree.
    myGraph.cooldownTime(4000).onEngineStop(() => myGraph.zoomToFit(400, 12));
    let seed = 1;
    stage.every(6000, () => myGraph.graphData(randomTree(60, ++seed)));
  }

  return stage.dispose;
};

export default mount;
