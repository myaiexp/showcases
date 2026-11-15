// Initialisation: extraRenderers: [new CSS2DRenderer()] draws HTML labels that follow the nodes
import ForceGraph3D from '3d-force-graph';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import type { Mount } from '@/types.ts';
import { team } from '../../shared/data.ts';
import { fitOnce, spin } from '../../shared/camera.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The names are HTML elements laid over the canvas; the spheres are still WebGL.' });

  const labelRenderer = new CSS2DRenderer();
  const colors = ['#7aa2f7', '#ff9e64', '#9ece6a'];

  const graph = stage
    .own(new ForceGraph3D(stage.container, { extraRenderers: [labelRenderer] }))
    .graphData(team())
    .nodeLabel(() => '')
    .nodeThreeObject((node) => {
      const n = node as { name: string; group: number };
      const div = document.createElement('div');
      div.textContent = n.name;
      div.style.cssText = `font:${stage.preview ? 10 : 13}px sans-serif;color:${colors[n.group - 1]};pointer-events:none;
        padding:1px 5px;border-radius:4px;background:rgba(0,0,17,0.6);white-space:nowrap`;
      const label = new CSS2DObject(div);
      label.position.set(0, 9, 0); // above the sphere
      return label;
    })
    // Extend: keep the default sphere and add the label as its child.
    .nodeThreeObjectExtend(true)
    .nodeColor((n) => colors[((n as { group: number }).group ?? 1) - 1]!);
  // The extra renderer is sized on the next digest: do it now, so no frame is the wrong size.
  labelRenderer.setSize(stage.width, stage.height);

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(30));
  }

  if (!stage.preview) fitOnce(graph);

  return stage.dispose;
};

export default mount;
