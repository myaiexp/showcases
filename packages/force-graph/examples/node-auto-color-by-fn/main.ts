// Node styling: nodeAutoColorBy with a function, so the grouping can be computed from the node
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { team, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

type Node = SampleNode & { color?: string };
const RULES = ['initial letter', 'name length', 'position parity'] as const;
const rule = (r: (typeof RULES)[number], n: Node): string => {
  const name = String(n.name);
  if (r === 'initial letter') return name[0]!.toLowerCase() < 'i' ? 'A to H' : name[0]!.toLowerCase() < 'p' ? 'I to O' : 'P to Z';
  if (r === 'name length') return name.length <= 3 ? 'short' : name.length === 4 ? 'medium' : 'long';
  return Number(n.index ?? 0) % 2 ? 'odd' : 'even';
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The grouping is not an attribute: a function sorts people by the rule you pick.' });
  const data = team();

  // Colours are written once per node, so each rule starts from clean copies of the data.
  let current: (typeof RULES)[number] = RULES[0];
  const graph = stage
    .own(new ForceGraph<Node>(stage.container))
    .nodeRelSize(5)
    .nodeLabel((n) => `${n.name}: ${rule(current, n)}`);

  const use = (r: (typeof RULES)[number]): void => {
    current = r;
    // Reset colours (a node that has one is skipped), then set the data again so the function runs.
    for (const n of data.nodes as Node[]) delete n.color;
    graph.nodeAutoColorBy((n) => rule(r, n)).graphData(data);
  };
  use(current);

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 22));
    let i = 0;
    stage.after(3000, () => stage.every(2200, () => {
      use(RULES[++i % RULES.length]!);
      graph.zoomToFit(300, 22);
    }));
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 30));
    select(stage.bar, 'group by', RULES, use);
  }

  return stage.dispose;
};

export default mount;
