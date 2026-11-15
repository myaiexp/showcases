// Node styling: nodeVal as an attribute name, a function of the node, and a constant
import ForceGraph3D from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { degrees, team } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { spin } from '../../shared/camera.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ["nodeVal('val')", 'nodeVal(n => links)', 'nodeVal(3)'],
    hint: 'Same graph three times. Sphere volume follows the value: radius grows with its cube root.',
  });
  const deg = degrees(team());

  const make = (index: number) => {
    const graph = stage.own(new ForceGraph3D(stage.panes[index]!.container), stage.panes[index]).graphData(team()).nodeLabel('name');
    graph.nodeOpacity(0.9);
    return graph;
  };
  const byAttribute = make(0).nodeVal('val');
  const byFunction = make(1).nodeVal((n) => deg.get(n.id!) ?? 1);
  const constant = make(2).nodeVal(3);

  const graphs = [byAttribute, byFunction, constant];
  const spins = graphs.map((g) => spin(stage, () => g, 0.5, 0.4));
  // Same data and layout in every pane: fit and turn them together.
  constant.cooldownTime(2500).onEngineStop(() => spins.forEach((s) => s.fit(20)));

  return stage.dispose;
};

export default mount;
