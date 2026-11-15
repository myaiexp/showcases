// Utility: getGraphBbox returns the box around the nodes (optionally a subset), drawn here with a Box3Helper
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import { Box3, Box3Helper, Vector3 } from 'three';
import type { Mount } from '@/types.ts';
import { readout, select } from '../../shared/controls.ts';
import { fitOnce, spin } from '../../shared/camera.ts';
import { clusters, PALETTE, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const CHOICES = ['all nodes', 'group 1', 'group 2', 'group 3'] as const;
type Choice = (typeof CHOICES)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The box is redrawn every frame from getGraphBbox(filter): its { x, y, z } ranges also include each sphere\'s size.' });
  const log = stage.bar && readout(stage.bar);

  let choice: Choice = 'all nodes';
  const keep = (n: TNode): boolean => choice === 'all nodes' || `group ${n.group}` === choice;

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(clusters(3, stage.preview ? 8 : 12) as TData)
    .nodeLabel('name')
    .nodeColor((n) => PALETTE[(n.group ?? 1) % PALETTE.length]!)
    .cooldownTime(stage.preview ? 2500 : 5000);
  const note = overlay(stage);

  // A wireframe box in the scene, resized to the bbox on every frame.
  const helper = new Box3Helper(new Box3(), 0xffd166);
  graph.scene().add(helper);
  stage.onDispose(() => {
    graph.scene().remove(helper);
    helper.geometry.dispose();
    (helper.material as { dispose(): void }).dispose();
  });
  const lo = new Vector3();
  const hi = new Vector3();
  stage.loop(() => {
    const b = graph.getGraphBbox(keep);
    helper.visible = !!b;
    if (!b) return;
    helper.box.set(lo.set(b.x[0], b.y[0], b.z[0]), hi.set(b.x[1], b.y[1], b.z[1]));
    const f = (r: number[]): string => `${r[0]!.toFixed(0)} … ${r[1]!.toFixed(0)}`;
    const text = `getGraphBbox(${choice === 'all nodes' ? '' : 'n => ' + choice.replace('group ', 'n.group === ')})\nx ${f(b.x)}\ny ${f(b.y)}\nz ${f(b.z)}`;
    note.textContent = text;
    if (log) log.textContent = text;
  });

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.onEngineStop(() => cam.fit(15));
    let i = 0;
    stage.every(2200, () => (choice = CHOICES[++i % CHOICES.length]!));
  } else {
    fitOnce(graph);
    if (stage.bar) select(stage.bar, 'nodes in the box', CHOICES, (v) => (choice = v));
  }

  return stage.dispose;
};

export default mount;
