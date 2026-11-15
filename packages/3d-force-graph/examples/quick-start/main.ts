// The README's quick start: new ForceGraph3D(element).graphData(data) on a random tree
import ForceGraph3D from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { randomTree } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Left-drag to rotate, scroll to zoom, right-drag to pan, drag a node to move it.' });

  const myData = randomTree(stage.preview ? 60 : 150);
  const myGraph = stage.own(new ForceGraph3D(stage.container)).graphData(myData);

  if (stage.preview) {
    // Fit the settled layout to the card, then circle the camera around it.
    myGraph.cooldownTime(3000).onEngineStop(() => myGraph.zoomToFit(400, 10));
    stage.loop((_dt, t) => {
      const { z } = myGraph.cameraPosition();
      const r = Math.hypot(myGraph.cameraPosition().x, z) || 300;
      myGraph.cameraPosition({ x: r * Math.sin(t * 0.3), z: r * Math.cos(t * 0.3) }, { x: 0, y: 0, z: 0 });
    });
  }

  return stage.dispose;
};

export default mount;
