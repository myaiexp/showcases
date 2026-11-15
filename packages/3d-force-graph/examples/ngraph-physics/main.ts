// Force engine: ngraphPhysics sets ngraph's spring length, spring coefficient, gravity and drag
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { fitOnce } from '../../shared/camera.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each change sets the physics and the data again, which builds a new ngraph layout with these physics (defaults: springLength 30, springCoefficient 0.0008, gravity -1.2, dragCoefficient 0.02).' });

  const physics = { springLength: 30, springCoefficient: 0.0008, gravity: -1.2, dragCoefficient: 0.02 };
  const apply = (): void => {
    // The physics are only read when the layout is built, and a new value does not build one:
    // setting the same data again does.
    graph.ngraphPhysics({ ...physics }).graphData(graph.graphData());
    note.textContent = `ngraphPhysics({ springLength: ${physics.springLength}, gravity: ${physics.gravity} })`;
  };

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(clusters(3, stage.preview ? 7 : 14) as TData)
    .forceEngine('ngraph')
    .ngraphPhysics({ ...physics })
    .nodeLabel('name')
    .nodeAutoColorBy('group')
    .warmupTicks(300)
    .cooldownTime(stage.preview ? 2000 : 6000);
  const note = overlay(stage);

  if (stage.preview) {
    graph.onEngineStop(() => {
      graph.scene().updateMatrixWorld(true);
      graph.zoomToFit(500, 15);
    });
    const steps = [
      { springLength: 20, gravity: -1.2 },
      { springLength: 60, gravity: -1.2 },
      { springLength: 30, gravity: -8 },
      { springLength: 30, gravity: -1.2 },
    ];
    let i = 0;
    note.textContent = 'ngraphPhysics({ springLength: 30, gravity: -1.2 })';
    stage.every(3600, () => {
      Object.assign(physics, steps[i++ % steps.length]);
      apply();
    });
  } else {
    fitOnce(graph);
    if (stage.bar) {
      slider(stage.bar, 'springLength', 5, 100, 5, physics.springLength, (v) => ((physics.springLength = v), apply()));
      slider(stage.bar, 'springCoefficient', 0.0001, 0.003, 0.0001, physics.springCoefficient, (v) => ((physics.springCoefficient = v), apply()), (v) => v.toFixed(4));
      slider(stage.bar, 'gravity', -20, -0.2, 0.2, physics.gravity, (v) => ((physics.gravity = v), apply()), (v) => v.toFixed(1));
      slider(stage.bar, 'dragCoefficient', 0.005, 0.3, 0.005, physics.dragCoefficient, (v) => ((physics.dragCoefficient = v), apply()), (v) => v.toFixed(3));
    }
  }

  return stage.dispose;
};

export default mount;
