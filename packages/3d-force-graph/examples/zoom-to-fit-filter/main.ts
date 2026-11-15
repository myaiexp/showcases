// Render control: the third argument of zoomToFit limits the fit to the nodes a filter keeps
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { clusters, PALETTE, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { fitNow } from '../../shared/camera.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const CHOICES = ['all', 'group 1', 'group 2', 'group 3'] as const;
type Choice = (typeof CHOICES)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a group: nodes outside it dim, and zoomToFit(ms, padding, filter) frames just the chosen ones.' });

  let choice: Choice = 'all';
  const keep = (n: TNode): boolean => choice === 'all' || `group ${n.group}` === choice;

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(clusters(3, stage.preview ? 8 : 14) as TData)
    .nodeLabel('name')
    .nodeColor((n) => (keep(n) ? PALETTE[(n.group ?? 1) % PALETTE.length]! : '#2a2f45'))
    .cooldownTime(2500)
    .onEngineStop(() => fitNow(graph, 30));

  const note = overlay(stage);
  const apply = (next: Choice): void => {
    choice = next;
    graph.nodeColor(graph.nodeColor()); // the accessor reads `choice`: set it again to repaint
    graph.zoomToFit(1000, 30, keep);
    note.textContent = next === 'all' ? 'zoomToFit(1000, 30)' : `zoomToFit(1000, 30, n => n.group === ${next.slice(-1)})`;
  };

  if (stage.preview) {
    let i = 0;
    stage.every(2600, () => apply(CHOICES[++i % CHOICES.length]!));
  } else if (stage.bar) {
    select(stage.bar, 'fit to', CHOICES, apply);
  }

  return stage.dispose;
};

export default mount;
