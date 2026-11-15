// Link styling: linkMaterial picks a three.js material per link type
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import { MeshBasicMaterial, MeshNormalMaterial, MeshPhongMaterial, type Material } from 'three';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Four relations, four materials.' });

  const materials: Record<string, Material> = {
    'pairs with': new MeshNormalMaterial(),
    mentors: new MeshBasicMaterial({ color: '#ff9e64' }),
    reviews: new MeshPhongMaterial({ color: '#1a3a1a', emissive: '#4ee06a', emissiveIntensity: 0.9, shininess: 90 }),
    'reports to': new MeshBasicMaterial({ color: '#f7768e', wireframe: true }),
  };
  stage.onDispose(() => Object.values(materials).forEach((m) => m.dispose()));
  let custom = true;

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(team() as TData)
    .nodeLabel('name')
    .nodeColor(() => '#c0caf5')
    .linkWidth(2.5)
    .linkResolution(8)
    .linkMaterial((l) => (custom ? materials[l.name!]! : (undefined as unknown as Material)));

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
  } else {
    fitOnce(graph);
  }

  if (stage.bar) {
    checkbox(stage.bar, 'custom materials', true, (v) => {
      custom = v;
      graph.linkMaterial(graph.linkMaterial());
    });
  }

  return stage.dispose;
};

export default mount;
