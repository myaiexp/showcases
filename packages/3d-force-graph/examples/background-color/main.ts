// Container layout: backgroundColor() sets the colour behind the graph
import ForceGraph3D from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { color } from '../../shared/controls.ts';
import { randomTree } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The default is #000011, a very dark blue.' });

  const graph = stage
    .own(new ForceGraph3D(stage.container))
    .graphData(randomTree(stage.preview ? 40 : 90, 6))
    .backgroundColor('#000011')
    .linkColor(() => '#ffffff')
    .linkOpacity(0.5);

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
    const colors = ['#000011', '#1b0a2e', '#0a2a2a', '#2e1a0a', '#2a0a14'];
    let i = 0;
    stage.every(1500, () => {
      graph.backgroundColor(colors[++i % colors.length]!);
    });
  }

  if (stage.bar) color(stage.bar, 'backgroundColor', '#000011', (v) => graph.backgroundColor(v));

  if (!stage.preview) fitOnce(graph);

  return stage.dispose;
};

export default mount;
