// Node styling: nodeLabel can return a real HTMLElement, built per node, for a tooltip with its own structure
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { team, PALETTE, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { hoverTour } from '../../shared/tour.ts';

const TEAMS = ['', 'Platform', 'Product', 'Data'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a person: the tooltip is a small card built with createElement.' });
  const data = team();
  const colourOf = (g: number): string => PALETTE[g]!;

  /** A card: colour swatch, name in bold, team underneath. */
  const card = (n: SampleNode): HTMLElement => {
    const root = document.createElement('div');
    root.style.cssText = 'display:flex;gap:8px;align-items:center;padding:2px 2px';
    const swatch = document.createElement('div');
    swatch.style.cssText = `width:14px;height:14px;border-radius:4px;background:${colourOf(n.group ?? 1)}`;
    const text = document.createElement('div');
    const name = document.createElement('b');
    name.textContent = String(n.name);
    const sub = document.createElement('div');
    sub.style.cssText = 'font-size:0.85em;opacity:0.75';
    sub.textContent = TEAMS[n.group ?? 1] ?? '';
    text.append(name, sub);
    root.append(swatch, text);
    return root;
  };

  const graph = stage
    .own(new ForceGraph<SampleNode>(stage.container))
    .graphData(data)
    .nodeColor((n) => colourOf(n.group ?? 1))
    .nodeRelSize(5)
    .nodeLabel(card);

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 22));
    const by = (name: string): SampleNode | undefined => data.nodes.find((n) => n.id === name);
    hoverTour(stage, stage.ghost(graph), () => ['Ada', 'Hana', 'Kai', 'Cleo', 'Fay'].map(by), { every: 2000 });
  }

  return stage.dispose;
};

export default mount;
