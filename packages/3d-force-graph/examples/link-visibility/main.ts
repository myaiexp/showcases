// Link styling: linkVisibility hides links by type; the nodes stay where the hidden links hold them
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const TYPES = ['pairs with', 'mentors', 'reviews', 'reports to'] as const;
const COLORS: Record<string, string> = { 'pairs with': '#7aa2f7', mentors: '#ff9e64', reviews: '#9ece6a', 'reports to': '#f7768e' };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Untick a type: those links vanish but still hold the layout together.' });
  const hidden = new Set<string>();

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(team() as TData)
    .nodeLabel('name')
    .linkColor((l) => COLORS[l.name!]!)
    .linkWidth(1)
    .linkOpacity(0.7)
    .linkVisibility((l) => !hidden.has(l.name!));
  const apply = (): void => {
    graph.linkVisibility(graph.linkVisibility());
  };

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    stage.after(2500, () => cam.fit(10));
    let i = 0;
    stage.after(3000, () =>
      stage.every(1400, () => {
        const k = i++ % (TYPES.length + 1);
        hidden.clear();
        if (k < TYPES.length) hidden.add(TYPES[k]!);
        apply();
      }),
    );
  } else {
    fitOnce(graph);
  }

  if (stage.bar) {
    for (const t of TYPES) {
      checkbox(stage.bar, t, true, (on) => {
        if (on) hidden.delete(t);
        else hidden.add(t);
        apply();
      });
    }
  }

  return stage.dispose;
};

export default mount;
