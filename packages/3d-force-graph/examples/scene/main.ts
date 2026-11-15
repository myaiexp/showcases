// Render control: scene() is a plain three Scene, so a grid floor and fog can sit next to the graph
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import { FogExp2, GridHelper, type Material } from 'three';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { fitNow, spin } from '../../shared/camera.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A GridHelper under the graph and an exponential fog, both added straight to scene().' });

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(clusters(3, stage.preview ? 8 : 14) as TData)
    .nodeLabel('name')
    .nodeAutoColorBy('group')
    .nodeOpacity(1)
    .cooldownTime(stage.preview ? 2500 : 4000);

  const scene = graph.scene();
  let fogAmount = 1;
  let dist = 400;
  let grid: GridHelper | null = null;
  const setFog = (amount: number): void => {
    fogAmount = amount;
    // Fog colour matches the background (the library's default is #000011).
    scene.fog = amount > 0 ? new FogExp2('#000011', (amount * 0.6) / dist) : null;
  };
  stage.onDispose(() => {
    grid?.geometry.dispose();
    (grid?.material as Material | undefined)?.dispose();
  });

  const cam = stage.preview ? spin(stage, () => graph) : null;
  graph.onEngineStop(() => {
    if (grid) return;
    dist = fitNow(graph, 30);
    const box = graph.getGraphBbox();
    if (!box) return;
    const half = Math.max(...[box.x, box.y, box.z].map(([a, b]) => Math.max(Math.abs(a), Math.abs(b))));
    grid = new GridHelper(half * 4, 20, '#4a5380', '#242a4a');
    grid.position.y = box.y[0] - 12;
    scene.add(grid);
    setFog(fogAmount);
    cam?.fit(30);
  });

  if (stage.bar) {
    checkbox(stage.bar, 'grid', true, (v) => grid && (grid.visible = v));
    slider(stage.bar, 'fog', 0, 3, 0.1, fogAmount, setFog, (v) => v.toFixed(1));
  }

  return stage.dispose;
};

export default mount;
