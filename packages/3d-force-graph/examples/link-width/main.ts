// Link styling: linkWidth 0 is a 1 px line, a positive width is a cylinder; here it follows each link's value
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Width = value x scale. At scale 0 the links become 1 px lines.' });
  let scale = 1;

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(team() as TData)
    .nodeLabel('name')
    .linkColor(() => '#c0caf5')
    .linkOpacity(0.7)
    .linkWidth((l) => (l.value ?? 1) * scale);
  const apply = (v: number): void => {
    scale = v;
    // Accessors are read again when the prop is set; width also decides line or cylinder.
    graph.linkWidth(graph.linkWidth());
  };

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
    const steps = [0, 0.5, 1, 1.5];
    let i = 0;
    stage.every(1500, () => apply(steps[++i % steps.length]!));
  } else {
    fitOnce(graph);
  }

  if (stage.bar) slider(stage.bar, 'width scale', 0, 3, 0.25, scale, apply, (v) => v.toFixed(2));

  return stage.dispose;
};

export default mount;
