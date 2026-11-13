// Greys out every node outside the chosen community with a rule-level `when` predicate
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { COMMUNITIES, PALETTE, buildGraph } from './data.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildGraph(preview ? 14 : 30);

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes' },
    // Custom state flags are declared up front so predicates and setters are typed.
    customNodeState: { isActive: false },
    customGraphState: { hasActiveSubgraph: false },
    styles: {
      nodes: [
        { color: { attribute: 'color' }, size: { attribute: 'size' } },
        {
          // The docs' recipe: once a subgraph is active, grey out everything that is not part of it.
          when: (_attrs, state, graphState) => graphState.hasActiveSubgraph && !state.isActive,
          then: { color: '#f0f0f0' },
        },
      ],
      edges: { color: '#ddd', size: 0.15 },
    },
  });

  let active: string | null = null;
  const buttons = new Map<string | null, HTMLButtonElement>();

  const activate = (community: string | null): void => {
    active = community;
    renderer.setGraphState({ hasActiveSubgraph: community !== null });
    graph.forEachNode((node, attrs) => {
      renderer.setNodeState(node, { isActive: community !== null && attrs['community'] === community });
    });
    for (const [key, button] of buttons) button.setAttribute('aria-pressed', String(key === active));
  };

  let timer = 0;
  if (preview) {
    // Walk through the communities, with a "nothing active" beat in between.
    const sequence: (string | null)[] = [null, ...COMMUNITIES.flatMap((c) => [c, null])];
    let step = 0;
    timer = window.setInterval(() => activate(sequence[step++ % sequence.length] ?? null), 1100);
  } else {
    const controls = document.createElement('div');
    controls.className = 'controls';
    const entries: [string | null, string][] = [[null, 'Clear'], ...COMMUNITIES.map((c): [string, string] => [c, c])];
    entries.forEach(([key, text]) => {
      const button = document.createElement('button');
      button.textContent = text;
      button.setAttribute('aria-pressed', 'false');
      if (key) button.style.borderLeft = `4px solid ${PALETTE[COMMUNITIES.indexOf(key as (typeof COMMUNITIES)[number])] ?? '#999'}`;
      button.addEventListener('click', () => activate(key === active ? null : key));
      buttons.set(key, button);
      controls.append(button);
    });
    el.append(controls);
  }

  return () => {
    clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
