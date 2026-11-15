// Initialisation: extraRenderers: [new CSS3DRenderer()] puts DOM elements in the 3D scene as nodes
import ForceGraph3D from '3d-force-graph';
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import type { Mount } from '@/types.ts';
import { team } from '../../shared/data.ts';
import { fitOnce, spin } from '../../shared/camera.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each node is a div with a name and a team badge, transformed by CSS 3D.' });

  const cssRenderer = new CSS3DRenderer();
  const colors = ['#7aa2f7', '#ff9e64', '#9ece6a'];

  const graph = stage
    .own(new ForceGraph3D(stage.container, { extraRenderers: [cssRenderer] }))
    .graphData(team())
    .nodeThreeObject((node) => {
      const n = node as { name: string; group: number };
      const card = document.createElement('div');
      const color = colors[n.group - 1]!;
      card.style.cssText = `width:90px;padding:6px 0;text-align:center;font:600 18px sans-serif;color:#0b0b1a;
        background:${color};border-radius:10px;border:3px solid #fff3;pointer-events:none;user-select:none`;
      card.innerHTML = `${n.name}<div style="font:11px sans-serif;opacity:.7">team ${n.group}</div>`;
      const obj = new CSS3DObject(card);
      // One CSS pixel is one scene unit: scale the 90 px card down to about a node's size.
      obj.scale.setScalar(0.18);
      return obj;
    })
    .linkOpacity(0.5);
  cssRenderer.setSize(stage.width, stage.height);

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(30));
  }

  if (!stage.preview) fitOnce(graph);

  return stage.dispose;
};

export default mount;
