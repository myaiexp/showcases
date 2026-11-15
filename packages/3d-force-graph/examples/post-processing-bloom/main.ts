// Render control: postProcessingComposer().addPass(new UnrealBloomPass(...)) makes the bright nodes glow
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import { Vector2 } from 'three';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { fitOnce, spin } from '../../shared/camera.ts';
import { createStage } from '../../shared/stage.ts';

const NEON = ['#ff3d81', '#35f2ff', '#b6ff3c'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The composer ships with a plain RenderPass: add a pass and every frame goes through it.' });

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(clusters(3, stage.preview ? 8 : 14) as TData)
    .backgroundColor('#000004')
    .nodeColor((n) => NEON[(n.group ?? 1) - 1]!)
    .nodeOpacity(1)
    .nodeResolution(16)
    .linkColor(() => '#6c7bff')
    .linkOpacity(0.5)
    .cooldownTime(stage.preview ? 2500 : 4000);

  const bloom = new UnrealBloomPass(new Vector2(stage.width, stage.height), 1.0, 0.2, 0.2);
  graph.postProcessingComposer().addPass(bloom);
  stage.onDispose(() => bloom.dispose());

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.onEngineStop(() => cam.fit(15));
    // Breathe the strength so the glow is easy to compare with the plain nodes.
    stage.loop((_dt, t) => {
      bloom.strength = 0.9 + 0.7 * Math.sin(t * 1.2);
    });
  } else {
    fitOnce(graph);
  }

  if (stage.bar) {
    slider(stage.bar, 'strength', 0, 3, 0.1, bloom.strength, (v) => (bloom.strength = v), (v) => v.toFixed(1));
    slider(stage.bar, 'radius', 0, 1, 0.05, bloom.radius, (v) => (bloom.radius = v), (v) => v.toFixed(2));
    slider(stage.bar, 'threshold', 0, 1, 0.05, bloom.threshold, (v) => (bloom.threshold = v), (v) => v.toFixed(2));
  }

  return stage.dispose;
};

export default mount;
