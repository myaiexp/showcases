// Container layout: two ForceGraph instances on one page, each in its own element with its own data and props
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { clusters, randomTree } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { panes: ['a tree', 'three clusters'], hint: 'Two independent graphs: separate data, colours, zoom and drag.' });
  const [treePane, clusterPane] = stage.panes as [typeof stage.panes[0], typeof stage.panes[0]];
  const size = stage.preview ? 22 : 40;

  const tree = stage
    .own(new ForceGraph(treePane.container), treePane)
    .graphData(randomTree(size, 3))
    .nodeRelSize(5)
    .nodeColor(() => '#e4572e')
    .linkWidth(2);

  const groups = stage
    .own(new ForceGraph(clusterPane.container), clusterPane)
    .graphData(clusters(3, stage.preview ? 7 : 12))
    .nodeAutoColorBy('group')
    .linkDirectionalParticles(1)
    .linkDirectionalParticleWidth(2.5);

  const fit = (): void => {
    tree.zoomToFit(300, 12);
    groups.zoomToFit(300, 12);
  };
  tree.cooldownTime(2500).onEngineStop(fit);
  groups.cooldownTime(2500).onEngineStop(fit);

  if (stage.preview) {
    let seed = 3;
    stage.every(5000, () => {
      tree.graphData(randomTree(size, ++seed));
    });
  }

  return stage.dispose;
};

export default mount;
